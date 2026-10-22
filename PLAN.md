# Perinban.com revamp — roadmap

Perinban.com is being rebuilt as a playful, Pondicherry-themed blog with animated characters,
edited in Payload CMS and designed in Webstudio. Work is split into small milestones; each one
leaves the site working.

## 1. Product surface ✅ (done)
- Next.js app (the same framework Payload CMS runs inside), Pondicherry illustrations, logo and favicon from perinban.com.
- Home, Blogs, blog reader, Newsletter, About Me and Contact Me pages with scroll animations and page transitions.
- Category chips with their own hover animations: farm animals, a spinning WebGL donut, a Premiere-style timeline,
  typed code, shapes + Bheem, Thatha (old man) with a stick, the robot, and a sysadmin terminal.
- Characters that stay after leaving their chip, follow the cursor, and sit in the left/right rails of a post
  according to its category. Word-triggered reactions while reading.
- All content comes from `lib/fixtures.ts`; forms use stub handlers in `lib/forms.ts`.

## 2. Payload CMS + database
- Add Payload 3 into this Next.js app (`/admin`), with `@payloadcms/db-postgres` pointed at the self-hosted Supabase Postgres.
- Collections: `posts`, `categories`, `pages`, `media`, `users` (admin login).
- Seed with the posts in `lib/fixtures.ts`, then replace fixture reads with Payload's Local API (same shapes).
- Supabase Storage (S3-compatible) adapter for media uploads.

## 3. Character reactions in the editor
- `reactions` array field on posts: word/phrase, side (left/right), optional character, reaction type, speech text.
- Character choices are filtered by side using `characterSides()` from `lib/categories.ts`, so editors only see the
  characters actually standing on that side for the post's category.
- Optional: a Lexical inline “reaction mark” so a reaction can be attached by selecting a word in the editor.
- Live preview in Payload that shows the rails reacting.

## 4. Forms and newsletter
- Contact form → `messages` collection + email notification to perinbanm@gmail.com.
- Newsletter → Brevo (Sendinblue) Contacts API with double opt-in, list ID from env; keep a local copy in Payload.
- Spam protection (honeypot + rate limit).

## 5. Webstudio integration
- Self-host Webstudio Builder alongside the app.
- Payload as a Webstudio data source (REST/GraphQL resource), so “write in Payload, designify in Webstudio” works:
  text lives in Payload, layout and styling live in Webstudio.
- Per-post / per-page `editor` switch (`payload` | `webstudio`, already in the fixture model) deciding which renderer
  serves the page; Webstudio pages still get the character rails and reactions.
- “Open in Webstudio” / “Open in Payload” buttons in both editors.

## 6. Content and polish
- Import the remaining posts from the old WordPress site (with redirects from old URLs).
- Real photo on About Me, more Pondicherry illustrations per page, sound toggle for characters.
- SEO (sitemap, Open Graph images), RSS feed, accessibility pass, performance budget for animations.

## 7. Self-hosting and repository
- `docker-compose` with self-hosted Supabase (Postgres + Storage) and the app.
- Push to a GitHub repository named `perinban-com-revamp` (GitHub names can’t contain spaces).
