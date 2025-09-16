## Quick orientation

This is a small Next.js app (app directory) with a single primary page implemented at `src/app/page.js`. The project is heavily client-driven: many UI pieces (animated header, cards, FAQ, modal) live in that file and use inline CSS + Framer Motion for animation.

Key commands
- Start development (Turbopack): `npm run dev` — development server with Turbopack enabled.
- Build for production: `npm run build` (uses `next build --turbopack`).

Architecture & why
- Next.js app router: main UI is `src/app/page.js` and marked with `"use client"` to allow hooks and client-only behavior.
- Single-file UI: most components (Hero, KeyFeatures, FAQ, Stat) are declared in `page.js` as local functions. Small, focused edits are typical.
- Inline CSS pattern: styling is applied inline (JS objects). Prefer editing the existing objects rather than introducing global CSS unless adding many new elements.

Important patterns and examples
- Client-only guards: code reads `if (typeof window === 'undefined') return;` before using `window` — keep this when adding window/DOM logic.
- Responsive check: `const isMobile = width < 768;` with `useEffect` that sets `width` on resize. Prefer reusing `isMobile` instead of adding new ad-hoc breakpoints.
- Framer Motion usage:
  - Shared layout morph: `layoutId={`card-${card.id}`}` is used to morph a small card into an expanded modal.
  - Presence & reveal: `AnimatePresence` and `whileInView` / `initial` are used for reveal animations.
  - Example: cards are rendered with `initial={{opacity:0,y:18}}` and `whileInView={{opacity:1,y:0}}` and per-card stagger via `transition.delay`.
- Scroll lock for modal: the modal sets `document.body.style.overflow = 'hidden'` when open and clears it on close — reuse this pattern when creating global overlays.
- Animated counters: `Stat` uses requestAnimationFrame with easing to animate numbers to a final value.
- FAQ behavior: accordion uses `AnimatePresence`; long answers are capped on desktop using `maxHeight` + `overflow:auto` to avoid layout breaks.

Project-specific gotchas
- Dependency check: code imports `framer-motion` (`import { motion, AnimatePresence } from "framer-motion"`) but `package.json` contains a dependency named `motion`. Verify the runtime dependency (install `framer-motion` if missing) before running or editing motion code.
- File is client-only: `"use client"` at top of `page.js` — don't move hooks below that line or into server components.
- Inline CSS overrides: watch for shorthand properties (e.g., `padding`) that can override `paddingTop` used to offset a fixed header. Prefer explicit `paddingTop/Left/Right/Bottom` if a header offset exists.

Editing tips for common tasks
- Make header fixed: update header style to `position: 'fixed'` and add `paddingTop: headerHeight` to the main content wrapper (headerHeight computed from `isMobile`). See existing implementation in `page.js`.
- Add glassmorphism to cards: update the card `style` objects with `background: 'linear-gradient(...)'`, `backdropFilter: 'blur(6px)'`, and `border: '1px solid rgba(...)'` — examples already applied to KeyFeatures and Use-cases.
- Smooth accordion expansion: animate `maxHeight` or wrap answer in a scrollable container (`maxHeight` + `overflow:auto`) to prevent layout jumps.

Testing & linting
- Lint: `npm run lint` (ESLint). The project uses `eslint` + `eslint-config-next`.
- If dev server fails on animation imports, run `npm install framer-motion` (or confirm the correct package in `package.json`).

Where to look first
- `src/app/page.js` — primary file to read and edit.
- `package.json` — scripts and dependencies (notably `next`, `react`, and `motion`/`framer-motion` mismatch to verify).
- `public/` — static assets referenced in the page.

If unclear or missing
- If imports refer to `framer-motion` but the dependency is missing, prefer adding `framer-motion` to `package.json` and running `npm install`.
- If you need to split components, follow the file's existing naming (Hero, KeyFeatures, FAQSection, FAQItem, Stat) and export defaults when moving to separate files.

Questions for the repo owner
- Should we standardize on `framer-motion` in `package.json` (currently `motion` is present)?
- Any preference for extracting components into `src/components/` vs keeping single-file for rapid iterations?

If you want, I can open a PR that:
- adds `.github/copilot-instructions.md` (this file),
- verifies/installs `framer-motion` if missing,
- or extracts `FAQ` and `KeyFeatures` into separate components for clarity.
