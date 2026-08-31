# Implement Attached Home Page

## Goal

Replace the placeholder `app/page.tsx` home route with a production-style static home page that closely matches the attached desktop UI for joojo.

The page should include:
- A top navigation bar with the joojo logo, primary links, search icon, notifications icon, and avatar.
- A centered hero with the `LEARN YOUR WAY` pill, headline, supporting copy, primary CTA, decorative pale blue book/page background, and search input.
- A `Recommended for you` section with three course cards matching the reference content and progress/meta details.
- A bottom note row: `New courses and lessons added every week.`

## Skills / Instructions Read

- Project instructions from `AGENTS.md`.
- Local Next.js 16 docs:
  - `node_modules/next/dist/docs/01-app/index.md`
  - `node_modules/next/dist/docs/03-architecture/accessibility.md`

## Code Inspected

- `package.json`
  - Next `16.3.3`, React `19.2.8`, Tailwind `4`.
  - Scripts: `dev`, `build`, `lint`.
- `app/layout.tsx`
  - Uses `Inter` and `Plus_Jakarta_Sans` via `next/font/google`.
  - Current metadata still references the design system.
- `app/globals.css`
  - Existing CSS tokens for background, navy, primary blue, muted text, borders, surfaces, and shadows.
  - Existing utility classes for panels, buttons, nav sample, cards, badges, and icons.
- `app/page.tsx`
  - Currently a minimal placeholder linking to `/design-system`.
- `app/design-system/page.tsx`
  - Existing local `JoojoMark` and `Icon` patterns can be copied into the home route for this static page.

## Decisions And Assumptions

- Implement the attached UI as the actual first screen, not a marketing placeholder.
- Keep the route static and server-rendered; no client component is needed for this visual implementation.
- Use inline SVG icons and CSS/Tailwind rather than adding an icon dependency, because the project currently has no icon package.
- Use CSS-drawn course thumbnails and avatar treatment rather than new image assets, since no source image files were provided beyond the UI screenshot.
- The primary CTA will link to `/design-system` only as a temporary internal route because no catalog route exists yet.
- The search field is presentational for this task because no search route/API exists yet.
- Update page metadata to describe the learner home page instead of the design system.
- Keep browser-exposed data static only; no tokens, service calls, or user writes.

## Files Expected To Change

- `app/page.tsx`
- `app/layout.tsx`

No dependency changes are expected.

## Requirements

- Match the provided desktop UI as closely as practical:
  - White/light-blue page background.
  - 1024px-style centered layout.
  - Similar typography, spacing, card sizing, borders, shadows, and colors.
  - Same visible copy from the screenshot.
  - Responsive adaptation for tablet/mobile: nav wraps or compresses cleanly, hero remains readable, course cards stack.
- Use semantic landmarks and accessible labels for icon-only controls.
- Keep text from overflowing buttons, cards, and search input on small screens.
- Do not add backend services, auth, Sanity, PostHog, or search logic in this change.

## Security Considerations

- No secrets or environment variables are added.
- No client-side service calls are introduced.
- No learner data or progress writes are implemented.

## Acceptance Criteria

- `/` visually presents the attached home page rather than the placeholder.
- Navigation, hero, search box, course cards, and bottom note are all present.
- Course cards show:
  - Web Development Fundamentals, 65%, Beginner, 12h 24m, 12 lessons.
  - Docker Essentials, 40%, Intermediate, 10h 12m, 8 lessons.
  - TypeScript Deep Dive, 30%, Intermediate, 14h 36m, 10 lessons.
- The page remains usable and non-overlapping at mobile widths.
- `npm run lint` passes.
- `npm run build` passes because route and metadata code are changing.
- Start the dev server and provide the local URL.

## Checks To Run

1. `npm run lint`
2. `npm run build`
3. `npm run dev`

## Manual Test Steps

1. Open the local dev URL.
2. Verify the home page matches the attached design at desktop width.
3. Resize to tablet and mobile widths.
4. Confirm the navigation, hero text, search field, and cards do not overlap.
5. Confirm the CTA and top nav links have sensible hover/focus behavior.
