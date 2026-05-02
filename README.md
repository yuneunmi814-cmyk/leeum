# Oculus — Portfolio

리움미술관 M1관 로툰다 천창(오쿨러스, 마리오 보타 설계)을 모티브로 한
포트폴리오 사이트.

- **Stack** — Next.js 14 (App Router) · TypeScript · Tailwind 3.4 · Framer Motion 11
- **Fonts** — Noto Serif KR · Inter · Cormorant Garamond
- **Deploy** — Cloudflare Pages (`@cloudflare/next-on-pages`)

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deployment — Cloudflare Pages

The site ships through `@cloudflare/next-on-pages`, which compiles the
Next.js build into a Pages-compatible output at `.vercel/output/static`.

### Required compatibility flag

Cloudflare Pages needs the `nodejs_compat` flag enabled. It is declared
in [`wrangler.toml`](./wrangler.toml):

```toml
name = "leeum"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

If the flag is missing, the build fails with a *Node.js Compatibility Error*.

### Scripts

```bash
npm run pages:build  # build for Cloudflare Pages (.vercel/output/static)
npm run preview      # build + run wrangler pages dev locally
npm run deploy       # build + wrangler pages deploy
```

`wrangler` and `@cloudflare/next-on-pages` are pulled in via `npx` /
`wrangler` CLI; install wrangler globally (`npm i -g wrangler`) or as a
dev dependency to run `preview` / `deploy`.

### Cloudflare dashboard setup

When connecting the repo from the Cloudflare Pages UI:

| Field | Value |
| --- | --- |
| Build command | `npm run pages:build` |
| Build output directory | `.vercel/output/static` |
| Compatibility flags (Production & Preview) | `nodejs_compat` |
| Compatibility date | `2024-09-23` |

## Project layout

```
app/
  layout.tsx               root layout, fonts, Header, ViewCursor
  page.tsx                 Hero · Collection · Inquiry
  globals.css              tokens + utilities
  works/[slug]/            statically generated detail pages
components/
  Oculus.tsx               13-layer SVG skylight (the centerpiece)
  Hero.tsx · Intro.tsx
  Works.tsx                asymmetric 12-col gallery grid
  PlaceholderArt.tsx       7 generative shape variants
  Header.tsx               sticky header + scroll progress bar
  ViewCursor.tsx           custom "VIEW" cursor
data/
  works.ts                 single source of truth for the gallery
tailwind.config.ts         design tokens (canvas / ink / concrete / oculus)
wrangler.toml              Cloudflare Pages config
```
