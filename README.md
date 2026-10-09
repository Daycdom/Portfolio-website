# Portfolio site

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it

- **Quickest:** open `index.html` in a browser.
- **In the dev container:** open this folder in Cursor, run **Dev Containers: Reopen in Container**, then `npm start` and visit http://localhost:3000. Live Server (right-click `index.html` → *Open with Live Server*) also works and reloads on save.
- **Deploy:** drop the folder onto any static host (GitHub Pages, Netlify, Vercel).

## Files

| File | What it does |
| --- | --- |
| `index.html` | Empty page shell. You rarely need to touch it. |
| `js/data.js` | **All content.** Edit this to change text, add jobs, projects, skills. |
| `js/main.js` | Renders each section from `data.js` and wires up the interactions. |
| `css/styles.css` | Styling. Colors, fonts and spacing are tokens at the top. |

## Common edits

- **Add a project:** copy an object in `projects` in `js/data.js`. A new `category` automatically gets its own filter chip.
- **Link a repo once it's public:** set that project's `links` to `[{ label: "GitHub", url: "https://github.com/..." }]`. A link row appears under its Details.
- **Add a job:** add an object to the top of `experience`.
- **Hide or reorder a section:** edit `sections` (set `enabled: false`, or move the line).
- **Change the accent color:** edit `--accent` in `css/styles.css` (light and dark values).
- **Add a new section:** add it to `sections`, add its data to `PORTFOLIO`, then add a matching `RENDERERS.<id>` function in `js/main.js`. The numbering, nav link and scroll highlighting are automatic.
