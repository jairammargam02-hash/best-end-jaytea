import React from 'react';
import { Link } from 'react-router-dom';
import { CMSService } from '../../services/cms';
import { SEOHead } from '../../components/SEOHead';
import { FileText, BookOpen } from 'lucide-react';

export const HtmlSitemap: React.FC = () => {
  const pages = CMSService.getAllPages();
  const blogs = CMSService.getAllBlogs(false);

  return (
    <>
      <SEOHead config={{ title: "Sitemap | JAYTEA", description: "Complete list of pages on JAYTEA website.", keywords: "sitemap, links", noIndex: false }} />
      <div className="bg-stone-50 py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
           <h1 className="font-serif text-4xl font-bold text-stone-900 mb-8">Site Map</h1>
           
           <div className="grid md:grid-cols-2 gap-8">
             {/* Main Pages */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
               <h2 className="flex items-center gap-2 font-bold text-xl mb-4 text-brand-600 border-b pb-2">
                 <FileText size={20} /> Pages
               </h2>
               <ul className="space-y-2">
                 {pages.map(page => (
                   <li key={page.id}>
                     <Link to={page.slug} className="text-stone-700 hover:text-brand-600 hover:underline">
                       {page.title}
                     </Link>
                   </li>
                 ))}
                 <li><Link to="/sitemap" className="text-stone-700 hover:text-brand-600 hover:underline">HTML Sitemap</Link></li>
               </ul>
             </div>

             {/* Blogs */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
               <h2 className="flex items-center gap-2 font-bold text-xl mb-4 text-purple-600 border-b pb-2">
                 <BookOpen size={20} /> Blog Posts
               </h2>
               <ul className="space-y-2">
                 {blogs.map(blog => (
                   <li key={blog.id}>
                     <Link to={`/blog/${blog.slug}`} className="text-stone-700 hover:text-brand-600 hover:underline">
                       {blog.title}
                     </Link>
                   </li>
                 ))}
                 {blogs.length === 0 && <li className="text-stone-400 italic">No blog posts yet.</li>}
               </ul>
             </div>
           </div>
        </div>
      </div>
    </>
  );
};