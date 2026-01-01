import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Button, Input, Textarea, Card } from '../../components/UI';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FormService } from '../../services/form';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    const success = await FormService.submit('contact', data);
    setStatus(success ? 'success' : 'error');
  };

  const seoConfig = {
    title: "Contact JAYTEA | Customer Support & Feedback",
    description: "Get in touch with JAYTEA for support, feedback, or general inquiries. Find our headquarters address and contact details.",
    keywords: "contact jaytea, customer care, tea franchise support, mumbai office",
    noIndex: false
  };

  return (
    <>
      <SEOHead config={seoConfig} />
      
      <div className="bg-stone-50 min-h-screen">
        <div className="bg-stone-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-stone-300 max-w-xl mx-auto">
              Have a question about our menu, or want to share your experience? We are all ears.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 flex items-start gap-4">
                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Headquarters</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    1204, Solitaire Corporate Park,<br/>
                    Andheri East, Mumbai 400093
                  </p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Phone Support</h3>
                  <p className="text-sm text-stone-600 mb-1">+91 98765 43210</p>
                  <p className="text-xs text-stone-400">Mon-Sat, 9am to 7pm</p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Email Us</h3>
                  <p className="text-sm text-stone-600 mb-1">support@jaytea.com</p>
                  <p className="text-sm text-stone-600">franchise@jaytea.com</p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-10 shadow-lg">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                    <p className="text-stone-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
                    <Button onClick={() => setStatus('idle')} className="mt-6" variant="outline">Send Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900">Send us a Message</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input name="name" label="Full Name" placeholder="John Doe" required />
                      <Input name="phone" label="Phone Number" placeholder="+91..." required />
                    </div>
                    <Input name="email" type="email" label="Email Address" placeholder="john@example.com" required />
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-stone-700">Subject</label>
                      <select name="subject" className="flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Feedback">Feedback / Complaint</option>
                        <option value="Franchise">Franchise Question</option>
                        <option value="Jobs">Careers</option>
                      </select>
                    </div>
                    <Textarea name="message" label="Your Message" rows={5} placeholder="How can we help you?" required />
                    
                    <Button type="submit" disabled={status === 'submitting'} className="w-full text-lg py-3">
                      {status === 'submitting' ? 'Sending...' : 'SendMessage'}
                    </Button>
                    {status === 'error' && <p className="text-center text-red-500 text-sm">Something went wrong. Please try again.</p>}
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};