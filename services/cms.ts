import { ContentPage, BlogPost, SEOConfig, GlobalSEOSettings, PageHistorySnapshot } from '../types';
import { INITIAL_PAGES, INITIAL_BLOGS, INITIAL_SEO_DEFAULTS } from '../constants';

// Keys for LocalStorage
const STORAGE_KEYS = {
  PAGES: 'jaytea_pages',
  BLOGS: 'jaytea_blogs',
  SETTINGS_SEO: 'jaytea_settings_seo'
};

const DEFAULT_GLOBAL_SEO: GlobalSEOSettings = {
  siteTitleSuffix: ' | JAYTEA Franchise',
  defaultMetaDescription: 'India’s fastest growing premium tea franchise network.',
  defaultOgImage: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80',
  defaultRobotsPolicy: 'index, follow'
};

// Helper to initialize storage if empty
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PAGES)) {
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(INITIAL_PAGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(INITIAL_BLOGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS_SEO)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS_SEO, JSON.stringify(DEFAULT_GLOBAL_SEO));
  }
};

export const CMSService = {
  // --- Agency Tools ---
  resetProject: (): void => {
    // Reset to a clean slate, preserving only the Home page structure but content reset
    const cleanHome: ContentPage = { ...INITIAL_PAGES[0], content: "<h1>Welcome</h1><p>New project started.</p>", history: [] };
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify([cleanHome]));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify([]));
    // Keep SEO settings as they might be configured for the new project
    // Submissions cleared
    localStorage.removeItem('jaytea_submissions');
  },

  // --- Global Settings ---
  getGlobalSEOSettings: (): GlobalSEOSettings => {
    initStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS_SEO) || JSON.stringify(DEFAULT_GLOBAL_SEO));
  },

  saveGlobalSEOSettings: (settings: GlobalSEOSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS_SEO, JSON.stringify(settings));
  },

  // --- Logic: Validation & Scoring ---
  validatePageSEO: (page: ContentPage): string[] => {
    const errors: string[] = [];
    if (!page.seo.title) errors.push("Meta Title is missing.");
    if (page.seo.title.length > 60) errors.push("Meta Title is too long (max 60 chars).");
    if (page.seo.description && page.seo.description.length > 160) errors.push("Meta Description is too long (max 160 chars).");
    
    // Critical Checks
    if (page.seo.noIndex && (page.slug === '/' || page.slug === '/franchise')) {
      errors.push("Critical Warning: 'NoIndex' is enabled on a high-value page.");
    }
    
    // Published Page Strictness
    if (page.status === 'published') {
      if (!page.seo.ogImage) {
        errors.push("Social: OG Image missing for published page.");
      }
      // Check for H1 tag
      if (!page.content.includes('<h1')) {
        errors.push("Content: Missing H1 tag. Every published page must have a main heading.");
      }
    }
    
    // JSON-LD Syntax Check
    if (page.seo.jsonLd) {
      try {
        JSON.parse(page.seo.jsonLd);
      } catch (e) {
        errors.push("Technical: Invalid JSON-LD Schema syntax.");
      }
    }
    
    return errors;
  },

  calculateSEOScore: (page: ContentPage): number => {
    let score = 0;
    // 1. Basic Metadata (30 pts)
    if (page.seo.title && page.seo.title.length >= 10 && page.seo.title.length <= 60) score += 15;
    if (page.seo.description && page.seo.description.length >= 50 && page.seo.description.length <= 160) score += 15;

    // 2. Content & Structure (40 pts)
    if (page.content.includes('<h1')) score += 10;
    if (page.content.includes('<h2')) score += 10; // H2 Structure bonus
    if (page.content.length > 300) score += 10;
    if (page.coverImage) score += 5;
    
    // Internal Linking Bonus
    if (page.content.includes('href="/') || page.content.includes('href="#')) {
      score += 5;
    }

    // 3. Technical (30 pts)
    if (page.seo.jsonLd && page.seo.jsonLd.length > 10) score += 15;
    if (!page.seo.noIndex) score += 15;
    
    return score;
  },

  // --- Pages ---
  getAllPages: (): ContentPage[] => {
    initStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PAGES) || '[]');
  },

  getPageBySlug: (slug: string): ContentPage | undefined => {
    const pages = CMSService.getAllPages();
    return pages.find(p => p.slug === slug);
  },

  savePage: (page: ContentPage, createVersion = true): void => {
    const pages = CMSService.getAllPages();
    const index = pages.findIndex(p => p.id === page.id);
    
    // Auto-calculate score
    page.seo.score = CMSService.calculateSEOScore(page);

    if (index >= 0) {
      // Versioning Logic
      if (createVersion) {
        const oldPage = pages[index];
        const snapshot: PageHistorySnapshot = {
          versionId: `v-${Date.now()}`,
          savedAt: new Date().toISOString(),
          savedBy: 'Admin',
          data: {
             title: oldPage.title,
             content: oldPage.content,
             seo: oldPage.seo,
             slug: oldPage.slug,
             status: oldPage.status
          }
        };
        const history = oldPage.history ? [snapshot, ...oldPage.history].slice(0, 10) : [snapshot];
        page.history = history;
      } else {
        page.history = pages[index].history;
      }

      pages[index] = { ...page, lastUpdated: new Date().toISOString() };
    } else {
      pages.push({ ...page, lastUpdated: new Date().toISOString(), history: [] });
    }
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  },

  deletePage: (pageId: string): void => {
    let pages = CMSService.getAllPages();
    pages = pages.filter(p => p.id !== pageId);
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  },

  createEmptyPage: (): ContentPage => {
    return {
      id: `p-${Date.now()}`,
      slug: '/new-page',
      title: 'Untitled Page',
      pageType: 'landing',
      status: 'draft',
      content: '<h1>New Page</h1><p>Start editing content...</p>',
      coverImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80',
      lastUpdated: new Date().toISOString(),
      seo: { ...INITIAL_SEO_DEFAULTS, title: "New Page" },
      sitemap: { priority: "0.5", changeFrequency: "monthly" },
      history: []
    };
  },

  // --- Blogs ---
  getAllBlogs: (includeDrafts = false): BlogPost[] => {
    initStorage();
    const blogs: BlogPost[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || '[]');
    return includeDrafts ? blogs : blogs.filter(b => b.status === 'published');
  },

  getBlogBySlug: (slug: string): BlogPost | undefined => {
    const blogs = CMSService.getAllBlogs(true);
    return blogs.find(b => b.slug === slug);
  },

  saveBlog: (post: BlogPost): void => {
    const blogs = CMSService.getAllBlogs(true);
    const index = blogs.findIndex(b => b.id === post.id);
    if (index >= 0) {
      blogs[index] = post;
    } else {
      blogs.push(post);
    }
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  },

  deleteBlog: (id: string): void => {
    let blogs = CMSService.getAllBlogs(true);
    blogs = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  },

  createEmptyBlog: (): BlogPost => {
    return {
      id: `b-${Date.now()}`,
      slug: 'new-blog-post',
      title: 'New Blog Post',
      excerpt: 'A short summary of the post...',
      content: '<p>Write your article here...</p>',
      category: 'Uncategorized',
      author: 'Admin',
      publishDate: new Date().toISOString(),
      status: 'draft',
      seo: { ...INITIAL_SEO_DEFAULTS, title: "New Post" },
      coverImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80'
    };
  }
};