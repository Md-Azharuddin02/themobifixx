import { useEffect } from 'react';
import Hero, { ClosingStatement } from '../components/home/Hero';
import { DeviceChooser, ServicesOverview } from '../components/home/DeviceBrands';
import { OurPromise, Process } from '../components/home/About';
import { Gallery, Technicians } from '../components/home/Showcase';
import Reviews from '../components/home/Reviews';
import { CoverageBand, Faq, GotAQuestion } from '../components/home/Closing';

// Section order follows the client's reference site (withinstafix.com); content is TheMobifixx's own.
export default function Home({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  // Header links from other pages arrive as /?scroll=<section-id>.
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get('scroll');
    if (!target) return;
    const t = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Hero onOpenConsultation={onOpenConsultation} />
      <DeviceChooser />
      <ServicesOverview />
      <OurPromise />
      <Gallery />
      <Process />
      <CoverageBand />
      <Technicians />
      <GotAQuestion />
      <Faq />
      <Reviews />
      <ClosingStatement />
    </>
  );
}
