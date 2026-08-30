# Move Design System Route

## Goal

Move the current joojo design system page off the home route and make it available at `/design-system` instead.

## Skill and Docs Read

- `vercel-plugin:nextjs`, because this is a Next.js App Router route/file-structure change.

## Code Inspected

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/` file tree
- Current git status

## Current Project Shape

- The joojo design system currently lives in `app/page.tsx`, so it renders at `/`.
- `app/layout.tsx` defines shared fonts and metadata.
- `app/globals.css` defines the joojo design tokens and board styling.
- There is no existing `app/design-system/` route.
- Existing unrelated local changes must remain untouched.

## Decisions and Assumptions

- Move the existing design-system component code from `app/page.tsx` to `app/design-system/page.tsx`.
- Replace `app/page.tsx` with a minimal home page that links to `/design-system`.
- Keep shared metadata/fonts in `app/layout.tsx`.
- Keep the current global CSS because `/design-system` still depends on it.
- Do not add dependencies or backend behavior.

## Files Expected to Change

- `app/page.tsx`
- `app/design-system/page.tsx`
- `prompts/move-design-system-route.md`

## Requirements

- `/design-system` renders the full joojo design system board.
- `/` no longer renders the full design system board.
- `/` provides a simple path to open `/design-system`.
- Keep source files ASCII-only.
- Preserve App Router conventions.
- Do not touch unrelated uncommitted files.

## Security Considerations

- Static route change only.
- No secrets, auth, CMS, analytics, or server routes involved.

## Acceptance Criteria

- `app/design-system/page.tsx` exists and contains the design-system page.
- `app/page.tsx` is a lightweight home page/link page.
- Local route checks confirm:
  - `/` returns home content.
  - `/design-system` returns joojo design-system content.
- Lint and type check pass.
- Production build passes using the same webpack build path used for prior successful checks if Turbopack is still blocked by the sandbox.

## Checks to Run

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build -- --webpack`
4. Local dev-server smoke checks for `/` and `/design-system`

