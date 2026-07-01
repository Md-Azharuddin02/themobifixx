/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Award, ShieldCheck, UserCheck, Loader2, Calendar } from 'lucide-react';
import { Technician } from '../types';
import ReviewStars from '../components/ReviewStars';

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

  // Compute all unique service areas for filters
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
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-slate-50 py-16" id="tech-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#0F4CFF]/5 border border-[#0F4CFF]/10 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Expert Technical Crew</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Verified Chip-Level Master Engineers
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            LapyZone features certified engineers equipped with advanced diagnostic tools. Review specialized experience, ratings, and live coverage coordinates.
          </p>

          {/* Search and Filters grid */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search engineer name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0F4CFF]/5 focus:border-[#0F4CFF] bg-white text-sm shadow-sm"
              />
            </div>

            <div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0F4CFF]/5 focus:border-[#0F4CFF] bg-white text-sm shadow-sm cursor-pointer"
              >
                <option value="all">All Delhi NCR Areas</option>
                {getAllAreas().map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-white border rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredTechnicians().map((t) => (
              <div
                key={t.name}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Avatar and status banner */}
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={t.profileImage}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur text-white font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-ping"></div>
                      <span>Active</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{t.name}</h3>
                      <p className="text-xs text-[#0F4CFF] font-black uppercase tracking-wider">{t.designation}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <ReviewStars rating={t.rating} />
                      <span className="text-xs font-black text-slate-800">{t.rating} ({t.repairsCompleted}+ repairs)</span>
                    </div>

                    {/* Certifications and specialties */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Core Specialization</span>
                      <p className="text-xs font-bold text-slate-700">{t.specialization}</p>
                    </div>

                    {t.certifications && t.certifications.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Certifications</span>
                        <div className="flex flex-wrap gap-1">
                          {t.certifications.map((cert, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
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
                          <span key={idx} className="bg-[#0F4CFF]/5 text-[#0F4CFF] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 shrink-0 text-[#0F4CFF]" />
                            <span>{area}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                  <Link
                    to={`/contact?tab=booking&tech=${encodeURIComponent(t.name)}`}
                    className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-[#0F4CFF] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-200"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request This Engineer</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && getFilteredTechnicians().length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto">
            <h4 className="font-bold text-slate-900 text-base mb-1">No verified engineer match found</h4>
            <p className="text-xs text-slate-500 mb-6">Change your search term or select an alternative service coverage hub.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedArea('all'); }}
              className="bg-[#0F4CFF] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
