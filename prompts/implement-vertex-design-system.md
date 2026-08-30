# Implement Vertex Design System

## Goal

Replace the default Next.js starter page with a production-style Vertex design system page that closely matches `design/vertex-designsystem.png` and the image supplied by the user. The page should present the core Vertex visual language: logo, colors, typography, type scale, spacing, radius, shadows, icons, buttons, inputs, tags, statuses, progress, cards, navigation, and principles.

## Skills and Docs Read

- `vercel-plugin:nextjs` skill, because this is a Next.js App Router project.
- Local Next.js 16.3.3 docs:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`

## Code Inspected

- `package.json`
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `next.config.ts`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `design/vertex-designsystem.png`

## Current Project Shape

- Root-level Next.js App Router app.
- Next.js `16.3.3`, React `19.2.8`, Tailwind CSS v4 via `@tailwindcss/postcss`.
- No component library or icon package is installed.
- The current page is the default create-next-app starter.
- Existing unrelated worktree changes are present and must not be reverted:
  - `.gitignore`
  - `AGENTS.md`
  - `.agents/`
  - `design/`
  - `skills-lock.json`

## Decisions and Assumptions

- Implement the design system as the home page at `/`.
- Keep it static and server-rendered. No client state is needed.
- Do not add external services or dependencies.
- Use inline SVG icons for this one-page artifact because no icon library is installed. Keep them simple and consistent with the reference.
- Use `next/font/google` for Inter and Playfair Display in `app/layout.tsx`, following the installed Next docs.
- Keep design tokens in `app/globals.css` as CSS custom properties and Tailwind v4 theme variables where useful.
- Use responsive CSS so the desktop layout matches the reference and the page stacks cleanly on tablet/mobile.
- Do not implement app features beyond the design-system specimen.

## Files Expected to Change

- `app/page.tsx`
  - Replace starter content with the full design-system specimen.
- `app/layout.tsx`
  - Swap starter metadata and font setup to Vertex-specific Inter and Playfair Display variables.
- `app/globals.css`
  - Add Vertex color, typography, spacing, radius, shadow, and base page styles.

## Requirements

- Reproduce the reference as a clean design-system board:
  - White/off-white background, thin neutral borders, 8px-ish panel radius, subtle shadows.
  - Orange Vertex identity and dark neutral text.
  - Large left intro panel with Vertex mark, title, description, and version/date.
  - Section numbers in orange and letter-spaced section labels.
  - Color swatches with labels and hex values:
    - Primary 500 `#F97316`
    - Primary 400 `#FB923C`
    - Primary 300 `#FDBA74`
    - Primary 200 `#FED7AA`
    - Primary 100 `#FFEFE5`
    - Neutral 900 `#0F172A`
    - Neutral 700 `#334155`
    - Neutral 500 `#64748B`
    - Neutral 300 `#CBD5E1`
    - Neutral 200 `#E2E8F0`
    - Neutral 100 `#F1F5F9`
    - Neutral 50 `#FAFAFC`
    - White `#FFFFFF`
  - Typography section showing Playfair Display and Inter.
  - Type scale table matching the reference values.
  - Spacing scale from 4px to 64px.
  - Radius and shadow examples.
  - Icon rows for outline and filled styles.
  - Button states and specs.
  - Search/text input and select examples.
  - Badges, status indicators, progress bar, cards, navigation, breadcrumbs, pagination, and design principles.
- Make the page responsive down to mobile:
  - Main board width constrained on large screens.
  - Panels stack gracefully.
  - Tables and dense rows should scroll or wrap without text overlap.
- Keep accessible markup:
  - Semantic headings.
  - Buttons and links with clear text or `aria-label`.
  - Decorative SVGs hidden from assistive tech where appropriate.

## Security Considerations

- No server routes, secrets, user data, Sanity tokens, Clerk keys, or PostHog keys are involved.
- Keep the page static and avoid browser-only token usage.
- Do not add dependencies that could expand the security surface.

## Acceptance Criteria

- Visiting `/` shows the Vertex design system instead of the Next.js starter.
- The design visually matches `design/vertex-designsystem.png` in structure, palette, typography hierarchy, card density, and component examples.
- The page is responsive with no broken layout or overlapping text at common widths.
- TypeScript, lint, and production build checks pass.
- A local dev server starts successfully and serves the page.

## Checks to Run

From the repo root:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm run dev`

## Manual Test Steps

1. Open the local dev URL printed by `npm run dev`.
2. Confirm the page title and hero read as Vertex Design System.
3. Compare the page against `design/vertex-designsystem.png`.
4. Resize to tablet and mobile widths.
5. Confirm sections remain readable and no text or UI overlaps.

