# Portfolio site

Dominic Caulfield-Duverger, Oct 9, 2026

My portfolio. Plain HTML/CSS/JS, nothing to build or install.

## Running it

- Open `index.html` in a browser, or
- Reopen the folder in the dev container, run `npm start`, go to http://localhost:3000
- Live Server works too (right-click `index.html` > Open with Live Server), reloads on save

## Files

- `index.html` - page shell, barely needs touching
- `js/data.js` - all the content. Most edits happen here
- `js/main.js` - builds the page from data.js + the interactive stuff
- `css/styles.css` - styling, colors/fonts are variables at the top

## Notes for later

- New project: copy one of the entries in `projects`. New categories get a filter button automatically.
- When a repo goes public, add it to that project's `links`, e.g. `[{ label: "GitHub", url: "..." }]`
- New job goes at the top of `experience`
- Hide a section with `enabled: false` in `sections`, or move lines around to reorder
- Accent color is `--accent` in styles.css (there's a light and dark value)
- New section: add it to `sections`, add its data, then add a function with the same name to `RENDERERS` in main.js
