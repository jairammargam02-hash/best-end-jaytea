import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Card } from '../../components/UI';
import { Leaf, Award, Heart, Coffee } from 'lucide-react';

export const About: React.FC = () => {
  // Static SEO config for About page
  const seoConfig = {
    title: "About JAYTEA | Our Story & Vision",
    description: "Learn about the journey of JAYTEA, our mission to revive the Kulhad Chai culture, and the values that drive our sustainable business practices.",
    keywords: "about jaytea, tea franchise history, indian tea story, sustainable tea business",
    noIndex: false,
    ogImage: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80"
  };

  return (
    <>
      <SEOHead config={seoConfig} />

      {/* Header */}
      <section className="bg-stone-50 pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Origins</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-6">Rooted in Tradition,<br/>Brewed for the Modern Soul</h1>
          <p className="max-w-2xl mx-auto text-lg text-stone-600">
            JAYTEA was born out of a simple desire: to elevate the humble street-side cutting chai into a premium, hygienic, and consistent experience without losing its soul.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                   <img src="https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80" className="rounded-lg shadow-lg w-full h-64 object-cover mt-8" alt="Tea Leaves" />
                   <img src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80" className="rounded-lg shadow-lg w-full h-64 object-cover" alt="Clay Cups" />
                </div>
             </div>
             <div className="md:w-1/2 prose prose-lg prose-stone">
                <h2 className="font-serif text-3xl font-bold text-stone-900">The Journey</h2>
                <p>
                  In late 2019, two childhood friends, Arjun and Vikram, found themselves sipping tea at a roadside stall in Mumbai. They loved the taste of the saffron-infused tea but worried about the hygiene of the glasses and the chaos of the street. They realized that while India runs on tea, there were very few places where one could sit comfortably, enjoy a hygienic cup of authentic Indian chai, and not pay a premium price like international coffee chains.
                </p>
                <p>
                  Thus, <strong>JAYTEA</strong> was conceived. The name 'Jay' signifies victory and celebration in Sanskrit.
                </p>
                <p>
                  They traveled across the tea estates of Assam and the spice markets of Kerala to curate the perfect blend. After months of R&D, they finalized their signature 'Kadak Masala Blend' – a robust mix that retains its flavor even when boiled with milk, the Indian way.
                </p>
                <p>
                  The first outlet opened in January 2020. Despite the challenges of the pandemic, the brand resonated with customers looking for comfort and hygiene. Today, JAYTEA is a family of over 100 outlets, serving millions of smiles every year.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
           </div>

           <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center px-4">
                 <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                    <Leaf size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Authenticity</h3>
                 <p className="text-stone-400 text-sm leading-relaxed">
                    We don't use premixes or artificial flavors. Our tea is brewed fresh, using real tea leaves and whole spices, just like at home.
                 </p>
              </div>
              <div className="text-center px-4">
                 <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                    <Heart size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                 <p className="text-stone-400 text-sm leading-relaxed">
                    We are committed to being a zero-plastic brand. Our signature terracotta cups are biodegradable and support the livelihood of potters.
                 </p>
              </div>
              <div className="text-center px-4">
                 <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                    <Award size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Quality</h3>
                 <p className="text-stone-400 text-sm leading-relaxed">
                    From the milk we source to the water we use, every ingredient goes through rigorous quality checks to ensure consistency.
                 </p>
              </div>
              <div className="text-center px-4">
                 <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                    <Coffee size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Community</h3>
                 <p className="text-stone-400 text-sm leading-relaxed">
                    Our cafes are designed to be community hubs—places where ideas are exchanged, friendships are forged, and memories are made.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Leadership Team (Placeholder for natural images) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <h2 className="font-serif text-3xl font-bold mb-12 text-stone-900">Meet The Visionaries</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Leader 1 */}
              <div className="group">
                 <div className="overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                    <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Founder 1" />
                 </div>
                 <h3 className="font-bold text-xl text-stone-900">Arjun Mehta</h3>
                 <p className="text-brand-600 text-sm font-medium uppercase">Co-Founder & CEO</p>
              </div>
              
              {/* Leader 2 */}
              <div className="group">
                 <div className="overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Founder 2" />
                 </div>
                 <h3 className="font-bold text-xl text-stone-900">Vikram Singh</h3>
                 <p className="text-brand-600 text-sm font-medium uppercase">Co-Founder & COO</p>
              </div>

              {/* Leader 3 */}
              <div className="group">
                 <div className="overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Head of Product" />
                 </div>
                 <h3 className="font-bold text-xl text-stone-900">Priya Desai</h3>
                 <p className="text-brand-600 text-sm font-medium uppercase">Head of Product Innovation</p>
              </div>
           </div>
        </div>
      </section>
    </>
  );
};