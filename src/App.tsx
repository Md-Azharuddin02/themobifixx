import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RepairTracker from './pages/RepairTracker';
import Contact from './pages/Contact';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal'; // This will now resolve correctly
import { ForgotPassword, ResetPassword } from './pages/PasswordReset';
import SEOManager from './components/SEOManager';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BrandPage from './pages/BrandPage';
import DeviceRepairPage from './pages/DeviceRepairPage';
import CategoryPage from './CategoryPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';


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
      {/* Go To Top Button */}
      <AnimatePresence>
        {isScrollToTopVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-md hover:shadow-lg border border-gray-100 relative group cursor-pointer transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 text-gray-500 group-hover:text-brand-orange transition-colors duration-200" />
            <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
              Back To Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Hotline */}
      <motion.a
        href="tel:+919818409122"
        className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-black relative group cursor-pointer transition-all duration-200"
        aria-label="Call TheMobifixx Support"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
          Call +91 9818409122
        </span>
      </motion.a>

      {/* WhatsApp Chat Support */}
      <motion.a
        href="https://wa.me/919818409122?text=Hi%20TheMobifixx,%20I%20have%20a%20device%20repair%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-green-600 relative group cursor-pointer transition-all duration-200"
        aria-label="WhatsApp Support Desk"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-5 h-5 fill-white/10 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block pointer-events-none">
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
            <Route path="/tracker" element={<RepairTracker />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/repair/:brandId/:modelId" element={<DeviceRepairPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

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
