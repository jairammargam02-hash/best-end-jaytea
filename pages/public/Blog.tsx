import React from 'react';
import { Link } from 'react-router-dom';
import { CMSService } from '../../services/cms';
import { SEOHead } from '../../components/SEOHead';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const Blog: React.FC = () => {
  const blogs = CMSService.getAllBlogs(false); // Only published

  const seoConfig = {
    title: "Tea Journal | JAYTEA Blog",
    description: "Explore the latest trends in the tea industry, health benefits of chai, and franchise success stories.",
    keywords: "tea blog, chai health benefits, franchise tips, tea industry news",
    noIndex: false
  };

  return (
    <>
      <SEOHead config={seoConfig} />
      
      {/* Blog Header */}
      <div className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-stone-900">The Tea Journal</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Stories, insights, and news from the world of JAYTEA.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(post => (
             <article key={post.id} className="flex flex-col bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
               <div className="h-56 overflow-hidden">
                 <img 
                   src={post.coverImage || 'https://picsum.photos/800/600'} 
                   alt={post.title} 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                 />
               </div>
               <div className="p-6 flex-1 flex flex-col">
                 <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.publishDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                 </div>
                 <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl font-bold text-stone-900 mb-3 hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                 </Link>
                 <p className="text-stone-600 text-sm line-clamp-3 mb-6 flex-1">
                   {post.excerpt}
                 </p>
                 <Link to={`/blog/${post.slug}`} className="text-brand-600 font-medium text-sm flex items-center gap-2 hover:underline">
                   Read Article <ArrowRight size={16} />
                 </Link>
               </div>
             </article>
          ))}
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            <p className="text-xl">No articles found.</p>
            <p className="text-sm">Check back later for updates.</p>
          </div>
        )}
      </div>
    </>
  );
};