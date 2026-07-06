import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageSquare, Clock, MapPin, Hammer } from 'lucide-react';
import { motion } from 'motion/react';
import { InquiryForm, RepairBookingForm } from '../components/LeadForms';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') === 'inquiry' ? 'inquiry' : 'booking';
  const selectedTech = searchParams.get('tech') || '';

  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>(activeTabParam);

  useEffect(() => {
    if (searchParams.get('tab') === 'inquiry') {
      setActiveTab('inquiry');
    } else {
      setActiveTab('booking');
    }
  }, [searchParams]);

  const changeTab = (tab: 'booking' | 'inquiry') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const branches = [
    {
      city: 'New Delhi (Main Service Centre)',
      address: 'G-12, Ground Floor, Nehru Place, New Delhi, Delhi 110019',
      landmark: 'Opposite Metro Station Exit 2',
      phone: '+91 9310112994',
    }
  ];

  return (
    <div className="pt-24 md:pt-36 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="contact-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <span className="w-2 h-2 bg-slate-900 rounded-full animate-ping" />
            <span>Support Desk</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Get Connected<br />With TheMobifixx
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Book a premium doorstep pickup transit or reach out with a custom logic board query. We respond within 15 minutes.
          </p>
        </div>
      </section>

      {/* ─── MAIN GRID ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT: Contact info & Locations (5-cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Emergency Support card — light neobrutalist */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-[6px_6px_0px_#0A1020]">
              <h3 className="font-black text-slate-900 text-lg border-b-2 border-slate-900 pb-3">Emergency Support</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-slate-900 bg-[#0F4CFF] text-white rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A1020]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-black tracking-widest mb-0.5">Direct Hotline (Call)</span>
                    <a
                      href="tel:+919310112994"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 border-2 border-slate-900 font-black text-sm px-4 py-2 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#0F4CFF]" />
                      +91 9310112994
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-slate-900 bg-[#00C48C] text-white rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A1020]">
                    <MessageSquare className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-black tracking-widest mb-0.5">WhatsApp Support Desk</span>
                    <motion.a
                      href="https://wa.me/919310112994?text=Hi%20TheMobifixx,%20I%20need%20to%20consult%20regarding%20repair."
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#00C48C] text-white border-2 border-slate-900 font-black text-sm px-4 py-2 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp Chat &rarr;
                    </motion.a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-slate-900 bg-[#F8FAFC] rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A1020]">
                    <Clock className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-black tracking-widest mb-0.5">Business Support Hours</span>
                    <span className="text-sm text-slate-800 font-black block">Mon - Sun: 9:00 AM - 9:00 PM (Daily Support)</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Emergency helpline is active 24/7.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Branch listings */}
            <div className="space-y-3">
              <h3 className="font-black text-slate-900 text-lg">Our Service Centre Addresses</h3>
              <div className="space-y-3">
                {branches.map((b, idx) => (
                  <div key={idx} className="bg-white border-2 border-slate-900 rounded-xl p-5 shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#0A1020] transition-all space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm">
                      <MapPin className="w-4 h-4 text-[#0F4CFF]" />
                      <span>{b.city}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.address}</p>
                    <span className="text-[10px] font-mono text-slate-400 block pt-1.5 border-t-2 border-slate-900">
                      Landmark: {b.landmark} | Hotlines: {b.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map panel */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 space-y-4 shadow-[4px_4px_0px_#0A1020]" id="interactive-map-panel">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-1">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">TheMobifixx Delhi Locations</h4>
              </div>

              {/* Map viewport */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_#0A1020] h-[280px]">
                <iframe title="TheMobifixx Nehru Place Master Lab Location Map"
                  src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0" loading="lazy" allowFullScreen />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse" /> Real-time GPS Tracking</span>
                <span className="font-black text-slate-700">Open 9:00 AM - 9:00 PM (Daily)</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Lead forms (7-cols) */}
          <div className="lg:col-span-7">
            {/* Tab switcher */}
            <div className="grid grid-cols-2 border-2 border-slate-900 rounded-xl overflow-hidden shadow-[3px_3px_0px_#0A1020] mb-6">
              <button
                onClick={() => changeTab('booking')}
                className={`py-3.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-r-2 border-slate-900 ${
                  activeTab === 'booking' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Book Repair & Pickup
              </button>
              <button
                onClick={() => changeTab('inquiry')}
                className={`py-3.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'inquiry' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {/* Selected form */}
            {activeTab === 'booking' ? (
              <div>
                {selectedTech && (
                  <div className="bg-white border-2 border-[#0F4CFF] rounded-xl p-4 mb-4 text-xs font-black text-[#0F4CFF] flex items-center justify-between shadow-[2px_2px_0px_#0F4CFF]">
                    <span>Requesting Lead Engineer: {selectedTech}</span>
                    <button onClick={() => setSearchParams({ tab: 'booking' })} className="text-rose-500 hover:underline font-black">Clear Request</button>
                  </div>
                )}
                <RepairBookingForm />
              </div>
            ) : (
              <InquiryForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
