import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, Youtube, X, Monitor, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);

  return (
    <footer className="bg-[#02050c] text-slate-400 font-sans border-t border-slate-800/80">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand & About + Quick Links */}
          <div className="space-y-6">
            <Link to="/">
              <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1784028396/WhatsApp_Image_2026-07-14_at_4.48.50_PM_1_rfu6xy.jpg' alt="TheMobifixx" className="h-16 w-auto rounded-xl" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-300">
              India's most trusted doorstep repair service for smartphones, tablets, laptops, and smartwatches. We bring the repair center to you.
            </p>
            
            <div className="space-y-3.5 pt-4 border-t border-slate-900">
              <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="https://www.facebook.com/themobifixx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-500" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/themobifixx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@themobifixx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919310112994" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>+91 9310112994</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:themobifixx@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>themobifixx@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-200 font-bold mb-6 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/contact?tab=booking&device=mobile" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Mobile Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=laptop" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Laptop Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=tablet" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Tablet Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=watches" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Watches Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=macbook" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Macbook Repair</Link></li>
              <li>
                <button
                  onClick={() => setIsDesktopModalOpen(true)}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-slate-300 text-sm focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Desktop Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Google Maps Embed */}
          <div className="space-y-4">
            <h4 className="text-slate-200 font-bold text-sm uppercase tracking-wider">Our Location</h4>
            <p className="text-sm text-slate-300">
              (28°32'55.5"N 77°15'03.6"E ), Near Blue Dart, Nehru Place Market, New Delhi
            </p>
            <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-lg relative bg-[#0A1329]">
              <iframe
                title="TheMobifixx Shop Location"
                src="https://maps.google.com/maps?q=28.54875,77.25100&z=17&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Disclaimer Area */}
      <div className="border-t border-slate-900 bg-[#010307]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h5 className="font-bold text-sm text-slate-200 mb-4">Disclaimer</h5>
          <p className="text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto">
            All trademarks, logos, and brand names are the property of their respective owners and are used for identification purposes only.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto mt-2">
            “TheMobifixx is an independent third-party repair service provider and is not affiliated with or endorsed by any brand mentioned on this website.
            Please contact us for confirmation of service availability in your locality.”
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} TheMobifixx. All rights reserved. | Designed & Developed by <a href="https://www.arbormit.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold transition-all underline decoration-dashed decoration-blue-500/50 underline-offset-4 hover:decoration-solid">Arbormit.com</a></p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      {/* Desktop Repair Modal */}
      <AnimatePresence>
        {isDesktopModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            {/* Backdrop close area */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsDesktopModalOpen(false)}></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#0A1329] border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl p-6 md:p-8 space-y-6 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDesktopModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900/60 p-2 rounded-full border border-slate-800 hover:border-slate-700 transition-all cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-900/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Desktop &amp; iMac Repair</h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    Premium doorstep and carry-in repair services for iMac, Mac Mini, Custom Gaming PCs, and Workstations.
                  </p>
                </div>
              </div>

              {/* Selection Options List */}
              <div className="space-y-3.5">
                {/* Option 1: Select Model */}
                <Link
                  to="/category/desktop"
                  onClick={() => setIsDesktopModalOpen(false)}
                  className="flex items-center justify-between p-4 bg-[#0E1B38] border border-slate-800 rounded-2xl hover:border-blue-500 hover:bg-[#122347] transition-all group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-900/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors shrink-0">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Select Desktop Model</span>
                      <span className="text-xs text-slate-450">iMac, Mac Mini, or specific brand PC models</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>

                {/* Option 2: Quick Booking Form */}
                <Link
                  to="/contact?tab=booking&device=desktop"
                  onClick={() => setIsDesktopModalOpen(false)}
                  className="flex items-center justify-between p-4 bg-[#0E1B38] border border-slate-800 rounded-2xl hover:border-blue-500 hover:bg-[#122347] transition-all group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-900/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors shrink-0">
                      <ArrowRight className="w-5 h-5 rotate-[-45deg]" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Book Doorstep Pickup</span>
                      <span className="text-xs text-slate-450">Fill details directly to schedule technician pickup</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>

                {/* Option 3: WhatsApp Support (Emerald highlight) */}
                <a
                  href="https://wa.me/919310112994?text=Hi,%20I%20would%20like%20to%20get%20a%20repair%20quote%20for%20my%20Desktop%20PC%20/%20iMac.%20Please%20assist%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-emerald-950/10 border border-emerald-900/30 rounded-2xl hover:border-emerald-500 hover:bg-emerald-900/10 transition-all group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block flex items-center gap-1.5">
                        WhatsApp Live Chat
                        <span className="bg-emerald-500 text-black text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 animate-pulse">Live</span>
                      </span>
                      <span className="text-xs text-slate-450">Chat with a technician for custom builds or hardware issues</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
                </a>

                {/* Option 4: Call Direct */}
                <a
                  href="tel:+919310112994"
                  className="flex items-center justify-between p-4 bg-[#0E1B38] border border-slate-800 rounded-2xl hover:border-blue-500 hover:bg-[#122347] transition-all group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-900/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Call Nehru Place Center</span>
                      <span className="text-xs text-slate-450">+91 9310112994 — Speak with an engineer</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
