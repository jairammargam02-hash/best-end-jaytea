import { ContentPage, BlogPost, UserRole, User } from './types';

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeejvlgq";

export const INITIAL_SEO_DEFAULTS = {
  title: "JAYTEA - Authentic Indian Chai Franchise",
  description: "Join India's fastest growing tea franchise network. JAYTEA brings the authentic taste of Kulhad Chai to the modern world.",
  keywords: "tea franchise, chai business, indian tea, start business, franchise opportunity",
  noIndex: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  jsonLd: "",
  author: "JAYTEA Team"
};

const DEFAULT_SITEMAP = {
  priority: "0.8",
  changeFrequency: "weekly" as const
};

export const INITIAL_PAGES: ContentPage[] = [
  {
    id: 'p1',
    slug: '/',
    title: 'Home',
    pageType: 'landing',
    status: 'published',
    sitemap: { priority: "1.0", changeFrequency: "daily" },
    lastUpdated: new Date().toISOString(),
    seo: { ...INITIAL_SEO_DEFAULTS, title: "Home | JAYTEA Franchise" },
    coverImage: "https://images.unsplash.com/photo-1565193566173-7a64b2a8d9d5?auto=format&fit=crop&q=80",
    content: "Welcome to JAYTEA. We serve not just tea, but an experience."
  },
  {
    id: 'p2',
    slug: '/about',
    title: 'About Us',
    pageType: 'landing',
    status: 'published',
    sitemap: { priority: "0.8", changeFrequency: "monthly" },
    lastUpdated: new Date().toISOString(),
    seo: { ...INITIAL_SEO_DEFAULTS, title: "About Us | Our Story" },
    coverImage: "https://images.unsplash.com/photo-1596465492476-886f4cb48e1a?auto=format&fit=crop&q=80",
    content: "Founded in 2020, JAYTEA began with a simple mission: to restore the glory of the clay cup."
  },
  {
    id: 'p3',
    slug: '/franchise',
    title: 'Franchise Opportunity',
    pageType: 'landing',
    status: 'published',
    sitemap: { priority: "0.9", changeFrequency: "weekly" },
    lastUpdated: new Date().toISOString(),
    seo: { ...INITIAL_SEO_DEFAULTS, title: "Franchise | Start Your Business" },
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80",
    content: "Partner with us. Low investment, high returns."
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'future-of-chai-market',
    title: 'The Future of the Indian Tea Market 2024',
    excerpt: 'Why the tea industry is poised for exponential growth in the post-pandemic era.',
    content: 'Detailed analysis of market trends...',
    category: 'Industry',
    author: 'Rahul Verma',
    publishDate: new Date().toISOString(),
    status: 'published',
    seo: { ...INITIAL_SEO_DEFAULTS, title: "Future of Chai | JAYTEA Blog" },
    coverImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80"
  },
  {
    id: 'b2',
    slug: 'health-benefits-masala-chai',
    title: '7 Health Benefits of Authentic Masala Chai',
    excerpt: 'It is not just a drink; it is an immunity booster.',
    content: 'Spices like ginger, cardamom, and cinnamon...',
    category: 'Health',
    author: 'Dr. S. Gupta',
    publishDate: new Date().toISOString(),
    status: 'published',
    seo: { ...INITIAL_SEO_DEFAULTS, title: "Health Benefits | JAYTEA Blog" },
    coverImage: "https://images.unsplash.com/photo-1565193566173-7a64b2a8d9d5?auto=format&fit=crop&q=80"
  }
];

export const MOCK_ADMIN_USER: User = {
  id: 'admin-1',
  username: 'admin',
  name: 'Super Admin',
  role: UserRole.SUPER_ADMIN
};