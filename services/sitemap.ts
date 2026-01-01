import { CMSService } from './cms';

export const SitemapService = {
  // Generate XML content for sitemap.xml
  generateXML: (): string => {
    const pages = CMSService.getAllPages();
    const blogs = CMSService.getAllBlogs(false); // Published only
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, ''); // Get current base URL

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add Static/CMS Pages
    pages.forEach(page => {
      // Only include published pages
      if (page.status !== 'published') return;

      // Handle the home page slug usually being '/'
      const path = page.slug === '/' ? '' : page.slug;
      const fullUrl = `${baseUrl}/#${path}`; // Hash router format
      
      xml += `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${page.lastUpdated || new Date().toISOString()}</lastmod>
    <changefreq>${page.sitemap?.changeFrequency || 'weekly'}</changefreq>
    <priority>${page.sitemap?.priority || '0.5'}</priority>
  </url>
`;
    });

    // Add Blog Posts
    blogs.forEach(post => {
      const fullUrl = `${baseUrl}/#/blog/${post.slug}`;
      
      xml += `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${post.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    xml += `</urlset>`;
    return xml;
  },

  // Trigger browser download of the sitemap
  downloadSitemap: () => {
    const xmlContent = SitemapService.generateXML();
    const blob = new Blob([xmlContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};