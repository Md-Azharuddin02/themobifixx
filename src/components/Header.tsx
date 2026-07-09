import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Menu, X, ChevronDown, Phone, MessageCircle, Instagram, Facebook, Twitter, Wrench, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { getAuthToken, getAuthUser, clearAuth } from '../utils/auth';
import { DEVICE_MODELS } from '../components/devices';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  image?: string;
}
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll behavior state
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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
      setSearchResults(allDevices.slice(0, 10)); // Limit to 10 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const user = getAuthUser();
  const token = getAuthToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

  const mobileRepairLinks = [
    { label: 'Screen Replacement', path: '/services/screen-replacement' },
    { label: 'Battery Replacement', path: '/services/battery-replacement' },
    { label: 'Back Glass Repair', path: '/repair/apple/iphone-14-pro-max' }, // Example path
    { label: 'Charging Jack Repair', path: '/repair/samsung/galaxy-s23' }, // Example path
    { label: 'Mic Repair', path: '/repair/google/pixel-7' }, // Example path
    { label: 'Camera Replacement', path: '/repair/oneplus/11-pro' }, // Example path
    { label: 'Speaker Repair', path: '/repair/apple/iphone-13' }, // Example path
    { label: 'Power Button Repair', path: '/repair/samsung/galaxy-a54' }, // Example path
  ];

  const tabletRepairLinks = [
    { label: 'Screen Replacement', path: '/services/screen-replacement' },
    { label: 'Battery Replacement', path: '/services/battery-replacement' },
    { label: 'Charging Jack Repair', path: '/repair/apple/ipad-air-5' }, // Example path
    { label: 'Speaker Repair', path: '/repair/samsung/galaxy-tab-s8' }, // Example path
    { label: 'Power Button Repair', path: '/repair/apple/ipad-pro-12-9' }, // Example path
  ];

  const watchRepairLinks = [
    { label: 'Screen Replacement', path: '/services/screen-replacement' },
    { label: 'Battery Replacement', path: '/services/battery-replacement' },
    { label: 'Digital Crown Repair', path: '/repair/apple/watch-series-8' }, // Example path
  ];

  const navLinks = [
    {
      label: 'Mobile',
      path: '/brand/apple',
      dropdown: mobileRepairLinks,
    },
    { label: 'Tablet', path: '/brand/apple', dropdown: tabletRepairLinks },
    {
      label: 'Laptop',
      path: '/brand/hp',
      dropdown: [
        { label: 'HP Laptop Repair', path: '/brand/hp' },
        { label: 'Dell Laptop Repair', path: '/brand/dell' },
        { label: 'Lenovo Laptop Repair', path: '/brand/lenovo' },
      ],
    },
    { label: 'Smart Watch', path: '/brand/apple', dropdown: watchRepairLinks },
    {
      label: 'MacBook',
      path: '/brand/apple', // Assuming macs are under apple brand
    },
    { label: 'Track Order', path: '/tracker' },
    { label: 'Contact', path: '/contact' },
  ];

  const mainNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Book Repair', path: '/contact?tab=booking' },
    { label: 'Track Repair', path: '/tracker' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`w-full font-sans sticky top-0 z-50 bg-white transition-all duration-300 ease-in-out ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>

      {/* Main Bar - White Background */}
      <div className="bg-white relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 gap-4">

            {/* Logo - INCREASED SIZE */}
            <div className="flex-shrink-0 flex items-center gap-4">
              <button className="lg:hidden p-2 text-gray-600 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center">
                <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-14 sm:h-16 lg:h-20 w-auto object-contain" />
              </Link>
            </div>

            {/* Center Spacer */}
            <div className="hidden lg:block flex-1"></div>

            {/* Right Actions: Search, Call & Book Now */}
            <div ref={searchRef} className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Search Icon for Mobile/Tablet */}
              <div className="md:hidden">
                <button onClick={() => setSearchQuery(searchQuery ? '' : ' ')} className="p-2 text-gray-600 hover:text-brand-orange">
                  <Search className="h-5 w-5" />
                </button>
              </div>

              <div className="hidden md:flex relative w-72 lg:w-96" >
                <input
                  type="text"
                  placeholder="Search phone model or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 text-gray-900 text-xs rounded-full pl-4 pr-10 py-3 focus:outline-none focus:border-[#0b1f3a] focus:ring-1 focus:ring-[#0b1f3a] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-900" />
                </div>

                {searchQuery.trim() && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                    <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {searchResults.map(result => (
                        <li key={`${result.brand}-${result.id}`}>
                          <Link
                            to={`/repair/${result.brand}/${result.id}`}
                            onClick={handleResultClick}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              {result.image ? <img src={result.image} alt={result.name} className="w-full h-full object-cover" /> : <Wrench className="w-5 h-5 text-gray-400" />}
                            </div>
                            <span className="text-sm font-bold text-gray-800">{result.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {token && user ? (
                  <div className="hidden lg:flex items-center gap-3 border-r border-gray-200 pr-4 mr-2 group relative">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <UserIcon className="w-5 h-5 text-gray-900" />
                      <span className="text-sm font-bold text-gray-900 max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown className="w-4 h-4 text-gray-900 group-hover:rotate-180 transition-transform" />
                    </div>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                      <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-orange rounded-lg">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center gap-3 border-r border-gray-900 pr-4 mr-2">
                    <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-[#4b5563] transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="text-sm font-bold bg-[#f8fafc] text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                      Sign Up
                    </Link>
                  </div>
                )}
                <a
                  href="tel:+919818409122"
                  className="bg-white border-1 border-[#0b1f3a] text-[#0b1f3a] text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 rounded-full hover:bg-[#f8fafc] transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 hidden sm:block" /> Call
                </a>

                <Link
                  to="/contact?tab=booking"
                  className="bg-[#0b1f3a] text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 rounded-full hover:bg-[#4b5563] transition-colors shadow-sm flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 hidden sm:block" /> Book Repair
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subnavbar - Dedicated Navigation Links Bar */}
      <div className="bg-white border-y border-gray-100 hidden lg:block relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-10 py-3">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link to={link.path!} className="text-[15px] font-bold text-gray-800 hover:text-brand-orange transition-colors flex items-center gap-1">
                  <span>{link.label}</span>
                  {link.dropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>
                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                    {link.dropdown.map(item => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-orange rounded-lg"
                      >{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin Orange Notification Bar */}
      <div className={`bg-[#0b1f3a] hidden md:block transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0' : 'max-h-12'}`}>
        <div className="py-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/95 text-xs font-semibold flex items-center justify-center gap-x-4">
          <span>* Technician arrives in 90 minutes</span>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+919818409122" className="hidden sm:inline hover:underline">
            +91 9818409122
          </a>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">90 Day Warranty</span>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/themobifixx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/themobifixx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden bg-black/50 backdrop-blur-sm flex">
          <div
            ref={menuRef}
            className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-16 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-900 hover:bg-gray-900 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search - now integrated with main search state */}
            {searchQuery.trim() && (
              <div className="p-4 border-b border-gray-100">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search device..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-4 pr-4 py-2.5 focus:outline-none"
                  />
                </div>
                {searchResults.length > 0 && (
                  <ul className="mt-2 divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    {searchResults.map(result => (
                      <li key={`${result.brand}-${result.id}`}>
                        <Link
                          to={`/repair/${result.brand}/${result.id}`}
                          onClick={() => { handleResultClick(); setIsMobileMenuOpen(false); }}
                          className="flex items-center gap-3 py-3"
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                            {result.image ? <img src={result.image} alt={result.name} className="w-full h-full object-cover" /> : <Wrench className="w-4 h-4 text-gray-400" />}
                          </div>
                          <span className="text-xs font-bold text-gray-700">{result.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <nav className="flex-1 p-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-bold text-gray-800 hover:text-brand-orange border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-900 px-4 space-y-3">
                {token && user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 text-sm font-bold text-gray-800 border border-gray-900 rounded-xl hover:bg-gray-100">Dashboard</Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-center py-3 text-sm font-bold bg-rose-500 text-white rounded-xl shadow-sm hover:bg-rose-600">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 text-sm font-bold text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-100">Login</Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 text-sm font-bold bg-[#0b1f3a] text-white rounded-xl shadow-sm hover:bg-rose-600">Sign Up</Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
