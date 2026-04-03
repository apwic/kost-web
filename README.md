# KostKu — Kost Modern Website Template

A template for building a marketing website for Kost (Indonesian boarding house) businesses. Built with Next.js, Tailwind CSS, and Supabase.

**Features:**
- Responsive landing page with Hero, Facilities, Room Types, Gallery Preview, Testimonials, and Contact CTA
- Gallery page with category filtering, photo lightbox, and video player
- Admin panel with authentication, CRUD management for rooms/gallery/testimonials/facilities/settings
- SEO optimized with JSON-LD structured data, sitemap, and Open Graph tags
- Works without Supabase using fallback data for quick previewing

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with "Heritage Warmth" design tokens
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Icons**: Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server (no Supabase needed)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public pages (`/` and `/gallery`) work with fallback data out of the box.

### 3. Set up Supabase (required for admin panel)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard and run:
   - `supabase/schema.sql` — creates tables and RLS policies
   - `supabase/migrations/002_admin_rls_policies.sql` — admin write policies
   - `supabase/seed.sql` — (optional) sample data
3. Create **3 storage buckets** (set all to **public**):
   - `rooms` — room images
   - `gallery` — gallery photos/videos/thumbnails
   - `avatars` — testimonial avatars

### 4. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Create an admin user

In your Supabase dashboard:
1. Go to **Authentication** → **Users** → **Add User**
2. Enter an email and password
3. Check **"Auto Confirm User"**
4. Click **Create User**

### 6. Access the admin panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin). You'll be redirected to the login page. Sign in with the credentials you created.

## Admin Panel

| Route | Page |
|-------|------|
| `/admin` | Dashboard with stats overview |
| `/admin/rooms` | Room management (create, edit, toggle availability, delete) |
| `/admin/gallery` | Gallery management (photos & videos with categories) |
| `/admin/testimonials` | Testimonial management with avatar upload |
| `/admin/facilities` | Facility management with Lucide icon picker |
| `/admin/settings` | Site settings (name, phone, address, WhatsApp, etc.) |

## Project Structure

```
app/
  layout.tsx              # Root layout with fonts, metadata, lang="id"
  page.tsx                # Landing page with JSON-LD structured data
  globals.css             # Tailwind v4 config with design tokens
  gallery/page.tsx        # Gallery with filtering and lightbox
  admin/
    layout.tsx            # Admin layout with sidebar
    page.tsx              # Dashboard with stat cards
    login/page.tsx        # Login page
    rooms/                # Room CRUD (list, new, [id])
    gallery/              # Gallery CRUD
    testimonials/         # Testimonial CRUD
    facilities/           # Facility CRUD
    settings/             # Site settings form
  sitemap.ts              # Auto-generated sitemap.xml
  robots.ts               # robots.txt (allows /, disallows /admin)
  not-found.tsx           # Custom 404 page
  error.tsx               # Error boundary
components/
  landing/                # Landing page sections
    Navbar.tsx            # Responsive nav with mobile hamburger
    Hero.tsx              # Hero with background image and CTA
    Facilities.tsx        # Facility cards grid
    RoomTypes.tsx         # Room cards with WhatsApp buttons
    GalleryPreview.tsx    # Bento grid gallery preview
    Testimonials.tsx      # Testimonial cards
    ContactCTA.tsx        # Contact info + map link
    Footer.tsx            # Site footer
  gallery/                # Gallery page components
    GalleryHeader.tsx     # Page header
    FilterTabs.tsx        # Category filter tabs
    GalleryGrid.tsx       # Responsive grid layout
    GalleryItem.tsx       # Individual media item
    PhotoLightbox.tsx     # Full-screen photo viewer
    VideoPlayer.tsx       # Video player modal
    LoadMoreButton.tsx    # Infinite scroll trigger
  admin/                  # Admin panel components
    AdminShell.tsx        # Sidebar navigation shell
    LoginForm.tsx         # Email/password login form
    StatCard.tsx          # Dashboard stat card
    RoomList.tsx          # Room table with actions
    RoomForm.tsx          # Room create/edit form
    GalleryList.tsx       # Gallery grid with actions
    GalleryForm.tsx       # Gallery create/edit form
    TestimonialList.tsx   # Testimonial list with actions
    TestimonialForm.tsx   # Testimonial create/edit form
    FacilityList.tsx      # Facility list with actions
    FacilityForm.tsx      # Facility create/edit form
    SettingsForm.tsx      # Site settings form
  ui/                     # Shared UI components
    SectionHeader.tsx     # Reusable section header
    WhatsAppButton.tsx    # WhatsApp deep link button
lib/
  types.ts                # TypeScript interfaces
  whatsapp.ts             # WhatsApp URL utility
  gallery.ts              # Gallery data fetching with pagination
  jsonld.ts               # JSON-LD structured data builders
  analytics.ts            # Analytics event tracking (placeholder)
  supabase/
    server.ts             # Server-side Supabase client
    client.ts             # Browser-side Supabase client
    middleware.ts         # Auth session middleware helper
  storage/
    index.ts              # StorageProvider interface
    supabase.ts           # Supabase Storage implementation
supabase/
  schema.sql              # Database DDL with RLS policies
  migrations/             # Incremental migration files
  seed.sql                # Sample data (33 gallery items, rooms, etc.)
```

## Customization

### Design Tokens

Edit `app/globals.css` to change the color palette. The "Heritage Warmth" theme uses:

```css
--color-surface-primary: #F5F2E9;
--color-accent-primary: #7D6B3D;
/* ... see globals.css for full token list */
```

### Site Content

All site content (name, phone number, address, WhatsApp) is managed through the admin settings page at `/admin/settings`, or via the `site_settings` table in Supabase.

### Storage Provider

The storage layer is abstracted via `lib/storage/index.ts`. To swap from Supabase Storage to S3, Cloudinary, etc., implement the `StorageProvider` interface in a new file and update the export.

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production domain, for SEO)
4. Deploy

## Design

UI mockups are in `kost.pen` (Pencil design file) with desktop (1440px) and mobile (390px) breakpoints for both landing and gallery pages.
