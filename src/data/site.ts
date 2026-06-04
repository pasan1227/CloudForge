import type {
  NavLink,
  ProcessStep,
  Project,
  Service,
  Stat,
  TeamMember,
  Value,
} from "@/lib/types";

export const company = {
  name: "CloudForge",
  tagline: "Software & growth, in lockstep.",
  blurb:
    "We design and engineer products that ship, then put growth engines behind them — under one roof, on one timeline.",
  email: "hello@cloudforge.com",
  phone: "+1 (415) 555-0144",
  location: "Brooklyn · Lisbon · Singapore",
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X / Twitter", href: "https://x.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export const nav: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const services: readonly Service[] = [
  {
    id: "engineering",
    name: "Product Engineering",
    tagline: "Ship the thing. Then ship the next thing.",
    blurb:
      "From zero-to-one MVPs to scale-stage rewrites. We build webapps, mobile, and backends that hold up under real traffic and real edge cases.",
    capabilities: [
      "Next.js & React",
      "Mobile (RN, Swift, Kotlin)",
      "Edge & serverless APIs",
      "AI / LLM integration",
      "DevOps & observability",
      "Design systems",
    ],
    deliverables: [
      "Production codebase + CI/CD",
      "Architecture decision records",
      "Runbook & on-call playbook",
      "Test coverage you can trust",
    ],
    accent: "teal",
    glyph: "</>",
  },
  {
    id: "growth",
    name: "Growth Marketing",
    tagline: "Compounding loops, not vanity charts.",
    blurb:
      "Paid, SEO, lifecycle, and conversion — built as a system. We instrument first, then spend, then iterate on what the numbers actually say.",
    capabilities: [
      "Paid acquisition (Meta, Google, TikTok)",
      "Technical & content SEO",
      "Lifecycle & CRM",
      "Conversion rate optimization",
      "Attribution & analytics",
      "Marketing automation",
    ],
    deliverables: [
      "Growth model & forecast",
      "Channel test calendar",
      "Lifecycle playbooks",
      "Weekly performance reviews",
    ],
    accent: "cyan",
    glyph: "↗",
  },
  {
    id: "brand",
    name: "Brand & Design",
    tagline: "A face worth remembering.",
    blurb:
      "Identity, product UI, motion, and content design that earn a second look. Made to be lived in, not just launched.",
    capabilities: [
      "Brand strategy & identity",
      "Product & UX design",
      "Motion & 3D",
      "Content & art direction",
      "Web design",
      "Pitch & narrative design",
    ],
    deliverables: [
      "Brand book & token library",
      "Component library in Figma",
      "Motion principles",
      "Asset kit for launch",
    ],
    accent: "coral",
    glyph: "✦",
  },
  {
    id: "strategy",
    name: "Strategy",
    tagline: "Decide before you build.",
    blurb:
      "Market sizing, positioning, pricing, and product strategy — short engagements that turn into the rationale for everything else we do together.",
    capabilities: [
      "Market & user research",
      "Positioning & messaging",
      "Pricing & packaging",
      "Product strategy",
      "GTM planning",
      "Org & ops design",
    ],
    deliverables: [
      "Positioning memo",
      "Strategy on a page",
      "Pricing model",
      "12-month GTM roadmap",
    ],
    accent: "mist",
    glyph: "◐",
  },
] as const;

export const process: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Listen",
    blurb:
      "A focused discovery sprint. We talk to your customers, audit what exists, and surface the constraints no one wrote down.",
  },
  {
    index: "02",
    title: "Frame",
    blurb:
      "One short document — the strategy, the bet, the measurable outcome. If we can't articulate it on a page, we don't ship it.",
  },
  {
    index: "03",
    title: "Build",
    blurb:
      "Designers, engineers, and growth working on the same Notion. Weekly demos, no waterfalls, no surprise scope creep.",
  },
  {
    index: "04",
    title: "Compound",
    blurb:
      "After launch, the work changes shape — instrumented experiments, growth loops, performance work. The team stays.",
  },
] as const;

export const stats: readonly Stat[] = [
  { value: 84, suffix: "+", label: "Products shipped", hint: "since 2019" },
  { value: 142, suffix: "M", prefix: "$", label: "Client revenue influenced" },
  { value: 38, suffix: "%", label: "Median lift in qualified pipeline" },
  { value: 11, label: "Senior partners on staff" },
] as const;

export const projects: readonly Project[] = [
  {
    slug: "lumen-bank",
    client: "Lumen Bank",
    title: "A neobank for freelancers, rebuilt around cashflow.",
    category: "engineering",
    industry: "Fintech",
    year: 2025,
    blurb:
      "Replatformed the iOS and web apps onto a shared design system and a new cashflow forecasting engine.",
    result: "App store rating from 3.6 → 4.8 in 90 days.",
    metric: [
      { value: "4.8", label: "App Store rating" },
      { value: "−42%", label: "Crash-free regression" },
    ],
    tags: ["iOS", "Next.js", "Design system"],
  },
  {
    slug: "northwind",
    client: "Northwind Outfitters",
    title: "From DTC trickle to a real growth engine.",
    category: "growth",
    industry: "Commerce",
    year: 2025,
    blurb:
      "Rebuilt paid + lifecycle as one funnel, with attribution we could actually defend in a board meeting.",
    result: "ROAS up 2.4× while ad spend doubled.",
    metric: [
      { value: "2.4×", label: "Blended ROAS" },
      { value: "+118%", label: "Repeat purchase rate" },
    ],
    tags: ["Paid", "Lifecycle", "Attribution"],
  },
  {
    slug: "fieldnote",
    client: "Fieldnote",
    title: "A category-defining brand for an ag-tech challenger.",
    category: "brand",
    industry: "AgTech",
    year: 2024,
    blurb:
      "Identity, narrative, product UI, and the launch site — all rolled into one six-week sprint.",
    result: "Closed a $14M Series A on the new story.",
    metric: [
      { value: "$14M", label: "Series A raised" },
      { value: "6 wks", label: "Concept to launch" },
    ],
    tags: ["Identity", "Web", "Motion"],
  },
  {
    slug: "halcyon-health",
    client: "Halcyon Health",
    title: "Repricing a clinical platform without losing the base.",
    category: "strategy",
    industry: "Healthcare",
    year: 2024,
    blurb:
      "Research, pricing model, and a migration plan that brought existing customers along instead of churning them.",
    result: "Net revenue retention from 96% → 124%.",
    metric: [
      { value: "124%", label: "Net revenue retention" },
      { value: "0", label: "Logo churn from migration" },
    ],
    tags: ["Pricing", "Research", "GTM"],
  },
  {
    slug: "kernel-os",
    client: "Kernel OS",
    title: "An LLM-native ops console for security teams.",
    category: "engineering",
    industry: "Security",
    year: 2025,
    blurb:
      "From prototype to enterprise-ready in a single quarter — SSO, audit logs, role-based access, the works.",
    result: "Shipped to 3 Fortune-500 design partners.",
    metric: [
      { value: "3", label: "F500 design partners" },
      { value: "<150ms", label: "p95 latency" },
    ],
    tags: ["LLM", "Enterprise", "SSO"],
  },
  {
    slug: "after-hours",
    client: "After Hours",
    title: "A late-night beverage brand that doesn't apologize for it.",
    category: "brand",
    industry: "CPG",
    year: 2024,
    blurb:
      "Naming, identity, packaging, and a launch campaign that made shelf and feed.",
    result: "Sold through opening inventory in 11 days.",
    metric: [
      { value: "11 days", label: "Opening inventory sold" },
      { value: "9.8M", label: "Earned impressions" },
    ],
    tags: ["Identity", "Packaging", "Campaign"],
  },
  {
    slug: "atlas-mobility",
    client: "Atlas Mobility",
    title: "Defining a B2B story inside a consumer brand.",
    category: "strategy",
    industry: "Mobility",
    year: 2025,
    blurb:
      "Two-track positioning so the consumer voice stayed loud while enterprise sales had something to sell against.",
    result: "Six enterprise contracts in two quarters.",
    metric: [
      { value: "6", label: "Enterprise deals" },
      { value: "+38%", label: "Inbound pipeline" },
    ],
    tags: ["Positioning", "B2B", "Narrative"],
  },
  {
    slug: "softlight",
    client: "Softlight Studio",
    title: "Growth marketing for a luxury home audio brand.",
    category: "growth",
    industry: "Audio",
    year: 2024,
    blurb:
      "Whisper-quiet category, very loud purchase intent. We found the right channels and scaled them.",
    result: "CAC down 31% while topline grew 3.1×.",
    metric: [
      { value: "−31%", label: "CAC" },
      { value: "3.1×", label: "Revenue growth" },
    ],
    tags: ["Paid", "SEO", "CRO"],
  },
] as const;

export const team: readonly TeamMember[] = [
  {
    name: "Maya Okafor",
    role: "Founder & Principal Engineer",
    bio: "Previously staff eng at Stripe. Believes the best architecture is the one you can afford to throw away.",
    initials: "MO",
    accent: "teal",
  },
  {
    name: "Jules Petit",
    role: "Head of Growth",
    bio: "Built and dismantled growth orgs at three Series-C startups. Loves attribution conversations more than is healthy.",
    initials: "JP",
    accent: "cyan",
  },
  {
    name: "Soren Hale",
    role: "Creative Director",
    bio: "Identity, motion, and the occasional manifesto. Ex-Pentagram, ex-Buck.",
    initials: "SH",
    accent: "coral",
  },
  {
    name: "Imani Banerjee",
    role: "Strategy Partner",
    bio: "Spent a decade in management consulting before defecting to companies that actually ship.",
    initials: "IB",
    accent: "teal",
  },
  {
    name: "Theo Brandt",
    role: "Engineering Lead",
    bio: "Distributed systems by training, product by inclination. Lead author of two of our open-source libraries.",
    initials: "TB",
    accent: "cyan",
  },
  {
    name: "Noor Akhtar",
    role: "Design Lead",
    bio: "Product design from research to pixels. Believes accessibility is craft, not compliance.",
    initials: "NA",
    accent: "coral",
  },
] as const;

export const values: readonly Value[] = [
  {
    title: "One team, one timeline.",
    blurb:
      "Engineers, designers, and growth report into the same plan. No handoffs between agencies, no finger-pointing when the launch slips.",
  },
  {
    title: "Senior on the floor.",
    blurb:
      "Every project is staffed with the people who sold it. Junior support, yes — but the partners stay in the room.",
  },
  {
    title: "Pick the smallest bet.",
    blurb:
      "We size every initiative against the smallest test that could prove the thesis. Then we run that test first.",
  },
  {
    title: "Show the work.",
    blurb:
      "Weekly demos, a public Notion, and post-mortems we sign our names to. If you can't see the work, it's not happening.",
  },
];

export const partnerLogos = [
  "Lumen",
  "Northwind",
  "Fieldnote",
  "Halcyon",
  "Kernel OS",
  "After Hours",
  "Atlas",
  "Softlight",
  "Meridian",
  "Coral & Co.",
  "Borealis",
  "Stack & Stone",
] as const;

export const projectCategoryLabels: Record<Project["category"] | "all", string> = {
  all: "All work",
  engineering: "Engineering",
  growth: "Growth",
  brand: "Brand",
  strategy: "Strategy",
};
