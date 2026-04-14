# Astro + React Migration Guide

This project is now set up so you can migrate your existing React app to an Astro-powered blog incrementally.

## Current structure

- `src/pages`: Astro routes (`/`, `/blog`, `/about`, etc.)
- `src/layouts`: shared page layouts for posts and content pages
- `src/components/ui`: presentational Astro components
- `src/components/blog`: blog-focused Astro components
- `src/components/react`: React components that need client-side interactivity
- `src/content/blog`: blog content in Markdown/MDX
- `src/styles/global.css`: global styles (keep your current CSS here)

## How migration works

1. Keep routing/content pages in Astro.
2. Move purely presentational React markup to `.astro` components when convenient.
3. Keep interactive React pieces in `src/components/react`.
4. Render React components in Astro pages with a client directive, for example:

```astro
---
import MyWidget from '../components/react/MyWidget.jsx';
---

<MyWidget client:load />
```

Use:
- `client:load` for immediate hydration
- `client:idle` to hydrate when browser is idle
- `client:visible` to hydrate only when component enters viewport

## Practical next step for your existing app

Take one screen from the old React app and port it in this order:

1. Copy its CSS classes into `src/styles/global.css` (or split into component CSS files later).
2. Move static shell markup into an Astro page/component.
3. Move only interactive logic (state/effects/forms) into a React component under `src/components/react`.
4. Mount that React component from the Astro page with a client directive.

Repeat per screen/section until the full app is moved.

## Netlify deploy

- This repo includes `netlify.toml`.
- Build command: `npm run build`
- Publish directory: `dist`
- Recommended Node version: `22`

In Netlify:

1. Create a new site from this repo.
2. Confirm build settings (command and publish dir).
3. Deploy.

If you add server-side features later, we can switch from static deployment to a server adapter strategy.
