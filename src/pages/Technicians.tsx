import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, UserCheck, Calendar, Loader2 } from 'lucide-react';
import { Technician } from '../types';
import ReviewStars from '../components/ReviewStars';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function Technicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await fetch('/api/technicians');
        const data = await res.json();
        setTechnicians(data);
      } catch (err) {
        console.error('Failed fetching technicians:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnicians();
  }, []);

  const getAllAreas = () => {
    const areas = new Set<string>();
    technicians.forEach((t) => {
      t.serviceAreas.forEach((area) => areas.add(area));
    });
    return Array.from(areas).sort();
  };

  const getFilteredTechnicians = () => {
    return technicians.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.designation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArea = selectedArea === 'all' || t.serviceAreas.includes(selectedArea);
      return matchesSearch && matchesArea;
    });
  };

  return (
    <div className="pt-24 md:pt-36 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="tech-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Expert Technical Crew</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Verified Chip-Level<br />Master Engineers
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            TheMobifixx features certified engineers equipped with advanced diagnostic tools. Review specialized experience, ratings, and live coverage coordinates.
          </p>

          {/* Search + filter */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search engineer name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-medium shadow-[3px_3px_0px_#0A1020] focus:outline-none focus:shadow-[4px_4px_0px_#0A1020] transition-all"
              />
            </div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-medium shadow-[3px_3px_0px_#0A1020] focus:outline-none focus:shadow-[4px_4px_0px_#0A1020] transition-all cursor-pointer"
            >
              <option value="all">All Delhi NCR Areas</option>
              {getAllAreas().map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ─── DIRECTORY GRID ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-white border-2 border-slate-900 rounded-2xl animate-pulse shadow-[4px_4px_0px_#0A1020]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredTechnicians().map((t) => (
              <div
                key={t.name}
                className="bg-white border-2 border-slate-900 rounded-2xl shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[7px_7px_0px_#0A1020] transition-all duration-150 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Profile photo - fixed height, always full-width */}
                  <div className="w-full h-60 sm:h-64 overflow-hidden relative border-b-2 border-slate-900">
                    <img
                      src={t.profileImage}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Status badge */}
                    <div className="absolute top-3 right-3 bg-white border-2 border-slate-900 text-slate-900 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-[2px_2px_0px_#0A1020]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-ping shrink-0" />
                      <span>Active</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg">{t.name}</h3>
                      <p className="text-xs text-[#0F4CFF] font-black uppercase tracking-wider">{t.designation}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <ReviewStars rating={t.rating} />
                      <span className="text-xs font-black text-slate-800">{t.rating} ({t.repairsCompleted}+ repairs)</span>
                    </div>

                    {/* Specialization */}
                    <div className="space-y-1 pt-3 border-t-2 border-slate-900">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Core Specialization</span>
                      <p className="text-xs font-bold text-slate-700">{t.specialization}</p>
                    </div>

                    {/* Certifications */}
                    {t.certifications && t.certifications.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Certifications</span>
                        <div className="flex flex-wrap gap-1.5">
                          {t.certifications.map((cert, idx) => (
                            <span key={idx} className="border-2 border-slate-900 bg-white text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-[1px_1px_0px_#0A1020]">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service areas */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Assigned Delhi NCR Hubs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.serviceAreas.map((area, idx) => (
                          <span key={idx} className="border-2 border-slate-900 bg-[#0F4CFF]/5 text-[#0F4CFF] text-[10px] font-black px-2 py-0.5 rounded-lg shadow-[1px_1px_0px_#0A1020] flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{area}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA footer */}
                <div className="p-5 border-t-2 border-slate-900 bg-[#F8FAFC]">
                  <Link
                    to={`/contact?tab=booking&tech=${encodeURIComponent(t.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#FFB800] hover:shadow-[4px_4px_0px_#FFB800] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#FFB800] transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request This Engineer</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && getFilteredTechnicians().length === 0 && (
          <div className="text-center py-12 bg-white border-2 border-slate-900 rounded-2xl max-w-md mx-auto shadow-[5px_5px_0px_#0A1020] p-8">
            <h4 className="font-black text-slate-900 text-base mb-1">No verified engineer match found</h4>
            <p className="text-xs text-slate-500 mb-6">Change your search term or select an alternative service coverage hub.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedArea('all'); }}
              className="bg-[#0F4CFF] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
