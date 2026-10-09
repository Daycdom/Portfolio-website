/* ==========================================================================
   main.js — renders the site from PORTFOLIO (data.js).

   Author:  Dominic Caulfield-Duverger
   Date:    October 9, 2026
   --------------------------------------------------------------------------

   How the page works:
     index.html is an empty shell with a few placeholder elements
     (#nav, #hero, #content, #footer). This script reads the PORTFOLIO
     object defined in data.js, builds HTML strings for each part of the
     page, and injects them into those placeholders. After that it wires
     up the interactive bits (theme toggle, filters, etc.).

   Structure of this file:
     1. Helpers        — small DOM / escaping utilities
     2. RENDERERS      — one function per section id; each returns HTML
     3. Page assembly  — header, nav, sections, footer
     4. Behaviors      — theme toggle, project filter, expand/collapse,
                         copy email, scroll-spy, reveal-on-scroll

   Adding a section:
     a) add { id: "awards", label: "Awards", enabled: true } to
        PORTFOLIO.sections in data.js
     b) add the data it needs to PORTFOLIO
     c) add RENDERERS.awards = (data) => `...html...` below
     The nav link, section number and scroll highlighting are automatic.
   ========================================================================== */

// Everything is wrapped in an IIFE (immediately invoked function) so none of
// these variables leak into the global scope. "use strict" turns common
// silent mistakes (like assigning to an undeclared variable) into errors.
(() => {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* 1. Helpers                                                          */
  /* ------------------------------------------------------------------ */

  // Escape text before inserting it into HTML. Without this, a character
  // like "<" or "&" in data.js could break the markup (or inject HTML).
  // Every value that comes from data.js goes through esc().
  const esc = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

  // Run a function over every item in an array and join the resulting
  // HTML strings together. Used everywhere a list is rendered.
  // Example: list(["a", "b"], (x) => `<li>${x}</li>`)  →  "<li>a</li><li>b</li>"
  const list = (arr = [], fn) => arr.map(fn).join("");

  // Turn any text into a URL/id-safe "slug".
  // Example: "AI Screen Copilot" → "ai-screen-copilot"
  const slug = (str) =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // any run of non-alphanumerics becomes one dash
      .replace(/(^-|-$)/g, "");    // trim dashes from the start and end

  // Standard wrapper used by every section, so they all share the same
  // numbered heading ("01 About", "02 Projects", ...) and markup.
  //   id     — section id, also used as the anchor for nav links (#about)
  //   label  — heading text
  //   inner  — the HTML returned by that section's renderer
  //   index  — position in the page, used for the "01", "02" number
  const section = (id, label, inner, index) => `
    <section id="${id}" class="section reveal" aria-labelledby="${id}-title">
      <header class="section__head">
        <span class="section__num">${String(index + 1).padStart(2, "0")}</span>
        <h2 id="${id}-title" class="section__title">${esc(label)}</h2>
      </header>
      ${inner}
    </section>`;

  /* ------------------------------------------------------------------ */
  /* 2. Section renderers                                                */
  /*    Each receives the full PORTFOLIO object and returns inner HTML.  */
  /*    The key (e.g. "about") must match an id in PORTFOLIO.sections.   */
  /* ------------------------------------------------------------------ */

  const RENDERERS = {
    /* ---- About ----
       Summary paragraph plus a row of quick-stat tiles
       (from profile.highlights). Uses a <dl> because each tile is a
       value/label pair. */
    about: ({ profile }) => `
      <p class="lead">${esc(profile.summary)}</p>
      <dl class="stats">
        ${list(profile.highlights, (h) => `
          <div class="stat">
            <dt class="stat__value">${esc(h.value)}</dt>
            <dd class="stat__label">${esc(h.label)}</dd>
          </div>`)}
      </dl>`,

    /* ---- Projects ----
       Filter chips across the top, then a grid of cards.
       - Chips are built from the unique project categories, so a new
         category in data.js automatically gets its own chip.
       - Each card can expand to show `details` and `links`. If a project
         has neither, no "Details" button is rendered. */
    projects: ({ projects }) => {
      // "All" first, then each category once (Set removes duplicates).
      const categories = ["All", ...new Set(projects.map((p) => p.category))];

      return `
        <div class="filters" role="toolbar" aria-label="Filter projects">
          ${list(categories, (c, i) => `
            <button class="chip${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}"
                    aria-pressed="${i === 0}">${esc(c)}</button>`)}
        </div>
        <div class="cards">
          ${list(projects, (p) => {
            // Only show the expand button when there's something to expand.
            const hasMore = p.details.length || p.links.length;
            // Unique id so the button can point at its panel (aria-controls).
            const id = `proj-${slug(p.name)}`;

            return `
            <article class="card" data-category="${esc(p.category)}">
              <!-- Top row: category on the left, status badge on the right -->
              <div class="card__meta">
                <span>${esc(p.category)}</span>
                <span class="badge">${esc(p.status)}</span>
              </div>
              <h3 class="card__title">${esc(p.name)}</h3>
              <p class="card__desc">${esc(p.description)}</p>
              <ul class="tags">${list(p.stack, (s) => `<li>${esc(s)}</li>`)}</ul>
              ${hasMore ? `
                <!-- Hidden until the Details button is clicked -->
                <div class="card__more" id="${id}" hidden>
                  ${p.details.length ? `<ul class="bullets">${list(p.details, (d) => `<li>${esc(d)}</li>`)}</ul>` : ""}
                  ${p.links.length ? `<div class="card__links">${list(p.links, (l) =>
                    `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)}</div>` : ""}
                </div>
                <button class="toggle" aria-expanded="false" aria-controls="${id}">
                  <span>Details</span><span class="toggle__icon" aria-hidden="true">+</span>
                </button>` : ""}
            </article>`;
          })}
        </div>`;
    },

    /* ---- Experience ----
       A timeline: dates in the left column, role/company/bullets on the
       right. Location is optional; it only shows if set in data.js.
       `otherExperience` renders as a short list underneath, and is skipped
       entirely if the array is empty. */
    experience: ({ experience, otherExperience }) => `
      <ol class="timeline">
        ${list(experience, (job) => `
          <li class="job">
            <div class="job__when">${esc(job.start)} – ${esc(job.end)}</div>
            <div class="job__body">
              <h3 class="job__role">${esc(job.role)}</h3>
              <p class="job__where">${esc(job.company)}${job.location ? ` · ${esc(job.location)}` : ""}</p>
              <ul class="bullets">${list(job.points, (pt) => `<li>${esc(pt)}</li>`)}</ul>
            </div>
          </li>`)}
      </ol>
      ${otherExperience.length ? `
        <div class="other">
          <h3 class="label">Other experience</h3>
          <ul>${list(otherExperience, (o) => `<li>${esc(o)}</li>`)}</ul>
        </div>` : ""}`,

    /* ---- Skills ----
       One block per skill group, each a wrap of tag "pills". */
    skills: ({ skills }) => `
      <div class="skills">
        ${list(skills, (g) => `
          <div class="skill-group">
            <h3 class="label">${esc(g.group)}</h3>
            <ul class="tags tags--lg">${list(g.items, (i) => `<li>${esc(i)}</li>`)}</ul>
          </div>`)}
      </div>`,

    /* ---- Education & certifications ----
       Two columns: degrees on the left, certifications on the right. */
    education: ({ education, certifications }) => `
      <div class="edu">
        <div>
          <h3 class="label">Education</h3>
          ${list(education, (e) => `
            <div class="edu__item">
              <p class="edu__title">${esc(e.degree)}</p>
              <p class="muted">${esc(e.school)} · ${esc(e.date)}</p>
            </div>`)}
        </div>
        <div>
          <h3 class="label">Certifications</h3>
          <ul class="certs">
            ${list(certifications, (c) => `
              <li><span>${esc(c.name)}</span><span class="muted">${esc(c.status)}</span></li>`)}
          </ul>
        </div>
      </div>`,

    /* ---- Contact ----
       Email shown as plain text (no mailto link, by request) with a
       button that copies it to the clipboard. The copy behavior is wired
       up in section 4 via the data-copy attribute. */
    contact: ({ profile }) => `
      <p class="lead">Open to IT, support, and software opportunities. The best way to reach me is by email.</p>
      <div class="contact">
        <span class="contact__email">${esc(profile.email)}</span>
        <button class="btn" data-copy="${esc(profile.email)}">Copy email</button>
      </div>`,
  };

  /* ------------------------------------------------------------------ */
  /* 3. Page assembly                                                    */
  /*    Build each part of the page and inject it into index.html.       */
  /* ------------------------------------------------------------------ */

  const data = PORTFOLIO; // defined globally in data.js (loaded first)

  // Keep only sections that are switched on AND have a renderer.
  // A typo in a section id simply skips that section instead of crashing.
  const sections = data.sections.filter((s) => s.enabled && RENDERERS[s.id]);

  // Initials for the logo mark in the nav, e.g. "Dominic Caulfield-Duverger" → "DC".
  // Splits on spaces and hyphens and takes the first letter of the first two parts.
  const initials = data.profile.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  // Nav bar: logo (links back to top), one link per enabled section,
  // and the light/dark toggle button.
  document.getElementById("nav").innerHTML = `
    <a class="nav__mark" href="#top" aria-label="Back to top">${esc(initials)}</a>
    <ul class="nav__links">
      ${list(sections, (s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)}
    </ul>
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
      <span aria-hidden="true">◐</span>
    </button>`;

  // Hero: small title line (location appended only if set), big name, tagline.
  document.getElementById("hero").innerHTML = `
    <p class="hero__eyebrow">${esc(data.profile.title)}${data.profile.location ? ` · ${esc(data.profile.location)}` : ""}</p>
    <h1 class="hero__name">${esc(data.profile.name)}</h1>
    <p class="hero__tagline">${esc(data.profile.tagline)}</p>`;

  // Main content: run each enabled section's renderer, wrap it with the
  // standard section() markup, and join them all in order.
  document.getElementById("content").innerHTML = list(sections, (s, i) =>
    section(s.id, s.label, RENDERERS[s.id](data), i));

  // Footer: copyright with the current year (updates automatically).
  document.getElementById("footer").innerHTML = `
    <p>© ${new Date().getFullYear()} ${esc(data.profile.name)}</p>`;

  // Browser tab title.
  document.title = `${data.profile.name} · Portfolio`;

  /* ------------------------------------------------------------------ */
  /* 4. Behaviors                                                        */
  /*    Everything below runs after the HTML above has been injected,    */
  /*    so the elements it looks up already exist.                       */
  /* ------------------------------------------------------------------ */

  // ---- Theme toggle ----
  // By default the CSS follows the visitor's OS setting (light or dark).
  // Clicking the toggle sets data-theme="light" or "dark" on <html>, which
  // overrides that, and the choice is saved in localStorage so it sticks
  // on the next visit. localStorage can throw in private browsing or when
  // storage is blocked, so every access is wrapped in try/catch.
  const root = document.documentElement;
  const storedTheme = (() => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  })();
  if (storedTheme) root.dataset.theme = storedTheme;

  document.getElementById("theme-toggle").addEventListener("click", () => {
    // Work out what's currently showing: an explicit choice if there is
    // one, otherwise whatever the OS prefers.
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark"; // flip it
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* storage blocked */ }
  });

  // ---- Project filter chips ----
  // Clicking a chip marks it active and hides any card whose category
  // doesn't match. "All" shows every card.
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      // Update which chip looks selected (and tell screen readers).
      document.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", c === chip);
      });

      // Show/hide cards using the data-category attribute set in the renderer.
      document.querySelectorAll(".card").forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.category !== filter;
      });
    });
  });

  // ---- Expand / collapse project details ----
  // Each "Details" button points at its hidden panel via aria-controls.
  // aria-expanded tracks the state; the CSS uses it to rotate the "+" icon.
  document.querySelectorAll(".toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !open);
      btn.querySelector("span").textContent = open ? "Details" : "Less";
      panel.hidden = open;
    });
  });

  // ---- Copy-to-clipboard buttons ----
  // Any element with a data-copy attribute copies that value when clicked.
  // The button briefly shows "Copied" (or "Copy failed"), then resets.
  // Note: the Clipboard API needs a secure context (https or localhost);
  // when opening index.html straight from disk some browsers may refuse.
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Copy failed";
      }
      setTimeout(() => (btn.textContent = "Copy email"), 1600);
    });
  });

  // ---- Scroll-spy ----
  // Highlights the nav link for whichever section is in the middle of the
  // screen. The rootMargin shrinks the "viewport" the observer watches to a
  // thin band around the vertical center, so only one section counts as
  // visible at a time.
  const navLinks = [...document.querySelectorAll(".nav__links a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle("is-current", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".section").forEach((s) => spy.observe(s));

  // ---- Reveal on scroll ----
  // Sections start slightly faded/offset (.reveal in the CSS) and get
  // .is-visible once ~8% of them is on screen, which animates them in.
  // Each section is only revealed once, then no longer observed.
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
})();
