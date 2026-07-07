import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageSquare, Clock, MapPin, Hammer } from 'lucide-react';
import { motion } from 'motion/react';
import { InquiryForm, RepairBookingForm } from '../components/LeadForms';

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
      phone: '+91 9818409122',
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 pb-20">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 border-b border-gray-100 text-center" id="contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Get Connected With Us
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Book a premium doorstep repair or reach out with a custom logic board query. We respond within 15 minutes.
          </p>
        </div>
      </section>

      {/* ─── MAIN GRID ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: Contact info & Locations (5-cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Emergency Support card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Emergency Support</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-widest mb-1">Direct Hotline</span>
                    <a
                      href="tel:+919818409122"
                      className="text-gray-900 font-bold text-lg hover:text-brand-orange transition-colors"
                    >
                      +91 9818409122
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-widest mb-1">WhatsApp Support</span>
                    <a
                      href="https://wa.me/919818409122?text=Hi%20TheMobifixx,%20I%20need%20to%20consult%20regarding%20repair."
                      target="_blank" rel="noopener noreferrer"
                      className="text-gray-900 font-bold text-lg hover:text-green-600 transition-colors"
                    >
                      Chat with us
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-widest mb-1">Business Hours</span>
                    <span className="text-sm text-gray-800 font-bold block mb-0.5">Mon - Sun: 9:00 AM - 9:00 PM</span>
                    <span className="text-xs text-gray-500 block">Emergency helpline is active 24/7.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Branch listings */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg px-1">Service Centre Addresses</h3>
              <div className="space-y-3">
                {branches.map((b, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                      <MapPin className="w-5 h-5 text-brand-orange" />
                      <span>{b.city}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.address}</p>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-2">
                       <span className="text-xs text-gray-600 block mb-1"><strong>Landmark:</strong> {b.landmark}</span>
                       <span className="text-xs text-gray-600 block"><strong>Hotline:</strong> {b.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm" id="interactive-map-panel">
              <h4 className="font-bold text-gray-900 text-sm">Location Map</h4>
              <div className="relative rounded-xl overflow-hidden h-[240px] bg-gray-100">
                <iframe title="TheMobifixx Nehru Place Location"
                  src="https://maps.google.com/maps?q=G-12,%20Nehru%20Place,%20New%20Delhi,%20Delhi%20110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0" loading="lazy" allowFullScreen />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Lead forms (7-cols) */}
          <div className="lg:col-span-7">
            
            {/* Tab switcher - Pill style */}
            <div className="flex p-1 bg-white border border-gray-200 rounded-full shadow-sm mb-8 max-w-md mx-auto">
              <button
                onClick={() => changeTab('booking')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-colors ${
                  activeTab === 'booking' ? 'bg-brand-orange text-white shadow-sm' : 'text-gray-500 hover:text-brand-orange'
                }`}
              >
                Book Repair
              </button>
              <button
                onClick={() => changeTab('inquiry')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-colors ${
                  activeTab === 'inquiry' ? 'bg-brand-orange text-white shadow-sm' : 'text-gray-500 hover:text-brand-orange'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {/* Selected form container */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              {activeTab === 'booking' ? (
                <div>
                  {selectedTech && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm font-bold text-blue-700 flex items-center justify-between">
                      <span>Requesting Technician: {selectedTech}</span>
                      <button onClick={() => setSearchParams({ tab: 'booking' })} className="text-rose-500 hover:underline">Clear</button>
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
    </div>
  );
}
