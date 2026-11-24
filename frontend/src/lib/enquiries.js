import axios from "axios";
import { getAttribution } from "./attribution";

// Same-origin on purpose. Production CSP connect-src allows 'self' but does
// not allow the absolute REACT_APP_BACKEND_URL host, so those posts never
// left the browser. www.apollobuilders.com.au already serves /api.
const ENQUIRY_URL = "/api/enquiries";

const DELIVERY_ERROR =
  "We couldn't send your enquiry. Please try again, or call 0422 339 622.";

function failure(message) {
  const err = new Error("enquiry_failed");
  err.userMessage = message;
  return err;
}

// Fired only after the API confirms the enquiry was accepted and the
// notification email was handed to Resend. Never include name, email or phone.
export function pushGenerateLead(formName, serviceType) {
  const payload = { event: "generate_lead" };
  if (formName) payload.form_name = String(formName).slice(0, 80);
  if (serviceType) payload.service_type = String(serviceType).slice(0, 80);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export async function submitEnquiry(fields) {
  const attribution = getAttribution();
  try {
    const res = await axios.post(ENQUIRY_URL, {
      ...fields,
      ...attribution,
    });
    // 201 is not enough: a missed Resend send and the spam gate both return
    // 201 with email_sent false. Only a confirmed send is a lead.
    if (res?.data?.email_sent !== true) {
      throw failure(DELIVERY_ERROR);
    }
    pushGenerateLead(fields.form_name, fields.project_type);
    return res.data;
  } catch (err) {
    if (err.userMessage) throw err;
    const detail = err?.response?.data?.detail;
    const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
    throw failure(
      typeof msg === "string" && msg
        ? msg
        : "Something went wrong. Please try again, or call 0422 339 622."
    );
  }
}
