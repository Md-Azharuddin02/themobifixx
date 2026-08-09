import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Battery, Zap, ShieldCheck, CheckCircle2, Cpu, Droplet, Truck, Wrench, Laptop, Shield } from 'lucide-react';
import { resolvePageSEO } from '../utils/seo.utils';

interface ServiceDetailsData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  options: Array<{ id: number; name: string; icon: React.ReactNode; price: string }>;
  image: string;
}

const SERVICE_CATALOG_DATA: Record<string, ServiceDetailsData> = {
  'mobile-repair': {
    title: 'Mobile Phone Repair Service',
    subtitle: 'Smartphone Repair in Delhi NCR, Nehru Place',
    description:
      'Professional smartphone repair for Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, Xiaomi, Pixel and Realme. Display glass replacement, battery swap, charging jack, and IC repair with 90-day warranty.',
    features: ['Original OEM Displays', '30-Minute Fast Turnaround', '90-Day Warranty', 'Free Doorstep Pickup'],
    options: [
      { id: 1, name: 'Screen & Touch Glass Replacement', icon: <Smartphone className="w-5 h-5 text-blue-400" />, price: '₹999 Onwards' },
      { id: 2, name: 'Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹799 Onwards' },
      { id: 3, name: 'Charging Port / Jack Repair', icon: <Zap className="w-5 h-5 text-blue-400" />, price: '₹499 Onwards' },
      { id: 4, name: 'Motherboard IC Repair', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹1,499 Onwards' },
      { id: 5, name: 'Camera & Glass Repair', icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, price: '₹699 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop',
  },
  'laptop-repair': {
    title: 'Laptop Repair & Motherboard Service',
    subtitle: 'Chip-Level Laptop Repair Center at Nehru Place, Delhi',
    description:
      'Expert chip-level motherboard repairing, display panel replacement, power IC fixing, hinge repair, and RAM/SSD performance upgrades for Dell, HP, Lenovo, Asus, Acer, and MSI laptops.',
    features: ['BGA Micro-Soldering Lab', 'Short Circuit Diagnosis', '90-Day Warranty', 'Free Pickup & Delivery'],
    options: [
      { id: 1, name: 'Motherboard Chip-Level Repair', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹1,499 Onwards' },
      { id: 2, name: 'FHD/OLED Screen Replacement', icon: <Laptop className="w-5 h-5 text-blue-400" />, price: '₹2,499 Onwards' },
      { id: 3, name: 'Laptop Battery Swap', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹1,299 Onwards' },
      { id: 4, name: 'Keyboard & Trackpad Repair', icon: <Wrench className="w-5 h-5 text-blue-400" />, price: '₹899 Onwards' },
      { id: 5, name: 'RAM & NVMe SSD Speed Boost', icon: <Zap className="w-5 h-5 text-blue-400" />, price: '₹1,199 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop',
  },
  'macbook-repair': {
    title: 'MacBook & iMac Specialist Repair',
    subtitle: 'Apple Mac Logic Board Micro-Soldering in Nehru Place',
    description:
      'Certified Apple Mac repair engineers. Specialized logic board chip repair, Retina display replacement, Type-C charging IC fix, Flexgate repair, and liquid damage recovery for MacBook Air, Pro, M1/M2/M3/M4 & iMac.',
    features: ['Apple Micro-Soldering Specialists', 'Original Grade Retina Panels', 'Transparent Diagnostic Report', '90-Day Warranty'],
    options: [
      { id: 1, name: 'MacBook Logic Board Repair', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹2,999 Onwards' },
      { id: 2, name: 'Retina Display Assembly', icon: <Laptop className="w-5 h-5 text-blue-400" />, price: '₹6,499 Onwards' },
      { id: 3, name: 'MacBook Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹3,499 Onwards' },
      { id: 4, name: 'Trackpad & Keyboard Fix', icon: <Wrench className="w-5 h-5 text-blue-400" />, price: '₹1,999 Onwards' },
      { id: 5, name: 'Type-C Charging IC Fix', icon: <Zap className="w-5 h-5 text-blue-400" />, price: '₹2,499 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  },
  'tablet-repair': {
    title: 'Tablet & iPad Repair Service',
    subtitle: 'iPad & Android Tablet Screen & Charging Port Fix',
    description:
      'Fast screen glass replacement, digitizer fix, battery replacement, and charging port repair for Apple iPad (Air, Pro, Mini), Samsung Galaxy Tab, and Lenovo Tab across Delhi NCR.',
    features: ['OEM Digitizers', 'Touch Glass Replacement', '90-Day Warranty', 'Doorstep Pickup'],
    options: [
      { id: 1, name: 'iPad Screen & Glass Replacement', icon: <Smartphone className="w-5 h-5 text-blue-400" />, price: '₹1,999 Onwards' },
      { id: 2, name: 'Tablet Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹1,299 Onwards' },
      { id: 3, name: 'Charging Port & Jack Fix', icon: <Zap className="w-5 h-5 text-blue-400" />, price: '₹799 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop',
  },
  'battery-replacement': {
    title: 'Mobile & Laptop Battery Replacement',
    subtitle: 'High Capacity Original Grade Batteries in Delhi',
    description:
      'Solve fast battery drain, sudden shutdown, swollen battery, and heating issues with certified high-grade battery replacements for smartphones, MacBooks, and Windows laptops.',
    features: ['Grade-A Battery Cells', 'Overcharge Protection IC', '90-Day Warranty', 'Free Health Checkup'],
    options: [
      { id: 1, name: 'iPhone Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹1,199 Onwards' },
      { id: 2, name: 'Android Phone Battery Swap', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹799 Onwards' },
      { id: 3, name: 'MacBook & Laptop Battery', icon: <Battery className="w-5 h-5 text-blue-400" />, price: '₹2,499 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?q=80&w=1200&auto=format&fit=crop',
  },
  'motherboard-repair': {
    title: 'Motherboard & Logic Board Micro-Soldering',
    subtitle: 'Chip-Level IC & Short Circuit Repair in Nehru Place',
    description:
      'Advanced BGA reballing, power management IC replacement, display IC fixing, dead phone recovery, and motherboard short-circuit resolution by master technicians.',
    features: ['Microscope Soldering Station', 'Component-Level Repair', 'Data Protection Safety', 'No Repair No Fee'],
    options: [
      { id: 1, name: 'Laptop Motherboard Short Fix', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹1,499 Onwards' },
      { id: 2, name: 'Mobile Power IC & Charging IC', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹1,299 Onwards' },
      { id: 3, name: 'MacBook Logic Board BGA Repair', icon: <Cpu className="w-5 h-5 text-blue-400" />, price: '₹2,999 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
  'water-damage-repair': {
    title: 'Water & Liquid Damage Recovery',
    subtitle: 'Emergency Liquid Damage Treatment for Phones & Laptops',
    description:
      'Accidentally dropped device in water or coffee? Our ultrasonic deep bath cleaning, corrosion treatment, and power rail restoration save dead liquid-damaged devices.',
    features: ['Ultrasonic Cleaning Lab', 'Corrosion De-oxidation', 'Data Recovery Priority', 'High Success Rate'],
    options: [
      { id: 1, name: 'Mobile Liquid Damage Clean & Fix', icon: <Droplet className="w-5 h-5 text-blue-400" />, price: '₹999 Onwards' },
      { id: 2, name: 'Laptop Water Damage Restoration', icon: <Droplet className="w-5 h-5 text-blue-400" />, price: '₹1,999 Onwards' },
      { id: 3, name: 'MacBook Water Damage Logic Board', icon: <Droplet className="w-5 h-5 text-blue-400" />, price: '₹2,999 Onwards' },
    ],
    image: 'https://images.unsplash.com/photo-1563770660941-20978e770fa3?q=80&w=1200&auto=format&fit=crop',
  },
  'doorstep-repair': {
    title: 'Free Doorstep Device Repair & Pickup',
    subtitle: 'Convenient Home & Office Repair Across Delhi NCR',
    description:
      'Why waste time visiting repair markets? Book free doorstep service — certified technician visits your home or office in Delhi, Noida, Gurugram, Ghaziabad & Faridabad.',
    features: ['Zero Travel Expense', 'On-Site Diagnostic', 'Transparent Live Repair', '90-Day Warranty'],
    options: [
      { id: 1, name: 'Doorstep Mobile Screen Repair', icon: <Truck className="w-5 h-5 text-blue-400" />, price: 'Free Pickup' },
      { id: 2, name: 'Doorstep Laptop Pickup', icon: <Truck className="w-5 h-5 text-blue-400" />, price: 'Free Pickup' },
      { id: 3, name: 'Doorstep MacBook Pickup', icon: <Truck className="w-5 h-5 text-blue-400" />, price: 'Free Pickup' },
    ],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug || 'mobile-repair';

  const seoData = resolvePageSEO(`/services/${currentSlug}`);
  const serviceInfo: ServiceDetailsData = SERVICE_CATALOG_DATA[currentSlug] || {
    title: seoData.h1 || 'Repair Service',
    subtitle: 'Professional Repair in Delhi NCR, Nehru Place',
    description: seoData.description,
    features: ['OEM Replacement Parts', 'Certified Engineers', '90-Day Warranty', 'Doorstep Service'],
    options: [
      { id: 1, name: 'Standard Diagnostic & Repair', icon: <Wrench className="w-5 h-5 text-blue-400" />, price: 'Best Market Price' },
      { id: 2, name: 'Display Screen Replacement', icon: <Smartphone className="w-5 h-5 text-blue-400" />, price: 'OEM Parts' },
      { id: 3, name: 'Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" />, price: 'Full Warranty' },
    ],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop',
  };

  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone) return;
    setIsSubmitted(true);
    const message = `Hi! 👋 I want to book ${serviceInfo.title} for my device. Phone number: ${customerPhone}.`;
    window.open(`https://wa.me/919310112994?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#050B18] min-h-screen font-sans pb-20 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-400 mb-6 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-1 shrink-0" />
          <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 mx-1 shrink-0" />
          <span className="text-slate-200 font-bold">{serviceInfo.title}</span>
        </nav>

        {/* H1 Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">{serviceInfo.title}</h1>
          <p className="text-sm text-blue-400 mt-1 font-semibold">{serviceInfo.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8">
            {/* Overview Banner */}
            <div className="bg-[#0A1329] rounded-2xl shadow-xl border border-slate-800 p-6 md:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
                  <img src={serviceInfo.image} alt={serviceInfo.title} className="w-full h-full object-cover opacity-85" loading="lazy" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-slate-300 leading-relaxed">{serviceInfo.description}</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {serviceInfo.features.map((feat, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Repair Options Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Available Repair Options & Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceInfo.options.map((opt) => (
                  <div key={opt.id} className="bg-[#0A1329] p-5 rounded-2xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/30">
                        {opt.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{opt.name}</h3>
                        <p className="text-xs text-blue-400 font-medium mt-0.5">{opt.price}</p>
                      </div>
                    </div>
                    <Link
                      to={`/contact?tab=booking&service=${encodeURIComponent(opt.name)}`}
                      className="text-xs font-bold text-blue-400 bg-blue-600/15 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full transition-all border border-blue-900/30 shrink-0"
                    >
                      Book
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Trust Section */}
            <div className="bg-[#0A1329] rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Why Choose TheMobiFixx in Nehru Place?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="space-y-1 bg-[#0E1B38] p-4 rounded-xl border border-slate-800">
                  <strong className="text-white block text-sm">Certified Engineers</strong>
                  <p className="text-slate-400">10+ years of experience in micro-soldering, IC reballing, and logic board schematics.</p>
                </div>
                <div className="space-y-1 bg-[#0E1B38] p-4 rounded-xl border border-slate-800">
                  <strong className="text-white block text-sm">90-Day Parts Warranty</strong>
                  <p className="text-slate-400">Every replacement display, battery, or motherboard component comes backed by a 90-day warranty.</p>
                </div>
              </div>
            </div>

            {/* Internal Links for SEO */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
              <span className="text-slate-300 font-bold">Related Services:</span>
              <Link to="/services/mobile-repair" className="hover:text-blue-400 transition-colors">Mobile Repair</Link>
              <span className="text-slate-700">•</span>
              <Link to="/services/laptop-repair" className="hover:text-blue-400 transition-colors">Laptop Repair</Link>
              <span className="text-slate-700">•</span>
              <Link to="/services/macbook-repair" className="hover:text-blue-400 transition-colors">MacBook Repair</Link>
              <span className="text-slate-700">•</span>
              <Link to="/services/doorstep-repair" className="hover:text-blue-400 transition-colors">Doorstep Repair</Link>
            </div>
          </div>

          {/* Quick Booking Sidebar Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#0A1329] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                <div className="bg-[#0E1B38] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Instant Repair Quote</h3>
                  <span className="text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-900/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
                  </span>
                </div>
                <div className="p-6">
                  <form onSubmit={handleQuickBook} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Your Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full border border-slate-800 bg-[#0E1B38] text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-full shadow-lg transition-all text-sm cursor-pointer"
                    >
                      Book Repair on WhatsApp
                    </button>
                  </form>
                  {isSubmitted && <p className="text-xs text-emerald-400 mt-3 text-center">Redirecting to WhatsApp support...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}