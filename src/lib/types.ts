export type ServiceCategory = "engineering" | "growth" | "brand" | "strategy";

export interface Service {
  id: ServiceCategory;
  name: string;
  tagline: string;
  blurb: string;
  capabilities: string[];
  deliverables: string[];
  accent: "teal" | "cyan" | "coral" | "mist";
  glyph: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  blurb: string;
}

export interface Project {
  slug: string;
  client: string;
  title: string;
  category: ServiceCategory;
  industry: string;
  year: number;
  blurb: string;
  result: string;
  metric: { value: string; label: string }[];
  tags: string[];
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: "teal" | "cyan" | "coral";
}

export interface Value {
  title: string;
  blurb: string;
}

export interface NavLink {
  href: "/" | "/services" | "/work" | "/about" | "/contact";
  label: string;
}
