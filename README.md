# joojo

joojo is a learning platform for students mastering technology. This repository holds two
standalone workspaces: a Next.js App Router web app at the repo root, and a Sanity Studio
in `studio/`. They are never embedded in each other — each has its own `package.json` and
runs independently.

## Routes

- `/` - Lightweight home page for the joojo learning platform.
- `/design-system` - joojo design-system board with brand, color, typography, spacing, components, navigation, and principles.

## Tech Stack

- Next.js 16.3.3
- React 19.2.8
- TypeScript
- Tailwind CSS v4
- `next/font` for self-hosted Google font optimization
- Sanity Studio (standalone, in `studio/`) for course/lesson/instructor/category content
- `next-sanity` + a server-only read client/data layer (`sanity/lib/`) for fetching content
- Clerk for authentication

## Getting Started

Install dependencies for both workspaces:

```bash
npm install
npm install --prefix studio
```

Copy `.env.example` to `.env.local` and fill in the Clerk and Sanity values (see
[Environment Variables](#environment-variables)).

Start the Next.js app:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Start Sanity Studio, in a separate terminal:

```bash
cd studio && npm run dev
```

Open `http://localhost:3333` to author content.

## Scripts

```bash
npm run dev
```

Starts the local Next.js development server.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run build
```

Builds the application for production.

```bash
npm run start
```

Starts the production server after a successful build.

## Project Structure

```text
app/
  design-system/
    page.tsx       Design-system board route
  globals.css      Global styles and joojo design tokens
  layout.tsx       Root layout, metadata, and fonts
  page.tsx         Home route
sanity/
  env.ts           Project id / dataset / API version from env
  lib/
    client.ts      Server-only Sanity client (private dataset + read token)
    fetch.ts        sanityFetch wrapper (revalidate/tags)
    queries.ts      GROQ queries (defineQuery)
    data.ts         Exported read functions used by pages
    image.ts        Sanity image URL builder
studio/
  schemaTypes/
    documents/      course, lesson, instructor, category
    objects/        courseModule, learningOutcome, resource
  structure.ts       Studio desk structure
  sanity.config.ts
  sanity.cli.ts       Also configures TypeGen output to ../sanity.types.ts
prompts/
  *.md             Implementation prompts used for agent work
```

## Environment Variables

See `.env.example` for the full list. Notable ones:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — not secret, safe for the browser.
- `SANITY_API_READ_TOKEN` — server-only Viewer token. The `production` dataset is private, so every read from `sanity/lib/client.ts` goes through this token. Never prefix it `NEXT_PUBLIC_`.
- `CLERK_SECRET_KEY` — server-only. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is the browser-safe counterpart.

## Development Notes

- The design system is implemented as static React and CSS, with no runtime backend dependency.
- The current visual language uses a navy, blue, cyan, green, and soft-neutral palette.
- The app uses Plus Jakarta Sans for display text and Inter for body text.
- In this local sandbox, `npm run build -- --webpack` has been the stable production build command when Turbopack cannot bind worker ports.
- `sanity/lib/client.ts` imports `server-only`, so pulling it into a Client Component fails the build by design.
- Run `npx sanity schemas extract --force && npx sanity typegen generate` from `studio/` after changing schema or queries if you're not running `sanity dev` (which regenerates types automatically).

