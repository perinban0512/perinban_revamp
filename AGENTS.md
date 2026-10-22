# AGENTS.md

Perinban.com revamp — a playful, animated, Pondicherry-themed blog. **Read PLAN.md first** and continue from the
next unfinished milestone.

## Architecture
- Next.js 15 App Router (chosen because Payload CMS 3 installs into a Next.js app). Deployed on Netlify; the owner
  also plans to self-host with Supabase.
- `app/` — routes: `/`, `/blogs`, `/blogs/[slug]`, `/newsletter`, `/about`, `/contact`. `app/template.tsx` gives
  every page an entrance transition. `globals.css` holds all styles (no Tailwind) and the Pondicherry palette vars.
- `lib/fixtures.ts` — **the only content source** (posts, reactions, site info). Replace with Payload queries in
  milestone 2; keep the `Post` / `ReactionCue` shapes.
- `lib/categories.ts` — categories, which character each chip unlocks, and `characterSides()` (left/right rail rules).
- `lib/reactions.ts` — reaction types (emoji, default speech).
- `lib/pointer.ts` — one shared pointer listener; `useLookAt()` writes `--lx/--ly/--tilt` CSS vars that move pupils
  and tilt heads in the SVGs.
- `lib/forms.ts` — stub submit handlers (Brevo + CMS later). `lib/image.ts` — Netlify Image CDN URL helper.
- `components/characters` — original SVG characters + `Companion` wrapper (eyes, reactions, speech bubble).
- `components/chips/CategoryChip.tsx` — per-category hover effects. `Donut3D.tsx` is lazy-loaded Three.js.
- `components/CompanionsProvider.tsx` + `CompanionLayer.tsx` — unlocked characters persist in localStorage and stay
  on screen on every page except blog posts, where `PostReader` places them in rails.

## Rail rules (from the owner)
- Coding / Video Editing / Robotics posts: robot left, others right.
- 3D / Graphics: Bheem left, others right. Outside Fun / Experience: bunny + Thatha left, others right.
- The post's **first** category decides the layout.

## Conventions
- Characters are original drawings; don't copy trademarked artwork (Chhota Bheem, ChessKid's Qwerty) without permission.
- Effects inside `.chip-fx` are clipped at the chip's centre line so they look like they climb out of the chip.
  Children are absolutely positioned and centred by the flex container — don't animate `left`/`transform: translateX(-50%)`.
- Respect `prefers-reduced-motion` (global rule in `globals.css`).
- Images: reference via `img()` from `lib/image.ts`, not raw `/img/*.png`.
