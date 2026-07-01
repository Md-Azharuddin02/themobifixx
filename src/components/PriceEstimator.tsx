/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Smartphone, Tablet, ShieldCheck, 
  CheckCircle2, ArrowRight, Clock, HelpCircle, 
  Cpu, Wrench, Settings, Activity, Sparkles 
} from 'lucide-react';

interface PricingRule {
  min: number;
  max: number;
  time: string;
}

// Logical price estimation logic based on selected combination
export function getPriceEstimate(device: string, brand: string, issue: string): PricingRule {
  const isApple = brand.toLowerCase() === 'apple';
  
  if (device === 'macbook') {
    if (issue.includes('Screen')) return { min: 9499, max: 18499, time: '3 - 5 Hours' };
    if (issue.includes('Battery')) return { min: 4499, max: 7999, time: '60 - 90 Minutes' };
    if (issue.includes('Keyboard')) return { min: 3499, max: 5999, time: '2 - 3 Hours' };
    if (issue.includes('Logic')) return { min: 6499, max: 12999, time: '1 - 2 Days' };
    if (issue.includes('Storage')) return { min: 2999, max: 6499, time: '45 - 60 Minutes' };
    return { min: 899, max: 1499, time: '30 - 45 Minutes' };
  }
  
  if (device === 'laptop') {
    if (issue.includes('Screen')) return { min: 3999, max: 7499, time: '60 - 90 Minutes' };
    if (issue.includes('Battery')) return { min: 1899, max: 3499, time: '30 - 45 Minutes' };
    if (issue.includes('Keyboard')) return { min: 1299, max: 2499, time: '45 - 60 Minutes' };
    if (issue.includes('Motherboard')) return { min: 2499, max: 5999, time: '1 - 2 Days' };
    if (issue.includes('Storage')) return { min: 1499, max: 3999, time: '30 - 45 Minutes' };
    return { min: 599, max: 999, time: '30 - 45 Minutes' };
  }
  
  if (device === 'mobile') {
    if (issue.includes('Screen')) {
      return isApple 
        ? { min: 4999, max: 11999, time: '45 - 60 Minutes' } 
        : { min: 2499, max: 5999, time: '45 - 60 Minutes' };
    }
    if (issue.includes('Battery')) {
      return isApple
        ? { min: 1999, max: 3999, time: '30 - 45 Minutes' }
        : { min: 1299, max: 2499, time: '30 - 45 Minutes' };
    }
    if (issue.includes('IC')) {
      return isApple
        ? { min: 2999, max: 6499, time: '1 - 2 Days' }
        : { min: 1899, max: 3999, time: '1 - 2 Days' };
    }
    if (issue.includes('Charging')) {
      return isApple
        ? { min: 1299, max: 2499, time: '30 - 45 Minutes' }
        : { min: 799, max: 1499, time: '30 - 45 Minutes' };
    }
    return isApple
      ? { min: 1899, max: 3999, time: '60 - 90 Minutes' }
      : { min: 999, max: 1899, time: '60 - 90 Minutes' };
  }
  
  if (device === 'tablet') {
    if (issue.includes('Screen')) {
      return isApple
        ? { min: 5499, max: 12499, time: '2 - 3 Hours' }
        : { min: 3499, max: 7999, time: '2 - 3 Hours' };
    }
    if (issue.includes('Battery')) {
      return isApple
        ? { min: 2499, max: 4499, time: '60 - 90 Minutes' }
        : { min: 1899, max: 3499, time: '60 - 90 Minutes' };
    }
    if (issue.includes('IC')) {
      return isApple
        ? { min: 3499, max: 7999, time: '1 - 2 Days' }
        : { min: 2499, max: 5499, time: '1 - 2 Days' };
    }
    return isApple
      ? { min: 1499, max: 2499, time: '45 - 60 Minutes' }
      : { min: 999, max: 1899, time: '45 - 60 Minutes' };
  }
  
  return { min: 499, max: 999, time: '30 - 45 Minutes' };
}

export default function PriceEstimator() {
  const [selectedDevice, setSelectedDevice] = useState<'laptop' | 'macbook' | 'mobile' | 'tablet'>('macbook');
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [selectedIssue, setSelectedIssue] = useState<string>('');

  // Device options definitions
  const devices = [
    { id: 'macbook', name: 'MacBook / iMac', icon: Laptop, color: 'text-slate-700 bg-slate-50 border-slate-200' },
    { id: 'laptop', name: 'Windows Laptop', icon: Laptop, color: 'text-indigo-700 bg-indigo-50/50 border-indigo-100' },
    { id: 'mobile', name: 'Smartphone', icon: Smartphone, color: 'text-emerald-700 bg-emerald-50/50 border-emerald-100' },
    { id: 'tablet', name: 'iPad & Tablet', icon: Tablet, color: 'text-amber-700 bg-amber-50/50 border-amber-100' },
  ] as const;

  // Dynamic Brands list based on selected device type
  const brandsMap: Record<'laptop' | 'macbook' | 'mobile' | 'tablet', string[]> = {
    macbook: ['Apple'],
    laptop: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Samsung'],
    mobile: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Google'],
    tablet: ['Apple', 'Samsung', 'Lenovo'],
  };

  // Dynamic Issues list based on selected device type
  const issuesMap: Record<'laptop' | 'macbook' | 'mobile' | 'tablet', string[]> = {
    macbook: [
      'Screen shattered/flickering (Retina display)',
      'Battery swelling/draining fast (90d Warranty)',
      'Keyboard or Trackpad unresponsive',
      'Logic Board chip-level micro-soldering',
      'High-speed SSD or RAM upgrade',
      'Thermal service & internal fan cleaning'
    ],
    laptop: [
      'Screen shattered/flickering (FHD/IPS Panel)',
      'Battery swelling/draining fast (OEM quality)',
      'Keyboard or Trackpad replacement',
      'Motherboard repair & micro-soldering',
      'High-speed NVMe SSD or RAM upgrade',
      'Thermal service & dust cleaning'
    ],
    mobile: [
      'Screen shattered/flickering (OLED/LCD display)',
      'Battery swelling/draining fast',
      'IC/Motherboard chip-level servicing',
      'Charging strip / port repair',
      'Rear glass frame restoration'
    ],
    tablet: [
      'Display digitizer replacement',
      'High capacity battery replacement',
      'IC board soldering & dead restore',
      'Charging port module service'
    ],
  };

  // Reset brand and issue when device changes
  useEffect(() => {
    const availableBrands = brandsMap[selectedDevice];
    setSelectedBrand(availableBrands[0] || 'Apple');
    
    const availableIssues = issuesMap[selectedDevice];
    setSelectedIssue(availableIssues[0] || '');
  }, [selectedDevice]);

  const currentBrands = brandsMap[selectedDevice];
  const currentIssues = issuesMap[selectedDevice];

  // Calculate pricing estimates
  const priceResult = getPriceEstimate(selectedDevice, selectedBrand, selectedIssue);

  return (
    <section className="py-20 bg-slate-50/30 border-y border-slate-200/40 relative overflow-hidden" id="price-estimator">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-12 right-0 w-80 h-80 bg-orange-50/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Smart Tariff Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
            Instant Device Repair Price Estimator
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Get an instant, transparent diagnostic cost breakdown range in real time before scheduling your doorstep pickup in Delhi NCR.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-[32px] p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Inputs Section (Left Side - 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Device Type */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0F4CFF] bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-full inline-block">
                01. Select Device Type
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {devices.map((device) => {
                  const Icon = device.icon;
                  const isSelected = selectedDevice === device.id;
                  return (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDevice(device.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-[#0F4CFF] bg-blue-50/30 ring-2 ring-blue-100/50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${
                        isSelected ? 'bg-[#0F4CFF] text-white border-[#0F4CFF]' : 'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black tracking-tight text-slate-800 leading-none">
                        {device.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Brand Selection */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0F4CFF] bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-full inline-block">
                02. Choose Brand
              </span>
              <div className="flex flex-wrap gap-2.5">
                {currentBrands.map((brand) => {
                  const isSelected = selectedBrand === brand;
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0A1020] border-[#0A1020] text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Issue Selection */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0F4CFF] bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-full inline-block">
                03. Choose Issue / Symptom
              </span>
              <div className="relative">
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0F4CFF] appearance-none"
                >
                  {currentIssues.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold text-xs">
                  ▼
                </div>
              </div>
            </div>

          </div>

          {/* Results Block (Right Side - 5 Cols) */}
          <div className="lg:col-span-5 bg-[#0A1020] text-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-900/10">
            {/* Ambient visual blob */}
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-[#0F4CFF]/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Diagnostic Invoice Range
                </span>
                <span className="text-[9px] font-bold text-[#00C48C] bg-[#00C48C]/10 border border-[#00C48C]/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Live Estimate
                </span>
              </div>

              {/* Price Display */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Estimated Cost</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ₹{priceResult.min.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">-</span>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ₹{priceResult.max.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] text-[#00C48C] font-semibold block pt-1">
                  * All prices are flat-rate. No hidden visiting charges.
                </span>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-3.5 border-t border-white/5 pt-6 text-xs font-semibold">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Diagnosis Fee</span>
                  <span className="text-[#00C48C] font-bold">FREE (With Repair)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Turnaround Time</span>
                  <span className="text-slate-200 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{priceResult.time}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Doorstep Transit</span>
                  <span className="text-[#00C48C] font-bold">FREE (Delhi NCR)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Warranty Card</span>
                  <span className="text-slate-200 font-bold">90 Days Secured</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA with dynamic prefilled variables */}
            <div className="pt-8 border-t border-white/5 relative z-10 space-y-4">
              <Link
                to={`/contact?tab=booking&device=${selectedDevice}&brand=${encodeURIComponent(selectedBrand)}&issue=${encodeURIComponent(selectedIssue)}`}
                className="relative overflow-hidden w-full bg-[#FF7A00] hover:bg-[#E06B00] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10 hover:scale-[1.02] active:scale-95 transition-all duration-200 group"
              >
                {/* Live shining sweep animation strictly inside button */}
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    duration: 1.4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                />
                <span className="relative z-10">Book Doorstep Pickup</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00C48C]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Secure Chip-Level Lab Servicing
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
