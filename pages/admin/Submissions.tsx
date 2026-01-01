import React, { useState, useEffect } from 'react';
import { FormService } from '../../services/form';
import { FormSubmission } from '../../types';
import { Card, Button } from '../../components/UI';
import { MessageSquare, Mail, Phone, MapPin, Check } from 'lucide-react';

export const Submissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    loadData();
    // Poll for new simulated submissions every 5s
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setSubmissions(FormService.getSubmissions());
  };

  const markRead = (id: string) => {
    FormService.markAsRead(id);
    loadData();
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-serif text-stone-900">Form Submissions</h1>
        <p className="text-sm text-stone-500">Inquiries from Contact and Franchise forms.</p>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed text-stone-400">
            No submissions yet.
          </div>
        ) : (
          submissions.map(sub => (
            <Card key={sub.id} className={`p-6 transition-colors ${sub.status === 'new' ? 'bg-white border-brand-200 ring-1 ring-brand-100' : 'bg-stone-50 border-stone-200 opacity-80'}`}>
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${sub.type === 'franchise' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                     {sub.type}
                   </span>
                   <span className="text-xs text-stone-400">
                     {new Date(sub.date).toLocaleString()}
                   </span>
                   {sub.status === 'new' && <span className="text-xs bg-red-100 text-red-600 px-2 rounded-full font-bold">NEW</span>}
                 </div>
                 {sub.status === 'new' && (
                   <Button size="sm" variant="outline" onClick={() => markRead(sub.id)} className="flex items-center gap-1">
                     <Check size={14} /> Mark Read
                   </Button>
                 )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                 <div>
                   <p className="text-stone-500 text-xs uppercase font-bold mb-1">Contact Details</p>
                   <div className="space-y-1">
                     {sub.data.name && <p className="font-bold text-lg">{sub.data.name}</p>}
                     {sub.data.firstName && <p className="font-bold text-lg">{sub.data.firstName} {sub.data.lastName}</p>}
                     <p className="flex items-center gap-2 text-stone-600"><Mail size={14}/> {sub.data.email}</p>
                     <p className="flex items-center gap-2 text-stone-600"><Phone size={14}/> {sub.data.phone}</p>
                     {sub.data.city && <p className="flex items-center gap-2 text-stone-600"><MapPin size={14}/> {sub.data.city}</p>}
                   </div>
                 </div>
                 
                 <div>
                   <p className="text-stone-500 text-xs uppercase font-bold mb-1">Message / Data</p>
                   <div className="bg-stone-100 p-3 rounded text-stone-700 whitespace-pre-wrap">
                     {sub.data.message || "No message provided."}
                   </div>
                   {sub.data.budget && (
                     <div className="mt-2 text-xs">
                       <span className="font-bold">Budget:</span> {sub.data.budget}
                     </div>
                   )}
                 </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};