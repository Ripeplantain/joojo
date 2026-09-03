# Seed Sanity With Provided Files

## Goal

Import the provided seed content into Sanity using the Sanity CLI, then verify document
counts in the target dataset.

## Skills Read

- `sanity-best-practices`
- `sanity-migration`
- `sanity-migration/references/general.md`

## Code and Data Inspected

- `studio/package.json` provides the local `sanity` CLI through the Studio workspace.
- `studio/sanity.cli.ts` targets project `1v8n2wrs`, dataset `production`.
- `studio/schemaTypes/index.ts` currently registers `category`, `instructor`, `lesson`,
  and `course` document types.
- `seed/seed-sanity.json` is NDJSON with 141 import-ready documents:
  - `category`: 6
  - `instructor`: 5
  - `lesson`: 120
  - `course`: 10
- `seed/video.json` is a JSON lookup object with 120 entries. It is not directly
  importable by `sanity datasets import` because entries are not Sanity documents and the
  current schema has no `video` document type.
- Current schema/query mismatch to note after import:
  - Seed lessons use `thumbnail`; schema/query expect `poster`.
  - Seed instructor `bio` values are Portable Text arrays; schema defines `bio` as text.

## Decisions and Assumptions

- Run the import from `studio/` so `sanity.cli.ts` supplies the target project and dataset.
- Use `npx sanity datasets import ../seed/seed-sanity.json production --replace`.
- Do not transform or import `seed/video.json` in this task because that would require a
  schema/modeling change beyond the request. Verify its entry count locally and report it.
- Use Sanity CLI/API count checks after import:
  `npx sanity documents query 'count(*[_type == "..."])'`.
- If the CLI requires auth or network access, request the needed approval and continue.

## Files Expected to Change

- None, apart from this prompt file.

## Requirements

- Use the Sanity CLI for the actual import.
- Import all 141 documents from `seed/seed-sanity.json`.
- Preserve deterministic `_id` values in the seed so reruns converge.
- Report real post-import counts from the Sanity dataset.
- Do not expose or print Sanity tokens.
- Do not delete unrelated dataset content manually. The `--replace` flag only replaces
  documents present in the import file by `_id`.

## Security Considerations

- The operation writes to Sanity project `1v8n2wrs`, dataset `production`.
- CLI authentication may already exist locally; do not read or print token files.
- Network access may be required for asset imports from `_sanityAsset` URLs and for Sanity
  API calls.

## Acceptance Criteria

- Sanity CLI import completes without fatal errors.
- Post-import Sanity counts match the expected import-ready documents:
  - `category`: 6
  - `instructor`: 5
  - `lesson`: 120
  - `course`: 10
  - total for these four types: 141
- `seed/video.json` is verified locally as 120 entries and explicitly reported as not
  imported under the current schema.

## Checks To Run

From `studio/`:

1. `npx sanity datasets import ../seed/seed-sanity.json production --replace`
2. `npx sanity documents query 'count(*[_type == "category"])'`
3. `npx sanity documents query 'count(*[_type == "instructor"])'`
4. `npx sanity documents query 'count(*[_type == "lesson"])'`
5. `npx sanity documents query 'count(*[_type == "course"])'`
6. `npx sanity documents query 'count(*[_type in ["category","instructor","lesson","course"]])'`

From the repo root:

1. Verify local seed counts for both provided files.

## Manual Test Steps

1. Open Sanity Studio for project `1v8n2wrs`, dataset `production`.
2. Confirm document lists show seeded categories, instructors, lessons, and courses.
3. Spot-check one course and verify its instructor/category/module lesson references resolve.
