/* ==========================================================================
   main.js — renders the site from PORTFOLIO (data.js).
   --------------------------------------------------------------------------
   Structure:
     1. Helpers        — small DOM / escaping utilities
     2. RENDERERS      — one function per section id; each returns HTML
     3. Page assembly  — header, nav, sections, footer
     4. Behaviors      — theme toggle, project filter, expand/collapse,
                         scroll-spy, reveal-on-scroll

   Adding a section:
     a) add { id: "awards", label: "Awards", enabled: true } to
        PORTFOLIO.sections in data.js
     b) add the data it needs to PORTFOLIO
     c) add RENDERERS.awards = (data) => `...html...` below
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* 1. Helpers                                                          */
  /* ------------------------------------------------------------------ */

  // Escape user-provided strings before inserting into HTML.
  const esc = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

  // Map an array to HTML and join.
  const list = (arr = [], fn) => arr.map(fn).join("");

  // Short, stable slug for ids / data attributes.
  const slug = (str) => String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Standard section wrapper so every section looks consistent.
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
  /* ------------------------------------------------------------------ */

  const RENDERERS = {
    /* ---- About ---- */
    about: ({ profile }) => `
      <p class="lead">${esc(profile.summary)}</p>
      <dl class="stats">
        ${list(profile.highlights, (h) => `
          <div class="stat">
            <dt class="stat__value">${esc(h.value)}</dt>
            <dd class="stat__label">${esc(h.label)}</dd>
          </div>`)}
      </dl>`,

    /* ---- Projects (filterable, expandable cards) ---- */
    projects: ({ projects }) => {
      const categories = ["All", ...new Set(projects.map((p) => p.category))];
      return `
        <div class="filters" role="toolbar" aria-label="Filter projects">
          ${list(categories, (c, i) => `
            <button class="chip${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}"
                    aria-pressed="${i === 0}">${esc(c)}</button>`)}
        </div>
        <div class="cards">
          ${list(projects, (p) => {
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

    /* ---- Experience (timeline) ---- */
    experience: ({ experience, otherExperience }) => `
      <ol class="timeline">
        ${list(experience, (job) => `
          <li class="job">
            <div class="job__when">${esc(job.start)} – ${esc(job.end)}</div>
            <div class="job__body">
              <h3 class="job__role">${esc(job.role)}</h3>
              <p class="job__where">${esc(job.company)} · ${esc(job.location)}</p>
              <ul class="bullets">${list(job.points, (pt) => `<li>${esc(pt)}</li>`)}</ul>
            </div>
          </li>`)}
      </ol>
      ${otherExperience.length ? `
        <div class="other">
          <h3 class="label">Other experience</h3>
          <ul>${list(otherExperience, (o) => `<li>${esc(o)}</li>`)}</ul>
        </div>` : ""}`,

    /* ---- Skills ---- */
    skills: ({ skills }) => `
      <div class="skills">
        ${list(skills, (g) => `
          <div class="skill-group">
            <h3 class="label">${esc(g.group)}</h3>
            <ul class="tags tags--lg">${list(g.items, (i) => `<li>${esc(i)}</li>`)}</ul>
          </div>`)}
      </div>`,

    /* ---- Education & certifications ---- */
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

    /* ---- Contact (plain text, no links by request) ---- */
    contact: ({ profile }) => `
      <p class="lead">Open to IT, support, and software opportunities. The best way to reach me is by email.</p>
      <div class="contact">
        <span class="contact__email">${esc(profile.email)}</span>
        <button class="btn" data-copy="${esc(profile.email)}">Copy email</button>
      </div>`,
  };

  /* ------------------------------------------------------------------ */
  /* 3. Page assembly                                                    */
  /* ------------------------------------------------------------------ */

  const data = PORTFOLIO;
  const sections = data.sections.filter((s) => s.enabled && RENDERERS[s.id]);

  // Initials for the nav mark, e.g. "DC".
  const initials = data.profile.name.split(/[\s-]+/).slice(0, 2).map((w) => w[0]).join("");

  document.getElementById("nav").innerHTML = `
    <a class="nav__mark" href="#top" aria-label="Back to top">${esc(initials)}</a>
    <ul class="nav__links">
      ${list(sections, (s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)}
    </ul>
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
      <span aria-hidden="true">◐</span>
    </button>`;

  document.getElementById("hero").innerHTML = `
    <p class="hero__eyebrow">${esc(data.profile.title)} · ${esc(data.profile.location)}</p>
    <h1 class="hero__name">${esc(data.profile.name)}</h1>
    <p class="hero__tagline">${esc(data.profile.tagline)}</p>`;

  document.getElementById("content").innerHTML = list(sections, (s, i) =>
    section(s.id, s.label, RENDERERS[s.id](data), i));

  document.getElementById("footer").innerHTML = `
    <p>© ${new Date().getFullYear()} ${esc(data.profile.name)}</p>
    <p class="muted">Built with plain HTML, CSS & JavaScript</p>`;

  document.title = `${data.profile.name} · Portfolio`;

  /* ------------------------------------------------------------------ */
  /* 4. Behaviors                                                        */
  /* ------------------------------------------------------------------ */

  // Theme: respects OS preference, remembers the visitor's choice.
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (storedTheme) root.dataset.theme = storedTheme;
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* storage blocked */ }
  });

  // Project filter chips.
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

  // Expand / collapse project details.
  document.querySelectorAll(".toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !open);
      btn.querySelector("span").textContent = open ? "Details" : "Less";
      panel.hidden = open;
    });
  });

  // Copy-to-clipboard buttons (e.g. email).
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

  // Scroll-spy: highlight the nav link for the section in view.
  const navLinks = [...document.querySelectorAll(".nav__links a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".section").forEach((s) => spy.observe(s));

  // Fade sections in as they enter the viewport.
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); reveal.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
})();
