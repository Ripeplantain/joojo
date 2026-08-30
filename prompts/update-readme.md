# Update README

## Goal

Replace the starter Next.js README with project-specific documentation for the joojo app.

## Code Inspected

- `README.md`
- `package.json`
- `app/` route tree
- Current git status

## Current Project Shape

- Next.js App Router app.
- Main home route: `/`
- Design system route: `/design-system`
- Scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
- Dependencies include Next.js 16.3.3, React 19.2.8, Tailwind CSS v4, and TypeScript.

## Decisions and Assumptions

- Write a concise README for developers working on this repo.
- Describe joojo as a learning platform for students mastering technology.
- Document the current design-system route.
- Mention the known local build nuance: `npm run build -- --webpack` has been the stable build command in this sandbox.
- Do not add badges, screenshots, or deployment instructions that are not configured in the repo.
- Keep source Markdown ASCII-only.

## Files Expected to Change

- `README.md`
- `prompts/update-readme.md`

## Requirements

- Remove create-next-app boilerplate.
- Add clear sections:
  - Project name and short description
  - Current routes
  - Tech stack
  - Getting started
  - Available scripts
  - Project structure
  - Development notes
- Keep it accurate to the current repo and avoid claiming unfinished backend, auth, CMS, or analytics features.

## Acceptance Criteria

- README no longer reads like a default Next.js starter.
- README mentions `/design-system`.
- README documents install and dev commands.
- README documents lint and build commands.
- Markdown is readable and valid.

## Checks to Run

1. Inspect `README.md`.
2. Confirm there are no non-ASCII characters.

