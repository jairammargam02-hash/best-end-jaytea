import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from './UI';

export const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/franchise', label: 'Franchise' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans text-stone-800 bg-brand-50/30">
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-400 py-2 px-4 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <span>India's Fastest Growing Tea Chain</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Instagram size={14} /></a>
            <a href="#" className="hover:text-white"><Facebook size={14} /></a>
            <a href="#" className="hover:text-white"><Twitter size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 p-2 rounded-tl-xl rounded-br-xl text-white shadow-lg transition-transform group-hover:scale-105">
              <Leaf size={24} fill="currentColor" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">JAYTEA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  location.pathname === link.href ? 'text-brand-600' : 'text-stone-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/franchise">
              <Button size="sm">Get Franchise</Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-stone-200 bg-white p-4">
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-sm font-medium text-stone-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/franchise" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Get Franchise</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white">
              <Leaf size={20} className="text-brand-500" />
              <span className="font-serif text-xl font-bold">JAYTEA</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-80">
              Bringing the authentic taste of Indian Kulhad Chai to the world. We are committed to sustainability, empowering local farmers, and delivering a premium cafe experience that feels like home.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-serif text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">Our Story</Link></li>
              <li><Link to="/franchise" className="hover:text-brand-400 transition-colors">Franchise Model</Link></li>
              <li><Link to="/blog" className="hover:text-brand-400 transition-colors">Tea Blog</Link></li>
              <li><Link to="/sitemap" className="hover:text-brand-400 transition-colors">Site Map</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-6">Headquarters</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-brand-500 mt-1">📍</span> 
                <span>1204, Solitaire Corporate Park,<br/>Andheri East, Mumbai 400093</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-500"/> 
                <span>franchise@jaytea.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-500">📞</span> 
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-6">Stay Updated</h3>
            <p className="text-xs mb-4 opacity-70">Subscribe to our newsletter for the latest industry trends and franchise opportunities.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="bg-stone-800 border-none rounded-l px-4 py-2 text-sm w-full focus:ring-1 focus:ring-brand-500 outline-none" />
              <Button size="sm" variant="primary" className="rounded-l-none">Join</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-xs text-center opacity-60 flex justify-between items-center">
          <span>© {new Date().getFullYear()} JAYTEA Franchise Systems Pvt Ltd. All rights reserved.</span>
          <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
        </div>
      </footer>
    </div>
  );
};