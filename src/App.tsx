import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import SEOManager from './components/SEOManager';
import BrandPage from './pages/BrandPage';
import DeviceRepairPage from './pages/DeviceRepairPage';
import CategoryPage from './CategoryPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ConsultationBookingModal from './components/ConsultationBookingModal';
import { WA_GENERAL_MESSAGE, waLink } from './config/contact';
import { WhatsAppIcon } from './components/ui/primitives';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const sectionMap: Record<string, string> = {
      '/about': 'about-us',
      '/reviews': 'reviews',
      '/technicians': 'technicians',
      '/faq': 'faq',
      '/gallery': 'gallery',
    };

    if (sectionMap[pathname]) {
      const t = setTimeout(() => {
        document.getElementById(sectionMap[pathname])?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return null;
}

function FloatingCTAs() {
  const [showTop, setShowTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The issue page has its own bottom action bar.
  if (pathname.startsWith('/repair/')) return null;

  const base = 'group relative items-center justify-center rounded-full border transition-colors';
  const tip = 'pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-sm bg-ink px-2 py-1 text-xs font-medium text-on-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block';

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-2.5 md:bottom-6 md:right-6">
      {showTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${base} hidden h-11 w-11 border-line-strong bg-card text-fg hover:border-accent md:flex`} aria-label="Scroll to top of page">
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
          <span className={tip}>Back To Top</span>
        </button>
      )}
      <a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className={`${base} flex h-13 w-13 border-transparent bg-whatsapp text-white hover:bg-whatsapp-hover`} aria-label="WhatsApp Support Desk">
        <WhatsAppIcon className="h-6 w-6" />
        <span className={tip}>WhatsApp Support</span>
      </a>
    </div>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <BrowserRouter>
      <SEOManager />
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-fg">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col bg-paper font-sans text-fg antialiased">
        <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

        <main id="main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/about" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/reviews" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/technicians" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/faq" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/gallery" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/repair/:brandId/:modelId" element={<DeviceRepairPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/services" element={<Services />} />

            {/* Clean Service SEO Routes */}
            <Route path="/services/mobile-repair" element={<ServiceDetail />} />
            <Route path="/services/laptop-repair" element={<ServiceDetail />} />
            <Route path="/services/macbook-repair" element={<ServiceDetail />} />
            <Route path="/services/tablet-repair" element={<ServiceDetail />} />
            <Route path="/services/screen-repair" element={<ServiceDetail />} />
            <Route path="/services/screen-replacement" element={<ServiceDetail />} />
            <Route path="/services/battery-replacement" element={<ServiceDetail />} />
            <Route path="/services/motherboard-repair" element={<ServiceDetail />} />
            <Route path="/services/water-damage-repair" element={<ServiceDetail />} />
            <Route path="/services/doorstep-repair" element={<ServiceDetail />} />
            <Route path="/services/pickup-drop" element={<ServiceDetail />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            {/* Brand + Category Clean Routes */}
            <Route path="/services/mobile-repair/iphone-repair" element={<BrandPage brandOverride="apple" categoryOverride="mobile" />} />
            <Route path="/services/mobile-repair/samsung-repair" element={<BrandPage brandOverride="samsung" categoryOverride="mobile" />} />
            <Route path="/laptop-repair/dell" element={<BrandPage brandOverride="dell" categoryOverride="laptop" />} />
            <Route path="/laptop-repair/hp" element={<BrandPage brandOverride="hp" categoryOverride="laptop" />} />

            {/* Fallback */}
            <Route path="*" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          </Routes>
        </main>

        <FloatingCTAs />
        <Footer />

        <ConsultationBookingModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
