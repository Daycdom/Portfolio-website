# Update log

Newest first. Add a line here whenever something changes on the site.


## Oct 10, 2026

- Projects can have sub-cards (`parts`) shown in Details; a card with sub-cards spans the full row while open
- Infrastructure projects combined into one Self-Hosted Homelab card using sub-cards
- Moved to dominiccaulfield-duverger.dev
- Content refreshed from the new resume


## Oct 9, 2026

- Sections collapse from their headings; `collapsed: true` in `sections` starts one closed
- Public repos load live from the GitHub API into a collapsed subsection under Projects, skipping forks, archived repos, `exclude` names and `excludePrefixes` (currently `CS`)
- Projects can attach a repo with `repo: "name"`; its card moves into that project's Details, or shows a private note if the repo isn't public
- Social links rendered from `profile.socials` in the hero and Contact
- Deployed: Caddy serves the files from a Debian container; a VPS handles HTTPS and proxies to it over Tailscale
- First version: page rendered from `data.js` through `RENDERERS` in `main.js`, with light/dark toggle, project filters, copy-email button and scroll-highlighted nav
