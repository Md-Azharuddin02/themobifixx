import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, AlertTriangle, Battery, Maximize, CircleDashed, Mic, Speaker, Wifi, Smartphone, ArrowRight, ShieldCheck, Clock, X, Loader2 } from 'lucide-react';
import { getAuthToken } from '../utils/auth';

// Mock Repair Data matching the second sample image style
const REPAIR_SERVICES = [
  { id: 'screen-replacement', name: 'Screen Replacement', price: 14999, icon: Maximize },
  { id: 'back-glass', name: 'Back Glass Replacement', price: 4999, icon: CircleDashed },
  { id: 'battery', name: 'Battery Replacement', price: 3499, icon: Battery },
  { id: 'charging-port', name: 'Charging Port Replacement', price: 2999, icon: Smartphone },
  { id: 'camera-repair', name: 'Camera Repair', price: 4499, icon: CircleDashed }, // Using generic icons for mockup
  { id: 'speaker', name: 'Speaker Repair', price: 1999, icon: Speaker },
  { id: 'mic', name: 'Mic Repair', price: 1999, icon: Mic },
  { id: 'wifi', name: 'Wifi/Bluetooth Issue', price: 3999, icon: Wifi },
];

export default function DeviceRepairPage() {
  const { brandId, modelId } = useParams();
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdId, setCreatedId] = useState('');

  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    city: 'Delhi',
    address: ''
  });

  // Formatting names from URL slugs
  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';
  const formattedModel = modelId ? modelId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Device';

  // Toggle selection
  const toggleRepair = (id: string) => {
    setSelectedRepairs(prev =>
      prev.includes(id)
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  // Calculate totals
  const subtotal = selectedRepairs.reduce((total, id) => {
    const service = REPAIR_SERVICES.find(s => s.id === id);
    return total + (service?.price || 0);
  }, 0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const token = getAuthToken();
      const selectedIssuesNames = selectedRepairs.map(id => REPAIR_SERVICES.find(s => s.id === id)?.name).join(', ');

      const payload = {
        customerName: formData.name,
        phone: formData.phone,
        email: '', // Assuming email is not in this form
        deviceType: 'mobile', // Or derive from brand/model
        brand: formattedBrand,
        model: formattedModel,
        issueDescription: `Selected Issues: ${selectedIssuesNames}. Estimated Total: ₹${subtotal}`,
        pickupRequired: true,
        pickupAddress: `${formData.address}, ${formData.city}`,
        preferredDate: formData.date,
      };

      const response = await fetch('/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Booking failed. Please try again.');
      }

      setCreatedId(resData.data.id);
      setSubmitStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-gray-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link to="/#brands" className="hover:text-brand-orange transition-colors">Brands</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link to={`/brand/${brandId}`} className="hover:text-brand-orange transition-colors">{formattedBrand}</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-gray-900">{formattedModel}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Header Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{formattedModel} Repair Services</h1>

              {/* Repair Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REPAIR_SERVICES.map(service => {
                  const Icon = service.icon;
                  const isSelected = selectedRepairs.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleRepair(service.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm ${isSelected
                        ? 'bg-orange-50 border-orange-200 ring-1 ring-brand-orange/50'
                        : 'bg-white border-gray-100 hover:border-orange-200'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-white text-brand-orange' : 'bg-gray-50 text-gray-500'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className={`font-bold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                          {service.name}
                        </div>
                        <div className="text-brand-orange font-bold text-xs mt-1">
                          ₹{service.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="shrink-0 pl-2">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Device Info & SEO Text block */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-12 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-32 shrink-0 bg-gray-50 rounded-2xl p-2">
                {/* Generic placeholder since we don't have real images in this mock */}
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=200"
                  alt={formattedModel}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">{formattedModel} Repair Services</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Get your {formattedModel} fixed at your home or office. We use premium quality parts and our expert technicians can complete most repairs in under 60 minutes. Every repair is backed by our 90-day comprehensive warranty for your peace of mind.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Premium Parts</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Data Privacy</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us & Repair Process (Mock Content based on Sample) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Why Choose TheMobifixx for {formattedModel} Repair?</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Doorstep Service:</strong> We come to your location (home/office/cafe) and repair your device right in front of you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Expert Technicians:</strong> Our professionals are highly trained and verified to handle complex motherboard repairs and screen replacements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Warranty Protection:</strong> Rest easy with our 90-day warranty on all parts replaced by TheMobifixx.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar - Sticky Cart/Booking Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 sticky top-28 flex flex-col h-[calc(100vh-160px)] min-h-[400px] max-h-[600px]">

              <div className="pb-4 border-b border-gray-100 shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-brand-orange" />
                  Your Repair Summary
                </h3>
                <p className="text-xs text-gray-500 mt-1 capitalize">{formattedBrand} • {formattedModel}</p>
              </div>

              {/* Selected Items Scroll Area */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-2 custom-scrollbar">
                {selectedRepairs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-2">
                    <Smartphone className="w-8 h-8 opacity-20" />
                    <p className="text-sm">No repairs selected yet.</p>
                    <p className="text-xs max-w-[200px]">Choose one or more issues from the left to see your estimate.</p>
                  </div>
                ) : (
                  selectedRepairs.map(id => {
                    const service = REPAIR_SERVICES.find(s => s.id === id);
                    if (!service) return null;
                    return (
                      <div key={id} className="flex justify-between items-start gap-4 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="font-semibold text-gray-700 leading-snug">{service.name}</span>
                        <span className="font-bold text-gray-900 shrink-0">₹{service.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer / Checkout */}
              <div className="pt-4 border-t border-gray-100 shrink-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Total Est. Price</span>
                  <span className="text-2xl font-bold text-brand-orange">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-[10px] text-gray-400 font-semibold space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span>Diagnostics Fee</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Transit & Pickup</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (selectedRepairs.length > 0) {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={selectedRepairs.length === 0}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md ${selectedRepairs.length > 0
                    ? 'bg-brand-orange hover:bg-orange-600 text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  <span>Confirm & Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    Data Secure
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    60 Min Repair
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {submitStatus === 'success' ? (
              <div className="text-center p-8 flex flex-col items-center justify-center h-full overflow-y-auto">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Booking Successful!</h3>
                <p className="text-sm text-gray-500 mt-2">Your repair request has been logged.</p>
                <div className="my-6 bg-gray-50 border border-gray-100 rounded-xl p-4 text-left text-xs w-full max-w-sm">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-200">
                    <span className="font-bold text-gray-500">Tracking ID:</span>
                    <span className="font-bold text-gray-900 font-mono tracking-wider">{createdId}</span>
                  </div>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Device:</strong> {formattedBrand} {formattedModel}</p>
                    <p><strong>Issues:</strong> {selectedRepairs.map(id => REPAIR_SERVICES.find(s => s.id === id)?.name).join(', ')}</p>
                    <p><strong>Est. Total:</strong> ₹{subtotal.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 max-w-xs mx-auto">
                  Please save this tracking ID. You can also find this booking in your dashboard if you are logged in.
                </div>
                <Link
                  to={`/tracker?id=${createdId}`}
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <span>Track Live Status</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="bg-brand-orange text-white px-6 py-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-lg">Confirm Your Repair Booking</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="overflow-y-auto p-6 flex-grow custom-scrollbar">
                  <form id="booking-form" onSubmit={handleBookingSubmit} className="space-y-6">
                    {submitStatus === 'error' && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm font-medium">{errorMessage}</div>
                    )}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="font-bold text-gray-700">Total Amount</span>
                      <span className="text-xl font-bold text-blue-600">₹{subtotal.toLocaleString('en-IN')}.00</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-gray-700">Name</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Your phone number" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-bold text-gray-700">Booking Date</label>
                        <input type="date" id="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-bold text-gray-700">City</label>
                        <select id="city" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all bg-white">
                          <option value="Delhi">Delhi</option>
                          <option value="Noida">Noida</option>
                          <option value="Gurugram">Gurugram</option>
                          <option value="Faridabad">Faridabad</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-bold text-gray-700">Address</label>
                      <textarea id="address" name="address" required rows={3} value={formData.address} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none" placeholder="Enter your full doorstep address"></textarea>
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-end shrink-0 bg-gray-50">
                  <button type="submit" form="booking-form" disabled={isSubmitting} className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md flex items-center gap-2 disabled:bg-orange-300">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
