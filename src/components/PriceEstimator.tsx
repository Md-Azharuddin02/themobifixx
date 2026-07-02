import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Laptop, Smartphone, Tablet, ShieldCheck, 
  ArrowRight, Clock, Sparkles, CheckSquare, Square
} from 'lucide-react';

interface PricingRule {
  min: number;
  max: number;
  time: string;
  timeInMin: number;
}

interface IssueOption {
  id: string;
  name: string;
  getPrice: (brand: string) => PricingRule;
}

// Structured price lookup map for all device types and brands
const issuesMap: Record<'laptop' | 'macbook' | 'mobile' | 'tablet', IssueOption[]> = {
  macbook: [
    {
      id: 'mac_screen',
      name: 'Screen shattered/flickering (Retina display)',
      getPrice: () => ({ min: 9499, max: 18499, time: '3 - 5 Hours', timeInMin: 300 })
    },
    {
      id: 'mac_battery',
      name: 'Battery replacement (90d Warranty)',
      getPrice: () => ({ min: 4499, max: 7999, time: '60 - 90 Minutes', timeInMin: 90 })
    },
    {
      id: 'mac_keyboard',
      name: 'Keyboard or Trackpad unresponsive',
      getPrice: () => ({ min: 3499, max: 5999, time: '2 - 3 Hours', timeInMin: 180 })
    },
    {
      id: 'mac_logic',
      name: 'Logic Board chip-level micro-soldering',
      getPrice: () => ({ min: 6499, max: 12999, time: '1 - 2 Days', timeInMin: 2880 })
    },
    {
      id: 'mac_storage',
      name: 'High-speed SSD or RAM upgrade',
      getPrice: () => ({ min: 2999, max: 6499, time: '45 - 60 Minutes', timeInMin: 60 })
    },
    {
      id: 'mac_thermal',
      name: 'Thermal service & fan cleaning',
      getPrice: () => ({ min: 899, max: 1499, time: '30 - 45 Minutes', timeInMin: 45 })
    }
  ],
  laptop: [
    {
      id: 'lap_screen',
      name: 'Screen shattered/flickering (FHD Panel)',
      getPrice: () => ({ min: 3999, max: 7499, time: '60 - 90 Minutes', timeInMin: 90 })
    },
    {
      id: 'lap_battery',
      name: 'Battery replacement (OEM quality)',
      getPrice: () => ({ min: 1899, max: 3499, time: '30 - 45 Minutes', timeInMin: 45 })
    },
    {
      id: 'lap_keyboard',
      name: 'Keyboard or Trackpad replacement',
      getPrice: () => ({ min: 1299, max: 2499, time: '45 - 60 Minutes', timeInMin: 60 })
    },
    {
      id: 'lap_motherboard',
      name: 'Motherboard repair & micro-soldering',
      getPrice: () => ({ min: 2499, max: 5999, time: '1 - 2 Days', timeInMin: 2880 })
    },
    {
      id: 'lap_storage',
      name: 'High-speed NVMe SSD or RAM upgrade',
      getPrice: () => ({ min: 1499, max: 3999, time: '30 - 45 Minutes', timeInMin: 45 })
    },
    {
      id: 'lap_thermal',
      name: 'Thermal service & dust cleaning',
      getPrice: () => ({ min: 599, max: 999, time: '30 - 45 Minutes', timeInMin: 45 })
    }
  ],
  mobile: [
    {
      id: 'mob_screen',
      name: 'Screen replacement (OLED/LCD display)',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 4999, max: 11999, time: '45 - 60 Minutes', timeInMin: 60 }
          : { min: 2499, max: 5999, time: '45 - 60 Minutes', timeInMin: 60 };
      }
    },
    {
      id: 'mob_battery',
      name: 'High-capacity battery replacement',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 1999, max: 3999, time: '30 - 45 Minutes', timeInMin: 45 }
          : { min: 1299, max: 2499, time: '30 - 45 Minutes', timeInMin: 45 };
      }
    },
    {
      id: 'mob_ic',
      name: 'IC/Motherboard chip-level servicing',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 2999, max: 6499, time: '1 - 2 Days', timeInMin: 2880 }
          : { min: 1899, max: 3999, time: '1 - 2 Days', timeInMin: 2880 };
      }
    },
    {
      id: 'mob_charging',
      name: 'Charging strip / port repair',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 1299, max: 2499, time: '30 - 45 Minutes', timeInMin: 45 }
          : { min: 799, max: 1499, time: '30 - 45 Minutes', timeInMin: 45 };
      }
    },
    {
      id: 'mob_backglass',
      name: 'Rear glass frame restoration',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 1899, max: 3999, time: '60 - 90 Minutes', timeInMin: 90 }
          : { min: 999, max: 1899, time: '60 - 90 Minutes', timeInMin: 90 };
      }
    }
  ],
  tablet: [
    {
      id: 'tab_screen',
      name: 'Display glass/digitizer replacement',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 5499, max: 12499, time: '2 - 3 Hours', timeInMin: 180 }
          : { min: 3499, max: 7999, time: '2 - 3 Hours', timeInMin: 180 };
      }
    },
    {
      id: 'tab_battery',
      name: 'High capacity battery replacement',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 2499, max: 4499, time: '60 - 90 Minutes', timeInMin: 90 }
          : { min: 1899, max: 3499, time: '60 - 90 Minutes', timeInMin: 90 };
      }
    },
    {
      id: 'tab_ic',
      name: 'IC board repair & dead restore',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 3499, max: 7999, time: '1 - 2 Days', timeInMin: 2880 }
          : { min: 2499, max: 5499, time: '1 - 2 Days', timeInMin: 2880 };
      }
    },
    {
      id: 'tab_charging',
      name: 'Charging port module service',
      getPrice: (brand) => {
        const isApple = brand.toLowerCase() === 'apple';
        return isApple
          ? { min: 1499, max: 2499, time: '45 - 60 Minutes', timeInMin: 60 }
          : { min: 999, max: 1899, time: '45 - 60 Minutes', timeInMin: 60 };
      }
    }
  ]
};

export default function PriceEstimator() {
  const [selectedDevice, setSelectedDevice] = useState<'laptop' | 'macbook' | 'mobile' | 'tablet'>('macbook');
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  // Device selections
  const devices = [
    { id: 'macbook', name: 'MacBook / iMac', icon: Laptop },
    { id: 'laptop', name: 'Windows Laptop', icon: Laptop },
    { id: 'mobile', name: 'Smartphone', icon: Smartphone },
    { id: 'tablet', name: 'iPad & Tablet', icon: Tablet },
  ] as const;

  // Brands lookup map
  const brandsMap: Record<'laptop' | 'macbook' | 'mobile' | 'tablet', string[]> = {
    macbook: ['Apple'],
    laptop: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Samsung'],
    mobile: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Realme'],
    tablet: ['Apple', 'Samsung', 'Lenovo'],
  };

  // Trigger state reset when switching devices
  useEffect(() => {
    const availableBrands = brandsMap[selectedDevice];
    setSelectedBrand(availableBrands[0] || 'Apple');
    
    // Auto-select the first issue of the selected device to prevent empty states
    const availableIssues = issuesMap[selectedDevice];
    if (availableIssues && availableIssues.length > 0) {
      setSelectedIssues([availableIssues[0].id]);
    } else {
      setSelectedIssues([]);
    }
  }, [selectedDevice]);

  const currentBrands = brandsMap[selectedDevice];
  const currentIssues = issuesMap[selectedDevice];

  // Handle toggling of issues
  const toggleIssue = (issueId: string) => {
    if (selectedIssues.includes(issueId)) {
      // Allow deselecting only if it's not the last remaining selected issue
      if (selectedIssues.length > 1) {
        setSelectedIssues(selectedIssues.filter(id => id !== issueId));
      }
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  // Compile calculations
  let subtotalMin = 0;
  let subtotalMax = 0;
  let maxTimeMin = 0;
  let estimatedTimeStr = '30 - 45 Minutes';

  selectedIssues.forEach((issueId) => {
    const issueObj = currentIssues.find(item => item.id === issueId);
    if (issueObj) {
      const priceRule = issueObj.getPrice(selectedBrand);
      subtotalMin += priceRule.min;
      subtotalMax += priceRule.max;
      if (priceRule.timeInMin > maxTimeMin) {
        maxTimeMin = priceRule.timeInMin;
        estimatedTimeStr = priceRule.time;
      }
    }
  });

  const hasMultipleIssues = selectedIssues.length > 1;
  const displayTime = hasMultipleIssues ? `${estimatedTimeStr} (Concurrent Services)` : estimatedTimeStr;

  return (
    <section className="py-24 bg-slate-50/40 border-b-2 border-slate-900 relative overflow-hidden" id="price-estimator">
      {/* Dynamic blurred backdrop blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none -translate-x-12"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none translate-x-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1020] tracking-tight">
            Configure Your Custom Repair Invoice
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Select multiple repair services and upgrades concurrently. Watch your live diagnostics breakdown adapt instantly below.
          </p>
        </div>

        {/* Dynamic Estimation Container - Retro Offset Design */}
        <div className="max-w-6xl mx-auto relative group">
          {/* Retro offset shadow outline on the bottom-left of the estimator card */}
          <div className="absolute -left-[6px] -bottom-[6px] inset-0 border-b-4 border-l-4 border-slate-900 rounded-[32px] bg-transparent pointer-events-none z-0"></div>

          <div className="relative z-10 bg-white border-4 border-slate-900 rounded-[32px] p-6 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Inputs Panel (Left Side - 7 Cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Step 1: Device */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-900 text-white flex items-center justify-center text-[10px] font-black">1</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Select Device Category</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {devices.map((dev) => {
                    const Icon = dev.icon;
                    const isSelected = selectedDevice === dev.id;
                    return (
                      <button
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev.id)}
                        className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-blue-50 text-slate-800 shadow-[1px_1px_0px_#0A1020] translate-x-[1.5px] translate-y-[1.5px]'
                            : 'border-slate-900 bg-white text-slate-800 shadow-[3px_3px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border-2 ${
                          isSelected ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]' : 'bg-slate-50 text-slate-600 border-slate-900'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black tracking-tight text-slate-800 leading-none">
                          {dev.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-900 text-white flex items-center justify-center text-[10px] font-black">2</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Choose Hardware Brand</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentBrands.map((brand) => {
                    const isSelected = selectedBrand === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-200 border-2 border-slate-900 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0D0D0D] text-white shadow-[1px_1px_0px_#0A1020] translate-x-[1.5px] translate-y-[1.5px]'
                            : 'bg-white text-slate-700 shadow-[3px_3px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px]'
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Multi-Select Issues */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-900 text-white flex items-center justify-center text-[10px] font-black">3</span>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Select Repairs Needed (Select Multiple)</h3>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    {selectedIssues.length} Selected
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentIssues.map((issue) => {
                    const isChecked = selectedIssues.includes(issue.id);
                    const priceRange = issue.getPrice(selectedBrand);
                    return (
                      <button
                        key={issue.id}
                        onClick={() => toggleIssue(issue.id)}
                        className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 border-slate-900 text-left transition-all duration-200 cursor-pointer ${
                          isChecked
                            ? 'bg-blue-50/10 shadow-[1px_1px_0px_#0A1020] translate-x-[1.5px] translate-y-[1.5px]'
                            : 'bg-white shadow-[3px_3px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#0F4CFF]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-800" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[11px] leading-snug font-bold ${
                            isChecked ? 'text-slate-900' : 'text-slate-600'
                          }`}>
                            {issue.name}
                          </div>
                          <span className="inline-block mt-2 text-[9px] font-bold tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                            Est: ₹{priceRange.min} - ₹{priceRange.max}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Live Invoice Results Panel (Right Side - 5 Cols) - Retro Offset */}
            <div className="relative lg:col-span-5 flex flex-col justify-between h-full">
              {/* Retro offset shadow outline for invoice card */}
              <div className="absolute -left-[4px] -bottom-[4px] inset-0 border-b-2 border-l-2 border-slate-900 rounded-[24px] bg-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 bg-[#0b1410] border-2 border-slate-900 text-white rounded-[24px] p-6 lg:p-8 flex flex-col justify-between h-full overflow-hidden shadow-xl shadow-emerald-950/20">
                {/* Ambient visual glowing light */}
                <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="space-y-6 relative z-10 text-left">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Invoice Summary
                      </span>
                      <div className="text-[9px] text-slate-400 capitalize">
                        {selectedBrand} • {selectedDevice}
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
                      Live Calculator
                    </span>
                  </div>

                  {/* Itemized Price Breakdown */}
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1" id="invoice-breakdown">
                    {selectedIssues.map((issueId) => {
                      const issueObj = currentIssues.find(item => item.id === issueId);
                      if (!issueObj) return null;
                      const price = issueObj.getPrice(selectedBrand);
                      return (
                        <div key={issueId} className="flex justify-between items-start text-[10px] pb-2.5 border-b border-white/5">
                          <span className="text-slate-300 font-medium max-w-[70%] leading-normal line-clamp-2">
                            {issueObj.name}
                          </span>
                          <span className="text-slate-100 font-bold shrink-0">
                            ₹{price.min} - ₹{price.max}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price Calculations Total display */}
                  <div className="space-y-1 pt-2">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Total Est. Cost Range</span>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        ₹{subtotalMin.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">-</span>
                      <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        ₹{subtotalMax.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[9px] text-[#a3e635] font-semibold block pt-1 leading-normal">
                      * Dynamic estimate subject to physical inspection.
                    </span>
                  </div>

                  {/* Breakdown diagnostic parameters */}
                  <div className="space-y-3.5 border-t border-white/5 pt-6 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Diag. Fee</span>
                      <span className="text-[#a3e635] font-bold">FREE (With Repair)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Est. Repair Time</span>
                      <span className="text-slate-200 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{displayTime}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Transit & Pickup</span>
                      <span className="text-[#a3e635] font-bold">FREE (Delhi NCR)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Warranty Protection</span>
                      <span className="text-slate-200 font-bold">90 Days Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Booking CTA Button */}
                <div className="pt-8 border-t border-white/10 relative z-10 space-y-4">
                  <div className="relative w-full h-[52px] group select-none cursor-pointer">
                    {/* Outer offset thin black outline boundary */}
                    <div className="absolute -left-[3px] -top-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] border-2 border-slate-900 rounded-xl pointer-events-none z-0"></div>

                    {/* Yellow backing offset block */}
                    <div className="absolute inset-0 bg-[#FFB800] rounded-xl -translate-x-1.5 translate-y-1.5 z-0 transition-transform duration-200 group-hover:-translate-x-2"></div>

                    {/* Main button link element */}
                    <Link
                      to={`/contact?tab=booking&device=${selectedDevice}&brand=${encodeURIComponent(selectedBrand)}&issues=${encodeURIComponent(
                        selectedIssues.map(id => currentIssues.find(item => item.id === id)?.name || '').join(', ')
                      )}`}
                      className="absolute inset-0 z-10 bg-[#0D0D0D] border-2 border-[#0D0D0D] hover:bg-black text-white font-black text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-150 shadow-sm active:translate-y-[1px] active:translate-x-[1px]"
                    >
                      <span className="relative pb-0.5">
                        Confirm & Book Pickup
                        <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-[#FFB800]"></span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#FFB800]" />
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      ISO 9001 Lab Diagnostic Standards
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
