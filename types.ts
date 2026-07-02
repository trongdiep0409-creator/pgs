export interface PainPoint {
  id: string;
  title: string;
  desc: string;
  consequence: string;
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  visualType: 'online' | 'digital' | 'agency' | 'future';
}

export interface ComparisonRow {
  criteria: string;
  traditionalAgency: {
    text: string;
    isPositive: boolean;
  };
  pgsAgency: {
    text: string;
    isPositive: boolean;
    badge?: string;
  };
}

export interface OrbitNode {
  id: string;
  label: string;
  description: string;
  details: string[];
  icon: string;
  angle: number; // in degrees for circular layout
  color: string;
}

export interface CoreValue {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  manifesto: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  duration: string;
  checklist: string[];
}

export interface ExpertRole {
  id: string;
  role: string;
  vietnameseTitle: string;
  expertName: string;
  experience: string;
  description: string;
  keyMetric: string;
  metricLabel: string;
  skills: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
