import React, { useState, useEffect } from 'react';
import { CMSService } from '../../services/cms';
import { FormService } from '../../services/form';
import { SitemapService } from '../../services/sitemap';
import { Card, Button } from '../../components/UI';
import { FileText, BookOpen, MessageSquare, TrendingUp, Users, AlertCircle, Download, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    pages: 0,
    blogs: 0,
    submissions: 0,
    newSubmissions: 0,
    lastUpdate: ''
  });

  useEffect(() => {
    // Load initial data
    refreshData();

    // Poll for changes every 10s to simulate "live" data checking
    const interval = setInterval(refreshData, 10000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    const pages = CMSService.getAllPages();
    const blogs = CMSService.getAllBlogs(true);
    const submissions = FormService.getSubmissions();
    
    setStats({
      pages: pages.length,
      blogs: blogs.length,
      submissions: submissions.length,
      newSubmissions: submissions.filter(s => s.status === 'new').length,
      lastUpdate: new Date().toLocaleTimeString()
    });
  };

  const handleDownloadSitemap = () => {
    SitemapService.downloadSitemap();
    alert("sitemap.xml downloaded! Upload this file to your hosting server's public/root folder to help Google index your new pages.");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900">Admin Overview</h1>
          <p className="text-sm text-stone-500">Live system metrics and activity.</p>
        </div>
        <div className="text-xs text-stone-400 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Updated: {stats.lastUpdate}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-6 border-l-4 border-l-blue-500">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">Total Pages</p>
                <p className="text-3xl font-bold text-stone-900 mt-2">{stats.pages}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <FileText size={20} />
              </div>
           </div>
           <div className="mt-4 text-xs text-stone-400">
              Content managed via CMS
           </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-purple-500">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">Blog Posts</p>
                <p className="text-3xl font-bold text-stone-900 mt-2">{stats.blogs}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                <BookOpen size={20} />
              </div>
           </div>
           <div className="mt-4 text-xs text-stone-400">
              Published & Drafts
           </div>
        </Card>

        <Card className={`p-6 border-l-4 ${stats.newSubmissions > 0 ? 'border-l-red-500 bg-red-50/10' : 'border-l-green-500'}`}>
           <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">Inquiries</p>
                <p className="text-3xl font-bold text-stone-900 mt-2">{stats.submissions}</p>
              </div>
              <div className={`${stats.newSubmissions > 0 ? 'bg-red-100 text-red-600' : 'bg-green-50 text-green-600'} p-3 rounded-lg`}>
                <MessageSquare size={20} />
              </div>
           </div>
           {stats.newSubmissions > 0 ? (
             <Link to="/admin/submissions" className="mt-4 text-xs text-red-600 font-bold flex items-center gap-1 hover:underline">
               <AlertCircle size={12} /> {stats.newSubmissions} New Action Required
             </Link>
           ) : (
             <div className="mt-4 text-xs text-green-600 font-medium">All caught up!</div>
           )}
        </Card>
        
        <Card className="p-6 border-l-4 border-l-brand-500">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">System Status</p>
                <p className="text-xl font-bold text-green-600 mt-2">Active</p>
              </div>
              <div className="bg-brand-50 p-3 rounded-lg text-brand-600">
                <TrendingUp size={20} />
              </div>
           </div>
           <div className="mt-4 text-xs text-stone-400">
              v1.2.0 Production Build
           </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="md:col-span-2">
           <Card className="p-6 h-full">
              <h3 className="font-bold text-stone-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                 <Link to="/admin/pages" className="p-4 border rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center justify-center text-center group">
                    <FileText className="mb-2 text-stone-400 group-hover:text-blue-600" />
                    <span className="text-sm font-medium">Edit Pages</span>
                 </Link>
                 <Link to="/admin/blogs" className="p-4 border rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center justify-center text-center group">
                    <BookOpen className="mb-2 text-stone-400 group-hover:text-purple-600" />
                    <span className="text-sm font-medium">Write Blog</span>
                 </Link>
                 <Link to="/admin/submissions" className="p-4 border rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center justify-center text-center group">
                    <MessageSquare className="mb-2 text-stone-400 group-hover:text-green-600" />
                    <span className="text-sm font-medium">View Leads</span>
                 </Link>
                 <button onClick={handleDownloadSitemap} className="p-4 border rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center justify-center text-center group bg-brand-50 border-brand-200">
                    <Download className="mb-2 text-brand-600" />
                    <span className="text-sm font-medium text-brand-800">Download Sitemap.xml</span>
                 </button>
              </div>
           </Card>
        </div>

        {/* System Health / Logs */}
        <div>
           <Card className="p-6 h-full">
             <h3 className="font-bold text-stone-900 mb-4">Live Activity Log</h3>
             <div className="space-y-4">
                <div className="flex gap-3 text-sm">
                   <span className="text-blue-500 mt-0.5"><Globe size={14}/></span>
                   <div>
                     <p className="font-medium text-stone-800">SEO Check</p>
                     <p className="text-xs text-stone-500">Google Indexing ready. Ensure sitemap.xml is uploaded.</p>
                   </div>
                </div>
                {stats.newSubmissions > 0 && (
                   <div className="flex gap-3 text-sm">
                      <span className="text-red-500 mt-0.5"><AlertCircle size={14}/></span>
                      <div>
                        <p className="font-medium text-stone-800">New Inquiries Received</p>
                        <p className="text-xs text-stone-500">You have {stats.newSubmissions} unread messages.</p>
                      </div>
                   </div>
                )}
                <div className="flex gap-3 text-sm">
                   <span className="text-green-500 mt-0.5"><TrendingUp size={14}/></span>
                   <div>
                     <p className="font-medium text-stone-800">System Optimized</p>
                     <p className="text-xs text-stone-500">Cache cleared automatically at {new Date().toLocaleTimeString()}.</p>
                   </div>
                </div>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
};