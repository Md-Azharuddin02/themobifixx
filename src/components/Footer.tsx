import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpeg';
import { Phone, Mail, MapPin, Clock, Shield, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-slate-600 hover:text-slate-950 transition-all group"
    >
      <span className="relative pb-0.5">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F4CFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "easeInOut"
        }}
        className="inline-block shrink-0"
      >
        <ArrowRight className="w-3 h-3 text-[#0F4CFF]" />
      </motion.span>
    </Link>
  );
}

function FooterAnchorLink({ href, children, target, rel }: { href: string; children: React.ReactNode; target?: string; rel?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-slate-600 hover:text-slate-950 transition-all group"
    >
      <span className="relative pb-0.5">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F4CFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "easeInOut"
        }}
        className="inline-block shrink-0"
      >
        <ArrowRight className="w-3 h-3 text-[#0F4CFF]" />
      </motion.span>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isFooterHoursOpen, setIsFooterHoursOpen] = useState(false);

  return (
    <footer id="app-footer" className="bg-[#F8FAFC] text-slate-600 border-t-4 border-slate-900 relative z-10 text-left">
      
      {/* Top Value Props Bar */}
      <div className="border-b-2 border-slate-900 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* OEM Prop Card */}
            <div className="relative group p-5 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-slate-900 text-[#0F4CFF] flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#0A1020]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-950 text-sm">Genuine OEM Spare Parts</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Only 100% original components with up to 1-year warranty.</p>
              </div>
            </div>

            {/* Certified Experts Prop Card */}
            <div className="relative group p-5 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-slate-900 text-[#00C48C] flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#0A1020]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-950 text-sm">Certified Tech Experts</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Repairs completed by certified chip-level master engineers.</p>
              </div>
            </div>

            {/* 90-Min Onsite Prop Card */}
            <div className="relative group p-5 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-slate-900 text-amber-600 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#0A1020]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-950 text-sm">90-Min Onsite Service</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Instant diagnosis & premium doorstep repairs in Delhi NCR.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* TheMobifixx Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center text-slate-950">
              <img 
                src={logoImg} 
                alt="TheMobifixx Logo" 
                className="h-11 sm:h-14 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">
              Premium device repair & refurbished technology service partner serving Delhi NCR. Experience chip-level precision with same-day transparent service.
            </p>
            <div className="text-xs text-slate-500 leading-relaxed font-semibold">
              Main Service Centre: G-12, Nehru Place, New Delhi, Delhi 110019 <br/>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-950 mb-6">Our Core Services</h3>
            <ul className="space-y-3.5 flex flex-col items-start">
              <li><FooterLink to="/services/laptop-repair">Laptop Repair</FooterLink></li>
              <li><FooterLink to="/services/macbook-repair">MacBook Pro & Air Repair</FooterLink></li>
              <li><FooterLink to="/services/mobile-repair">iPhone & Smartphone Repair</FooterLink></li>
              <li><FooterLink to="/services/tablet-repair">iPad & Tablet Repair</FooterLink></li>
              <li><FooterLink to="/services/data-recovery">Pro Data Recovery</FooterLink></li>
              <li><FooterLink to="/services/doorstep-repair">Doorstep Onsite Repair</FooterLink></li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-950 mb-6">Service Coverage</h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3.5 text-sm text-slate-500">
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Delhi</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Noida</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Gurugram</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Greater Noida</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Ghaziabad</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Faridabad</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Dwarka</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-[#0F4CFF] shrink-0" /><span className="font-bold">Saket</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-950 mb-6">Connect With Us</h3>
            <ul className="space-y-4 flex flex-col items-start w-full">
              
              {/* Phone & Dropdown Hours Block */}
              <li className="flex items-start space-x-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border-2 border-slate-900 flex items-center justify-center text-[#0F4CFF] shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_#0A1020]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 relative">
                  <FooterAnchorLink href="tel:+919310112994">+91 9310112994</FooterAnchorLink>
                  <div className="mt-1">
                    <button
                      onClick={() => setIsFooterHoursOpen(!isFooterHoursOpen)}
                      className="flex items-center gap-1 font-black text-slate-700 hover:text-[#0F4CFF] text-[11px] focus:outline-none cursor-pointer group/fhours"
                    >
                      <span>Mon-Sun: 9:00 AM - 9:00 PM (24/7)</span>
                      <motion.span 
                        animate={{ rotate: isFooterHoursOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[9px] text-slate-400 group-hover/fhours:text-[#0F4CFF] transition-colors inline-block"
                      >
                        ▼
                      </motion.span>
                    </button>
                  </div>

                  {/* Footer Timings Popover Panel */}
                  <AnimatePresence>
                    {isFooterHoursOpen && (
                      <>
                        {/* Outside click detector transparent layer */}
                        <div 
                          className="fixed inset-0 z-20 cursor-default" 
                          onClick={() => setIsFooterHoursOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute bottom-full left-0 mb-3 z-30 w-[180px] pointer-events-auto"
                        >
                          {/* Retro neobrutalist card border offset shadow */}
                          <div className="absolute -left-[3px] -bottom-[3px] inset-0 border-b-2 border-l-2 border-slate-900 rounded-xl bg-transparent pointer-events-none z-0"></div>
                          <div className="relative z-10 bg-white border-2 border-slate-900 rounded-xl p-3 space-y-1.5 shadow-md">
                            <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-1 text-left">
                              Weekly Timing Slots
                            </div>
                            {[
                              { day: 'Mon', time: '9am - 9pm' },
                              { day: 'Tue', time: '9am - 9pm' },
                              { day: 'Wed', time: '9am - 9pm' },
                              { day: 'Thu', time: '9am - 9pm' },
                              { day: 'Fri', time: '9am - 9pm' },
                              { day: 'Sat', time: '9am - 9pm' },
                              { day: 'Sun', time: '9am - 9pm' },
                            ].map((d, i) => (
                              <div key={i} className="flex justify-between text-[10px] font-bold text-slate-600 border-b border-slate-100 last:border-0 pb-1 last:pb-0">
                                <span className="text-slate-800">{d.day}</span>
                                <span className="font-mono text-emerald-700">{d.time}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </li>

              <li className="flex items-start space-x-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border-2 border-slate-900 flex items-center justify-center text-[#00C48C] shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_#0A1020]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start mt-0.5">
                  <FooterAnchorLink href="mailto:themobifixx@gmail.com">themobifixx@gmail.com</FooterAnchorLink>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="bg-[#F1F5F9] py-6 border-t-2 border-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 font-bold">
            <span>© {currentYear} TheMobifixx. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <span>Crafted for premium chip-level repairs in India.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <FooterLink to="/testimonials">Client Reviews</FooterLink>
            <FooterLink to="/tracker">Track Repair Status</FooterLink>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-and-conditions">Terms & Conditions</FooterLink>
          </div>
        </div>
      </div>

    </footer>
  );
}
