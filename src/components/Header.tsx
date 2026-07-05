import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.jpeg';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Laptop, Smartphone, Cpu, Tablet, Hammer, Search, ArrowRight, User } from 'lucide-react';
import { getAuthUser, clearAuth } from '../utils/auth';

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleProfileClickOutside = (e: MouseEvent) => {
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleProfileClickOutside);
    return () => document.removeEventListener('mousedown', handleProfileClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    setMobileSearchQuery('');
  }, [location]);

  // Focus mobile search input when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 120);
    }
  }, [isMobileSearchOpen]);

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
    { name: 'Before/After', path: '/comparison' },
    { name: 'Technicians', path: '/technicians' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Track Repair', path: '/tracker' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/contact') {
      return location.pathname === '/contact' && !location.search;
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

  const mobileFilteredResults = mobileSearchQuery.trim() === ''
    ? []
    : SEARCH_DATABASE.filter(item => {
        const query = mobileSearchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query) ||
               item.keywords.some(kw => kw.toLowerCase().includes(query));
      }).slice(0, 6);

  return (
    <motion.header
      id="app-header"
      animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      style={{
        backgroundImage: isScrolled
          ? 'linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(240,246,255,0.75) 25%, rgba(244,243,255,0.75) 50%, rgba(240,246,255,0.75) 75%, rgba(255,255,255,0.75) 100%)'
          : 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(243,244,246,0.95) 50%, rgba(255,255,255,0.95) 100%)',
        backgroundSize: '200% 100%',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'backdrop-blur-xl border-slate-200/35 shadow-[0_8px_30px_rgb(0,0,0,0.02)] py-1.5'
          : 'backdrop-blur-lg py-2.5 border-slate-100/40'
      }`}
    >
      {/* Top micro-glowing tech theme progress line */}
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-[#a3e635] shadow-[0_1px_6px_rgba(15,76,255,0.25)]"></div>

      {/* Main Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center shrink-0 mr-4"
          >
            <Link to="/" className="flex items-center text-[#0A1020]" id="logo-link">
              <motion.img 
                src={logoImg} 
                alt="TheMobifixx Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
              />
            </Link>
          </motion.div>

          {/* Advanced Search Engine and CTA */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Search Input Container - Retro Offset Grid Design */}
            <div ref={searchContainerRef} className="relative w-[210px] lg:w-[270px]">
              <div className="relative h-[36px] group">
                {/* Retro offset shadow outline on the bottom-left */}
                <div className="absolute -left-[2.5px] -bottom-[2.5px] inset-0 border-b-2 border-l-2 border-[#0D0D0D] rounded-full z-0 pointer-events-none transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"></div>

                {/* Main Search Input Pill */}
                <div className="absolute inset-0 bg-white border border-[#0D0D0D] rounded-full z-10 overflow-hidden flex items-center pr-8 pl-9.5">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D0D0D]" />
                  <input
                    type="text"
                    placeholder="..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full text-xs font-black text-slate-800 bg-transparent focus:outline-none placeholder-slate-700 tracking-wider"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold z-30"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Right Side Tech Grid Motif overlay */}
                <svg 
                  className="absolute right-[-8px] top-[1px] w-[34px] h-[34px] pointer-events-none z-20 text-[#0D0D0D]" 
                  viewBox="0 0 32 32"
                >
                  {/* Horizontal grid lines */}
                  <line x1="0" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1" />
                  {/* Vertical grid lines */}
                  <line x1="8" y1="0" x2="8" y2="32" stroke="currentColor" strokeWidth="1" />
                  <line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" strokeWidth="1" />
                  <line x1="24" y1="0" x2="24" y2="32" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Suggestions Popup panel */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim() !== '' && (
                  <div className="absolute top-full left-0 mt-3 z-50 w-[270px] lg:w-[320px]">
                    {/* Retro offset shadow outline on the bottom-left of the dropdown */}
                    <div className="absolute -left-[3px] -bottom-[3px] inset-0 border-b-2 border-l-2 border-[#0D0D0D] rounded-2xl bg-transparent pointer-events-none z-0"></div>

                    {/* Main Panel Content Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="relative bg-white border-2 border-[#0D0D0D] rounded-2xl p-3 z-10 shadow-lg flex flex-col"
                    >
                      <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2.5 px-1 border-b border-slate-100 pb-1.5">
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
                              <div className="mt-0.5 p-1 bg-slate-100 text-slate-800 rounded-lg group-hover:bg-[#0D0D0D] group-hover:text-white transition-colors shrink-0">
                                {result.type === 'category' ? <Laptop className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
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

                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-center">
                        <button 
                          onClick={() => {
                            setIsSearchFocused(false);
                            navigate(`/contact?tab=booking&issue=${encodeURIComponent(searchQuery)}`);
                            setSearchQuery('');
                          }}
                          className="w-full py-2 bg-[#0D0D0D] hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 active:translate-y-[1px] cursor-pointer"
                        >
                          <span>Book Repair with "{searchQuery}"</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#FFB800]" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Auth Profile Dropdown or Sign In */}
            <div ref={profileContainerRef} className="relative ml-2">
              {user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-9 h-9 rounded-xl border-2 border-slate-900 bg-[#FFB800] text-slate-950 font-black flex items-center justify-center shadow-[2px_2px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer text-xs uppercase"
                    aria-label="Toggle user profile"
                  >
                    {user.name.charAt(0)}
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-56 bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_#0A1020] z-50 space-y-3"
                      >
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 truncate">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                          {(user.dashboardAccess && user.role !== 'admin') && (
                            <Link
                              to="/dashboard"
                              onClick={() => setIsProfileOpen(false)}
                              className="block text-[10px] font-black uppercase text-slate-700 hover:text-[#0F4CFF] py-1"
                            >
                              User Dashboard
                            </Link>
                          )}
                          {user.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setIsProfileOpen(false)}
                              className="block text-[10px] font-black uppercase text-[#FF7A00] hover:text-[#0F4CFF] py-1"
                            >
                              Admin Suite
                            </Link>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            clearAuth();
                            setUser(null);
                            setIsProfileOpen(false);
                            navigate('/');
                            window.location.reload();
                          }}
                          className="w-full text-center text-[10px] font-black uppercase text-white bg-slate-900 border-2 border-slate-900 py-1.5 rounded-lg shadow-[2px_2px_0px_#0D0D0D] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                        >
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border-2 border-slate-900 bg-white text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-xl shadow-[2.5px_2.5px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* CTA - Retro Offset Layered Design (Precise SVG Outline) */}
            <div className="relative w-[164px] h-[42px] group cursor-pointer select-none ml-3">
              {/* Precise SVG Outlines with safety padding margin to prevent hover clipping */}
              <svg 
                className="absolute -left-[4px] -top-[4px] w-[172px] h-[50px] pointer-events-none z-0" 
                viewBox="-4 -4 172 50" 
                fill="none"
              >
                {/* Top-left outer arch line */}
                <path 
                  d="M 125 1.5 L 21 1.5 A 19.5 19.5 0 0 0 1.5 21 A 19.5 19.5 0 0 0 3 26" 
                  stroke="#0D0D0D" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  className="transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-0.5"
                />
                {/* Bottom-right outer arch line */}
                <path 
                  d="M 25 40.5 L 143 40.5 A 19.5 19.5 0 0 0 162.5 21 A 19.5 19.5 0 0 0 161 15" 
                  stroke="#0D0D0D" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-0.5"
                />
              </svg>

              {/* Yellow backing pill */}
              <div className="absolute left-[8px] top-[4px] w-[136px] h-[34px] bg-[#FFB800] rounded-full z-0 transition-transform duration-200 group-hover:-translate-x-1"></div>

              {/* Main black button link */}
              <Link
                to="/contact?tab=booking"
                className="absolute left-[18px] top-[4px] w-[136px] h-[34px] bg-[#0D0D0D] hover:bg-black text-white font-black text-[10px] tracking-widest uppercase rounded-full flex items-center justify-center transition-all duration-150 z-10 shadow-sm active:translate-y-[1px] active:translate-x-[1px]"
              >
                <span className="relative pb-0.5">
                  Book Now
                  <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-[#FFB800]"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile top-bar buttons: Search | Call | Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search button */}
            <button
              onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsOpen(false); }}
              className={`w-9 h-9 rounded-xl border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer ${
                isMobileSearchOpen ? 'bg-[#FFB800] text-slate-900' : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
              aria-label="Open search"
              id="mobile-search-toggle"
            >
              <Search className="w-4 h-4" />
            </button>
            {/* Call button */}
            <a
              href="tel:+919310112994"
              className="w-9 h-9 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 flex items-center justify-center shadow-[2px_2px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer"
              aria-label="Call TheMobifixx"
            >
              <Phone className="w-4 h-4 text-[#0F4CFF]" />
            </a>
            {/* Hamburger */}
            <button
              onClick={() => { setIsOpen(!isOpen); setIsMobileSearchOpen(false); }}
              className="w-9 h-9 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center shadow-[2px_2px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-4 h-4 text-[#0F4CFF]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Subnavbar (Desktop and Tablet only) */}
      <div className="hidden md:block border-t border-slate-100/80 bg-slate-50/70 backdrop-blur-md" id="app-subnavbar">
        <div className="max-w-7xl mx-auto">
          {/* Tablet: horizontally scrollable, Desktop: centered */}
          <div className="overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center lg:justify-center space-x-2.5 lg:space-x-4 py-3.5 text-xs font-bold uppercase tracking-wider min-w-max lg:min-w-0" id="desktop-subnav">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4.5 py-2.5 rounded-xl text-[10px] lg:text-[11px] font-black uppercase tracking-wider whitespace-nowrap border-2 border-slate-900 flex items-center gap-1.5 transition-all duration-100 cursor-pointer shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0px_#0A1020] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[1px_1px_0px_#0A1020] ${
                      active
                        ? 'bg-[#0F4CFF] text-white border-slate-900'
                        : 'text-slate-800 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse shadow-[0_0_6px_#a3e635] shrink-0" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ── MOBILE SEARCH OVERLAY ──────────────────────────── */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden border-t-2 border-b-2 border-slate-900 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundColor: '#F8FAFC',
            }}
            id="mobile-search-panel"
          >
            <div className="px-4 py-5 space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search MacBook, iPhone, screen, battery..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-medium shadow-[3px_3px_0px_#0A1020] focus:outline-none focus:shadow-[4px_4px_0px_#FFB800] transition-all"
                />
                {mobileSearchQuery && (
                  <button
                    onClick={() => setMobileSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border-2 border-slate-900 bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Results */}
              {mobileSearchQuery.trim() !== '' && (
                <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#0A1020]">
                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-4 py-2.5 border-b-2 border-slate-900 bg-[#F8FAFC]">
                    Diagnostic Matches
                  </div>
                  {mobileFilteredResults.length === 0 ? (
                    <div className="p-5 text-center">
                      <p className="text-xs font-bold text-slate-500">No matches — try MacBook, HP, Dell, screen, or battery.</p>
                    </div>
                  ) : (
                    <div className="divide-y-2 divide-slate-900">
                      {mobileFilteredResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setIsMobileSearchOpen(false);
                            setMobileSearchQuery('');
                            navigate(result.targetUrl);
                          }}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
                        >
                          <div className="w-8 h-8 border-2 border-slate-900 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#0A1020] group-hover:bg-[#0F4CFF] group-hover:text-white transition-colors">
                            {result.type === 'category' ? <Laptop className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-black text-slate-800 truncate group-hover:text-[#0F4CFF] transition-colors">{result.title}</div>
                            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider">{result.category} Repair Module</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0F4CFF] shrink-0 transition-colors" />
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Book with query CTA */}
                  <div className="p-3 border-t-2 border-slate-900 bg-[#F8FAFC]">
                    <button
                      onClick={() => {
                        setIsMobileSearchOpen(false);
                        setMobileSearchQuery('');
                        navigate(`/contact?tab=booking&issue=${encodeURIComponent(mobileSearchQuery)}`);
                      }}
                      className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#FFB800] hover:shadow-[3px_3px_0px_#FFB800] active:translate-y-[1px] active:translate-x-[1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Repair · "{mobileSearchQuery}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFB800]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Default hint when query is empty */}
              {mobileSearchQuery.trim() === '' && (
                <div className="flex flex-wrap gap-2">
                  {['MacBook Repair', 'iPhone Screen', 'SSD Upgrade', 'Water Damage'].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => setMobileSearchQuery(hint)}
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-slate-900 rounded-xl bg-white text-slate-700 shadow-[1px_1px_0px_#0A1020] hover:bg-[#FFB800] hover:text-slate-900 active:translate-y-[0.5px] transition-all cursor-pointer"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU DROPDOWN ───────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-slate-50 border-t-2 border-b-2 border-slate-900 px-4 py-6 space-y-4 overflow-hidden" 
            id="mobile-nav-menu"
          >
            <div className="grid grid-cols-2 gap-3.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 flex items-center justify-center gap-1.5 transition-all duration-100 cursor-pointer shadow-[2.5px_2.5px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] ${
                      active
                        ? 'bg-[#0F4CFF] text-white border-slate-900'
                        : 'text-slate-800 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse shadow-[0_0_6px_#a3e635] shrink-0" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
            {/* Mobile Auth Panel */}
            <div className="pt-3.5 mt-1 border-t border-slate-200">
              {user ? (
                <div className="bg-white border-2 border-slate-900 rounded-xl p-3.5 space-y-3 shadow-[2.5px_2.5px_0px_#0A1020]">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-[#FFB800] text-slate-950 font-black flex items-center justify-center text-xs uppercase shadow-[1px_1px_0px]">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {(user.dashboardAccess && user.role !== 'admin') && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block text-center text-[10px] font-black uppercase text-slate-800 border-2 border-slate-900 bg-slate-50 py-2 rounded-lg"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block text-center text-[10px] font-black uppercase text-slate-850 border-2 border-slate-900 bg-[#FFB800] py-2 rounded-lg"
                      >
                        Admin Suite
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      clearAuth();
                      setUser(null);
                      setIsOpen(false);
                      navigate('/');
                      window.location.reload();
                    }}
                    className="w-full text-center text-[10px] font-black uppercase text-white bg-slate-900 border-2 border-slate-900 py-2 rounded-lg cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-[10px] font-black uppercase text-slate-900 border-2 border-slate-900 bg-white py-2.5 rounded-xl shadow-[2px_2px_0px_#0A1020]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-[10px] font-black uppercase text-slate-950 border-2 border-slate-900 bg-[#FFB800] py-2.5 rounded-xl shadow-[2px_2px_0px_#0A1020]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t-2 border-slate-900 flex flex-col space-y-3">
              <motion.a
                href="https://wa.me/919310112994?text=Hi%20TheMobifixx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#00C48C] text-white border-2 border-slate-900 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_#0A1020] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[1px_1px_0px_#0A1020] cursor-pointer group transition-all duration-100"
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>WhatsApp Support</span>
              </motion.a>
              <Link
                to="/contact?tab=booking"
                className="block w-full text-center bg-[#FFB800] text-slate-950 border-2 border-slate-900 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_#0A1020] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[1px_1px_0px_#0A1020] transition-all duration-100"
              >
                Book Doorstep Repair
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
