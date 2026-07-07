import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, CheckCircle2 } from 'lucide-react';

// Mock Data for Apple Devices to match the user's sample requirement.
// In a real app, this would come from an API based on the brandId.
const GENERIC_IMAGE = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200';

const DEVICE_MODELS: Record<string, { id: string; name: string; image: string }[]> = {
  apple: [
    { id: 'iphone-air', name: 'iPhone Air', image: '../assets/iphoneair.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', image: '../assets/iphone17promax.avif?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', image: '../assets/iphone17pro.avif?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-17', name: 'iPhone 17', image: '../assets/iphone17.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', image: '../assets/iphone16promax.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', image: '../assets/iphone16pro.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', image: '../assets/iphone16plus.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-16', name: 'iPhone 16', image: '../assets/iphone16.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-16-e', name: 'iPhone 16 e', image: '../assets/iphone16e.jpg?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-15-pro-max', name: 'iphone 15 Pro Max', image: '../assets/iphone15promax.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-15-pro', name: 'iphone 15 Pro', image: '../assets/iphone15pro.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-15-plus', name: 'iphone 15 Plus', image: '../assets/iphone15plus.jpg?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-15', name: 'iPhone 15', image: '../assets/iphone15.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', image: '../assets/iphone14promax.jpg?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-14-pro', name: 'iPhone 14 Pro', image: '../assets/iphone14pro.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-14-plus', name: 'iPhone 14 Plus', image: '../assets/iphone14plus.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-14', name: 'iPhone 14', image: '../assets/iphone14.webp?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', image: '../assets/iphone13promax.jpg?auto=format&fit=crop&q=80&w=200' },
    { id: 'iphone-13-pro', name: 'iPhone 13 Pro', image: '../assets/iphone13pro.webp?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-13-mini', name: 'iPhone 13 mini', image: '../assets/iphone13mini.webp?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-13', name: 'iPhone 13', image: '../assets/iphone13.jpg?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-12-pro-max',  name: 'iphone 12 Pro Max', image: '../assets/iphone12promax.jpeg?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-12-pro',  name: 'iPhone 12 Pro', image: '../assets/iphone12pro.jpg?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-12-mini', name: 'iphone 12 Mini', image: '../assets/iphone12mini.webp?auto=format&fit=crop&q=80&w=200'},
    { id: 'iphone-12', name: 'iphone 12', image: '../assets/iphone12.jpg?auto=format&fit=crop&q=80&w=200'}
  ],
  samsung: [
    { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', image: GENERIC_IMAGE },
    { id: 'galaxy-s24-plus', name: 'Galaxy S24+', image: GENERIC_IMAGE },
    { id: 'galaxy-z-fold-5', name: 'Galaxy Z Fold 5', image: GENERIC_IMAGE },
    { id: 'galaxy-z-flip-5', name: 'Galaxy Z Flip 5', image: GENERIC_IMAGE },
    { id: 'galaxy-a55', name: 'Galaxy A55', image: GENERIC_IMAGE },
  ],
  oneplus: [
    { id: 'oneplus-12', name: 'OnePlus 12', image: GENERIC_IMAGE },
    { id: 'oneplus-11', name: 'OnePlus 11', image: GENERIC_IMAGE },
    { id: 'oneplus-open', name: 'OnePlus Open', image: GENERIC_IMAGE },
    { id: 'oneplus-nord-ce-4', name: 'OnePlus Nord CE 4', image: GENERIC_IMAGE },
  ],
  // Add other brands here...
};

export default function BrandPage() {
  const { brandId } = useParams();

  // Format brand name for display
  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';

  // Use mock apple data or generate generic mock data for other brands
  const devices = DEVICE_MODELS[brandId?.toLowerCase() || ''] || Array.from({ length: 12 }).map((_, i) => ({
    id: `${brandId}-model-${i + 1}`,
    name: `${formattedBrand} Model ${i + 1}`,
    image: GENERIC_IMAGE
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/#brands" className="hover:text-brand-orange transition-colors">Brands We Repair</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900">{formattedBrand}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Device Grid */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">

            {/* Header Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {formattedBrand} Screen Repair at Home in 60 Minutes
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                  Book your repair online, a Mobifixx expert comes to your home/office & repairs your {formattedBrand} device instantly! 100% data security guaranteed.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Genuine Parts
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    90 Day Warranty
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Doorstep Service
                  </div>
                </div>
              </div>
            </div>

            {/* Devices Grid */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 px-1">Select your {formattedBrand} Model</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {devices.map((device) => (
                  <Link
                    to={`/repair/${brandId}/${device.id}`}
                    key={device.id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-4 hover:border-orange-200 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="w-20 h-24 sm:w-24 sm:h-28 relative overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-2 group-hover:-translate-y-1 transition-transform">
                      {/* Using generic placeholders if images fail to load in this mock setup */}
                      <Phone className="w-8 h-8 text-gray-300 absolute" />
                      <img
                        src={device.image}
                        alt={device.name}
                        className="object-cover w-full h-full rounded z-10"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center group-hover:text-brand-orange transition-colors">
                      {device.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Common Issues (Static Content for Design matching) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Common {formattedBrand} Issues We Fix</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {['Screen Replacement', 'Battery Replacement', 'Charging Port', 'Camera Repair', 'Back Glass', 'Water Damage', 'Speaker Issue', 'Mic Issue'].map((issue, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 text-center">
                    {issue}
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-sm text-gray-600 leading-relaxed space-y-4">
              <h2 className="text-lg font-bold text-gray-900">{formattedBrand} Repair Services at Home by TheMobifixx</h2>
              <p>Is your {formattedBrand} screen cracked or battery draining fast? We provide expert, doorstep repair services to get your device back to peak performance.</p>
              <p>Our certified technicians use only premium quality replacement parts and come equipped with all the necessary tools to fix your device right in front of you. Most repairs take less than 60 minutes.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 font-medium text-gray-700">
                <li>Transparent Pricing - No hidden charges</li>
                <li>Data Security Guaranteed - Your phone never leaves your sight</li>
                <li>Expert Technicians - Trained and verified</li>
                <li>Premium Parts - Highest quality standards</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar / Promotions */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 space-y-6">

              {/* Search / Filter Widget */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Find Your Model</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${formattedBrand} models...`}
                    className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Why TheMobifixx?</h4>
                  <ul className="space-y-3 text-xs text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Premium Quality Parts</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 6 Months Warranty</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Certified Experts</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Secure Data Privacy</li>
                  </ul>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                <div className="text-brand-orange font-bold mb-2">₹200 OFF on First Repair!</div>
                <p className="text-xs text-gray-600 mb-4">Use code <span className="font-bold bg-white px-2 py-1 rounded text-gray-900 border border-gray-200">NEW200</span> at checkout.</p>
                <Link to="/contact" className="block w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors shadow-sm cursor-pointer">
                  Contact Us Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
