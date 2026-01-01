import React, { useEffect } from 'react';
import { SEOConfig } from '../types';

interface SEOHeadProps {
  config: SEOConfig;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ config }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = config.title;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      // Remove existing tag to prevent duplicates
      const existing = document.querySelector(`meta[${attribute}="${name}"]`);
      if (existing) {
        existing.remove();
      }

      if (!content) return; 

      const element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    };

    // 2. Basic Meta
    updateMeta('description', config.description);
    updateMeta('keywords', config.keywords);
    if (config.author) {
      updateMeta('author', config.author);
    }
    
    // 3. Open Graph (Fallback to basic title/desc if OG not specific)
    updateMeta('og:title', config.ogTitle || config.title, 'property');
    updateMeta('og:description', config.ogDescription || config.description, 'property');
    updateMeta('og:image', config.ogImage || '', 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:url', window.location.href, 'property');

    // 4. Twitter Cards (Fallback to OG or basic)
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', config.twitterTitle || config.ogTitle || config.title);
    updateMeta('twitter:description', config.twitterDescription || config.ogDescription || config.description);
    updateMeta('twitter:image', config.twitterImage || config.ogImage || '');

    // 5. Robots
    if (config.noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    // 6. Canonical
    let linkRel = document.querySelector(`link[rel="canonical"]`);
    if (!linkRel) {
      linkRel = document.createElement('link');
      linkRel.setAttribute('rel', 'canonical');
      document.head.appendChild(linkRel);
    }
    linkRel.setAttribute('href', config.canonicalUrl || window.location.href);

    // 7. JSON-LD (Structured Data)
    const existingJsonLd = document.getElementById('json-ld-script');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    if (config.jsonLd) {
      try {
        // Validate JSON before injecting
        JSON.parse(config.jsonLd);
        const script = document.createElement('script');
        script.id = 'json-ld-script';
        script.type = 'application/ld+json';
        script.text = config.jsonLd;
        document.head.appendChild(script);
      } catch (e) {
        console.warn("Invalid JSON-LD provided in SEO config");
      }
    }

  }, [config]);

  return null;
};