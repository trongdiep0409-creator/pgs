export interface HandoffSpec {
  searchIntent: string;
  conceptUI: string;
  hero3D: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h2AndH3: string[];
  internalLinkOut: string[];
  internalLinkIn: string[];
  schemaCode: string;
  checklistDesigner: string[];
  checklistDeveloper: string[];
  checklistContentSEO: string[];
}

export interface TikTokSection {
  id: number;
  title: string;
  slug: string;
  spec: HandoffSpec;
}

export interface NicheStrategy {
  id: string;
  name: string;
  audience: string;
  persona: string;
  coreMessage: string;
  differentiation: string;
  cta: string;
  exampleTopic: string;
}

export interface ContentPillar {
  name: string;
  ratio: number;
  color: string;
  description: string;
  videoFormat: string;
  example: string;
}

export interface SeriesPath {
  title: string;
  duration: string;
  objective: string;
  hookType: string;
  steps: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePackage {
  name: string;
  badge: string;
  price: string;
  priceNum: number;
  description: string;
  features: string[];
  deliverables: string[];
  recommendedFor: string;
}

export interface CaseStudy {
  clientName: string;
  niche: string;
  followersGained: string;
  viewsTotal: string;
  leadsGenerated: string;
  conversionIncrease: string;
  duration: string;
  story: string;
  image: string;
}
