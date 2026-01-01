import React, { useState } from 'react';
import { CMSService } from '../../services/cms';
import { FormService } from '../../services/form';
import { SEOHead } from '../../components/SEOHead';
import { Button, Input, Textarea, Card } from '../../components/UI';
import { CheckCircle, MapPin, DollarSign, Store, Briefcase, ChevronDown } from 'lucide-react';

export const Franchise: React.FC = () => {
  const pageData = CMSService.getPageBySlug('/franchise') || CMSService.getAllPages()[0]; 
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Save locally AND send to Formspree
    await FormService.submit('franchise', data);
    
    setFormState('success');
  };

  return (
    <>
      <SEOHead config={pageData.seo} />
      
      {/* Franchise Hero */}
      <div className="relative bg-stone-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20" alt="Cafe Interior" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
           <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Build a Legacy with <span className="text-brand-500">JAYTEA</span></h1>
            <p className="text-stone-300 text-xl max-w-xl leading-relaxed">
              Join India's fastest-growing tea cafe network. A profitable, sustainable, and scalable business model awaits you.
            </p>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 grid xl:grid-cols-12 gap-16">
        {/* Content Side */}
        <div className="xl:col-span-7 space-y-16">
          
          {/* Intro Text */}
          <div className="prose prose-lg prose-stone max-w-none">
            <h2 className="font-serif text-3xl font-bold text-stone-900">Why the Tea Business?</h2>
            <p>
              The Indian food and beverage industry is witnessing a massive shift. While coffee shops have saturated the market, the organized tea cafe segment is just getting started. <strong>India consumes 837,000 tonnes of tea annually</strong>, yet 90% of the market is unorganized.
            </p>
            <p>
              JAYTEA offers you the opportunity to tap into this massive demand with a branded, hygienic, and premium experience. By taking a JAYTEA franchise, you are not just opening a shop; you are entering a high-growth ecosystem supported by industry experts, robust supply chains, and powerful marketing.
            </p>
          </div>

          {/* Franchise Models */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">Choose Your Model</h2>
            <div className="grid gap-6">
              <Card className="p-8 border-l-8 border-l-brand-500 hover:shadow-lg transition-shadow bg-stone-50/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-2xl text-stone-900 flex items-center gap-2">
                      <Store className="text-brand-600" /> Kiosk Model
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">Perfect for high-footfall areas</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                <p className="text-stone-600 mb-6">
                  A compact, takeaway-focused model designed for malls, metro stations, tech parks, and busy high streets. Low operational cost, high volume.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Area Required</span>
                    <span className="font-bold text-stone-800">100 - 200 Sq.Ft</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Investment</span>
                    <span className="font-bold text-stone-800">₹ 5 - 8 Lakhs</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">ROI Period</span>
                    <span className="font-bold text-stone-800">9 - 12 Months</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Staff</span>
                    <span className="font-bold text-stone-800">2 - 3 People</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-l-8 border-l-stone-700 hover:shadow-lg transition-shadow bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-2xl text-stone-900 flex items-center gap-2">
                      <Briefcase className="text-stone-700" /> Cafe Model
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">The complete experiential store</p>
                  </div>
                  <span className="bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>
                </div>
                <p className="text-stone-600 mb-6">
                  A dine-in experience where customers can relax, work, and socialize. Offers an extended food menu including sandwiches, maggi, and desserts.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-stone-50 p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Area Required</span>
                    <span className="font-bold text-stone-800">400 - 800 Sq.Ft</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Investment</span>
                    <span className="font-bold text-stone-800">₹ 15 - 20 Lakhs</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">ROI Period</span>
                    <span className="font-bold text-stone-800">14 - 18 Months</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded border border-stone-200">
                    <span className="block text-stone-400 text-xs font-bold uppercase">Staff</span>
                    <span className="font-bold text-stone-800">4 - 6 People</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Support Section */}
          <div>
             <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">We Support You at Every Step</h2>
             <div className="grid md:grid-cols-2 gap-6">
                {[
                  {title: "Site Selection", desc: "Our team helps you identify high-potential locations using data analytics."},
                  {title: "Store Design", desc: "Complete architectural and interior design guidelines provided to ensure brand consistency."},
                  {title: "Hiring & Training", desc: "We help recruit staff and provide them intensive 15-day training at our HQ."},
                  {title: "Supply Chain", desc: "Centralized procurement for tea, spices, and branded merchandise to ensure quality."},
                  {title: "Marketing", desc: "National level digital marketing campaigns and local store launch support."},
                  {title: "Technology", desc: "Access to our proprietary POS system for inventory and sales tracking."}
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 bg-brand-100 p-2 rounded-full h-fit text-brand-600">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="text-sm text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          
          {/* FAQ Accordion */}
          <div className="border-t pt-8">
             <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
             <div className="space-y-4">
               <details className="group border border-stone-200 rounded-lg open:bg-stone-50">
                 <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-stone-900">
                   Do I need prior experience in the tea business?
                   <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
                 </summary>
                 <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed">
                   Not at all. We look for passion and commitment. Our comprehensive training program covers everything from brewing tea to managing finances.
                 </div>
               </details>
               <details className="group border border-stone-200 rounded-lg open:bg-stone-50">
                 <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-stone-900">
                   What is the term of the franchise agreement?
                   <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
                 </summary>
                 <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed">
                   The standard franchise agreement is for 5 years, renewable upon mutual agreement.
                 </div>
               </details>
               <details className="group border border-stone-200 rounded-lg open:bg-stone-50">
                 <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-stone-900">
                   How long does it take to open a store?
                   <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
                 </summary>
                 <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed">
                   Typically, it takes 30-45 days from signing the agreement to the grand opening, depending on the interior work required.
                 </div>
               </details>
             </div>
          </div>

        </div>

        {/* Form Side */}
        <div className="xl:col-span-5">
          <div className="sticky top-24">
            <Card className="p-8 shadow-2xl border-t-4 border-t-brand-600 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <DollarSign size={100} />
              </div>
              
              <div className="relative z-10">
                {formState === 'success' ? (
                  <div className="text-center py-10">
                    <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Application Received</h3>
                    <p className="text-stone-600 mb-4">We will review your profile and send the Franchise Information Memorandum (FIM) to your email shortly.</p>
                    <Button onClick={() => setFormState('idle')} variant="outline">Start New Application</Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif font-bold mb-2">Franchise Enquiry</h3>
                    <p className="text-stone-500 text-sm mb-6">Fill out the form below to receive our detailed Franchise Information Memorandum (FIM).</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="form-type" value="franchise" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input name="firstName" label="First Name" placeholder="Rahul" required />
                        <Input name="lastName" label="Last Name" placeholder="Sharma" required />
                      </div>
                      
                      <Input name="email" type="email" label="Email Address" placeholder="rahul@example.com" required />
                      <Input name="phone" type="tel" label="Phone Number" placeholder="+91 98765 43210" required />
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-stone-700">Interested City</label>
                        <select name="city" className="flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
                          <option value="">Select a city</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Pune">Pune</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-stone-700">Investment Budget</label>
                        <select name="budget" className="flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
                          <option value="5-10L">₹5 - 10 Lakhs (Kiosk)</option>
                          <option value="10-20L">₹10 - 20 Lakhs (Cafe)</option>
                          <option value="20L+">Above ₹20 Lakhs (Master Franchise)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                         <label className="block text-sm font-medium text-stone-700">Do you own commercial space?</label>
                         <div className="flex gap-4 mt-2">
                           <label className="flex items-center text-sm">
                             <input type="radio" name="ownSpace" value="yes" className="mr-2 text-brand-600 focus:ring-brand-500" /> Yes
                           </label>
                           <label className="flex items-center text-sm">
                             <input type="radio" name="ownSpace" value="no" className="mr-2 text-brand-600 focus:ring-brand-500" defaultChecked /> No
                           </label>
                         </div>
                      </div>

                      <Textarea name="message" label="Why do you want to partner with us?" rows={3} placeholder="Tell us a bit about your background..." />
                      
                      <Button type="submit" disabled={formState === 'submitting'} className="w-full text-lg py-3 mt-4 bg-brand-600 hover:bg-brand-700 transition-colors">
                         {formState === 'submitting' ? 'Sending...' : 'Submit Application'}
                      </Button>
                      <p className="text-xs text-stone-400 text-center mt-3">
                        By submitting, you agree to our privacy policy. Your data is secure.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Card>
            
            <div className="mt-8 bg-stone-900 text-white p-6 rounded-xl flex items-center gap-4">
              <div className="bg-stone-800 p-3 rounded-full">
                 <MapPin />
              </div>
              <div>
                 <p className="text-xs text-stone-400 uppercase font-bold tracking-wider">Headquarters</p>
                 <p className="font-bold">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};