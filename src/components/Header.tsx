/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Laptop, Smartphone, Cpu, Tablet, Hammer, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SEARCH_DATABASE = [
  // Categories
  { type: 'category', title: 'MacBook Chip-Level Repair', targetUrl: '/services/macbook-repair', category: 'MacBook', keywords: ['apple', 'macbook', 'mac', 'pro', 'air', 'laptop', 'logic board', 'motherboard', 'm1', 'm2', 'm3', 'screen', 'keyboard'] },
  { type: 'category', title: 'Laptop Hardware Repair', targetUrl: '/services/laptop-repair', category: 'Laptop', keywords: ['dell', 'hp', 'lenovo', 'asus', 'acer', 'windows', 'hinge', 'keyboard', 'fan', 'slow', 'ssd', 'ram'] },
  { type: 'category', title: 'Premium Mobile & iPhone Repair', targetUrl: '/services/mobile-repair', category: 'Mobile', keywords: ['iphone', 'samsung', 'oneplus', 'pixel', 'smartphone', 'glass', 'display', 'screen', 'battery', 'charge'] },
  { type: 'category', title: 'Tablet & iPad Service', targetUrl: '/services/tablet-repair', category: 'Tablet', keywords: ['ipad', 'tablet', 'tab', 'screen', 'touch', 'glass', 'battery'] },
  
  // Specific Device & Issue combinations for precise high-fidelity booking pre-fills
  { type: 'issue', title: 'Apple MacBook Screen Replacement', targetUrl: '/contact?tab=booking&device=macbook&brand=Apple&issue=Screen%20replacement%20(Retina%20display)', category: 'MacBook', keywords: ['macbook screen', 'macbook glass', 'broken macbook screen', 'display replacement macbook', 'apple display'] },
  { type: 'issue', title: 'Apple MacBook Logic Board Micro-Soldering', targetUrl: '/contact?tab=booking&device=macbook&brand=Apple&issue=Logic%20Board%20micro-soldering%20repair', category: 'MacBook', keywords: ['macbook motherboard', 'logic board', 'water damage macbook', 'no power macbook', 'dead macbook'] },
  { type: 'issue', title: 'Apple MacBook Battery Replacement', targetUrl: '/contact?tab=booking&device=macbook&brand=Apple&issue=Battery%20degradation%20replacement', category: 'MacBook', keywords: ['macbook battery', 'macbook backup', 'battery drainage macbook', 'macbook charger'] },
  { type: 'issue', title: 'Dell Inspiron/Vostro/XPS Screen Repair', targetUrl: '/contact?tab=booking&device=laptop&brand=Dell&issue=Screen%20replacement', category: 'Laptop', keywords: ['dell screen', 'dell display', 'broken dell laptop screen'] },
  { type: 'issue', title: 'Dell Motherboard & Power Diagnostic', targetUrl: '/contact?tab=booking&device=laptop&brand=Dell&issue=Motherboard%20chip-level%20repair', category: 'Laptop', keywords: ['dell motherboard', 'dell chip level', 'dell dead', 'dell power issue'] },
  { type: 'issue', title: 'Dell Laptop Battery & Keyboard Faults', targetUrl: '/contact?tab=booking&device=laptop&brand=Dell&issue=Keyboard%20replacement', category: 'Laptop', keywords: ['dell keyboard', 'dell battery', 'dell key broken'] },
  { type: 'issue', title: 'HP Pavilion/Envy Hinge & Body Repair', targetUrl: '/contact?tab=booking&device=laptop&brand=HP&issue=Hinge%20and%20body%20repair', category: 'Laptop', keywords: ['hp hinge', 'hp body repair', 'hp broken hinge', 'hp corner crack'] },
  { type: 'issue', title: 'HP Laptop Cooling Fan & Overheating', targetUrl: '/contact?tab=booking&device=laptop&brand=HP&issue=Overheating%20and%20fan%20service', category: 'Laptop', keywords: ['hp fan', 'hp heating', 'hp sound', 'hp slowing down'] },
  { type: 'issue', title: 'Lenovo ThinkPad/Yoga Keyboard Swap', targetUrl: '/contact?tab=booking&device=laptop&brand=Lenovo&issue=Keyboard%20replacement', category: 'Laptop', keywords: ['lenovo keyboard', 'lenovo keys', 'thinkpad keys'] },
  { type: 'issue', title: 'Lenovo SSD Speed & Memory Upgrade', targetUrl: '/contact?tab=booking&device=laptop&brand=Lenovo&issue=Hardware%20upgrades%20(SSD%20or%20RAM)', category: 'Laptop', keywords: ['lenovo upgrade', 'lenovo ssd', 'lenovo ram', 'lenovo slow', 'speed up'] },
  { type: 'issue', title: 'iPhone Display & Screen Replacement', targetUrl: '/contact?tab=booking&device=mobile&brand=Apple&issue=Glass%20and%20display%20replacement', category: 'Mobile', keywords: ['iphone screen', 'broken iphone', 'iphone glass', 'iphone display'] },
  { type: 'issue', title: 'iPhone Battery Degradation Replacement', targetUrl: '/contact?tab=booking&device=mobile&brand=Apple&issue=Battery%20degradation%20replacement', category: 'Mobile', keywords: ['iphone battery', 'iphone backup', 'iphone health'] },
  { type: 'issue', title: 'Samsung S/A/Note Display Replacement', targetUrl: '/contact?tab=booking&device=mobile&brand=Samsung&issue=Glass%20and%20display%20replacement', category: 'Mobile', keywords: ['samsung screen', 'samsung display', 'samsung glass'] },
  { type: 'issue', title: 'OnePlus Battery & Fast Charging Faults', targetUrl: '/contact?tab=booking&device=mobile&brand=OnePlus&issue=Battery%20degradation%20replacement', category: 'Mobile', keywords: ['oneplus charging', 'oneplus warp charge', 'oneplus battery'] },
  { type: 'issue', title: 'Apple iPad Touch Screen Replacement', targetUrl: '/contact?tab=booking&device=tablet&brand=Apple&issue=Touch%20screen%20replacement', category: 'Tablet', keywords: ['ipad screen', 'ipad glass', 'broken ipad', 'ipad display'] },
  { type: 'issue', title: 'Apple iPad Battery & Fault Repair', targetUrl: '/contact?tab=booking&device=tablet&brand=Apple&issue=Battery%20fault%20repair', category: 'Tablet', keywords: ['ipad battery', 'ipad backup', 'ipad dead'] }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Click outside listener for search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technicians', path: '/technicians' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Track Repair', path: '/tracker' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const filteredResults = searchQuery.trim() === ''
    ? []
    : SEARCH_DATABASE.filter(item => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query) ||
               item.keywords.some(kw => kw.toLowerCase().includes(query));
      }).slice(0, 5);

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-slate-200 py-1'
          : 'bg-white/95 backdrop-blur-md py-2 border-b border-slate-100/50'
      }`}
    >
      {/* Main Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 text-[#0A1020]" id="logo-link">
              <motion.div 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0F4CFF] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 relative overflow-hidden"
                variants={{
                  hover: { scale: 1.08, rotate: 10 },
                  tap: { scale: 0.95 }
                }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
              >
                {/* Embedded live scanning line on hover */}
                <motion.div 
                  className="absolute inset-x-0 h-0.5 bg-cyan-300/60 top-0"
                  variants={{
                    rest: { y: -5 },
                    hover: { 
                      y: [0, 36, 0],
                      transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
                    }
                  }}
                />
                <motion.div 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-md"
                  variants={{
                    hover: { rotate: 45 },
                    rest: { rotate: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
              </motion.div>
              <div className="flex flex-col text-left">
                <span className="font-black tracking-wider text-sm sm:text-base md:text-lg text-[#0A1020] leading-none">
                  LAPYZONE
                </span>
                <span className="text-[7.5px] font-bold text-[#0F4CFF] tracking-widest uppercase mt-0.5 leading-none">
                  Delhi NCR Hub
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Advanced Search Engine and CTA */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Search Input Container */}
            <div ref={searchContainerRef} className="relative w-[210px] lg:w-[270px]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search device or issue..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full text-xs font-semibold pl-9 pr-7 py-2 bg-slate-50 border border-slate-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF] focus:bg-white transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Suggestions Popup panel */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim() !== '' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 w-[270px] lg:w-[320px]"
                  >
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                      Direct Diagnostics Matches
                    </div>

                    {filteredResults.length === 0 ? (
                      <div className="p-3 text-center space-y-1">
                        <div className="text-slate-400 text-xs font-semibold">No direct repair matches</div>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Try searching for MacBook, HP, Dell, screen, or battery.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {filteredResults.map((result, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchQuery('');
                              navigate(result.targetUrl);
                            }}
                            className="w-full text-left p-2 hover:bg-slate-50 rounded-xl transition-all flex items-start gap-2 group cursor-pointer"
                          >
                            <div className="mt-0.5 p-1 bg-blue-50 text-[#0F4CFF] rounded-lg group-hover:bg-[#0F4CFF] group-hover:text-white transition-colors shrink-0">
                              {result.type === 'category' ? <Laptop className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-slate-800 truncate group-hover:text-[#0F4CFF] transition-colors">
                                {result.title}
                              </div>
                              <span className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                                {result.category} Repair Module
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-center">
                      <button 
                        onClick={() => {
                          setIsSearchFocused(false);
                          navigate(`/contact?tab=booking&issue=${encodeURIComponent(searchQuery)}`);
                          setSearchQuery('');
                        }}
                        className="text-[10px] font-black text-[#0F4CFF] uppercase tracking-wider hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <span>Book Repair with "{searchQuery}"</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              to="/contact?tab=booking"
              className="bg-[#0F4CFF] hover:bg-[#0A3DCC] text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all"
            >
              Book Repair
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="tel:+919999999999"
              className="p-2 text-slate-600 hover:text-[#0F4CFF] transition-colors"
              aria-label="Call LapyZone"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-[#0F4CFF] focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Subnavbar (Desktop and Tablet only) */}
      <div className="hidden md:block border-t border-slate-100/80 bg-slate-50/70 backdrop-blur-md" id="app-subnavbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop/Tablet Subnav (Horizontal list) */}
          <nav className="flex items-center justify-center space-x-1 lg:space-x-3 py-1.5 text-xs font-bold uppercase tracking-wider" id="desktop-subnav">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-[#0F4CFF] text-white shadow-md shadow-blue-100/50'
                      : 'text-slate-600 hover:text-[#0F4CFF] hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Dropdown drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-3" id="mobile-nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider ${
                isActive(link.path)
                  ? 'bg-slate-50 text-[#0F4CFF]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0F4CFF]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-3">
            <motion.a
              href="https://wa.me/919999999999?text=Hi%20LapyZone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#00C48C] hover:bg-[#009E70] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md cursor-pointer group transition-colors duration-300"
              whileHover={{ 
                scale: 1.03, 
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>WhatsApp Support</span>
            </motion.a>
            <Link
              to="/contact?tab=booking"
              className="bg-[#0F4CFF] hover:bg-[#0A3DCC] text-white text-center py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100"
            >
              Book Doorstep Repair
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
