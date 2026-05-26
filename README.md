# Backpropaganda Website

Static Astro site for Backpropaganda, deployed with GitHub Pages.

## Local Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Editing Content

Most site copy is Markdown-backed:

- `src/content/pages/about.md` controls the front page and `/about/`.
- `src/content/pages/join.md` controls `/join/`, including open roles in frontmatter.
- `src/content/blog/*.md` controls the research index and individual blog posts.

Site chrome and visuals are code-backed:

- Navigation, layout, and reusable UI live in `src/components/` and `src/layouts/`.
- Global styling lives in `src/styles/global.css`.
- The pixel-wave animation lives in `src/components/DendriteShader.astro`.
