import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-400 font-sans border-t-4 border-brand-orange">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/">
              <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-20 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-900">
              India's most trusted doorstep repair service for smartphones, tablets, laptops, and smartwatches. We bring the repair center to you.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 text-slate-900 rounded-full bg-white flex items-center justify-center hover:bg-[#0b1f3a] hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 text-slate-900 rounded-full bg-white flex items-center justify-center hover:bg-[#0b1f3a] hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-900">
              <li><Link to="/contact?tab=booking&device=mobile" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Mobile Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=laptop" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Laptop Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=tablet" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Tablet Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=watches" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Watches Repair</Link></li>
              <li><Link to="/contact?tab=booking&device=macbook" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Macbook</Link></li>
            </ul>
          </div>

          {/* Serviceable Areas */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">Serviceable Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-900">
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Delhi</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Noida</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Gurugram</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Faridabad</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Greater Noida</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Ghaziabad</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Dwarka</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">South Ex.</Link></li>
              <li><Link to="#" className="hover:text-[#0b1f3a] transition-colors">Rohini</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-900">
              <li><Link to="/tracker" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Contact Us</Link></li>
              <li><Link to="/signup" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#0b1f3a] rounded-full"></span> Sign Up</Link></li>
              <li className="!mt-5 pt-4 border-t border-slate-800"><a href="tel:+919818409122" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><Phone className="w-4 h-4 text-[#0b1f3a]" /> +91 9818409122</a></li>
              <li><a href="mailto:support@themobifixx.com" className="hover:text-[#0b1f3a] transition-colors flex items-center gap-2"><Mail className="w-4 h-4 text-[#0b1f3a]" /> support@themobifixx.com</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Disclaimer Area */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h5 className="font-bold text-sm text-slate-900 mb-4">Disclaimer</h5>
          <p className="text-xs text-slate-900 leading-relaxed max-w-4xl mx-auto">
            All trademarks, logos, and brand names are the property of their respective owners and are used for identification purposes only.
          </p>
          <p className="text-xs text-slate-900 leading-relaxed max-w-4xl mx-auto mt-2">
            “TheMobifixx is an independent third-party repair service provider and is not affiliated with or endorsed by any brand mentioned on this website.
            Please contact us for exact estimates and confirmation of service availability in your locality.”
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white gap-4">
          <p>© {currentYear} TheMobifixx. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
