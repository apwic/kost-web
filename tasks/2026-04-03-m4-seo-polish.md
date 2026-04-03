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

### 9. Task Breakdown

Below is the implementation plan for M4, organized into sequential tasks. Each task lists the files to create or modify, what to do, and an estimated scope.

---

#### Task 1: SEO Meta Tags (Next.js Metadata API)

**Goal:** Every page has unique, complete meta tags including Open Graph and Twitter Card for rich previews on WhatsApp/social media.

**What exists now:**
- `app/layout.tsx` already sets `lang="id"` on `<html>` and has a basic `metadata` export with a static title and description.
- `app/gallery/page.tsx` has a static `metadata` export with title "Galeri - KostKu" and a description.
- No Open Graph tags, no Twitter Card tags, no `og:image` on any page.

**Steps:**
1. In `app/layout.tsx`, convert the static `metadata` export to include shared defaults that apply across all pages:
   - Set `metadataBase` to the site URL (use `NEXT_PUBLIC_SITE_URL` env var, fallback to Vercel URL).
   - Add default `openGraph` config: `siteName`, `locale: "id_ID"`, `type: "website"`.
   - Add default `twitter` config: `card: "summary_large_image"`.
2. In `app/page.tsx`, add a `generateMetadata` async function that fetches `site_name` and `hero_image_url` from `site_settings` via Supabase and returns:
   - `title`: "KostKu -- Kost Modern di Jakarta" (from site_settings or fallback).
   - `description`: A compelling Indonesian meta description (max 160 chars), e.g., "Kost modern dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau di Jakarta. Mulai dari Rp 1,5 juta/bulan."
   - `openGraph`: `title`, `description`, `images` (use `hero_image_url` at 1200x630), `url: "/"`.
   - `twitter`: `title`, `description`, `images`.
   - Wrap Supabase call in try/catch with sensible fallbacks.
3. In `app/gallery/page.tsx`, convert the static `metadata` to a `generateMetadata` async function:
   - `title`: "Galeri | KostKu -- Kost Modern di Jakarta".
   - `description`: "Jelajahi foto dan video tur kost kami. Lihat kamar, fasilitas, dan lingkungan KostKu."
   - `openGraph.images`: Use first featured gallery image or fallback hero.
4. Add `NEXT_PUBLIC_SITE_URL` to `.env.example` (or `.env.local` notes) for documentation.

**Files to modify:** `app/layout.tsx`, `app/page.tsx`, `app/gallery/page.tsx`
**Files to create:** None

---

#### Task 2: Structured Data (JSON-LD)

**Goal:** Add LocalBusiness JSON-LD on the landing page and BreadcrumbList JSON-LD on the gallery page for Google rich results.

**What exists now:** No structured data anywhere.

**Steps:**
1. Create a shared helper `lib/jsonld.ts` with functions:
   - `buildLocalBusinessJsonLd(settings, testimonials)` -- constructs a `LocalBusiness` schema object with: `@type`, `name`, `address` (from `site_settings.address`), `telephone` (from `site_settings.phone_number`), `geo` (from `site_settings.latitude`/`longitude` -- use Jakarta placeholder `-6.2088, 106.8456` if missing), `image`, `priceRange`, `aggregateRating` (computed from visible testimonials' ratings).
   - `buildBreadcrumbJsonLd(items)` -- constructs a `BreadcrumbList` schema.
2. In `app/page.tsx`, fetch address/phone/lat/lng from `site_settings` and testimonials ratings, then render a `<script type="application/ld+json">` tag in the component body with the LocalBusiness data. Reuse existing Supabase fetch patterns (try/catch with fallback).
3. In `app/gallery/page.tsx`, add a `<script type="application/ld+json">` tag with BreadcrumbList: `Home > Galeri`.

**Files to create:** `lib/jsonld.ts`
**Files to modify:** `app/page.tsx`, `app/gallery/page.tsx`

---

#### Task 3: Sitemap and Robots

**Goal:** Auto-generate `sitemap.xml` and `robots.txt` using Next.js App Router conventions.

**What exists now:** No `sitemap.ts` or `robots.ts` files.

**Steps:**
1. Create `app/sitemap.ts`:
   - Export a default async function that returns a `MetadataRoute.Sitemap` array.
   - Include `/` and `/gallery` as entries.
   - Query Supabase for the most recent `updated_at` from `site_settings`, `gallery`, and `rooms` tables to populate `lastModified`.
   - Use `NEXT_PUBLIC_SITE_URL` env var for the base URL (fallback to `https://kostku.vercel.app`).
2. Create `app/robots.ts`:
   - Export a default function returning `MetadataRoute.Robots`.
   - `Allow: /` for all user-agents.
   - `Disallow: /admin` to block admin routes.
   - `sitemap` pointing to `${baseUrl}/sitemap.xml`.

**Files to create:** `app/sitemap.ts`, `app/robots.ts`
**Files to modify:** None

---

#### Task 4: Custom 404 and Error Pages

**Goal:** Branded error pages so users never see raw Next.js error screens.

**What exists now:** No `not-found.tsx`, `error.tsx`, or `global-error.tsx` in the app directory. Only `page.tsx`, `layout.tsx`, `globals.css`, and the `gallery/` route.

**Steps:**
1. Create `app/not-found.tsx` (Server Component):
   - Use the same visual style as the site (import Navbar + Footer from `components/landing/`).
   - Display: "Halaman Tidak Ditemukan" heading, "Maaf, halaman yang Anda cari tidak tersedia." description, and a "Kembali ke Beranda" button linking to `/`.
   - Keep it simple -- no Supabase calls (it must always render even if DB is down).
2. Create `app/error.tsx` (Client Component with `"use client"`):
   - Accept `error` and `reset` props.
   - Display: "Terjadi Kesalahan" heading, a brief message, and a "Coba Lagi" button that calls `reset()`.
   - Minimal layout (do not import Navbar/Footer to avoid cascading failures; use inline branding).
3. Create `app/global-error.tsx` (Client Component):
   - Top-level fallback for root layout errors.
   - Must include its own `<html>` and `<body>` tags.
   - Display a minimal error screen with "Terjadi Kesalahan" and a reload button.

**Files to create:** `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`
**Files to modify:** None

---

#### Task 5: Performance Audit and Fixes

**Goal:** Ensure Lighthouse scores of 90+ across Performance, Accessibility, Best Practices, and SEO.

**What exists now:**
- Fonts are already loaded via `next/font/google` with `display: "swap"` in `app/layout.tsx` -- good.
- Hero image in `Hero.tsx` uses a CSS `background-image` (not optimized by Next.js `<Image>`).
- Gallery images in `GalleryItem.tsx` likely use `<Image>` already.
- Room card images in `RoomTypes.tsx` use `<Image>` with `fill` and `sizes` -- good.
- `next.config.ts` has Unsplash and Supabase as remote image patterns -- good.
- No dynamic imports for heavy below-fold components.
- Lightbox (`yet-another-react-lightbox`) is already a client component, but not dynamically imported.

**Steps:**
1. **Hero image optimization:** In `components/landing/Hero.tsx`, replace the CSS `background-image` with a Next.js `<Image>` component using `fill`, `priority`, and proper `sizes`. This enables automatic WebP conversion and optimized loading.
2. **Dynamic imports for heavy components:**
   - In `components/gallery/GalleryGrid.tsx` (or wherever `PhotoLightbox` is imported), use `next/dynamic` to lazy-load `PhotoLightbox` and `VideoPlayer` so they are not included in the initial JS bundle.
3. **Image `sizes` audit:** Review all `<Image>` components and verify `sizes` attributes match actual responsive breakpoints.
4. **Accessibility pass:**
   - Ensure all interactive elements have proper `aria-label` attributes (check WhatsApp buttons, social links, filter tabs).
   - Verify color contrast ratios meet WCAG AA for all text/background combinations in the design tokens.
   - Add `alt` text to any images missing it.
5. **Run Lighthouse** (manual step): After all code changes, run Lighthouse on both `/` and `/gallery` and fix any remaining issues flagged.

**Files to modify:** `components/landing/Hero.tsx`, `components/gallery/GalleryGrid.tsx` (or related), other components as needed based on audit
**Files to create:** None

---

#### Task 6: Seed Data Updates (lat/lng, maps URL)

**Goal:** Add location coordinates and maps-related settings to seed data so the schema is ready for Google Maps integration (placeholder for now).

**What exists now:**
- `site_settings` table has: `whatsapp_number`, `phone_number`, `address`, `email`, `site_name`, `hero_image_url`, `hero_headline`, `hero_subtitle`, `whatsapp_greeting`.
- No `latitude`, `longitude`, `maps_embed_url`, or `ga_measurement_id` keys.

**Steps:**
1. In `supabase/seed.sql`, add new INSERT statements for `site_settings`:
   - `latitude` = `-6.2088` (Jakarta placeholder).
   - `longitude` = `106.8456` (Jakarta placeholder).
   - `maps_embed_url` = a placeholder Google Maps embed URL for Jakarta (e.g., `https://www.google.com/maps/embed?pb=...` using generic Jakarta coords).
   - `ga_measurement_id` = `''` (empty, to be filled when analytics is set up).
2. In `supabase/schema.sql`, no changes needed -- `site_settings` is a generic key-value table that handles this already.
3. If an `ALTER` migration pattern is used for the project, add a migration file. Otherwise, just update the seed.

**Files to modify:** `supabase/seed.sql`
**Files to create:** None

---

#### Task 7: Analytics Placeholder (Skip Full Implementation)

**Goal:** Per owner decision, skip full analytics integration for now. Add a placeholder so it can be wired up later without structural changes.

**What exists now:**
- `WhatsAppButton.tsx` already has an empty `onClick` handler with a `// Tracking placeholder for analytics` comment.
- No analytics script loaded anywhere.

**Steps:**
1. Create `lib/analytics.ts` with a placeholder `trackEvent(eventName: string, params?: Record<string, string>)` function:
   - For now, it just does a `console.debug` in development and is a no-op in production.
   - Include a `TODO` comment explaining how to wire up GA4 or an alternative when ready.
   - Define typed event name constants: `WHATSAPP_CLICK`, `GALLERY_FILTER`, `CTA_CLICK`, `ROOM_INQUIRY`.
2. Update `components/ui/WhatsAppButton.tsx` to import and call `trackEvent("whatsapp_click", { source })` in the existing `onClick` handler. Add a `source` prop to the component.
3. Add a comment block in `app/layout.tsx` marking where the analytics `<Script>` tag should go when ready.

**Files to create:** `lib/analytics.ts`
**Files to modify:** `components/ui/WhatsAppButton.tsx`, `app/layout.tsx`

---

#### Task 8: Google Maps Placeholder (Skip Full Embed)

**Goal:** Per owner decision, skip the full Google Maps embed for now. Add a placeholder area in the Contact section that can be swapped for a real map later.

**What exists now:**
- `components/landing/ContactCTA.tsx` has a contact section with phone, WhatsApp, and address cards but no map.
- The seed data will have `latitude`/`longitude` after Task 6.

**Steps:**
1. In `components/landing/ContactCTA.tsx`, add a map placeholder below the contact cards:
   - A styled container (matching the section's dark theme) with a MapPin icon, the address text, and a "Buka di Google Maps" link that opens `https://www.google.com/maps/search/?api=1&query={latitude},{longitude}` in a new tab.
   - Fetch `latitude` and `longitude` from `site_settings` (extend the existing `getContactInfo` function).
   - Add a `TODO` comment: "Replace this placeholder with a Google Maps iframe embed or @vis.gl/react-google-maps component."
2. On mobile, the "Buka di Google Maps" link will naturally open the native maps app.

**Files to modify:** `components/landing/ContactCTA.tsx`
**Files to create:** None

---

#### Task 9: Testing and Verification

**Goal:** Verify all M4 changes work correctly across pages and don't break existing functionality.

**Steps:**
1. **Build test:** Run `npm run build` and confirm zero errors. This validates:
   - All metadata exports/generateMetadata functions compile.
   - `sitemap.ts` and `robots.ts` generate valid output.
   - Error pages compile (especially `error.tsx` which must be a Client Component).
   - JSON-LD scripts render without issues.
2. **Manual page checks:**
   - Visit `/` -- verify meta tags in page source (title, description, og:image, twitter:card).
   - Visit `/gallery` -- verify meta tags and breadcrumb JSON-LD in page source.
   - Visit `/nonexistent-route` -- verify custom 404 page renders with branding.
   - Visit `/sitemap.xml` -- verify it lists `/` and `/gallery` with `lastmod` dates.
   - Visit `/robots.txt` -- verify it allows `/`, disallows `/admin`, and points to sitemap.
3. **Structured data validation:** Paste the landing page HTML into Google's Rich Results Test (https://search.google.com/test/rich-results) and confirm LocalBusiness data is valid.
4. **Lighthouse audit:** Run Lighthouse on `/` and `/gallery` in Chrome DevTools. Target 90+ on all four categories. Fix any flagged issues.
5. **Mobile responsiveness:** Test 404 page and maps placeholder on mobile viewport sizes.
6. **Analytics placeholder:** Confirm `trackEvent` calls appear in browser console (dev mode only) when clicking WhatsApp buttons.

**Files to modify:** None (testing only)
**Files to create:** None

---

#### Suggested Implementation Order

| Order | Task | Depends On | Est. Effort |
|-------|------|------------|-------------|
| 1 | Task 6: Seed data updates | None | Small |
| 2 | Task 1: SEO meta tags | None | Medium |
| 3 | Task 2: Structured data (JSON-LD) | Task 1 (metadataBase) | Medium |
| 4 | Task 3: Sitemap + robots | Task 1 (metadataBase) | Small |
| 5 | Task 4: Custom error pages | None | Small |
| 6 | Task 7: Analytics placeholder | None | Small |
| 7 | Task 8: Google Maps placeholder | Task 6 (lat/lng in seed) | Small |
| 8 | Task 5: Performance audit + fixes | Tasks 1-4 done | Medium |
| 9 | Task 9: Testing | All above | Medium |
