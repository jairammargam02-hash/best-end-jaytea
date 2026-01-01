import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/Layout';
import { AdminLayout } from './pages/admin/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { Franchise } from './pages/public/Franchise';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Blog } from './pages/public/Blog';
import { BlogPostDetail } from './pages/public/BlogPost';
import { DesignSystem } from './pages/public/DesignSystem';
import { GenericPage } from './pages/public/GenericPage';
import { HtmlSitemap } from './pages/public/HtmlSitemap';

// Admin Pages
import { PageEditor } from './pages/admin/PageEditor';
import { BlogManager } from './pages/admin/BlogManager';
import { Submissions } from './pages/admin/Submissions';
import { Dashboard } from './pages/admin/Dashboard';
import { SEOSettings } from './pages/admin/SEOSettings';

// Mock Login Component
const Login: React.FC = () => {
  const [error, setError] = React.useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    
    if (target.username.value === 'admin' && target.password.value === 'admin') {
      sessionStorage.setItem('jaytea_user', 'true');
      window.location.href = '#/admin/dashboard';
    } else {
      setError('Invalid credentials (try: admin/admin)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-serif font-bold text-center mb-6 text-stone-900">JAYTEA Admin</h1>
        
        {/* Credential Hint */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-800">
            <p className="font-semibold mb-1 text-xs uppercase tracking-wider opacity-70">Demo Credentials</p>
            <div className="flex justify-between items-center font-mono text-xs">
                <span>User: <strong>admin</strong></span>
                <span>Pass: <strong>admin</strong></span>
            </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input name="username" className="w-full border rounded p-2" type="text" placeholder="admin" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" className="w-full border rounded p-2" type="password" placeholder="admin" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-stone-900 text-white py-2 rounded hover:bg-stone-800 font-medium transition-colors">Login</button>
        </form>
      </div>
    </div>
  );
};

// Fallback 404
const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-6xl font-bold text-stone-200">404</h1>
    <p className="text-stone-600 mt-4">Page not found.</p>
    <a href="#/" className="text-brand-600 underline mt-4 block">Go Home</a>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="p-10">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="franchise" element={<Franchise />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPostDetail />} />
            <Route path="design-system" element={<DesignSystem />} />
            <Route path="sitemap" element={<HtmlSitemap />} />
            {/* Catch-all for CMS pages */}
            <Route path=":slug" element={<GenericPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pages" element={<PageEditor />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="seo-settings" element={<SEOSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;