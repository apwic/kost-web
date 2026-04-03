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
