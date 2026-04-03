/**
 * Analytics placeholder module.
 *
 * TODO: Wire up Google Analytics 4 or a privacy-friendly alternative:
 * 1. Add GA4 measurement ID to site_settings (ga_measurement_id)
 * 2. Add <Script> tag in app/layout.tsx with the GA4 snippet
 * 3. Replace console.debug calls with gtag('event', ...) calls
 */

export const EVENTS = {
  WHATSAPP_CLICK: "whatsapp_click",
  GALLERY_FILTER: "gallery_filter",
  CTA_CLICK: "cta_click",
  ROOM_INQUIRY: "room_inquiry",
} as const;

export function trackEvent(
  eventName: string,
  params?: Record<string, string>
) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics] ${eventName}`, params);
  }
  // Production: no-op until GA4 or alternative is configured
}
