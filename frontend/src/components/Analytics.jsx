import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { captureAttribution } from "@/lib/attribution";

/**
 * Analytics
 *
 * GTM-TR8L5JXX is installed once in public/index.html (head snippet plus
 * the noscript iframe). This component must not inject that container again.
 *
 * Because the app is a single-page router, GTM's first load only sees the
 * landing URL. On every route change we push:
 *   { event: 'page_view', page_path, page_title }
 * The push is deferred so react-helmet has written the new document title.
 *
 * GA4 (REACT_APP_GA4_ID) is optional and loaded once here, with automatic
 * page views off so they are not double-counted against the dataLayer event.
 * Phone and email clicks are delegated from the document so every tel: and
 * mailto: link is covered, including ones rendered later.
 */
export default function Analytics() {
  const { pathname, search } = useLocation();
  const gaReady = useRef(false);
  const gaId = process.env.REACT_APP_GA4_ID?.trim();

  useEffect(() => {
    captureAttribution(search);
    // Drop the raw-HTML fallback tags once Helmet has written the route tags,
    // so crawlers that run JavaScript don't see two titles.
    const timer = window.setTimeout(() => {
      document.querySelectorAll("[data-apollo-fallback]").forEach((node) => node.remove());
    }, 0);
    return () => window.clearTimeout(timer);
  }, [search, pathname]);

  useEffect(() => {
    if (gaReady.current || !gaId) return;
    gaReady.current = true;

    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    // page_view is pushed to dataLayer below; don't also auto-send one.
    window.gtag("config", gaId, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }, [gaId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const page_path = `${pathname}${search}` || "/";
      const page_title = document.title || "Apollo Builders";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path,
        page_title,
      });
      if (gaId && typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path,
          page_title,
          page_location: window.location.href,
          send_to: gaId,
        });
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search, gaId]);

  useEffect(() => {
    function onClick(event) {
      const anchor = event.target?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const lower = href.toLowerCase();
      window.dataLayer = window.dataLayer || [];
      if (lower.startsWith("tel:")) {
        window.dataLayer.push({ event: "phone_click", link_url: href });
      } else if (lower.startsWith("mailto:")) {
        window.dataLayer.push({ event: "email_click", link_url: href });
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
