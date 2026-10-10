# Portfolio Website

My personal portfolio site, live at [dominiccaulfield-duverger.dev](https://dominiccaulfield-duverger.dev). Plain HTML, CSS, and JavaScript, with all of the content kept in one data file, so updating the site is mostly editing text.

See [CHANGELOG.md](./CHANGELOG.md) for a dated history of changes to the site.

## What's included

- **`index.html`:** the page shell. Just empty placeholders (`#nav`, `#hero`, `#content`, `#footer`) that get filled in by `main.js`
- **`js/data.js`:** every piece of text on the site (profile, projects, experience, skills, education, links), in one `PORTFOLIO` object
- **`js/main.js`:** builds the page from `data.js`, then hooks up the interactive parts: light/dark toggle, project filters, collapsible sections, copy-email button, scroll highlighting in the nav
- **`css/styles.css`:** all styling, with colors and spacing as variables at the top. Follows the OS light/dark setting unless the toggle overrides it
- **Public repos:** pulled live from the GitHub API on page load, so a new public repo shows up without editing anything. Private repos never appear
- **`.devcontainer/`:** copied from my devcontainer template, for working on the site in Cursor

## How the page gets built

1. `data.js` loads first and defines `PORTFOLIO`
2. `main.js` reads `PORTFOLIO.sections` and, for each enabled section, calls the function with the same name in `RENDERERS`
3. Each renderer returns that section's HTML, which gets wrapped in a numbered, collapsible heading and dropped into `#content`
4. The nav is built from the same list, so adding or reordering a section updates the nav on its own
5. After the page is on screen, `loadRepos()` asks GitHub for the public repos and fills in the "Public repos on GitHub" subsection under Projects. If GitHub doesn't answer, that subsection is removed

## Updating the content

All of these are edits to `js/data.js`:

- **New project:** copy an existing entry in `projects`. A new `category` gets its own filter button automatically
- **Attach a repo to a project:** add `repo: "repo-name"`. The repo's card shows up in that project's Details instead of under Public repos. While the repo is private, the card says so instead of linking to a 404
- **Hide repos:** list names in `github.exclude`, or prefixes in `github.excludePrefixes` (currently `"CS"` for coursework)
- **Sub-cards:** give a project `parts: [...]` (each with `name`, `description`, `stack`, `details`). They show inside its Details and are listed on the closed card
- **New job:** add it to the top of `experience`
- **Social links:** edit `profile.socials`. An entry with an empty `url` is hidden
- **Hide, reorder or collapse a section:** in `sections`, set `enabled: false`, move the line, or add `collapsed: true`
- **New section type:** add it to `sections`, add its data, then add a function with the same id to `RENDERERS` in `main.js`

Log each technical change with the date in `CHANGELOG.md`.

## Working on it locally

1. Open the folder in Cursor and run **"Dev Containers: Reopen in Container"** (`Ctrl+Shift+P`)
2. Run `npm start` and open `http://localhost:3000`
3. Commit and push to `main`

## Hosting

The site is served by Caddy from a Debian container on my home server. A VPS handles the domain and HTTPS and reaches the container over Tailscale, so nothing on the home network is exposed directly.

To publish an update after pushing, run this on the server container:

```bash
cd /var/www/portfolio && git pull
```

Nothing needs restarting.
