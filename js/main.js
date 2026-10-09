/*
 * main.js
 * Dominic Caulfield-Duverger
 * Oct 9, 2026
 *
 * Builds the page from the PORTFOLIO object in data.js and hooks up the
 * interactive stuff (theme toggle, project filters, etc).
 *
 * index.html just has empty placeholders (#nav, #hero, #content, #footer)
 * and this fills them in.
 *
 * Adding a new section:
 *   1. add it to PORTFOLIO.sections in data.js
 *   2. add whatever data it needs to PORTFOLIO
 *   3. add a function for it in RENDERERS below (same name as the id)
 * Nav link, numbering and scroll highlighting all happen on their own.
 */

// wrapped in a function so nothing ends up global
(() => {
  "use strict";


  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------

  // Escape anything from data.js before it goes into the HTML,
  // otherwise a stray < or & would break the page.
  const esc = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

  // map + join, since almost everything here is a list
  const list = (arr = [], fn) => arr.map(fn).join("");

  // "AI Screen Copilot" -> "ai-screen-copilot"
  const slug = (str) =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  // Shared wrapper for every section so they all get the same
  // numbered heading (01 About, 02 Projects...).
  const section = (id, label, inner, index) => `
    <section id="${id}" class="section reveal" aria-labelledby="${id}-title">
      <header class="section__head">
        <span class="section__num">${String(index + 1).padStart(2, "0")}</span>
        <h2 id="${id}-title" class="section__title">${esc(label)}</h2>
      </header>
      ${inner}
    </section>`;


  // ---------------------------------------------------------------
  // Section renderers
  // One per section id. Each gets the whole PORTFOLIO object and
  // returns the HTML for inside that section.
  // ---------------------------------------------------------------

  const RENDERERS = {

    // summary + the stat boxes
    about: ({ profile }) => `
      <p class="lead">${esc(profile.summary)}</p>
      <dl class="stats">
        ${list(profile.highlights, (h) => `
          <div class="stat">
            <dt class="stat__value">${esc(h.value)}</dt>
            <dd class="stat__label">${esc(h.label)}</dd>
          </div>`)}
      </dl>`,


    // filter buttons + project cards
    projects: ({ projects }) => {
      // "All" plus each category once
      const categories = ["All", ...new Set(projects.map((p) => p.category))];

      return `
        <div class="filters" role="toolbar" aria-label="Filter projects">
          ${list(categories, (c, i) => `
            <button class="chip${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}"
                    aria-pressed="${i === 0}">${esc(c)}</button>`)}
        </div>

        <div class="cards">
          ${list(projects, (p) => {
            // skip the Details button if there's nothing extra to show
            const hasMore = p.details.length || p.links.length;
            const id = `proj-${slug(p.name)}`;

            return `
            <article class="card" data-category="${esc(p.category)}">
              <div class="card__meta">
                <span>${esc(p.category)}</span>
                <span class="badge">${esc(p.status)}</span>
              </div>

              <h3 class="card__title">${esc(p.name)}</h3>
              <p class="card__desc">${esc(p.description)}</p>
              <ul class="tags">${list(p.stack, (s) => `<li>${esc(s)}</li>`)}</ul>

              ${hasMore ? `
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


    // timeline, then the "other experience" list if there is one
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


    skills: ({ skills }) => `
      <div class="skills">
        ${list(skills, (g) => `
          <div class="skill-group">
            <h3 class="label">${esc(g.group)}</h3>
            <ul class="tags tags--lg">${list(g.items, (i) => `<li>${esc(i)}</li>`)}</ul>
          </div>`)}
      </div>`,


    // degrees on the left, certs on the right
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


    // email as plain text (no mailto) with a copy button
    contact: ({ profile }) => `
      <p class="lead">Open to IT, support, and software opportunities. The best way to reach me is by email.</p>
      <div class="contact">
        <span class="contact__email">${esc(profile.email)}</span>
        <button class="btn" data-copy="${esc(profile.email)}">Copy email</button>
      </div>`,
  };


  // ---------------------------------------------------------------
  // Build the page
  // ---------------------------------------------------------------

  const data = PORTFOLIO;

  // only sections that are turned on and actually have a renderer
  // (so a typo in an id just skips it instead of breaking everything)
  const sections = data.sections.filter((s) => s.enabled && RENDERERS[s.id]);

  // "Dominic Caulfield-Duverger" -> "DC"
  const initials = data.profile.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  document.getElementById("nav").innerHTML = `
    <a class="nav__mark" href="#top" aria-label="Back to top">${esc(initials)}</a>
    <ul class="nav__links">
      ${list(sections, (s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)}
    </ul>
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
      <span aria-hidden="true">◐</span>
    </button>`;

  document.getElementById("hero").innerHTML = `
    <p class="hero__eyebrow">${esc(data.profile.title)}${data.profile.location ? ` · ${esc(data.profile.location)}` : ""}</p>
    <h1 class="hero__name">${esc(data.profile.name)}</h1>
    <p class="hero__tagline">${esc(data.profile.tagline)}</p>`;

  document.getElementById("content").innerHTML = list(sections, (s, i) =>
    section(s.id, s.label, RENDERERS[s.id](data), i));

  // year updates on its own
  document.getElementById("footer").innerHTML = `
    <p>© ${new Date().getFullYear()} ${esc(data.profile.name)}</p>`;

  document.title = `${data.profile.name} · Portfolio`;


  // ---------------------------------------------------------------
  // Interactivity
  // (has to run after the HTML above is on the page)
  // ---------------------------------------------------------------

  // Theme toggle.
  // CSS follows the OS light/dark setting by default. Clicking the button
  // sets data-theme on <html> to override it, and saves the choice.
  // localStorage can throw in private mode, hence the try/catch.
  const root = document.documentElement;

  const storedTheme = (() => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  })();
  if (storedTheme) root.dataset.theme = storedTheme;

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;

    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* ignore */ }
  });


  // Project filters - highlight the clicked button, hide cards from
  // other categories.
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      document.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", c === chip);
      });

      document.querySelectorAll(".card").forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.category !== filter;
      });
    });
  });


  // Details / Less buttons on the project cards.
  // The CSS rotates the + when aria-expanded is true.
  document.querySelectorAll(".toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", !open);
      btn.querySelector("span").textContent = open ? "Details" : "Less";
      panel.hidden = open;
    });
  });


  // Copy email button.
  // Note: clipboard only works over https or localhost, so it might fail
  // if you just double-click index.html. Fine once it's hosted.
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


  // Highlight the nav link for whatever section is in the middle of the
  // screen. The rootMargin narrows the watched area to a thin strip around
  // the center so only one section counts at a time.
  const navLinks = [...document.querySelectorAll(".nav__links a")];

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle("is-current", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll(".section").forEach((s) => spy.observe(s));


  // Fade sections in the first time they scroll into view.
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
