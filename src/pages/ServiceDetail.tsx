import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft, Loader2, Phone, Calendar, Heart, AlertCircle } from 'lucide-react';
import { ServiceCategory } from '../types';
import ServiceIcon from '../components/ServiceIcon';
import { RepairBookingForm } from '../components/LeadForms';

// Shared dotgrid background style
const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/services');
        const list: ServiceCategory[] = await res.json();
        const matched = list.find((s) => s.slug === slug);
        if (matched) {
          setService(matched);
        } else {
          // Fallback to laptop-repair if unmatched
          const laptop = list.find((s) => s.slug === 'laptop-repair');
          if (laptop) setService(laptop);
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#0F4CFF] animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Loading detailed specs...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Service Not Found</h2>
          <Link to="/services" className="text-[#0F4CFF] text-sm font-bold">Back to All Services</Link>
        </div>
      </div>
    );
  }

  // Pre-select corresponding device form input mapping
  const getDeviceTypeForForm = (): 'laptop' | 'macbook' | 'mobile' | 'tablet' | 'other' => {
    if (slug?.includes('macbook')) return 'macbook';
    if (slug?.includes('laptop')) return 'laptop';
    if (slug?.includes('mobile')) return 'mobile';
    if (slug?.includes('tablet')) return 'tablet';
    return 'other';
  };

  const currentDeviceType = getDeviceTypeForForm();

  // Custom diagnostic workflow per category
  const workflows = [
    { step: '01', title: 'Complete Thermal & Oscilloscope Scan', desc: 'We scan your board under stereo microscope lens to check power regulators and SMD lines.' },
    { step: '02', title: 'Line-by-Line Micro-Soldering', desc: 'Faulty resistors, IC chips, or dead battery cells are replaced using precision soldering rigs.' },
    { step: '03', title: 'Stress Testing & Quality Audit', desc: 'The device is benchmarked under full computing load for 2 hours to ensure thermals and volts are 100% stable.' },
  ];

  return (
    <div className="pt-24 md:pt-36 pb-12 bg-[#F8FAFC] min-h-screen">
      {/* Detail Hero Section */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="service-detail-hero"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-3xl">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-slate-900 transition-colors uppercase tracking-wider mb-2 border-2 border-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[3px_3px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services Catalog</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {service.title} Services in Delhi NCR
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              {service.seoDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-1.5 bg-white border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020]">
                <ShieldCheck className="w-4 h-4 text-[#00C48C]" />
                <span className="font-bold">90-Day Standard Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020]">
                <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
                <span className="font-bold">Original OEM Components</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Description Column (8-col) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Image banner */}
            <div className="rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[5px_5px_0px_#0A1020] aspect-video">
              <img
                src={service.featuredImage}
                alt={service.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* In-depth service insights */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-[5px_5px_0px_#0A1020]">
              <h3 className="font-black text-slate-900 text-xl">Service Overview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                TheMobifixx provides professional, chip-level logic board and diagnostic repairs for all premium gadgets. Our Nehru Place lab houses specialized infrared soldering stations and digital oscilloscopes to troubleshoot and correct micro short circuits.
              </p>

              {/* Deliverables lists */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="space-y-4 pt-4 border-t-2 border-slate-900">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Included Deliverables & Benchmarks</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-[#00C48C] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* The Diagnostic Procedure flow */}
            <div className="space-y-6">
              <h3 className="font-black text-slate-900 text-xl">Our Diagnostic Workflow</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {workflows.map((w, i) => (
                  <div key={i} className="bg-white border-2 border-slate-900 rounded-2xl p-5 space-y-3 shadow-[4px_4px_0px_#0A1020]">
                    <span className="text-3xl font-black text-[#0F4CFF]/20 block">{w.step}</span>
                    <h4 className="font-black text-slate-900 text-xs leading-snug">{w.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Certifications details */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[5px_5px_0px_#0A1020]">
              <div className="w-16 h-16 border-2 border-slate-900 bg-[#00C48C] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0px_#0A1020]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-black text-slate-900 text-base">The TheMobifixx Guarantee</h4>
                <p className="text-xs leading-relaxed text-slate-505">
                  Every replacement panel, battery block, memory chip, and motherboard micro-soldering job is backed by our stamped 90-day warranty card, protecting you from future performance regression.
                </p>
              </div>
            </div>

          </div>

          {/* Right Form Column (5-col) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Custom Pre-selected Repair Booking Form */}
            <RepairBookingForm initialDeviceType={currentDeviceType} />

            {/* Quick Contact Box */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 space-y-4 text-center shadow-[4px_4px_0px_#0A1020]">
              <h4 className="font-black text-slate-900 text-sm">Prefer a Direct Conversation?</h4>
              <p className="text-xs text-slate-500">Call our diagnostic center directly to get immediate pricing estimates and technician scheduling coordinates.</p>
              <div className="pt-2">
                <a
                  href="tel:+919310112994"
                  className="w-full flex items-center justify-center gap-2 bg-[#0F4CFF] text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 9310112994</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
