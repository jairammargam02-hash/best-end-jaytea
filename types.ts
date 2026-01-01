export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CONTENT_ADMIN = 'CONTENT_ADMIN',
  GUEST = 'GUEST'
}

export type PageType = 'landing' | 'service' | 'blog-hub' | 'conversion';
export type PageStatus = 'draft' | 'published' | 'archived';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  noIndex: boolean;
  
  // Open Graph (Facebook/LinkedIn)
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;

  // Twitter Card
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Advanced
  author?: string;
  jsonLd?: string;
  
  // Enterprise
  score?: number;
  lastVerified?: string;
}

export interface SitemapConfig {
  priority: string; // "1.0", "0.8", etc
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export interface PageHistorySnapshot {
  versionId: string;
  savedAt: string;
  savedBy: string;
  data: Partial<ContentPage>;
}

export interface ContentPage {
  id: string;
  slug: string;
  title: string;
  pageType: PageType;
  status: PageStatus; // Replaces boolean isPublished
  content: string; // HTML or Markdown
  coverImage?: string; // Hero/OG Image
  seo: SEOConfig;
  sitemap: SitemapConfig;
  lastUpdated: string;
  
  // Enterprise Features
  history?: PageHistorySnapshot[];
  layoutPreset?: 'default' | 'full-width' | 'sidebar';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published';
  seo: SEOConfig;
  coverImage: string;
}

export interface GlobalSEOSettings {
  siteTitleSuffix: string; // e.g., " | JAYTEA"
  defaultMetaDescription: string;
  defaultOgImage: string;
  defaultRobotsPolicy: 'index, follow' | 'noindex, nofollow';
  
  // SEO Operations
  googleSearchConsoleVerified?: boolean;
  sitemapSubmitted?: boolean;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

export interface FormSubmission {
  id: string;
  type: 'contact' | 'franchise';
  data: any;
  date: string;
  status: 'new' | 'read' | 'archived';
  // Enrichment
  sourcePage?: string;
  leadScore?: number;
}