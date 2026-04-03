## Product Requirements Document (PRD)

# Milestone 3: Admin Panel (Family Dashboard)

### 1. Product Overview

Build a password-protected admin panel at `/admin` that allows the Kost owner's family to manage all dynamic content on the KostKu website — rooms, gallery media, testimonials, facilities, and site settings — without touching code or requiring technical knowledge.

This milestone depends on the foundation established in M1 (Next.js + Supabase setup, database schema) and extends it with authentication, CRUD interfaces, and file upload capabilities.

### 2. Current State

After completing Milestones 1 and 2:
- The Next.js application is live on Vercel with a public landing page and gallery page.
- Supabase is configured with 5 tables (`rooms`, `gallery`, `testimonials`, `facilities`, `site_settings`) and 3 storage buckets (`rooms`, `gallery`, `avatars`).
- All content is seeded with initial data but can only be changed by a developer modifying the database directly through the Supabase dashboard.
- There is no authentication system — all pages are public.
- The family has no way to update room availability, pricing, photos, or any other content on their own.

### 3. Target State

After this milestone:
- The family can log in to `/admin` with email and password.
- A dashboard shows a quick overview: total rooms, available rooms, total gallery items, total testimonials.
- Dedicated management pages allow full CRUD (Create, Read, Update, Delete) for each content type.
- The family can upload photos and videos directly from their browser or phone.
- Room availability can be toggled with a single click.
- All changes reflect on the public website immediately (or within the ISR revalidation window of ~60 seconds).
- The admin panel is mobile-friendly so the family can manage content from their phones.

### 4. User Stories

- As a **Kost owner**, I want to log in to an admin panel so that only authorized family members can manage the website content.
- As a **Kost owner**, I want to see a dashboard overview so that I can quickly check how many rooms are available.
- As a **Kost owner**, I want to toggle room availability so that potential tenants see accurate information.
- As a **Kost owner**, I want to update room prices so that the website always shows current pricing.
- As a **Kost owner**, I want to upload new photos and videos so that the gallery stays fresh and attractive.
- As a **Kost owner**, I want to categorize gallery items (Kamar, Fasilitas, Lingkungan, Video) so that tenants can filter them on the gallery page.
- As a **Kost owner**, I want to add and edit testimonials so that I can showcase positive reviews from tenants.
- As a **Kost owner**, I want to update the phone number, WhatsApp number, and address so that contact information is always current.
- As a **Kost owner**, I want to reorder gallery items so that the best photos appear first.
- As a **Kost owner**, I want to manage the facility list so that I can add new amenities or remove old ones.
- As a **Kost owner**, I want to do all of this from my phone so that I can manage the website on the go.

### 5. Functional Requirements

**Authentication:**
- The admin panel must be protected by Supabase Auth using email/password login.
- Only pre-registered admin accounts can access `/admin` routes — there is NO public registration.
- Admin accounts are created manually via Supabase dashboard or a seed script.
- Unauthenticated users visiting `/admin` must be redirected to a login page.
- A "Keluar" (Logout) button must be accessible from every admin page.
- Session persistence: the user should remain logged in across browser refreshes until they explicitly log out or the session expires.

**Dashboard (`/admin`):**
- Display summary cards showing:
  - Total rooms / Available rooms
  - Total gallery items (photos + videos)
  - Total published testimonials
- Each card links to its respective management page.

**Room Management (`/admin/rooms`):**
- Display a list/table of all rooms with columns: Name, Type, Price, Availability Status.
- Each row has an "Edit" action and a quick-toggle for availability (switch/checkbox).
- "Tambah Kamar" (Add Room) button opens a form with fields:
  - Name (text)
  - Type (dropdown: Standard, Deluxe, Premium)
  - Monthly price in Rupiah (number input)
  - Description (textarea)
  - Amenities (multi-line text or tag input)
  - Room image (file upload — stored in Supabase Storage `rooms` bucket)
  - Available units count (number)
  - Total units count (number)
- Edit form pre-fills existing data and allows updating any field.
- Delete action requires confirmation dialog: "Apakah Anda yakin ingin menghapus kamar ini?"
- Deleting a room also removes its image from Supabase Storage.

**Gallery Management (`/admin/gallery`):**
- Display a grid of all gallery items showing thumbnail, title, category, and media type (photo/video).
- "Tambah Media" (Add Media) button opens a form with fields:
  - Title (text)
  - Category (dropdown: Kamar, Fasilitas, Lingkungan)
  - Media type (radio: Foto, Video)
  - File upload for photos (accepted formats: JPG, PNG, WebP; max 10MB)
  - File upload for videos (accepted formats: MP4, WebM; max 100MB)
  - Sort order (number — lower numbers appear first)
- Drag-and-drop reordering of gallery items (updates `sort_order` field).
- Bulk delete: select multiple items and delete them at once.
- Deleting items also removes files from Supabase Storage `gallery` bucket.

**Testimonial Management (`/admin/testimonials`):**
- Display a list of all testimonials with: Name, Quote preview, Rating, Visibility toggle.
- "Tambah Testimoni" (Add Testimonial) button opens a form with fields:
  - Name (text)
  - Role/description (text, e.g., "Mahasiswi, 1 tahun tinggal")
  - Rating (1-5 star selector)
  - Quote (textarea)
  - Avatar image (file upload — stored in `avatars` bucket)
  - Is visible (toggle — allows hiding without deleting)
- Edit and delete actions with confirmation.

**Facility Management (`/admin/facilities`):**
- Display a list of all facilities with: Icon, Name, Description, Sort order.
- "Tambah Fasilitas" (Add Facility) button opens a form with fields:
  - Name (text)
  - Icon name (text input or icon picker — references Lucide icon names)
  - Description (textarea)
  - Sort order (number)
- Edit, delete, and reorder capabilities.

**Site Settings (`/admin/settings`):**
- Key-value form for global site configuration:
  - Phone number
  - WhatsApp number
  - Email address
  - Street address
  - City
  - Google Maps embed URL or coordinates
  - Site title
  - Site description
- Save button updates all settings at once.
- Settings are stored in the `site_settings` table as key-value pairs.

**What this milestone does NOT include:**
- Multi-tenant support (this is for a single Kost only).
- Role-based access control (all admins have full access).
- Content versioning or undo functionality.
- Scheduled publishing or draft states.
- Analytics or reporting dashboards.
- Automated image resizing (rely on Next.js Image component on the frontend).

### 6. Technical Design (High-Level)

**Architecture:**
- The admin panel lives under the `/admin` route group in the Next.js App Router.
- All `/admin` routes are protected by a middleware or layout-level auth check.
- Supabase Auth handles authentication. The Supabase client is initialized with the user's session token.
- Row Level Security (RLS) policies on all Supabase tables ensure that only authenticated users with the admin role can perform write operations. Public (anonymous) users can only read.

**Route Structure:**
```
/admin/login          → Login page (public)
/admin                → Dashboard (protected)
/admin/rooms          → Room list + CRUD
/admin/rooms/new      → Add new room
/admin/rooms/[id]     → Edit room
/admin/gallery        → Gallery list + CRUD
/admin/gallery/new    → Add new media
/admin/gallery/[id]   → Edit media
/admin/testimonials   → Testimonial list + CRUD
/admin/facilities     → Facility list + CRUD
/admin/settings       → Site settings form
```

**Authentication Flow:**
1. User navigates to `/admin`.
2. Middleware checks for valid Supabase session.
3. If no session, redirect to `/admin/login`.
4. User enters email + password → Supabase Auth `signInWithPassword()`.
5. On success, redirect to `/admin` dashboard.
6. Session token stored in HTTP-only cookie for security.
7. Logout calls `signOut()` and redirects to `/admin/login`.

**Data Flow for CRUD Operations:**
1. Admin page loads → fetches data from Supabase using the authenticated client.
2. User fills form and submits.
3. If file upload is involved:
   - Upload file to Supabase Storage → receive public URL.
   - Include URL in the database insert/update payload.
4. Insert or update the row in the database.
5. On success, show a toast notification ("Berhasil disimpan!") and refresh the list.
6. On error, show error message and keep the form data intact.

**File Upload Flow:**
1. User selects a file from their device.
2. Client-side validation: check file type and size limits.
3. Show upload progress indicator.
4. Upload to Supabase Storage with a unique filename (e.g., `rooms/{uuid}.{ext}`).
5. Receive the public URL.
6. Store the URL in the relevant database record.
7. When deleting a record, also delete the associated file from Storage.

**Supabase Row Level Security (RLS) Policies:**
- `SELECT` — allowed for all users (public website reads).
- `INSERT`, `UPDATE`, `DELETE` — allowed only for authenticated users.
- Policies applied to all 5 tables.

**Revalidation:**
- After any write operation in the admin panel, trigger Next.js on-demand revalidation for the affected pages using `revalidatePath()` or `revalidateTag()`.
- This ensures the public website reflects changes within seconds rather than waiting for the ISR timer.

**UI Component Approach:**
- Use a simple admin UI layout with a sidebar navigation listing all sections.
- On mobile, the sidebar collapses into a hamburger menu.
- Use native HTML form elements styled with Tailwind for consistency.
- Toast notifications for success/error feedback.
- Confirmation dialogs for destructive actions (delete).

### 7. Relevant Files to Review

- `/kost.pen` — Design file containing all UI mockups (desktop + mobile) for reference on data structures
- `/tasks/2026-04-03-m1-foundation-landing-page.md` — M1 PRD with Supabase schema definitions
- `/tasks/2026-04-03-m2-gallery-page-media.md` — M2 PRD with gallery data structure and filtering logic
- `/src/lib/supabase.ts` — Supabase client initialization (created in M1)
- `/src/app/layout.tsx` — Root layout (created in M1)
- `/supabase/migrations/` — Database migration files (created in M1)

### 8. Open Questions / Concerns — RESOLVED

> Owner responses recorded on 2026-04-03.

1. **Admin accounts:** ✅ RESOLVED — One shared login account. The owner will manage it themselves for now. No multi-user support needed.

2. **Audit trail:** Not needed for initial version. Single admin user makes this unnecessary.

3. **File size limits:** ✅ RESOLVED — 50MB per file (Supabase free tier limit) is acceptable for now. The storage layer must be abstracted behind an interface so switching to another provider (Cloudinary, S3, etc.) is straightforward later.

4. **Admin panel language:** Bahasa Indonesia only — consistent with the rest of the website.

5. **Drag-and-drop reordering:** Use number input for sort order in v1. Drag-and-drop is a nice-to-have for later.

6. **Preview feature:** Not needed for v1. Changes go live immediately (within ISR revalidation window).

7. **Email notifications:** Not needed. WhatsApp is the primary channel.

8. **Analytics in admin:** Deferred to M4.

9. **Bulk import:** Nice-to-have but not required for v1. Single upload is sufficient.

**Architecture Decision — Storage Abstraction:** All file operations (upload, delete, get URL) must go through an abstract storage interface that can be swapped from Supabase Storage to another provider without changing application code.

### 9. Task Breakdown

Each task below is an independently implementable unit. Complete them in order — later tasks depend on earlier ones.

---

#### Task 1: Supabase Auth Setup & Middleware

**Goal:** Protect all `/admin` routes (except `/admin/login`) behind Supabase Auth. Unauthenticated visitors get redirected to the login page.

**Files to create:**
- `middleware.ts` — Root middleware. Uses `@supabase/ssr` `createServerClient` to read the session from cookies. If the path starts with `/admin` (but is NOT `/admin/login`), check for a valid session; redirect to `/admin/login` if missing. For `/admin/login`, redirect to `/admin` if the user is already authenticated. Matcher config: `/admin/:path*`.
- `lib/supabase/middleware.ts` — Helper that creates a Supabase server client within the middleware context (uses `NextRequest`/`NextResponse` cookie helpers instead of `next/headers`). The root `middleware.ts` delegates to this.

**Files to modify:**
- `supabase/schema.sql` — Add a comment noting that admin users are created manually via Supabase dashboard (Auth > Users). No `profiles` table needed for v1.

**Key decisions:**
- Use Supabase Auth email/password. No OAuth, no magic links.
- No `profiles` table — a valid Supabase Auth session is sufficient to grant admin access. Single-user system.
- Middleware refreshes the session on every request so the cookie stays alive.

**Acceptance criteria:**
- Visiting `/admin` without a session redirects to `/admin/login`.
- Visiting `/admin/login` with an active session redirects to `/admin`.
- Middleware properly refreshes session cookies.

---

#### Task 2: Login Page

**Goal:** Build the `/admin/login` page where the owner enters email + password to sign in.

**Files to create:**
- `app/admin/login/page.tsx` — Server component page wrapper. Minimal layout: centered card on a plain background.
- `components/admin/LoginForm.tsx` — Client component (`"use client"`). Contains an HTML `<form>` with email input, password input, and a "Masuk" submit button. Calls `supabase.auth.signInWithPassword()` using the browser client from `lib/supabase/client.ts`. On success, `router.push("/admin")`. On error, display the error message inline (e.g., "Email atau password salah"). No Server Action needed — client-side auth call is fine here.

**Styling:**
- Full-viewport centered card using flexbox.
- Use the existing theme colors (`surface-primary`, `surface-secondary`, `accent-primary`, `fg-primary`, etc.).
- Native `<input>` elements styled with Tailwind (border, rounded, padding, focus ring).
- Mobile-friendly — card is `max-w-md w-full` with `px-4` outer padding.

**Acceptance criteria:**
- Valid credentials log the user in and redirect to `/admin`.
- Invalid credentials show an inline error message without losing form state.
- Form has proper `type="email"` and `type="password"` attributes.
- Pressing Enter submits the form.

---

#### Task 3: Admin Layout with Sidebar Navigation

**Goal:** Create the shared admin layout with a sidebar, header, and mobile hamburger menu. All admin pages except login use this layout.

**Files to create:**
- `app/admin/layout.tsx` — Server component. Fetches the current user session from `lib/supabase/server.ts`. Renders the `AdminShell` component with the user's email. This layout wraps all `/admin` pages except `/admin/login` (login has its own layout via the route group).
- `app/admin/login/layout.tsx` — Minimal layout for the login page (no sidebar, just renders `{children}`).
- `components/admin/AdminShell.tsx` — Client component (`"use client"`). Contains the sidebar, top bar, and main content area. Sidebar nav items: Dashboard (`/admin`), Kamar (`/admin/rooms`), Galeri (`/admin/gallery`), Testimoni (`/admin/testimonials`), Fasilitas (`/admin/facilities`), Pengaturan (`/admin/settings`). Active link highlighted based on `usePathname()`. "Keluar" button calls `supabase.auth.signOut()` and redirects to `/admin/login`. On mobile (<768px): sidebar is hidden by default, toggled via a hamburger button in the top bar. Uses Lucide icons for nav items: `LayoutDashboard`, `BedDouble`, `Image`, `MessageSquareQuote`, `Building2`, `Settings`, `LogOut`.

**Styling:**
- Sidebar: fixed left, `w-64`, `bg-surface-inverse` (dark), `text-fg-inverse`.
- Main content area: `ml-64` on desktop, full width on mobile.
- Top bar: shows current page title and the hamburger button on mobile.
- Mobile overlay: semi-transparent backdrop when sidebar is open.

**Acceptance criteria:**
- Sidebar is visible on desktop, hidden behind hamburger on mobile.
- Active nav item is visually highlighted.
- Logout button signs out and redirects to `/admin/login`.
- Layout does not affect the login page.

---

#### Task 4: Dashboard Overview Page

**Goal:** Build the `/admin` dashboard showing summary cards with counts from each table.

**Files to create:**
- `app/admin/page.tsx` — Server component. Fetches counts from Supabase: total rooms, available rooms (where `is_available = true`), total gallery items, total testimonials (where `is_visible = true`). Renders summary cards in a responsive grid. Each card links to its management page.
- `components/admin/StatCard.tsx` — Small presentational component. Props: `title`, `value`, `href`, `icon`. Renders a card with the icon, numeric value, label, and wraps in a `<Link>`.

**Data fetching:**
- Use the server Supabase client (`lib/supabase/server.ts`).
- Run all count queries in parallel with `Promise.all`.
- Use `.select('*', { count: 'exact', head: true })` for efficient count-only queries.

**Acceptance criteria:**
- Dashboard shows 4 stat cards: Kamar (total/tersedia), Galeri, Testimoni.
- Each card links to the correct management page.
- Page works with zero data (shows 0).

---

#### Task 5: Room Management — List & Quick Toggle

**Goal:** Build the room list page with a table view and inline availability toggle.

**Files to create:**
- `app/admin/rooms/page.tsx` — Server component. Fetches all rooms ordered by `sort_order`. Renders a table/list with columns: Name, Type (from price tier), Price, Available units, Status toggle. "Tambah Kamar" button links to `/admin/rooms/new`.
- `app/admin/rooms/actions.ts` — `"use server"` file. Contains Server Actions:
  - `toggleRoomAvailability(id: string, isAvailable: boolean)` — Updates `is_available` on the room. Calls `revalidatePath("/admin/rooms")` and `revalidatePath("/")`.
  - `deleteRoom(id: string)` — Deletes the room row. If the room has an `image_url` pointing to Supabase Storage, deletes the file too (via the storage abstraction). Calls `revalidatePath`.
- `components/admin/RoomList.tsx` — Client component for the list table. Renders each room row. The availability toggle calls `toggleRoomAvailability` Server Action. Delete button triggers a `confirm()` dialog, then calls `deleteRoom`.

**Acceptance criteria:**
- All rooms display in a table sorted by `sort_order`.
- Toggling availability updates the database and refreshes the list.
- Delete requires browser `confirm()` dialog and removes the room + its storage file.
- "Tambah Kamar" button navigates to the create form.

---

#### Task 6: Room Management — Create & Edit Forms

**Goal:** Build the create and edit forms for rooms.

**Files to create:**
- `app/admin/rooms/new/page.tsx` — Server component. Renders the `RoomForm` in create mode.
- `app/admin/rooms/[id]/page.tsx` — Server component. Fetches the room by ID, renders `RoomForm` in edit mode with pre-filled data.
- `components/admin/RoomForm.tsx` — Client component (`"use client"`). HTML form with fields: name (text), slug (auto-generated from name, editable), price (number), price_label (text), description (textarea), amenities (textarea — one per line, stored as JSON array), image upload (file input), total_units (number), available_units (number), sort_order (number). On submit, calls the appropriate Server Action. Shows loading state on the submit button. Displays success/error messages.
- `app/admin/rooms/actions.ts` (extend) — Add Server Actions:
  - `createRoom(formData: FormData)` — Validates required fields, uploads image via storage interface if provided, inserts row, redirects to `/admin/rooms`.
  - `updateRoom(id: string, formData: FormData)` — Same as create but updates existing row. If a new image is uploaded, deletes the old one from storage first.

**Storage abstraction — Files to create:**
- `lib/storage/index.ts` — Exports the `StorageProvider` interface: `upload(bucket: string, path: string, file: File): Promise<string>` (returns public URL), `delete(bucket: string, path: string): Promise<void>`, `getPublicUrl(bucket: string, path: string): string`.
- `lib/storage/supabase.ts` — Implements `StorageProvider` using the Supabase Storage client. Generates unique filenames with `crypto.randomUUID()`.

**Acceptance criteria:**
- Creating a room with all fields saves to the database and redirects to the list.
- Editing a room pre-fills all fields including the current image preview.
- Image upload stores the file in the `rooms` bucket and saves the public URL.
- Replacing an image deletes the old file from storage.
- Amenities are entered one per line and stored as a JSON array.
- Slug is auto-generated from the name but can be manually overridden.

---

#### Task 7: Gallery Management — List, Create & Edit

**Goal:** Build the gallery management page with grid view, create form, and edit form.

**Files to create:**
- `app/admin/gallery/page.tsx` — Server component. Fetches all gallery items ordered by `sort_order`. Renders a grid of thumbnails with title, category badge, and media type indicator. "Tambah Media" button links to `/admin/gallery/new`. Each item has Edit and Delete actions.
- `app/admin/gallery/new/page.tsx` — Server component. Renders `GalleryForm` in create mode.
- `app/admin/gallery/[id]/page.tsx` — Server component. Fetches the item by ID, renders `GalleryForm` in edit mode.
- `components/admin/GalleryForm.tsx` — Client component. Fields: title (text), category (select: kamar, fasilitas, lingkungan), media_type (radio: photo, video), file upload (conditionally accepts image or video formats based on media_type), thumbnail upload (for videos), alt_text (text), sort_order (number), is_featured (checkbox). On submit, calls Server Action.
- `app/admin/gallery/actions.ts` — `"use server"` file. Server Actions:
  - `createGalleryItem(formData: FormData)` — Uploads media file to `gallery` bucket, inserts row.
  - `updateGalleryItem(id: string, formData: FormData)` — Updates row, replaces file if new one uploaded.
  - `deleteGalleryItem(id: string)` — Deletes row and associated file(s) from storage.

**Acceptance criteria:**
- Gallery items display as a thumbnail grid with category badges.
- Photo uploads accept JPG, PNG, WebP up to 50MB.
- Video uploads accept MP4, WebM up to 50MB.
- Sort order is a plain number input (no drag-and-drop).
- Delete removes both the database row and the storage file.
- `revalidatePath("/gallery")` is called after mutations.

---

#### Task 8: Testimonial Management — List, Create & Edit

**Goal:** Build the testimonial management page.

**Files to create:**
- `app/admin/testimonials/page.tsx` — Server component. Fetches all testimonials ordered by `sort_order`. Renders a list with name, quote preview (truncated), rating stars, and visibility toggle. "Tambah Testimoni" button links to a form.
- `app/admin/testimonials/new/page.tsx` — Renders `TestimonialForm` in create mode.
- `app/admin/testimonials/[id]/page.tsx` — Fetches testimonial by ID, renders `TestimonialForm` in edit mode.
- `components/admin/TestimonialForm.tsx` — Client component. Fields: name (text), role (text), quote (textarea), rating (number input 1-5), avatar upload (file input, stored in `avatars` bucket), is_visible (checkbox), sort_order (number).
- `app/admin/testimonials/actions.ts` — `"use server"` file. Server Actions for create, update, delete. Avatar upload goes to the `avatars` bucket. Calls `revalidatePath("/")` after mutations (testimonials show on the landing page).

**Acceptance criteria:**
- Testimonials display in a list with star ratings and visibility status.
- Toggling visibility updates `is_visible` without a full page reload.
- Avatar upload stores in the `avatars` bucket.
- Delete removes avatar from storage as well.
- Rating is clamped between 1 and 5.

---

#### Task 9: Facility Management — List, Create & Edit

**Goal:** Build the facility management page.

**Files to create:**
- `app/admin/facilities/page.tsx` — Server component. Fetches all facilities ordered by `sort_order`. Renders a list with icon preview (renders Lucide icon by name), name, description preview, and sort order.
- `app/admin/facilities/new/page.tsx` — Renders `FacilityForm` in create mode.
- `app/admin/facilities/[id]/page.tsx` — Fetches facility by ID, renders `FacilityForm` in edit mode.
- `components/admin/FacilityForm.tsx` — Client component. Fields: name (text), icon_name (text input — user types a Lucide icon name like "wifi", "car", "shield-check"), description (textarea), sort_order (number). Shows a live preview of the Lucide icon as the user types.
- `app/admin/facilities/actions.ts` — `"use server"` file. Server Actions for create, update, delete. Calls `revalidatePath("/")` after mutations.

**Note on icon picker:** For v1, use a plain text input where the user types the Lucide icon name. Display a helper text listing commonly used icon names (the ones already in the seed data). Show a live preview of the icon next to the input. No complex icon picker component.

**Acceptance criteria:**
- Facilities display in a sortable list with icon previews.
- Icon name input shows a live preview of the Lucide icon.
- Invalid icon names gracefully fall back (show a placeholder icon or nothing).
- CRUD operations work and revalidate the landing page.

---

#### Task 10: Site Settings Management

**Goal:** Build the site settings page as a single form with all key-value pairs.

**Files to create:**
- `app/admin/settings/page.tsx` — Server component. Fetches all rows from `site_settings` and renders the `SettingsForm` with current values.
- `components/admin/SettingsForm.tsx` — Client component. Renders a form with labeled inputs for each known setting key: `phone_number`, `whatsapp_number`, `email`, `address`, `site_name`, `hero_headline`, `hero_subtitle`, `hero_image_url`, `whatsapp_greeting`. Each input is pre-filled with the current value. Single "Simpan" (Save) button at the bottom.
- `app/admin/settings/actions.ts` — `"use server"` file. Single Server Action `updateSettings(formData: FormData)` — upserts all setting key-value pairs in a loop. Calls `revalidatePath("/")` since settings affect the landing page.

**Acceptance criteria:**
- All current site settings display in the form with their values.
- Saving updates all settings in one submission.
- Changes to `whatsapp_number` or `hero_headline` reflect on the public site after revalidation.
- Empty values are allowed (stored as empty string, not null).

---

#### Task 11: RLS Write Policies for Authenticated Users

**Goal:** Add Row Level Security policies that allow authenticated users to perform write operations on all tables.

**Files to modify:**
- `supabase/schema.sql` — Add `INSERT`, `UPDATE`, and `DELETE` policies for the `authenticated` role on all 5 tables (`rooms`, `gallery`, `testimonials`, `facilities`, `site_settings`). The existing `anon` SELECT policies remain unchanged.

**Policies to add (for each of the 5 tables):**
```sql
CREATE POLICY "Allow authenticated insert" ON <table>
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON <table>
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON <table>
  FOR DELETE TO authenticated USING (true);
```

Also add `SELECT` policies for the `authenticated` role (authenticated users need to read data too, and the `anon` policy does not cover them):
```sql
CREATE POLICY "Allow authenticated read" ON <table>
  FOR SELECT TO authenticated USING (true);
```

**Files to create:**
- `supabase/migrations/002_admin_rls_policies.sql` — Migration file containing all the new RLS policies above, so they can be applied to the live database.

**Acceptance criteria:**
- Authenticated users can INSERT, UPDATE, DELETE on all 5 tables.
- Anonymous users can still only SELECT (existing behavior preserved).
- Policies are idempotent — running the migration twice does not error.
- The Server Actions from Tasks 5-10 work without RLS errors when the user is logged in.

---

#### Task 12: End-to-End Testing & Polish

**Goal:** Manually test all flows and fix issues. Add finishing touches.

**Testing checklist:**
- [ ] Unauthenticated access to `/admin` redirects to `/admin/login`.
- [ ] Login with valid credentials works and redirects to dashboard.
- [ ] Login with invalid credentials shows error message.
- [ ] Dashboard shows correct counts from the database.
- [ ] Room CRUD: create, edit, toggle availability, delete (with image cleanup).
- [ ] Gallery CRUD: create photo, create video, edit, delete (with file cleanup).
- [ ] Testimonial CRUD: create, edit, toggle visibility, delete (with avatar cleanup).
- [ ] Facility CRUD: create, edit, delete. Icon preview works.
- [ ] Site settings: load current values, save changes, verify on public site.
- [ ] Logout works and clears the session.
- [ ] All pages are responsive on mobile (test at 375px width).
- [ ] `revalidatePath` is called after every mutation so the public site updates.
- [ ] File uploads work for images up to 50MB.
- [ ] Deleting records also removes files from Supabase Storage.
- [ ] RLS policies: verify anonymous users cannot write via the Supabase REST API.

**Polish items:**
- Add loading states to all forms (disable button + show spinner text like "Menyimpan...").
- Add `<title>` metadata to each admin page (e.g., "Kelola Kamar - Admin KostKu").
- Ensure all form inputs have proper `<label>` elements for accessibility.
- Add a "Kembali" (Back) link on create/edit pages to return to the list.
- Handle edge cases: empty states (no rooms yet), network errors, storage upload failures.

**Acceptance criteria:**
- All checklist items pass.
- No console errors in development.
- `next build` completes without errors.
