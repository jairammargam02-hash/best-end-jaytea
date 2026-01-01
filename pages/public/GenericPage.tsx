import React from 'react';
import { useParams } from 'react-router-dom';
import { CMSService } from '../../services/cms';
import { SEOHead } from '../../components/SEOHead';

export const GenericPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find page by slug (e.g., 'privacy') matching '/privacy'
  const page = CMSService.getPageBySlug(`/${slug}`);

  if (!page) {
    return <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-stone-200">404</h1>
      <p className="text-stone-600 mt-4">Page not found.</p>
    </div>;
  }

  return (
    <>
      <SEOHead config={page.seo} />
      {/* Hero with dynamic image if available */}
      <div className={`relative bg-stone-900 ${page.coverImage ? 'h-64' : 'py-20'}`}>
         {page.coverImage && (
            <>
               <img src={page.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-50" alt={page.title} />
               <div className="absolute inset-0 bg-stone-900/50"></div>
            </>
         )}
         <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-0 text-center drop-shadow-md">
              {page.title}
            </h1>
         </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div 
          className="prose prose-lg prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </div>
    </>
  );
};