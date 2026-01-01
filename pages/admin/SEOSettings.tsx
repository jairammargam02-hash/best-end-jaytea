import React, { useState, useEffect } from 'react';
import { CMSService } from '../../services/cms';
import { GlobalSEOSettings } from '../../types';
import { Button, Input, Textarea, Card } from '../../components/UI';
import { Save, Globe, AlertTriangle, CheckSquare, RotateCcw, ShieldAlert } from 'lucide-react';

export const SEOSettings: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSEOSettings | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setSettings(CMSService.getGlobalSEOSettings());
  }, []);

  const handleSave = () => {
    if (settings) {
      CMSService.saveGlobalSEOSettings(settings);
      setMsg('Global SEO Settings Saved!');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleResetProject = () => {
    const confirmText = prompt("WARNING: This will delete ALL pages, blogs, and submissions to prepare for a new client. Type 'RESET' to confirm.");
    if (confirmText === 'RESET') {
       CMSService.resetProject();
       alert("Project Reset Complete. The system is ready for a new client.");
       window.location.reload();
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-serif text-stone-900">SEO Control Center</h1>
        <p className="text-sm text-stone-500">Configure global defaults and SEO operations.</p>
      </div>

      <div className="grid gap-8">
        
        {/* Operations Checklist */}
        <Card className="p-6">
           <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-700"><CheckSquare size={20}/> SEO Launch Checklist</h2>
           <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded hover:bg-stone-50 cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={settings.googleSearchConsoleVerified || false}
                   onChange={e => setSettings({...settings, googleSearchConsoleVerified: e.target.checked})}
                   className="w-5 h-5 rounded text-blue-600"
                 />
                 <div className="flex-1">
                    <span className="font-medium text-stone-800">Google Search Console Verified</span>
                    <p className="text-xs text-stone-500">Domain ownership confirmed via HTML tag.</p>
                 </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded hover:bg-stone-50 cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={settings.sitemapSubmitted || false}
                   onChange={e => setSettings({...settings, sitemapSubmitted: e.target.checked})}
                   className="w-5 h-5 rounded text-blue-600"
                 />
                 <div className="flex-1">
                    <span className="font-medium text-stone-800">Sitemap Submitted</span>
                    <p className="text-xs text-stone-500">sitemap.xml URL submitted to Google.</p>
                 </div>
              </label>
           </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={20}/> Global Metadata Defaults</h2>
          <div className="space-y-6">
            <Input 
              label="Site Title Suffix" 
              value={settings.siteTitleSuffix} 
              onChange={e => setSettings({...settings, siteTitleSuffix: e.target.value})}
              placeholder=" | Brand Name"
            />
            <Textarea 
              label="Default Meta Description" 
              value={settings.defaultMetaDescription} 
              onChange={e => setSettings({...settings, defaultMetaDescription: e.target.value})}
              rows={3}
            />
            <Input 
              label="Default Open Graph Image URL" 
              value={settings.defaultOgImage} 
              onChange={e => setSettings({...settings, defaultOgImage: e.target.value})}
            />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500 bg-red-50/10">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700"><AlertTriangle size={20}/> Crawler Directive</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border rounded bg-white">
               <input 
                 type="radio" 
                 name="robots"
                 checked={settings.defaultRobotsPolicy === 'index, follow'}
                 onChange={() => setSettings({...settings, defaultRobotsPolicy: 'index, follow'})}
                 className="w-4 h-4 text-green-600"
               />
               <div>
                 <span className="font-bold block text-sm">Index, Follow (Production)</span>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded bg-white">
               <input 
                 type="radio" 
                 name="robots"
                 checked={settings.defaultRobotsPolicy === 'noindex, nofollow'}
                 onChange={() => setSettings({...settings, defaultRobotsPolicy: 'noindex, nofollow'})}
                 className="w-4 h-4 text-red-600"
               />
               <div>
                 <span className="font-bold block text-sm text-red-700">NoIndex, NoFollow (Maintenance)</span>
               </div>
            </label>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-4 border-t">
           <Button variant="danger" onClick={handleResetProject} className="flex items-center gap-2">
              <ShieldAlert size={16}/> Reset Project (Agency Mode)
           </Button>
           <div className="flex items-center gap-4">
              {msg && <span className="text-green-600 font-bold animate-pulse">{msg}</span>}
              <Button onClick={handleSave} className="px-8"><Save size={16} className="mr-2"/> Save Global Settings</Button>
           </div>
        </div>
      </div>
    </div>
  );
};