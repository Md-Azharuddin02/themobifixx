import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Battery, Maximize, CircleDashed, Mic, Speaker, Wifi, Smartphone, ShieldCheck, Clock, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';

// Mock Repair Data
const REPAIR_SERVICES = [
  { id: 'screen-replacement', name: 'Screen Replacement', icon: Maximize },
  { id: 'back-glass', name: 'Back Glass Replacement', icon: CircleDashed },
  { id: 'battery', name: 'Battery Replacement', icon: Battery },
  { id: 'charging-port', name: 'Charging Port Replacement', icon: Smartphone },
  { id: 'camera-repair', name: 'Camera Repair', icon: CircleDashed },
  { id: 'speaker', name: 'Speaker Repair', icon: Speaker },
  { id: 'mic', name: 'Mic Repair', icon: Mic },
  { id: 'wifi', name: 'Wifi/Bluetooth Issue', icon: Wifi },
];

export default function DeviceRepairPage() {
  const { brandId, modelId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([]);
  // Formatting names from URL slugs
  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';
  const formattedModel = modelId ? modelId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Device';

  const getWhatsAppLink = () => {
    const selectedIssuesNames = selectedRepairs.map(id => REPAIR_SERVICES.find(s => s.id === id)?.name).join(', ');
    const text = `Hi, I want to repair my ${formattedBrand} ${formattedModel}. Issues: ${selectedIssuesNames || 'None selected'}`;
    return `https://wa.me/919310112994?text=${encodeURIComponent(text)}`;
  };

  // Toggle selection
  const toggleRepair = (id: string) => {
    setSelectedRepairs(prev =>
      prev.includes(id)
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#050B18] pt-20 pb-12 text-slate-200">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-slate-450 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        {category ? (
          <>
            <Link to={`/category/${category}`} className="hover:text-blue-400 transition-colors capitalize">{category}</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to={`/brand/${brandId}?category=${category}`} className="hover:text-blue-400 transition-colors">{formattedBrand}</Link>
          </>
        ) : (
          <>
            <Link to="/#brands" className="hover:text-blue-400 transition-colors">Brands</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to={`/brand/${brandId}`} className="hover:text-blue-400 transition-colors">{formattedBrand}</Link>
          </>
        )}
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-slate-300">{formattedModel}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Header Title */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">{formattedModel} Repair Services</h1>

              {/* Repair Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REPAIR_SERVICES.map(service => {
                  const Icon = service.icon;
                  const isSelected = selectedRepairs.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleRepair(service.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-lg ${isSelected
                        ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500/50'
                        : 'bg-[#0A1329] border-slate-800 hover:border-blue-500/40'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${isSelected ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900/60 text-slate-400 border-slate-800'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {service.name}
                        </div>
                        <div className="text-slate-400 text-xs mt-1">
                          Doorstep Diagnostics & Setup
                        </div>
                      </div>
                      <div className="shrink-0 pl-2">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border border-blue-500">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-slate-700 rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Device Info & SEO Text block */}
            <div className="bg-[#0A1329] rounded-3xl p-6 shadow-lg border border-slate-800 mt-12 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-32 shrink-0 bg-slate-900 rounded-2xl p-2 border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=200"
                  alt={formattedModel}
                  className="w-full h-full object-cover rounded-xl opacity-80"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">{formattedModel} Repair Services</h2>
                <p className="text-sm text-slate-450 leading-relaxed">
                  Get your {formattedModel} fixed at your home or office. We use premium quality parts and our expert technicians can complete most repairs in under 60 minutes. Every repair is backed by our comprehensive service warranty for your peace of mind.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Premium Parts</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Data Privacy</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us & Repair Process */}
            <div className="bg-[#0A1329] rounded-3xl p-6 shadow-lg border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-4">Why Choose TheMobifixx for {formattedModel} Repair?</h2>
              <ul className="space-y-3 text-sm text-slate-450">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Doorstep Service:</strong> We come to your location (home/office/cafe) and repair your device right in front of you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Expert Technicians:</strong> Our professionals are highly trained and verified to handle complex motherboard repairs and screen replacements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Warranty Protection:</strong> Rest easy with our service warranty on all parts replaced by TheMobifixx.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar - Sticky Booking Panel */}
          <div className="lg:col-span-4">
            <div className="bg-[#0A1329] rounded-3xl p-6 shadow-2xl border border-slate-800 sticky top-28 flex flex-col h-[calc(100vh-160px)] min-h-[400px] max-h-[600px]">

              <div className="pb-4 border-b border-slate-800 shrink-0">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                  Your List of Issues
                </h3>
                <p className="text-xs text-slate-450 mt-1 capitalize">{formattedBrand} • {formattedModel}</p>
              </div>

              {/* Selected Items Scroll Area */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-2 custom-scrollbar">
                {selectedRepairs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                    <Smartphone className="w-8 h-8 opacity-20" />
                    <p className="text-sm">No repairs selected yet.</p>
                    <p className="text-xs max-w-[200px]">Choose one or more issues from the left to request diagnostics.</p>
                  </div>
                ) : (
                  selectedRepairs.map(id => {
                    const service = REPAIR_SERVICES.find(s => s.id === id);
                    if (!service) return null;
                    return (
                      <div key={id} className="flex justify-between items-start gap-4 text-sm bg-[#0E1B38] p-3 rounded-xl border border-slate-800">
                        <span className="font-semibold text-slate-200 leading-snug">{service.name}</span>
                        <span className="font-bold text-emerald-400 shrink-0">Selected</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer / Checkout */}
              <div className="pt-4 border-t border-slate-800 shrink-0 space-y-4">
                {/* <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400">Doorstep Diagnostics</span>
                  <span className="text-2xl font-bold text-emerald-450">
                    FREE
                  </span>
                </div> */}

                {/* <div className="text-[10px] text-slate-500 font-semibold space-y-1.5 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span>Inspection Fee</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Transit & Pickup</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                </div> */}

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (selectedRepairs.length === 0) {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg text-center ${selectedRepairs.length > 0
                    ? 'bg-[#25D366] hover:bg-[#20ba56] text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-505 cursor-not-allowed shadow-none pointer-events-none'
                    }`}
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Send WhatsApp Inquiry</span>
                </a>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Data Secure
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-blue-450" />
                    60 Min Repair
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Modal removed */}
    </div>
  );
}
