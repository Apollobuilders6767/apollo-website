// First-party ad click ids. Captured on landing and kept for about 90 days
// so a later enquiry still carries the Google click that started the visit.
// Stored in both localStorage and a first-party cookie: Safari can expire
// script-set cookies early, and the cookie still covers a fresh tab.

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

const STORAGE_KEY = "apollo_attr";
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
const MAX_VALUE = 512;

function prune(record) {
  const now = Date.now();
  const next = {};
  if (!record || typeof record !== "object") return next;
  for (const key of ATTRIBUTION_KEYS) {
    const entry = record[key];
    if (!entry || typeof entry.v !== "string" || !entry.v) continue;
    if (typeof entry.exp !== "number" || entry.exp <= now) continue;
    next[key] = { v: entry.v.slice(0, MAX_VALUE), exp: entry.exp };
  }
  return next;
}

function readCookie() {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  const prefix = `${STORAGE_KEY}=`;
  for (const part of parts) {
    if (!part.startsWith(prefix)) continue;
    try {
      return JSON.parse(decodeURIComponent(part.slice(prefix.length)));
    } catch (err) {
      return {};
    }
  }
  return {};
}

function readLocal() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function mergeRecords(left, right) {
  const out = {};
  for (const key of ATTRIBUTION_KEYS) {
    const a = left[key];
    const b = right[key];
    if (!a) {
      if (b) out[key] = b;
      continue;
    }
    if (!b) {
      out[key] = a;
      continue;
    }
    out[key] = (b.exp || 0) >= (a.exp || 0) ? b : a;
  }
  return out;
}

function writeAll(record) {
  const serialised = JSON.stringify(record);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialised);
  } catch (err) {
    // Private mode and full storage should not block the form.
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialised)}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

export function getStoredAttribution() {
  if (typeof window === "undefined") return {};
  return prune(mergeRecords(prune(readCookie()), prune(readLocal())));
}

// Flat values for hidden inputs and the JSON body. No personal data.
export function getAttribution() {
  const stored = getStoredAttribution();
  const out = {};
  for (const key of ATTRIBUTION_KEYS) {
    if (stored[key]) out[key] = stored[key].v;
  }
  return out;
}

export function captureAttribution(search) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(
    search != null ? search : window.location.search
  );
  const current = getStoredAttribution();
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  let changed = false;
  for (const key of ATTRIBUTION_KEYS) {
    const raw = params.get(key);
    if (!raw) continue;
    const value = raw.trim().slice(0, MAX_VALUE);
    if (!value) continue;
    current[key] = { v: value, exp };
    changed = true;
  }
  if (changed) writeAll(prune(current));
}
