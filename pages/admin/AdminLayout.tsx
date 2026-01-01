import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, BookOpen, MessageSquare, Menu, Globe } from 'lucide-react';
import { Button } from '../../components/UI';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Simple Session Check
  useEffect(() => {
    const user = sessionStorage.getItem('jaytea_user');
    if (!user) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('jaytea_user');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FileText, label: 'Pages & SEO', path: '/admin/pages' },
    { icon: BookOpen, label: 'Blog Manager', path: '/admin/blogs' },
    { icon: MessageSquare, label: 'Submissions', path: '/admin/submissions' },
    { icon: Globe, label: 'SEO Settings', path: '/admin/seo-settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-stone-100 text-stone-800 font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-stone-900 text-stone-300 transition-all duration-300 flex flex-col shadow-xl z-20`}>
        <div className="h-16 flex items-center justify-center border-b border-stone-800 bg-stone-950">
          <span className={`font-serif font-bold text-xl text-white ${!isSidebarOpen && 'hidden'}`}>JAYTEA CMS</span>
          {!isSidebarOpen && <span className="font-serif font-bold text-xl text-white">JT</span>}
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-3">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              title={!isSidebarOpen ? item.label : ''}
              className={`flex items-center px-3 py-3 rounded-md transition-all duration-200 group ${
                isActive(item.path) 
                  ? 'bg-brand-600 text-white shadow-md border border-brand-500 ring-1 ring-brand-500/20' 
                  : 'hover:bg-stone-800 hover:text-white border border-transparent'
              }`}
            >
              <item.icon size={20} className={isActive(item.path) ? 'text-white' : 'text-stone-400 group-hover:text-white'} />
              {isSidebarOpen && <span className="ml-3 font-medium tracking-wide text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-stone-800 bg-stone-950">
          <button 
            onClick={handleLogout}
            title="Logout"
            className="flex w-full items-center px-3 py-3 rounded-md hover:bg-red-900/30 hover:text-red-400 transition-colors text-stone-500"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center px-6 justify-between shadow-sm z-10">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-stone-100 rounded text-stone-500 transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-stone-900">Admin User</p>
                <p className="text-xs text-stone-500">Super Admin</p>
             </div>
             <div className="h-9 w-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold border-2 border-brand-200">
               A
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-8 bg-stone-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};