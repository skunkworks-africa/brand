# Skunkworks Design System

Public documentation: https://brand.skunkworks.africa/

Skunkworks Africa's monochrome identity, semantic design tokens, framework-independent components and experience guidance. Version 1.0.0 contains 31 documentation pages plus the home page. No browser framework, remote font or analytics dependency is required.

## Development

Use Node 22 or later. `npm run build` generates the committed static pages, search index, sitemap and token JSON. `npm run check` verifies local destinations, unique IDs, ARIA references, search coverage and paired semantic contrast. `npm start` serves the site at http://127.0.0.1:4173.

Install development dependencies with `npm install --ignore-scripts`, then `npx playwright install chromium` and `npm test`. Browser checks cover search, navigation, legacy links, themes, consent changes, keyboard interactions, forms, tables, account destinations, five viewport widths and automated accessibility in both themes. Automated checks do not replace manual assistive-technology review.

## Editing

- `content.mjs`: page content and navigation architecture.
- `build.mjs`: static HTML shell and resource generation.
- `tokens.css`: canonical light and dark tokens; JSON is derived during the build.
- `components.css` / `components.js`: reusable component resources.
- `styles.css` / `site.js`: documentation shell and local examples.

Run the build after source edits and commit the generated files together. CI rejects generated-source drift.

## Publishing and rollback

The existing GitHub Pages deployment publishes `main` from the repository root. Retain `CNAME` and `.nojekyll`. Review and merge a validated PR, then confirm the Pages workflow and production site. No DNS or hosting migration is required. Roll back by reverting the release merge commit and letting Pages redeploy.

## Account and privacy boundaries

The documentation is public. Employee login links to Microsoft My Apps; Academy profile links to the existing portal. This site does not create an authenticated session or implement role assignments. Applications must configure real identity and backend authorisation separately.

Theme and versioned consent preferences use origin-local storage. No optional analytics or advertising scripts are shipped. Future integrations must read the saved preference before loading and handle `skw:consent-change`. The consent choice is re-requested after 180 days or a preference-schema version change. Logos are loaded from the corporate website.

## Scope

This release includes source CSS, native HTML examples, interaction scripts and token JSON. It does not publish a Figma component library, framework package or MCP service, or automatically change downstream applications. Brand artwork remains owned by Skunkworks; use approved masters and follow the identity guidance.
