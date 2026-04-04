## Product Requirements Document (PRD)

### 1. Product Overview

Make the KostKu codebase a reusable template so that each new Kost business can fork the repository and configure it entirely through environment variables, the admin settings panel, and seed data — without editing any source code.

### 2. Current State

The website is fully functional with 4 milestones complete (Landing Page, Gallery, Admin Panel, SEO). However, the brand name "KostKu" is hardcoded in ~50 places across 18 files. SEO metadata, social links, copyright, and the brand logo are also hardcoded. The admin panel already manages some dynamic content (rooms, gallery, testimonials, facilities, site settings) but several areas still require code edits to rebrand.

**What's already configurable via admin panel:**
- Site name, phone, WhatsApp number, email, address
- Hero headline, subtitle, image URL
- WhatsApp greeting message
- Latitude, longitude, maps embed URL
- All content entities (rooms, gallery, testimonials, facilities)

**What's still hardcoded:**
- Brand name "KostKu" in page titles, metadata, Navbar, Footer, AdminShell, login page
- SEO metadata (titles, descriptions, OG tags) across all pages
- Social media links (Instagram, Facebook, Twitter) — set to "#"
- Copyright year (hardcoded 2026)
- JSON-LD structured data fallbacks
- No logo support (text-only branding)
- Admin page titles all say "Admin KostKu"

### 3. Target State

After implementation, a new Kost business can:
1. Fork the repo
2. Run `supabase/schema.sql` and customize `supabase/seed.sql` with their business info
3. Set env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`)
4. Deploy — the entire site reflects their brand with zero code changes

All brand references, metadata, and social links are driven by `site_settings` table values. The admin panel provides UI for managing all configurable settings.

### 4. User Stories

- As a **kost owner**, I want to fork this template and have my business name appear everywhere after changing one database setting, so that I don't need to edit code.
- As a **kost owner**, I want to add my social media links through the admin panel, so that visitors can find my Instagram/Facebook pages.
- As a **kost owner**, I want to upload my business logo through the admin panel, so that my branding appears in the navbar and footer.
- As a **kost owner**, I want SEO metadata to automatically use my business name and description, so that search engines show my brand correctly.
- As a **developer**, I want a single `getSiteSettings()` helper that caches settings, so that multiple components can access brand info without redundant database queries.

### 5. Functional Requirements

**Must do:**
- Create a shared `getSiteSettings()` server-side helper that fetches and returns all `site_settings` as a typed object with fallback defaults
- Replace all ~50 hardcoded "KostKu" references with dynamic `site_name` from settings
- Make all `generateMetadata()` functions use `site_name` for titles and descriptions
- Add `instagram_url`, `facebook_url`, `tiktok_url` fields to site_settings and admin form
- Add `logo_url` field to site_settings with image upload in admin form
- Make Navbar, Footer, AdminShell, and Login page use dynamic site_name and logo
- Make Footer copyright year dynamic (`new Date().getFullYear()`)
- Make JSON-LD structured data fully driven by site_settings
- Update seed.sql with all new settings keys and generic placeholder values
- Update admin SettingsForm to include all new fields (social links, logo, maps embed URL, GA ID)

**Must NOT do:**
- Do not implement multi-tenant architecture (separate repos per kost)
- Do not add a theme/color editor in admin (CSS-level customization stays in code)
- Do not change the database schema for existing tables
- Do not break the fallback data pattern (site must work without Supabase)

### 6. Technical Design (High-Level)

**A. Shared Settings Helper (`lib/settings.ts`)**
- New file exporting `getSiteSettings()` async function
- Fetches all rows from `site_settings` table, converts to a key-value map
- Returns a typed `SiteSettings` interface with all known keys
- Includes fallback defaults for every key (generic text like "Nama Kost" instead of "KostKu")
- Uses try/catch to gracefully handle missing Supabase connection

**B. Dynamic Metadata**
- Root layout (`app/layout.tsx`): Call `getSiteSettings()` to populate `title`, `description`, `openGraph.siteName`
- Each page's `generateMetadata()`: Use `site_name` from settings in title template
- Pattern: `"Galeri | {site_name} — Kost Modern di {city}"`

**C. Dynamic Brand Components**
- Navbar: Accept `siteName` and `logoUrl` as props from parent server component, or fetch settings internally
- Footer: Fetch settings for brand name, contact info, social links, copyright year
- AdminShell: Fetch site_name for sidebar and mobile header branding
- Login page: Fetch site_name for heading text

**D. New Site Settings Keys**
- `instagram_url` (string, default: "")
- `facebook_url` (string, default: "")
- `tiktok_url` (string, default: "")
- `logo_url` (string, default: "")
- `seo_description` (string, default: generic kost description)

**E. Admin Settings Form Update**
- Add new fields to SettingsForm component
- Group fields into sections: Branding, Contact, Hero, Social Media, SEO, Advanced
- Add logo upload with image preview (reuse storage abstraction)
- Add maps_embed_url and ga_measurement_id fields (already in DB, not in UI)

**F. Seed Data Update**
- Add all new keys to seed.sql with generic placeholder values
- Replace "KostKu" in existing seed data with generic text
- Update seed email to generic placeholder

### 7. Relevant Files to Review

- `lib/types.ts` — TypeScript interfaces, add SiteSettings interface
- `components/admin/SettingsForm.tsx` — Admin form, needs new fields
- `components/landing/Navbar.tsx` — Brand name display
- `components/landing/Footer.tsx` — Brand, contact, social links, copyright
- `components/admin/AdminShell.tsx` — Admin sidebar branding
- `components/admin/LoginForm.tsx` — Login email placeholder
- `app/layout.tsx` — Root metadata
- `app/page.tsx` — Home page metadata and JSON-LD
- `app/gallery/page.tsx` — Gallery metadata and breadcrumb JSON-LD
- `app/admin/login/page.tsx` — Login page heading
- `app/admin/layout.tsx` — Admin layout metadata
- `app/admin/*/page.tsx` — All admin page metadata titles
- `lib/jsonld.ts` — Structured data builders
- `supabase/seed.sql` — Seed data for new settings
- `app/not-found.tsx` — 404 page branding

### 8. Open Questions / Concerns

- **Medium** — Should social links use TikTok instead of Twitter? TikTok is more relevant for Indonesian kost marketing. → Decided: Use TikTok (replacing Twitter/X).
- **Low** — Should the admin settings form support image upload for logo, or just a URL field? → Decided: Image upload using existing storage abstraction for consistency.
- **Low** — Should we add a `city` setting for location-specific SEO text? Currently "Jakarta" is implied in several metadata strings. → Decided: Yes, add `city` field to make SEO text fully dynamic.
