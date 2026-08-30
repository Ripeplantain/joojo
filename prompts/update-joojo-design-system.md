# Update Joojo Design System

## Goal

Update the current one-page design system board at `/` from the orange Vertex visual language to the blue joojo visual language shown in the latest user-provided reference image. The result should match the new reference in brand, palette, typography, component examples, section naming, and overall density.

## Skills and Docs Read

- `design-system-builder`, because this is a project-specific design-system board update.
- `design-system-builder/references/design-system-board.md`, because this is a visual design-system board with tokens and component examples.
- `vercel-plugin:nextjs`, because the implementation lives in a Next.js App Router app.

## Code Inspected

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- Current git status

## Current Project Shape

- Root-level Next.js App Router project.
- Tailwind CSS v4 through `app/globals.css`.
- The current `/` page is a static design-system board implemented in `app/page.tsx`.
- Fonts currently use Inter and Playfair Display through `next/font/google`.
- No icon package is installed, so icons are inline SVGs.
- Existing unrelated worktree changes must remain untouched:
  - `.gitignore`
  - `AGENTS.md`
  - `.agents/`
  - `design/`
  - `skills-lock.json`

## Source of Truth

Use the latest user-provided screenshot as the visual source of truth. It shows:

- Brand: `joojo`
- Headline: `Design System`
- Tagline: `Learn clearly. Grow confidently.`
- Product copy: `A unified design language for joojo, a learning platform for students mastering technology.`
- Version/date: `Version 1.0` and `May 2025`
- Primary visual mood: calm, educational, blue-led, high clarity.

## Decisions and Assumptions

- Keep the design system board at `/`.
- Keep it static and server-rendered.
- Do not add dependencies.
- Use inline SVGs for the provisional joojo mark and icons.
- Treat the joojo logo in the screenshot as a visual reference and recreate a simple geometric mark in code.
- Use `Plus Jakarta Sans` for display and `Inter` for body via `next/font/google`.
- Use webpack for production build verification if Turbopack repeats the sandbox binding panic seen in the previous pass.

## Files Expected to Change

- `app/page.tsx`
  - Replace Vertex labels, tokens, cards, statuses, icons, and examples with joojo-specific content.
- `app/layout.tsx`
  - Update metadata and font import/setup from Playfair Display to Plus Jakarta Sans.
- `app/globals.css`
  - Replace orange token values with the joojo blue/navy/cyan/green palette and update component styling.

## Required Content Updates

- Colors:
  - Navy 900 `#0F172A`
  - Navy 700 `#1E3A5F`
  - Primary Blue `#2563EB`
  - Cyan Accent `#06B6D4`
  - Light Blue `#DBEAFE`
  - Success Green `#22C55E`
  - Main Text `#111827`
  - Muted Text `#64748B`
  - Background `#F8FAFC`
  - White `#FFFFFF`
- Typography:
  - Display: Plus Jakarta Sans
  - Body: Inter
  - Copy traits from the reference:
    - Plus Jakarta Sans: Friendly, Modern, Approachable
    - Inter: Clean, Readable, Highly Legible
- Type scale:
  - Display 1: 48 / 56, Bold, Hero titles
  - Display 2: 36 / 44, Bold, Section titles
  - Heading 1: 28 / 36, Semi Bold, Page titles
  - Heading 2: 22 / 28, Semi Bold, Sub section
  - Body Large: 16 / 24, Medium, Emphasis
  - Body: 14 / 20, Regular, Body copy
  - Body Small: 12 / 18, Regular, Captions, meta
- Sections:
  - `01 Colors`
  - `02 Typography`
  - `03 Type Scale`
  - `04 Spacing System`
  - `05 Corner Radii & Shadows`
  - `06 Icons`
  - `07 Buttons`
  - `08 Inputs & Dropdowns`
  - `09 Badges`
  - `10 Learning Status`
  - `11 Progress Bar`
  - `12 Content Cards`
  - `13 Navigation`
  - `14 Design Principles`
- Button examples:
  - Primary: `Explore Courses`
  - Secondary: `Continue Learning`
  - Tertiary: `View Lesson`
- Input examples:
  - Text input with placeholder `Search anything...`
  - Dropdown `Most Relevant`
- Badge examples:
  - `New`, `Popular`, `Free`, `Beta`, `Certified`
- Learning statuses:
  - `In Progress`
  - `Completed`
  - `Locked`
  - `Not Started`
- Progress:
  - Show blue progress fill and `65% complete`
- Content cards:
  - Course Card: `Web Development Fundamentals`
  - Lesson Card Video: `Project: Responsive Navigation`
  - Lesson Card Lesson: `Data Fetching & Caching`
  - Resource Card: `CSS Grid Cheat Sheet`
- Navigation:
  - joojo brand mark and wordmark
  - `Explore`, `My Learning`, `Bookmarks`
  - Search, notification, user avatar/dropdown controls
- Principles:
  - `Clarity`
  - `Consistency`
  - `Focus`
  - `Accessible`

## Visual Requirements

- Match the screenshot's white/off-white board with subtle borders and shadows.
- Use a blue focus system, not orange.
- Keep corners close to 8px and avoid overly rounded cards.
- Keep dense sections readable on desktop.
- Ensure mobile and tablet layout wraps/scrolls without overlap.
- Preserve accessible contrast for text and primary controls.
- Keep source files ASCII-only.

## Security Considerations

- No backend, auth, CMS, analytics, secrets, tokens, or external service calls are involved at runtime.
- The page remains static.

## Acceptance Criteria

- `/` renders a joojo design system board matching the latest screenshot.
- No old `Vertex`, orange palette, Playfair Display, or Next.js starter content remains in the rendered page.
- Layout remains responsive with no text overlap.
- Lint, type check, production build, and dev-server smoke check are run and reported honestly.

## Checks to Run

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build -- --webpack`
4. Local dev server smoke check against `/`

## Manual Test Steps

1. Open the local dev URL.
2. Confirm the first panel shows `joojo`, `Design System`, and `Learn clearly. Grow confidently.`
3. Confirm the palette is navy/blue/cyan/green.
4. Confirm sections 01 through 14 match the latest screenshot labels.
5. Resize to mobile/tablet widths and check for overlap.

