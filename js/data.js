/*
 * data.js
 * Dominic Caulfield-Duverger
 * Oct 9, 2026
 *
 * All the text on the site lives in here. main.js reads PORTFOLIO and
 * builds the page from it, so most updates should only touch this file.
 *
 * To add a job/project/skill, copy an existing entry and edit it.
 * To add a whole new section, see the note at the top of main.js.
 */

const PORTFOLIO = {

  // ---- Profile ----
  // Used in the header, About, Contact and the nav initials.
  profile: {
    name: "Dominic Caulfield-Duverger",
    title: "IT & Software Professional",

    // location: "City, ST",   // uncomment to show it next to the title

    email: "dominic.cauduverger@gmail.com",

    // shown under the tagline and in Contact. empty url = hidden
    socials: [
      { label: "GitHub",   url: "https://github.com/Daycdom" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dominic-caulfield-duverger-44265a18a" },
    ],

    tagline:
      "Configuring, networking, and troubleshooting systems at scale, and building software on the side.",

    summary:
      "Entry-level IT and software professional with hands-on experience in device configuration, " +
      "networking, and troubleshooting. Background in computer science with programming experience " +
      "in Python, C++, and Java. Adept at leading technical projects, training others, and delivering " +
      "results under deadline.",

    // the stat boxes in About (4 fits on one row)
    highlights: [
      { value: "25+",  label: "Custom PCs built" },
      { value: "A.S.", label: "Computer Science" },
      { value: "8",    label: "Programming languages" },
      { value: "Lead", label: "Configuration Technician" },
    ],
  },


  // ---- Sections ----
  // Order here = order on the page and in the nav.
  // id has to match a renderer in main.js. Set enabled: false to hide one.
  sections: [
    { id: "about",      label: "About",      enabled: true },
    { id: "projects",   label: "Projects",   enabled: true },
    { id: "repos",      label: "Public repos", enabled: true },
    { id: "experience", label: "Experience", enabled: true },
    { id: "skills",     label: "Skills",     enabled: true },
    { id: "education",  label: "Education",  enabled: true },
    { id: "contact",    label: "Contact",    enabled: true },
  ],


  // ---- GitHub ----
  // The "Public repos" section pulls these live from GitHub's API,
  // so a new public repo shows up on its own. Private ones never do.
  github: {
    user: "Daycdom",
    hideForks: true,
    exclude: [],   // repo names to leave out, e.g. ["old-test-repo"]
  },


  // ---- Projects ----
  // Each one is a card. A new category automatically gets a filter button.
  // details only show when you click "Details" on the card.
  // links is for anything extra, e.g. [{ label: "Demo", url: "https://..." }]
  //
  // Once a project's repo is public, add its repo name:
  //   repo: "Portfolio-website",
  // That puts a GitHub link in the card's Details and takes the repo out
  // of the Public repos section so it isn't listed twice.
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
      // repo: "",
    },

    {
      name: "Portfolio Website",
      category: "Software",
      status: "Live",
      stack: ["HTML", "CSS", "JavaScript", "Caddy", "Tailscale"],
      description:
        "This site. Hand-written, data-driven, and self-hosted on my home server.",
      details: [
        "All content lives in one data file, so the page is built from it instead of hand-edited HTML.",
        "Public repos load live from the GitHub API and can be attached to project cards.",
        "Served from a Debian container at home, routed over Tailscale to a VPS that handles the domain and HTTPS.",
      ],
      links: [],
      repo: "Portfolio-website",
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
      // repo: "",
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
      // repo: "",
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
      // repo: "",
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
      // repo: "",
    },
  ],


  // ---- Experience ----
  // Newest first. location is optional.
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

  // smaller stuff listed under the timeline ([] hides it)
  otherExperience: [
    "Seasonal Production / Warehousing, Flower Window Boxes (Jun–Jul 2025)",
    "Delivery Driver, DoorDash (2020–2025)",
  ],


  // ---- Skills ----
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


  // ---- Education / certs ----
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
