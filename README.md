# Portfolio site

Dominic Caulfield-Duverger, Oct 9, 2026

## Files

- `index.html` - page shell
- `js/data.js` - all the content
- `js/main.js` - builds the page from data.js
- `css/styles.css` - styling
- `CHANGELOG.md` - update log

## Notes

- New project: copy one of the entries in `projects`. New categories get a filter button automatically.
- Public repos load from GitHub on their own (settings in `github` in data.js)
- To attach a repo to a project, add `repo: "repo-name"` to it. It moves from the Public repos subsection into that project's Details
- GitHub/LinkedIn links are in `profile.socials`. Leave a url empty to hide it
- New job goes at the top of `experience`
- Hide a section with `enabled: false` in `sections`, or move lines around to reorder
- New section: add it to `sections`, add its data, then add a function with the same name to `RENDERERS` in main.js
