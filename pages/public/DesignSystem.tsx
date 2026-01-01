import React from 'react';
import { Button, Input, Textarea, Card } from '../../components/UI';
import { SEOHead } from '../../components/SEOHead';

export const DesignSystem: React.FC = () => {
  return (
    <>
      <SEOHead config={{ title: "Design System | JAYTEA", description: "UI Kit and Design Guidelines", keywords: "design system", noIndex: true }} />
      <div className="bg-stone-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">JAYTEA Design System</h1>
            <p className="text-stone-600">A unified design language for our digital presence.</p>
          </div>

          {/* Colors */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-stone-800 mb-6 border-b pb-2">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                <div key={weight} className="space-y-2">
                  <div className={`h-20 rounded-lg shadow-sm bg-brand-${weight}`}></div>
                  <p className="text-xs font-mono text-stone-500">brand-{weight}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
               <div className="space-y-2">
                 <div className="h-20 rounded-lg bg-stone-900"></div>
                 <p className="text-xs font-mono text-stone-500">stone-900 (Text/Bg)</p>
               </div>
               <div className="space-y-2">
                 <div className="h-20 rounded-lg bg-white border border-stone-200"></div>
                 <p className="text-xs font-mono text-stone-500">white (Surface)</p>
               </div>
               <div className="space-y-2">
                 <div className="h-20 rounded-lg bg-red-600"></div>
                 <p className="text-xs font-mono text-stone-500">red-600 (Error)</p>
               </div>
            </div>
          </section>

          {/* Typography */}
          <section className="mb-16">
             <h2 className="text-xl font-bold text-stone-800 mb-6 border-b pb-2">Typography</h2>
             <div className="space-y-6">
                <div className="grid grid-cols-3 gap-8 items-end">
                   <span className="text-stone-400 text-sm">Font Family</span>
                   <div className="col-span-2 space-y-2">
                     <p className="font-serif text-4xl">Playfair Display</p>
                     <p className="font-sans text-4xl">Inter Sans</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-8 items-end">
                   <span className="text-stone-400 text-sm">Headings</span>
                   <div className="col-span-2 space-y-4">
                     <h1 className="font-serif text-6xl font-bold">Heading 1</h1>
                     <h2 className="font-serif text-5xl font-bold">Heading 2</h2>
                     <h3 className="font-serif text-4xl font-bold">Heading 3</h3>
                     <h4 className="font-serif text-2xl font-bold">Heading 4</h4>
                   </div>
                </div>
             </div>
          </section>

          {/* Components */}
          <section className="mb-16">
             <h2 className="text-xl font-bold text-stone-800 mb-6 border-b pb-2">Components</h2>
             
             <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <h3 className="text-sm uppercase font-bold text-stone-400">Buttons</h3>
                   <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                   </div>
                   <div className="flex flex-wrap gap-4 items-center">
                      <Button size="lg">Large</Button>
                      <Button size="md">Medium</Button>
                      <Button size="sm">Small</Button>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-sm uppercase font-bold text-stone-400">Inputs</h3>
                   <div className="space-y-4 max-w-sm">
                      <Input label="Default Input" placeholder="Type something..." />
                      <Input label="Error State" placeholder="Invalid input" error="This field is required" />
                      <Textarea label="Textarea" placeholder="Enter message..." />
                   </div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </>
  );
};