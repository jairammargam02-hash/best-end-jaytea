import React from 'react';
import { CMSService } from '../../services/cms';
import { SEOHead } from '../../components/SEOHead';
import { Button } from '../../components/UI';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Coffee, Leaf, Award, Globe } from 'lucide-react';

export const Home: React.FC = () => {
  const pageData = CMSService.getPageBySlug('/') || CMSService.getAllPages()[0];
  const heroImage = pageData.coverImage || "https://images.unsplash.com/photo-1565193566173-7a64b2a8d9d5?auto=format&fit=crop&q=80";

  // 1. Define Organization & WebSite Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "JAYTEA",
        "url": "https://jaytea.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jaytea.com/logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-98765-43210",
          "contactType": "franchise sales",
          "areaServed": "IN",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://instagram.com/jaytea",
          "https://facebook.com/jaytea",
          "https://twitter.com/jaytea"
        ]
      },
      {
        "@type": "WebSite",
        "name": "JAYTEA Franchise",
        "url": "https://jaytea.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://jaytea.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  // 2. Merge Schema with existing Page SEO config
  const seoWithSchema = {
    ...pageData.seo,
    jsonLd: JSON.stringify(structuredData)
  };

  return (
    <>
      <SEOHead config={seoWithSchema} />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
           {/* High quality tea garden image */}
           <img 
            src={heroImage}
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10 pt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-500/20 border border-brand-500/50 text-brand-300 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            EST. 2020 • AUTHENTIC INDIAN CHAI
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight drop-shadow-lg">
            Brewing <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Tradition</span>, <br /> 
            Serving The Future.
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            From the misty hills of Darjeeling to the bustling streets of Mumbai, JAYTEA brings you the authentic taste of Kulhad Chai. We are revolutionizing the tea cafe experience with sustainability, quality, and a touch of modern elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/franchise">
              <Button size="lg" className="min-w-[200px] h-14 text-lg shadow-brand-900/20 shadow-xl">Become a Partner</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="min-w-[200px] h-14 text-lg border-white/30 text-white hover:bg-white hover:text-stone-900 backdrop-blur-sm">Explore Our Story</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction / Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-100 rounded-full opacity-50 z-0"></div>
               <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-stone-100 rounded-full opacity-50 z-0"></div>
               <img 
                src="https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80" 
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[600px]" 
                alt="Pouring traditional masala chai" 
               />
               <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur p-6 rounded-lg shadow-lg max-w-xs border-l-4 border-brand-500 hidden md:block">
                 <p className="font-serif text-xl italic text-stone-800">"Chai is not just a drink, it's a conversation."</p>
               </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                Redefining the <br/><span className="text-brand-600">Indian Chai Culture</span>
              </h2>
              <div className="prose prose-lg text-stone-600">
                <p>
                  For centuries, tea has been the heartbeat of India. It wakes us up, fuels our discussions, and brings strangers together. However, the traditional tea stall experience, while nostalgic, often lacks hygiene and consistency. Conversely, international coffee chains miss the authentic Indian soul.
                </p>
                <p>
                  <strong>JAYTEA bridges this gap.</strong>
                </p>
                <p>
                  We have created a premium cafe ecosystem that retains the rustic charm of the "Kulhad" (clay cup) while ensuring world-class hygiene, standardized recipes, and a comfortable ambience. Our tea leaves are handpicked from the finest estates in Assam, ensuring that every sip carries the distinct briskness and aroma of true Indian tea.
                </p>
                <p>
                  Our menu is a celebration of diversity. From the spicy kick of 'Kadak Masala' to the floral notes of 'Rose Chai' and the refreshing zest of our 'Lemon Iced Tea', we cater to every palate. Complemented by Indian snacks like Bun Maska and Vada Pav, JAYTEA is the ultimate hangout spot for the modern Indian.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center text-brand-700 font-bold hover:text-brand-800 tracking-wide uppercase text-sm border-b-2 border-brand-200 pb-1 hover:border-brand-600 transition-all">
                  Read more about our heritage <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fb923c 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div className="space-y-2">
                  <p className="text-5xl font-serif font-bold text-brand-500">100+</p>
                  <p className="text-stone-400 uppercase tracking-widest text-xs font-semibold">Outlets Across India</p>
               </div>
               <div className="space-y-2">
                  <p className="text-5xl font-serif font-bold text-brand-500">5M+</p>
                  <p className="text-stone-400 uppercase tracking-widest text-xs font-semibold">Cups Served Annually</p>
               </div>
               <div className="space-y-2">
                  <p className="text-5xl font-serif font-bold text-brand-500">15+</p>
                  <p className="text-stone-400 uppercase tracking-widest text-xs font-semibold">Cities Covered</p>
               </div>
               <div className="space-y-2">
                  <p className="text-5xl font-serif font-bold text-brand-500">4.8</p>
                  <p className="text-stone-400 uppercase tracking-widest text-xs font-semibold">Average Customer Rating</p>
               </div>
            </div>
         </div>
      </section>

      {/* Why Franchise With Us Section */}
      <section className="py-24 bg-brand-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl font-bold mb-6 text-stone-900">Why Partner With JAYTEA?</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              We offer a proven business model, operational excellence, and a brand that resonates with millions. Your success is our priority.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-8">
                <TrendingUp size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-stone-900">High ROI Model</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Our optimized supply chain and operational efficiency ensure low overheads and high margins. With our lean cafe models, franchise partners typically achieve break-even within 12-18 months of operation.
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> Low Initial Investment</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> High Gross Margins</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-8">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-stone-900">Comprehensive Training</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                No prior F&B experience? No problem. We provide 360-degree training for you and your staff at our headquarters. From brewing the perfect chai to customer service and inventory management.
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> 15-Day Staff Training</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> SOP Manuals Provided</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-8">
                <Leaf size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-stone-900">Sustainable Growth</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                We are a plastic-neutral brand. Our use of terracotta kulhads not only enhances the taste but also supports local potters. Customers today prefer brands with a conscience.
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> Eco-friendly Packaging</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div> Supporting Artisans</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="h-[500px] relative bg-fixed bg-center bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1596465492476-886f4cb48e1a?auto=format&fit=crop&q=80")'}}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
           <div className="text-center text-white px-4">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Experience the Magic</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">"There is something incredibly comforting about holding a warm clay cup filled with spicy, sweet chai on a rainy evening."</p>
              <Link to="/franchise">
                <Button variant="primary" size="lg" className="rounded-full px-10">Join Our Family</Button>
              </Link>
           </div>
        </div>
      </section>

      {/* Recent Blog/Updates Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex justify-between items-end mb-12">
             <div>
               <span className="text-brand-600 font-bold tracking-wider text-sm uppercase">Our Journal</span>
               <h2 className="font-serif text-4xl font-bold mt-2 text-stone-900">Stories from the Tea Estate</h2>
             </div>
             <Link to="/blog" className="hidden md:flex items-center text-stone-500 hover:text-brand-600 font-medium">
               View all articles <ArrowRight size={16} className="ml-2" />
             </Link>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
             <div className="group cursor-pointer">
               <div className="overflow-hidden rounded-xl mb-6">
                 <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" alt="Spices" />
               </div>
               <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                 <span>Mar 12, 2024</span>
                 <span>•</span>
                 <span>Tea Knowledge</span>
               </div>
               <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">The Secret Blend: Why Masala Chai Boasts Immunity</h3>
               <p className="text-stone-600 line-clamp-3">
                 Cardamom, ginger, cloves, and cinnamon. It's not just a recipe; it's an Ayurvedic potion. Discover how our signature blend boosts immunity and aids digestion...
               </p>
             </div>
             <div className="group cursor-pointer">
               <div className="overflow-hidden rounded-xl mb-6">
                 <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" alt="Tea Shop" />
               </div>
               <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                 <span>Feb 28, 2024</span>
                 <span>•</span>
                 <span>Franchise Success</span>
               </div>
               <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">From IT Professional to Cafe Owner: Rahul's Journey</h3>
               <p className="text-stone-600 line-clamp-3">
                 Meet Rahul, who quit his 9-5 corporate job to open a JAYTEA outlet in Pune. Read about his challenges, his victories, and how he achieved financial freedom in just 14 months...
               </p>
             </div>
           </div>
        </div>
      </section>
    </>
  );
};