## Product Requirements Document (PRD)

# Milestone 1: Foundation + Landing Page

---

### 1. Product Overview

KostKu is a marketing website for a family-owned Kost (Indonesian boarding house) business. The website's primary goal is to showcase rooms, facilities, and the living environment to prospective tenants, and drive them to make contact via WhatsApp.

Milestone 1 delivers the complete technical foundation (Next.js project, Supabase backend, design system) and a fully functional, responsive Landing Page that matches the existing UI mockups in `kost.pen`.

---

### 2. Current State

- **No codebase exists.** This is a greenfield project.
- UI mockups exist in `/kost.pen` (a Pencil design file) with four frames:
  - Desktop Landing Page (1440px wide)
  - Mobile Landing Page (390px wide)
  - Desktop Gallery Page (1440px wide)
  - Mobile Gallery Page (390px wide)
- Generated reference images exist in `/images/` (9 PNG files used during the design process).
- No database, no hosting, no domain configuration exists yet.

---

### 3. Target State

After Milestone 1 is complete:

- A Next.js 14+ (App Router) project is initialized with Tailwind CSS v4, configured with the "Heritage Warmth" design token palette.
- A Supabase project is set up with PostgreSQL tables for all core data entities (rooms, gallery, testimonials, facilities, site_settings), storage buckets for media, and row-level security policies.
- Seed data is loaded so the site renders real content from the database on first deploy.
- The Landing Page is fully built and responsive, matching the design for both desktop (1440px) and mobile (390px) breakpoints.
- The site is deployed to Vercel and publicly accessible.
- WhatsApp contact integration works via deep links with pre-filled messages.

---

### 4. User Stories

**Prospective Tenant (Visitor)**

- As a prospective tenant, I want to see the kost's hero image and tagline immediately on load so that I get a strong first impression of the property.
- As a prospective tenant, I want to browse all available facilities so that I can evaluate whether the kost meets my needs.
- As a prospective tenant, I want to see room types with photos, pricing, and amenity lists so that I can compare options and decide which room fits my budget.
- As a prospective tenant, I want to see a preview of the gallery (photos and a video indicator) so that I get a sense of the living environment before visiting.
- As a prospective tenant, I want to read testimonials from current residents so that I feel confident the kost is well-managed.
- As a prospective tenant, I want to tap a WhatsApp button and have a message pre-filled so that contacting the owner is effortless.
- As a prospective tenant visiting from my phone, I want the page to look and work well on my mobile device so that I can browse comfortably.

**Kost Owner (Admin — future milestone)**

- As the kost owner, I want room data, testimonials, and settings stored in a database so that content can be updated without redeploying the site.

---

### 5. Functional Requirements

#### 5.1 Project Foundation

- Initialize a Next.js 14+ project using the App Router (`/app` directory).
- Use TypeScript throughout.
- Install and configure Tailwind CSS v4.
- Configure custom design tokens in the Tailwind config (see Section 6 for exact values).
- Install and configure the three font families via `next/font`:
  - **Playfair Display** (headings) — weights: 700.
  - **Inter** (body text) — weights: 400, 500, 600.
  - **Geist Mono** (data/pricing) — weights: 400, 600.
- Set up Supabase client using `@supabase/supabase-js` with environment variables for the project URL and anon key.
- Create a `.env.local.example` file documenting required environment variables (do NOT commit actual secrets).
- Set up the Vercel project and configure environment variables for Supabase.

#### 5.2 Database Schema

All tables described in Section 6. Seed data must be inserted so the landing page renders content on first deploy. The seed script should be runnable via a single command.

#### 5.3 Landing Page Sections

The landing page is a single route (`/`) composed of these sections, rendered top-to-bottom:

**A. Navbar (inside Hero)**
- Logo text "KostKu" on the left (Playfair Display, 26px desktop / 22px mobile, bold, white).
- Navigation links on the right: "Rooms", "Facilities", "Gallery", "Contact" (Inter, 15px, medium weight, white). These are anchor links that smooth-scroll to the corresponding section on the page.
- On mobile: replace nav links with a hamburger menu icon (Lucide `menu` icon, 24px). Tapping it opens a slide-down or slide-in mobile menu with the same links.
- The navbar sits on top of the hero image (absolute positioned over the hero).

**B. Hero Section**
- Full-width background image with a dark overlay (approximately 40% black opacity).
- Desktop: 1440px wide, 700px tall. Mobile: 390px wide, 580px tall.
- Centered content (vertical and horizontal):
  - Headline: "Temukan Kost Nyaman untuk Hunian Anda" (Playfair Display, 56px desktop / 28px mobile, bold, white).
  - Subtitle: "Kost modern dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau." (Inter, 18px desktop / 14px mobile, white with slight transparency).
  - CTA button: "Lihat Kamar" — pill-shaped (`rounded-full`), filled with `accent-primary`, text white Inter 16px semibold, padding 16px vertical / 36px horizontal. This button scrolls to the Room Types section.

**C. Facilities Section**
- Background: `surface-primary`.
- Section tag pill: "Fasilitas Kami" in a small pill with `surface-secondary` background.
- Section title: "Fasilitas Lengkap untuk Kenyamanan Anda" (Playfair Display, 40px desktop / 24px mobile, bold, `fg-primary`).
- Section subtitle: descriptive line (Inter, 16px desktop / 13px mobile, `fg-secondary`).
- A grid of 6 facility cards. Each card has:
  - A Lucide icon (32px, `accent-primary` color). Icons used: `wifi`, `wind`, `car`, `shirt`, `cooking-pot`, `shield-check`.
  - Title (Inter, 18px, semibold, `fg-primary`).
  - Description (Inter, 14px, normal, `fg-secondary`).
  - Card background: `surface-secondary`, corner radius `rounded-2xl` (16px), padding 32px.
- Desktop grid layout: Row 1 has 2 cards (first card fixed ~700px wide, second fills remaining). Row 2 has 3 equal-width cards. Row 3 is a single full-width card with a horizontal layout (icon left, text right). Gap between cards: 20px. Gap between rows: 20px.
- Mobile grid layout: all cards stack vertically in a single column, full width, gap 12px.
- Desktop padding: 80px vertical, 120px horizontal. Mobile padding: 48px vertical, 24px horizontal.

**D. Room Types Section**
- Background: `surface-secondary`.
- Same tag/title/subtitle pattern as Facilities.
- Tag text: "Pilihan Kamar". Title: "Pilihan Kamar" (Playfair Display, 40px desktop / 24px mobile). Subtitle explaining room options.
- 3 room cards displayed in a horizontal row on desktop (equal width, gap 24px), stacked vertically on mobile (gap 20px).
- Each room card:
  - Top: room photo (220px tall, clipped, fills card width). Image loaded from Supabase storage or a URL stored in the `rooms` table.
  - Body (padding 24px, gap 16px):
    - Room name (Inter, 20px, semibold, `fg-primary`). Example: "Kamar Standard".
    - Price (Geist Mono, 22px, semibold, `accent-primary`). Example: "Rp 1.500.000/bulan".
    - Thin divider line (`surface-secondary`, 1px).
    - Amenity list: 4 items each prefixed with a checkmark. (Inter, 14px, `fg-secondary`). Examples: "Kasur & Lemari", "WiFi Gratis", "Kamar Mandi Dalam", "Parkir Motor".
    - "Pesan Sekarang" button: full-width, `surface-inverse` background, `fg-inverse` text, Inter 14px semibold, `rounded-lg`, padding 14px vertical. This button opens a WhatsApp deep link pre-filled with a message mentioning the room type name.
  - Card: `surface-primary` background, `rounded-2xl`, subtle drop shadow (blur 2, color #0000000a, offset y:1).
- Data for room cards comes from the `rooms` table in Supabase.

**E. Gallery Preview Section**
- Background: `surface-primary`.
- Same tag/title/subtitle pattern. Tag: "Galeri". Title: "Lihat Suasana Kost Kami". Subtitle about exploring photos and videos.
- A bento-style grid (not a regular uniform grid). Desktop layout:
  - Two columns, gap 16px, total height 500px.
  - Left column: 1 large image filling the full height, with a centered video play overlay (72px round play button, "Video Tur Kamar" label, white on dark scrim).
  - Right column: split into two rows (gap 16px).
    - Top row: 2 equal images side by side (gap 16px).
    - Bottom row: 2 items side by side (gap 16px). First is a photo with a small "Video" pill tag overlay (play icon + "Video" text). Second is a "+20 Foto & Video" overlay card (dark background with a faded image behind it, showing count text in large Playfair Display and a subtitle).
  - All images have `rounded-2xl` corners, clipped.
- Mobile layout: a vertical stack of gallery preview images, smaller thumbnails, gap 12px. Simplified from the bento grid to a stacked layout.
- "Lihat Semua Foto & Video" button below the grid: pill-shaped, `surface-secondary` background, text with a right-arrow icon. Links to the Gallery page (`/gallery`).
- Gallery preview images are fetched from the `gallery` table (limited to 5 items for the preview).

**F. Testimonials Section**
- Background: `surface-secondary`.
- Same tag/title/subtitle pattern. Tag: "Testimoni". Title: "Apa Kata Penghuni Kami". Subtitle about resident experiences.
- 3 testimonial cards in a horizontal row on desktop (equal width, gap 24px), stacked vertically on mobile (gap 16px).
- Each testimonial card:
  - 5-star rating line: "★★★★★" (Inter, 18px, `accent-primary`).
  - Quote text (Inter, 15px, `fg-secondary`, line-height 1.6). Wrapped in quotation marks.
  - Divider (1px, `surface-secondary`).
  - Profile row: circular avatar (44px, `accent-primary` background with initials), name (Inter, 14px, semibold), role/duration (Inter, 12px, `fg-muted`).
  - Card: `surface-primary` background, `rounded-2xl`, padding 32px, same subtle shadow as room cards.
- Data comes from the `testimonials` table.

**G. Contact CTA Section**
- Background: `surface-inverse` (dark).
- Tag: "Hubungi Kami" in a small dark pill (#3D3530).
- Title: "Siap Menemukan Kost Impian Anda?" (Playfair Display, 44px desktop / 24px mobile, bold, `fg-inverse`).
- Subtitle: descriptive line about contacting or scheduling a visit (Inter, 16px desktop / 13px mobile, muted light color #8C8782).
- 3 contact info cards in a horizontal row on desktop (gap 40px), stacked vertically on mobile (gap 12px):
  - Phone card: phone icon, "Telepon" label, phone number.
  - WhatsApp card: message-circle icon, "WhatsApp" label, phone number.
  - Location card: map-pin icon, "Lokasi" label, address.
  - Each card: dark background (#3D3530), `rounded-2xl`, padding 24px vertical / 32px horizontal, icon in `accent-primary`, label in muted, value in `fg-inverse`.
- Large CTA button: "Hubungi via WhatsApp" with a message-circle icon (Lucide). Pill-shaped, `accent-primary` background, `fg-inverse` text, Inter 16px semibold, padding 16px vertical / 48px horizontal. On mobile the button is full-width.
- The WhatsApp button opens `https://wa.me/6281234567890?text=<encoded-message>` with a pre-filled greeting message.
- Contact data (phone, WhatsApp number, address) comes from the `site_settings` table.

**H. Footer Section**
- Background: `surface-inverse` (dark).
- Desktop: 3-part layout. Top row has brand column (left) and 3 link columns (right). Mobile: everything stacks vertically.
- Brand column: "KostKu" logo text (Playfair Display, 28px, bold, `fg-inverse`), description text (Inter, 14px, #8C8782, line-height 1.6).
- Link columns:
  - "Navigasi": Beranda, Kamar, Fasilitas, Galeri.
  - "Informasi": Tentang Kami, Syarat & Ketentuan, Kebijakan Privasi, FAQ.
  - "Kontak": phone number, email, address line 1, address line 2.
- Divider: 1px line (#3D3530).
- Bottom row: copyright text left ("© 2026 KostKu. Hak cipta dilindungi."), social icons right (Instagram, Facebook, Twitter — all Lucide icons, 20px, #8C8782).
- Desktop padding: 48px vertical, 120px horizontal. Mobile: 32px vertical, 24px horizontal.

#### 5.4 WhatsApp Integration

- All WhatsApp buttons must use the `https://wa.me/<number>?text=<url-encoded-message>` format.
- The phone number comes from `site_settings`.
- "Pesan Sekarang" buttons on room cards send a message like: "Halo, saya tertarik dengan [Room Name] di KostKu. Bisa info lebih lanjut?"
- The main CTA button sends a general greeting: "Halo, saya tertarik dengan KostKu. Bisa info lebih lanjut?"

#### 5.5 Responsiveness

- Two breakpoints: desktop (>= 1024px) and mobile (< 1024px).
- Design reference: 1440px for desktop, 390px for mobile.
- The page must be fluid between 390px and 1440px. Content should not overflow or break at any intermediate width.
- Max content width is 1440px; the page should center on wider screens.

#### 5.6 What This Milestone Does NOT Include

- No admin panel or CMS. Content is managed directly in Supabase.
- No authentication or login.
- No Gallery page (that is Milestone 2).
- No search or filtering functionality.
- No booking or payment system.
- No animations or transitions beyond simple hover states.
- No SEO optimization beyond basic meta tags (title, description, og:image).
- No analytics integration.

---

### 6. Technical Design (High-Level)

#### 6.1 Project Structure

The project follows the Next.js App Router convention:

```
/app
  layout.tsx         -- Root layout (fonts, global styles, metadata)
  page.tsx           -- Landing page (composes all sections)
  globals.css        -- Tailwind directives + any global CSS
  /gallery
    page.tsx         -- Placeholder for M2
/components
  /landing
    Navbar.tsx
    Hero.tsx
    Facilities.tsx
    RoomTypes.tsx
    GalleryPreview.tsx
    Testimonials.tsx
    ContactCTA.tsx
    Footer.tsx
  /ui               -- Shared UI primitives (SectionTag, Button, etc.)
/lib
  supabase.ts        -- Supabase client initialization (server + client)
  types.ts           -- TypeScript interfaces matching DB schema
  whatsapp.ts        -- Helper to generate WhatsApp deep links
/supabase
  schema.sql         -- Full database schema
  seed.sql           -- Seed data for all tables
```

#### 6.2 Design Tokens (Tailwind Configuration)

All colors and border-radius values must be added as custom theme tokens in the Tailwind config:

**Colors:**
| Token              | Value       |
|--------------------|-------------|
| `surface-primary`  | `#F5F2E9`   |
| `surface-secondary`| `#E8E4D8`   |
| `surface-inverse`  | `#2D2926`   |
| `fg-primary`       | `#2D2926`   |
| `fg-secondary`     | `#5E5954`   |
| `fg-muted`         | `#8C8782`   |
| `fg-inverse`       | `#F5F2E9`   |
| `accent-primary`   | `#7D6B3D`   |

**Border Radius:**
| Token          | Value    |
|----------------|----------|
| `rounded-lg`   | `8px`    |
| `rounded-xl`   | `12px`   |
| `rounded-2xl`  | `16px`   |
| `rounded-full` | `9999px` |

**Fonts:**
| Token     | Family             | Usage                          |
|-----------|--------------------|--------------------------------|
| `heading` | `Playfair Display`  | Section titles, hero headline  |
| `body`    | `Inter`             | Body text, labels, buttons     |
| `mono`    | `Geist Mono`        | Pricing, durations, data       |

#### 6.3 Database Schema (Conceptual)

**`rooms` table:**
- `id` (UUID, primary key)
- `name` (text) — e.g., "Kamar Standard"
- `slug` (text, unique) — e.g., "kamar-standard"
- `price` (integer) — monthly price in IDR, e.g., 1500000
- `price_label` (text) — formatted display, e.g., "Rp 1.500.000/bulan"
- `image_url` (text) — URL to room photo (Supabase storage or external)
- `amenities` (jsonb) — array of amenity strings, e.g., ["Kasur & Lemari", "WiFi Gratis", "Kamar Mandi Dalam", "Parkir Motor"]
- `is_available` (boolean, default true)
- `sort_order` (integer) — for controlling display order
- `created_at` (timestamptz)

**`gallery` table:**
- `id` (UUID, primary key)
- `title` (text) — display name, e.g., "Kamar Standard"
- `media_type` (text) — "photo" or "video"
- `media_url` (text) — URL to the image or video file
- `thumbnail_url` (text, nullable) — for video thumbnails
- `category` (text) — one of: "kamar", "fasilitas", "lingkungan", "video"
- `duration` (text, nullable) — for videos, e.g., "2:45"
- `sort_order` (integer)
- `created_at` (timestamptz)

**`testimonials` table:**
- `id` (UUID, primary key)
- `name` (text) — resident name
- `role` (text) — e.g., "Mahasiswi, 1 tahun tinggal"
- `quote` (text) — the testimonial text
- `rating` (integer) — 1-5 star rating
- `avatar_url` (text, nullable) — URL to avatar image, or null to use initials
- `sort_order` (integer)
- `created_at` (timestamptz)

**`facilities` table:**
- `id` (UUID, primary key)
- `name` (text) — e.g., "WiFi Cepat"
- `description` (text) — e.g., "Internet berkecepatan tinggi tersedia di seluruh area kost."
- `icon_name` (text) — Lucide icon name, e.g., "wifi"
- `sort_order` (integer)
- `created_at` (timestamptz)

**`site_settings` table (key-value store):**
- `key` (text, primary key) — e.g., "whatsapp_number", "phone_number", "address", "email", "site_name", "hero_image_url", "hero_headline", "hero_subtitle", "whatsapp_greeting"
- `value` (text) — the setting value
- `updated_at` (timestamptz)

**Storage Buckets:**
- `rooms` — room photos
- `gallery` — gallery photos and videos
- `avatars` — testimonial avatar images

#### 6.4 Data Fetching Strategy

- All landing page sections use **Server Components** that fetch data at request time using the Supabase server client.
- Each section component fetches only the data it needs (e.g., `Facilities.tsx` queries the `facilities` table ordered by `sort_order`).
- The Supabase client for server-side fetching uses `createServerComponentClient` or the newer `createClient` from `@supabase/ssr`.
- No client-side state management is needed for M1. The landing page is read-only.

#### 6.5 WhatsApp Deep Link Logic

A utility function generates WhatsApp URLs:
- Input: phone number (from site_settings), message template, optional room name
- Output: `https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20Kamar%20Standard%20di%20KostKu.`
- The phone number is stored in international format without the `+` sign (e.g., "6281234567890").
- The message is URL-encoded using `encodeURIComponent`.

#### 6.6 Responsive Design Approach

- Use Tailwind's responsive prefixes (`md:`, `lg:`) to handle layout changes.
- The breakpoint at `lg:` (1024px) is the primary switch between mobile and desktop layouts.
- Mobile-first approach: default styles are for mobile, `lg:` prefixed styles apply for desktop.
- The mobile navbar uses a hamburger menu that toggles visibility. This is the one client-side interactive component (a small Client Component for the menu toggle state).

#### 6.7 Image Handling

- Room card images and gallery preview images use the Next.js `<Image>` component for automatic optimization.
- The hero section uses a CSS background image (applied via Tailwind or inline style) with `object-fit: cover`.
- Supabase Storage public URLs are used as image sources. Configure `next.config.js` to allow the Supabase storage domain in `images.remotePatterns`.

#### 6.8 Deployment

- Deploy to Vercel via Git integration (connect the GitHub repo).
- Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are set in the Vercel dashboard.
- The seed script is run manually against the Supabase project after initial schema migration.

#### 6.9 Security Considerations

- Row Level Security (RLS) is enabled on all tables.
- All tables have a policy allowing public `SELECT` (read) access since this is a public-facing website.
- No `INSERT`, `UPDATE`, or `DELETE` policies for the anon role — content is managed directly in the Supabase dashboard.
- The Supabase anon key is safe to expose in the client since RLS restricts access.
- Storage buckets for rooms, gallery, and avatars are set to public read access.

---

### 7. Relevant Files to Review

- `/kost.pen` — The Pencil design file containing all 4 design frames (desktop/mobile for landing and gallery). This is the source of truth for visual design.
- `/images/` — Generated reference images used during design creation.
- `/prompts/prd-creator.md` — The PRD template and creation guidelines.
- `/prompts/task-breakdown.md` — Guidelines for breaking PRDs into tasks.
- `/prompts/task-executor.md` — Guidelines for executing tasks.
- `/app/layout.tsx` (NEW) — Root layout with fonts, global metadata, Supabase provider.
- `/app/page.tsx` (NEW) — Landing page composing all section components.
- `/app/globals.css` (NEW) — Tailwind directives and global styles.
- `/app/gallery/page.tsx` (NEW) — Placeholder gallery page for M2.
- `/components/landing/Navbar.tsx` (NEW) — Navbar with logo, links, mobile hamburger.
- `/components/landing/Hero.tsx` (NEW) — Hero section with background image, headline, CTA.
- `/components/landing/Facilities.tsx` (NEW) — Facilities grid section.
- `/components/landing/RoomTypes.tsx` (NEW) — Room type cards section.
- `/components/landing/GalleryPreview.tsx` (NEW) — Bento gallery preview section.
- `/components/landing/Testimonials.tsx` (NEW) — Testimonial cards section.
- `/components/landing/ContactCTA.tsx` (NEW) — Contact info + WhatsApp CTA section.
- `/components/landing/Footer.tsx` (NEW) — Footer with brand, links, copyright.
- `/components/ui/SectionHeader.tsx` (NEW) — Reusable tag + title + subtitle pattern.
- `/components/ui/WhatsAppButton.tsx` (NEW) — Reusable WhatsApp deep link button.
- `/lib/supabase/server.ts` (NEW) — Supabase server client initialization.
- `/lib/supabase/client.ts` (NEW) — Supabase browser client initialization.
- `/lib/types.ts` (NEW) — TypeScript interfaces matching DB schema.
- `/lib/whatsapp.ts` (NEW) — WhatsApp deep link URL generator.
- `/lib/storage.ts` (NEW) — Abstract storage interface for file operations.
- `/supabase/schema.sql` (NEW) — Full database schema DDL.
- `/supabase/seed.sql` (NEW) — Seed data for all tables.
- `.env.local.example` (NEW) — Template for environment variables.
- `next.config.ts` (NEW) — Next.js config with image remote patterns.
- `tailwind.config.ts` (NEW) — Tailwind config with Heritage Warmth design tokens.

---

### 8. Open Questions / Concerns — RESOLVED

> Owner responses recorded on 2026-04-03.

1. **Supabase project credentials:** ✅ RESOLVED — No Supabase project yet. Will be created during implementation. Owner will handle account creation when ready.

2. **Domain name:** ✅ RESOLVED — Custom domain planned but not acquired yet. Use Vercel subdomain (`kostku.vercel.app`) for initial deployment. Domain will be configured later.

3. **Hero background image source:** Use stock/placeholder photos for now. Real photos will be uploaded by the owner via the admin panel (M3).

4. **WhatsApp phone number:** Use placeholder number for now. All contact info (phone, WhatsApp, address) is stored dynamically in `site_settings` table and will be updated by the owner via admin panel.

5. **Real room data:** Use placeholder data matching the design. Actual room types, prices, and amenities will be updated by the owner via admin panel (M3).

6. **Real testimonial data:** Use placeholder data. Owner will manage testimonials via admin panel (M3).

7. **Gallery page link behavior:** Link to `/gallery` — it will be a simple placeholder page in M1 that gets fully built in M2.

8. **Footer links behavior:** Use `#` placeholder links for pages that don't exist yet (Tentang Kami, Syarat & Ketentuan, etc.).

9. **Social media URLs:** Use `#` placeholder links. Owner will provide actual URLs later.

10. **Email address:** Use placeholder `info@kostku.com`. Stored in `site_settings` for dynamic updates.

11. **Favicon and Open Graph image:** Defer to M4. Use default Next.js favicon for now.

12. **Font loading strategy:** Use `next/font/google` for Playfair Display and Inter, `next/font/local` for Geist Mono.

**Architecture Decision — Storage Abstraction:** The storage layer (Supabase Storage) must be abstracted behind an interface so the provider can be swapped later (e.g., to Cloudinary or S3) without changing application code. Current file size limit: 50MB (Supabase free tier).

**Architecture Decision — Analytics:** Skip analytics integration in M1. Will be added in M4.

---

### 9. Task Breakdown

# Task 1 — Project Initialization & Tooling

- [x] Task 1.1
Initialize Next.js 14+ project with App Router and TypeScript in the current directory. Use `create-next-app` with the `--app`, `--ts`, `--tailwind`, `--src-dir=false` flags (keeping `/app` at root level). Remove boilerplate content from the generated files.

- [x] Task 1.2
Configure Tailwind CSS with Heritage Warmth design tokens. Add all custom colors (`surface-primary`, `surface-secondary`, `surface-inverse`, `fg-primary`, `fg-secondary`, `fg-muted`, `fg-inverse`, `accent-primary`), border radius values (`rounded-lg` 8px, `rounded-xl` 12px, `rounded-2xl` 16px, `rounded-full` 9999px), and font family tokens (`heading`, `body`, `mono`) to `tailwind.config.ts`.

- [x] Task 1.3
Set up fonts using `next/font`. Import Playfair Display (weight 700) and Inter (weights 400, 500, 600) via `next/font/google`. Import Geist Mono (weights 400, 600) via `next/font/local` or `next/font/google`. Apply font CSS variables in `app/layout.tsx` and reference them in the Tailwind config.

- [x] Task 1.4
Create `.env.local.example` with placeholders for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Add `.env.local` to `.gitignore`.

- [x] Task 1.5
Configure `next.config.ts` with `images.remotePatterns` to allow Supabase Storage domains and Unsplash (for placeholder images). Set up any other needed Next.js configuration.

# Task 2 — Supabase Schema & Seed Data

- [x] Task 2.1
Create `/supabase/schema.sql` with the full DDL for all 5 tables: `rooms`, `gallery`, `testimonials`, `facilities`, `site_settings`. Include UUID generation (`gen_random_uuid()`), default values, proper column types (text, integer, boolean, jsonb, timestamptz), and constraints.

- [x] Task 2.2
Add Row Level Security (RLS) policies to `schema.sql`. Enable RLS on all tables. Add a policy allowing public `SELECT` on all tables for the `anon` role. No write policies for anon.

- [x] Task 2.3
Create Storage bucket definitions in `schema.sql` (or document the manual steps): `rooms`, `gallery`, `avatars` buckets with public read access.

- [x] Task 2.4
Create `/supabase/seed.sql` with realistic Indonesian placeholder data:
- 3 rooms (Standard Rp 1.500.000, Deluxe Rp 2.500.000, Premium Rp 3.500.000) with amenities.
- 6 facilities (WiFi Cepat, AC & Kipas Angin, Parkir Luas, Laundry, Dapur Bersama, Keamanan 24 Jam).
- 5 gallery items (mix of photos and 1 video, across categories).
- 3 testimonials (matching the design: Aisyah, Budi, Citra).
- Site settings (phone, WhatsApp number, address, email, hero headline/subtitle, site name).
Use Unsplash URLs for placeholder images.

# Task 3 — Supabase Client & TypeScript Types

- [x] Task 3.1
Install `@supabase/supabase-js` and `@supabase/ssr`. Create `/lib/supabase/server.ts` with a function to create a Supabase server client for Server Components. Create `/lib/supabase/client.ts` with a function to create a Supabase browser client (for the mobile menu toggle — minimal client-side usage).

- [x] Task 3.2
Create `/lib/types.ts` with TypeScript interfaces for all database tables: `Room`, `GalleryItem`, `Testimonial`, `Facility`, `SiteSetting`. These should match the schema columns exactly.

- [x] Task 3.3
Create `/lib/whatsapp.ts` with a utility function `generateWhatsAppUrl(phoneNumber: string, message: string): string` that produces the `https://wa.me/...?text=...` deep link with proper URL encoding.

- [x] Task 3.4
Create `/lib/storage.ts` with an abstract storage interface: `getPublicUrl(bucket: string, path: string): string`. Implement the Supabase Storage version. This abstraction allows swapping providers later.

# Task 4 — Shared UI Components & Layout

- [x] Task 4.1
Create `/components/ui/SectionHeader.tsx` — a reusable component that renders the tag pill + title + subtitle pattern used by Facilities, Room Types, Gallery Preview, Testimonials, and Contact CTA sections. Props: `tag`, `title`, `subtitle`, `theme` (light/dark for text color variants), `alignment` (center/left).

- [x] Task 4.2
Create `/components/ui/WhatsAppButton.tsx` — a reusable button that accepts a `message` prop, fetches the WhatsApp number from site settings (or accepts it as prop), and renders an anchor tag with the WhatsApp deep link. Accepts `variant` prop for styling differences (accent fill vs. dark fill, with/without icon).

- [x] Task 4.3
Set up `/app/layout.tsx` as the root layout. Apply font CSS variables to `<html>` tag. Set `lang="id"`. Add basic metadata (title: "KostKu — Kost Modern di Jakarta", description in Indonesian). Import `globals.css`.

- [x] Task 4.4
Set up `/app/globals.css` with Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`). Add any base styles needed (smooth scrolling via `scroll-behavior: smooth` on `html`).

# Task 5 — Landing Page: Hero & Navbar

- [x] Task 5.1
Create `/components/landing/Navbar.tsx`. Desktop: logo text left, nav links right (Rooms, Facilities, Gallery, Contact as anchor links). Mobile: logo text left, hamburger icon right. Tapping hamburger toggles a mobile menu overlay. This is a Client Component (needs `useState` for menu toggle). Links use smooth scroll to section IDs.

- [x] Task 5.2
Create `/components/landing/Hero.tsx`. Full-width section with a background image (from `site_settings` `hero_image_url` or a fallback Unsplash URL). Dark overlay (40% opacity). Centered headline, subtitle, and "Lihat Kamar" CTA button. The CTA scrolls to the Room Types section. Desktop: 700px tall. Mobile: 580px tall. Navbar is rendered inside Hero (absolutely positioned at top).

# Task 6 — Landing Page: Facilities & Room Types

- [x] Task 6.1
Create `/components/landing/Facilities.tsx`. Server Component that fetches facilities from Supabase ordered by `sort_order`. Renders `SectionHeader` + a grid of facility cards. Desktop: custom bento-like layout (2 cards row 1, 3 cards row 2, 1 full-width card row 3). Mobile: single column stack. Each card shows a Lucide icon (dynamically resolved by `icon_name`), title, and description.

- [x] Task 6.2
Create `/components/landing/RoomTypes.tsx`. Server Component that fetches rooms from Supabase ordered by `sort_order`. Renders `SectionHeader` + row of room cards. Each card: room image (Next.js `<Image>`), name, price (Geist Mono), divider, amenities list with checkmarks, "Pesan Sekarang" button (WhatsApp deep link with room name). Desktop: 3 cards in a row. Mobile: stacked vertically.

# Task 7 — Landing Page: Gallery Preview & Testimonials

- [x] Task 7.1
Create `/components/landing/GalleryPreview.tsx`. Server Component that fetches the first 5 gallery items from Supabase. Renders `SectionHeader` + bento grid layout. Desktop: 2-column layout with left tall image (video overlay), right 2x2 grid (one item has "+20 Foto & Video" overlay). Mobile: simplified stacked layout. "Lihat Semua Foto & Video" button links to `/gallery`.

- [x] Task 7.2
Create `/components/landing/Testimonials.tsx`. Server Component that fetches testimonials from Supabase ordered by `sort_order`. Renders `SectionHeader` + row of testimonial cards. Each card: star rating, quote, divider, avatar with initials + name + role. Desktop: 3 cards in a row. Mobile: stacked vertically.

# Task 8 — Landing Page: Contact CTA & Footer

- [x] Task 8.1
Create `/components/landing/ContactCTA.tsx`. Server Component that fetches phone, WhatsApp, and address from `site_settings`. Renders dark section with `SectionHeader` (dark theme), 3 contact info cards (phone, WhatsApp, location), and a large "Hubungi via WhatsApp" CTA button. Desktop: cards in a row. Mobile: stacked. WhatsApp button opens deep link with general greeting.

- [x] Task 8.2
Create `/components/landing/Footer.tsx`. Server Component that fetches contact info from `site_settings`. Renders dark footer with brand column, 3 link columns (Navigasi, Informasi, Kontak), divider, copyright row with social icons. Desktop: horizontal layout. Mobile: stacked. Use `#` for placeholder links.

# Task 9 — Landing Page Assembly & Gallery Placeholder

- [x] Task 9.1
Compose `/app/page.tsx` — import and render all landing page sections in order: Hero (includes Navbar), Facilities, RoomTypes, GalleryPreview, Testimonials, ContactCTA, Footer. Add `id` attributes to each section wrapper for anchor link scrolling (e.g., `id="rooms"`, `id="facilities"`, `id="gallery"`, `id="contact"`).

- [x] Task 9.2
Create `/app/gallery/page.tsx` as a minimal placeholder page. Show a simple "Galeri — Segera Hadir" (Gallery — Coming Soon) message with a link back to home. Reuse Navbar and Footer components.

# Task 10 — Testing, Responsiveness & Final Polish

- [x] Task 10.1
Test the full landing page across breakpoints. Verify that all sections render correctly at 390px (mobile), 768px (tablet), and 1440px (desktop). Fix any overflow, alignment, or spacing issues.

- [x] Task 10.2
Verify all WhatsApp links generate correct URLs with proper encoding. Test that phone number and messages are correctly pulled from `site_settings`.

- [x] Task 10.3
Verify all images load correctly via Next.js Image component. Ensure fallback images work when Supabase is not configured (graceful degradation for local development without Supabase).

- [x] Task 10.4
Create a README.md with setup instructions: how to clone, install dependencies, set up Supabase (run schema.sql, seed.sql), configure `.env.local`, and run `npm run dev`. Include deployment notes for Vercel.
