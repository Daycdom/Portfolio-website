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
      "Leading enterprise IT deployments at scale, and building software and self-hosted infrastructure on the side.",

    summary:
      "IT Technician and Software Developer with over a year of experience leading enterprise " +
      "deployments for Fortune 500, financial, and government clients, running teams of up to 20 " +
      "across 40 projects and 30,000+ devices. Outside of work I build software in Python and C++ " +
      "and run a self-hosted Proxmox homelab, backed by an A.S. in Computer Science.",

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
        "Privacy-focused AI desktop assistant that reads the screen in real time for Q&A, summaries, and coding help.",
      details: [
        "Captures on-screen content with OCR and passes it to an LLM along with the user's question.",
        "Supports self-hosted LLMs or user-supplied API keys for full control over data.",
        "ML-based PII redaction layer in development to censor sensitive data before any external API call.",
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
        "Builds every section from a single data file, so content updates never touch the layout code.",
        "Pulls public repos live from the GitHub API and attaches them to matching project cards.",
        "Deploys with a git pull on the server, behind the same VPS relay as the rest of the homelab.",
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
        "Implements entity systems and game state management.",
        "Handles rendering across multiple subsystems.",
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
        "Proxmox host running 5+ concurrent services, including game servers, Pi-hole, and Nginx Proxy Manager.",
      details: [
        "Isolates services in their own containers so each can be updated or rebuilt independently.",
        "Runs network-wide DNS filtering with Pi-hole and reverse proxying with Nginx Proxy Manager.",
        "Hosts this site in a dedicated Debian container.",
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
        "Cloudflare DNS and a VPS relay that route public traffic home over Tailscale, keeping the home IP hidden.",
      details: [
        "Forwards game server ports through the tunnel with iptables NAT, with all other inbound traffic dropped.",
        "Terminates HTTPS with Caddy and proxies web traffic to the homelab.",
        "Keeps the home network off the public internet, with no ports opened on the home router.",
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
        "Multi-device home network designed with custom subnetting, firewall rules, and VPN access.",
      details: [
        "Provides remote access to the LAN through a Tailscale subnet router.",
        "Separates home devices from public-facing services through firewall rules.",
      ],
      links: [],
      // repo: "",
    },

    {
      name: "Game Server Hosting",
      category: "Infrastructure",
      status: "Running",
      stack: ["Linux", "iptables", "Tailscale", "Monitoring"],
      description:
        "Dedicated game servers administered with port forwarding, firewall configuration, and performance monitoring.",
      details: [
        "Hosts Minecraft and Palworld servers.",
        "Exposes only each game's port, forwarded through the VPS relay instead of open home ports.",
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
        "Built and advised on 25+ custom PCs, from component selection through OS setup and troubleshooting.",
      details: [
        "Selected components to fit each build's budget and workload.",
        "Handled assembly, OS installation, drivers, and troubleshooting through to a working system.",
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
        "Lead teams of up to 20 on 40 projects, 10+ of them at 1,000–15,000 devices, for Fortune 500, financial, and government clients.",
        "Processed 30,000+ devices, from routine imaging and deployment to advanced hardware and firmware work.",
        "Serve as the escalation point for hardware, software, and network issues across the deployment team.",
        "Train technicians on imaging workflows, BIOS configuration, device enrollment, and troubleshooting; trained 2 into lead roles.",
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
