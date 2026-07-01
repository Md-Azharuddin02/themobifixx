/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageSquare, Clock, MapPin, Mail, ChevronRight, Hammer, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { InquiryForm, RepairBookingForm } from '../components/LeadForms';

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') === 'inquiry' ? 'inquiry' : 'booking';
  const selectedTech = searchParams.get('tech') || '';

  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>(activeTabParam);
  const [mapTab, setMapTab] = useState<'nehru' | 'gurugram' | 'radar'>('nehru');

  // Sync state if parameters change
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
    <div className="pt-24 pb-12 bg-white min-h-screen">
      {/* Page header */}
      <section className="bg-slate-50 border-b border-slate-200/50 py-16" id="contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            <span>Support Desk</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1020] tracking-tight leading-none">
            Get Connected With LapyZone
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Book a premium doorstep pickup transit or reach out with a custom logic board query. We respond within 15 minutes.
          </p>
        </div>
      </section>

      {/* Main Grid content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Columns: Contact info & Locations (5-cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Connect cards */}
            <div className="bg-[#0A1020] text-white rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="font-extrabold text-lg border-b border-white/10 pb-3">Emergency Support</h3>
              
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] border border-[#0F4CFF]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-widest mb-0.5">Direct Hotline (Call)</span>
                    <a href="tel:+919999999999" className="text-white hover:text-[#0F4CFF] text-lg font-bold transition-colors">
                      +91 99999 99999
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#00C48C]/10 text-[#00C48C] border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-widest mb-0.5">WhatsApp support desk</span>
                    <motion.a
                      href="https://wa.me/919999999999?text=Hi%20LapyZone,%20I%20need%20to%20consult%20regarding%20repair."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#00C48C] hover:text-[#009E70] text-lg font-bold transition-colors cursor-pointer"
                      whileHover={{ scale: 1.04, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      Instant WhatsApp Chat &rarr;
                    </motion.a>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-widest mb-0.5">Business Support Hours</span>
                    <span className="text-sm text-slate-200 font-bold block">Mon - Sun: 9:00 AM - 9:00 PM (Daily Support)</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Emergency helpline is active 24/7.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Our Branches listing */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0A1020] text-lg">Our Laboratory Addresses</h3>
              <div className="space-y-4">
                {branches.map((b, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-1.5 text-[#0A1020] font-bold text-sm">
                      <MapPin className="w-4 h-4 text-[#0F4CFF]" />
                      <span>{b.city}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.address}</p>
                    <span className="text-[10px] font-mono text-slate-400 block pt-1.5 border-t border-slate-200/40">
                      Landmark: {b.landmark} | Hotlines: {b.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium map schematic wrapper */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4 shadow-sm" id="interactive-map-panel">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <h4 className="font-bold text-[#0A1020] text-xs uppercase tracking-wider">LapyZone Delhi NCR Locations & Radar</h4>
                
                {/* Embedded controls switcher */}
                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 self-start">
                  <button 
                    onClick={() => setMapTab('nehru')}
                    className={`px-2 py-1 text-[9px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${mapTab === 'nehru' ? 'bg-white text-[#0F4CFF] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Nehru Place
                  </button>
                  <button 
                    onClick={() => setMapTab('gurugram')}
                    className={`px-2 py-1 text-[9px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${mapTab === 'gurugram' ? 'bg-white text-[#0F4CFF] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Gurugram
                  </button>
                  <button 
                    onClick={() => setMapTab('radar')}
                    className={`px-2 py-1 text-[9px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${mapTab === 'radar' ? 'bg-white text-[#0F4CFF] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Radar
                  </button>
                </div>
              </div>

              {/* View port */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[280px]">
                {mapTab === 'nehru' && (
                  <iframe
                    title="LapyZone Nehru Place Master Lab Location Map"
                    src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 absolute inset-0"
                    loading="lazy"
                    allowFullScreen
                  />
                )}
                {mapTab === 'gurugram' && (
                  <iframe
                    title="LapyZone Gurugram Corporate Hub Location Map"
                    src="https://maps.google.com/maps?q=DLF%20CyberHub,%20Gurugram,%20Haryana%20122002&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 absolute inset-0"
                    loading="lazy"
                    allowFullScreen
                  />
                )}
                {mapTab === 'radar' && (
                  <div className="w-full h-full bg-[#0A1020] text-slate-400 p-6 flex flex-col justify-between font-mono relative">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0F4CFF_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    <div className="flex justify-between items-center text-[10px] text-[#00C48C] font-bold pb-2 border-b border-white/5 relative z-10">
                      <span>SERVICING_RADIAL: 45KM RADIAL</span>
                      <span className="animate-pulse">● RADAR ACTIVE</span>
                    </div>

                    <div className="space-y-2 py-4 relative z-10 text-left">
                      <div className="flex items-center gap-2 text-xs text-white">
                        <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-ping" />
                        <span className="font-bold">Nehru Place Master Lab (HQ & Hardware Dispatch)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4 leading-normal font-sans">
                        Direct counter drop-ins, diagnostic testing bench, micro-soldering labs, and certified screen calibrations.
                      </p>

                      <div className="flex items-center gap-2 text-xs text-white pt-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-bold">DLF CyberCity Support Point (Corporate & Enterprise)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4 leading-normal font-sans">
                        Express enterprise transit coordination, custom billing clearance, and corporate fleet audits.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[9px] text-slate-500 flex justify-between items-center relative z-10">
                      <span>SECURE INTRANET SYNC</span>
                      <span className="text-[#0F4CFF] font-black">90-MIN NCR TRANSIT</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Real-time GPS Tracking
                </span>
                <span className="font-medium text-slate-700">Open 9:00 AM - 9:00 PM (Daily)</span>
              </div>
            </div>

          </div>

          {/* Right Columns: Dynamic Interactive Lead Forms (7-cols) */}
          <div className="lg:col-span-7">
            {/* Form category tab switches */}
            <div className="grid grid-cols-2 bg-slate-100 p-1.5 rounded-full mb-6">
              <button
                onClick={() => changeTab('booking')}
                className={`py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'booking'
                    ? 'bg-white text-[#0A1020] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Book Repair & Pickup
              </button>
              <button
                onClick={() => changeTab('inquiry')}
                className={`py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'inquiry'
                    ? 'bg-white text-[#0A1020] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {/* Render selected form */}
            {activeTab === 'booking' ? (
              <div>
                {selectedTech && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 text-xs font-bold text-[#0F4CFF] flex items-center justify-between">
                    <span>Requesting Lead Engineer: {selectedTech}</span>
                    <button
                      onClick={() => setSearchParams({ tab: 'booking' })}
                      className="text-red-500 hover:underline"
                    >
                      Clear Request
                    </button>
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
