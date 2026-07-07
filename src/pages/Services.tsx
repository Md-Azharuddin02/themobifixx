import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ServiceCategory } from '../types';

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
        <div className="bg-white min-h-screen font-sans text-gray-800 pb-20">

            {/* ─── HERO HEADER ─────────────────────────────────────────── */}
            <section className="bg-gray-50 py-16 sm:py-20" id="services-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                        Our Professional Catalog
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Discover our complete list of premium diagnostics, chip-level logic board repairs, and speed optimizations in Delhi NCR.
                    </p>

                    {/* Search bar */}
                    <div className="max-w-lg mx-auto relative mt-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search services... (e.g., Motherboard, Battery, Screen)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-full bg-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange shadow-sm transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* ─── CATALOG ─────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Filter buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setSelectedFilter(f.id as any)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${selectedFilter === f.id
                                    ? 'bg-brand-orange text-white shadow-sm'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                                }`}
                        >
                            {f.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}