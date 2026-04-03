# KostKu — Kost Modern Website

Marketing website for a family-owned Kost (Indonesian boarding house) business. Built with Next.js, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with "Heritage Warmth" design tokens
- **Backend**: Supabase (PostgreSQL + Storage)
- **Icons**: Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase (optional)

The site works without Supabase using fallback data. To use real data:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the schema and seed SQL:
   - Go to **SQL Editor** in your Supabase dashboard
   - Execute `supabase/schema.sql` to create tables and RLS policies
   - Execute `supabase/seed.sql` to insert placeholder data
3. Create storage buckets: `rooms`, `gallery`, `avatars` (set to public)

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts and metadata
  page.tsx            # Landing page (all sections composed)
  globals.css         # Tailwind v4 config with design tokens
  gallery/page.tsx    # Gallery placeholder page
components/
  landing/            # Landing page sections
    Navbar.tsx        # Responsive nav with mobile hamburger
    Hero.tsx          # Hero with background image and CTA
    Facilities.tsx    # Facility cards grid
    RoomTypes.tsx     # Room cards with WhatsApp buttons
    GalleryPreview.tsx # Bento grid gallery preview
    Testimonials.tsx  # Testimonial cards
    ContactCTA.tsx    # Contact info + WhatsApp CTA
    Footer.tsx        # Site footer
  ui/                 # Shared UI components
    SectionHeader.tsx # Reusable section header
    WhatsAppButton.tsx # WhatsApp deep link button
lib/
  types.ts            # TypeScript interfaces
  whatsapp.ts         # WhatsApp URL utility
  supabase/
    server.ts         # Server-side Supabase client
    client.ts         # Browser-side Supabase client
supabase/
  schema.sql          # Database DDL with RLS
  seed.sql            # Placeholder data
```

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo in Vercel
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
4. Deploy

## Design

UI mockups are in `kost.pen` (Pencil design file) with desktop (1440px) and mobile (390px) breakpoints.
