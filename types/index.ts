import { BaseEntry } from "@contentstack/delivery-sdk";

export interface CTA {
  label: string;
  link: string;
}

export interface MenuItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  menuItems: MenuItem[];
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  badge_text?: string;
  background?: string; // URL or color
  primary_cta?: CTA;
  secondary_cta?: CTA;
}

export interface FooterLink {
  label: string;
  link: string;
}

export interface SocialLink {
  platform: string; // e.g., "Twitter", "LinkedIn"
  url: string;
}

export interface FooterProps {
  links: FooterLink[];
  social_links: SocialLink[];
  copyright: string;
}

export interface Pricing {
  type: string; // e.g., "per-token" or "per-call"
  amount: number; // Cost
}
export interface Child {
  text: string;
}

export interface LanguageData {
  children: { children: Child[] }[];
}

export interface ApiDocsEntry {
  js: LanguageData;
  ts: LanguageData;
  python: LanguageData;
}

export interface ApiDocsData {
  entries: ApiDocsEntry[];
}

export interface Performance {
  latency: string; // e.g., "~500ms"
  throughput: string; // e.g., "1000 req/s"
}

export interface ModelCardProps {
  name: string; // Model name
  provider: string; // Provider name
  description: string; // Short description
  pricing: Pricing;
  features: string[]; // List of feature IDs or descriptions
  performance: Performance;
  tags: string[]; // Tags for categorization
  apiEndpoint: string; // Documentation link
  docs:string
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  og_image?: string; // URL of the OG image
}

export interface ContentstackResponse extends BaseEntry {
  entries: Array<{
    uid: string;
    featured_models: Array<{
      title: string; // Maps to ModelCardProps.name
      provider: string; // Maps to ModelCardProps.provider
      description: string; // Maps to ModelCardProps.description
      pricing: Pricing; // Matches ModelCardProps.pricing
      features: Array<{ uid: string }>; // Maps to ModelCardProps.features
      performance: Performance; // Matches ModelCardProps.performance
      tags: string[]; // Matches ModelCardProps.tags
      url: string; // Maps to ModelCardProps.apiEndpoint
    }>;
    footer: Array<{
      links: Array<{ link: { title: string; href: string } }>; // Maps to FooterProps.links
      social_links: Array<{ link: { title: string; href: string } }>; // Maps to FooterProps.social_links
      copyright: string; // Maps to FooterProps.copyright
    }>;
    seo: Array<SEOProps>; // Maps to SEOProps
  }>;
}
