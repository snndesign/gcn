
export interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  speed: number;
  speedUnit: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
  highlight: boolean;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HeroSlide {
  preTitle: string;
  highlight: string;
  desc: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  link?: string;
}

export interface AlertConfig {
  isActive: boolean;
  message: string;
  variant: 'info' | 'warning' | 'critical';
  linkText?: string;
  linkUrl?: string;
}

export interface ContentBlock {
  id: string;
  label: string;
  value: string;
  type?: 'text' | 'textarea';
}

export interface PageData {
  id: string;
  name: string; // Admin friendly name
  title: string; // Page H1
  blocks: ContentBlock[];
}

export interface GlobalContent {
  plans: Plan[];
  faqs: FAQItem[];
  heroSlides: HeroSlide[];
  benefits: BenefitItem[];
  alertConfig: AlertConfig;
  pages: PageData[];
}

export const ChatSender = {
  USER: 'user',
  AI: 'ai'
} as const;

export type ChatSender = typeof ChatSender[keyof typeof ChatSender];

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: number;
}
