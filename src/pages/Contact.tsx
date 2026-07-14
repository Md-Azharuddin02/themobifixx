import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
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
      city: 'Nehru Place Market (Shop Location)',
      address: '28°32\'55.5"N 77°15\'03.6"E, Near Blue Dart, Nehru Place Market, New Delhi',
      landmark: 'Near Blue Dart',
      phone: '+91 9310112994',
    }
  ];

  return (
    <div className="bg-[#050B18] min-h-screen font-sans text-slate-200 pb-20" id="contact-us">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="bg-[#030712]/50 py-16 sm:py-20 border-b border-slate-800/80 text-center" id="contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Get Connected With Us
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
            <div className="bg-[#0A1329] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="font-bold text-white text-lg border-b border-slate-800 pb-3">Emergency Support</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-450 text-[10px] block uppercase font-bold tracking-widest mb-1">Direct Hotline</span>
                    <a
                      href="tel:+919310112994"
                      className="text-white font-bold text-lg hover:text-blue-450 transition-colors"
                    >
                      +91 9310112994
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/30">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-450 text-[10px] block uppercase font-bold tracking-widest mb-1">WhatsApp Support</span>
                    <a
                      href="https://wa.me/919310112994?text=Hi,%20I%20would%20like%20to%20know%2520more%20about%20your%20repair%20services.%20Please%20assist%20me."
                      target="_blank" rel="noopener noreferrer"
                      className="text-white font-bold text-lg hover:text-blue-450 transition-colors"
                    >
                      Chat with us
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-450 text-[10px] block uppercase font-bold tracking-widest mb-1">Business Hours</span>
                    <span className="text-sm text-slate-200 font-bold block mb-0.5">Mon - Sun: 9:00 AM - 9:00 PM</span>
                    <span className="text-xs text-slate-400 block">Emergency helpline is active 24/7.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Branch listings */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg px-1">Service Centre Addresses</h3>
              <div className="space-y-3">
                {branches.map((b, idx) => (
                  <div key={idx} className="bg-[#0A1329] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-slate-750 transition-colors">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <MapPin className="w-5 h-5 text-blue-450" />
                      <span>{b.city}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{b.address}</p>
                    <div className="bg-[#0E1B38] p-3 rounded-lg border border-slate-800 mt-2 text-slate-300">
                       <span className="text-xs block mb-1"><strong>Landmark:</strong> {b.landmark}</span>
                       <span className="text-xs block"><strong>Hotline:</strong> {b.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map panel */}
            <div className="bg-[#0A1329] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl" id="interactive-map-panel">
              <h4 className="font-bold text-white text-sm">Location Map</h4>
              <div className="relative rounded-xl overflow-hidden h-[240px] bg-slate-900 border border-slate-800">
                <iframe title="TheMobifixx Nehru Place Location"
                  src="https://maps.google.com/maps?q=28.54875,77.25100&z=17&output=embed"
                  className="w-full h-full border-0 absolute inset-0 opacity-80 hover:opacity-100 transition-opacity" loading="lazy" allowFullScreen />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Lead forms (7-cols) */}
          <div className="lg:col-span-7">
            
            {/* Tab switcher - Pill style */}
            <div className="flex p-1 bg-[#0A1329] border border-slate-800 rounded-full shadow-xl mb-8 max-w-md mx-auto">
              <button
                onClick={() => changeTab('booking')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-colors ${
                  activeTab === 'booking' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Book Repair
              </button>
              <button
                onClick={() => changeTab('inquiry')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-colors ${
                  activeTab === 'inquiry' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {/* Selected form container */}
            <div className="bg-[#0A1329] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              {activeTab === 'booking' ? (
                <div>
                  {selectedTech && (
                    <div className="bg-blue-950/40 border border-blue-900/50 rounded-xl p-4 mb-6 text-sm font-bold text-blue-300 flex items-center justify-between">
                      <span>Requesting Technician: {selectedTech}</span>
                      <button onClick={() => setSearchParams({ tab: 'booking' })} className="text-rose-450 hover:underline">Clear</button>
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
