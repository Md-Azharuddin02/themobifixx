import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceCategory } from '../types';
import ServiceIcon from '../components/ServiceIcon';

// Shared dotgrid background style
const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

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
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
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
    <div className="pt-24 md:pt-36 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="services-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Premium Technology Repairs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Our Professional Catalog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover our complete list of 15 premium diagnostics, chip-level logic board repairs, and speed optimizations in Delhi NCR.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services... (e.g., Motherboard, SSD, Screen)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-medium shadow-[3px_3px_0px_#0A1020] focus:outline-none focus:shadow-[4px_4px_0px_#0A1020] transition-all"
            />
          </div>
        </div>
      </section>

      {/* ─── CATALOG ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider border-2 border-slate-900 transition-all duration-100 cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#0F4CFF] text-white shadow-[3px_3px_0px_#0A1020] -translate-y-[1px] -translate-x-[1px]'
                  : 'bg-white text-slate-700 shadow-[2px_2px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[3px_3px_0px_#0A1020]'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 bg-white border-2 border-slate-900 rounded-2xl animate-pulse shadow-[4px_4px_0px_#0A1020]" />
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
                  className="bg-white border-2 border-slate-900 rounded-2xl shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[7px_7px_0px_#0A1020] transition-all duration-150 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Featured image */}
                    <div className="h-44 overflow-hidden relative border-b-2 border-slate-900">
                      <img
                        src={s.featuredImage}
                        alt={s.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white border-2 border-slate-900 px-3 py-1 rounded-xl text-slate-800 flex items-center gap-1.5 shadow-[2px_2px_0px_#0A1020]">
                        <ServiceIcon name={s.icon} className="w-3.5 h-3.5 text-[#0F4CFF]" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{s.title.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-black text-slate-900 text-lg mb-1">{s.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{s.description}</p>

                      {/* Highlights */}
                      {s.highlights && s.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-4 border-t-2 border-slate-900">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Service Deliverables</span>
                          {s.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#00C48C] shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer bar */}
                  <div className="p-5 border-t-2 border-slate-900 bg-[#F8FAFC] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest leading-none mb-1">Price Guide</span>
                      <span className="text-xs font-black text-white bg-[#00C48C] border-2 border-slate-900 px-2.5 py-0.5 rounded-xl shadow-[1px_1px_0px_#0A1020]">
                        {s.pricing || 'Starts ₹299'}
                      </span>
                    </div>
                    <Link
                      to={`/services/${s.slug}`}
                      className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#FFB800] hover:shadow-[4px_4px_0px_#FFB800] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#FFB800] transition-all flex items-center gap-1.5"
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

        {/* Empty state */}
        {!loading && getFilteredServices().length === 0 && (
          <div className="text-center py-12 bg-white border-2 border-slate-900 rounded-2xl max-w-md mx-auto shadow-[5px_5px_0px_#0A1020] p-8">
            <h4 className="font-black text-slate-900 text-base mb-2">No specialized service found</h4>
            <p className="text-xs text-slate-500 mb-6">We likely still support it! Reach out directly with our custom inquiry form.</p>
            <Link
              to="/contact?tab=inquiry"
              className="inline-flex items-center gap-2 bg-[#0F4CFF] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] transition-all"
            >
              Ask Custom Inquiry
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
