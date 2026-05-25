export interface ServiceItem {
  id: string;
  name: string;
  category: "design" | "fabrication" | "branding" | "specialty";
  icon: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  process: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  accentColor: string;
  imageUrl: string;
}

export interface ClientReview {
  reviewerName: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  clientName: string;
  description: string;
  challenge: string;
  solution: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  costEstimate: string;
  completedYear: string;
  materialsUsed: string[];
  clientReview: ClientReview;
  galleryImages: string[];
  timeline: { step: string; detail: string }[];
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatarUrl: string;
  isFeatured: boolean;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceInterested: string;
  budget: string;
  description: string;
  status: "new" | "contacted" | "scheduled" | "completed";
  submittedAt: string;
}

export interface DesignIdea {
  style: string;
  materialsSuggested: string[];
  estimatedTimeline: string;
  fabricationInvolvement: string;
  aiCommentary: string;
}
