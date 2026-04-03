## Product Requirements Document (PRD)

# Milestone 2: Gallery Page + Media

---

### 1. Product Overview

This milestone adds a dedicated Gallery Page to the KostKu website. The Gallery Page allows prospective tenants to browse all photos and videos of the kost — filtered by category — in a visually rich, responsive grid. It includes a lightbox viewer for photos, inline/modal video playback, and "Load More" pagination.

This milestone depends on Milestone 1 (Foundation + Landing Page) being complete.

---

### 2. Current State

After M1 is complete, the following exists:

- A deployed Next.js + Tailwind CSS project on Vercel.
- A Supabase backend with tables for `rooms`, `gallery`, `testimonials`, `facilities`, and `site_settings`, plus storage buckets.
- The `gallery` table is seeded with initial photo and video entries, each having a `category`, `media_type`, `media_url`, `thumbnail_url`, and `duration` field.
- A fully functional Landing Page at `/` with a Gallery Preview section that links to `/gallery`.
- Shared components: Navbar, Footer, design tokens, Supabase client utilities, WhatsApp helper.
- The `/gallery` route either does not exist or shows a placeholder.

---

### 3. Target State

After Milestone 2 is complete:

- The `/gallery` route renders a full Gallery Page matching the design for both desktop (1440px) and mobile (390px).
- Visitors can filter gallery items by category tabs: Semua (all), Kamar (rooms), Fasilitas (facilities), Lingkungan (environment), Video.
- Photos open in a lightbox/modal viewer with navigation (next/previous) and swipe support on mobile.
- Videos play inline or in a modal with standard playback controls.
- The gallery uses "Muat Lebih Banyak" (Load More) pagination to incrementally load more items.
- All images are optimized via the Next.js Image component.
- Video items display a thumbnail with a play button overlay and duration badge.
- Each gallery item displays a category tag overlay on the image.
- Breadcrumb navigation shows "Beranda > Galeri" at the top.

---

### 4. User Stories

**Prospective Tenant (Visitor)**

- As a prospective tenant, I want to see all photos and videos of the kost in one place so that I can thoroughly evaluate the property before contacting the owner.
- As a prospective tenant, I want to filter gallery items by category (rooms, facilities, environment, videos) so that I can focus on what matters most to me.
- As a prospective tenant, I want to tap a photo and view it in a larger lightbox so that I can see details clearly.
- As a prospective tenant, I want to swipe through photos in the lightbox on my phone so that browsing feels natural.
- As a prospective tenant, I want to play video tours directly on the page so that I can get an immersive view of the kost.
- As a prospective tenant, I want to see a play button and duration on video thumbnails so that I can distinguish videos from photos at a glance.
- As a prospective tenant, I want to load more items progressively so that the page loads quickly and I can see more content when I choose to.
- As a prospective tenant, I want to navigate back to the homepage using the breadcrumb so that I can easily return.

---

### 5. Functional Requirements

#### 5.1 Gallery Page Layout

The gallery page route is `/gallery`. It is composed of:

1. **Navbar** — identical to the landing page navbar, but styled for a light background:
   - Desktop: Logo "KostKu" on the left (Playfair Display, 24px, bold, `fg-primary`). Nav links on the right: Beranda, Kamar, Fasilitas, **Galeri** (highlighted in `accent-primary`, semibold), Kontak. Plus a "Hubungi Kami" CTA button (pill, `accent-primary` background, `fg-inverse` text, Inter 14px semibold).
   - Mobile: Logo "KostKu" on the left (22px), hamburger menu icon on the right (Lucide `menu`, 24px, `fg-primary`).
   - Navbar height: 72px desktop, 60px mobile.
   - Background: `surface-primary`.

2. **Gallery Header** — centered content block below the navbar:
   - Breadcrumb: "Beranda  >  Galeri" (Inter, 14px desktop / 12px mobile, `fg-muted`). "Beranda" is a link to `/`. The `>` separator and "Galeri" are plain text.
   - Page title: "Galeri Foto & Video" (Playfair Display, 48px desktop / 28px mobile, bold, `fg-primary`).
   - Subtitle: "Jelajahi semua foto dan video tur kost kami untuk melihat kenyamanan yang kami tawarkan." (Inter, 18px desktop / 14px mobile, `fg-secondary`, centered, max-width ~640px desktop).
   - Filter tabs row (described in 5.2).
   - Background: `surface-primary`.
   - Desktop padding: 60px top, 120px horizontal, 40px bottom. Mobile padding: 32px top, 20px horizontal, 24px bottom.

3. **Gallery Grid** — the main content area (described in 5.3).

4. **Footer** — identical to the landing page footer.

#### 5.2 Filter Tabs

- A horizontal row of pill-shaped filter buttons.
- Tabs: **Semua**, **Kamar**, **Fasilitas**, **Lingkungan**, **Video**.
- Active tab: `accent-primary` background, `fg-inverse` text, Inter 14px desktop / 13px mobile, semibold.
- Inactive tabs: `surface-secondary` background, `fg-secondary` text, Inter 14px desktop / 13px mobile, medium weight.
- Tab pill padding: 10px vertical / 24px horizontal (desktop), 8px vertical / 16px horizontal (mobile).
- Gap between tabs: 12px desktop, 8px mobile.
- Desktop: tabs are left-aligned within the header. Mobile: tabs are centered and horizontally scrollable if they overflow (with `overflow-x: auto` and `scrollbar-hidden`).
- Clicking a tab filters the gallery grid to show only items matching that category. "Semua" shows all items. "Video" shows only items where `media_type` is "video".
- Filtering should be client-side for the currently loaded items, but also affects the "Load More" query (subsequent loads should respect the active filter).
- When switching tabs, the grid resets to the first page of results for the new category.
- The active tab should be reflected in the URL as a query parameter (e.g., `/gallery?category=kamar`) so that direct links to filtered views work. "Semua" uses no query parameter or `?category=semua`.

#### 5.3 Gallery Grid

**Desktop layout (3-column grid with varying row heights):**

The design shows 5 rows of gallery items in a 3-column layout, but the actual grid is data-driven and should adapt to however many items exist. The implementation should follow these principles:

- Default grid: 3 equal-width columns, gap 20px between items.
- Standard photo items: occupy 1 column, 320px tall.
- Featured video items: can span 2 columns, 380px tall (the design shows "Video Tour Kamar" at 2-column width in Row 2).
- Each row is a horizontal flex container with gap 20px.
- Determine the layout pattern programmatically: if an item is a "featured video" (a flag in the data or the first video in the set), it gets 2 columns; otherwise items are placed 3 per row.
- Padding: 0 top, 120px horizontal, 80px bottom.

**Mobile layout (mixed layout):**

The mobile design uses a more varied layout:
- Featured video items: full width, 220px tall, with the video overlay.
- Standard rows: 2 items side by side, gap 12px, 170px tall.
- Full-width photo items: occasionally a single photo spans the full width at 220px tall.
- The exact pattern from the design alternates between: featured video, 2-col row, full-width, 2-col row, 2-col row, featured video, 2-col row.
- For implementation, use a simpler repeating pattern: featured videos go full-width, photos alternate between 2-col rows and occasional full-width items.
- Padding: 0 top, 20px horizontal, 48px bottom.
- Gap between items/rows: 12px (mobile) vs 20px (desktop).

**Gallery item appearance (photo):**
- Rounded corners: `rounded-2xl` (desktop), `rounded-xl` (mobile).
- Image fills the entire item frame using `object-fit: cover`.
- Category tag overlay: positioned at the bottom-left of the image, 16px padding from edges (desktop), 10-14px on mobile.
  - Tag pill: `#000000AA` (black with ~67% opacity) background, `rounded-full`, padding 6px vertical / 14px horizontal (desktop), 4px vertical / 10px horizontal (mobile).
  - Tag text: the item's category name (e.g., "Kamar Standard", "Dapur Bersama", "Lingkungan"), Inter 12px desktop / 10px mobile, `#FFFFFFEE` (white with slight transparency), medium weight.
- Clicking a photo opens the lightbox (Section 5.4).

**Gallery item appearance (video):**
- Same rounded corners and image fill as photos, but with an overlay on top of the thumbnail.
- Featured video overlay (large, e.g., 2-column desktop or full-width mobile):
  - Full dark scrim: `#00000040` (black 25% opacity) covering the entire item.
  - Centered content (vertically and horizontally):
    - Play button: a round white circle (64px desktop / 56px mobile) with a Lucide `play` icon (32px desktop / 24px mobile, `fg-primary` color) centered inside.
    - Video title: e.g., "Video Tur Kamar Standard" (Inter, 15px desktop / 13px mobile, semibold, `#FFFFFFEE`).
    - Duration: e.g., "2:45" (Geist Mono, 13px desktop / 12px mobile, `#FFFFFF99`).
  - Gap between elements: 8px desktop, 6px mobile.
- Small video overlay (1-column items):
  - A small pill tag at the bottom-left (same position as category tags on photos).
  - Pill contains: Lucide `play` icon (16px, `#FFFFFFEE`) + "Video" text (Inter, 12px, semibold, `#FFFFFFEE`).
  - Pill background: `#000000AA`, `rounded-full`, padding 8px vertical / 14px horizontal, gap 8px.
- Clicking a video item starts video playback (Section 5.5).

#### 5.4 Photo Lightbox

- When a visitor clicks/taps a photo in the grid, a full-screen (or near-full-screen) modal overlay opens.
- The lightbox displays the photo at a larger size, centered on screen, with a dark backdrop.
- Navigation controls:
  - Left/right arrow buttons (or chevron icons) to go to the previous/next photo.
  - On mobile: swipe left/right gestures to navigate between photos.
  - Keyboard support: left/right arrow keys, Escape to close.
- A close button (X icon) in the top-right corner.
- The lightbox only cycles through items matching the current filter. Videos are excluded from the lightbox cycle (they open their own player).
- Display the item's category tag or title somewhere in the lightbox (e.g., bottom-left caption).
- Display the current position: "3 / 20" style indicator.
- The body should not scroll while the lightbox is open (`overflow: hidden` on body).
- Consider using a lightweight library (e.g., `yet-another-react-lightbox` or build a custom component). The choice should be documented.

#### 5.5 Video Player

- When a visitor clicks/taps a video item, the video plays.
- Two acceptable approaches (choose one and document the choice):
  - **Inline expansion:** The video replaces the thumbnail in the grid and plays using a native HTML5 `<video>` element with controls.
  - **Modal player:** A modal similar to the lightbox opens with the video player centered. Includes a close button. The modal has a dark backdrop.
- The video player should have standard controls: play/pause, progress bar, volume, fullscreen.
- On mobile, tapping a video should ideally go fullscreen automatically for the best viewing experience.
- Video files are stored in Supabase Storage (`gallery` bucket) or referenced via external URLs.
- While the video is loading, the thumbnail should remain visible (avoid a blank frame).

#### 5.6 "Muat Lebih Banyak" Pagination

- Below the grid, display a count label: "Menampilkan X dari Y foto & video" (Inter, 14px desktop / 12px mobile, `fg-muted`, centered).
  - X = number of currently displayed items.
  - Y = total items matching the current filter.
- Below the count, a "Muat Lebih Banyak" (Load More) button:
  - Desktop: pill-shaped, `accent-primary` background, `fg-inverse` text (Inter, 14px semibold), with a Lucide `chevron-down` icon (16px). Padding 14px vertical / 40px horizontal.
  - Mobile: same style, pill-shaped, padding 12px vertical / 32px horizontal, text 13px, icon 14px.
- Clicking the button loads the next batch of items (e.g., 12 items per batch, configurable).
- New items are appended below the existing items (the grid grows, no page reload).
- When all items have been loaded, the button and count label are either hidden or the button is replaced with a "Semua item telah dimuat" message.
- The initial page load shows the first batch (e.g., 12-15 items for desktop, 12 for mobile).
- Loading state: while fetching the next batch, the button should show a loading indicator (e.g., a spinner replacing the chevron icon, or the text changing to "Memuat...").

#### 5.7 Image Optimization

- All gallery photos must use the Next.js `<Image>` component.
- Configure `sizes` attribute appropriately:
  - Desktop 3-col grid: each image is roughly `(1440 - 240 - 40) / 3 = ~387px` wide. Use `sizes="(min-width: 1024px) 33vw, 50vw"`.
  - Featured 2-col items: `sizes="(min-width: 1024px) 66vw, 100vw"`.
  - Mobile full-width: `sizes="100vw"`.
- Use `loading="lazy"` for items below the fold (which is most of them).
- Images in the first visible row (above the fold) should use `priority={true}` for faster LCP.
- The Supabase storage domain must be configured in `next.config.js` under `images.remotePatterns` (this should already be done in M1).

#### 5.8 Video Thumbnails

- Each video entry in the `gallery` table has a `thumbnail_url` field.
- Thumbnails are generated manually (or via a Supabase Edge Function in a future milestone) and uploaded to the storage bucket.
- For M2, thumbnails are uploaded manually alongside the video. The seed data should include pre-set thumbnail URLs for all video entries.
- The thumbnail is displayed as the video item's background image in the grid.

#### 5.9 Breadcrumb Navigation

- Displayed at the top of the Gallery Header section.
- Format: "Beranda  >  Galeri"
- "Beranda" is a Next.js `<Link>` pointing to `/`.
- The `>` character and "Galeri" are plain text (not clickable, since Galeri is the current page).
- Styling: Inter, 14px, `fg-muted`. On mobile: smaller font (use design reference, likely 12-13px).
- On desktop, the breadcrumb includes a home icon or is text-only (the design shows text-only). On mobile, the design shows a row with Lucide icons: a `home` icon + "Beranda" text + `chevron-right` icon + "Galeri" text.

#### 5.10 What This Milestone Does NOT Include

- No upload interface for gallery items. Media is managed directly in Supabase Storage and the `gallery` table.
- No video transcoding or automatic thumbnail generation (thumbnails are manually uploaded).
- No infinite scroll (the design explicitly uses a "Load More" button pattern).
- No drag-and-drop reordering of gallery items.
- No image download button.
- No social sharing for individual gallery items.
- No comments or reactions on gallery items.

---

### 6. Technical Design (High-Level)

#### 6.1 New Files and Components

```
/app
  /gallery
    page.tsx             -- Gallery page (Server Component shell)
/components
  /gallery
    GalleryHeader.tsx     -- Breadcrumb, title, subtitle, filter tabs
    FilterTabs.tsx        -- Client Component for category filter interaction
    GalleryGrid.tsx       -- Client Component managing grid layout + load more
    GalleryItem.tsx       -- Single gallery item (photo or video)
    PhotoLightbox.tsx     -- Client Component for photo lightbox modal
    VideoPlayer.tsx       -- Client Component for video playback modal/inline
    LoadMoreButton.tsx    -- Client Component for pagination
/lib
  gallery.ts             -- Data fetching functions for gallery items
```

#### 6.2 Data Fetching and State Management

The Gallery Page has interactive behavior (filtering, pagination, lightbox), so it requires a mix of Server Components and Client Components:

- **`/app/gallery/page.tsx`** (Server Component): Fetches the initial batch of gallery items and the total count from Supabase. Reads the `category` query parameter from the URL to determine the initial filter. Passes this data as props to the Client Components.

- **`GalleryGrid.tsx`** (Client Component): Manages the state of:
  - Currently displayed items (array that grows as user loads more).
  - Current category filter.
  - Total count for the current filter.
  - Loading state for "Load More" operations.
  - Whether the lightbox is open and which item is selected.
  
- When the user changes the filter tab, the component:
  1. Updates the URL query parameter using `useRouter` or `useSearchParams` (shallow navigation, no full reload).
  2. Fetches the first batch of items for the new category from Supabase (client-side fetch using the Supabase browser client).
  3. Replaces the current items with the new results.
  4. Resets the count display.

- When the user clicks "Load More":
  1. Fetches the next batch using a Supabase query with `range(offset, offset + batchSize - 1)`.
  2. Appends the new items to the existing array.
  3. Updates the count display.

#### 6.3 Gallery Grid Layout Algorithm

For desktop, use a row-based approach rather than CSS Grid alone, because the design has variable-span items:

- Accept an ordered array of gallery items.
- Walk through the items. For each item:
  - If the item is a "featured" video (`is_featured` flag or the first video encountered per batch), render it spanning 2 columns in a row alongside 1 regular item.
  - Otherwise, render 3 items per row.
- Each row is a flex container (`display: flex`, `gap: 20px`). Items in a 3-col row each have `flex: 1`. In a 2+1 row, the featured item has `flex: 2` and the regular item has `flex: 1`.
- Row heights: 320px for standard rows, 380px for rows with featured videos.

For mobile, use a simpler pattern:
- Featured videos: full width, 220px tall.
- Regular items: alternate between 2-column rows (170px tall) and occasional full-width items (220px tall).
- Use a flex-based layout with `flex-wrap` or manual row construction.

#### 6.4 Lightbox Implementation

- Recommend building a custom lightbox component rather than using a heavy library, since the requirements are straightforward.
- Alternatively, `yet-another-react-lightbox` is a lightweight, well-maintained option if custom development time is a concern.
- The lightbox component:
  - Receives the filtered photo list and the index of the initially selected photo.
  - Renders a fixed-position overlay (`position: fixed`, `inset: 0`, `z-index: 50`).
  - Uses a dark backdrop (e.g., `bg-black/90`).
  - Centers the image using flexbox.
  - Previous/Next buttons are absolutely positioned on the left/right.
  - On mobile, attach touch event listeners for swipe detection (track `touchstart` and `touchend` x-coordinates; a horizontal delta > 50px triggers navigation).
  - Trap focus inside the lightbox for accessibility.
  - Press Escape or click the backdrop to close.

#### 6.5 Video Player Implementation

- Use the native HTML5 `<video>` element. No need for a third-party video player library unless YouTube/Vimeo embeds are required (which they are not for M2).
- The modal approach is recommended for consistency with the lightbox:
  - A fixed-position overlay similar to the lightbox.
  - The `<video>` element centered, with `controls` attribute, `autoPlay` on open.
  - `poster` attribute set to the video's `thumbnail_url` so the thumbnail shows while buffering.
  - Close button in the top-right corner.
- Videos are served from Supabase Storage. Ensure the storage bucket's CORS configuration allows video streaming from the Vercel domain.

#### 6.6 URL State for Filters

- The active filter is stored in the URL query parameter: `/gallery?category=kamar`.
- Use Next.js `useSearchParams()` to read the current filter and `useRouter().push()` or `useRouter().replace()` with `scroll: false` to update it without a full page reload.
- On initial server render, read the `searchParams` prop in the page Server Component to determine which category to pre-fetch.
- This enables direct-linking to filtered views and preserves the filter on page refresh.

#### 6.7 Pagination Query Design

- Each "Load More" request fetches a batch using Supabase's `.range()`:
  - `supabase.from('gallery').select('*', { count: 'exact' }).eq('category', activeCategory).order('sort_order').range(offset, offset + BATCH_SIZE - 1)`
  - For "Semua" (all), omit the `.eq('category', ...)` filter.
  - For "Video", filter by `.eq('media_type', 'video')` instead of category.
- `BATCH_SIZE` is a constant (suggested: 12 items).
- The total count is returned by `{ count: 'exact' }` on the initial query and cached for the current filter session.
- `offset` starts at 0 and increments by `BATCH_SIZE` on each "Load More" click.

#### 6.8 Shared Navbar Component Refactoring

The Gallery page navbar differs from the Landing page navbar:
- The Landing page navbar has white text on a transparent/dark hero background.
- The Gallery page navbar has dark text on a light `surface-primary` background, with navigation links, an active state on "Galeri", and a "Hubungi Kami" CTA button.

Refactor the Navbar into a single shared component that accepts a `variant` prop:
- `variant="transparent"` — white text, no background (landing page hero).
- `variant="solid"` — `fg-primary` text, `surface-primary` background (gallery page and future pages).
- The active link is determined by the current route (use `usePathname()`).

#### 6.9 Performance Considerations

- The initial page load should only fetch the first batch (12-15 items). Supabase queries should use `.limit()` or `.range()` to avoid fetching all gallery data at once.
- Images use `loading="lazy"` by default, with `priority` only on above-the-fold items.
- Video files are not preloaded. They only begin downloading when the user explicitly clicks play.
- Consider using `placeholder="blur"` on Next.js Image components with a low-quality blurred placeholder for perceived performance. This requires generating blur data URLs (can be deferred if complex).

#### 6.10 Accessibility Considerations

- Lightbox: trap keyboard focus, support Escape to close, arrow keys to navigate.
- Video player: ensure the `<video>` element has proper `aria-label` attributes.
- Filter tabs: use `role="tablist"` and `role="tab"` with `aria-selected` for the active tab.
- Gallery items: each item should be a focusable, clickable element (use `<button>` or `role="button"` with `tabIndex={0}`).
- "Load More" button: announce to screen readers when new items are loaded (use `aria-live="polite"` on the count label).

---

### 7. Relevant Files to Review

- `/kost.pen` — Design file. Frames "Gallery Page" (desktop, 1440px) and "Mobile - Gallery Page" (mobile, 390px) are the source of truth for this milestone.
- `/app/page.tsx` — Landing page (M1). Review how sections are composed and how data is fetched.
- `/app/layout.tsx` — Root layout. Fonts (Playfair Display, Inter, Geist Mono) and CSS variables are configured here.
- `/app/globals.css` — Tailwind v4 theme with design tokens (`surface-*`, `fg-*`, `accent-primary`).
- `/app/gallery/page.tsx` — Gallery placeholder page (M1). Currently shows "Segera Hadir" message. Will be replaced.
- `/components/landing/Navbar.tsx` — Landing page navbar (M1). Currently hardcoded for transparent/white style with scroll-to anchors. Will be refactored into a shared component with `variant` prop.
- `/components/landing/Footer.tsx` — Landing page footer (M1). Uses anchor-based nav links (`#rooms`, `#gallery`) which won't work from `/gallery`. Links should be updated to proper routes when reused. Will be reused directly.
- `/components/landing/GalleryPreview.tsx` — Landing page gallery preview (M1). Review how it links to `/gallery` and how it fetches/displays gallery items with fallback data.
- `/components/ui/SectionHeader.tsx` — Reusable section header component with `dark` variant. Review for pattern consistency.
- `/components/ui/WhatsAppButton.tsx` — (NEW) Shared UI component. Review for pattern reference.
- `/lib/supabase/server.ts` — Server-side Supabase client using `@supabase/ssr` with cookie handling. Used for server component data fetching.
- `/lib/supabase/client.ts` — Browser-side Supabase client using `@supabase/ssr`. Will be used for client-side filter/pagination queries.
- `/lib/types.ts` — TypeScript interfaces (M1). `GalleryItem` is defined here (has `is_featured` but missing `alt_text`).
- `/lib/whatsapp.ts` — WhatsApp URL helper. Review for pattern reference.
- `/lib/gallery.ts` — (NEW) Data fetching functions for gallery items. Does not exist yet.
- `/components/gallery/` — (NEW) Gallery component directory. Does not exist yet.
- `/supabase/schema.sql` — Database schema (M1). The `gallery` table is defined here. Missing `alt_text` column.
- `/supabase/seed.sql` — Seed data (M1). Contains only 5 gallery entries; needs expansion to 30-40 items for M2 testing.
- `/next.config.ts` — Next.js config. Image remote patterns already configured for Unsplash and Supabase.
- `/package.json` — Dependencies. No lightbox library installed yet; `yet-another-react-lightbox` will need to be added.
- `/tasks/2026-04-03-m1-foundation-landing-page.md` — M1 PRD. Review for context on shared components and design tokens.

---

### 8. Open Questions / Concerns — RESOLVED

> Owner responses recorded on 2026-04-03.

1. **Video hosting approach:** ✅ RESOLVED — Videos stored in Supabase Storage (50MB limit accepted). Storage layer must be abstracted behind an interface for easy provider swapping later.

2. **Number of gallery items:** Design with pagination supporting unlimited items. Use batch sizes of 12 (mobile) and 15 (desktop) as shown in the design.

3. **Featured video logic:** Use a boolean `is_featured` column on the gallery table. Featured items render larger in the grid.

4. **Lightbox library vs. custom:** Use an existing library (`yet-another-react-lightbox` or similar) to save development time. Can be swapped later if needed.

5. **Mobile filter tab overflow:** Use horizontal scroll for filter tabs on narrow screens.

6. **Gallery page SEO:** Basic meta (title + description) is sufficient for M2. Full SEO is deferred to M4.

7. **Seed data expansion:** Append to existing M1 seed data. Create 30-40 items across all categories for testing.

8. **Lightbox animation:** Use a simple fade-in animation.

9. **Video autoplay:** Do NOT autoplay. User must press play.

10. **Gallery item alt text:** Add an `alt_text` column to the gallery table. Auto-generate from title + category as fallback.

11. **Back-to-top button:** Nice-to-have, add if time permits.

12. **Loading skeleton:** Use skeleton placeholders (gray boxes mimicking the grid layout) for a polished loading experience.

---

### 9. Task Breakdown

#### Phase 1: Schema, Types, and Seed Data

- [x] **1.1 Add `alt_text` column to the gallery table schema.** Update `/supabase/schema.sql` to add an `alt_text TEXT` column to the `gallery` table. This column stores accessible alt text for images/videos and should be nullable (fallback to title + category when empty).

- [x] **1.2 Update the `GalleryItem` TypeScript interface.** In `/lib/types.ts`, add the `alt_text` field (type `string | null`) to the `GalleryItem` interface.

- [x] **1.3 Expand seed data to 30-40 gallery items.** Update `/supabase/seed.sql` to contain 30-40 gallery entries across all categories (`kamar`, `fasilitas`, `lingkungan`) with a mix of `photo` and `video` media types. Include 2-3 items with `is_featured = true`. Use high-quality Unsplash placeholder URLs for photos and thumbnails. Each video entry should have a realistic `duration` value and a distinct `thumbnail_url`. Populate `alt_text` for all items. Ensure `sort_order` values are sequential. Keep the existing 5 entries and append new ones.

#### Phase 2: Shared Navbar Refactor

- [x] **2.1 Refactor Navbar into a shared component with variant support.** Move or refactor `/components/landing/Navbar.tsx` so it accepts a `variant` prop: `"transparent"` (current landing page behavior — white text, no background, absolute positioning, scroll-to anchors) and `"solid"` (gallery/inner page behavior — `surface-primary` background, `fg-primary` text, proper route-based links). For the `"solid"` variant: the logo "KostKu" links to `/`, nav links use `<Link>` with routes (`/` for Beranda, `/#rooms` for Kamar, `/#facilities` for Fasilitas, `/gallery` for Galeri, `/#contact` for Kontak), the active link is determined via `usePathname()` and highlighted with `accent-primary` color and semibold weight, and a "Hubungi Kami" CTA pill button is added on desktop. The mobile hamburger menu should work for both variants. Default variant should be `"transparent"` to avoid breaking the existing landing page.

- [x] **2.2 Add "Beranda" to Navbar nav links for the solid variant.** The landing page Navbar omits "Beranda" from the links (since you're already on it), but the gallery page Navbar needs "Beranda" as the first link. Adjust the nav link list accordingly based on variant or current route.

- [x] **2.3 Update the landing page to use the refactored Navbar.** Confirm that `/app/page.tsx` continues to work correctly with the refactored Navbar using `variant="transparent"` (or the default). No visual changes should occur on the landing page.

- [x] **2.4 Update the gallery page to use the refactored Navbar.** In `/app/gallery/page.tsx`, use the Navbar with `variant="solid"` so it renders with the light background, dark text, route-based links, active state on "Galeri", and the CTA button.

#### Phase 3: Gallery Data Fetching

- [x] **3.1 Create gallery data fetching library.** Create `/lib/gallery.ts` with functions for fetching gallery data from Supabase. Include: (a) `getGalleryItems(category, offset, limit)` — fetches a paginated batch of gallery items, optionally filtered by category or media_type (for "Video" tab), returning both items and total count using `{ count: 'exact' }`. (b) `getGalleryCount(category)` — returns the total count of items for a given filter. Both functions should use the browser Supabase client (since they will be called from Client Components for pagination/filtering). Order results by `sort_order` ascending. Follow the existing fallback pattern (return fallback data if Supabase is unavailable).

- [x] **3.2 Create server-side initial data fetch for gallery page.** Add a server-side function (either in `/lib/gallery.ts` or inline in the page server component) that uses the server Supabase client to fetch the initial batch of gallery items and total count for the SSR render. This should read the `category` search param to determine which filter to apply on first load. Follow the fallback pattern used in other M1 components (e.g., `GalleryPreview.tsx`, `Footer.tsx`).

#### Phase 4: Gallery Page Components

- [x] **4.1 Create the `GalleryHeader` component.** Create `/components/gallery/GalleryHeader.tsx` as a presentational component that renders: (a) Breadcrumb navigation ("Beranda > Galeri") with "Beranda" as a `<Link>` to `/` and mobile-specific styling with Lucide `home` and `chevron-right` icons. (b) Page title "Galeri Foto & Video" using Playfair Display. (c) Subtitle text using Inter. Apply the padding and typography specs from section 5.2 of the PRD for both desktop and mobile.

- [x] **4.2 Create the `FilterTabs` component.** Create `/components/gallery/FilterTabs.tsx` as a Client Component that renders the five filter tabs (Semua, Kamar, Fasilitas, Lingkungan, Video) as horizontally arranged pill buttons. Active tab has `accent-primary` background with inverse text; inactive tabs have `surface-secondary` background. On mobile, the tab row should be horizontally scrollable with hidden scrollbars. Use `useSearchParams` to read and `useRouter` to update the `category` query parameter in the URL without full reload. Apply ARIA attributes: `role="tablist"` on the container and `role="tab"` with `aria-selected` on each tab. When a tab is clicked, emit an `onFilterChange` callback (or manage state via URL params) so the grid resets and re-fetches.

- [x] **4.3 Create the `GalleryItem` component.** Create `/components/gallery/GalleryItem.tsx` as a component that renders a single gallery item (photo or video). For photos: render the image using Next.js `<Image>` with `object-cover`, rounded corners, and a category tag overlay pill at the bottom-left. For videos: render the thumbnail image with a dark scrim overlay. Featured/large videos show a centered play circle, title, and duration. Small/non-featured videos show a compact pill with play icon and "Video" text at the bottom-left. Accept props for `item`, `isFeatured` (layout size), and `onClick`. Use `alt_text` from the item (with fallback to `title`) for image alt attributes. The component should be focusable and keyboard-accessible (`role="button"`, `tabIndex={0}`, handle Enter/Space key).

- [x] **4.4 Create the `GalleryGrid` component.** Create `/components/gallery/GalleryGrid.tsx` as a Client Component that manages the gallery state and renders the grid layout. Responsibilities: (a) Maintain state for displayed items array, current category filter, total count, page offset, and loading state. (b) Implement the desktop layout algorithm: walk through items and assign featured videos to 2-column spans with 1 regular item alongside, and place remaining items in 3-per-row arrangements. Use flex rows with `gap-5` and appropriate heights (320px standard, 380px featured). (c) Implement the mobile layout: featured videos span full width at 220px; regular items display in 2-column rows at 170px; occasional full-width photo items at 220px. (d) On filter change (from FilterTabs), reset items and offset, fetch the first batch for the new category using the client-side fetch function, and replace displayed items. (e) On "Load More" click, fetch the next batch and append to existing items. (f) Pass individual items to `GalleryItem` with correct `isFeatured` designation. (g) Track which photos (excluding videos) are in the current filtered set for lightbox navigation.

- [x] **4.5 Install and configure `yet-another-react-lightbox`.** Add the `yet-another-react-lightbox` package (or chosen lightbox library) as a dependency. This library was chosen per open question #4 to save development time.

- [x] **4.6 Create the `PhotoLightbox` component.** Create `/components/gallery/PhotoLightbox.tsx` as a Client Component wrapping the lightbox library. It should: (a) Accept the filtered list of photo items (videos excluded) and the index of the currently selected photo. (b) Display the selected photo in a fullscreen/near-fullscreen overlay with dark backdrop (`bg-black/90`). (c) Provide next/previous navigation via arrow buttons and keyboard arrow keys. (d) Support swipe gestures on mobile (left/right swipe to navigate). (e) Show a close button (X icon) in the top-right; close on Escape key or backdrop click. (f) Display a caption (category tag or title) at the bottom and a position indicator ("3 / 20"). (g) Lock body scroll while open (`overflow: hidden` on body). (h) Use a simple fade-in animation for opening. (i) Trap keyboard focus inside the lightbox for accessibility.

- [x] **4.7 Create the `VideoPlayer` component.** Create `/components/gallery/VideoPlayer.tsx` as a Client Component that renders a modal video player. It should: (a) Open as a fixed-position overlay with dark backdrop, similar to the lightbox. (b) Center a native HTML5 `<video>` element with the `controls` attribute and `poster` set to the video's `thumbnail_url`. (c) Do NOT autoplay — the user must press play. (d) Include a close button (X icon) in the top-right; close on Escape key. (e) Lock body scroll while open. (f) On mobile, consider requesting fullscreen via the Fullscreen API when the user presses play.

- [x] **4.8 Create the `LoadMoreButton` component.** Create `/components/gallery/LoadMoreButton.tsx` as a Client Component that renders: (a) A count label "Menampilkan X dari Y foto & video" centered above the button, using `aria-live="polite"` so screen readers announce count updates. (b) A "Muat Lebih Banyak" pill button with `accent-primary` background, inverse text, and a Lucide `chevron-down` icon. (c) A loading state that replaces the chevron with a spinner and/or changes text to "Memuat..." while fetching. (d) When all items are loaded, hide the button or show "Semua item telah dimuat" message. Accept props for `displayedCount`, `totalCount`, `isLoading`, and `onLoadMore` callback.

#### Phase 5: Page Assembly

- [x] **5.1 Assemble the full gallery page.** Rewrite `/app/gallery/page.tsx` as a Server Component that: (a) Reads the `category` search param from the page props (`searchParams`). (b) Fetches the initial batch of gallery items and total count server-side using the server Supabase client, applying the category filter if present. (c) Sets page metadata (title: "Galeri - KostKu", description about gallery). (d) Renders the page structure: Navbar (solid variant) at top, GalleryHeader with breadcrumb/title/subtitle, FilterTabs with the initial active category, GalleryGrid with initial items/count, and Footer at bottom. (e) Passes initial data as props to the Client Components to avoid a loading flash on first render.

- [x] **5.2 Create a loading skeleton for the gallery page.** Add skeleton placeholder UI (gray boxes mimicking the grid layout) that displays while the gallery data is loading on filter changes or initial hydration. This can be a `GallerySkeleton` component or inline skeleton states within `GalleryGrid`. Match the grid dimensions (3-col desktop / 2-col mobile) with animated pulse placeholders.

- [x] **5.3 Configure image optimization for gallery items.** Ensure all `<Image>` components in gallery items use appropriate `sizes` attributes: `"(min-width: 1024px) 33vw, 50vw"` for standard items, `"(min-width: 1024px) 66vw, 100vw"` for featured/2-col items, and `"100vw"` for mobile full-width items. Apply `loading="lazy"` by default and `priority={true}` for items in the first visible row.

#### Phase 6: Footer Navigation Fix

- [x] **6.1 Update Footer navigation links to work across pages.** The Footer in `/components/landing/Footer.tsx` currently uses anchor links (`#rooms`, `#gallery`) which only work on the landing page. Update the "Navigasi" links to use proper routes that work from any page: "Beranda" should link to `/`, "Kamar" to `/#rooms`, "Fasilitas" to `/#facilities`, "Galeri" to `/gallery`. Use Next.js `<Link>` components for client-side navigation.

#### Phase 7: Testing and Polish

- [x] **7.1 Verify the gallery page renders correctly at desktop (1440px) and mobile (390px) breakpoints.** Compare against the design file frames. Check spacing, typography sizes, color tokens, rounded corners, and grid layout at both widths. Verify the Navbar solid variant matches the design (height, link styles, CTA button).

- [x] **7.2 Test filter tabs behavior.** Verify that clicking each tab (Semua, Kamar, Fasilitas, Lingkungan, Video) filters the grid correctly. Confirm the URL updates with the `category` query parameter. Test direct-linking to a filtered URL (e.g., `/gallery?category=kamar`) and verify it renders the correct filter on page load. Confirm grid resets to page 1 when switching tabs.

- [x] **7.3 Test the photo lightbox.** Open photos in the lightbox and verify: navigation with arrow buttons, keyboard arrows, and mobile swipe. Verify the position indicator updates correctly. Confirm the lightbox only cycles through photos matching the current filter (no videos). Test Escape to close and backdrop click to close. Verify body scroll is locked.

- [x] **7.4 Test the video player.** Click video items and verify the modal opens with the correct video. Confirm the poster/thumbnail shows while loading. Verify standard playback controls work. Confirm the video does NOT autoplay. Test close button and Escape key.

- [x] **7.5 Test Load More pagination.** Verify the initial batch loads correctly. Click "Muat Lebih Banyak" and confirm new items append below existing ones. Verify the count label updates ("Menampilkan X dari Y"). Confirm the button disappears or shows "all loaded" message when all items are fetched. Test that Load More respects the current filter tab.

- [x] **7.6 Test fallback behavior without Supabase.** Temporarily disconnect from Supabase (e.g., remove env vars) and verify the page still renders with fallback data. The page should not crash or show blank content.

- [x] **7.7 Verify accessibility.** Check that filter tabs have proper ARIA roles (`tablist`, `tab`, `aria-selected`). Verify gallery items are keyboard-navigable (focusable, activatable with Enter/Space). Confirm the lightbox traps focus and supports keyboard navigation. Verify the count label has `aria-live="polite"`. Run a basic accessibility audit (e.g., Lighthouse or axe).

- [x] **7.8 Verify Navbar and Footer consistency.** Confirm the landing page Navbar still looks and functions identically after the refactor (no regressions). Confirm the Footer renders correctly on both the landing page and gallery page, with working navigation links from both pages.

- [x] **7.9 Performance check.** Verify images use lazy loading below the fold and priority loading above the fold. Confirm the initial page load only fetches one batch (not all gallery items). Check that no videos are preloaded. Run Lighthouse and aim for good Core Web Vitals scores.
