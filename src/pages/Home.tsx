import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Tv, ChevronDown, CheckCircle2, Shield, Wrench, Settings, MapPin, Search, Plus, Minus, ArrowRight, Star, Heart, Calendar, Phone, Camera, Sparkles, UserCheck, Video, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { TextScramble } from '../pages/TextScramble';
import { SparklesText } from '../pages/SparklesText';
import PriceEstimator from '../components/PriceEstimator';
import { Testimonial } from '../types';

const HERO_SLIDES = [
  {
    title: "LAPTOP\nREPAIR",
    subtitle: "FREE DOORSTEP SERVICE",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-brand-orange/70"
  },
  {
    title: "MACBOOK\nRESTORATION",
    subtitle: "CHIP-LEVEL EXPERTS",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-blue-600/70"
  },
  {
    title: "IPHONE\nSCREEN FIX",
    subtitle: "GENUINE PARTS ONLY",
    image: "https://images.unsplash.com/photo-1603898037225-83280053a4e9?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-emerald-600/70"
  }
];

const GALLERY_ITEMS = [
  { type: 'video', src: "https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496194/sss_umkve2.mp4" },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496188/iphones_v68rqj.mp4' },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496187/mobilem_gmprhd.mp4' },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496187/iphoness_y4ezfk.mp4' },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/battery_yinoig.mp4' },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/ss_eju8jp.mp4' },
  { type: 'video', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/iphoneb_dpu1ot.mp4' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]); // Assuming Technician type from storage.ts
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }
      if (event.key === 'ArrowRight') {
        handleNext();
      }
      if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex === 0 ? GALLERY_ITEMS.length - 1 : prevIndex! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex === GALLERY_ITEMS.length - 1 ? 0 : prevIndex! + 1));
  };

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  useEffect(() => {
    fetch('/api/technicians')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTechnicians(data);
        }
      })
      .catch(err => console.error('Error fetching technicians:', err));
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Is the doorstep mobile repair service safe?", a: "Yes, absolutely safe. Our technicians are background verified and trained. We perform repairs right in front of you." },
    { q: "Do you use original spare parts?", a: "We use high-quality OEM or original parts depending on availability, all backed by our 6-month warranty." },
    { q: "How long does a typical repair take?", a: "Most mobile screen and battery replacements take around 30-45 minutes at your location." },
    { q: "What if my phone is not fixed?", a: "We follow a 'No Fix, No Fee' policy. You only pay if we successfully resolve the issue." }
  ];

  const categories = [
    { title: 'Mobile', icon: <Smartphone className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/mobile' },
    { title: 'Tablet', icon: <Tablet className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/tablet' },
    { title: 'Laptop', icon: <Laptop className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/laptop' },
    { title: 'Smart Watch', icon: <Watch className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/watch' },
    { title: 'Mac', icon: <Laptop className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/macbook' },
    { title: 'Earbuds', icon: <Headphones className="w-8 h-8 mb-2 text-gray-700" />, path: '/category/earbuds' },
  ];

  const commonProblems = [
    { title: 'Broken Screen', price: '₹1499', icon: <Smartphone className="w-6 h-6 text-brand-orange" /> },
    { title: 'Battery Replacement', price: '₹999', icon: <Shield className="w-6 h-6 text-brand-orange" /> },
    { title: 'Mic Issue', price: '₹499', icon: <Settings className="w-6 h-6 text-brand-orange" /> },
    { title: 'Camera Issue', price: '₹899', icon: <Wrench className="w-6 h-6 text-brand-orange" /> },
  ];

  return (
    <div className="bg-white font-sans text-gray-900 min-h-screen">

      {/* 1. Hero Banner Slideshow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 h-80 md:h-[28rem]">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide.image} alt={slide.subtitle} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 ${slide.overlayColor} mix-blend-multiply`}></div>
              <div className="z-20 px-8 md:px-16 md:w-1/2">
                <div className="inline-block bg-white text-gray-900 font-bold text-xs px-4 py-1.5 rounded-full mb-6 shadow-sm">{slide.subtitle}</div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-8 leading-tight whitespace-pre-line">{slide.title}</h1>
                <Link to="/contact?tab=booking" className="bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-md inline-block">
                  BOOK NOW
                </Link>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-8 bg-white shadow-sm' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Service Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-8">
          {"Doorstep Mobile Repair Services in Delhi / NCR".split(" ").map((word, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 max-w-4xl mx-auto">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                rotate: idx % 2 === 0 ? 1.5 : -1.5
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-gray-100 shadow-sm rounded-3xl w-full aspect-square"
            >
              <Link to={cat.path} className="flex flex-col items-center group cursor-pointer">
                <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                  {cat.icon}
                  <span className="text-xs font-semibold text-gray-700">{cat.title}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Trust Stats Band */}
      <section className="bg-[#0b1f3a] border-y border-[#0b1f3a] py-8 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-orange-200/50">
            <div>
              <div className="text-3xl font-bold text-white mb-1">10,000+</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider">Devices Fixed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">4.5+</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider">Google Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">30 Mins</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider">Avg Repair Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">6+</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEO / About Text */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-4">
          {"Expert Mobile & Laptop Repair Services in Delhi / NCR".split(" ").map((word, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [1, 0.8, 1], y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mx-auto">
          {"Welcome to TheMobifixx! We specialize in on-demand doorstep repair for smartphones, tablets, laptops, and smartwatches. With high-quality OEM parts, a team of certified technicians, and a transparent pricing model, we ensure your device functions perfectly. Book a repair today and get your gadget fixed in under 30 minutes at your home or office!".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: 'easeOut'
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </section>

      {/* 6. Why Choose Us Grid */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {"Why Choose TheMobifixx?".split(" ").map((word, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
                className="inline-block mr-3"
              >{word}</motion.span>
            ))}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Top Quality Parts', icon: <Shield className="text-blue-500 w-8 h-8" /> },
              { title: '6 Months Warranty', icon: <CheckCircle2 className="text-green-500 w-8 h-8" /> },
              { title: 'Free Doorstep Service', icon: <MapPin className="text-brand-orange w-8 h-8" /> },
              { title: 'No Fix, No Fee', icon: <Settings className="text-purple-500 w-8 h-8" /> },
              { title: 'Data Security', icon: <Smartphone className="text-red-500 w-8 h-8" /> },
              { title: 'Expert Technicians', icon: <Wrench className="text-orange-500 w-8 h-8" /> },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="mb-4 bg-slate-50 p-4 rounded-2xl">{feature.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {"Our Service Gallery".split(" ").map((word, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
                className="inline-block mr-3"
              >{word}</motion.span>
            ))}
          </h2>
          <p className="text-gray-500 text-sm">A glimpse into our advanced laboratories and happy customers.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative group rounded-[2rem] overflow-hidden shadow-sm aspect-square md:aspect-auto md:h-64 border border-gray-100 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              onClick={() => setLightboxIndex(idx)}
            >
              {item.type === 'video' ? (
                <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <img src={item.src} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                {item.type === 'video' ? (
                  <Video className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 drop-shadow-md" />
                ) : (
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 drop-shadow-md" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[52]" onClick={() => setLightboxIndex(null)}><X className="w-8 h-8" /></button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all z-[52]"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all z-[52]"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="relative max-w-4xl max-h-[90vh] w-full p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {GALLERY_ITEMS[lightboxIndex].type === 'image' ? (
                  <img src={GALLERY_ITEMS[lightboxIndex].src} alt="Enlarged gallery view" className="w-full h-full object-contain" />
                ) : (
                  <video src={GALLERY_ITEMS[lightboxIndex].src} controls autoPlay className="w-full h-full object-contain" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Brands We Repair */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-100">
        <TextScramble as="h2" className="text-2xl font-bold mb-4">
          Brands we Repair
        </TextScramble>
        <p className="text-sm text-gray-900 mb-12">We repair out of warranty devices of all major brands</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/000' },
            { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus/000' },
            { name: 'Realme', logo: '/realme.avif' },
            { name: 'Google', logo: 'https://cdn.simpleicons.org/google/000' },
            { name: 'Nothing', logo: '/nothing.avif' },
            { name: 'Poco', logo: '/poco.avif' },
            { name: 'Oppo', logo: 'https://cdn.simpleicons.org/oppo/000' },
            { name: 'iQOO', logo: '/iqoo.avif' },
            { name: 'Motorola', logo: 'https://cdn.simpleicons.org/motorola/000' },
            { name: 'Asus', logo: 'https://cdn.simpleicons.org/asus/000' },
          ].map((brand, idx) => (
            <Link
              to={`/brand/${brand.name.toLowerCase()}`}
              key={idx}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center gap-4 font-bold text-gray-600 hover:shadow-md hover:-translate-y-1 hover:border-gray-200 cursor-pointer transition-all"
            >
              <img src={brand.logo} alt={`${brand.name} logo`} className="h-10 w-auto" />
              <span className="text-sm">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white border-t border-gray-100">
        <SparklesText
          className="text-3xl font-bold mb-16"
          text="How it Works?"
          colors={{ first: "#0B1F3A", second: "#2563EB" }} />
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative max-w-4xl mx-auto">
          {/* Dotted Line connector (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0"></div>

          {[
            { step: '1', title: 'Book Repair', icon: <Smartphone className="w-8 h-8 text-brand-orange" />, color: 'bg-orange-50' },
            { step: '2', title: 'Tech Assigned', icon: <Search className="w-8 h-8 text-blue-500" />, color: 'bg-blue-50' },
            { step: '3', title: 'Tech Arrives', icon: <MapPin className="w-8 h-8 text-green-500" />, color: 'bg-green-50' },
            { step: '4', title: 'Repair Completed', icon: <CheckCircle2 className="w-8 h-8 text-purple-500" />, color: 'bg-purple-50' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center z-10 bg-white px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.6 }}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className={`w-24 h-24 rounded-full ${s.color} flex items-center justify-center mb-4 border-4 border-white shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{s.title}</h3>
              <p className="text-xs text-gray-500 max-w-[150px]">Step {s.step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9.5 Price Estimator Integration */}
      <PriceEstimator />

      {/* 10. Common Problems We Fix */}
      <section className="bg-gray-100 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {"Common Phone Problems We Fix".split(" ").map((word, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
                className="inline-block mr-3"
              >{word}</motion.span>
            ))}
          </h2>
          <p className="text-sm text-gray-900 mb-12">We handle a variety of issues with genuine spare parts.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {commonProblems.map((prob, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center flex flex-col group relative hover:shadow-md transition-shadow">
                <div className={`h-1.5 w-full bg-[#0b1f3a]`}></div>
                <div className="p-8 flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#0b1f3a]/10 rounded-full flex items-center justify-center mb-6">
                    {prob.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{prob.title}</h3>
                  <p className="text-sm text-[#0b1f3a] font-bold mb-8">Starting from {prob.price}</p>
                  <button className="mt-auto bg-[#0b1f3a] text-white text-sm font-bold px-6 py-3 rounded-full w-full hover:bg-[#0f2a4f]/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-sm text-gray-400 mb-12">4.8 Average Rating on Google Reviews</p>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.slice(0, 3).map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-left flex flex-col h-full hover:bg-white/15 transition-colors"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed flex-1">"{review.review}"</p>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-sm shadow-sm text-primary">{(review.customerName?.[0] || 'U').toUpperCase()}</div>
                    <div>
                      <div className="font-bold text-sm">{review.customerName}</div>
                      {review.deviceType && <div className="text-xs text-gray-400">{review.deviceType}</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto py-12">
              <Star className="w-12 h-12 text-brand-orange mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
              <p className="text-gray-400 text-sm">Be the first to give feedback and share your experience with TheMobifixx!</p>
            </div>
          )}
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full text-left px-8 py-5 bg-white hover:bg-gray-50 flex justify-between items-center transition-colors font-bold text-gray-900"
              >
                {faq.q}
                {openFaq === i ? <Minus className="w-5 h-5 text-brand-orange shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-8 pb-5 bg-white text-sm text-gray-600 leading-relaxed font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 13. Serviceable Locations */}
      <section className="py-16 bg-gray-100 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-8">Serviceable Locations in Delhi NCR</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Dwarka', 'South Extension', 'Rohini'].map((loc, idx) => (
              <div key={idx} className="bg-white border border-gray-900 text-gray-900 text-sm font-bold px-6 py-2.5 rounded-full hover:border-[#1faf3e] hover:bg-[#0b1f3a] hover:text-white cursor-pointer transition-colors shadow-sm">
                {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Technician Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-50 border-t border-gray-100">
        <h2 className="text-3xl font-bold mb-4">Meet Our Expert Technicians</h2>
        <p className="text-sm text-gray-900 mb-12">Certified professionals dedicated to restoring your devices.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {technicians.slice(0, 3).map((tech, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-gray-100">
                  <img src={tech.profileImage} className="w-full h-full object-cover object-top" alt={tech.name} />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-grey-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {tech.designation}
                  </span>
                </div>
                <div className="p-5 space-y-3 text-left">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{tech.name}</h3>
                    <p className="text-sm text-gray-900 mt-0.5">{tech.specialization}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>EXP: {tech.experience} Years</div>
                    <div className="text-right">REPAIRS: {tech.repairsCompleted}+</div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 flex justify-center">
                <Link
                  to={`/contact?tab=booking&tech=${encodeURIComponent(tech.name)}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#0b1f3a] text-white font-bold text-sm py-3 rounded-full shadow-sm hover:bg-gray-600 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Request {tech.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/technicians" className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">
          <span>View All Technicians</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 15. Bottom CTA Banner (now 16) */}
      <section className="bg-[#0b1f3a] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="inline-block bg-white/20 px-5 py-1.5 rounded-full text-xs font-bold mb-8 backdrop-blur-sm shadow-sm tracking-widest uppercase">
            Hassle-Free Booking
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Broken Phone? Get it Fixed Today!</h2>
          <p className="text-orange-100 text-sm md:text-base mb-10 font-medium">Call us now or book a technician online in less than 2 minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+919818409122" className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-full shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Call +91 9818409122</span>
            </a>
            <Link
              to="/contact?tab=booking"
              className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-8 rounded-full shadow-sm transition-colors text-sm flex items-center justify-center gap-2"
            >
              <span>Book Technician Online</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
