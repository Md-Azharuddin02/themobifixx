import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, Star, ArrowUpRight, MapPin, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceCategory, Technician, Testimonial } from '../types';
import ServiceIcon from '../components/ServiceIcon';
import ReviewStars from '../components/ReviewStars';
import PriceEstimator from '../components/PriceEstimator';
import DeviceComparison from '../components/DeviceComparison';

const BRAND_LOGOS: Record<string, React.ReactNode> = {
  Apple: (
    <img 
      src="https://logo.clearbit.com/apple.com" 
      alt="Apple logo" 
      className="h-8 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/apple.svg";
      }}
    />
  ),
  Dell: (
    <img 
      src="https://logo.clearbit.com/dell.com" 
      alt="Dell logo" 
      className="h-7 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/dell.svg";
      }}
    />
  ),
  HP: (
    <img 
      src="https://logo.clearbit.com/hp.com" 
      alt="HP logo" 
      className="h-8 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/hp.svg";
      }}
    />
  ),
  Lenovo: (
    <img 
      src="https://logo.clearbit.com/lenovo.com" 
      alt="Lenovo logo" 
      className="h-6 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/lenovo.svg";
      }}
    />
  ),
  Samsung: (
    <img 
      src="https://logo.clearbit.com/samsung.com" 
      alt="Samsung logo" 
      className="h-4.5 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/samsung.svg";
      }}
    />
  ),
  OnePlus: (
    <img 
      src="https://logo.clearbit.com/oneplus.com" 
      alt="OnePlus logo" 
      className="h-6 w-auto object-contain select-none transition-all duration-300 group-hover:scale-105 shrink-0"
      onError={(e) => {
        e.currentTarget.src = "https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/oneplus.svg";
      }}
    />
  )
};

// Generates dynamic green shades for the mosaic grid, darker towards the center.
const getBlockColor = (index: number) => {
  const gridCols = 16;
  const col = index % gridCols;
  const row = Math.floor(index / gridCols);
  
  // Deterministic pseudo-random seed based on position hash
  const random = Math.sin(index * 12.9898 + row * 78.233) * 43758.5453;
  const hash = Math.abs(random) % 1;
  
  // Uniformly bright, premium green mosaic palette matching the reference image's vibrant segments
  const colors = [
    'bg-[#84cc16]/75',  
    'bg-[#a3e635]/80',  
    'bg-[#bef264]/70',  
    'bg-[#22c55e]/60',  
    'bg-[#16a34a]/50',  
    'bg-[#15803d]/45',  
    'bg-[#f7fee7]/40',  
    'bg-[#d9f99d]/75',  
    'bg-[#a3e635]/90',  
    'bg-[#f7fee7]/85',  
  ];
  
  return colors[Math.floor(hash * colors.length)];
};
function ServiceCard({ s }: { s: ServiceCategory }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Set 3D rotation angles (up to 12 degrees)
    setRotate({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white border-2 border-slate-900 hover:border-slate-900 rounded-2xl p-6 transition-all duration-200 relative group flex flex-col justify-between h-full select-none cursor-pointer shadow-[4px_4px_0px_#0A1020] hover:shadow-[6px_6px_0px_#0A1020]"
      style={{ 
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${rotate.x || rotate.y ? '1.03, 1.03, 1.03' : '1, 1, 1'})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, shadow 0.2s, border-color 0.2s'
      }}
    >
      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        <div className="w-11 h-11 bg-slate-50 text-[#0F4CFF] border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0D0D0D] group-hover:text-white transition-all duration-200">
          <ServiceIcon name={s.icon} className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-black text-[#0A1020] group-hover:text-[#0F4CFF] transition-colors mb-2.5">
          {s.title}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          {s.description}
        </p>
      </div>

      <div 
        className="pt-4 border-t-2 border-slate-900 flex items-center justify-between"
        style={{ transform: 'translateZ(15px)' }}
      >
        <span className="text-[10px] font-black text-emerald-700 tracking-wide bg-emerald-50 border-2 border-slate-900 px-3 py-1 rounded-full">
          {s.pricing || 'Starts ₹299'}
        </span>
        <Link
          to={`/services/${s.slug}`}
          className="text-slate-800 hover:text-[#0F4CFF] text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1.5 transition-all"
        >
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

const getStepSVG = (num: string) => {
  if (num === '01') {
    return (
      <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (num === '02') {
    return (
      <svg className="w-5 h-5 text-[#84cc16] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  }
  if (num === '03') {
    return (
      <svg className="w-5 h-5 text-cyan-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  if (num === '04') {
    return (
      <svg className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-emerald-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
};

export default function Home() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isHoursDropdownOpen, setIsHoursDropdownOpen] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const collageImages = [
    {
      src: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000531/WhatsApp_Image_2026-07-01_at_1.56.06_PM_pjm3ys.jpg",
      title: "MacBook & iMac Repairs",
      desc: "Authorized diagnostic procedures & chip-level micro-soldering."
    },
    {
      src: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000531/WhatsApp_Image_2026-06-30_at_8.23.29_PM_bcwdde.jpg",
      title: "Smartphone Panels",
      desc: "100% genuine glass screens & digitizers."
    },
    {
      src: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000532/WhatsApp_Image_2026-07-01_at_1.56.08_PM_mhnaxr.jpg",
      title: "iPads & Tablets",
      desc: "ESD-safe laboratory workbench diagnostics."
    },
    {
      src: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=1600&auto=format&fit=crop&q=80",
      title: "Logic Board Soldering",
      desc: "BGA reballing & micro-soldering restoration."
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80",
      title: "Precision Testing",
      desc: "Multimeter calibration & voltage checkups."
    }
  ];

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % collageImages.length);
    }
  };
  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + collageImages.length) % collageImages.length);
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, techRes, testRes] = await Promise.all([
          fetch('/api/services').then((r) => r.json()),
          fetch('/api/technicians').then((r) => r.json()),
          fetch('/api/testimonials').then((r) => r.json()),
        ]);
        const servicesData = Array.isArray(srvRes) ? srvRes : [];
        const techData = Array.isArray(techRes) ? techRes : [];
        const testData = Array.isArray(testRes) ? testRes : [];

        setServices(servicesData.slice(0, 6)); // Display first 6 on homepage
        setTechnicians(techData); // Display all expert technicians in the interactive slider
        setTestimonials(testData.slice(0, 4)); // Display first 4 reviews
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
    { value: '100+', label: 'Corporate AMCs', desc: 'AMCs for leading startups' },
    { value: '4.9 / 5.0', label: 'Trust Rating', desc: '5-star reviewed in Delhi NCR' },
    { value: '90-Min', label: 'Doorstep Transit', desc: 'Delhi • Gurugram • Noida' },
    { value: '90 Days', label: 'Ironclad Warranty', desc: 'Guaranteed workmanship' }
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
      a: "Simply select 'Pickup Required' during booking or call <a href=\"tel:+919310112994\" className=\"text-[#0F4CFF] hover:underline font-bold\">+91 9310112994</a>. Our certified transit agent will arrive at your location within 90 minutes. They will fill a hardware check form, issue an official transit receipt, and transport your device to our cleanroom lab safely. Once diagnosed, we quote; upon approval, we repair and deliver back!"
    },
    {
      q: "Do you charge anything for diagnostics or service visits?",
      a: "Diagnostic checks are 100% free if you go ahead with the recommended repair. For standalone visits where no repair is performed, a nominal inspection charge of ₹299 applies to cover transport."
    },
    {
      q: "What warranty do you offer on screen and motherboard repairs?",
      a: "TheMobifixx offers a robust 90-day warranty on all chips/motherboards and up to 1-year manufacturer warranty on screen panels, batteries, RAMs, and SSDs. If the same issue recurs, we fix it for free!"
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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="pt-20 md:pt-32 pb-12 overflow-x-hidden">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden border-b-2 border-slate-900" id="hero-section">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        {/* Glow Accent Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Neobrutalist Text Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#FFB800] border-2 border-slate-900 text-slate-900 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#0A1020]">
                <span>Nehru Place Master Lab • Delhi NCR</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                MacBook & <br />
                <span className="text-[#0F4CFF] relative inline-block">
                  Mobile Repairing.
                  <span className="absolute bottom-1.5 left-0 w-full h-2 bg-[#FFB800] -z-10 rounded"></span>
                </span> Done Right.
              </h1>
              
              <p className="text-slate-600 text-sm sm:text-base font-bold leading-relaxed max-w-xl">
                We fix what others can't. Premium chip-level logic board diagnostics and component repairs for MacBooks, Laptops & Mobile Phones. Choose between master lab visits in Nehru Place or a free 90-min doorstep transit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/contact?tab=booking"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFB800] text-slate-950 border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-4 px-8 rounded-xl shadow-[4px_4px_0px_#0D0D0D] hover:shadow-[6px_6px_0px_#0D0D0D] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#0D0D0D] transition-all cursor-pointer text-center font-bold"
                >
                  <span>Book Doorstep Pickup</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>

                <a
                  href="tel:+919310112994"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-955 border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-4 px-8 rounded-xl shadow-[4px_4px_0px_#0D0D0D] hover:shadow-[6px_6px_0px_#0D0D0D] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#0D0D0D] transition-all cursor-pointer text-center font-bold"
                >
                  <Phone className="w-4 h-4 text-[#0F4CFF]" />
                  <span>Call +91 9310112994</span>
                </a>
              </div>

              {/* Mini Trust Highlights */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#0F4CFF]">✔</span> 90-Day Warranty
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#0F4CFF]">✔</span> Free Diagnostics
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#0F4CFF]">✔</span> No Fix, No Fee
                </div>
              </div>
            </div>

            {/* Right Column: High-Tech Interactive Diagnostic Card */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                className="bg-white border-4 border-slate-900 rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_#0A1020] relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                {/* Header status bar */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full border border-slate-900"></div>
                    <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full border border-slate-900"></div>
                    <div className="w-3.5 h-3.5 bg-green-500 rounded-full border border-slate-900"></div>
                  </div>
                  <div className="bg-slate-100 border border-slate-900 px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-700 tracking-wider">
                    Diagnostic Bench
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Title indicator */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-black uppercase text-[#0F4CFF] tracking-wider block">Live Lab Status</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Nehru Place Workbench</h3>
                  </div>

                  {/* Diagnostic status item list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-900 p-3.5 rounded-2xl shadow-[2px_2px_0px_#0A1020]">
                      <div className="flex items-center space-x-3 text-left">
                        <span className="text-lg">💻</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900 leading-none">Apple MacBook Pro</span>
                          <span className="text-[9px] font-bold text-slate-500 mt-1">Logic Board Micro-Soldering</span>
                        </div>
                      </div>
                      <span className="bg-[#FFB800] text-slate-900 border border-slate-900 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#0D0D0D]">
                        Repaired
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-900 p-3.5 rounded-2xl shadow-[2px_2px_0px_#0A1020]">
                      <div className="flex items-center space-x-3 text-left">
                        <span className="text-lg">📱</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900 leading-none">iPhone 14 Pro Max</span>
                          <span className="text-[9px] font-bold text-slate-500 mt-1">Broken Glass Panel Repair</span>
                        </div>
                      </div>
                      <span className="bg-[#FFB800] text-slate-900 border border-slate-900 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#0D0D0D]">
                        Repaired
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-[#0F4CFF]/5 border-2 border-slate-900 p-3.5 rounded-2xl shadow-[3px_3px_0px_#0F4CFF]">
                      <div className="flex items-center space-x-3 text-left">
                        <span className="text-lg">⚡</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900 leading-none">HP EliteBook Hinge</span>
                          <span className="text-[9px] font-bold text-slate-500 mt-1">Structural Frame Restore</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
                        <span className="text-blue-700 text-[8px] font-black uppercase tracking-widest">
                          Testing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Button link to live ticket tracking */}
                  <Link
                    to="/tracker"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0F4CFF] text-white border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-[3px_3px_0px_#0D0D0D] hover:shadow-[5px_5px_0px_#0D0D0D] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[1.5px_1.5px_0px_#0D0D0D] transition-all cursor-pointer text-center font-bold"
                  >
                    <span>Track Live Repair Ticket</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="cta-banner">
        <div className="bg-[#0A1020] text-white border-4 border-slate-900 rounded-[32px] p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-[8px_8px_0px_#FFB800]">
          {/* Accent light glow effect inside container */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#FFB800] border-2 border-slate-900 text-slate-900 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#0A1020]">
              <span>Get Started</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to restore your device to original performance?
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-bold">
              Book a secure, doorstep pickup across Delhi NCR or schedule an appointment to visit our central lab. Our certified engineers will diagnose your device with full transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              
              {/* Doorstep Pickup Button */}
              <Link
                to="/contact?tab=booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFB800] text-slate-900 border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-3.5 px-8 rounded-xl shadow-[3px_3px_0px_#0D0D0D] hover:shadow-[4px_4px_0px_#0D0D0D] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_#0D0D0D] transition-all cursor-pointer text-center"
              >
                <span>Book Doorstep Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Call Hotline Button */}
              <a
                href="tel:+919310112994"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-3.5 px-8 rounded-xl shadow-[3px_3px_0px_#0D0D0D] hover:shadow-[4px_4px_0px_#0D0D0D] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_#0D0D0D] transition-all cursor-pointer text-center"
              >
                <Phone className="w-4 h-4 text-[#0F4CFF]" />
                <span>Call +91 9310112994</span>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST METRICS */}
      <section className="bg-slate-50/30 border-b-2 border-slate-900 py-12" id="metrics-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustMetrics.map((m, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-45px" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: idx * 0.06 }}
                className="relative overflow-hidden bg-white border-2 border-slate-900 rounded-2xl p-5 text-center shadow-[4px_4px_0px_#0A1020] flex flex-col justify-between h-full transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#0A1020] group cursor-default"
              >
                {/* Tech glowing accent line on card top hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#a3e635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-t-2xl"></div>

                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.12 + idx * 0.06 }}
                    className="text-3xl font-extrabold text-[#0A1020] tracking-tight group-hover:text-blue-600 transition-colors"
                  >
                    {m.value}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.18 + idx * 0.06 }}
                    className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2"
                  >
                    {m.label}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.24 + idx * 0.06 }}
                    className="text-xs text-slate-500 mt-2 font-medium leading-relaxed"
                  >
                    {m.desc}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC PRICE ESTIMATOR SECTION */}
      <PriceEstimator />

      {/* SECTION 3: SERVICE CATEGORIES GRID */}
      <section className="py-20 bg-slate-50/50 border-b-2 border-slate-900" id="services-grid-section">
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
            <div className="flex flex-row overflow-x-auto pb-8 gap-4 px-5 -mx-5 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-[calc(100vw-40px)] md:w-auto h-64 bg-white rounded-2xl border-2 border-slate-900 animate-pulse shrink-0"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="flex flex-row overflow-x-auto pb-8 gap-4 px-5 -mx-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0 snap-x snap-mandatory scrollbar-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {services.map((s) => (
                <div key={s.slug} className="w-[calc(100vw-40px)] md:w-auto snap-start self-stretch shrink-0">
                  <ServiceCard s={s} />
                </div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-sm font-black text-[#0F4CFF] hover:text-[#0A3DCC] transition-all group"
            >
              <span className="relative pb-0.5">
                View All 15 Specialized Repairs & Upgrades
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F4CFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 bg-white border-b-2 border-slate-900" id="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>How it Works</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
              The TheMobifixx Service Journey
            </h3>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From secure, door-to-door transit to cleanroom diagnostics, we make high-quality gadget repair stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 relative">
            {steps.map((st, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }}
                className="relative group h-full transition-transform duration-200"
              >
                <div className="relative bg-white border-2 border-slate-900 rounded-2xl p-6 cursor-default h-full z-10 overflow-hidden transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#0A1020] shadow-[4px_4px_0px_#0A1020]">
                  {/* Tech dot grid background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:8px_8px] opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-0"></div>

                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-slate-900 transition-all duration-200 ${
                      idx === 0 ? 'bg-blue-50 text-blue-600 group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D]' :
                      idx === 1 ? 'bg-lime-50 text-[#84cc16] group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D]' :
                      idx === 2 ? 'bg-cyan-50 text-cyan-600 group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D]' :
                      idx === 3 ? 'bg-amber-50 text-amber-600 group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D]' :
                      'bg-emerald-50 text-emerald-600 group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D]'
                    }`}>
                      {getStepSVG(st.num)}
                    </div>
                    <div className="text-xs font-mono font-black text-slate-300 group-hover:text-slate-500 transition-colors duration-200">{st.num}</div>
                  </div>

                  <h4 className="font-black text-[#0A1020] text-sm mb-2 group-hover:text-[#0F4CFF] transition-colors duration-200">{st.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-200">{st.desc}</p>
                  
                  {/* Active hover corner light */}
                  <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md ${
                    idx === 0 ? 'bg-blue-500 shadow-blue-500/80' :
                    idx === 1 ? 'bg-lime-500 shadow-lime-500/80' :
                    idx === 2 ? 'bg-cyan-500 shadow-cyan-500/80' :
                    idx === 3 ? 'bg-amber-500 shadow-amber-500/80' :
                    'bg-emerald-500 shadow-emerald-500/80'
                  }`}></div>
                </div>

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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4.5: INTERACTIVE BEFORE/AFTER COMPARISON */}
      <section className="py-20 bg-white border-b-2 border-slate-900" id="comparison-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span>Before & After</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
              Compare Our Precision Repair Quality
            </h3>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Drag the slider to see side-by-side comparisons of typical device conditions before and after under-the-microscope servicing.
            </p>
          </motion.div>

          <DeviceComparison />
        </div>
      </section>

      {/* SECTION 5: TECHNICIAN SHOWCASE */}
      <section className="py-20 bg-slate-50/40 border-b-2 border-slate-900" id="technicians-section">
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
            <div className="flex flex-row overflow-x-auto pb-6 gap-4 px-5 -mx-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-[calc(100vw-40px)] sm:w-[340px] md:w-[360px] h-96 bg-slate-50 border-2 border-slate-900 rounded-3xl animate-pulse shrink-0"></div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Horizontally scrollable flex row */}
              <div 
                id="tech-cards-viewport"
                className="flex overflow-x-auto scrollbar-none gap-4 pb-6 px-5 -mx-5 scroll-smooth snap-x snap-mandatory"
              >
                {technicians.map((t) => (
                  <div 
                    key={t.name} 
                    onClick={() => setSelectedTech(t)}
                    className="w-[calc(100vw-40px)] sm:w-[340px] md:w-[360px] max-w-[380px] snap-start shrink-0 bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[4px_4px_0px_#0A1020] hover:shadow-[6px_6px_0px_#0A1020] transition-all duration-200 hover:-translate-y-[2px] hover:-translate-x-[2px] cursor-pointer group flex flex-col justify-between h-[470px] sm:h-[450px]"
                  >
                    <div className="aspect-[4/3] sm:h-56 overflow-hidden relative border-b-2 border-slate-900 shrink-0">
                      <img
                        src={t.profileImage}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-white/10 backdrop-blur px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {t.experience} Years Experience
                      </div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-[#0A1020] text-lg leading-tight">{t.name}</h4>
                        <p className="text-xs text-[#0F4CFF] font-black mt-0.5">{t.designation}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs border-y-2 border-slate-900 py-3">
                        <div>
                          <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Completed</span>
                          <span className="text-slate-800 font-black">{t.repairsCompleted}+ Repairs</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-slate-800 font-black">{t.rating} / 5.0</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 mr-3">
                          <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Specialization</span>
                          <span className="text-xs font-bold text-slate-600 truncate block">{t.specialization}</span>
                        </div>
                        <span className="text-[9px] font-black text-[#0F4CFF] uppercase tracking-widest shrink-0 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full group-hover:bg-[#0D0D0D] group-hover:text-white group-hover:border-[#0D0D0D] transition-colors duration-200">
                          Details &rarr;
                        </span>
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
      <section className="py-16 bg-white border-y-2 border-slate-900" id="brands-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border-2 border-slate-900 text-slate-800 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span>Brands We Service</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1020] tracking-tight">
              OEM Calibration & Diagnostics Support
            </h3>
          </div>
          
          <div className="relative w-full overflow-hidden py-4 bg-slate-50 border-2 border-slate-900 rounded-[28px] shadow-[4px_4px_0px_#0A1020] select-none animate-marquee-hover-pause">
            {/* Masking gradients on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-6 w-max">
              {/* Track 1 */}
              <div className="animate-marquee flex gap-6">
                {brands.map((b, idx) => (
                  <div
                    key={`t1-${idx}`}
                    className="flex flex-col items-center justify-center min-w-[150px] px-6 py-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0px_#0A1020] transition-all cursor-default select-none shrink-0"
                  >
                    <div className="h-10 flex items-center justify-center">
                      {BRAND_LOGOS[b.name] || <span className="font-bold text-xs">{b.name}</span>}
                    </div>
                    <span className="text-[10px] text-slate-800 font-black uppercase tracking-wider mt-2.5">
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Track 2 */}
              <div className="animate-marquee flex gap-6" aria-hidden="true">
                {brands.map((b, idx) => (
                  <div
                    key={`t2-${idx}`}
                    className="flex flex-col items-center justify-center min-w-[150px] px-6 py-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0px_#0A1020] transition-all cursor-default select-none shrink-0"
                  >
                    <div className="h-10 flex items-center justify-center">
                      {BRAND_LOGOS[b.name] || <span className="font-bold text-xs">{b.name}</span>}
                    </div>
                    <span className="text-[10px] text-slate-800 font-black uppercase tracking-wider mt-2.5">
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6.5: MASTER LAB GALLERY */}
      <section className="py-16 bg-slate-50 border-b-2 border-slate-900" id="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white border-2 border-slate-900 text-slate-800 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#0A1020]">
              <span>Real Work Bench Images</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Peek Inside Our Advanced Repair Lab
            </h3>
            <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm font-bold">
              We operate dust-free cleaning stations, precision micro-soldering heat guns, thermal camera diagnostic systems, and specialized chip testing benches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[240px] sm:auto-rows-[300px] md:auto-rows-[380px]">
            {/* Collage Card 1: Cloud Image 1 (Apple Logo/MacBook/Large display) */}
            <motion.div 
              onClick={() => openLightbox(0)}
              className="sm:col-span-2 sm:row-span-2 relative group overflow-hidden rounded-[32px] border-4 border-slate-900 bg-[#0A1020] shadow-[6px_6px_0px_#0A1020] hover:shadow-[10px_10px_0px_#0A1020] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              <img 
                src="https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000531/WhatsApp_Image_2026-07-01_at_1.56.06_PM_pjm3ys.jpg"
                alt="Premium MacBook Diagnostics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-black text-sm uppercase tracking-wider">MacBook & iMac Repairs</h4>
                <p className="text-slate-300 text-[10px] font-bold">Authorized diagnostic procedures & chip-level micro-soldering.</p>
              </div>
            </motion.div>

            {/* Collage Card 2: Cloud Image 2 (Smartphone Repairs/Precision tool) */}
            <motion.div 
              onClick={() => openLightbox(1)}
              className="sm:col-span-1 sm:row-span-1 relative group overflow-hidden rounded-[32px] border-4 border-slate-900 bg-[#0A1020] shadow-[6px_6px_0px_#0A1020] hover:shadow-[10px_10px_0px_#0A1020] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              <img 
                src="https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000531/WhatsApp_Image_2026-06-30_at_8.23.29_PM_bcwdde.jpg"
                alt="Precision Smartphone Screen Fix"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-black text-xs uppercase tracking-wider">Smartphone Panels</h4>
                <p className="text-slate-300 text-[9px] font-bold">100% genuine glass screens & digitizers.</p>
              </div>
            </motion.div>

            {/* Collage Card 3: Cloud Image 3 (iPads & Tablets / Circuit view) */}
            <motion.div 
              onClick={() => openLightbox(2)}
              className="sm:col-span-1 sm:row-span-1 relative group overflow-hidden rounded-[32px] border-4 border-slate-900 bg-[#0A1020] shadow-[6px_6px_0px_#0A1020] hover:shadow-[10px_10px_0px_#0A1020] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              <img 
                src="https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000532/WhatsApp_Image_2026-07-01_at_1.56.08_PM_mhnaxr.jpg"
                alt="Tablet & iPad Motherboard Repairs"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-black text-xs uppercase tracking-wider">iPads & Tablets</h4>
                <p className="text-slate-300 text-[9px] font-bold">ESD-safe laboratory workbench diagnostics.</p>
              </div>
            </motion.div>

            {/* Collage Card 4: Unsplash Micro-Soldering */}
            <motion.div 
              onClick={() => openLightbox(3)}
              className="sm:col-span-1 sm:row-span-1 relative group overflow-hidden rounded-[32px] border-4 border-slate-900 bg-[#0A1020] shadow-[6px_6px_0px_#0A1020] hover:shadow-[10px_10px_0px_#0A1020] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80"
                alt="Chip-Level Logic Board Solder"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-black text-xs uppercase tracking-wider">Logic Board Soldering</h4>
                <p className="text-slate-300 text-[9px] font-bold">BGA reballing & micro-soldering restoration.</p>
              </div>
            </motion.div>

            {/* Collage Card 5: Unsplash Multimeter Precision */}
            <motion.div 
              onClick={() => openLightbox(4)}
              className="sm:col-span-1 sm:row-span-1 relative group overflow-hidden rounded-[32px] border-4 border-slate-900 bg-[#0A1020] shadow-[6px_6px_0px_#0A1020] hover:shadow-[10px_10px_0px_#0A1020] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
                alt="Precision Laboratory Multimeter Diagnostics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-black text-xs uppercase tracking-wider">Precision Testing</h4>
                <p className="text-slate-300 text-[9px] font-bold">Multimeter calibration & voltage checkups.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: REVIEWS */}
      <section className="py-20 bg-white" id="reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border-2 border-slate-900 text-slate-800 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
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
                <div key={idx} className="bg-white border-2 border-slate-900 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-[4px_4px_0px_#0A1020] hover:shadow-[6px_6px_0px_#0A1020] transition-all duration-200 hover:-translate-y-[2px] hover:-translate-x-[2px]">
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{t.review}"
                  </p>
                  <div className="flex items-center space-x-4 pt-4 border-t-2 border-slate-900">
                    <img
                      src={t.image}
                      alt={t.customerName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-slate-900 shadow-[1px_1px_0px_#0A1020]"
                    />
                    <div>
                      <h4 className="font-black text-[#0A1020] text-sm">{t.customerName}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <ReviewStars rating={t.rating} />
                        <span className="text-[9px] font-mono text-[#0F4CFF] uppercase font-black bg-blue-50 border-2 border-slate-900 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#0A1020]">
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
              className="inline-flex items-center space-x-2 text-sm font-black text-[#0F4CFF] hover:text-[#0A3DCC] transition-all group"
            >
              <span className="relative pb-0.5">
                Read All Reviews & Leave Feedback
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F4CFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7.5: PHYSICAL LAB LOCATION (NEHRU PLACE) */}
      <section className="py-20 bg-white border-b-2 border-slate-900" id="lab-location-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Card - Retro 3D Offset Card */}
            <div className="lg:col-span-5 relative w-full text-left">
              {/* Retro offset shadow outline */}
              <div className="absolute -left-[5px] -bottom-[5px] inset-0 border-b-3 border-l-3 border-slate-900 rounded-[28px] bg-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 bg-white border-2 border-slate-900 rounded-[28px] p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-slate-50 border-2 border-slate-900 text-slate-800 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <span>Our Main Service Centre</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0A1020] tracking-tight leading-tight">
                    Visit Us in Nehru Place Market
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    If you prefer to drop off your device personally rather than utilizing our free doorstep pickup service, you can visit our Master Lab in New Delhi's primary tech hub.
                  </p>
                </div>
                
                <div className="space-y-4 border-y-2 border-slate-900 py-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border-2 border-slate-900 flex items-center justify-center text-[#0F4CFF] shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_#0A1020]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#0A1020] text-sm">Full Address</h4>
                      <p className="text-xs text-slate-500 mt-0.5">G-12, Ground Floor, Nehru Place, New Delhi, Delhi 110019</p>
                      <p className="text-[10px] text-[#0F4CFF] font-black mt-1">Landmark: Opposite Nehru Place Metro Station Exit 2</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border-2 border-slate-900 flex items-center justify-center text-[#00C48C] shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_#0A1020]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => setIsHoursDropdownOpen(!isHoursDropdownOpen)}
                        className="flex items-center gap-1.5 font-black text-[#0A1020] text-sm hover:text-[#0F4CFF] transition-colors focus:outline-none cursor-pointer group/hours"
                      >
                        <span>Support Hours</span>
                        <motion.span 
                          animate={{ rotate: isHoursDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[10px] text-slate-400 group-hover/hours:text-[#0F4CFF] transition-colors inline-block"
                        >
                          ▼
                        </motion.span>
                      </button>
                      <p className="text-xs text-slate-500 mt-0.5">9:00 AM - 9:00 PM (Open 7 Days a Week)</p>

                      {/* Dropdown Day Table with smooth motion animation */}
                      <AnimatePresence initial={false}>
                        {isHoursDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 bg-slate-50 border-2 border-slate-900 rounded-xl p-3 space-y-1.5 shadow-[2px_2px_0px_#0A1020]">
                              {[
                                { day: 'Monday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Tuesday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Wednesday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Thursday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Friday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Saturday', time: '9:00 AM - 9:00 PM' },
                                { day: 'Sunday', time: '9:00 AM - 9:00 PM' },
                              ].map((d, i) => (
                                <div key={i} className="flex justify-between text-[11px] font-bold text-slate-600 border-b border-slate-200 last:border-0 pb-1 last:pb-0">
                                  <span className="text-slate-800">{d.day}</span>
                                  <span className="font-mono text-emerald-700">{d.time}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border-2 border-slate-900 flex items-center justify-center text-amber-650 shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_#0A1020]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#0A1020] text-sm">Contact Hotline</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Call: +91 9310112994</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  
                  {/* Google Maps Button - Precise Neobrutalist */}
                  <a
                    href="https://maps.google.com/?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-white border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-[3px_3px_0px_#FFB800] hover:shadow-[4px_4px_0px_#FFB800] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_#FFB800] transition-all cursor-pointer text-center"
                  >
                    <span>Open Maps</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FFB800]" />
                  </a>

                  {/* Free Pickup Button - Precise Neobrutalist */}
                  <Link
                    to="/contact?tab=booking"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-900 font-black text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_#0A1020] transition-all cursor-pointer text-center"
                  >
                    <span>Book Pickup</span>
                  </Link>

                </div>
              </div>
            </div>

            {/* Right Map Embed Card - Retro 3D Outline */}
            <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] relative group">
              <iframe
                title="TheMobifixx Nehru Place Master Lab Location Map"
                src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute top-4 left-4 bg-slate-950/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 shadow-md backdrop-blur-xs flex items-center gap-2">
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
            <div className="inline-flex items-center space-x-2 bg-slate-50 border-2 border-slate-900 text-slate-800 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span>FAQ</span>
            </div>
            <h3 className="text-3xl font-black text-[#0A1020] tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[3px_3px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-black text-[#0A1020] hover:bg-slate-50/40 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-xs sm:text-sm tracking-tight pr-4">{faq.q}</span>
                  <motion.span 
                    animate={{ rotate: activeFaq === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-md font-black text-[#0F4CFF] shrink-0"
                  >
                    {activeFaq === index ? '−' : '+'}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div 
                        className="p-5 bg-slate-50 border-t-2 border-slate-900 text-xs sm:text-sm text-slate-500 leading-relaxed font-bold"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Technician Details Modal */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedTech(null)}></div>

          {/* Modal Content - Retro 3D Outline */}
          <div className="relative max-w-lg w-full z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Retro offset shadow outline */}
            <div className="absolute -left-[6px] -bottom-[6px] inset-0 border-b-4 border-l-4 border-slate-900 rounded-[32px] bg-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 bg-white border-4 border-slate-900 rounded-[32px] p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col gap-6 text-left">
              {/* Header with Close */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Technician Profile
                </span>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="w-8 h-8 rounded-full border-2 border-slate-900 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-900 font-black cursor-pointer shadow-[2px_2px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0A1020] transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Bio Details */}
              <div className="flex items-start gap-4.5">
                <img
                  src={selectedTech.profileImage}
                  alt={selectedTech.name}
                  className="w-20 h-20 rounded-2xl border-2 border-slate-900 object-cover object-top shrink-0 shadow-[2px_2px_0px_#0A1020]"
                />
                <div className="space-y-1">
                  <h4 className="font-black text-[#0A1020] text-xl leading-none">{selectedTech.name}</h4>
                  <p className="text-xs text-[#0F4CFF] font-black">{selectedTech.designation}</p>
                  <div className="inline-flex items-center gap-1 bg-amber-50 border-2 border-slate-900 px-2 py-0.5 rounded-md mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-slate-800 font-black">{selectedTech.rating} / 5.0 Rating</span>
                  </div>
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-3 gap-2 border-y-2 border-slate-900 py-4 text-center">
                <div>
                  <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Experience</span>
                  <span className="text-slate-800 font-black text-xs">{selectedTech.experience} Years</span>
                </div>
                <div className="border-x-2 border-slate-900">
                  <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Repairs Done</span>
                  <span className="text-slate-800 font-black text-xs">{selectedTech.repairsCompleted}+ Jobs</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-black tracking-wider text-[8px] mb-0.5">Location</span>
                  <span className="text-slate-800 font-black text-[10px] leading-tight block truncate" title={selectedTech.serviceAreas.join(', ')}>
                    Delhi NCR
                  </span>
                </div>
              </div>

              {/* Specialization & Certifications */}
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <span className="text-slate-400 block uppercase font-black tracking-wider text-[9px]">Specialty Area</span>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed bg-slate-50 border-2 border-slate-900 rounded-xl p-2.5">
                    {selectedTech.specialization}
                  </p>
                </div>

                {selectedTech.certifications && selectedTech.certifications.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-slate-400 block uppercase font-black tracking-wider text-[9px]">Professional Certifications</span>
                    <div className="flex flex-col gap-1.5">
                      {selectedTech.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center shrink-0"></span>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom booking CTA */}
              <div className="pt-4 border-t-2 border-slate-900 flex items-center justify-end">
                <div className="relative w-full h-[46px] group select-none cursor-pointer">
                  {/* Outer offset thin black outline boundary */}
                  <div className="absolute -left-[3px] -top-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] border-2 border-slate-900 rounded-xl pointer-events-none z-0"></div>

                  {/* Yellow backing offset block */}
                  <div className="absolute inset-0 bg-[#FFB800] rounded-xl -translate-x-1.5 translate-y-1.5 z-0 transition-transform duration-200 group-hover:-translate-x-2"></div>

                  {/* Main button link element */}
                  <Link
                    to={`/contact?tab=booking&tech=${encodeURIComponent(selectedTech.name)}`}
                    onClick={() => setSelectedTech(null)}
                    className="absolute inset-0 z-10 bg-[#0D0D0D] border-2 border-[#0D0D0D] hover:bg-black text-white font-black text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-150 shadow-sm active:translate-y-[1px] active:translate-x-[1px]"
                  >
                    <span>Request diagnostics with {selectedTech.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFB800]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none"
            onClick={closeLightbox}
          >
            {/* Close button - Neobrutalist style */}
            <button 
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 w-11 h-11 bg-[#FFB800] border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4.5px_4.5px_0px_#0A1020] transition-all duration-150 cursor-pointer text-slate-900 z-50"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Left navigation arrow */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4.5px_4.5px_0px_#0A1020] transition-all duration-150 cursor-pointer text-slate-900 z-50"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Lightbox content container */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center bg-white border-4 border-slate-900 rounded-[24px] overflow-hidden shadow-[8px_8px_0px_#0A1020] max-h-[85vh]"
            >
              <div className="w-full flex-1 overflow-hidden bg-slate-950 flex items-center justify-center min-h-[260px] md:min-h-[420px] max-h-[65vh]">
                <img 
                  src={collageImages[lightboxIndex].src} 
                  alt={collageImages[lightboxIndex].title}
                  className="max-w-full max-h-[65vh] object-contain"
                />
              </div>

              {/* Caption details footer */}
              <div className="w-full bg-white border-t-4 border-slate-900 p-5 md:p-6 text-left space-y-1">
                <span className="text-[10px] font-black text-[#0F4CFF] uppercase tracking-widest block">
                  Image {lightboxIndex + 1} of {collageImages.length}
                </span>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {collageImages[lightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  {collageImages[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button 
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4.5px_4.5px_0px_#0A1020] transition-all duration-150 cursor-pointer text-slate-900 z-50"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
