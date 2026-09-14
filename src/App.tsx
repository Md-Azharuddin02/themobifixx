import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Phone, ArrowUp, Instagram, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import SEOManager from './components/SEOManager';
import BrandPage from './pages/BrandPage';
import DeviceRepairPage from './pages/DeviceRepairPage';
import CategoryPage from './CategoryPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ConsultationBookingModal from './components/ConsultationBookingModal';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const sectionMap: Record<string, string> = {
      '/about': 'about-us',
      '/reviews': 'reviews',
      '/technicians': 'technicians',
      '/faq': 'faq',
      '/gallery': 'gallery',
    };

    if (sectionMap[pathname]) {
      setTimeout(() => {
        const el = document.getElementById(sectionMap[pathname]);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  return null;
}

function FloatingCTAs() {
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsScrollToTopVisible(true);
      } else {
        setIsScrollToTopVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-4">
      <AnimatePresence>
        {isScrollToTopVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-12 h-12 bg-[#0a1329] text-slate-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl border border-slate-800 relative group cursor-pointer transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="absolute right-16 bg-[#0a1329] text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none border border-slate-800">
              Back To Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://www.instagram.com/The_mobifixx"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl relative group cursor-pointer transition-all duration-200"
        aria-label="Instagram Profile"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-16 bg-[#0a1329] text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none border border-slate-800">
          Instagram Profile
        </span>
      </motion.a>

      <motion.a
        href="mailto:themobifixx@gmail.com"
        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-700 relative group cursor-pointer transition-all duration-200"
        aria-label="Email Support"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute right-16 bg-[#0a1329] text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none border border-slate-800">
          Email Support
        </span>
      </motion.a>

      <motion.a
        href="https://wa.me/919310112994?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20your%20repair%20services.%20Please%20assist%20me."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-green-600 relative group cursor-pointer transition-all duration-200"
        aria-label="WhatsApp Support Desk"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-16 bg-[#0a1329] text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none border border-slate-800">
          WhatsApp Support
        </span>
      </motion.a>
    </div>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <BrowserRouter>
      <SEOManager />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between font-sans bg-[#050B18] text-slate-200 antialiased">
        <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/reviews" element={<Home />} />
            <Route path="/technicians" element={<Home />} />
            <Route path="/faq" element={<Home />} />
            <Route path="/gallery" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/repair/:brandId/:modelId" element={<DeviceRepairPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/services" element={<Services />} />

            {/* Clean Service SEO Routes */}
            <Route path="/services/mobile-repair" element={<ServiceDetail />} />
            <Route path="/services/laptop-repair" element={<ServiceDetail />} />
            <Route path="/services/macbook-repair" element={<ServiceDetail />} />
            <Route path="/services/tablet-repair" element={<ServiceDetail />} />
            <Route path="/services/screen-repair" element={<ServiceDetail />} />
            <Route path="/services/screen-replacement" element={<ServiceDetail />} />
            <Route path="/services/battery-replacement" element={<ServiceDetail />} />
            <Route path="/services/motherboard-repair" element={<ServiceDetail />} />
            <Route path="/services/water-damage-repair" element={<ServiceDetail />} />
            <Route path="/services/doorstep-repair" element={<ServiceDetail />} />
            <Route path="/services/pickup-drop" element={<ServiceDetail />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            {/* Brand + Category Clean Routes */}
            <Route path="/services/mobile-repair/iphone-repair" element={<BrandPage brandOverride="apple" categoryOverride="mobile" />} />
            <Route path="/services/mobile-repair/samsung-repair" element={<BrandPage brandOverride="samsung" categoryOverride="mobile" />} />
            <Route path="/laptop-repair/dell" element={<BrandPage brandOverride="dell" categoryOverride="laptop" />} />
            <Route path="/laptop-repair/hp" element={<BrandPage brandOverride="hp" categoryOverride="laptop" />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <FloatingCTAs />

        <Footer />

        <ConsultationBookingModal 
          isOpen={isConsultationOpen} 
          onClose={() => setIsConsultationOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}
