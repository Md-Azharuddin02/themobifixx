import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Technicians from './pages/Technicians';
import Testimonials from './pages/Testimonials';
import RepairTracker from './pages/RepairTracker';
import Contact from './pages/Contact';
import ComparisonPage from './pages/ComparisonPage';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import SEOManager from './components/SEOManager';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Scroll Restoration Utility
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Floating Live Interaction Buttons
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
      {/* Go To Top Button - Retro Neobrutalist */}
      <AnimatePresence>
        {isScrollToTopVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-12 h-12 bg-[#FFB800] text-slate-950 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] relative group cursor-pointer transition-all duration-200"
            whileHover={{ scale: 1.08, y: -2, x: -2 }}
            whileTap={{ scale: 0.95, y: 1.5, x: 1.5 }}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="absolute right-14 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
              Back To Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Hotline - Retro Neobrutalist */}
      <motion.a
        href="tel:+919310112994"
        className="w-12 h-12 bg-slate-950 text-white border-2 border-slate-900 rounded-full flex items-center justify-center shadow-[3px_3px_0px_#FFB800] hover:shadow-[4px_4px_0px_#FFB800] relative group cursor-pointer transition-all duration-200"
        aria-label="Call TheMobifixx Support"
        whileHover={{ scale: 1.08, y: -2, x: -2 }}
        whileTap={{ scale: 0.95, y: 1.5, x: 1.5 }}
        transition={{ type: "spring", stiffness: 450, damping: 12 }}
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-14 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
          Call +91 9310112994
        </span>
      </motion.a>

      {/* WhatsApp Chat Support - Retro Neobrutalist */}
      <motion.a
        href="https://wa.me/919310112994?text=Hi%20TheMobifixx,%20I%20have%20a%20device%20repair%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#00C48C] text-white border-2 border-slate-900 rounded-full flex items-center justify-center shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] relative group cursor-pointer transition-all duration-200 animate-bounce-slow"
        aria-label="WhatsApp Support Desk"
        whileHover={{ scale: 1.08, y: -2, x: -2 }}
        whileTap={{ scale: 0.95, y: 1.5, x: 1.5 }}
        transition={{ type: "spring", stiffness: 450, damping: 12 }}
      >
        <MessageSquare className="w-5 h-5 fill-white/10 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute right-14 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
          WhatsApp Chat Desk
        </span>
      </motion.a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SEOManager />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 text-slate-800 antialiased">
        {/* Navigation Sticky Bar */}
        <Header />

        {/* Core Page Container */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/tracker" element={<RepairTracker />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Fallback Catch-all Redirect */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Floating Lead Capture Actions */}
        <FloatingCTAs />

        {/* Structured Bottom Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
