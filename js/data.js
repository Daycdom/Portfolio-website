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
    title: "IT Technician & Software Developer",

    // location: "City, ST",   // uncomment to show it next to the title

    email: "dominic.cauduverger@gmail.com",

    // shown under the tagline and in Contact. empty url = hidden
    socials: [
      { label: "GitHub",   url: "https://github.com/Daycdom" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dominic-caulfield-duverger-44265a18a" },
    ],

    tagline:
      "Leading enterprise device deployments, and building software and a homelab on the side.",

    summary:
      "IT Technician and Software Developer with over a year of experience leading enterprise " +
      "deployments. I pair hands-on systems and hardware work with software projects in Python, " +
      "C++, and Linux, backed by an A.S. in Computer Science.",

    // the stat boxes in About (4 fits on one row)
    highlights: [
      { value: "30,000+", label: "Devices processed" },
      { value: "40",      label: "Projects led" },
      { value: "25+",     label: "Custom PCs built" },
      { value: "A.S.",    label: "Computer Science" },
    ],
  },


  // ---- Sections ----
  // Order here = order on the page and in the nav.
  // id has to match a renderer in main.js. Set enabled: false to hide one.
  // collapsed: true starts the section closed (click the heading to open).
  sections: [
    { id: "about",      label: "About",      enabled: true },
    { id: "projects",   label: "Projects",   enabled: true },
    { id: "experience", label: "Experience", enabled: true },
    { id: "skills",     label: "Skills",     enabled: true },
    { id: "education",  label: "Education",  enabled: true },
    { id: "contact",    label: "Contact",    enabled: true },
  ],


  // ---- GitHub ----
  // The "Public repos" panel at the bottom of Projects pulls these live
  // from GitHub's API, so a new public repo shows up on its own.
  // Private ones never do.
  github: {
    user: "Daycdom",
    hideForks: true,
    exclude: [],   // repo names to leave out, e.g. ["old-test-repo"]

    // hide any repo whose name starts with one of these (case sensitive).
    // "CS" = university coursework
    excludePrefixes: ["CS"],
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
        "Privacy-focused desktop assistant that reads the screen via OCR for Q&A, summaries, and coding help.",
      details: [
        "Captures what's on screen with OCR and hands it to an LLM with the user's question.",
        "Runs on a self-hosted LLM or your own API keys, so you control where your data goes.",
        "ML-based PII redaction in development, to strip sensitive data before anything leaves the machine.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "Portfolio Website",
      category: "Software",
      status: "Live",
      stack: ["HTML", "CSS", "JavaScript", "Caddy"],
      description:
        "This site. Data-driven and self-hosted on my homelab.",
      details: [
        "All content lives in one data file, and the page is built from it on load.",
        "Public repos come in live from the GitHub API and can be attached to project cards.",
        "Deploys with a git pull on the server, no build step or restart.",
      ],
      links: [],
      repo: "Portfolio-website",
    },

    {
      name: "2D Farming & Town-Builder RPG",
      category: "Game Dev",
      status: "In development",
      stack: ["C++", "Godot Engine"],
      description:
        "Farming and town-building RPG built in Godot with C++.",
      details: [
        "Entity systems for the player, NPCs, crops, and buildings.",
        "Game state management for saving, loading, and day-to-day progression.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "Proxmox Homelab",
      category: "Infrastructure",
      status: "Running",
      stack: ["Proxmox", "Docker", "LXC", "Linux"],
      description:
        "A Proxmox host running 5+ services side by side in containers.",
      details: [
        "Services include game servers, Pi-hole for network-wide ad blocking, and Nginx Proxy Manager.",
        "Each service gets its own LXC container or Docker stack, so one can be rebuilt without touching the rest.",
        "Also hosts this site in its own Debian container.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "VPS Relay",
      category: "Infrastructure",
      status: "Running",
      stack: ["Tailscale", "iptables", "Cloudflare DNS", "Caddy"],
      description:
        "Public traffic hits a VPS and is relayed home over Tailscale, so the home IP is never exposed.",
      details: [
        "Domains point at the VPS through Cloudflare DNS, not at the home connection.",
        "iptables NAT forwards game server ports through the tunnel; everything else is dropped by default.",
        "Caddy handles HTTPS certificates for this site and proxies it to the homelab.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "Home Network",
      category: "Infrastructure",
      status: "Running",
      stack: ["Subnetting", "Firewalls", "VPN"],
      description:
        "Home network built with custom subnetting, firewall rules, and VPN access.",
      details: [
        "A Tailscale subnet router gives remote access to the LAN without opening ports.",
        "Services sit on static addresses so routing and firewall rules stay predictable.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "Game Server Hosting",
      category: "Infrastructure",
      status: "Running",
      stack: ["Linux", "iptables", "Tailscale"],
      description:
        "Dedicated game servers, reachable through the VPS relay instead of open home ports.",
      details: [
        "Currently hosting Minecraft and Palworld.",
        "Each game's port is forwarded individually at the VPS, so only what's needed is reachable.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "PC Builds",
      category: "Hardware",
      status: "25+ systems",
      stack: ["Hardware", "OS Setup", "Troubleshooting"],
      description:
        "Built and advised on 25+ custom PCs, from component selection through setup.",
      details: [
        "Matched parts to each person's budget and use, from gaming rigs to workstations.",
        "Handled assembly, OS install, drivers, and troubleshooting through to a working system.",
      ],
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
        "Lead teams of up to 20 on 40 projects, 10+ of them at 1,000-15,000 devices, for Fortune 500, financial, and government clients.",
        "Processed 30,000+ devices, from routine imaging and deployment to advanced hardware and firmware work.",
        "Serve as the escalation point for hardware, software, and network issues across the deployment team.",
        "Trained 2 technicians into lead roles, and track IT assets across projects.",
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
    "Woodworking Assistant, Flower Window Boxes (2025)",
    "Delivery Driver, DoorDash (2020–2025)",
  ],


  // ---- Skills ----
  skills: [
    {
      group: "Languages",
      items: ["Python", "C++", "Java", "C", "C#", "JavaScript", "HTML", "CSS", "SQL"],
    },
    {
      group: "Systems",
      items: ["Windows 10/11", "Linux (CLI)", "Microsoft 365", "Active Directory", "BIOS/OS Imaging", "Server Administration"],
    },
    {
      group: "Networking",
      items: ["TCP/IP", "DHCP", "DNS", "VPN", "Firewalls", "System Hardening", "Tailscale", "iptables", "Cable Routing & Termination"],
    },
    {
      group: "Tools",
      items: ["Git", "GitHub", "Docker", "Shell Scripting", "SSH", "Proxmox", "LXC"],
    },
    {
      group: "Hardware",
      items: ["PC Builds", "Server Setup", "Device Configuration & Enrollment", "Troubleshooting"],
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
