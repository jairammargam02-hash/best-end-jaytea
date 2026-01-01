import React, { useState, useEffect, useRef } from 'react';
import { CMSService } from '../../services/cms';
import { ContentPage, BlogPost, SEOConfig, PageHistorySnapshot } from '../../types';
import { Button, Input, Textarea, Card, HTMLRichTextEditor } from '../../components/UI';
import { Save, Globe, Search, Code, Share2, Type, Plus, Trash2, ExternalLink, HelpCircle, Eye, Upload, X, ImageIcon, AlertTriangle, RotateCcw, CheckCircle, BarChart, Link as LinkIcon, Copy } from 'lucide-react';

const SCHEMA_TEMPLATES = {
  Organization: `{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "url": "https://www.jaytea.com",\n  "logo": "https://www.jaytea.com/logo.png"\n}`,
  LocalBusiness: `{\n  "@context": "https://schema.org",\n  "@type": "CafeOrCoffeeShop",\n  "name": "JAYTEA Outlet",\n  "image": "https://www.jaytea.com/store.jpg",\n  "priceRange": "$",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "123 Tea Street",\n    "addressLocality": "Mumbai",\n    "postalCode": "400001",\n    "addressCountry": "IN"\n  }\n}`,
  FAQ: `{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [{\n    "@type": "Question",\n    "name": "What is the cost?",\n    "acceptedAnswer": {\n      "@type": "Answer",\n      "text": "The cost starts at 5 Lakhs."\n    }\n  }]\n}`
};

export const PageEditor: React.FC = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentPage | null>(null);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error' | 'warning'} | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'history'>('content');
  const [activeSEOTab, setActiveSEOTab] = useState<'basic' | 'social' | 'advanced'>('basic');
  const [isNewPage, setIsNewPage] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Link Builder State
  const [linkBuilder, setLinkBuilder] = useState({ target: '', text: '' });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(formData) {
      setValidationErrors(CMSService.validatePageSEO(formData));
    }
  }, [formData]);

  const loadData = () => {
    setPages(CMSService.getAllPages());
    setBlogs(CMSService.getAllBlogs(true));
  };

  useEffect(() => {
    if (selectedPageId) {
      const page = pages.find(p => p.id === selectedPageId);
      if (page) {
        setFormData(JSON.parse(JSON.stringify(page))); // Deep copy
        setIsNewPage(false);
        setValidationErrors([]);
        setActiveTab('content');
      }
    }
  }, [selectedPageId, pages]);

  const handleCreateNew = () => {
    const newPage = CMSService.createEmptyPage();
    setFormData(newPage);
    setSelectedPageId(null);
    setIsNewPage(true);
    setActiveTab('content');
  };

  const handleDelete = () => {
    if (!formData) return;
    if (formData.slug === '/') {
      setNotification({ msg: 'Cannot delete the Home page.', type: 'error' });
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${formData.title}"?`)) {
      if (!isNewPage) CMSService.deletePage(formData.id);
      loadData();
      setFormData(null);
      setSelectedPageId(null);
      setNotification({ msg: 'Page deleted.', type: 'success' });
    }
  };

  const handleSave = () => {
    if (formData) {
      if (!formData.title || !formData.slug) {
        setNotification({ msg: 'Title and Slug are required.', type: 'error' });
        return;
      }
      
      const errors = CMSService.validatePageSEO(formData);
      if (errors.length > 0) {
        setNotification({ msg: 'SEO Issues detected. Saved, but please review.', type: 'warning' });
      }

      if (isNewPage) {
        const exists = pages.find(p => p.slug === formData.slug);
        if (exists) {
           setNotification({ msg: 'Slug already exists.', type: 'error' });
           return;
        }
      }

      CMSService.savePage(formData);
      loadData();
      if (isNewPage) setSelectedPageId(formData.id);
      setNotification({ msg: 'Page saved successfully!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRollback = (snapshot: PageHistorySnapshot) => {
    if (!window.confirm(`Rollback to version from ${new Date(snapshot.savedAt).toLocaleString()}? Unsaved changes will be lost.`)) return;
    
    if (formData) {
       const restoredData = { ...formData, ...snapshot.data };
       setFormData(restoredData);
       setNotification({ msg: 'Restored previous version. Click Save to apply.', type: 'success' });
       setActiveTab('content');
    }
  };

  const handleApplyTemplate = (templateKey: keyof typeof SCHEMA_TEMPLATES) => {
    if (formData) {
      setFormData({
        ...formData,
        seo: { ...formData.seo, jsonLd: SCHEMA_TEMPLATES[templateKey] }
      });
    }
  };

  const handleSEOChange = (key: keyof SEOConfig, value: string | boolean) => {
    if (formData) {
      setFormData({
        ...formData,
        seo: { ...formData.seo, [key]: value }
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData) {
      if (file.size > 2 * 1024 * 1024) {
        setNotification({ msg: 'Image size too large (Max 2MB)', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateInternalLink = () => {
    if(!linkBuilder.target) return "";
    return `<a href="${linkBuilder.target}" title="${linkBuilder.text}">${linkBuilder.text || 'Read more'}</a>`;
  };

  const copyToClipboard = (text: string) => {
     navigator.clipboard.writeText(text);
     setNotification({ msg: 'Copied to clipboard!', type: 'success' });
     setTimeout(() => setNotification(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const isJsonValid = (json: string) => {
    if (!json) return true;
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold font-serif text-stone-900">Page & SEO Manager</h1>
           <p className="text-sm text-stone-500">Enterprise Content Management</p>
        </div>
        <div className="flex gap-4 items-center">
          {notification && (
            <div className={`px-4 py-2 rounded-md text-sm border animate-fade-in ${
              notification.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 
              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-red-100 text-red-800 border-red-200'
            }`}>
              {notification.msg}
            </div>
          )}
          <Button onClick={handleCreateNew} size="sm" className="flex items-center gap-2">
            <Plus size={16} /> Create New Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <Card className="overflow-hidden h-fit sticky top-6">
            <div className="bg-stone-50 p-3 border-b border-stone-200 font-medium text-sm text-stone-500 uppercase flex justify-between items-center">
              <span>Pages</span>
              <span className="bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded text-xs">{pages.length}</span>
            </div>
            <div className="divide-y divide-stone-100 max-h-[70vh] overflow-y-auto">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPageId(page.id)}
                  className={`w-full text-left px-4 py-3 text-sm flex justify-between items-center transition-colors hover:bg-stone-50 ${
                    selectedPageId === page.id ? 'bg-brand-50 text-brand-700 border-l-4 border-l-brand-500' : ''
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{page.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${page.status === 'published' ? 'bg-green-500' : page.status === 'draft' ? 'bg-stone-400' : 'bg-red-400'}`}></span>
                      <span className="text-[10px] text-stone-400 uppercase">{page.status}</span>
                    </div>
                  </div>
                  <div className={`text-[10px] px-1.5 rounded border ${getScoreColor(page.seo.score || 0)}`}>
                    {page.seo.score || 0}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Editor Area */}
        <div className="col-span-12 md:col-span-9">
          {formData ? (
            <div className="space-y-6">
              
              {/* Top Meta Card */}
              <Card className="p-6 bg-white border-t-4 border-t-brand-500 shadow-md">
                 <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-bold text-xl text-stone-900">
                          {isNewPage ? 'New Page' : formData.title}
                        </h2>
                        {!isNewPage && (
                           <div className="flex gap-2">
                             <a href={`#${formData.slug}`} target="_blank" rel="noreferrer" className="bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-1 rounded text-xs flex items-center gap-1">
                               <ExternalLink size={12}/> View Live
                             </a>
                           </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Status Selector */}
                      <select 
                         value={formData.status}
                         onChange={e => setFormData({...formData, status: e.target.value as any})}
                         className={`px-3 py-1.5 rounded-md text-sm font-bold border ${
                            formData.status === 'published' ? 'bg-green-100 text-green-800 border-green-200' : 
                            formData.status === 'draft' ? 'bg-stone-100 text-stone-600 border-stone-200' : 
                            'bg-red-50 text-red-600 border-red-200'
                         }`}
                      >
                         <option value="draft">Draft</option>
                         <option value="published">Published</option>
                         <option value="archived">Archived</option>
                      </select>
                    </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <Input 
                         label="Page Title" 
                         value={formData.title} 
                         onChange={e => setFormData({...formData, title: e.target.value})} 
                       />
                       <div className="flex gap-4">
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-stone-700 mb-1">Page Type</label>
                           <select 
                             value={formData.pageType || 'landing'} 
                             onChange={e => setFormData({...formData, pageType: e.target.value as any})}
                             className="flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm"
                           >
                              <option value="landing">Landing Page</option>
                              <option value="service">Service/Product</option>
                              <option value="conversion">Conversion/Form</option>
                              <option value="blog-hub">Blog Hub</option>
                           </select>
                         </div>
                       </div>
                    </div>
                    <div>
                      <Input 
                        label="Slug (URL Path)" 
                        value={formData.slug} 
                        onChange={e => setFormData({...formData, slug: e.target.value})}
                        disabled={!isNewPage}
                        className={!isNewPage ? "bg-stone-50 cursor-not-allowed" : ""}
                      />
                      <div className="mt-4 p-3 bg-stone-50 rounded border border-stone-200 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-bold text-stone-500 uppercase">SEO Score</p>
                            <p className={`text-xl font-bold ${getScoreColor(formData.seo.score || 0).split(' ')[0]}`}>{formData.seo.score || 0}/100</p>
                         </div>
                         <BarChart className="text-stone-300" size={32} />
                      </div>
                    </div>
                 </div>
              </Card>

              {/* Tabs */}
              <div className="flex border-b border-stone-200">
                <button onClick={() => setActiveTab('content')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'content' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-stone-500 hover:text-stone-700'}`}>
                  <Type size={18} /> Content
                </button>
                <button onClick={() => setActiveTab('seo')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'seo' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-stone-500 hover:text-stone-700'}`}>
                  <Search size={18} /> SEO & Schema
                </button>
                <button onClick={() => setActiveTab('history')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'history' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-stone-500 hover:text-stone-700'}`}>
                  <RotateCcw size={18} /> History ({formData.history?.length || 0})
                </button>
              </div>

              {/* TAB: CONTENT */}
              {activeTab === 'content' && (
                <div className="animate-in fade-in duration-300 space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <Card className="p-6">
                        <h3 className="font-bold mb-3 text-sm text-stone-700">Hero Image</h3>
                        {!formData.coverImage ? (
                          <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 bg-stone-50 text-center cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => fileInputRef.current?.click()}>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            <ImageIcon className="mx-auto text-stone-400 mb-2" />
                            <p className="text-sm">Click to upload</p>
                          </div>
                        ) : (
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-stone-100 group">
                            <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                            <button onClick={() => setFormData({...formData, coverImage: ''})} className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:text-red-600 shadow-sm"><X size={16} /></button>
                          </div>
                        )}
                      </Card>
                      
                      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-4">
                        <HTMLRichTextEditor value={formData.content} onChange={(val) => setFormData({...formData, content: val})} />
                      </div>
                    </div>

                    {/* Content Helpers Sidebar */}
                    <div className="space-y-4">
                       {/* Simplified Internal Linking for Content Tab */}
                       <Card className="p-4 bg-stone-50">
                          <h4 className="font-bold text-xs text-stone-500 uppercase mb-3">Quick Links</h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {pages.filter(p => p.id !== formData.id).map(p => (
                               <button 
                                 key={p.id} 
                                 onClick={() => copyToClipboard(`<a href="#${p.slug}">${p.title}</a>`)}
                                 className="flex items-center justify-between w-full text-left px-3 py-2 bg-white border border-stone-200 rounded text-xs hover:border-brand-300 group"
                               >
                                  <span className="truncate w-24">{p.title}</span>
                                  <Copy size={12} className="text-stone-400 group-hover:text-brand-600"/>
                               </button>
                            ))}
                          </div>
                       </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SEO */}
              {activeTab === 'seo' && (
                <div className="animate-in fade-in duration-300">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3 space-y-1">
                       <button onClick={() => setActiveSEOTab('basic')} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeSEOTab === 'basic' ? 'bg-blue-50 text-blue-700' : 'hover:bg-stone-100'}`}>Basic Meta</button>
                       <button onClick={() => setActiveSEOTab('social')} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeSEOTab === 'social' ? 'bg-purple-50 text-purple-700' : 'hover:bg-stone-100'}`}>Social Media</button>
                       <button onClick={() => setActiveSEOTab('advanced')} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeSEOTab === 'advanced' ? 'bg-orange-50 text-orange-700' : 'hover:bg-stone-100'}`}>Schema (JSON-LD)</button>
                    </div>

                    <div className="col-span-9">
                      <Card className="p-6 min-h-[400px]">
                        {/* Validation Warnings */}
                        {validationErrors.length > 0 && (
                          <div className="mb-6 bg-amber-50 border border-amber-200 rounded p-4">
                             <h4 className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2"><AlertTriangle size={16}/> Optimization Required</h4>
                             <ul className="list-disc list-inside text-xs text-amber-700 space-y-1">
                               {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                             </ul>
                          </div>
                        )}

                        {activeSEOTab === 'basic' && (
                          <div className="space-y-6">
                              {/* Live Preview */}
                              <div className="bg-white border rounded-lg p-4">
                                <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Google Search Preview</h4>
                                <div className="max-w-[600px] font-sans">
                                   <div className="flex items-center gap-2 mb-1">
                                      <div className="w-7 h-7 bg-stone-100 rounded-full flex items-center justify-center border text-[10px]">Logo</div>
                                      <div>
                                         <div className="text-xs text-stone-800">JAYTEA</div>
                                         <div className="text-xs text-stone-500">https://www.jaytea.com {formData.slug === '/' ? '' : `› ${formData.slug.replace(/^\//, '')}`}</div>
                                      </div>
                                   </div>
                                   <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-snug truncate">
                                      {formData.seo.title || formData.title}
                                   </div>
                                   <div className="text-sm text-[#4d5156] line-clamp-2">
                                      {formData.seo.description || "No description provided. Google will generate one from the page content."}
                                   </div>
                                </div>
                              </div>

                              <div className="space-y-4 pt-4 border-t">
                                <Input label="Meta Title" value={formData.seo.title} onChange={e => handleSEOChange('title', e.target.value)} placeholder="Title | JAYTEA" />
                                <p className={`text-xs text-right ${formData.seo.title.length > 60 ? 'text-red-500' : 'text-stone-400'}`}>{formData.seo.title.length}/60 chars</p>
                                
                                <Textarea label="Meta Description" rows={3} value={formData.seo.description} onChange={e => handleSEOChange('description', e.target.value)} placeholder="Summary..." />
                                <p className={`text-xs text-right ${formData.seo.description.length > 160 ? 'text-red-500' : 'text-stone-400'}`}>{formData.seo.description.length}/160 chars</p>
                                
                                <Input label="Canonical URL" value={formData.seo.canonicalUrl || ''} onChange={e => handleSEOChange('canonicalUrl', e.target.value)} />
                                
                                <Input label="Author" value={formData.seo.author || ''} onChange={e => handleSEOChange('author', e.target.value)} placeholder="e.g. JAYTEA Team" />
                              </div>

                              {/* Internal Linking Generator */}
                              <div className="bg-stone-50 p-4 rounded border">
                                 <h4 className="font-bold text-sm text-stone-700 mb-2">Internal Linking Tool</h4>
                                 <p className="text-xs text-stone-500 mb-3">Select a page to generate an HTML link tag.</p>
                                 <div className="flex gap-2 mb-2">
                                    <select 
                                      className="flex-1 h-9 border rounded text-sm px-2"
                                      value={linkBuilder.target}
                                      onChange={e => setLinkBuilder({...linkBuilder, target: e.target.value})}
                                    >
                                       <option value="">-- Select Target --</option>
                                       <optgroup label="Pages">
                                         {pages.map(p => <option key={p.id} value={`#${p.slug}`}>{p.title}</option>)}
                                       </optgroup>
                                       <optgroup label="Blog Posts">
                                         {blogs.map(b => <option key={b.id} value={`#/blog/${b.slug}`}>{b.title}</option>)}
                                       </optgroup>
                                    </select>
                                    <input 
                                       type="text" 
                                       placeholder="Anchor Text" 
                                       className="flex-1 h-9 border rounded text-sm px-2"
                                       value={linkBuilder.text}
                                       onChange={e => setLinkBuilder({...linkBuilder, text: e.target.value})}
                                    />
                                 </div>
                                 {linkBuilder.target && (
                                   <div className="flex gap-2">
                                      <code className="flex-1 bg-white border p-2 text-xs font-mono rounded text-stone-600 truncate">
                                        {generateInternalLink()}
                                      </code>
                                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(generateInternalLink())}>Copy</Button>
                                   </div>
                                 )}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                 <div className="space-y-1">
                                    <label className="block text-sm font-medium text-stone-700">Sitemap Priority</label>
                                    <select 
                                      value={formData.sitemap?.priority || '0.5'} 
                                      onChange={e => setFormData({...formData, sitemap: { changeFrequency: 'monthly', ...(formData.sitemap || {}), priority: e.target.value }})}
                                      className="w-full h-9 border rounded text-sm px-2"
                                    >
                                       <option value="1.0">1.0 (Critical)</option>
                                       <option value="0.9">0.9</option>
                                       <option value="0.8">0.8 (Major)</option>
                                       <option value="0.5">0.5 (Standard)</option>
                                       <option value="0.3">0.3</option>
                                    </select>
                                 </div>
                                 <div className="space-y-1">
                                    <label className="block text-sm font-medium text-stone-700">Change Frequency</label>
                                    <select 
                                      value={formData.sitemap?.changeFrequency || 'monthly'} 
                                      onChange={e => setFormData({...formData, sitemap: { priority: '0.5', ...(formData.sitemap || {}), changeFrequency: e.target.value as any }})}
                                      className="w-full h-9 border rounded text-sm px-2"
                                    >
                                       <option value="daily">Daily</option>
                                       <option value="weekly">Weekly</option>
                                       <option value="monthly">Monthly</option>
                                       <option value="yearly">Yearly</option>
                                    </select>
                                 </div>
                              </div>

                              <label className="flex items-center gap-3 mt-4 border p-3 rounded bg-stone-50">
                                <input type="checkbox" checked={formData.seo.noIndex} onChange={e => handleSEOChange('noIndex', e.target.checked)} className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-medium text-red-700">NoIndex (Hide from Google)</span>
                              </label>
                          </div>
                        )}

                        {activeSEOTab === 'social' && (
                          <div className="space-y-4">
                             <Input label="OG Title" value={formData.seo.ogTitle || ''} onChange={e => handleSEOChange('ogTitle', e.target.value)} />
                             <Textarea label="OG Description" rows={2} value={formData.seo.ogDescription || ''} onChange={e => handleSEOChange('ogDescription', e.target.value)} />
                             <Input label="OG Image URL" value={formData.seo.ogImage || ''} onChange={e => handleSEOChange('ogImage', e.target.value)} />
                          </div>
                        )}

                        {activeSEOTab === 'advanced' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2">
                               <p className="font-bold text-sm">Structured Data</p>
                               <div className="flex gap-2">
                                  {Object.keys(SCHEMA_TEMPLATES).map(key => (
                                    <button 
                                      key={key}
                                      onClick={() => handleApplyTemplate(key as any)}
                                      className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100"
                                    >
                                      + {key}
                                    </button>
                                  ))}
                               </div>
                            </div>
                            <Textarea 
                                rows={12}
                                value={formData.seo.jsonLd || ''}
                                onChange={e => handleSEOChange('jsonLd', e.target.value)}
                                className={`font-mono text-xs ${!isJsonValid(formData.seo.jsonLd || '') && formData.seo.jsonLd ? 'bg-red-50 border-red-300' : 'bg-stone-50'}`}
                                placeholder="{ ... }"
                            />
                            <div className="flex justify-between items-center">
                              {!isJsonValid(formData.seo.jsonLd || '') && formData.seo.jsonLd ? (
                                <span className="text-xs text-red-600 font-bold flex items-center gap-1"><AlertTriangle size={12}/> Invalid JSON Syntax</span>
                              ) : (
                                <span></span>
                              )}
                              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                 Validate via Google <ExternalLink size={10}/>
                              </a>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: HISTORY */}
              {activeTab === 'history' && (
                <div className="animate-in fade-in duration-300">
                  <Card className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><RotateCcw size={20}/> Version History</h3>
                    {!formData.history || formData.history.length === 0 ? (
                      <p className="text-stone-500 text-sm">No history available yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {formData.history.map((snap, idx) => (
                           <div key={snap.versionId} className="flex items-center justify-between p-3 border rounded bg-stone-50 hover:bg-stone-100">
                              <div>
                                <p className="font-bold text-sm text-stone-800">Version {formData.history!.length - idx}</p>
                                <p className="text-xs text-stone-500">{new Date(snap.savedAt).toLocaleString()} by {snap.savedBy}</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => handleRollback(snap)}>Restore</Button>
                           </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex justify-between items-center sticky bottom-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow border border-stone-200 z-10">
                <Button variant="danger" size="sm" onClick={handleDelete} disabled={isNewPage} className={isNewPage ? 'invisible' : ''}>
                  <Trash2 size={16} className="mr-2"/> Delete
                </Button>
                <div className="flex gap-3 items-center">
                  <Button variant="ghost" onClick={() => { setFormData(null); setSelectedPageId(null); setIsNewPage(false); }}>Cancel</Button>
                  <Button onClick={handleSave} className="flex items-center gap-2 px-6">
                    <Save size={18} /> {isNewPage ? 'Create & Save' : 'Save Changes'}
                  </Button>
                </div>
              </div>

            </div>
          ) : (
             <div className="h-96 flex flex-col items-center justify-center text-stone-400 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200">
               <Globe size={48} className="mb-4 opacity-20" />
               <p className="text-lg font-medium">Select a page to edit</p>
               <Button onClick={handleCreateNew} variant="outline" className="flex items-center gap-2 mt-4">
                 <Plus size={16} /> Create New Page
               </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};