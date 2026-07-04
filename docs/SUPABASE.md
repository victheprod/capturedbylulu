# Supabase Setup — CapturedByLulu Admin

This guide connects the Next.js admin dashboard to Supabase (Auth, Database, Storage).

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. Note your **Project URL** and **anon public key** from **Settings → API**.
3. Copy the **service_role** key for server-side booking inserts (keep secret).

## 2. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Restart the dev server after adding env vars.

## 3. Run database migrations

In the Supabase SQL Editor, run these files in order:

1. `supabase/migrations/001_initial_schema.sql` — tables, RLS, storage buckets
2. `supabase/seed.sql` — initial packages, testimonials, content, settings

Or with the Supabase CLI:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

## 4. Create an admin user

1. In Supabase Dashboard → **Authentication → Users**, click **Add user**.
2. Choose **Email / Password** and create your admin account.
3. Run in SQL Editor:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'your-admin@email.com';
```

## 5. Storage buckets

The migration creates three public buckets:

| Bucket     | Purpose                          |
|-----------|-----------------------------------|
| portfolio | Portfolio gallery images          |
| media     | General media library             |
| branding  | Logo and favicon uploads          |

Verify buckets exist under **Storage** in the dashboard.

## 6. Access the admin dashboard

- **Login:** `/admin/login`
- **Dashboard:** `/admin`

Middleware protects all `/admin/*` routes except login. Only users with `profiles.is_admin = true` can access admin pages.

## 7. Public site behavior

When Supabase is configured and seeded:

- **Portfolio** loads from `portfolio_images` (falls back to static local gallery in `data/portfolio-items.json` if empty)
- **Packages / pricing** loads from `packages` + `package_categories`
- **Testimonials** loads featured reviews from `testimonials`
- **Site content** (hero, about, CTA, SEO) loads from `site_content`
- **Contact info** loads from `site_settings`
- **Booking form** saves inquiries to `bookings` and respects `availability_blocks`

Without env vars, the public site continues using static `data/` files.

## 8. Row Level Security

All tables use RLS:

- **Public (anon):** read active packages, portfolio, testimonials, content, settings, availability
- **Authenticated admin:** full CRUD on all admin tables and storage
- **Bookings insert:** handled via API route using service role key

## 9. Deployment (Vercel / Render)

Add the same environment variables in your hosting dashboard. Ensure `SUPABASE_SERVICE_ROLE_KEY` is **not** exposed to the browser (no `NEXT_PUBLIC_` prefix).

## 10. Troubleshooting

| Issue | Fix |
|-------|-----|
| Redirect loop on `/admin` | Confirm `is_admin = true` on your profile |
| Upload fails | Check storage policies and bucket names |
| Public site shows static data | Run seed SQL; verify env vars |
| Booking not saved | Add `SUPABASE_SERVICE_ROLE_KEY` |
| Date still selectable when blocked | Confirm `availability_blocks` has the date |

## File reference

```
lib/supabase/     — Supabase clients (browser, server, middleware)
lib/db/           — Database query layer
lib/cms/          — Public site data fetchers with static fallbacks
lib/admin/        — Server actions for admin CRUD
middleware.ts     — Auth + admin route protection
app/admin/        — Admin dashboard pages
supabase/         — SQL migrations and seed data
```
