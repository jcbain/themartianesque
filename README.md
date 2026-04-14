# The Martianesque Blog

Astro blog foundation with optional React islands for interactive UI sections.

## Project layout

- `src/pages`: route files
- `src/layouts`: shared page templates
- `src/components/ui`: presentational Astro components
- `src/components/blog`: post-focused Astro components
- `src/components/react`: interactive React components
- `src/content/blog`: Markdown/MDX blog posts
- `src/styles/global.css`: global styling

## Commands

- `npm install`: install dependencies
- `npm run dev`: start local dev server (`http://localhost:4321`)
- `npm run build`: create production build in `dist`
- `npm run preview`: preview the production build locally

## Deployment

This project is configured for static deployment on Netlify via `netlify.toml`.

## Migration notes

See `MIGRATION.md` for the step-by-step Astro + React migration workflow.
