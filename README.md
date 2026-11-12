# Skunkworks Africa — Master Brand Portal

Public destination: https://brand.skunkworks.africa/

Static, dependency-free site designed for GitHub Pages. No Netlify, Vercel, or backend services are required.

## Publishing
1. Review and merge the brand portal PR into `main`.
2. In repository **Settings → Pages**, enable **Deploy from a branch**, choose `main` and `/(root)`.
3. In domain DNS, configure `brand.skunkworks.africa` as a CNAME to `skunkworks-africa.github.io` (unless an existing verified hosting configuration requires otherwise).
4. Confirm GitHub Pages **Custom domain** is `brand.skunkworks.africa`, **Enforce HTTPS** and verify the public site.
5. Check both themes, mobile navigation, links, assets and contrast on production.

The logo assets currently link to the canonical corporate site's published resources rather than duplicating source assets. Confirm accessibility and rights to the master files before issuing public downloads.

## Guidelines
- Match the corporate website's black/white neutral palette and Inter/system sans-serif typography.
- Preserve logo proportions and use dark marks on light surfaces and inverse marks on dark.
- Test keyboard access, contrast, responsive layouts and reduced-motion preference.
- Review new brand variants before publishing.

## Development
Open `index.html` or serve the folder using any static HTTP server. No build process is necessary.
