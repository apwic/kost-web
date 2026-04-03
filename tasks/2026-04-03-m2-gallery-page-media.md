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
- `/components/landing/Navbar.tsx` — Landing page navbar (M1). Will be refactored into a shared component.
- `/components/landing/Footer.tsx` — Landing page footer (M1). Will be reused directly.
- `/components/landing/GalleryPreview.tsx` — Landing page gallery preview (M1). Review how it links to `/gallery`.
- `/lib/supabase.ts` — Supabase client setup (M1). Same client is used for gallery data fetching.
- `/lib/types.ts` — TypeScript interfaces (M1). The `Gallery` type is already defined here.
- `/supabase/schema.sql` — Database schema (M1). The `gallery` table structure is defined here.
- `/supabase/seed.sql` — Seed data (M1). Initial gallery entries are here; may need to be expanded with more items for M2 testing.
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
