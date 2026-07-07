import React, { useState } from 'react';
import { Sparkles, Cpu, Clock, DollarSign, UserCheck } from 'lucide-react';

import iphoneBefore from '../../assets/iphone_before.png';
import iphoneAfter from '../../assets/iphone_after.png';
import macbookBefore from '../../assets/macbook_before.png';
import macbookAfter from '../../assets/macbook_after.png';
import laptopBefore from '../../assets/laptop_before.png';
import laptopAfter from '../../assets/laptop_after.png';

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
  const [activeTab, setActiveTab] = useState(COMPARISON_DATA[0].id); // State for active tab remains

  const activeItem = COMPARISON_DATA.find((item) => item.id === activeTab) || COMPARISON_DATA[0];

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
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer shadow-sm ${isActive
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
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
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-square md:aspect-[4/3] select-none rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-900">
            {/* After Image (Full background) */}
            <img
              src={activeItem.afterImg}
              alt="Device condition after repair"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Before Image (Clipped to 50%) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
            >
              <img
                src={activeItem.beforeImg}
                alt="Device condition before repair"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/80 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Right Side: Informational Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              {activeItem.deviceName}
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              {activeItem.issueTitle}
            </h4>
          </div>

          {/* Details Tabs Card */}
          <div className="relative w-full">
            <div className="bg-white border border-gray-100 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">The Diagnosed Issue</span>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {activeItem.issueDescription}
                </p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block">The Action Taken</span>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {activeItem.resolutionDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Quality Stats List */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-widest leading-none mb-1">Device Serviced</span>
                <span className="text-gray-900 font-bold">{activeItem.stats.brandModel}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-widest leading-none mb-1">Turnaround Time</span>
                <span className="text-gray-900 font-bold">{activeItem.stats.timeTaken}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-widest leading-none mb-1">Cost Savings Estimate</span>
                <span className="text-green-600 font-bold">{activeItem.stats.costSaved}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-gray-400 block font-bold text-[10px] uppercase tracking-widest leading-none mb-1">Assigned Engineer</span>
                <span className="text-gray-900 font-bold">
                  {activeItem.stats.technicianName} <span className="text-[11px] text-gray-500 font-medium">({activeItem.stats.technicianRole})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
