import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Battery, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ServiceCategory } from '../types';

const REPAIR_OPTIONS = [
    { id: 1, name: 'Screen Replacement', icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
    { id: 2, name: 'Battery Replacement', icon: <Battery className="w-5 h-5 text-blue-400" /> },
    { id: 3, name: 'Back Glass Replacement', icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
    { id: 4, name: 'Charging Jack Replacement', icon: <Zap className="w-5 h-5 text-blue-400" /> },
    { id: 5, name: 'Camera Glass Repair', icon: <ShieldCheck className="w-5 h-5 text-blue-400" /> },
];

export default function ServiceDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [service, setService] = useState<ServiceCategory | null>(null);
    const [customerPhone, setCustomerPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setService({
            id: '1',
            title: 'Apple iPhone 17 Pro Max',
            slug: slug || 'apple-iphone-17-pro-max',
            description: 'Premium repair services',
            seoTitle: 'Apple iPhone 17 Pro Max Repair | TheMobifixx Nehru Place Delhi',
            seoDescription: 'Fast and reliable repair for your device.',
            icon: 'Smartphone',
            featuredImage: 'https://images.unsplash.com/photo-1603898037225-83280053a4e9?q=80&w=2000&auto=format&fit=crop',
        });
    }, [slug]);

    const handleQuickBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerPhone) return;
        setIsSubmitted(true);
        // Prefilled message to whatsapp
        const message = `Hi, I want to book a repair for ${service?.title || 'my device'}. Phone number: ${customerPhone}.`;
        window.open(`https://wa.me/919310112994?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-[#050B18] min-h-screen font-sans pb-20 text-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <div className="flex items-center text-xs text-slate-450 mb-6 overflow-x-auto whitespace-nowrap">
                    <Link to="/" className="hover:text-blue-450">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-1 shrink-0" />
                    <Link to="/services" className="hover:text-blue-450">Mobile Repair</Link>
                    <ChevronRight className="w-3 h-3 mx-1 shrink-0" />
                    <span className="text-slate-300 font-medium">{service?.title || 'Repair Services'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white">{service?.title || 'Repair Services'}</h1>

                <div className="flex flex-col lg:flex-row gap-8 relative">

                    {/* Left Column (Main Content) */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {REPAIR_OPTIONS.map((opt) => (
                                <div key={opt.id} className="bg-[#0A1329] p-4 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-slate-750 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0 border border-blue-900/30">
                                            {opt.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-slate-200">{opt.name}</h3>
                                            <p className="text-slate-400 text-xs mt-0.5">High Quality OEM Parts</p>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/contact?tab=booking&service=${encodeURIComponent(opt.name)}`}
                                        className="text-xs font-bold text-blue-400 bg-blue-600/15 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full transition-all border border-blue-900/30"
                                    >
                                        Book
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Banner */}
                        <div className="bg-[#0A1329] rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6">
                            <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                                <img src={service?.featuredImage} alt="Phone" className="w-full h-full object-cover opacity-80" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">{service?.title || 'Device'} Repair Services</h3>
                                <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                                    Get reliable and fast repair services at your doorstep. We use 100% genuine parts with a standard warranty on all repairs.
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs font-semibold text-emerald-400">
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Trusted Service</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Warranty Included</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24 space-y-6">

                            {/* Cart / Book Form */}
                            <div className="bg-[#0A1329] rounded-xl shadow-2xl border border-slate-800 overflow-hidden">
                                <div className="bg-[#0E1B38] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-white">Direct Booking</h3>
                                    <span className="text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-900/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleQuickBook} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Enter Mobile Number *</label>
                                            <input 
                                                type="tel" 
                                                placeholder="Enter 10-digit number" 
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full border border-slate-800 bg-[#0E1B38] text-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500" 
                                                required
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-full shadow-lg transition-all text-sm cursor-pointer"
                                        >
                                            Book via WhatsApp
                                        </button>
                                    </form>
                                    {isSubmitted && (
                                        <p className="text-xs text-emerald-400 mt-3 text-center">Redirecting to WhatsApp support...</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}