# Samin Sadaf — portfolio

Personal site built with Astro 7 and Tailwind CSS 4. Live at
<https://saminsadaf22.github.io>.

## Editing content

Almost everything you would want to change lives in `src/data/`. You do not
need to touch markup for normal updates.

| File | Controls |
| :--- | :--- |
| `src/data/site.ts` | Name, role, description, email, phone, social links, navigation |
| `src/data/profile.ts` | Skill groups (profile + CV) and research interests (research + CV) |
| `src/data/projects.ts` | The project list; `href` adds a "Read the study" link |
| `src/data/publications.ts` | Papers — the page shows an empty state while the list is empty |
| `src/data/thesis.ts` | The corn leaf disease case study, including its results table |

Page copy that is not shared lives in the matching file under `src/pages/`.
Colours and fonts are the `@theme` block in `src/styles/global.css`.

### Adding a thesis result

Fill the `results` array in `src/data/thesis.ts`; the page renders a table
instead of the "documentation in progress" note as soon as it is non-empty:

```ts
results: [
  { model: "DenseNet121", accuracy: "94.12%", macroF1: "0.938" },
  { model: "EfficientNet-B0", accuracy: "95.40%", macroF1: "0.951" },
],
```

### Adding a project

```ts
{
  slug: "my-project",
  title: "Project title",
  category: "Software Engineering", // or "AI Research"
  period: "2026",
  summary: "One or two sentences on what it does and what you did.",
  tags: ["Python", "PyTorch"],
  href: "/projects/my-project", // optional: create the page in src/pages/projects/
}
```

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
```

## Publishing changes

```bash
npm run deploy
```

That builds the site and force-pushes the output to the `gh-pages` branch, which
GitHub Pages serves. Wait a minute, then check the live URL.

This is used instead of a GitHub Actions workflow because workflow jobs do not
start on this account — a one-step `echo` job fails within seconds with no logs
(the same thing happened on the older `portfolio` repo). GitHub's own
`pages-build-deployment` runs fine, so branch publishing is the reliable path.

`scripts/deploy-gh-pages.mjs` also writes `dist/.nojekyll`; without it Jekyll
strips the `_astro/` directory and the site loads with no CSS.

## Custom domain (saminsadaf.me)

The domain is registered with **Spaceship** and currently points at their
parking IPs. To serve the site there:

1. In the Spaceship DNS panel, replace the apex `A` records with GitHub Pages'
   four addresses:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  saminsadaf22.github.io
   ```

2. Add a file `public/CNAME` containing exactly `saminsadaf.me`, and set
   `site` in `astro.config.mjs`, `url` in `src/data/site.ts` and the `Sitemap:`
   line in `public/robots.txt` to `https://saminsadaf.me`.
3. Run `npm run deploy`.

Do step 1 before step 2. GitHub Pages adopts the domain from the `CNAME` file,
and once it does, `saminsadaf22.github.io` (including `/portfolio/`) redirects
to the custom domain — so publishing the `CNAME` first makes both sites
unreachable until DNS is correct.
