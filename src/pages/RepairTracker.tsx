/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Cpu, CheckCircle2, Clock, AlertCircle, 
  Calendar, User, Smartphone, Laptop, Tablet, HelpCircle, 
  ChevronRight, Sparkles, PhoneCall, ShieldAlert, FileText, ArrowRight, MessageSquare
} from 'lucide-react';
import { RepairRequest } from '../types';

export default function RepairTracker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repairIdInput, setRepairIdInput] = useState('');
  const [repairRequest, setRepairRequest] = useState<RepairRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get ID from URL query params if present (e.g. ?id=LAPY-89241)
  const idParam = searchParams.get('id') || '';

  const fetchRepairStatus = async (trackingId: string) => {
    if (!trackingId.trim()) return;
    
    setLoading(true);
    setError('');
    setRepairRequest(null);
    
    try {
      const response = await fetch(`/api/repair-requests/${trackingId.trim()}`);
      if (response.ok) {
        const data = await response.json();
        setRepairRequest(data);
        // Sync input field
        setRepairIdInput(trackingId);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to retrieve repair details. Please check your tracking ID.');
      }
    } catch (err) {
      console.error('Error fetching repair status:', err);
      setError('A network error occurred. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idParam) {
      fetchRepairStatus(idParam);
    }
  }, [idParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repairIdInput.trim()) {
      setError('Please input a valid Repair ID.');
      return;
    }
    setSearchParams({ id: repairIdInput.trim().toUpperCase() });
  };

  const loadDemoId = (demoId: string) => {
    setRepairIdInput(demoId);
    setSearchParams({ id: demoId });
  };

  // Helper to match device icons
  const getDeviceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'macbook':
        return <Laptop className="w-5 h-5 text-blue-600" />;
      case 'laptop':
        return <Laptop className="w-5 h-5 text-indigo-600" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'tablet':
        return <Tablet className="w-5 h-5 text-amber-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  // Human-friendly description for status states
  const getStatusDetail = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          title: 'Request Pending Verification',
          desc: 'We have received your repair request. Our service coordinators are currently reviewing your issues and matching your device with the best-certified chip-level technician in Delhi NCR.',
          color: 'text-amber-600 bg-amber-50 border-amber-100',
          stepIndex: 0
        };
      case 'accepted':
        return {
          title: 'Booking Approved & Engineer Assigned',
          desc: 'Excellent news! Your repair request has been approved. A certified senior technician has been assigned and is preparing genuine OEM components for your specific model.',
          color: 'text-blue-600 bg-blue-50 border-blue-100',
          stepIndex: 1
        };
      case 'in_repair':
        return {
          title: 'Repair Underway in Laboratory',
          desc: 'Your device is actively being serviced in our laboratory. High-precision chip-level logic board micro-soldering, internal servicing, or certified spare parts replacements are in progress.',
          color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
          stepIndex: 2
        };
      case 'completed':
        return {
          title: 'Service Completed & QC Passed',
          desc: 'Congratulations! Your device is fully repaired and has successfully passed our 15-point diagnostic and stress testing checklist. It has been sealed for doorstep return transit.',
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
          stepIndex: 3
        };
      case 'cancelled':
        return {
          title: 'Service Request Cancelled',
          desc: 'This service request was cancelled. If you believe this is an error or wish to re-open the request, please reach out immediately to our priority Delhi NCR support desk.',
          color: 'text-rose-600 bg-rose-50 border-rose-100',
          stepIndex: -1
        };
      default:
        return {
          title: 'Unknown Status',
          desc: 'Tracking status details could not be parsed.',
          color: 'text-slate-600 bg-slate-50 border-slate-100',
          stepIndex: 0
        };
    }
  };

  // Tracking timeline steps definitions
  const steps = [
    { label: 'Booking Filed', desc: 'Request logged into database' },
    { label: 'Approved', desc: 'Certified technician assigned' },
    { label: 'In Laboratory', desc: 'Repair & micro-soldering' },
    { label: 'Fully Restored', desc: 'Diagnostic testing passed' }
  ];

  const currentStatusDetail = repairRequest ? getStatusDetail(repairRequest.status) : null;
  const activeStep = currentStatusDetail ? currentStatusDetail.stepIndex : 0;

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200/50 py-16" id="tracker-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-time Delhi NCR Transit Sync</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1020] tracking-tight leading-none">
            Repair Status Tracker
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Track your MacBook, laptop, or mobile repair request progress live from filing to laboratory restoration and secure doorstep delivery.
          </p>
        </div>
      </section>

      {/* Main Track Form & Results container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {/* Tracker Input Box */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="trackingId" className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                Enter your unique Repair Booking ID
              </label>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="trackingId"
                    value={repairIdInput}
                    onChange={(e) => setRepairIdInput(e.target.value)}
                    placeholder="e.g., LAPY-89241"
                    className="w-full bg-slate-50 border border-slate-200/60 rounded-full pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 uppercase transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0F4CFF] hover:bg-blue-600 disabled:bg-blue-400 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-md shadow-blue-100 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <span>Track Repair Progress</span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Demo suggestions */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">
              Don't have a Repair ID? Test with demo files:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'LAPY-89241', label: 'LAPY-89241', status: 'In Repair', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
                { id: 'LAPY-73105', label: 'LAPY-73105', status: 'Approved', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                { id: 'LAPY-12045', label: 'LAPY-12045', status: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
              ].map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => loadDemoId(demo.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border hover:border-[#0F4CFF]/30 hover:shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${demo.color}`}
                >
                  <span>{demo.label}</span>
                  <span className="opacity-50 text-[10px]">•</span>
                  <span className="text-[10px] font-medium">{demo.status}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl p-5 text-sm font-semibold flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <div>
                <p>{error}</p>
                <span className="text-xs text-rose-500 font-medium block mt-1">
                  Note: Tracking IDs are created automatically when you book a repair on our doorstep booking sheet.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main tracking output detail */}
        <AnimatePresence>
          {repairRequest && currentStatusDetail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="repair-status-result"
            >
              
              {/* Timeline Progress Bar */}
              {repairRequest.status !== 'cancelled' ? (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-8">
                    Service Stage Timeline
                  </h3>
                  
                  {/* Timeline Graphic */}
                  <div className="relative">
                    {/* Background track line */}
                    <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-100 -z-10 hidden sm:block"></div>
                    
                    {/* Active colored track line */}
                    <div 
                      className="absolute top-5 left-4 h-0.5 bg-indigo-500 -z-10 transition-all duration-500 hidden sm:block"
                      style={{ width: `${(activeStep / (steps.length - 1)) * 96}%` }}
                    ></div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
                      {steps.map((step, idx) => {
                        const isDone = idx <= activeStep;
                        const isCurrent = idx === activeStep;
                        return (
                          <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                            {/* Circle Indicator */}
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border transition-all duration-300 ${
                                isDone 
                                  ? 'bg-[#0F4CFF] text-white border-[#0F4CFF] shadow-md shadow-blue-100' 
                                  : 'bg-white text-slate-400 border-slate-200'
                              } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span>0{idx + 1}</span>
                              )}
                            </div>
                            
                            {/* Labels */}
                            <div>
                              <span className={`text-xs font-bold block ${isDone ? 'text-[#0A1020]' : 'text-slate-400'}`}>
                                {step.label}
                              </span>
                              <span className="text-[10px] text-slate-500 leading-tight block mt-0.5 sm:max-w-[150px] sm:mx-auto">
                                {step.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 md:p-8 flex items-start gap-4">
                  <ShieldAlert className="w-10 h-10 text-rose-500 shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-rose-800 text-lg">Booking Cancelled</h3>
                    <p className="text-sm text-rose-600 mt-1 leading-relaxed">
                      This service tracking file has been cancelled and closed. No diagnostics or technical actions are actively in queue.
                    </p>
                  </div>
                </div>
              )}

              {/* Status Header Box */}
              <div className={`border rounded-3xl p-6 md:p-8 ${currentStatusDetail.color} flex flex-col md:flex-row gap-6 justify-between items-start md:items-center`}>
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping"></span>
                    <h2 className="text-lg font-extrabold tracking-tight">
                      {currentStatusDetail.title}
                    </h2>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90 font-medium">
                    {currentStatusDetail.desc}
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/50 shadow-sm shrink-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-widest leading-none mb-1">
                    Booking ID
                  </span>
                  <span className="font-black text-sm text-[#0A1020] tracking-wide block uppercase">
                    {repairRequest.id}
                  </span>
                </div>
              </div>

              {/* Device and Client Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Details list */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm md:col-span-7 space-y-6">
                  <h3 className="text-sm font-black uppercase text-[#0A1020] tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Booking Diagnostic File</span>
                  </h3>
                  
                  <div className="space-y-4 text-xs font-semibold">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400">Owner Name</span>
                      <span className="text-slate-800">{repairRequest.customerName}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400">Device Type</span>
                      <span className="text-slate-800 flex items-center gap-1.5 uppercase">
                        {getDeviceIcon(repairRequest.deviceType)}
                        <span>{repairRequest.deviceType}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400">Brand / Model</span>
                      <span className="text-slate-800 font-bold">{repairRequest.brand} {repairRequest.model}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400">Pickup Location Required?</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${repairRequest.pickupRequired ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600'}`}>
                        {repairRequest.pickupRequired ? 'Yes (Doorstep Pickup & Return)' : 'No (In-Lab Walk-in)'}
                      </span>
                    </div>

                    {repairRequest.pickupRequired && repairRequest.pickupAddress && (
                      <div className="flex flex-col gap-1 border-b border-slate-50 pb-2.5 text-left">
                        <span className="text-slate-400 text-xs">Registered Pickup Address</span>
                        <span className="text-slate-700 font-bold text-[11px] bg-slate-50 border border-slate-100 p-2 rounded-lg leading-relaxed">
                          {repairRequest.pickupAddress}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400">Preferred Service Date</span>
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(repairRequest.preferredDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 pt-1">
                      <span className="text-slate-400 shrink-0">Issue Logged</span>
                      <span className="text-slate-600 font-medium italic text-right leading-relaxed max-w-[250px]">
                        "{repairRequest.issueDescription}"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estimate & Actions card */}
                <div className="bg-[#0A1020] text-white rounded-3xl p-6 md:p-8 shadow-lg md:col-span-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      Filing Analytics
                    </span>
                    
                    {/* Dynamic estimate completion date calculated based on createdAt */}
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Estimated Completion</span>
                      <span className="text-xl font-bold block text-white">
                        {repairRequest.status === 'completed' ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Service Completed</span>
                          </span>
                        ) : repairRequest.status === 'cancelled' ? (
                          <span className="text-rose-400">Closed File</span>
                        ) : (
                          <span>
                            {new Date(new Date(repairRequest.createdAt).getTime() + 48 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Assigned Laboratory</span>
                      <span className="text-sm font-semibold text-slate-200 block">
                        Nehru Place G-12 Head Laboratory
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Central Delhi Micro-Soldering Station
                      </span>
                    </div>
                  </div>

                  {/* Priority action links */}
                  <div className="pt-8 border-t border-white/5 relative z-10 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Need Live Assistance?
                    </span>
                    <a
                      href="tel:+919999999999"
                      className="w-full bg-[#0F4CFF] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Tech Helpline</span>
                    </a>
                    <motion.a
                      href={`https://wa.me/919999999999?text=Hi%20LapyZone,%20I'm%20tracking%20my%20repair%20ID%20${repairRequest.id}%20and%20need%20an%20update.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#00C48C] hover:bg-[#009E70] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md group transition-colors duration-300"
                      whileHover={{ 
                        scale: 1.02, 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Query On WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Diagnostic FAQ Card if no tracking searched yet */}
        {!repairRequest && !loading && (
          <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 md:p-8 space-y-4">
            <h4 className="font-extrabold text-[#0A1020] text-sm">Where can I find my Repair ID?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              When you submit a doorstep repair booking or drop off your device at one of our laboratory hubs, a unique tracking file is generated in our system (formatted as <span className="font-mono text-slate-800 font-bold">LAPY-XXXXX</span>).
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              This ID is instantly sent to your verified mobile number via SMS and email confirmation. If you lost your ID, please call our direct hotline at <a href="tel:+919999999999" className="text-[#0F4CFF] hover:underline font-bold">+91 99999 99999</a>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
