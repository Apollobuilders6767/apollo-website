from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone

import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# — Email configuration (Direct Resend API) —
# Set these in the Vercel project (apollo-website-udoj). Do not commit values.
#   RESEND_API_KEY           Resend secret key (starts with re_).
#   RESEND_FROM_EMAIL        Sender on a domain verified in Resend.
#                            Default: Apollo Builders <notifications@apollobuilders.com.au>
#   ENQUIRY_RECIPIENT_EMAIL  Inbox that receives enquiries.
#                            Default, and the address that should be set: info@apollobuilders.com.au
#   MONGO_URL                MongoDB Atlas connection string.
#   DB_NAME                  Atlas database name.
#   CORS_ORIGINS             Optional comma-separated browser origins.
RESEND_API_URL = "https://api.resend.com/emails"
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
RESEND_FROM_EMAIL = os.environ.get(
    "RESEND_FROM_EMAIL",
    "Apollo Builders <notifications@apollobuilders.com.au>"
).strip()
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Apollo Builders Website").strip()
ENQUIRY_RECIPIENT_EMAIL = (
    os.environ.get("ENQUIRY_RECIPIENT_EMAIL", "info@apollobuilders.com.au").strip()
    or "info@apollobuilders.com.au"
)
MIN_SUBMIT_SECONDS = int(os.environ.get('MIN_SUBMIT_SECONDS', '3'))
ENQUIRY_RATE_LIMIT = os.environ.get('ENQUIRY_RATE_LIMIT', '5/hour')

# ── Rate limiting (per real client IP behind K8s/Cloudflare proxy) ──
# `get_remote_address` returns the immediate TCP peer (the proxy pod IP).
# For a real per-client limit we honour X-Forwarded-For (the first hop,
# which the ingress sets to the real client) and fall back safely.
def _client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for", "")
    if xff:
        # X-Forwarded-For: client, proxy1, proxy2 → take the left-most
        first = xff.split(",")[0].strip()
        if first:
            return first
    real_ip = request.headers.get("x-real-ip", "").strip()
    if real_ip:
        return real_ip
    return get_remote_address(request)


limiter = Limiter(key_func=_client_ip, default_limits=["120/minute"])

app = FastAPI(title="Apollo Builders API", docs_url=None, redoc_url=None, openapi_url=None)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

api_router = APIRouter(prefix="/api")


# ── Security headers middleware ────────────────────────────────────
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        resp = await call_next(request)
        resp.headers["X-Content-Type-Options"] = "nosniff"
        resp.headers["X-Frame-Options"] = "DENY"
        resp.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        resp.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        resp.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        resp.headers["Cross-Origin-Resource-Policy"] = "same-site"
        resp.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        resp.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
        return resp


# ── Request body size cap (defence-in-depth) ───────────────────────
MAX_BODY_BYTES = 32 * 1024  # 32 KB — Pydantic field caps keep normal payloads well under this

class BodySizeLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        cl = request.headers.get("content-length")
        if cl and cl.isdigit() and int(cl) > MAX_BODY_BYTES:
            return JSONResponse(status_code=413, content={"detail": "Request body too large."})
        return await call_next(request)


# ── Global safe error handler — never leak internals ───────────────
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logging.exception(f"Unhandled error on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."},
    )


# ── Models ────────────────────────────────────────────────────────────
class EnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=1, max_length=40)
    address: Optional[str] = Field(default="", max_length=240)
    # Email is optional so the short quote form (name, phone, suburb, project) can submit.
    email: Optional[EmailStr] = None
    project_type: str = Field(min_length=1, max_length=80)
    message: str = Field(default="", max_length=4000)
    # ── Spam protection (server-enforced) ──
    website: Optional[str] = Field(default="", max_length=200)  # honeypot — must be empty
    form_loaded_at: Optional[float] = Field(default=None)       # ms epoch when form mounted
    # Which form submitted, plus ad click ids captured in the browser.
    # Click ids are not personal data; name/email/phone stay out of the dataLayer.
    form_name: Optional[str] = Field(default="", max_length=80)
    gclid: Optional[str] = Field(default="", max_length=512)
    gbraid: Optional[str] = Field(default="", max_length=512)
    wbraid: Optional[str] = Field(default="", max_length=512)
    utm_source: Optional[str] = Field(default="", max_length=200)
    utm_medium: Optional[str] = Field(default="", max_length=200)
    utm_campaign: Optional[str] = Field(default="", max_length=200)
    utm_term: Optional[str] = Field(default="", max_length=200)
    utm_content: Optional[str] = Field(default="", max_length=200)


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    address: str = ""
    email: Optional[EmailStr] = None
    project_type: str
    message: str
    form_name: str = ""
    gclid: str = ""
    gbraid: str = ""
    wbraid: str = ""
    utm_source: str = ""
    utm_medium: str = ""
    utm_campaign: str = ""
    utm_term: str = ""
    utm_content: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class EnquiryResponse(BaseModel):
    """Minimal response — never echo back stored PII beyond what's needed for UX."""
    id: str
    email_sent: bool


# ── Helpers ───────────────────────────────────────────────────────────
def _sanitise(value: str) -> str:
    """Strip control chars & clip length. Pydantic already validates
    length; this is a defence-in-depth pass before rendering into email."""
    if not value:
        return ""
    cleaned = "".join(ch for ch in value if ch.isprintable() or ch in "\n\r\t")
    return cleaned.strip()


def _build_email_html(e: Enquiry) -> str:
    submitted = e.created_at.strftime('%A, %d %B %Y · %I:%M %p UTC')
    # HTML-escape user-provided fields before interpolation.
    from html import escape
    name = escape(_sanitise(e.name))
    phone = escape(_sanitise(e.phone))
    email = escape(str(e.email)) if e.email else ""
    address = escape(_sanitise(e.address) or '—')
    project = escape(_sanitise(e.project_type))
    message = escape(_sanitise(e.message))
    form_name = escape(_sanitise(e.form_name) or "—")
    attribution_rows = ""
    for label, value in (
        ("gclid", e.gclid),
        ("gbraid", e.gbraid),
        ("wbraid", e.wbraid),
        ("utm_source", e.utm_source),
        ("utm_medium", e.utm_medium),
        ("utm_campaign", e.utm_campaign),
        ("utm_term", e.utm_term),
        ("utm_content", e.utm_content),
    ):
        cleaned = _sanitise(value or "")
        if not cleaned:
            continue
        attribution_rows += (
            f'<tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">{escape(label)}</td>'
            f'<td style="color:#0A0F1A">{escape(cleaned)}</td></tr>'
        )
    attribution_block = ""
    if attribution_rows:
        attribution_block = f"""
            <p style="margin:24px 0 8px 0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#C5892D;font-weight:600">Campaign</p>
            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse">
              {attribution_rows}
            </table>
        """
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;color:#1a1a1a;background:#f4f1ea;padding:24px">
      <tr><td>
        <table width="620" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e6e2da">
          <tr><td style="padding:32px 32px 12px 32px;border-bottom:1px solid #e6e2da">
            <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#C5892D;font-weight:600">Apollo Builders</div>
            <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#0A0F1A">New Website Enquiry</h1>
          </td></tr>
          <tr><td style="padding:28px 32px">
            <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#4a5262">A new enquiry has been submitted through the Apollo Builders website.</p>
            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse">
              <tr><td style="width:130px;color:#6b7280;vertical-align:top;padding-right:16px">Name</td><td style="color:#0A0F1A">{name}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Phone</td><td><a href="tel:{phone}" style="color:#0A0F1A;text-decoration:none">{phone}</a></td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Email</td><td>{f'<a href="mailto:{email}" style="color:#C5892D;text-decoration:none">{email}</a>' if email else "—"}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Address</td><td style="color:#0A0F1A">{address}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Project</td><td style="color:#0A0F1A">{project}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Form</td><td style="color:#0A0F1A">{form_name}</td></tr>
              <tr><td style="color:#6b7280;vertical-align:top;padding-right:16px">Message</td><td style="color:#0A0F1A;white-space:pre-wrap;line-height:1.55">{message}</td></tr>
            </table>
            {attribution_block}
            <p style="margin:24px 0 0 0;padding:16px;background:#f4f1ea;font-size:13px;color:#4a5262;line-height:1.55">
              Reply using the contact details above.
            </p>
          </td></tr>
          <tr><td style="padding:14px 32px;background:#0A0F1A;color:#f4f1ea;font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600">
            Submitted {submitted}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """



async def _send_notification_email(enquiry: Enquiry) -> bool:
    """Send enquiry notification directly through the Resend API.

    Returns True if Resend accepts the email request.
    Returns False on failure without raising an exception.
    """
    if not RESEND_API_KEY:
        # Error level so a missing key is visible in Vercel logs. The enquiry
        # is still stored; the API reports email_sent false to the browser.
        logging.error(
            "RESEND_API_KEY is not set. Enquiry stored, notification email skipped. "
            "Set RESEND_API_KEY, RESEND_FROM_EMAIL (verified domain) and "
            "ENQUIRY_RECIPIENT_EMAIL=info@apollobuilders.com.au in Vercel."
        )
        return False

    from_email = RESEND_FROM_EMAIL
    if from_email and "<" not in from_email:
        from_email = f"{EMAIL_FROM_NAME} <{from_email}>"

    payload = {
        "from": from_email,
        "to": [ENQUIRY_RECIPIENT_EMAIL],
        "subject": (
            f"New Website Enquiry — {enquiry.project_type} — {enquiry.name}"
        ),
        "html": _build_email_html(enquiry),
    }
    if enquiry.email:
        payload["reply_to"] = str(enquiry.email)

    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                RESEND_API_URL,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )

        resp.raise_for_status()
        resend_id = ""
        try:
            resend_id = str((resp.json() or {}).get("id") or "")
        except Exception:
            resend_id = ""
        logging.info(
            "Resend accepted enquiry notification id=%s to=%s",
            resend_id or "unknown",
            ENQUIRY_RECIPIENT_EMAIL,
        )
        return True

    except httpx.HTTPStatusError as ex:
        detail = ""
        try:
            body = ex.response.json() or {}
            detail = str(body.get("message") or body.get("name") or "")[:300]
        except Exception:
            detail = ""
        # Status plus Resend's message (for example an unverified from-domain).
        # The API key and the enquiry body are not written to the log.
        logging.error(
            "Resend email dispatch failed: HTTP %s to=%s from=%s detail=%s",
            ex.response.status_code,
            ENQUIRY_RECIPIENT_EMAIL,
            from_email,
            detail or "no error message",
        )
        return False

    except Exception as ex:
        logging.error(
            "Resend email dispatch error: %s %s",
            type(ex).__name__,
            str(ex)[:300],
        )
        return False


def _is_spam(payload: EnquiryCreate) -> bool:
    """Silent spam detection: honeypot + minimum-fill-time gate."""
    if payload.website and payload.website.strip():
        logging.info("Enquiry rejected: honeypot triggered.")
        return True

    if payload.form_loaded_at:
        try:
            now_ms = datetime.now(timezone.utc).timestamp() * 1000
            elapsed_sec = (
                now_ms - float(payload.form_loaded_at)
            ) / 1000.0

            if elapsed_sec < MIN_SUBMIT_SECONDS:
                logging.info(
                    f"Enquiry rejected: submitted too fast ({elapsed_sec:.2f}s)."
                )
                return True

        except Exception:
            pass

    return False



# ── Routes ────────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"service": "Apollo Builders API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "email_provider": "configured" if RESEND_API_KEY else "pending"}


@api_router.post("/enquiries", response_model=EnquiryResponse, status_code=201)
@limiter.limit(ENQUIRY_RATE_LIMIT)
async def create_enquiry(request: Request, payload: EnquiryCreate):
    """Accept a customer enquiry. Rate-limited per-IP to prevent abuse.

    Response returns only { id, email_sent } — no PII is echoed to callers.
    All PII stays server-side (MongoDB) and is forwarded to
    the configured recipient via the direct Resend API.
    """
    # Silent spam rejection — return a normal-looking success shape.
    if _is_spam(payload):
        return EnquiryResponse(id=str(uuid.uuid4()), email_sent=False)

    enquiry = Enquiry(
        name=_sanitise(payload.name),
        phone=_sanitise(payload.phone),
        address=_sanitise(payload.address or ""),
        email=payload.email,
        project_type=_sanitise(payload.project_type),
        message=_sanitise(payload.message),
        form_name=_sanitise(payload.form_name or "")[:80],
        gclid=_sanitise(payload.gclid or "")[:512],
        gbraid=_sanitise(payload.gbraid or "")[:512],
        wbraid=_sanitise(payload.wbraid or "")[:512],
        utm_source=_sanitise(payload.utm_source or "")[:200],
        utm_medium=_sanitise(payload.utm_medium or "")[:200],
        utm_campaign=_sanitise(payload.utm_campaign or "")[:200],
        utm_term=_sanitise(payload.utm_term or "")[:200],
        utm_content=_sanitise(payload.utm_content or "")[:200],
    )
    email_sent = await _send_notification_email(enquiry)
    enquiry.email_sent = email_sent
    doc = enquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['email'] = str(doc['email'])
    await db.enquiries.insert_one(doc)
    return EnquiryResponse(id=enquiry.id, email_sent=email_sent)


# NOTE: A public GET /api/enquiries endpoint used to exist and returned every
# stored submission. That was a PII data-leak risk and has been removed. Any
# future admin listing must live behind authenticated staff access.


app.include_router(api_router)

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(BodySizeLimitMiddleware)

_cors_origins = [o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()]
_DEFAULT_CORS = [
    "https://www.apollobuilders.com.au",
    "https://apollobuilders.com.au",
    "https://apollo-website-udoj-gamma.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_cors_origins or _DEFAULT_CORS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
    max_age=600,
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
