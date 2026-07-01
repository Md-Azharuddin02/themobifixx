/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, UserCheck, Star, Sparkles, AlertCircle, Wrench, Hammer, ArrowUpRight, Cpu, MapPin, Clock } from 'lucide-react';
import { ServiceCategory, Technician, Testimonial } from '../types';
import ServiceIcon from '../components/ServiceIcon';
import ReviewStars from '../components/ReviewStars';
import PriceEstimator from '../components/PriceEstimator';
import InteractiveLaptop3D from '../components/InteractiveLaptop3D';

const HERO_SLIDES = [
  {
    badge: "Premium Doorstep Service",
    subBadge: "Delhi • Gurugram • Noida",
    titleLine1: "MacBook & Laptop Repairs",
    titleLine2: "Done at Your Doorstep.",
    titleLine2Color: "text-[#0F4CFF]",
    description: "Certified hardware engineers providing quick diagnostics, secure pickup, and guaranteed quality. Skip the crowded local tech markets—we handle the end-to-end repair process safely.",
    btnText: "Schedule Free Pickup",
    btnLink: "/contact?tab=booking"
  },
  {
    badge: "Advanced Chip-Level Lab",
    subBadge: "Dedicated Micro-Soldering Facility",
    titleLine1: "Logic Board Repair &",
    titleLine2: "Component Engineering.",
    titleLine2Color: "text-emerald-600",
    description: "Solving complex board failures under advanced binocular microscopes. We repair liquid spills, backlight faults, power failures, and IC errors without expensive motherboard replacements.",
    btnText: "Our Repair Services",
    btnLink: "/services"
  },
  {
    badge: "Guaranteed Workmanship",
    subBadge: "90-Day Comprehensive Warranty",
    titleLine1: "Genuine Spares Only,",
    titleLine2: "Zero Compromises.",
    titleLine2Color: "text-amber-500",
    description: "Every keyboard, battery, and display replacement undergoes a strict 24-point quality test. Backed by an official warranty certificate and direct WhatsApp tracking.",
    btnText: "Track Current Repair",
    btnLink: "/tracker"
  }
];

export default function Home() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, techRes, testRes] = await Promise.all([
          fetch('/api/services').then((r) => r.json()),
          fetch('/api/technicians').then((r) => r.json()),
          fetch('/api/testimonials').then((r) => r.json()),
        ]);
        setServices(srvRes.slice(0, 6)); // Display first 6 on homepage
        setTechnicians(techRes); // Display all expert technicians in the interactive slider
        setTestimonials(testRes.slice(0, 4)); // Display first 4 reviews
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const trustMetrics = [
    { value: '5000+', label: 'Devices Repaired', desc: 'Laptops, MacBooks & Phones' },
    { value: '1000+', label: 'Happy Customers', desc: '5-star reviewed in Delhi NCR' },
    { value: '10+', label: 'Expert Technicians', desc: 'Certified logical board specialists' },
    { value: '5+', label: 'Years Experience', desc: 'Established in Nehru Place' },
    { value: '100+', label: 'Corporate Devices Serviced', desc: 'AMCs for leading startups' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Book a Service',
      desc: 'Submit a brief request online or call us directly to schedule a convenient pickup time slot.',
    },
    {
      num: '02',
      title: 'Secure Transit',
      desc: 'Our representative collects your device from your home or office in a padded, static-safe transit box.',
    },
    {
      num: '03',
      title: 'Professional Diagnosis',
      desc: 'We inspect your hardware in our cleanroom lab and share a clear, flat-rate estimate before any work starts.',
    },
    {
      num: '04',
      title: 'Precision Repair',
      desc: 'Our certified technicians carry out component-level repairs and micro-soldering using original parts.',
    },
    {
      num: '05',
      title: 'Tested & Returned',
      desc: 'Your device undergoes a comprehensive 24-point check and is safely delivered back to you with a 90-day warranty card.',
    },
  ];

  const brands = [
    { name: 'Apple', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&auto=format&fit=crop&q=40' },
    { name: 'Dell', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&auto=format&fit=crop&q=40' },
    { name: 'HP', logo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&auto=format&fit=crop&q=40' },
    { name: 'Lenovo', logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&auto=format&fit=crop&q=40' },
    { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&auto=format&fit=crop&q=40' },
    { name: 'OnePlus', logo: 'https://images.unsplash.com/photo-1581090464762-647bf575c322?w=100&auto=format&fit=crop&q=40' },
  ];

  const faqs = [
    {
      q: "How does the doorstep pickup and delivery repair work?",
      a: "Simply select 'Pickup Required' during booking or call +91 99999 99999. Our certified transit agent will arrive at your location within 90 minutes. They will fill a hardware check form, issue an official transit receipt, and transport your device to our cleanroom lab safely. Once diagnosed, we quote; upon approval, we repair and deliver back!"
    },
    {
      q: "Do you charge anything for diagnostics or service visits?",
      a: "Diagnostic checks are 100% free if you go ahead with the recommended repair. For standalone visits where no repair is performed, a nominal inspection charge of ₹299 applies to cover transport."
    },
    {
      q: "What warranty do you offer on screen and motherboard repairs?",
      a: "LapyZone offers a robust 90-day warranty on all chips/motherboards and up to 1-year manufacturer warranty on screen panels, batteries, RAMs, and SSDs. If the same issue recurs, we fix it for free!"
    },
    {
      q: "Are my personal files and data safe during repair?",
      a: "Absolutely. Data security is our highest priority. We do not require your system login password for hardware diagnostics unless absolutely necessary. We also offer standard full-disk backups before proceeding with OS/motherboard service."
    },
    {
      q: "Where are your physical service centres located?",
      a: "Our master lab and corporate branch is located in G-12, Nehru Place, New Delhi. We also operate quick diagnostics hubs in DLF CyberCity, Gurugram, and Sector 62, Noida."
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="pt-24 pb-12 overflow-x-hidden">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24" id="hero-section">
        {/* Subtle background radial blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left relative min-h-[460px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 bg-[#00C48C] rounded-full animate-pulse"></span>
                      <span>{HERO_SLIDES[currentSlide].badge}</span>
                    </div>
                    
                    <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                      <span>{HERO_SLIDES[currentSlide].subBadge}</span>
                    </div>
                  </div>
                  
                  <h1 
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A1020] leading-[1.15] select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <span 
                      className="inline-block"
                      style={{
                        textShadow: '1px 1px 0px #e2e8f0, 2px 2px 0px #cbd5e1, 3px 3px 0px #94a3b8, 4px 4px 8px rgba(10, 16, 32, 0.12)',
                        transform: 'translateZ(15px)',
                      }}
                    >
                      {HERO_SLIDES[currentSlide].titleLine1}
                    </span>
                    <br/>
                    <span 
                      className={`${HERO_SLIDES[currentSlide].titleLine2Color} inline-block mt-1 sm:mt-2`}
                      style={{
                        textShadow: '1px 1px 0px #e2e8f0, 2px 2px 0px #cbd5e1, 3px 3px 12px rgba(15, 76, 255, 0.15)',
                        transform: 'translateZ(30px)',
                      }}
                    >
                      {HERO_SLIDES[currentSlide].titleLine2}
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {HERO_SLIDES[currentSlide].description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link
                      to={HERO_SLIDES[currentSlide].btnLink}
                      className="relative overflow-hidden w-full sm:w-auto text-center bg-[#FF7A00] hover:bg-[#E06B00] text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-orange-100 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group"
                    >
                      <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 1.4,
                          duration: 1.4,
                          ease: "easeInOut",
                        }}
                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                      />
                      <span className="relative z-10">{HERO_SLIDES[currentSlide].btnText}</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                    <Link
                      to="/services"
                      className="w-full sm:w-auto text-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Services</span>
                    </Link>
                    <motion.a
                      href="https://wa.me/919999999999?text=Hi%20LapyZone"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden w-full sm:w-auto text-center bg-white border border-slate-200 hover:border-emerald-500 text-emerald-600 font-bold px-8 py-4 rounded-xl shadow-sm flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300"
                      whileHover={{ 
                        scale: 1.03, 
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <motion.div
                        initial={{ left: "-100%" }}
                        whileHover={{ left: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -skew-x-12 pointer-events-none"
                      />
                      <MessageSquare className="w-4 h-4 text-[#00C48C] group-hover:scale-125 transition-transform duration-300" />
                      <span className="relative z-10">WhatsApp Us</span>
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress and control pagination row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-10 border-t border-slate-100 mt-10">
                {/* 3D Arrow Controllers */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevSlide}
                    className="w-9 h-9 bg-white border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all cursor-pointer"
                    aria-label="Previous slide"
                  >
                    &larr;
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-9 h-9 bg-white border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all cursor-pointer"
                    aria-label="Next slide"
                  >
                    &rarr;
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2.5">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className="group relative h-2 rounded-full bg-slate-200 transition-all cursor-pointer overflow-hidden"
                      style={{ width: idx === currentSlide ? "64px" : "14px" }}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {idx === currentSlide && (
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-[#0F4CFF] rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6.5, ease: "linear" }}
                          key={currentSlide}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Quality Badges inline */}
                <div className="hidden sm:flex items-center gap-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-200">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0F4CFF]" />
                    <span>ISO 9001 Lab</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F4CFF]" />
                    <span>Secure Intranet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Minimalism Abstract Tech Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <InteractiveLaptop3D activeSlide={currentSlide} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST METRICS */}
      <section className="bg-white border-y border-slate-200/60 py-10" id="metrics-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-around items-center gap-y-6 gap-x-12">
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-[#0A1020]">5000+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Devices Repaired</div>
            </div>
            <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-[#0A1020]">100+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Corporate AMCs</div>
            </div>
            <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-[#0A1020]">4.9 / 5.0</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Trust Rating</div>
            </div>
            <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-[#0A1020]">90-Min</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Doorstep Transit</div>
            </div>
            <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-[#0A1020]">90 Days</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ironclad Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC PRICE ESTIMATOR SECTION */}
      <PriceEstimator />

      {/* SECTION 3: SERVICE CATEGORIES GRID */}
      <section className="py-20 bg-slate-50/50" id="services-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>Our Specialties</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
              Professional Hardware Services For Your Primary Devices
            </h3>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We diagnose and repair MacBooks, laptops, iPhones, and iPads using cleanroom testing facilities and original OEM-spec components.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-white rounded-2xl border border-slate-100 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {services.map((s, index) => (
                <motion.div
                  key={s.slug}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="bg-white border border-slate-200/60 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 bg-slate-50 text-[#0F4CFF] border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0F4CFF] group-hover:text-white group-hover:border-[#0F4CFF] transition-all duration-300">
                      <ServiceIcon name={s.icon} className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0A1020] group-hover:text-[#0F4CFF] transition-colors mb-2.5">
                      {s.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600 tracking-wide bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      {s.pricing || 'Starts ₹299'}
                    </span>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-slate-600 hover:text-[#0F4CFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-all"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-sm font-bold text-[#0F4CFF] hover:text-[#0A3DCC] transition-colors"
            >
              <span>View All 15 Specialized Repairs & Upgrades</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 bg-white" id="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>How it Works</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
              The LapyZone Service Journey
            </h3>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From secure, door-to-door transit to cleanroom diagnostics, we make high-quality gadget repair stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 [perspective:1000px] relative">
            {steps.map((st, idx) => (
              <div key={idx} className="relative group">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    rotateX: 6,
                    rotateY: -6,
                    translateZ: 10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white border border-slate-200/80 rounded-2xl p-6 transition-all duration-300 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/5 cursor-default h-full z-10"
                >
                  <div className="text-4xl font-black text-slate-100 group-hover:text-[#0F4CFF]/10 transition-colors duration-300 mb-4">{st.num}</div>
                  <h4 className="font-bold text-[#0A1020] text-sm mb-2 group-hover:text-[#0F4CFF] transition-colors duration-300">{st.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">{st.desc}</p>
                  
                  {/* Active hover corner light */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#0F4CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(15,76,255,0.8)]"></div>
                </motion.div>

                {/* Horizontal Interconnecting Pipeline for Desktop (lg) */}
                {idx < 4 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 w-4 sm:w-6 lg:w-8 z-0 items-center justify-center pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F4CFF]/40 group-hover:bg-[#0F4CFF] group-hover:scale-125 transition-all duration-300"></div>
                    <div className="flex-1 border-t-2 border-dotted border-slate-200 group-hover:border-[#0F4CFF]/40 transition-colors duration-300"></div>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-[#0F4CFF]/60 transition-colors duration-300 ml-0.5">&rarr;</span>
                  </div>
                )}

                {/* Vertical Interconnecting Pipeline for Mobile/Tablet (below lg) */}
                {idx < 4 && (
                  <div className="lg:hidden flex absolute -bottom-5 left-1/2 -translate-x-1/2 h-4 z-0 items-center justify-center flex-col pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F4CFF]/40 group-hover:bg-[#0F4CFF] group-hover:scale-125 transition-all duration-300"></div>
                    <div className="flex-1 border-l-2 border-dotted border-slate-200 group-hover:border-[#0F4CFF]/40 transition-colors duration-300"></div>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-[#0F4CFF]/60 transition-colors duration-300 mt-0.5">&darr;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNICIAN SHOWCASE */}
      <section className="py-20 bg-slate-50/40 border-y border-slate-100" id="technicians-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-4 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <span>Certified Engineers</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
                Our Team of Hardware Engineers
              </h3>
              <p className="text-base text-slate-500">
                All repairs are handled by fully qualified, experienced technicians at our dedicated cleanroom facilities. We believe in high standards of diagnostic integrity and precise workmanship.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              {/* Scrolling controls */}
              <button 
                onClick={() => {
                  const el = document.getElementById('tech-cards-viewport');
                  if (el) el.scrollBy({ left: -360, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F4CFF] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Scroll Left"
              >
                ◀
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('tech-cards-viewport');
                  if (el) el.scrollBy({ left: 360, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F4CFF] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Scroll Right"
              >
                ▶
              </button>
              <Link
                to="/technicians"
                className="bg-[#0F4CFF] hover:bg-[#0A3DCC] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all"
              >
                View All
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-slate-50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Horizontally scrollable flex row */}
              <div 
                id="tech-cards-viewport"
                className="flex overflow-x-auto scrollbar-none gap-6 pb-6 px-1.5 scroll-smooth snap-x snap-mandatory"
              >
                {technicians.map((t) => (
                  <div 
                    key={t.name} 
                    className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] snap-start shrink-0 bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm group hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={t.profileImage}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 bg-[#0A1020]/90 backdrop-blur px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {t.experience} Years Experience
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-[#0A1020] text-lg">{t.name}</h4>
                        <p className="text-xs text-[#0F4CFF] font-semibold">{t.designation}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 py-3">
                        <div>
                          <span className="text-slate-400 block uppercase font-bold tracking-wider text-[9px]">Completed</span>
                          <span className="text-slate-800 font-bold">{t.repairsCompleted}+ Repairs</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block uppercase font-bold tracking-wider text-[9px]">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-slate-800 font-bold">{t.rating} / 5.0</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block uppercase font-bold tracking-wider text-[9px] mb-1">Specialization</span>
                        <span className="text-xs font-bold text-slate-600">{t.specialization}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: BRANDS SUPPORTED */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/50" id="brands-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest bg-slate-100 border border-slate-200/60 px-3.5 py-1 rounded-full">
              Brands We Service
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((b) => (
              <motion.div
                key={b.name}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 12px 30px rgba(15, 76, 255, 0.08)"
                }}
                className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100/80 rounded-2xl cursor-default transition-all duration-300 group shadow-sm hover:border-blue-150"
              >
                <span className="text-xs font-extrabold text-slate-400 group-hover:text-[#0F4CFF] transition-colors uppercase tracking-widest">
                  {b.name}
                </span>
                <span className="text-[8px] text-slate-300 group-hover:text-[#0F4CFF]/60 transition-colors font-black uppercase tracking-widest mt-1">
                  OEM Specifications
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: REVIEWS */}
      <section className="py-20 bg-white" id="reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>Customer Reviews</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
              Feedback from our customers
            </h3>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We take pride in our commitment to transparent diagnostics and precise repairs. Here is what local device owners say about their experience.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              <div className="h-48 bg-slate-50 border border-slate-200/50 rounded-2xl"></div>
              <div className="h-48 bg-slate-50 border border-slate-200/50 rounded-2xl"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{t.review}"
                  </p>
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/60">
                    <img
                      src={t.image}
                      alt={t.customerName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-[#0A1020] text-sm">{t.customerName}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <ReviewStars rating={t.rating} />
                        <span className="text-[9px] font-mono text-[#0F4CFF] uppercase font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                          {t.deviceType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 bg-[#0A1020] text-white hover:bg-[#0F4CFF] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              <span>Read All Reviews & Leave Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7.5: PHYSICAL LAB LOCATION (NEHRU PLACE) */}
      <section className="py-20 bg-white border-t border-b border-slate-100" id="lab-location-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Card */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <span>Our Master Lab</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
                Visit Us in Nehru Place Market
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                If you prefer to drop off your device personally rather than utilizing our free doorstep pickup service, you can visit our Master Lab in New Delhi's primary tech hub.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0F4CFF] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1020] text-sm">Full Address</h4>
                    <p className="text-xs text-slate-500 mt-0.5">G-12, Ground Floor, Nehru Place, New Delhi, Delhi 110019</p>
                    <p className="text-[11px] text-[#0F4CFF] font-medium mt-1">Landmark: Opposite Nehru Place Metro Station Exit 2</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C48C] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1020] text-sm">Support Hours</h4>
                    <p className="text-xs text-slate-500 mt-0.5">9:00 AM - 9:00 PM (Open 7 Days a Week)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1020] text-sm">Contact Hotline</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Call: +91 99999 99999</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://maps.google.com/?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0A1020] hover:bg-[#0F4CFF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact?tab=booking"
                  className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0A1020] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-all"
                >
                  <span>Book Free Pickup</span>
                </Link>
              </div>
            </div>

            {/* Right Map Embed Card */}
            <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg relative group">
              <iframe
                title="LapyZone Nehru Place Master Lab Location Map"
                src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute top-4 left-4 bg-[#0A1020]/95 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 shadow-md backdrop-blur-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Shop Address Pin</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-20 bg-slate-50/50" id="faq-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>FAQ</span>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0A1020] tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200/60 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0A1020] hover:bg-slate-50/30 transition-colors focus:outline-none"
                >
                  <span className="text-sm">{faq.q}</span>
                  <span className="text-lg font-bold text-[#0F4CFF] ml-4">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="p-5 bg-white border-t border-slate-100 text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="cta-banner">
        <div className="bg-[#0A1020] text-white rounded-3xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
          {/* Accent light glow effect inside container */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>Get Started</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to restore your device to original performance?
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Book a secure, doorstep pickup across Delhi NCR or schedule an appointment to visit our central lab. Our certified engineers will diagnose your device with full transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact?tab=booking"
                className="w-full sm:w-auto text-center bg-[#FF7A00] hover:bg-[#E06B00] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/10 hover:scale-[1.02] transition-transform"
              >
                Book Doorstep Pickup
              </Link>
              <a
                href="tel:+919999999999"
                className="w-full sm:w-auto text-center bg-white text-slate-900 hover:bg-slate-50 font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <Phone className="w-4 h-4 text-[#0F4CFF]" />
                <span>Call +91 99999 99999</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
