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
  const [mapTab, setMapTab] = useState<'nehru' | 'gurugram' | 'radar'>('nehru');

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
      city: 'New Delhi (Master Lab)',
      address: 'G-12, Ground Floor, Nehru Place, New Delhi, Delhi 110019',
      landmark: 'Opposite Metro Station Exit 2',
      phone: '+91 99999 99999',
    },
    {
      city: 'Gurugram (Corporate Hub)',
      address: 'Block-D, DLF CyberCity, Phase III, Gurugram, Haryana 122002',
      landmark: 'Near DLF Cyber Hub Entrance',
      phone: '+91 99999 99999',
    },
  ];

  return (
    <div className="pt-20 md:pt-32 pb-0 bg-[#F8FAFC] min-h-screen">

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
                      href="tel:+919999999999"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 border-2 border-slate-900 font-black text-sm px-4 py-2 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#0F4CFF]" />
                      +91 99999 99999
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
                      href="https://wa.me/919999999999?text=Hi%20TheMobifixx,%20I%20need%20to%20consult%20regarding%20repair."
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
              <h3 className="font-black text-slate-900 text-lg">Our Laboratory Addresses</h3>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">TheMobifixx Delhi NCR Locations & Radar</h4>
                {/* Map tab switchers */}
                <div className="flex border-2 border-slate-900 rounded-xl overflow-hidden shadow-[1px_1px_0px_#0A1020] self-start">
                  {(['nehru', 'gurugram', 'radar'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMapTab(tab)}
                      className={`px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border-r-2 border-slate-900 last:border-r-0 ${mapTab === tab ? 'bg-[#0F4CFF] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      {tab === 'nehru' ? 'Nehru' : tab === 'gurugram' ? 'Gurugram' : 'Radar'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map viewport */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_#0A1020] h-[280px]">
                {mapTab === 'nehru' && (
                  <iframe title="TheMobifixx Nehru Place Master Lab Location Map"
                    src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 absolute inset-0" loading="lazy" allowFullScreen />
                )}
                {mapTab === 'gurugram' && (
                  <iframe title="TheMobifixx Gurugram Corporate Hub Location Map"
                    src="https://maps.google.com/maps?q=DLF%20CyberHub,%20Gurugram,%20Haryana%20122002&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 absolute inset-0" loading="lazy" allowFullScreen />
                )}
                {mapTab === 'radar' && (
                  <div className="w-full h-full bg-[#0A1020] text-slate-400 p-6 flex flex-col justify-between font-mono relative">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0F4CFF_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="flex justify-between items-center text-[10px] text-[#00C48C] font-black pb-2 border-b border-white/5 relative z-10">
                      <span>SERVICING_RADIAL: 45KM RADIAL</span>
                      <span className="animate-pulse">● RADAR ACTIVE</span>
                    </div>
                    <div className="space-y-2 py-4 relative z-10 text-left">
                      <div className="flex items-center gap-2 text-xs text-white">
                        <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-ping shrink-0" />
                        <span className="font-black">Nehru Place Master Lab (HQ & Hardware Dispatch)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4 leading-normal font-sans">Direct counter drop-ins, diagnostic testing bench, micro-soldering labs, and certified screen calibrations.</p>
                      <div className="flex items-center gap-2 text-xs text-white pt-2">
                        <span className="w-2 h-2 rounded-full bg-[#0F4CFF] shrink-0" />
                        <span className="font-black">DLF CyberCity Support Point (Corporate & Enterprise)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4 leading-normal font-sans">Express enterprise transit coordination, custom billing clearance, and corporate fleet audits.</p>
                    </div>
                    <div className="pt-2 border-t border-white/5 text-[9px] text-slate-500 flex justify-between items-center relative z-10">
                      <span>SECURE INTRANET SYNC</span>
                      <span className="text-[#0F4CFF] font-black">90-MIN NCR TRANSIT</span>
                    </div>
                  </div>
                )}
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
