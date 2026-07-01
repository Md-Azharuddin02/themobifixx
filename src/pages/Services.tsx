/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Hammer, ArrowRight, ShieldCheck, Cpu, Laptop, HardDrive } from 'lucide-react';
import { ServiceCategory } from '../types';
import ServiceIcon from '../components/ServiceIcon';

export default function Services() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'repairs' | 'upgrades' | 'software'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Failed fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getFilteredServices = () => {
    return services.filter((s) => {
      // Search matching
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Filter matching
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'repairs') {
        return ['laptop-repair', 'macbook-repair', 'mobile-repair', 'tablet-repair', 'motherboard-repair', 'keyboard-repair'].includes(s.slug);
      }
      if (selectedFilter === 'upgrades') {
        return ['ssd-upgrade', 'ram-upgrade', 'battery-replacement', 'screen-replacement'].includes(s.slug);
      }
      if (selectedFilter === 'software') {
        return ['deep-cleaning', 'software-installation', 'virus-removal', 'data-recovery', 'doorstep-repair'].includes(s.slug);
      }
      return true;
    });
  };

  const filters = [
    { id: 'all', name: 'All Services' },
    { id: 'repairs', name: 'Device Repairs' },
    { id: 'upgrades', name: 'Hardware Upgrades' },
    { id: 'software', name: 'Software & Maintenance' },
  ];

  return (
    <div className="pt-24 pb-12 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-200/50 py-16" id="services-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Premium Technology Repairs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1020] tracking-tight leading-none">
            Our Professional Catalog
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Discover our complete list of 15 premium diagnostics, chip-level logic board repairs, and speed optimizations in Delhi NCR.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mt-8">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search services... (e.g., Motherboard, SSD, Screen)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0F4CFF]/5 focus:border-[#0F4CFF] bg-white text-sm shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#0F4CFF] text-white shadow-lg shadow-blue-100'
                  : 'bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-50 border border-slate-200/60 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {getFilteredServices().map((s) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={s.slug}
                  className="bg-slate-50/40 border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Featured Image */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={s.featuredImage}
                        alt={s.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full border border-slate-100/50 shadow-sm text-slate-800 flex items-center gap-1.5">
                        <ServiceIcon name={s.icon} className="w-4 h-4 text-[#0F4CFF]" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{s.title.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-[#0A1020] text-lg mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{s.description}</p>

                      {/* Highlights */}
                      {s.highlights && s.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Deliverables</span>
                          {s.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50/50 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-widest leading-none mb-1">Price Guide</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{s.pricing || 'Starts ₹299'}</span>
                    </div>
                    <Link
                      to={`/services/${s.slug}`}
                      className="bg-[#0F4CFF] text-white hover:bg-[#0A3DCC] text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md shadow-blue-100/50 transition-all flex items-center gap-1"
                    >
                      <span>Order Service</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && getFilteredServices().length === 0 && (
          <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-md mx-auto">
            <h4 className="font-bold text-[#0A1020] text-base mb-2">No specialized service found</h4>
            <p className="text-xs text-slate-500 mb-6">We likely still support it! Reach out directly with our custom inquiry form.</p>
            <Link
              to="/contact?tab=inquiry"
              className="bg-[#0F4CFF] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-blue-100/50"
            >
              Ask Custom Inquiry
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
