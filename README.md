# Oleg Ushakov — Personal Blog

Personal blog and portfolio site built with [Astro](https://astro.build). It features a blog and project portfolio backed by content collections, is authored through the [Keystatic](https://keystatic.com) admin panel, and is deployed to GitHub Pages.

## Features

- **Blog & Projects** — content stored as Markdown/Markdoc files in `src/content/` and validated through Astro content collections.
- **Keystatic CMS** — a visual admin panel at `/keystatic` for writing blog posts and projects. Runs in `local` storage mode, so edits are written straight to the Markdown files on disk.
- **Commit & Push page** — a dev-only page at `/commit` that runs `git add`, `git commit`, and `git push` through a small local helper server.
- **Search** — `scripts/generate-search-index.mjs` scans content frontmatter, builds `public/search-index.json`, and powers the header search box.
- **Tailwind CSS + Alpine.js** — utility-first styling via the Tailwind CDN with interactive widgets (mobile menu, search) powered by Alpine.js; Font Awesome for icons.
- **Google Analytics** — site traffic tracking via gtag.
- **GitHub Pages deploy** — automated build & deploy via a GitHub Actions workflow.

## Tech Stack

- [Astro](https://astro.build) — static output, with `@astrojs/react`, `@astrojs/markdoc`, and `@astrojs/node`
- [Markdoc](https://markdoc.dev) — Markdown-based content authoring
- [Keystatic](https://keystatic.com) (`@keystatic/core`, `@keystatic/astro`) — local-storage CMS
- [Tailwind CSS](https://tailwindcss.com) — styling (via CDN)
- [Alpine.js](https://alpinejs.dev) — interactive UI widgets
- [Font Awesome](https://fontawesome.com) — icons
- Node.js >= 22

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts three processes concurrently:

- `scripts/git-commit-server.mjs` — local HTTP server on `127.0.0.1:4001` handling `POST /commit`
- `scripts/generate-search-index.mjs` — rebuilds `public/search-index.json`
- the Astro dev server

On Windows you can use `start.bat`, which prints the URLs and starts the dev server.

Useful URLs while developing:

| URL | Purpose |
| --- | --- |
| `http://localhost:4321` | Main site |
| `http://localhost:4321/keystatic` | Keystatic admin panel |
| `http://localhost:4321/commit` | Commit & Push page (dev only) |

> Note: the `/commit` page and the git server are dev-only tools and are not included in the production build.

### Build

```bash
npm run build
```

Generates the search index and builds the static site into `dist/`.

### Preview

```bash
npm run preview
```

## Deployment

The site is deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. It runs on every push to `main` (and can be triggered manually via `workflow_dispatch`), building with Node 22 and publishing through `actions/deploy-pages`. Live at: https://olegushakov-pl.github.io

## Project Structure

```
.
├── astro.config.mjs            # Astro configuration (integrations, adapter)
├── keystatic.config.ts         # Keystatic collections & schema
├── start.bat                   # Windows launcher for the dev server
├── .github/workflows/deploy.yml# GitHub Pages build & deploy
├── scripts/
│   ├── git-commit-server.mjs   # Local server that commits & pushes via git
│   └── generate-search-index.mjs # Builds public/search-index.json
├── public/
│   ├── search-index.json       # Generated search index
│   ├── css/                    # Custom styles
│   └── images/                 # Static images, favicon
└── src/
    ├── components/             # Astro components (Sidebar, PostCard, Recommended)
    ├── content/
    │   ├── posts/              # Blog posts (Markdown/Markdoc)
    │   └── projects/           # Projects (Markdown/Markdoc)
    ├── content.config.ts       # Content collection schemas (Zod)
    ├── layouts/
    │   └── BaseLayout.astro    # Shared layout (header, nav, search, footer, GA)
    └── pages/                  # Routes (index, blogs, projects, commit)
```

## Content Management

Content lives in `src/content/`:

- `src/content/posts/*.md` — blog posts
- `src/content/projects/*.md` — portfolio projects

Each file uses YAML frontmatter with fields like `title`, `description`, `pubDate`, `heroImage`, `tags`, and `draft` (see `src/content.config.ts` for the full schema).

### Keystatic

The admin panel is configured in `keystatic.config.ts` with two collections (`posts` and `projects`). Because storage is set to `local`, edits are written straight to the Markdown files — they are **not** committed automatically.

To save your changes to the repository:

1. Open `http://localhost:4321/commit`.
2. Enter a commit message.
3. Click **Commit & Push** (the local git server on `127.0.0.1:4001` must be running, which it is during `npm run dev`).

> The Keystatic schema must mirror the Zod schemas in `src/content.config.ts` — keep both in sync when changing fields.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev servers (git server + search index + Astro) |
| `npm run build` | Generate search index and build the static site |
| `npm run preview` | Preview the built site |
| `npm run generate-search` | Regenerate `public/search-index.json` |

## License

Personal project. All rights reserved.