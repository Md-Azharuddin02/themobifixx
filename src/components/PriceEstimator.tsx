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
  const [selectedDevice, setSelectedDevice] = useState<'laptop' | 'macbook' | 'mobile' | 'tablet' | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
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
    setSelectedBrand(null);
    setSelectedIssues([]);
  }, [selectedDevice]);

  // Trigger state reset when switching brands
  useEffect(() => {
    setSelectedIssues([]);
  }, [selectedBrand]);

  const currentBrands = selectedDevice ? brandsMap[selectedDevice] : [];
  const currentIssues = selectedDevice ? issuesMap[selectedDevice] : [];

  // Handle toggling of issues
  const toggleIssue = (issueId: string) => {
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter(id => id !== issueId));
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
    if (issueObj && selectedBrand) {
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
    <section className="py-24 bg-white relative overflow-hidden" id="price-estimator">
      {/* Dynamic blurred backdrop blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none -translate-x-12"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl pointer-events-none translate-x-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {"Configure Your Custom Repair Invoice".split(" ").map((word, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
                className="inline-block mr-3"
              >{word}</motion.span>
            ))}
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Select multiple repair services and upgrades concurrently. Watch your live diagnostics breakdown adapt instantly below.
          </p>
        </div>

        {/* Dynamic Estimation Container */}
        <div className="max-w-6xl mx-auto relative group">
          <div className="relative z-10 bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Inputs Panel (Left Side - 7 Cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">

              {/* Step 1: Device */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">Select Device Category</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {devices.map((dev) => {
                    const Icon = dev.icon;
                    const isSelected = selectedDevice === dev.id;
                    return (
                      <button
                        key={dev.id}
                        onClick={() => setSelectedDevice(selectedDevice === dev.id ? null : dev.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${isSelected
                            ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-sm'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange shadow-sm'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-white text-brand-orange' : 'bg-gray-50 text-gray-500 group-hover:text-brand-orange'
                          }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold tracking-tight leading-none">
                          {dev.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Brand */}
              <div className={`space-y-4 transition-all duration-250 ${!selectedDevice ? 'opacity-30 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">Choose Hardware Brand</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentBrands.map((brand) => {
                    const isSelected = selectedBrand === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer shadow-sm ${isSelected
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                          }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Multi-Select Issues */}
              <div className={`space-y-4 transition-all duration-250 ${!selectedBrand ? 'opacity-30 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">Select Repairs Needed (Select Multiple)</h3>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-full">
                    {selectedIssues.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentIssues.map((issue) => {
                    const isChecked = selectedIssues.includes(issue.id);
                    const priceRange = selectedBrand ? issue.getPrice(selectedBrand) : { min: 0, max: 0 };
                    return (
                      <button
                        key={issue.id}
                        onClick={() => toggleIssue(issue.id)}
                        className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm ${isChecked
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-white border-gray-100 hover:border-gray-300'
                          }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-brand-orange" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs leading-snug font-bold ${isChecked ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                            {issue.name}
                          </div>
                          <span className={`inline-block mt-2 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${isChecked ? 'text-brand-orange bg-white' : 'text-gray-500 bg-gray-50 border border-gray-100'}`}>
                            Est: ₹{priceRange.min} - ₹{priceRange.max}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Live Invoice Results Panel (Right Side - 5 Cols) */}
            <div className="relative lg:col-span-5 flex flex-col justify-between h-full">
              <div className="relative z-10 bg-gray-900 text-white rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between h-full overflow-hidden shadow-lg">
                {/* Ambient visual glowing light */}
                <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>

                {(!selectedDevice || !selectedBrand || selectedIssues.length === 0) ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-2 my-auto relative z-10">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-200">Invoice Awaiting Inputs</h4>
                      <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed">
                        {!selectedDevice
                          ? "Select a device category on the left to start."
                          : !selectedBrand
                            ? "Choose your hardware brand to view compatible repair modules."
                            : "Choose one or more hardware issues below to compute estimated repair time and price."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6 relative z-10 text-left">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                            Invoice Summary
                          </span>
                          <div className="text-xs text-gray-300 capitalize font-medium">
                            {selectedBrand} • {selectedDevice}
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-white bg-green-500/20 text-green-400 px-3 py-1 rounded-full uppercase tracking-widest shrink-0">
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
                            <div key={issueId} className="flex justify-between items-start text-xs pb-3 border-b border-white/5">
                              <span className="text-gray-300 font-medium max-w-[70%] leading-relaxed line-clamp-2">
                                {issueObj.name}
                              </span>
                              <span className="text-white font-bold shrink-0">
                                ₹{price.min} - ₹{price.max}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price Calculations Total display */}
                      <div className="space-y-1 pt-2">
                        <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Total Est. Cost Range</span>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            ₹{subtotalMin.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-semibold text-gray-400">-</span>
                          <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            ₹{subtotalMax.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] text-brand-orange font-semibold block pt-2 leading-normal">
                          * Dynamic estimate subject to physical inspection.
                        </span>
                      </div>

                      {/* Breakdown diagnostic parameters */}
                      <div className="space-y-3.5 border-t border-white/5 pt-6 text-xs font-semibold">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Diag. Fee</span>
                          <span className="text-green-400 font-bold">FREE (With Repair)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Est. Repair Time</span>
                          <span className="text-white font-bold flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>{displayTime}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Transit & Pickup</span>
                          <span className="text-green-400 font-bold">FREE (Delhi NCR)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Warranty Protection</span>
                          <span className="text-white font-bold">90 Days Certificate</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking CTA Button */}
                    <div className="pt-8 border-t border-white/10 relative z-10 space-y-4">
                      <div className="relative w-full group">
                        <Link
                          to={`/contact?tab=booking&device=${selectedDevice || ''}&brand=${encodeURIComponent(selectedBrand || '')}&issues=${encodeURIComponent(
                            selectedIssues.map(id => currentIssues.find(item => item.id === id)?.name || '').join(', ')
                          )}`}
                          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                          <span>
                            Confirm & Book Pickup
                          </span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </Link>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-2">
                        <ShieldCheck className="w-4 h-4 text-green-400" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          ISO 9001 Lab Diagnostic Standards
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
