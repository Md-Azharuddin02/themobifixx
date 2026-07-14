import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Laptop, Tablet, Watch, ChevronDown, CheckCircle2, Shield, Wrench, Settings, MapPin, Search, Plus, Minus, ArrowRight, Star, Heart, Calendar, Phone, Camera, UserCheck, Video, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { TextScramble } from '../pages/TextScramble';
import { SparklesText } from '../pages/SparklesText';
import { Testimonial } from '../types';

const HERO_SLIDES = [
  {
    title: "LAPTOP\nREPAIR",
    subtitle: "FREE DOORSTEP SERVICE",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-[#030712]/80"
  },
  {
    title: "MACBOOK\nRESTORATION",
    subtitle: "CHIP-LEVEL EXPERTS",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-[#030712]/80"
  },
  {
    title: "IPHONE\nSCREEN FIX",
    subtitle: "GENUINE PARTS ONLY",
    image: "https://images.unsplash.com/photo-1603898037225-83280053a4e9?auto=format&fit=crop&q=80&w=1920",
    overlayColor: "bg-[#030712]/80"
  }
];

const GALLERY_ITEMS = [
  { type: 'video', title: 'Main Workshop Tour', desc: 'A walk-through of our repair station and testing tools.', src: "https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496194/sss_umkve2.mp4" },
  { type: 'video', title: 'iPhone Motherboard Repair', desc: 'Detailed board repair and chip replacement under a microscope.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496188/iphones_v68rqj.mp4' },
  { type: 'video', title: 'Mobile Screen Repair', desc: 'Removing broken glass and fixing mobile screens using heat.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496187/mobilem_gmprhd.mp4' },
  { type: 'video', title: 'Quality Control Testing', desc: 'Checking repaired phones to ensure everything works perfectly.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496187/iphoness_y4ezfk.mp4' },
  { type: 'video', title: 'Premium Battery Replacement', desc: 'Replacing old batteries with new premium cells to keep 100% battery life.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/battery_yinoig.mp4' },
  { type: 'video', title: 'Board Diagnostics', desc: 'Finding short circuits on boards using heat cameras.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/ss_eju8jp.mp4' },
  { type: 'video', title: 'Water Damage Repair', desc: 'Cleaning the phone board and removing water completely.', src: 'https://res.cloudinary.com/dzhsxv2wq/video/upload/v1783496186/iphoneb_dpu1ot.mp4' },
];

const TECHNICIANS = [
  {
    name: "Prince Singh",
    profileImage: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000124/WhatsApp_Image_2026-07-01_at_5.52.22_PM_1_aiynf3.jpg?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Shoaib Malik",
    profileImage: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000124/WhatsApp_Image_2026-07-01_at_5.52.22_PM_jtrlcf.jpg?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Nikhil Chandel",
    profileImage: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783000124/WhatsApp_Image_2026-07-01_at_3.27.54_PM_sgcynd.jpg?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Arif Sheikh",
    profileImage: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783976762/WhatsApp_Image_2026-07-13_at_6.57.03_PM_uwkuip.jpg?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Rishabh Singh Rajput",
    profileImage: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783976762/WhatsApp_Image_2026-07-13_at_6.57.21_PM_khakxv.jpg?w=400&auto=format&fit=crop&q=60"
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

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
    { q: "How long does a screen replacement take?", a: "Most mobile screen replacements are completed in 30-45 minutes. Laptops and MacBooks might take 2-4 hours depending on model complexity." },
    { q: "Do you use original parts?", a: "We use premium OEM quality grade parts that match the specifications of your original device. All parts undergo rigorous testing." },
    { q: "How can I track my repair status?", a: "You can enter your unique Repair Order ID on our Track Repair page to get real-time tracking updates." },
  ];

  const categories = [
    { title: 'Mobile', icon: <Smartphone className="w-8 h-8 mb-2 text-blue-400" />, path: '/category/mobile' },
    { title: 'Tablet', icon: <Tablet className="w-8 h-8 mb-2 text-blue-400" />, path: '/category/tablet' },
    { title: 'Laptop', icon: <Laptop className="w-8 h-8 mb-2 text-blue-400" />, path: '/category/laptop' },
    { title: 'Smart Watch', icon: <Watch className="w-8 h-8 mb-2 text-blue-400" />, path: '/category/watch' },
    { title: 'Mac', icon: <Laptop className="w-8 h-8 mb-2 text-blue-400" />, path: '/category/macbook' },
  ];

  const commonProblems = [
    { title: 'Broken Display', image: '/broken_display.webp' },
    { title: 'Battery Issues', image: '/battery_issue.webp' },
    { title: 'Back Glass Damage', image: '/broken_back_glass.webp' },
    { title: 'Camera Problems', image: '/camera_issue.webp' },
    { title: 'Charging Port Issues', image: '/charging_issue.webp' },
    { title: 'Water Damage', image: '/water_dam.webp' },
    { title: 'Face ID Problems', image: '/face_id_issue.webp' },
    { title: 'Speaker Issues', image: '/speaker_issue.webp' },
  ];

  return (
    <div className="bg-[#050B18] font-sans text-slate-100 min-h-screen" id="home">

      {/* 1. Hero Banner Slideshow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800/80 h-80 md:h-[28rem] bg-slate-950">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide.image} alt={slide.subtitle} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className={`absolute inset-0 ${slide.overlayColor} mix-blend-multiply`}></div>
              <div className="z-20 px-8 md:px-16 md:w-1/2">
                <div className="inline-block bg-blue-600 text-white font-bold text-xs px-4 py-1.5 rounded-full mb-6 shadow-md">{slide.subtitle}</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8 leading-tight whitespace-pre-line">{slide.title}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/919310112994?text=${encodeURIComponent("Hi! 👋 I'd like to get my device repaired. Can you help me book a service?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Book on WhatsApp</span>
                  </a>
                  <a href="tel:+919310112994" className="bg-transparent border border-blue-500 hover:bg-blue-600/10 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Call 9310112994</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-8 bg-blue-500 shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

       {/* 3. Trust Stats Band */}
      <section className="bg-[#0A1329] border-y border-slate-800/80 py-8 my-8" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            <div>
              <div className="text-3xl font-bold text-white mb-1">22,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Devices Fixed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">4.5+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Google Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">8+ year </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">of experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">8000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Laptop Repairs</div>
            </div>
          </div>
        </div>
      </section >

      {/* 4. SEO / About Text */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center" >
        <h2 className="text-xl font-bold mb-4 text-white">
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
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mx-auto">
          {"Expert Laptop Repair Services you can Trust with 8+ years of experience and 15,000+ successful laptop repairs, Our laptop repair expertise Laptop Display Replacement Keyboard Replacement & Repair MotherBoard Repair Specialist Water Damage Deep Cleaning & Repair Laptop body & Hinge repair Battery Replacement SSD & RAM upgrade Charging Port Repair Speaker, Camera & Mic Repair Fan Cleaning & Overheating Solutions. Software Installation & Windows Recovery Data Backup & Recovery.".split(" ").map((word, i) => (
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
      </section >

      {/* 8. Brands We Repair */}
      <section id="brands" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/80" >
        <TextScramble as="h2" className="text-2xl font-bold mb-4 text-white">
          Mobile Brands we Repair
        </TextScramble>
        <p className="text-sm text-slate-400 mb-12">We repair out of warranty devices of all major brands</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple?category=mobile' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung?category=mobile' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/fff', path: '/brand/xiaomi?category=mobile' },
            { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus/fff', path: '/brand/oneplus?category=mobile' },
            { name: 'Vivo', logo: 'https://cdn.simpleicons.org/vivo/fff', path: '/brand/vivo?category=mobile' },
            { name: 'Oppo', logo: 'https://cdn.simpleicons.org/oppo/fff', path: '/brand/oppo?category=mobile' },
            { name: 'Realme', logo: '/realme.avif', path: '/brand/realme?category=mobile' },
            { name: 'Motorola', logo: 'https://cdn.simpleicons.org/motorola/fff', path: '/brand/motorola?category=mobile' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/fff', path: '/brand/lenovo?category=mobile' },
          ].map((brand, idx) => (
            <Link 
              to={brand.path} 
              key={idx} 
              className="bg-[#0A1329] border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-slate-700 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 shadow-lg cursor-pointer block"
            >
              <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              <span className="text-xs font-bold text-slate-300">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section >

      {/* 8.1. Laptop Brands We Repair */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/80" >
        <TextScramble as="h2" className="text-2xl font-bold mb-4 text-white">
          Laptop Brands we Repair
        </TextScramble>
        <p className="text-sm text-slate-400 mb-12">We repair out of warranty devices of all major brands</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Macbook', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple?category=laptop' },
            { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/fff', path: '/brand/hp?category=laptop' },
            { name: 'Intel', logo: 'https://cdn.simpleicons.org/intel/fff', path: '/brand/intel?category=laptop' },
            { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/fff', path: '/brand/dell?category=laptop' },
            { name: 'MSI', logo: 'https://cdn.simpleicons.org/msi/fff', path: '/brand/msi?category=laptop' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/fff', path: '/brand/lenovo?category=laptop' },
            { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft/fff', path: '/brand/microsoft?category=laptop' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung?category=laptop' },
            { name: 'Nvidia', logo: 'https://cdn.simpleicons.org/nvidia/fff', path: '/brand/nvidia?category=laptop' },
            { name: 'Asus', logo: 'https://cdn.simpleicons.org/asus/fff', path: '/brand/asus?category=laptop' },
            { name: 'Acer', logo: 'https://cdn.simpleicons.org/acer/fff', path: '/brand/acer?category=laptop' },
          ].map((brand, idx) => (
            <Link 
              to={brand.path} 
              key={idx} 
              className="bg-[#0A1329] border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-slate-700 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 shadow-lg cursor-pointer block"
            >
              <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              <span className="text-xs font-bold text-slate-300">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section >

      {/* 8.2. Tablet Brands We Repair */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/80" >
        <TextScramble as="h2" className="text-2xl font-bold mb-4 text-white">
          Tablet Brands we Repair
        </TextScramble>
        <p className="text-sm text-slate-400 mb-12">We repair out of warranty devices of all major brands</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Ipads', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple?category=tablet' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/fff', path: '/brand/lenovo?category=tablet' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/fff', path: '/brand/xiaomi?category=tablet' },
            { name: 'Realme', logo: '/realme.avif', path: '/brand/realme?category=tablet' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung?category=tablet' },
          ].map((brand, idx) => (
            <Link 
              to={brand.path} 
              key={idx} 
              className="bg-[#0A1329] border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-slate-700 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 shadow-lg cursor-pointer block"
            >
              <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              <span className="text-xs font-bold text-slate-300">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section >


      {/* 2. Service Categories Grid
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center" id="services">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">
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
            <Link to={cat.path} key={idx} className="relative w-full aspect-square" style={{ perspective: '1000px' }}>
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
      //           {/* Front of the card 
      //           <div
      //             className="absolute w-full h-full bg-[#0A1329] border border-slate-800 shadow-md rounded-3xl flex flex-col items-center justify-center p-4"
      //             style={{ backfaceVisibility: 'hidden' }}
      //           >
      //             <div className="p-2 w-full h-full flex flex-col items-center justify-center">
      //               {cat.icon}
      //               <span className="text-xs font-semibold text-slate-300 mt-2">{cat.title}</span>
      //             </div>
      //           </div>

      //           {/* Back of the card 
      //           <div
      //             className="absolute w-full h-full bg-[#0E1B38] border border-slate-700 shadow-lg rounded-3xl flex flex-col items-center justify-center p-4"
      //             style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      //           >
      //             <Wrench className="w-6 h-6 text-blue-400 mb-3" />
      //             <span className="text-xs font-bold text-white text-center">
      //               Book Repair
      //             </span>
      //             <span className="text-[10px] text-slate-400 mt-1">
      //               for {cat.title}
      //             </span>
      //           </div>
      //         </motion.div>
      //       </Link>
      //     ))}
      //   </div>
      // </section > */}

      {/* 6. Why Choose Us Grid */}
      <section className="bg-[#030712]/40 py-20 border-y border-slate-800/80" id="about-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'No Fix, No Fee', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Data Security', icon: <Smartphone className="text-blue-400 w-8 h-8" /> },
              { title: 'Expert Technicians', icon: <Wrench className="text-blue-400 w-8 h-8" /> },
              { title: '8+ years of Professional Experience', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: '22,000+ Mobile Repairs Completed', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Expert Display & Glass Replacement', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Battery Replacement', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Advanced MotherBoard Repair', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Water Damage Solutions', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Doorstep Repair Service', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Quick Turnaround Time', icon: <Settings className="text-blue-400 w-8 h-8" /> },
              { title: 'Trusted By Thousands of Customers', icon: <Settings className="text-blue-400 w-8 h-8" /> },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-[#0A1329] p-8 rounded-3xl shadow-lg border border-slate-800 flex flex-col items-center text-center hover:border-slate-700 transition-all"
              >
                <div className="mb-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">{feature.icon}</div>
                <h3 className="font-bold text-slate-100 text-lg">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* 7. Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
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
          <p className="text-slate-400 text-sm">A glimpse into our advanced workshops and happy customers.</p>
        </motion.div>

        <div className="flex justify-center max-w-3xl mx-auto">
          <motion.div
            className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video w-full border border-slate-800/80 cursor-pointer bg-[#0A1329]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            onClick={() => setLightboxIndex(0)}
          >
            <video 
              src={GALLERY_ITEMS[0].src} 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Video className="w-5 h-5 md:w-6 md:h-6 fill-white text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base md:text-xl">Featured Workshop Tour & Repair Process</h3>
                  <p className="text-xs md:text-sm text-slate-300">Click to enter immersive gallery lightbox</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Lightbox Modal */}
      <AnimatePresence>
        {
          lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]/95 backdrop-blur-md px-4 md:px-12 py-10"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Soft background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[140px] pointer-events-none -z-10" />

              {/* Header: Title & Counter Controls */}
              <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-10" onClick={e => e.stopPropagation()}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Workshop Tour Gallery</span>
                  <h3 className="text-base md:text-lg font-bold text-white mt-0.5">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-450 font-bold bg-[#0A1329] border border-slate-800 px-3 py-1.5 rounded-full">
                    {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                  <button 
                    className="bg-[#0A1329] border border-slate-800 hover:bg-slate-800 text-white p-2.5 rounded-full transition-all cursor-pointer"
                    onClick={() => setLightboxIndex(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Slider Area */}
              <div className="w-full max-w-4xl flex items-center justify-between gap-4 md:gap-8 z-10 relative">
                {/* Left control button */}
                <button
                  className="bg-[#0A1329] border border-slate-800 hover:bg-blue-600 hover:border-blue-500 text-slate-350 hover:text-white p-3.5 rounded-full transition-all cursor-pointer shadow-xl shrink-0 hidden md:block"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Styled Video Frame with margin, padding, double borders and glow */}
                <div 
                  className="flex-1 bg-[#0A1329] border border-slate-800 p-2 md:p-3.5 rounded-[2rem] shadow-[0_0_50px_rgba(37,99,235,0.18)] max-h-[60vh] flex items-center justify-center overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-full overflow-hidden rounded-[1.5rem] bg-black/60 aspect-video flex items-center justify-center">
                    <video 
                      key={lightboxIndex}
                      src={GALLERY_ITEMS[lightboxIndex].src} 
                      controls 
                      className="w-full h-full max-h-[55vh] object-contain rounded-[1.5rem]" 
                    />
                  </div>
                </div>

                {/* Right control button */}
                <button
                  className="bg-[#0A1329] border border-slate-800 hover:bg-blue-600 hover:border-blue-500 text-slate-350 hover:text-white p-3.5 rounded-full transition-all cursor-pointer shadow-xl shrink-0 hidden md:block"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Description block */}
              <div className="w-full max-w-2xl mt-5 text-center z-10 px-4" onClick={e => e.stopPropagation()}>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  {GALLERY_ITEMS[lightboxIndex].desc}
                </p>
              </div>

              {/* Mobile Arrows & Bottom Indicator Dots */}
              <div className="w-full max-w-4xl mt-6 flex flex-col items-center gap-4 z-10" onClick={e => e.stopPropagation()}>
                {/* Mobile indicators */}
                <div className="flex items-center gap-6 md:hidden">
                  <button
                    className="bg-[#0A1329] border border-slate-800 text-slate-300 p-3 rounded-full transition-all cursor-pointer active:bg-blue-600"
                    onClick={() => handlePrev()}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-[#0A1329] border border-slate-800 text-slate-300 p-3 rounded-full transition-all cursor-pointer active:bg-blue-600"
                    onClick={() => handleNext()}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Direct Dot Indicators to roam from video to video */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full py-2 px-4 scrollbar-none">
                  {GALLERY_ITEMS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === lightboxIndex ? 'bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-slate-700 hover:bg-slate-500'}`}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>

      {/* 9. How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/80">
        <SparklesText
          className="text-3xl font-bold mb-16 text-white"
          text="How it Works?"
          colors={{ first: "#3b82f6", second: "#60a5fa" }} 
        />
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative max-w-4xl mx-auto">
          {/* Dotted Line connector (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t border-dashed border-slate-800 z-0"></div>

          {[
            { step: '1', title: 'Book Repair', icon: <Smartphone className="w-8 h-8 text-blue-400" />, color: 'bg-blue-600/10 border-blue-900/30' },
            { step: '2', title: 'Tech Assigned', icon: <Search className="w-8 h-8 text-blue-400" />, color: 'bg-blue-600/10 border-blue-900/30' },
            { step: '3', title: 'Tech Arrives', icon: <MapPin className="w-8 h-8 text-blue-400" />, color: 'bg-blue-600/10 border-blue-900/30' },
            { step: '4', title: 'Repair Completed', icon: <CheckCircle2 className="w-8 h-8 text-blue-400" />, color: 'bg-blue-600/10 border-blue-900/30' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center z-10 bg-[#050B18] px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.6 }}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className={`w-24 h-24 rounded-full ${s.color} flex items-center justify-center mb-4 border-2 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-1">{s.title}</h3>
              <p className="text-xs text-slate-400 max-w-[150px]">Step {s.step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. Common Problems We Fix */}
      <section className="bg-[#030712]/40 py-20 border-y border-slate-800/80" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
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
          <p className="text-sm text-slate-400 mb-12">We handle a variety of issues with genuine spare parts.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {commonProblems.map((prob, i) => (
              <div 
                key={i} 
                className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#0A1329] border border-slate-800 shadow-xl transition-all block"
              >
                {/* Background repair image */}
                <img 
                  src={prob.image} 
                  alt={prob.title} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Visual dark overlay gradient at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-6" />

                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10 text-center">
                  <h3 className="font-bold text-white text-sm sm:text-base md:text-lg">
                    {prob.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* 10. Testimonials */}
      <section className="bg-[#050B18] text-white py-20 relative overflow-hidden" >
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-sm text-slate-400 mb-12">4.8 Average Rating on Google Reviews</p>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.slice(0, 3).map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-[#0A1329] p-8 rounded-3xl border border-slate-800 text-left flex flex-col h-full hover:border-slate-700 transition-colors shadow-lg"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.review}"</p>
                  <div className="mt-auto flex items-center gap-4">
                    {review.image && <img src={review.image} className="w-12 h-12 rounded-full object-cover border border-slate-700" alt={review.customerName} />}
                    <div>
                      <h4 className="font-bold text-white text-sm">{review.customerName}</h4>
                      <p className="text-xs text-slate-400">{review.deviceType}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-[#0A1329] max-w-xl mx-auto p-12 rounded-3xl border border-slate-800 shadow-xl">
              <p className="text-slate-300 text-base font-medium mb-6">No feedback. Be first to give feedback.</p>
              <button onClick={(e) => e.preventDefault()} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all inline-block shadow-md cursor-default">
                Give Feedback
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 11. Technician Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#030712]/40 border-t border-slate-800/80" id="contact-us">
        <h2 className="text-3xl font-bold mb-4 text-white">Meet Our Expert Technicians</h2>
        <p className="text-sm text-slate-400 mb-12">Certified professionals dedicated to restoring your devices.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-5xl mx-auto justify-center">
          {TECHNICIANS.map((tech, i) => (
            <div key={i} className="bg-[#0A1329] border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-72 bg-slate-900 overflow-hidden">
                <img 
                  src={tech.profileImage} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                  alt={tech.name} 
                />
              </div>
              <div className="py-6 px-4">
                <h3 className="font-bold text-slate-200 text-lg group-hover:text-blue-400 transition-colors">{tech.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* 12. Bottom CTA Banner */}
      <section className="bg-[#0A1329] py-20 text-center text-white relative overflow-hidden border-t border-slate-800" >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="inline-block bg-blue-600/30 border border-blue-500/30 px-5 py-1.5 rounded-full text-xs font-bold mb-8 backdrop-blur-sm shadow-sm tracking-widest uppercase text-blue-300">
            Hassle-Free Booking
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Broken Phone? Get it Fixed Today!</h2>
          <p className="text-slate-300 text-sm md:text-base mb-10 font-medium">Call us now or book a technician online in less than 2 minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+919310112994" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Call +91 9310112994</span>
            </a>
            <a
              href={`https://wa.me/919310112994?text=${encodeURIComponent("Hi! 👋 I'd like to book a repair for my device. Could you help me with the next steps?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all text-sm flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section >

      {/* 13. Serviceable Areas Section */}
      <section className="relative py-16 sm:py-20 border-t border-slate-900/60 overflow-hidden bg-[#050B18]">

        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-600/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-600/4 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Coverage Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Doorstep Repairs Across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Delhi NCR
              </span>
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Free pickup &amp; drop service available across all major NCR zones. Book once — we come to you.
            </p>
          </motion.div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { city: 'Delhi', sub: 'Nehru Place Hub', color: 'blue' },
              { city: 'Noida', sub: 'Sector 18 & 62', color: 'indigo' },
              { city: 'Gurugram', sub: 'Cyber City & MG Rd', color: 'violet' },
              { city: 'Faridabad', sub: 'Sector 15 & 21', color: 'sky' },
              { city: 'Ghaziabad', sub: 'Indirapuram & Raj Nagar', color: 'cyan' },
              { city: 'Greater Noida', sub: 'Knowledge Park', color: 'teal' },
            ].map((item, idx) => (
              <motion.div
                key={item.city}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="relative group bg-[#0A1329] border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center text-center cursor-default overflow-hidden hover:border-blue-500/30 transition-colors duration-300 shadow-sm hover:shadow-blue-500/10 hover:shadow-lg"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Ping dot */}
                <div className="relative mb-3">
                  <span className="flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50" style={{ animationDelay: `${idx * 300}ms` }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                  </span>
                </div>

                <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-200 leading-tight">
                  {item.city}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 leading-tight group-hover:text-slate-400 transition-colors">
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom strip — live coverage badge + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-900/40 text-emerald-400 text-xs font-bold px-4 py-2 rounded-full">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Live coverage active — Delhi NCR</span>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2 rounded-full transition-all shadow-md hover:shadow-blue-500/25"
            >
              <MapPin className="w-3.5 h-3.5" />
              Book Free Pickup
            </a>
          </motion.div>

        </div>
      </section>

    </div >
  );
}
