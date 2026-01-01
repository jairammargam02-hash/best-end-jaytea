import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CMSService } from '../../services/cms';
import { SEOHead } from '../../components/SEOHead';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? CMSService.getBlogBySlug(slug) : undefined;

  if (!post) {
    return <div className="py-20 text-center"><h1>Post Not Found</h1><Link to="/blog" className="text-brand-600">Back to Blog</Link></div>;
  }

  // 1. Generate Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jaytea.com/#/blog/${post.slug}`
    },
    "headline": post.title,
    "image": [
      post.coverImage || "https://jaytea.com/default-blog.jpg"
    ],
    "datePublished": post.publishDate,
    "dateModified": post.publishDate, // CMS treats published date as last modified for simplicity
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "JAYTEA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jaytea.com/logo.png"
      }
    },
    "description": post.excerpt
  };

  // 2. Merge with existing SEO config
  const seoWithSchema = {
    ...post.seo,
    jsonLd: JSON.stringify(articleSchema)
  };

  return (
    <>
      <SEOHead config={seoWithSchema} />
      
      <article className="min-h-screen bg-white pb-20">
        {/* Cover Image */}
        <div className="h-[50vh] relative w-full overflow-hidden bg-stone-900">
           <img src={post.coverImage} className="w-full h-full object-cover opacity-80" alt={post.title} />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
              <div className="container mx-auto max-w-4xl">
                 <div className="flex gap-3 mb-4 text-sm font-semibold uppercase tracking-wider text-brand-400">
                    <span className="flex items-center gap-2"><Tag size={14}/> {post.category}</span>
                 </div>
                 <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{post.title}</h1>
                 <div className="flex items-center gap-6 text-sm md:text-base text-stone-300">
                    <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(post.publishDate).toLocaleDateString(undefined, {dateStyle: 'long'})}</span>
                    <span className="flex items-center gap-2">By {post.author}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Link to="/blog" className="inline-flex items-center text-stone-500 hover:text-brand-600 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to all articles
          </Link>
          
          <div className="prose prose-lg prose-stone max-w-none first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-brand-600">
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
            <p className="font-serif italic text-stone-500 text-lg">"Good tea is the key to a good day."</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors">
              <Share2 size={16} /> <span className="text-sm font-bold">Share</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};