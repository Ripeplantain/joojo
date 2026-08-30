# joojo

joojo is a learning platform for students mastering technology. This repository currently contains a Next.js App Router application and a visual design-system board for the product.

## Routes

- `/` - Lightweight home page for the joojo learning platform.
- `/design-system` - joojo design-system board with brand, color, typography, spacing, components, navigation, and principles.

## Tech Stack

- Next.js 16.3.3
- React 19.2.8
- TypeScript
- Tailwind CSS v4
- `next/font` for self-hosted Google font optimization

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

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
prompts/
  *.md             Implementation prompts used for agent work
```

## Development Notes

- The design system is implemented as static React and CSS, with no runtime backend dependency.
- The current visual language uses a navy, blue, cyan, green, and soft-neutral palette.
- The app uses Plus Jakarta Sans for display text and Inter for body text.
- In this local sandbox, `npm run build -- --webpack` has been the stable production build command when Turbopack cannot bind worker ports.

