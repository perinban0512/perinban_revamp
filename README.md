# Perinban.com revamp

A fun, Pondicherry-themed blog for M. Perinban: illustrated 2D scenes, scroll animations, page transitions,
category chips with their own animations, and characters (a robot, Bheem, a bunny and Thatha) who climb out
of the chips, follow your cursor and react to words while you read.

## Pages
- **Home** – animated Pondicherry hero, “What I do here”, newsletter signup, My Diary, Get in Touch.
- **Blogs** – animated category chips (Outside Fun, 3D, Video Editing, Coding, Graphics, Experience, Robotics, Sysadmin) and all posts.
- **Blog post** – reading progress, characters in left/right rails by category, word-triggered reactions.
- **Newsletter**, **About Me**, **Contact Me**.

## Tech
- Next.js 15 (App Router) + React 19 + TypeScript — the framework Payload CMS 3 runs inside.
- Framer Motion for animation, Three.js for the 3D donut, hand-drawn SVG characters.
- Illustrations generated as flat 2D art, served through the Netlify Image CDN.

## Run locally
```bash
npm install
cp .env.example .env.local   # serves images directly when not on Netlify
npm run dev                  # http://localhost:3000
```
Or use `netlify dev` to get the Netlify Image CDN locally (then leave `NEXT_PUBLIC_IMAGE_CDN` unset).

## Content
All posts currently live in `lib/fixtures.ts` (the four diary posts from perinban.com plus sample posts for the
other categories). Payload CMS, the Supabase database, Webstudio, and the Brevo newsletter come next — see
[PLAN.md](./PLAN.md) for the roadmap.
