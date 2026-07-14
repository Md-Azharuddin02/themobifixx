import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Phone, Wrench } from 'lucide-react';
import { DEVICE_MODELS } from '../components/devices';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  image?: string;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    function handleClickOutsideSearch(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allDevices: SearchResult[] = [];
      for (const brand in DEVICE_MODELS) {
        DEVICE_MODELS[brand].forEach(device => {
          if (device.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            allDevices.push({ ...device, brand });
          }
        });
      }
      setSearchResults(allDevices.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Removed Auth state helpers

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate(`/?scroll=${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`w-full font-sans sticky top-0 z-50 bg-[#050B18]/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300 ease-in-out ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center">
              <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783980827/logo_fvomi7.png' alt="TheMobifixx" className="h-12 sm:h-14 lg:h-16 w-auto object-contain rounded-xl" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about-us')} 
              className="text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavClick('brands')} 
              className="text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Services
            </button>

            <Link 
              to="/contact" 
              className="text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Contact Us
            </Link>

            {/* Expanding Search Bar (Desktop) */}
            <div className="relative flex items-center" ref={searchRef}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-8 z-50 flex items-center bg-[#0a1329] border border-slate-800 rounded-full"
                  >
                    <input
                      type="text"
                      placeholder="Search device..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-slate-100 text-xs rounded-full pl-3 pr-8 py-1.5 focus:outline-none placeholder-slate-500"
                      autoFocus
                    />
                    {searchQuery.trim() && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-[#0a1329] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <ul className="divide-y divide-slate-800 max-h-80 overflow-y-auto">
                    {searchResults.map(result => (
                      <li key={`${result.brand}-${result.id}`}>
                        <Link
                          to={`/repair/${result.brand}/${result.id}`}
                          onClick={() => { handleResultClick(); setIsSearchOpen(false); }}
                          className="flex items-center gap-3 p-3 hover:bg-slate-800 transition-colors"
                        >
                          <div className="w-8 h-8 bg-slate-850 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-slate-800">
                            {result.image ? (
                              <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                            ) : (
                              <Wrench className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-200">{result.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Auth section removed */}

            {/* CTA Call button */}
            <a
              href="tel:+919310112994"
              className="bg-transparent border border-blue-600/40 text-blue-400 hover:bg-blue-600/10 text-xs font-bold px-4 py-2 rounded-full transition-all shadow-md flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </a>

            {/* CTA Book Repair button */}
            <Link
              to="/contact?tab=booking"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" /> Book Repair
            </Link>
          </nav>

          {/* Mobile Right Quick Action Block */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Minimal Search Button for Mobile */}
            <div className="relative" ref={searchRef}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 160, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex items-center bg-[#0a1329] border border-slate-800 rounded-full"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-slate-100 text-xs rounded-full pl-3 pr-6 py-1 focus:outline-none placeholder-slate-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="p-2 text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Search mobile"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <a
              href="tel:+919310112994"
              className="bg-blue-650 hover:bg-blue-600 text-white p-2.5 rounded-full transition-colors"
              aria-label="Call direct line"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden bg-black/60 backdrop-blur-sm flex justify-start"
          >
            <motion.div
              initial={{ translateX: '-100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              ref={menuRef}
              className="w-4/5 max-w-sm bg-[#050B18] h-full shadow-2xl flex flex-col border-r border-slate-850"
            >
              <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
                <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783980827/logo_fvomi7.png' alt="TheMobifixx" className="h-12 w-auto rounded-lg" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full transition-colors"
                  aria-label="Close Mobile Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim() && searchResults.length > 0 && (
                <div className="px-4 py-2 border-b border-slate-800 max-h-48 overflow-y-auto bg-[#0a1329]/40">
                  <ul className="divide-y divide-slate-850">
                    {searchResults.map(result => (
                      <li key={`${result.brand}-${result.id}`}>
                        <Link
                          to={`/repair/${result.brand}/${result.id}`}
                          onClick={() => { handleResultClick(); setIsMobileMenuOpen(false); }}
                          className="flex items-center gap-3 py-2.5"
                        >
                          <span className="text-xs font-bold text-slate-300">{result.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <nav className="flex-1 p-4 space-y-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left block py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors border-b border-slate-800/50"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('about-us')}
                  className="w-full text-left block py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors border-b border-slate-800/50"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('brands')}
                  className="w-full text-left block py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors border-b border-slate-800/50"
                >
                  Services
                </button>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left block py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors border-b border-slate-800/50"
                >
                  Contact Us
                </Link>

                <div className="pt-6 space-y-3">
                  {/* Auth section removed */}
                  
                  <Link
                    to="/contact?tab=booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 text-xs font-bold bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    Book Repair
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
