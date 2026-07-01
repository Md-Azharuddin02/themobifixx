/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, Award, Heart, Hammer } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-[#0A1020] text-slate-400 border-t border-slate-800/80">
      {/* Top Value Props Bar */}
      <div className="border-b border-slate-800/50 bg-[#0E1626]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center border border-[#0F4CFF]/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Genuine OEM Spare Parts</h4>
                <p className="text-xs text-slate-500">Only 100% original components with up to 1-year warranty.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00C48C] flex items-center justify-center border border-emerald-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Certified Tech Experts</h4>
                <p className="text-xs text-slate-500">Repairs completed by certified chip-level master engineers.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">90-Min Onsite Service</h4>
                <p className="text-xs text-slate-500">Instant diagnosis & premium doorstep repairs in Delhi NCR.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* LapyZone Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center space-x-2.5 text-xl font-extrabold text-white tracking-tight">
              <span className="w-6 h-6 bg-[#0F4CFF] rounded-lg flex items-center justify-center text-xs text-white">L</span>
              <span>LapyZone</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium device repair & refurbished technology service partner serving Delhi NCR. Experience chip-level precision with same-day transparent service.
            </p>
            <div className="text-xs text-slate-500 leading-relaxed">
              Corporate Office: G-12, Nehru Place, New Delhi, Delhi 110019 <br/>
              Branch: Phase-III, DLF CyberCity, Gurugram, Haryana 122002
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Our Core Services</h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link to="/services/laptop-repair" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">Laptop Repair</Link></li>
              <li><Link to="/services/macbook-repair" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">MacBook Pro & Air Repair</Link></li>
              <li><Link to="/services/mobile-repair" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">iPhone & Smartphone Repair</Link></li>
              <li><Link to="/services/tablet-repair" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">iPad & Tablet Repair</Link></li>
              <li><Link to="/services/data-recovery" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">Pro Data Recovery</Link></li>
              <li><Link to="/services/doorstep-repair" className="hover:text-white hover:underline transition-colors decoration-blue-500 underline-offset-4">Doorstep Onsite Repair</Link></li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Service Coverage</h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3.5 text-sm text-slate-400">
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Delhi</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Noida</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Gurugram</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Greater Noida</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Ghaziabad</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Faridabad</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Dwarka</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" /><span>Saket</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Connect With Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#0F4CFF] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919999999999" className="hover:text-white transition-colors block font-semibold">+91 99999 99999</a>
                  <span className="text-xs text-slate-500">Mon-Sun: 9:00 AM - 9:00 PM</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00C48C] shrink-0" />
                <a href="mailto:support@lapyzone.in" className="hover:text-white transition-colors">support@lapyzone.in</a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Daily Open Support <br />
                  Emergency Doorstep Repair available 24/7 on call.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="bg-[#080D1A] py-6 border-t border-slate-800 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© {currentYear} LapyZone. All rights reserved.</span>
            <span>|</span>
            <span>Crafted for premium chip-level repairs in India.</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/testimonials" className="hover:text-slate-300 transition-colors">Client Reviews</Link>
            <Link to="/tracker" className="hover:text-slate-300 transition-colors">Track Repair Status</Link>
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
