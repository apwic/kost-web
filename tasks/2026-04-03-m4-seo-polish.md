## Product Requirements Document (PRD)

# Milestone 4: SEO + Polish + Analytics

### 1. Product Overview

Make the KostKu website production-ready by adding search engine optimization (SEO), Google Maps integration, analytics tracking, performance optimizations, and error handling. The goal is to ensure the website is discoverable by potential tenants searching for "kost di Jakarta" (or the specific area), loads fast on mobile data connections, and provides a polished user experience.

This milestone depends on all previous milestones being complete: the public landing page (M1), gallery page (M2), and admin panel (M3).

### 2. Current State

After completing Milestones 1-3:
- The website is live on Vercel with a landing page, gallery page, and admin panel.
- Content is dynamically managed via Supabase.
- The website is functional but lacks SEO optimization — no meta tags, no structured data, no sitemap.
- No Google Maps integration on the contact section.
- No analytics — the family has no visibility into website traffic or user behavior.
- No custom error pages (404, 500) — users see generic Next.js error pages.
- Loading states may be inconsistent or missing across pages.
- Performance has not been audited or optimized for Core Web Vitals.

### 3. Target State

After this milestone:
- The website ranks well on Google for relevant search terms in the target area (e.g., "kost murah di [area]", "kost dekat [campus/landmark]").
- Every page has proper meta tags, Open Graph tags (for WhatsApp/social sharing previews), and structured data.
- A Google Maps embed shows the exact Kost location on the contact section.
- Google Analytics (or a privacy-friendly alternative) tracks page views, visitor sources, and key interactions.
- WhatsApp button clicks are tracked as conversion events.
- All pages score 90+ on Google Lighthouse for Performance, Accessibility, Best Practices, and SEO.
- Custom 404 and error pages provide a branded experience.
- All loading states are smooth and consistent.
- A sitemap.xml and robots.txt are auto-generated.

### 4. User Stories

- As a **potential tenant**, I want to find the Kost website when I search "kost di [area]" on Google so that I can discover this option.
- As a **potential tenant**, I want to see a Google Maps pin of the Kost location so that I can check if it's close to my campus or workplace.
- As a **potential tenant**, I want the website to load fast on my phone even on slow data so that I don't abandon the page.
- As a **potential tenant**, I want to see a helpful 404 page when I visit a wrong URL so that I can navigate back to the main site.
- As a **potential tenant**, I want to see a nice preview when someone shares the Kost link on WhatsApp or social media so that the link looks trustworthy.
- As a **Kost owner**, I want to know how many people visit the website so that I can gauge the effectiveness of sharing the link.
- As a **Kost owner**, I want to know how many people click the WhatsApp button so that I can measure how many leads the website generates.
- As a **Kost owner**, I want the website to appear on Google Search so that new tenants can find us organically.

### 5. Functional Requirements

**SEO — Meta Tags:**
- Every page must have a unique `<title>` tag following the pattern: `{Page Name} | KostKu — Kost Modern di {City}`.
- Every page must have a `<meta name="description">` tag with a compelling Indonesian description (max 160 characters).
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) must be present on every page for rich link previews on WhatsApp, Facebook, and Twitter.
- Twitter card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) must be present.
- The `og:image` for the landing page should be a designed preview image (1200x630px) showing the Kost exterior or hero image.
- The `og:image` for the gallery page should show a collage of gallery photos.
- The language must be set: `<html lang="id">`.

**SEO — Structured Data:**
- Add JSON-LD structured data on the landing page using the `LocalBusiness` schema type. Include:
  - Business name (KostKu)
  - Address (from `site_settings`)
  - Phone number (from `site_settings`)
  - Price range
  - Opening hours (if applicable)
  - Geo coordinates (latitude/longitude from `site_settings`)
  - Images (from gallery)
  - Aggregate rating (computed from testimonial ratings)
- Add `BreadcrumbList` structured data on the gallery page.

**SEO — Sitemap & Robots:**
- Auto-generate `sitemap.xml` using Next.js built-in sitemap generation.
- Include all public pages: `/`, `/gallery`.
- Include `lastmod` dates based on the latest content update timestamp from Supabase.
- Generate `robots.txt` that allows all crawlers and points to the sitemap.
- Block `/admin` routes from crawlers in `robots.txt`.

**Google Maps Integration:**
- Embed a Google Maps iframe or use the Google Maps JavaScript API (static embed preferred for simplicity) in the Contact CTA section.
- The map should show a pin at the Kost's exact location.
- Map coordinates are stored in `site_settings` and managed via the admin panel (M3).
- The map must be lazy-loaded (only load when the contact section enters the viewport) to avoid impacting initial page load performance.
- On mobile, include a "Buka di Google Maps" (Open in Google Maps) button that opens the native maps app.

**Analytics:**
- Integrate Google Analytics 4 (GA4) using the `@next/third-parties` package or a manual script tag.
- Alternatively, use a privacy-friendly option like Plausible or Umami (self-hosted) — this is an open question.
- Track the following events:
  - Page views (automatic).
  - WhatsApp button clicks (custom event: `whatsapp_click` with parameters: `source` = which section the click came from).
  - Gallery filter tab clicks (custom event: `gallery_filter` with parameter: `category`).
  - "Lihat Kamar" CTA click (custom event: `cta_click`).
  - "Pesan Sekarang" room booking button clicks (custom event: `room_inquiry` with parameter: `room_type`).
- The analytics script must be loaded asynchronously and must not block page rendering.
- Cookie consent is NOT required for GA4 in Indonesia, but include a minimal privacy notice in the footer linking to a `/privacy` page.

**Performance Optimization:**
- All pages must score 90+ on Google Lighthouse across all 4 categories (Performance, Accessibility, Best Practices, SEO).
- Images must use Next.js `<Image>` component with:
  - `priority` on above-the-fold hero image.
  - `loading="lazy"` on all below-the-fold images.
  - Proper `sizes` attribute matching the responsive breakpoints.
  - WebP format served automatically by Next.js image optimization.
- Fonts must be loaded with `next/font` to avoid layout shift (CLS).
- Third-party scripts (Google Analytics, Google Maps) must be lazy-loaded.
- Implement proper caching headers via Vercel configuration.
- Use `next/dynamic` for heavy components that are below the fold (e.g., gallery lightbox, Google Maps embed).

**Error Handling:**
- Custom 404 page (`/not-found`) with:
  - KostKu branding (same header/footer as main site).
  - A friendly message in Indonesian: "Halaman Tidak Ditemukan"
  - A description: "Maaf, halaman yang Anda cari tidak tersedia."
  - A "Kembali ke Beranda" (Back to Home) button.
- Custom error page (`/error`) for unexpected server errors with:
  - A friendly message: "Terjadi Kesalahan"
  - A "Coba Lagi" (Try Again) button.
- Graceful handling of Supabase connection failures — show cached/stale content if available, or a friendly error state.

**Loading States:**
- All data-fetching pages must show skeleton loaders while content loads.
- The gallery page must show skeleton cards while images load.
- The "Muat Lebih Banyak" button must show a spinner while fetching more items.
- Image placeholders must use blurred low-quality versions (LQIP) or a neutral background color while loading.

**What this milestone does NOT include:**
- Multi-language support (Indonesian only for now).
- PWA (Progressive Web App) functionality.
- A/B testing infrastructure.
- Advanced analytics dashboards (just basic GA4 integration).
- Blog or content marketing pages.
- Social media integration beyond Open Graph meta tags.

### 6. Technical Design (High-Level)

**SEO Implementation:**
- Use Next.js `metadata` export in each page's `page.tsx` to define meta tags.
- For dynamic metadata (using Supabase data), use the `generateMetadata` async function.
- Structured data (JSON-LD) is rendered as a `<script type="application/ld+json">` tag within the page component.
- The `LocalBusiness` structured data fetches address, phone, and coordinates from `site_settings` at build time.
- Aggregate rating is computed by averaging all visible testimonials' ratings.

**Sitemap Generation:**
- Use Next.js App Router's `sitemap.ts` convention to auto-generate `sitemap.xml`.
- Query Supabase for the latest `updated_at` timestamps to set `lastmod`.
- `robots.ts` convention generates `robots.txt` with:
  - `User-agent: *`
  - `Allow: /`
  - `Disallow: /admin`
  - `Sitemap: https://{domain}/sitemap.xml`

**Google Maps Integration:**
- Store `latitude`, `longitude`, and `maps_embed_url` in `site_settings`.
- Use an iframe embed approach (simpler, no API key billing concerns):
  ```
  Pseudo: <iframe src="maps_embed_url" loading="lazy" />
  ```
- Wrap in an Intersection Observer to only load when visible.
- Mobile "Open in Maps" button uses `geo:` URI scheme or Google Maps deep link.

**Analytics Architecture:**
- Load GA4 script using `next/script` with `strategy="afterInteractive"`.
- Create a shared utility function `trackEvent(eventName, params)` that wraps `gtag('event', ...)`.
- Call `trackEvent` from onClick handlers on WhatsApp buttons, CTA buttons, filter tabs, and room booking buttons.
- Each event includes contextual parameters (source section, room type, category name).

**Performance Strategy:**
- Fonts: Use `next/font/google` for Playfair Display, Inter, and Geist Mono. This auto-optimizes font loading and eliminates external requests.
- Images: Configure `next.config.js` with Supabase Storage as a remote image domain. Use `<Image>` with appropriate sizes for each breakpoint.
- Code splitting: Next.js App Router automatically code-splits per route. Use `next/dynamic` for the gallery lightbox component and Google Maps embed.
- Prefetching: Next.js Link component auto-prefetches visible links. Ensure gallery page is prefetched from the landing page "Lihat Semua" button.

**Error Handling Architecture:**
- `not-found.tsx` in the app directory for 404 pages.
- `error.tsx` in the app directory for runtime errors (must be a Client Component with error boundary).
- `global-error.tsx` as a top-level fallback.
- Supabase queries wrapped in try/catch blocks with fallback UI states.

**Database Additions:**
- No new tables needed.
- Add `latitude` and `longitude` keys to `site_settings` if not already present.
- Add `maps_embed_url` key to `site_settings`.
- Add `ga_measurement_id` key to `site_settings` (so the family can update the analytics ID from admin if needed).

### 7. Relevant Files to Review

- `/kost.pen` — Design file for visual reference on all page layouts
- `/tasks/2026-04-03-m1-foundation-landing-page.md` — M1 PRD with project setup and design tokens
- `/tasks/2026-04-03-m2-gallery-page-media.md` — M2 PRD with gallery page specifications
- `/tasks/2026-04-03-m3-admin-panel.md` — M3 PRD with admin panel and site_settings schema
- `/src/app/layout.tsx` — Root layout where fonts and analytics script are configured
- `/src/app/page.tsx` — Landing page where SEO meta and structured data are added
- `/src/app/gallery/page.tsx` — Gallery page where breadcrumb structured data is added
- `/src/components/WhatsAppButton.tsx` — Component where click tracking is added
- `/next.config.js` — Configuration for image domains and performance settings
- `/tailwind.config.ts` — Design token configuration

### 8. Open Questions / Concerns — RESOLVED

> Owner responses recorded on 2026-04-03.

1. **Address and coordinates:** ✅ RESOLVED — Will be provided later by the owner. Stored dynamically in `site_settings` table. Must be editable via admin panel. Use placeholder coordinates for Jakarta in the meantime.

2. **Analytics:** ✅ RESOLVED — Not needed for initial setup. Will decide on GA4 vs. simpler alternative when implementing M4.

3. **Domain name:** ✅ RESOLVED — Custom domain planned but not yet acquired. Use Vercel subdomain for now. Sitemap and canonical URLs should use an environment variable for the base URL so it's easy to switch.

4. **SEO keywords:** Will be defined later by the owner. Meta descriptions should be written with generic Kost-related terms for now and updated when keywords are provided.

5. **Google Maps marker:** Use basic pin for v1. Branded marker is a nice-to-have for later.

6. **Cookie consent:** Skip for now. Not legally required in Indonesia.

7. **Privacy page:** Defer. Keep the footer link as `#` placeholder.

8. **hreflang tags:** Skip entirely. Indonesian only for the foreseeable future.

9. **Share button:** Nice-to-have. Implement if time permits during M4.
