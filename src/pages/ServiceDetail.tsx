import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Battery, Zap, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { ServiceCategory } from '../types';

// Dummy repair options for the UI
const REPAIR_OPTIONS = [
    { id: 1, name: 'Screen Replacement', price: '₹22999', icon: <Smartphone className="w-5 h-5 text-gray-500" /> },
    { id: 2, name: 'Battery Replacement', price: '₹4999', icon: <Battery className="w-5 h-5 text-gray-500" /> },
    { id: 3, name: 'Back Glass Replacement', price: '₹4999', icon: <Smartphone className="w-5 h-5 text-gray-500" /> },
    { id: 4, name: 'Charging Jack Replacement', price: '₹4999', icon: <Zap className="w-5 h-5 text-gray-500" /> },
    { id: 5, name: 'Camera Glass Repair', price: '₹2499', icon: <ShieldCheck className="w-5 h-5 text-gray-500" /> },
];

export default function ServiceDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [service, setService] = useState<ServiceCategory | null>(null);

    // Fake fetch for demo purposes
    useEffect(() => {
        setService({
            id: '1',
            title: 'Apple iPhone 17 Pro Max',
            slug: slug || 'apple-iphone-17-pro-max',
            description: 'Premium repair services',
            seoDescription: 'Fast and reliable repair for your device.',
            featuredImage: 'https://images.unsplash.com/photo-1603898037225-83280053a4e9?q=80&w=2000&auto=format&fit=crop',
        });
    }, [slug]);

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Breadcrumbs */}
                <div className="flex items-center text-xs text-gray-500 mb-6">
                    <Link to="/" className="hover:text-brand-orange">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <Link to="/services" className="hover:text-brand-orange">Mobile Repair</Link>
                    <ChevronRight className="w-3 h-3 mx-1" />
                    <span className="text-gray-800 font-medium">{service?.title || 'Repair Services'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mb-8">{service?.title || 'Repair Services'}</h1>

                <div className="flex flex-col lg:flex-row gap-8 relative">

                    {/* Left Column (Main Content) */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {REPAIR_OPTIONS.map((opt) => (
                                <div key={opt.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                            {opt.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm">{opt.name}</h3>
                                            <p className="text-brand-orange font-bold text-sm mt-0.5">{opt.price}</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-brand-orange bg-orange-50 hover:bg-brand-orange hover:text-white px-4 py-2 rounded-full transition-colors border border-orange-100 shadow-sm">
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Banner */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6">
                            <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                {/* Placeholder for phone image */}
                                <img src={service?.featuredImage} alt="Phone" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{service?.title || 'Device'} Repair Services</h3>
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                    Get reliable and fast repair services at your doorstep. We use 100% genuine parts with a standard warranty on all repairs.
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs font-semibold text-green-600">
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
                            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold">Your Cart</h3>
                                    <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        Live
                                    </span>
                                </div>
                                <div className="p-6">
                                    {/* Empty state or form */}
                                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center mb-6">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                                            <Smartphone className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-600">Select repairs to book</p>
                                        <p className="text-xs text-gray-400 mt-1">Add items from the list on the left</p>
                                    </div>

                                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 border-t border-gray-100 pt-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mobile Number *</label>
                                            <input type="tel" placeholder="Enter 10-digit number" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange" />
                                        </div>
                                        <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-full shadow-sm transition-colors">
                                            Continue to Checkout
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}