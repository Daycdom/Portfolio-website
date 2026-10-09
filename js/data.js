/* ==========================================================================
   data.js — ALL site content lives here.
   --------------------------------------------------------------------------
   To update the site, edit this file only. main.js reads PORTFOLIO and
   renders every section automatically.

   Common edits:
     • New job        → add an object to `experience` (newest first)
     • New project    → add an object to `projects`
     • Repo goes public → add { label, url } to that project's `links` array
     • New skill group → add an object to `skills`
     • New section    → add an entry to `sections` and a renderer in main.js
   ========================================================================== */

const PORTFOLIO = {
  /* ---- Identity / header ------------------------------------------------ */
  profile: {
    name: "Dominic Caulfield-Duverger",
    title: "IT & Software Professional",
    // location: "City, ST",   // optional; shown in the hero when set
    email: "dominic.cauduverger@gmail.com",
    // Short line shown under the name in the hero.
    tagline:
      "Configuring, networking, and troubleshooting systems at scale, and building software on the side.",
    summary:
      "Entry-level IT and software professional with hands-on experience in device configuration, networking, and troubleshooting. Background in computer science with programming experience in Python, C++, and Java. Adept at leading technical projects, training others, and delivering results under deadline.",
    // Quick facts shown as a small grid in the About section.
    highlights: [
      { value: "25+", label: "Custom PCs built" },
      { value: "A.S.", label: "Computer Science" },
      { value: "8", label: "Programming languages" },
      { value: "Lead", label: "Configuration Technician" },
    ],
  },

  /* ---- Navigation / section order --------------------------------------
     `id` must match a key in RENDERERS (main.js).
     Reorder, hide (enabled: false), or add sections here.               */
  sections: [
    { id: "about", label: "About", enabled: true },
    { id: "projects", label: "Projects", enabled: true },
    { id: "experience", label: "Experience", enabled: true },
    { id: "skills", label: "Skills", enabled: true },
    { id: "education", label: "Education", enabled: true },
    { id: "contact", label: "Contact", enabled: true },
  ],

  /* ---- Projects ---------------------------------------------------------
     status:  free text badge, e.g. "In development", "Complete"
     links:   [] for now (repos are private). Example for later:
              links: [{ label: "GitHub", url: "https://github.com/..." }]   */
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

  /* ---- Experience (newest first) --------------------------------------- */
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
  // One-line extras shown beneath the timeline. Set to [] to hide.
  otherExperience: [
    "Seasonal Production / Warehousing, Flower Window Boxes (Jun–Jul 2025)",
    "Delivery Driver, DoorDash (2020–2025)",
  ],

  /* ---- Skills ----------------------------------------------------------- */
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

  /* ---- Education & certifications -------------------------------------- */
  education: [
    {
      degree: "Associate of Science in Computer Science",
      school: "Southern New Hampshire University",
      date: "Jun 2024",
    },
  ],
  certifications: [
    { name: "CompTIA A+", status: "In progress" },
    { name: "OSHA 10", status: "2018" },
  ],
};
