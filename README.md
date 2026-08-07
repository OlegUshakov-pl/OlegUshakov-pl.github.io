# Oleg Ushakov — Personal Blog

Personal blog and portfolio site built with [Astro](https://astro.build). It features a blog with content collections, a project portfolio, a built-in admin panel via [Keystatic](https://keystatic.com), and a small dev-time tool to commit & push content changes.

## Features

- **Blog & Projects** — content stored as Markdown files in `src/content/` and managed through Astro content collections.
- **Keystatic CMS** — visual admin interface at `/keystatic` for editing blog posts and projects. Runs in `local` storage mode, meaning edits are written directly to Markdown files on disk.
- **Commit & Push page** — a dev-only page at `/commit` that runs `git add`, `git commit`, and `git push` through a local helper server.
- **Search index** — a script that scans content frontmatter and generates `public/search-index.json` for site search.
- **Reporter Bootstrap design** — the UI is converted from the Themefisher Reporter Bootstrap theme, keeping the original Bootstrap layout and styling.

## Tech Stack

- [Astro](https://astro.build) (static output) with `@astrojs/react` and `@astrojs/node` adapter
- [Keystatic](https://keystatic.com) (`@keystatic/core`, `@keystatic/astro`) — local storage CMS
- [Bootstrap](https://getbootstrap.com) (v5) — styling
- Node.js >= 22

## Getting Started

### Prerequisites

- Node.js (latest stable, v22+ recommended)
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

This runs three things concurrently:

- `scripts/git-commit-server.mjs` — local HTTP server on `127.0.0.1:4001` handling `POST /commit`
- `scripts/generate-search-index.mjs` — rebuilds `public/search-index.json`
- the Astro dev server

You can also use `start.bat` on Windows, which prints the URLs and starts the dev server.

Useful URLs while developing:

| URL                    | Purpose                                |
| ---------------------- | -------------------------------------- |
| `http://localhost:4321` | Main site                              |
| `http://localhost:4321/keystatic` | Keystatic admin panel        |
| `http://localhost:4321/commit` | Commit & Push page (dev only) |

> Note: the `/commit` page and the git server are dev tools only. They are not included in the production build.

### Build

```bash
npm run build
```

Generates the search index and builds the static site into `dist/`.

### Preview

```bash
npm run preview
```

## Project Structure

```
.
├── astro.config.mjs            # Astro configuration (integrations, adapter)
├── keystatic.config.ts         # Keystatic collections & schema
├── start.bat                   # Windows launcher for the dev server
├── scripts/
│   ├── git-commit-server.mjs   # Local server that commits & pushes via git
│   └── generate-search-index.mjs # Builds public/search-index.json from frontmatter
├── public/
│   └── search-index.json       # Generated search index
└── src/
    ├── components/             # Astro components (Sidebar, PostCard, Recommended)
    ├── content/
    │   ├── posts/              # Blog posts (Markdown)
    │   └── projects/           # Projects (Markdown)
    ├── content.config.ts       # Content collection schemas (Zod)
    ├── layouts/
    │   └── BaseLayout.astro    # Shared layout
    └── pages/                  # Routes (index, blogs, projects, commit)
```

## Content Management

Content is Markdown in `src/content/`:

- `src/content/posts/*.md` — blog posts
- `src/content/projects/*.md` — portfolio projects

Each file uses YAML frontmatter with fields like `title`, `description`, `pubDate`, `heroImage`, `tags`, and `draft`.

### Keystatic

The admin panel is configured in `keystatic.config.ts` with two collections (`posts` and `projects`). Because storage is set to `local`, edits are written straight to the Markdown files — they are **not** committed automatically.

To save your changes to the repository:

1. Open `http://localhost:4321/commit`.
2. Enter a commit message.
3. Click **Commit & Push** (the local git server on `127.0.0.1:4001` must be running, which it is during `npm run dev`).

> The Keystatic schema must mirror the Zod schemas in `src/content.config.ts` — keep both in sync when changing fields.

## Scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start dev servers (git server + search index + Astro) |
| `npm run build`     | Generate search index and build the static site    |
| `npm run preview`   | Preview the built site                             |
| `npm run generate-search` | Regenerate `public/search-index.json`        |

## License

Personal project. All rights reserved.
