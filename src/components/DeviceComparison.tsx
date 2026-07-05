import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Clock, DollarSign, UserCheck } from 'lucide-react';

import iphoneBefore from '../../assets/iphone_before.png';
import iphoneAfter from '../../assets/iphone_after.png';
import laptopBefore from '../../assets/laptop_before.png';
import laptopAfter from '../../assets/laptop_after.png';
import macbookBefore from '../../assets/macbook_before.png';
import macbookAfter from '../../assets/macbook_after.png';

interface ComparisonItem {
  id: string;
  tabLabel: string;
  deviceName: string;
  issueTitle: string;
  issueDescription: string;
  resolutionDescription: string;
  beforeImg: string;
  afterImg: string;
  stats: {
    brandModel: string;
    technicianName: string;
    technicianRole: string;
    timeTaken: string;
    costSaved: string;
  };
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    id: 'macbook-logic-board',
    tabLabel: 'MacBook Logic Board',
    deviceName: 'MacBook Pro 16" M1 Pro',
    issueTitle: 'Logic Board Corrosion & Short Circuit',
    issueDescription: 'Accidental liquid spill caused severe corrosion, oxidation, and short-circuit faults across the main power rails, leading to a completely dead system.',
    resolutionDescription: 'Conducted diagnostic trace checks under binocular microscopes, purged rust corrosion using ultrasonic cleaners, and replaced damaged logic board microcontrollers and capacitors with original OEM parts.',
    beforeImg: macbookBefore,
    afterImg: macbookAfter,
    stats: {
      brandModel: 'Apple MacBook Pro 16" (2021)',
      technicianName: 'Nikhil Chandel',
      technicianRole: 'Lead Chip-Level Specialist',
      timeTaken: '2 Hours (In Nehru Place Master Lab)',
      costSaved: '₹41,500 Saved (vs full motherboard swap)'
    }
  },
  {
    id: 'iphone-screen',
    tabLabel: 'iPhone Display Repair',
    deviceName: 'iPhone 14 Pro Max',
    issueTitle: 'Shattered Display & Touch Failure',
    issueDescription: 'High-impact drop resulted in a completely shattered front glass panel, cracked AMOLED screen grid, and dead touch response in the bottom half of the phone.',
    resolutionDescription: 'Performed a high-precision same-day display replacement using a certified original Apple OEM panel, calibrated multi-touch controls, and restored official TrueTone functionality.',
    beforeImg: iphoneBefore,
    afterImg: iphoneAfter,
    stats: {
      brandModel: 'Apple iPhone 14 Pro Max',
      technicianName: 'Soiab Malik',
      technicianRole: 'Mobile Display Expert',
      timeTaken: '30 Minutes (Done at Customer Doorstep)',
      costSaved: '₹14,000 Saved (vs authorized center)'
    }
  },
  {
    id: 'laptop-thermal',
    tabLabel: 'Laptop Thermal Cleaning',
    deviceName: 'Dell Inspiron 15 Gaming',
    issueTitle: 'Dust-Clogged Cooling Fans & Dried Paste',
    issueDescription: 'Heavy accumulation of household dust inside the cooling fan fins caused severe airflow restriction, dry crusty thermal paste, and dangerous CPU thermal throttling.',
    resolutionDescription: 'Disassembled the laptop cooling assembly, deep-cleaned fan chambers, lubricated bearings, and upgraded the system with Arctic MX-4 high-efficiency thermal grease.',
    beforeImg: laptopBefore,
    afterImg: laptopAfter,
    stats: {
      brandModel: 'Dell Inspiron 15 Gaming Series',
      technicianName: 'Prince Singh',
      technicianRole: 'Hardware Engineer',
      timeTaken: '45 Minutes (Done at Customer Doorstep)',
      costSaved: 'Prevents expensive CPU/GPU heat failure'
    }
  }
];

export default function DeviceComparison() {
  const [activeTab, setActiveTab] = useState(COMPARISON_DATA[0].id);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = COMPARISON_DATA.find((item) => item.id === activeTab) || COMPARISON_DATA[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((pos) => Math.max(0, pos - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((pos) => Math.min(100, pos + 5));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Reset slider position on tab change for visual delight
  useEffect(() => {
    setSliderPosition(50);
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Dynamic Tab Selector - Retro 3D Outline Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto">
        {COMPARISON_DATA.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all duration-200 border-2 border-slate-900 cursor-pointer ${
                isActive
                  ? 'bg-[#0D0D0D] text-white shadow-[1px_1px_0px_#0A1020] translate-x-[1.5px] translate-y-[1.5px]'
                  : 'bg-white text-slate-700 shadow-[3px_3px_0px_#0A1020] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Drag Slider Container */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="relative group/slider w-full aspect-square md:aspect-video select-none">
            {/* Retro offset shadow outline on the bottom-left of the slider container */}
            <div className="absolute -left-[5px] -bottom-[5px] inset-0 border-b-3 border-l-3 border-slate-900 rounded-[24px] bg-transparent pointer-events-none z-0"></div>

            <div
              ref={containerRef}
              tabIndex={0}
              aria-label={`Interactive before and after repair slider for ${activeItem.deviceName}. Use Left and Right arrow keys to adjust visual split.`}
              onKeyDown={handleKeyDown}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-full rounded-[24px] overflow-hidden border-2 border-slate-900 z-10 cursor-ew-resize bg-slate-900"
            >
              {/* After Image */}
              <img
                src={activeItem.afterImg}
                alt="Device Condition After Repair"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Text Overlay */}
              <div 
                style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
                className="absolute bottom-4 left-4 bg-rose-600/95 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-md backdrop-blur-xs select-none pointer-events-none group-hover:scale-95 transition-all duration-300 z-20"
              >
                Before Repair
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeItem.beforeImg}
                  alt="Device Condition Before Repair"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* After Text Overlay */}
              <div 
                style={{ opacity: sliderPosition < 90 ? 1 : 0 }}
                className="absolute bottom-4 right-4 bg-emerald-600/95 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-md backdrop-blur-xs select-none pointer-events-none group-hover:scale-95 transition-all duration-300 z-20"
              >
                After Repair
              </div>

              {/* Sliding Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none transition-all duration-100"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)', opacity: (sliderPosition === 0 || sliderPosition === 100) ? 0 : 1 }}
              >
                {/* Central handle knob - Yellow Retro */}
                <div className="w-10 h-10 rounded-full bg-[#FFB800] text-slate-900 flex items-center justify-center border-2 border-slate-900 text-sm font-black transition-all group-hover:scale-110 shadow-[2px_2px_0px_#0A1020]">
                  ↔
                </div>
              </div>

              {/* Drag helper prompt overlay (Fades out when user drags) */}
              <div 
                style={{ opacity: (sliderPosition !== 50) ? 0 : 1 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-3 py-1 rounded-full border border-white/15 tracking-wider pointer-events-none transition-opacity duration-300"
              >
                Drag Center Handle Left & Right
              </div>
            </div>
          </div>

          {/* Precision View Mode Presets - Retro 3D Outline Wrapper */}
          <div className="flex items-center justify-center gap-2 mt-4 bg-white border-2 border-slate-900 p-1 rounded-2xl max-w-sm w-full mx-auto shadow-[3px_3px_0px_#0A1020]">
            <button
              onClick={() => setSliderPosition(100)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                sliderPosition === 100
                  ? 'bg-rose-600 border-2 border-slate-900 text-white shadow-[1px_1px_0px_#0A1020] translate-x-[0.5px] translate-y-[0.5px]'
                  : 'bg-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                sliderPosition === 50
                  ? 'bg-blue-600 border-2 border-slate-900 text-white shadow-[1px_1px_0px_#0A1020] translate-x-[0.5px] translate-y-[0.5px]'
                  : 'bg-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setSliderPosition(0)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                sliderPosition === 0
                  ? 'bg-emerald-600 border-2 border-slate-900 text-white shadow-[1px_1px_0px_#0A1020] translate-x-[0.5px] translate-y-[0.5px]'
                  : 'bg-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              After
            </button>
          </div>
        </div>

        {/* Right Side: Informational Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F4CFF] uppercase tracking-widest block font-mono">
              {activeItem.deviceName}
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0A1020] tracking-tight leading-tight">
              {activeItem.issueTitle}
            </h4>
          </div>

          {/* Details Tabs Card - Retro Offset */}
          <div className="relative w-full">
            {/* Retro offset shadow outline on the bottom-left */}
            <div className="absolute -left-[4px] -bottom-[4px] inset-0 border-b-2 border-l-2 border-slate-900 rounded-2xl bg-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 bg-slate-50 border-2 border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">The Diagnosed Issue</span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {activeItem.issueDescription}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-200/50">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F4CFF] block">The Action Taken</span>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {activeItem.resolutionDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Quality Stats List */}
          <div className="space-y-3.5 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border-2 border-slate-900 flex items-center justify-center text-[#0F4CFF] shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-widest leading-none mb-0.5">Device Serviced</span>
                <span className="text-slate-800 font-extrabold">{activeItem.stats.brandModel}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border-2 border-slate-900 flex items-center justify-center text-emerald-600 shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-widest leading-none mb-0.5">Turnaround Time</span>
                <span className="text-slate-800 font-extrabold">{activeItem.stats.timeTaken}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border-2 border-slate-900 flex items-center justify-center text-amber-600 shrink-0">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-widest leading-none mb-0.5">Cost Savings Estimate</span>
                <span className="text-emerald-600 font-black">{activeItem.stats.costSaved}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border-2 border-slate-900 flex items-center justify-center text-indigo-600 shrink-0">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-widest leading-none mb-0.5">Assigned Engineer</span>
                <span className="text-slate-800 font-extrabold">
                  {activeItem.stats.technicianName} <span className="text-[10px] text-slate-400 font-normal">({activeItem.stats.technicianRole})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
