# AGENTS.md — AI Agent Guidelines for KostKu

Guidelines for AI agents (Claude Code, Cursor, Copilot, etc.) working on this codebase.

## Project Overview

KostKu is a Next.js 16 template for Indonesian Kost (boarding house) websites. It has a public marketing site and a protected admin panel, both backed by Supabase.

## Tech Stack & Versions

- **Next.js 16** — App Router, Server Components, Server Actions
- **React 19** — no legacy patterns (no `getServerSideProps`, no `pages/` directory)
- **TypeScript 6** — strict mode
- **Tailwind CSS v4** — uses CSS-based `@theme` block in `app/globals.css`, NOT `tailwind.config.ts`
- **Supabase** — PostgreSQL + Storage + Auth via `@supabase/ssr`
- **Lucide React** — icon library (check exports exist before using — some common names like `Instagram`, `Facebook` don't exist)

## Architecture Patterns

### Server vs Client Components

- **Default to Server Components.** Only add `"use client"` when the component needs browser APIs, event handlers, or React hooks.
- **Data fetching** happens in Server Components or Server Actions — never in client components directly.
- **Server Actions** (`"use server"`) are used for all mutations (create, update, delete). They live in `actions.ts` files next to their route pages.

### Supabase Client Usage

| Context | Import | File |
|---------|--------|------|
| Server Components / Server Actions | `createClient()` | `lib/supabase/server.ts` |
| Client Components | `createClient()` | `lib/supabase/client.ts` |
| Middleware | `updateSession()` | `lib/supabase/middleware.ts` |

### Fallback Data Pattern

**Critical:** Public pages must work without Supabase configured. Every server-side data fetch should use try/catch with fallback data:

```typescript
let rooms: Room[] = [];
try {
  const supabase = await createClient();
  const { data } = await supabase.from("rooms").select("*").eq("is_available", true);
  rooms = data ?? [];
} catch {
  rooms = fallbackRooms; // Hardcoded sample data
}
```

The admin panel does NOT need fallback data — it requires a real Supabase connection.

### Middleware Auth Guard

- All `/admin` routes (except `/admin/login`) are protected by `middleware.ts`
- The middleware gracefully handles missing Supabase env vars (returns `user: null`, doesn't crash)
- Unauthenticated users → redirected to `/admin/login`
- Authenticated users on `/admin/login` → redirected to `/admin`

## Design Tokens

Colors are defined as Tailwind v4 CSS theme variables in `app/globals.css`:

```
surface-primary: #F5F2E9   (warm cream background)
surface-secondary: #E8E4D8  (slightly darker cream)
surface-inverse: #2D2926    (dark brown, used for admin sidebar)
fg-primary: #2D2926         (main text)
fg-secondary: #5E5954       (secondary text)
fg-muted: #8C8782           (placeholder/muted text)
fg-inverse: #F5F2E9         (text on dark backgrounds)
accent-primary: #7D6B3D     (gold/bronze accent)
```

Use these token names in Tailwind classes: `bg-surface-primary`, `text-fg-primary`, `bg-accent-primary`, etc.

### Fonts

- **Headings**: `font-[family-name:var(--font-heading)]` → Playfair Display
- **Body**: `font-[family-name:var(--font-body)]` → Inter (default via `className` on `<body>`)

## File Organization

```
app/                    # Next.js App Router pages
  admin/                # Protected admin panel
    [resource]/         # Each resource: page.tsx (list), actions.ts, new/page.tsx, [id]/page.tsx
components/
  landing/              # Public landing page sections
  gallery/              # Gallery page components
  admin/                # Admin panel components (List + Form per resource)
  ui/                   # Shared components
lib/
  types.ts              # All TypeScript interfaces
  supabase/             # Supabase client factories
  storage/              # Storage abstraction (swappable provider)
supabase/
  schema.sql            # Database DDL + RLS read policies
  migrations/           # Incremental migrations
  seed.sql              # Sample data
```

## Database Tables

| Table | Public SELECT | Auth CRUD | Notes |
|-------|:---:|:---:|-------|
| `rooms` | Yes | Yes | Room listings |
| `gallery` | Yes | Yes | Photos & videos |
| `testimonials` | Yes | Yes | Reviews (has `is_visible` filter) |
| `facilities` | Yes | Yes | Amenities list |
| `site_settings` | Yes | Yes | Key-value settings |

## Key Conventions

1. **Indonesian UI text** — All user-facing labels in the admin panel are in Indonesian (e.g., "Kamar" not "Rooms", "Simpan" not "Save", "Masuk" not "Login").
2. **`revalidatePath()`** — Always call after mutations to ensure the public site reflects changes immediately.
3. **Storage abstraction** — File uploads go through `lib/storage/index.ts`, not directly to Supabase Storage. This allows swapping providers.
4. **No API routes** — All data mutations use Server Actions, not `/api/` routes.
5. **`sort_order`** — All content tables have a `sort_order` column for manual ordering (simple number input, no drag-and-drop).
6. **Dynamic route params in Next.js 16** — `params` is a `Promise`, must be awaited: `const { id } = await params;`
7. **Turbopack** — Dev server uses `--turbopack`. If you hit font resolution errors, delete `.next` and restart.

## Common Pitfalls

- **Lucide icons**: Always verify the icon name exists in `lucide-react` before using it. Use the dynamic import pattern in `FacilityList.tsx` as reference.
- **Tailwind v4**: There is no `tailwind.config.ts`. All theme customization is in `app/globals.css` under `@theme {}`.
- **Next.js 16 middleware**: The `middleware` file convention shows a deprecation warning ("use proxy instead") but still works. Don't change it unless Next.js fully removes support.
- **Supabase env vars**: Never use `!` non-null assertion on env vars in middleware — always guard with an `if` check first.

## Testing Checklist

When making changes, verify:

- [ ] `npm run build` passes with no TypeScript errors
- [ ] Public pages (`/`, `/gallery`) work without `.env.local`
- [ ] Admin pages work with Supabase configured
- [ ] Mobile responsiveness (landing uses responsive Tailwind classes)
- [ ] All routes return correct status codes (200, 404 for unknown)
