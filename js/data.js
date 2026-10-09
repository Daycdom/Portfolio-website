/* ==========================================================================
   data.js — ALL site content lives here.

   Author:  Dominic Caulfield-Duverger
   Date:    October 9, 2026
   --------------------------------------------------------------------------

   To update the site, edit this file only. main.js reads the PORTFOLIO
   object below and renders every section from it automatically.

   Common edits:
     • New job           → add an object to `experience` (newest first)
     • New project       → add an object to `projects`
     • Repo goes public  → add { label, url } to that project's `links`
     • New skill group   → add an object to `skills`
     • New section       → add an entry to `sections` and a renderer in main.js

   Tip: every list item ends with a comma, so you can copy a whole block
   (from its opening { to its closing },) and paste it as a new entry.
   ========================================================================== */

const PORTFOLIO = {

  /* ------------------------------------------------------------------------
     PROFILE
     Your name, headline and summary. Shown in the hero (top of the page),
     the About section, the nav initials and the Contact section.
     ------------------------------------------------------------------------ */
  profile: {
    name: "Dominic Caulfield-Duverger",
    title: "IT & Software Professional",

    // Optional. Uncomment to show a location next to your title in the hero.
    // location: "City, ST",

    // Shown as plain text in the Contact section, with a "Copy email" button.
    email: "dominic.cauduverger@gmail.com",

    // One-line pitch shown under your name at the top of the page.
    tagline:
      "Configuring, networking, and troubleshooting systems at scale, and building software on the side.",

    // Paragraph shown at the start of the About section.
    summary:
      "Entry-level IT and software professional with hands-on experience in device configuration, " +
      "networking, and troubleshooting. Background in computer science with programming experience " +
      "in Python, C++, and Java. Adept at leading technical projects, training others, and delivering " +
      "results under deadline.",

    // Quick-fact tiles in the About section. Four fit nicely on one row.
    highlights: [
      { value: "25+",  label: "Custom PCs built" },
      { value: "A.S.", label: "Computer Science" },
      { value: "8",    label: "Programming languages" },
      { value: "Lead", label: "Configuration Technician" },
    ],
  },


  /* ------------------------------------------------------------------------
     SECTIONS
     Controls which sections appear and in what order (also the nav links).
       id       must match a renderer name in main.js (RENDERERS)
       label    text used in the nav and the section heading
       enabled  set to false to hide a section without deleting its data
     ------------------------------------------------------------------------ */
  sections: [
    { id: "about",      label: "About",      enabled: true },
    { id: "projects",   label: "Projects",   enabled: true },
    { id: "experience", label: "Experience", enabled: true },
    { id: "skills",     label: "Skills",     enabled: true },
    { id: "education",  label: "Education",  enabled: true },
    { id: "contact",    label: "Contact",    enabled: true },
  ],


  /* ------------------------------------------------------------------------
     PROJECTS
     Each project becomes a card in the Projects section.
       name         card title
       category     used for the filter chips (a new category = a new chip)
       status       small badge, e.g. "In development", "Complete"
       stack        tech tags shown on the card
       description  one or two sentences, always visible
       details      extra bullet points, shown when "Details" is clicked
       links        [] for now (repos are private). When one goes public:
                    links: [{ label: "GitHub", url: "https://github.com/..." }]
     ------------------------------------------------------------------------ */
  projects: [
    {
      name: "AI Screen Copilot",
      category: "Software",
      status: "In development",
      stack: ["Python", "OCR", "API Integration", "LLMs"],
      description:
        "Privacy-focused AI desktop assistant that reads what's on screen and helps in real time.",
      details: [
        "Uses OCR to capture screen content for real-time Q&A, summarization, and coding help.",
        "Supports self-hosted LLM deployment or user-supplied API keys for full data control.",
        "ML-based PII redaction layer in development to censor sensitive data before any external API call.",
      ],
      links: [],
    },

    {
      name: "2D Farming & Town-Builder RPG",
      category: "Game Dev",
      status: "In development",
      stack: ["C++", "Godot Engine", "Pixel Art"],
      description:
        "Pixel-art farming and town-building RPG built in Godot with C++.",
      details: [
        "Manages game state, entity systems, and rendering across multiple subsystems.",
      ],
      links: [],
    },

    {
      name: "Home Network",
      category: "Infrastructure",
      status: "Lab",
      stack: ["Subnetting", "Firewalls", "VPN"],
      description:
        "Designed a multi-device home network with custom subnetting, firewall rules, and VPN access.",
      details: [],
      links: [],
    },

    {
      name: "Game Server Hosting",
      category: "Infrastructure",
      status: "Lab",
      stack: ["Linux", "Port Forwarding", "Monitoring"],
      description:
        "Administered dedicated game servers with port forwarding, firewall configuration, and performance monitoring.",
      details: [],
      links: [],
    },

    {
      name: "PC Builds",
      category: "Hardware",
      status: "25+ systems",
      stack: ["Hardware", "OS Setup", "Troubleshooting"],
      description:
        "Assembled and configured 25+ custom systems, from component selection through OS setup and troubleshooting.",
      details: [],
      links: [],
    },
  ],


  /* ------------------------------------------------------------------------
     EXPERIENCE
     Shown as a timeline, in the order listed here (put the newest first).
       location  optional; leave it out to show just the company name
       points    bullet points under the role
     ------------------------------------------------------------------------ */
  experience: [
    {
      role: "Lead Configuration Technician",
      company: "EbryIT, Inc.",
      location: "Kennesaw, GA",
      start: "Jul 2025",
      end: "Present",
      points: [
        "Lead multi-tech configuration projects, coordinating task assignments and ensuring on-time delivery against client deadlines.",
        "Train and mentor junior technicians on imaging workflows, BIOS configuration, device enrollment, and troubleshooting procedures.",
        "Configure, image, and deploy laptops and desktops for enterprise clients at scale.",
        "Troubleshoot software, hardware, and network connectivity issues; serve as escalation point for complex problems.",
        "Track IT assets and maintain inventory accuracy across concurrent projects.",
      ],
    },

    {
      role: "Sales Associate",
      company: "Best Buy",
      location: "Dartmouth, MA",
      start: "Oct 2020",
      end: "Feb 2021",
      points: [
        "Advised customers on consumer electronics and technology products.",
        "Supported inventory management for tech equipment in a high-volume retail setting.",
      ],
    },
  ],

  // Short one-line extras shown under the timeline. Set to [] to hide them.
  otherExperience: [
    "Seasonal Production / Warehousing, Flower Window Boxes (Jun–Jul 2025)",
    "Delivery Driver, DoorDash (2020–2025)",
  ],


  /* ------------------------------------------------------------------------
     SKILLS
     One block per group; each item becomes a small tag.
     ------------------------------------------------------------------------ */
  skills: [
    {
      group: "Languages",
      items: ["Python", "C++", "Java", "C", "C#", "JavaScript", "HTML", "SQL"],
    },
    {
      group: "Networking & Security",
      items: ["TCP/IP", "DHCP", "DNS", "VPN", "Firewalls", "System Hardening"],
    },
    {
      group: "Systems & Tools",
      items: ["Windows 10/11", "Linux", "BIOS/OS Imaging", "Microsoft 365", "Active Directory"],
    },
    {
      group: "Hardware",
      items: ["PC Builds", "Server Setup", "Device Configuration", "Device Enrollment"],
    },
  ],


  /* ------------------------------------------------------------------------
     EDUCATION & CERTIFICATIONS
     Rendered side by side in the Education section.
     ------------------------------------------------------------------------ */
  education: [
    {
      degree: "Associate of Science in Computer Science",
      school: "Southern New Hampshire University",
      date: "Jun 2024",
    },
  ],

  certifications: [
    { name: "CompTIA A+", status: "In progress" },
    { name: "OSHA 10",    status: "2018" },
  ],
};
