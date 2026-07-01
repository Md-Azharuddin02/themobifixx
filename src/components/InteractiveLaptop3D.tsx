/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Smartphone, Tablet, Activity, Server, Radio, ShieldCheck, CheckCircle2, Sliders, Eye } from 'lucide-react';

interface InteractiveLaptop3DProps {
  activeSlide?: number;
}

export default function InteractiveLaptop3D({ activeSlide = 0 }: InteractiveLaptop3DProps) {
  // We have 3 slides:
  // Slide 0: Laptop Diagnostics
  // Slide 1: Chip-Level Motherboard / Logic Board Repair Lab
  // Slide 2: Mobile & Tablet Transit Calibration

  return (
    <div 
      className="relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none" 
      id="interactive-device-frame"
    >
      {/* Dynamic backdrop ambient glow that matches the active theme */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSlide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 rounded-full blur-3xl -z-10 transition-colors duration-500 ${
            activeSlide === 0 ? 'bg-blue-100/40' :
            activeSlide === 1 ? 'bg-emerald-100/35' :
            'bg-amber-100/30'
          }`}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeSlide === 0 && (
          <motion.div
            key="laptop-view"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full flex flex-col items-center justify-center [perspective:1000px]"
          >
            {/* Lid / Screen */}
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[290px] sm:w-[370px] h-[180px] sm:h-[230px] bg-[#0A1020] rounded-2xl border-[8px] sm:border-[10px] border-[#1F2637] shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-5"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glossy reflection sheen */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/15 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Bezel Camera and Speaker strip */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 rounded-full flex items-center justify-center gap-1 z-30">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="w-1 h-0.5 bg-slate-800 rounded-full"></span>
              </div>

              {/* Cyber Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_14px] opacity-15"></div>

              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-pulse"></div>
                  <span className="text-[8px] font-bold text-slate-200 tracking-wider">
                    LapyZone Lab Monitor
                  </span>
                </div>
                <div className="text-[7px] text-slate-400 tracking-widest font-bold">
                  DELHI NCR HUB
                </div>
              </div>

              {/* Middle Screen Display Info */}
              <div className="space-y-3 my-auto relative z-10 text-left">
                {/* Live Queue Items */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/5 p-1.5 rounded-md border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                      <span className="text-[8px] font-bold text-slate-300">LAPY-5821 MacBook Pro M1</span>
                    </div>
                    <span className="text-[7px] bg-[#0F4CFF]/20 text-blue-300 px-1 py-0.5 rounded font-bold">Micro-Soldering</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 p-1.5 rounded-md border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[8px] font-bold text-slate-300">LAPY-5832 Dell XPS 15</span>
                    </div>
                    <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded font-bold">Passed QC</span>
                  </div>
                </div>

                {/* Quality badges */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-1 text-[7px] text-slate-400">
                    <Cpu className="w-2.5 h-2.5 text-[#0F4CFF]" />
                    <span>OEM Certified Components</span>
                  </div>
                  <div className="flex items-center gap-1 text-[7px] text-slate-400">
                    <Zap className="w-2.5 h-2.5 text-amber-500" />
                    <span>90-Min Doorstep Transit</span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Lab info */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 relative z-10 text-[7px] text-slate-400">
                <span>Cleanroom Lab #4</span>
                <span className="text-[#00C48C] font-bold">ESD-Safe Workstation</span>
                <span>Est. 2019</span>
              </div>
            </motion.div>

            {/* Laptop Keyboard Base */}
            <div className="w-[310px] sm:w-[390px] h-[10px] bg-[#1F2637] rounded-b-xl border-t border-white/15 shadow-md flex items-center justify-center relative">
              <div className="w-[250px] sm:w-[310px] h-1.5 bg-[#0D1322] rounded-full opacity-60"></div>
            </div>
            
            {/* Base bottom lip thickness */}
            <div className="w-[320px] sm:w-[402px] h-[6px] bg-[#161C2B] rounded-b-xl -mt-0.5 relative flex justify-center shadow-lg">
              <div className="w-20 h-0.5 bg-slate-700 rounded-b-md opacity-50"></div>
            </div>
          </motion.div>
        )}

        {activeSlide === 1 && (
          <motion.div
            key="motherboard-view"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="w-[290px] sm:w-[380px] h-[220px] sm:h-[280px] bg-[#0E1624] border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between"
          >
            {/* Board Circuit Tracks & Laser lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#152033_1px,transparent_1px),linear-gradient(to_bottom,#152033_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* Visual Copper circuitry lines layout */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20,40 L 120,40 L 160,80 L 160,180" stroke="#00C48C" strokeWidth="1.5" fill="none" />
              <path d="M 280,20 L 220,80 L 220,200 L 180,240" stroke="#0F4CFF" strokeWidth="1.5" fill="none" />
              <path d="M 80,220 L 140,220 L 180,180" stroke="#FF7A00" strokeWidth="1" strokeDasharray="3,3" fill="none" />
            </svg>

            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 relative z-10">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">CHIP-LEVEL LABORATORY</span>
              </div>
              <span className="text-[7px] font-mono text-slate-500">LAB_ID: DEL_204</span>
            </div>

            {/* Motherboard Grid Layout */}
            <div className="grid grid-cols-12 gap-3 items-center relative z-10 my-auto">
              
              {/* Left Side: Dynamic Power Lines Diagnostics */}
              <div className="col-span-7 space-y-2.5">
                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-[7px] text-slate-400">
                    <span>PPBUS_G3H</span>
                    <span className="text-emerald-400 font-bold">12.58V [STABLE]</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500" 
                      initial={{ width: "0%" }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[7px] text-slate-400">
                    <span>3V3_G3H_RTC</span>
                    <span className="text-emerald-400 font-bold">3.31V [OK]</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-400" 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[7px] text-slate-400">
                    <span>CHIP_TEMP</span>
                    <span className="text-amber-500 font-bold">38.4°C [NORMAL]</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Glowing Core Chip (e.g. M1/Intel processor) */}
              <div className="col-span-5 flex flex-col items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.08 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-col items-center justify-center p-2 shadow-lg relative group cursor-pointer"
                >
                  {/* Glowing perimeter border */}
                  <div className="absolute inset-0 rounded-xl border border-emerald-500/20 group-hover:border-emerald-400/40 animate-pulse"></div>
                  
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mb-1">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[7px] font-black text-slate-300 font-mono tracking-tighter">Lapy_M1_SEC</span>
                  <span className="text-[6px] font-mono text-emerald-500">99.8% QC PASS</span>
                </motion.div>
              </div>

            </div>

            {/* Footer Metrics */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 relative z-10">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[7.5px] font-bold text-slate-300">Microscope Lens Calibrated</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[7px] font-mono text-slate-400">
                <Activity className="w-2.5 h-2.5 text-emerald-400" />
                <span>OSCILLOSCOPE AUTO_SCAN</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeSlide === 2 && (
          <motion.div
            key="devices-view"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-end justify-center space-x-4 sm:space-x-6 w-full max-w-[360px]"
          >
            {/* Tablet Mockup */}
            <div className="relative w-[150px] sm:w-[190px] h-[180px] sm:h-[220px] bg-[#090D16] border-[6px] border-slate-800 rounded-xl shadow-xl flex flex-col justify-between p-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Tablet Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 z-10">
                <span className="text-[7px] font-bold text-slate-400 uppercase">Tablet Audit</span>
                <span className="text-[6px] font-mono text-[#00C48C] font-bold">DIGITIZER TEST</span>
              </div>

              {/* Digitizer Touch Points Layout */}
              <div className="grid grid-cols-4 gap-1.5 my-auto z-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                    className={`h-4 rounded border flex items-center justify-center text-[5.5px] font-bold ${
                      i % 3 === 0 
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    {i % 3 === 0 ? 'CALIB' : 'PASS'}
                  </motion.div>
                ))}
              </div>

              {/* Tablet Footer */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800 z-10 text-[6.5px] text-slate-400">
                <span>iPad / Pro Grid</span>
                <span className="text-slate-500">V_ID: 9283</span>
              </div>
            </div>

            {/* Mobile Smartphone Mockup */}
            <div className="relative w-[90px] sm:w-[110px] h-[190px] sm:h-[240px] bg-[#0A0D14] border-[5px] border-slate-900 rounded-2xl shadow-xl flex flex-col justify-between p-2.5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

              {/* Speaker / Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
              </div>

              {/* Phone Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 mt-1 z-10">
                <span className="text-[6px] font-bold text-slate-400">Mobile Hub</span>
                <span className="text-[5.5px] bg-amber-500/20 text-amber-400 px-1 py-0.2 rounded font-black">ACTIVE</span>
              </div>

              {/* Real-time Transit Ticket display */}
              <div className="bg-slate-950/90 border border-slate-800 p-1 rounded space-y-1 my-auto z-10 text-left font-mono">
                <span className="text-[5px] text-slate-400 block uppercase font-black">DOORSTEP DISPATCH</span>
                <div className="flex items-center justify-between">
                  <span className="text-[5.5px] text-slate-300">T_ID: LAPY-98</span>
                  <span className="text-[5px] bg-[#0F4CFF] text-white px-0.5 rounded font-bold">TRACK</span>
                </div>
                
                {/* Transit tracking dots */}
                <div className="flex items-center justify-between py-1 border-t border-slate-800/80 mt-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <div className="flex-1 border-t border-dashed border-slate-800 mx-1" />
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <div className="flex-1 border-t border-dashed border-emerald-500 mx-1" />
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-amber-500" 
                  />
                </div>
                <span className="text-[4.5px] text-amber-400 block font-bold">Transit ETA: 35 Mins</span>
              </div>

              {/* Phone Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 z-10 text-[5.5px] text-slate-400">
                <span>iOS / Android</span>
                <span className="text-slate-400 font-bold">100% OK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
