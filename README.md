# Portfolio site

Dominic Caulfield-Duverger, Oct 9, 2026

## Files

- `index.html` - page shell
- `js/data.js` - all the content
- `js/main.js` - builds the page from data.js
- `css/styles.css` - styling

## Notes

- New project: copy one of the entries in `projects`. New categories get a filter button automatically.
- When a repo goes public, add it to that project's `links`, e.g. `[{ label: "GitHub", url: "..." }]`
- New job goes at the top of `experience`
- Hide a section with `enabled: false` in `sections`, or move lines around to reorder
- New section: add it to `sections`, add its data, then add a function with the same name to `RENDERERS` in main.js
