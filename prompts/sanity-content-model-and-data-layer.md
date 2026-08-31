# Sanity Content Model, Standalone Studio, and Server Read Data Layer

## Goal

Model course, module, lesson, instructor, and category content in Sanity, move Studio
authoring into its own standalone workspace (per AGENTS.md section 5/6), and build a
server-only read client and data-layer for the Next.js app to consume that content.
No pages or UI are built in this task — only schema, Studio config, and the fetch layer.

## Skills and Docs Read

- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`), plus
  references: `project-structure.md`, `nextjs.md`, `schema.md`, `studio-structure.md`,
  `image.md`, `typegen.md`, `groq.md`.
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`).
- `node_modules/next/dist/docs/` was not needed — this task touches no routing/rendering
  behavior, only data access.

## Code and Config Inspected

- Root `package.json` — Next 16.3.3, `sanity` 5.31.2, `next-sanity` 13.3.3,
  `@sanity/image-url`, `@sanity/vision` are already installed at the repo root.
- `sanity.config.ts`, `sanity.cli.ts`, `app/studio/[[...tool]]/page.tsx` — the project was
  scaffolded with an **embedded Studio** (`NextStudio` mounted inside the Next.js app,
  config at repo root). This directly violates AGENTS.md section 5 ("do not embed the
  Studio inside Next.js") and section 6 ("do not use ... an embedded Studio"). This prompt
  fixes that by extracting a standalone Studio workspace, per the migration steps in
  `sanity-best-practices/references/nextjs.md` ("Migrating an Existing Embedded Studio").
- `sanity/schemaTypes/index.ts` — empty schema (`types: []`), nothing authored yet.
- `sanity/lib/client.ts` — uses `useCdn: true`, no token; `sanity/lib/live.ts` wires
  `defineLive`/`SanityLive`, unused anywhere in the app; `sanity/lib/image.ts` — correct
  `createImageUrlBuilder` usage, keep as-is.
- `.env.local` — has `NEXT_PUBLIC_SANITY_PROJECT_ID=1v8n2wrs`,
  `NEXT_PUBLIC_SANITY_DATASET=production`, plus Clerk vars. No `SANITY_API_READ_TOKEN`.
  No committed `.env.example` exists yet (required by AGENTS.md section 12).
- Verified against the live Sanity project (`1v8n2wrs`) with the already-authenticated
  CLI: dataset `production` has `aclMode: "public"` — this violates AGENTS.md section 6/12
  ("never use a public dataset", "the dataset is private"). No API tokens exist yet.
  CORS origins already include `http://localhost:3000` and `http://localhost:3333`, so no
  CORS change is needed.
- `app/page.tsx` has its own local `IconName`/`Icon` for the marketing page (arrow, bell,
  bookmark, book, clock, compass, file, search, signal, sparkle) — unrelated to course
  content icons, not reused here.
- `design/vertex-course.png` and `design/vertex-lesson.png` — reference screenshots
  confirming the field shapes in AGENTS.md section 8: course learning-outcome tiles
  (icon + title + description), module/lesson numbering derived from order, lesson
  key-points checklist, an optional "Pro Tip" callout, and a resources list with a
  type icon, title, description, and external link.
- `tsconfig.json` — has `@/*` path alias to repo root; no `sanity.types.ts` in `include` yet.

## Decisions and Assumptions

1. **Workspace split.** The Next.js app stays at the repo root (moving it into a nested
   `web/` folder is a bigger, unrelated disruption to existing routes/build config and
   isn't required by AGENTS.md — it only requires the two workspaces be standalone). A new
   top-level `studio/` directory becomes the standalone Sanity Studio workspace with its
   own `package.json`, scaffolded via `npm create sanity@latest -- --project 1v8n2wrs
   --dataset production --template clean --typescript --output-path studio`, matching the
   documented monorepo pattern where repo root plays the role of `web/`.
2. **Remove the embedded Studio.** Delete `app/studio/`, root `sanity.config.ts`,
   `sanity.cli.ts`, `sanity/schemaTypes/`, and `sanity/structure.ts`. Root `next-sanity`
   and `@sanity/image-url` stay (the app still needs them for fetching); `sanity` and
   `@sanity/vision` move to `studio/package.json` only.
3. **Dataset goes private.** Run `npx sanity dataset visibility set production private`
   from `studio/` and create a read-only **Viewer** token with
   `npx sanity tokens add --role viewer` (or via Sanity Manage if the CLI subcommand
   differs at run time). The token is stored only as `SANITY_API_READ_TOKEN` in
   `.env.local` (untracked) and referenced from `.env.example` (committed, no real value).
4. **No Live Content API / Visual Editing / draft mode in this task.** AGENTS.md doesn't
   ask for real-time preview or the Presentation tool yet, and adding `defineLive`,
   `SanityLive`, and a draft-mode route would be scope creep ("build nothing beyond
   that"). The read client is a plain server-only `next-sanity` client plus a small
   `sanityFetch` wrapper with `revalidate`/`tags` options, per the "Manual sanityFetch
   Helper" pattern in `nextjs.md`. `sanity/lib/live.ts` is deleted as dead code.
5. **`module` is an object type, not a document** (per AGENTS.md section 8), embedded
   inside `course.modules`. Module/lesson numbers are derived from array order in the
   data layer/UI, never stored.
6. **Lesson does not reference its course.** A reverse lookup query
   (`*[_type == "course" && references($lessonId)][0]`) resolves the parent course, module,
   and lesson position when only a lesson id/slug is known.
7. **Field types:**
   - `lesson.duration` is a `number` of seconds (not a formatted string), so a course's
     total duration can be derived by summing lesson durations later without parsing.
   - `lesson.notes` is Portable Text (`array` of `block`) with a minimal block set
     (normal/h2/h3, bold/italic/link marks, bullet/number lists) — no custom blocks or
     inline images, since nothing in the spec calls for them yet.
   - `course.learningOutcome.icon` and `lesson.resource.type` are controlled
     `options.list` strings rather than free text, so the future frontend can map them to
     a fixed icon/type set without guessing editor input.
   - `instructor.expertise` is an array of short strings (tags), `instructor.bio` is plain
     `text` (no rich text requested).
   - All images (`course.coverImage`, `lesson.poster`, `instructor.photo`) use
     `hotspot: true` and a required `alt` field, per `image.md`.
8. **IDs and references.** Let Sanity generate all `_id`s; no deterministic/slug-derived
   IDs. Relationships go through `reference` fields resolved via GROQ `->`.
9. **TypeGen enabled** in `studio/sanity.cli.ts` (`typegen.enabled: true`, output to root
   `sanity.types.ts`), generated types are committed (Option A from `typegen.md` — no CI
   exists yet to generate them on the fly). `sanity.types.ts` is added to
   `tsconfig.json`'s `include`.
10. **Data-layer file count stays small.** One `sanity/lib/queries.ts` (GROQ via
    `defineQuery`) and one `sanity/lib/data.ts` (the exported fetch functions) — splitting
    per-entity into more files isn't justified by today's function count (~6 functions).

## Files Expected to Change

Create:
- `studio/` — scaffolded standalone Studio (`package.json`, `sanity.config.ts`,
  `sanity.cli.ts`, `tsconfig.json`, `.gitignore`)
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/documents/course.ts`
- `studio/schemaTypes/documents/lesson.ts`
- `studio/schemaTypes/documents/instructor.ts`
- `studio/schemaTypes/documents/category.ts`
- `studio/schemaTypes/objects/module.ts`
- `studio/schemaTypes/objects/learningOutcome.ts`
- `studio/schemaTypes/objects/resource.ts`
- `studio/structure.ts`
- `sanity/lib/fetch.ts`
- `sanity/lib/queries.ts`
- `sanity/lib/data.ts`
- `.env.example` (repo root)
- `sanity.types.ts` (generated, repo root)

Modify:
- `sanity/lib/client.ts` — add server-only token config
- `sanity/env.ts` — no functional change expected, re-verify after move
- `package.json` — remove `sanity`/`@sanity/vision`, add `server-only`
- `tsconfig.json` — include `sanity.types.ts`
- `.env.local` — add `SANITY_API_READ_TOKEN` (not committed)
- `README.md` — document the two workspaces and new scripts

Delete:
- `app/studio/` (entire route)
- `sanity.config.ts`, `sanity.cli.ts` (root)
- `sanity/schemaTypes/`, `sanity/structure.ts`, `sanity/lib/live.ts`

External (Sanity project `1v8n2wrs`), done via already-authenticated `sanity` CLI:
- Set dataset `production` visibility to `private`.
- Create one Viewer-role API token for server reads.

## Requirements

- Schema matches AGENTS.md section 8 exactly: `course`, `lesson`, `instructor`,
  `category` as documents; `module` as an embedded object inside `course.modules`.
- Every document/object type uses `defineType`/`defineField`/`defineArrayMember`, has an
  icon, and required fields carry `validation: (rule) => rule.required()`.
- Studio runs standalone (`npm run dev` inside `studio/`), independent of `next dev`.
- The read client (`sanity/lib/client.ts`) only ever runs on the server: it reads
  `SANITY_API_READ_TOKEN` from `process.env` and is guarded with the `server-only`
  package so importing it from a Client Component fails the build.
- `sanity/lib/data.ts` exports: `getCourses()`, `getCourseBySlug(slug)`,
  `getLessonBySlug(slug)`, `getInstructorBySlug(slug)`, `getCategoryBySlug(slug)`,
  `getCourseForLesson(lessonId)`. Each wraps a `defineQuery` from `queries.ts` through
  `sanityFetch`.
- GROQ text-match readiness isn't in scope here (that's the search task), but queries
  must already project the plain fields (title, notes as Portable Text blocks, etc.)
  future search/UI code will need — no redundant/derived fields stored in Sanity itself.
- `.env.example` lists every var from `.env.local` (Clerk + Sanity) with placeholder
  values and a comment marking which are server-only vs. safe for the browser.

## Security Considerations

- `SANITY_API_READ_TOKEN` is a **Viewer** (read-only) token, never a write/deploy token,
  and never prefixed `NEXT_PUBLIC_`.
- `sanity/lib/client.ts` is marked server-only (`import "server-only"`) so a client
  bundle cannot pull the token in.
- The dataset move from public to private is a real change to shared project state (see
  Decisions #3). No other consumers exist yet (no committed frontend fetches from Sanity
  today), so the blast radius is limited to this project, but flagging it here since it's
  an external-system change made through the CLI on the user's behalf.
- `.env.local` stays untracked; only `.env.example` (placeholders) is committed.

## Acceptance Criteria

- `studio/` runs (`npm run dev` inside `studio/`) and shows Course, Lesson, Instructor,
  Category document lists (Module has no top-level list — it's only editable inside a
  course).
- A test Course can be created in Studio with a module containing lesson references,
  an instructor, and a category, without validation errors.
- `npx tsc --noEmit` at the repo root passes, including `sanity.types.ts`.
- `sanity/lib/data.ts` functions type-check against generated query result types and
  return `null`/`[]` (not throwing) when nothing matches.
- No `sanity`/`@sanity/vision`/embedded-Studio code remains at the repo root.
- Root `npm run build` still succeeds (no server-only leak into a client bundle).

## Checks to Run

In `studio/`:
1. `npm install`
2. `npm run dev` — confirm the Studio boots on `localhost:3333` and schema types render.
3. `npx sanity schemas extract --force && npx sanity typegen generate` — confirm
   `sanity.types.ts` is written to the repo root without errors.
4. `npx sanity deploy` (only if the user wants the Studio app deployed now — otherwise
   note it's required before the Context MCP can serve the dataset in the search task).

At the repo root:
1. `npm install`
2. `npx tsc --noEmit`
3. `npm run lint`
4. `npm run build`

## Manual Test Steps

1. `cd studio && npm run dev`, open `http://localhost:3333`.
2. Create one Category (e.g. "Web Development").
3. Create one Instructor with a name, photo, expertise tags, and bio.
4. Create one Lesson with a title, video URL, poster image, duration, a couple of key
   points, and one resource.
5. Create one Course referencing that Instructor and Category, with one module
   containing the lesson from step 4, one learning outcome, a level, and a price. Confirm
   it saves with no validation errors and the module/lesson show up nested correctly.
6. In a scratch file or `tsx` REPL at the repo root, import `getCourses` from
   `sanity/lib/data.ts` and confirm it returns the course created above with the
   instructor/category resolved.
7. Call `getCourseForLesson(lessonId)` with that lesson's `_id` and confirm it resolves
   back to the course created in step 5.
8. Confirm `http://localhost:3000/app/studio` (old embedded route) now 404s.
