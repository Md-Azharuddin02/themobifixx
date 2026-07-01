/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
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
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import SEOManager from './components/SEOManager';

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
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Call Hotline */}
      <motion.a
        href="tel:+919999999999"
        className="w-12 h-12 bg-slate-900 hover:bg-[#0F4CFF] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl relative group cursor-pointer transition-colors duration-300"
        aria-label="Call LapyZone Support"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block">
          Call +91 99999 99999
        </span>
      </motion.a>

      {/* WhatsApp Chat Support */}
      <motion.a
        href="https://wa.me/919999999999?text=Hi%20LapyZone,%20I%20have%20a%20device%20repair%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#00C48C] hover:bg-[#009E70] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl relative group animate-bounce-slow cursor-pointer transition-colors duration-300"
        aria-label="WhatsApp Support Desk"
        whileHover={{ 
          scale: 1.12, 
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <MessageSquare className="w-5 h-5 fill-white/10 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block">
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            
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
