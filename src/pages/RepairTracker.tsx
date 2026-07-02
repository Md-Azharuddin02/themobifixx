import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Cpu, CheckCircle2, Clock, AlertCircle,
  Calendar, Smartphone, Laptop, Tablet, HelpCircle,
  PhoneCall, ShieldAlert, FileText, MessageSquare
} from 'lucide-react';
import { RepairRequest } from '../types';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function RepairTracker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repairIdInput, setRepairIdInput] = useState('');
  const [repairRequest, setRepairRequest] = useState<RepairRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const idParam = searchParams.get('id') || '';

  const fetchRepairStatus = async (trackingId: string) => {
    if (!trackingId.trim()) return;
    setLoading(true); setError(''); setRepairRequest(null);
    try {
      const response = await fetch(`/api/repair-requests/${trackingId.trim()}`);
      if (response.ok) {
        const data = await response.json();
        setRepairRequest(data);
        setRepairIdInput(trackingId);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to retrieve repair details. Please check your tracking ID.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (idParam) fetchRepairStatus(idParam); }, [idParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repairIdInput.trim()) { setError('Please input a valid Repair ID.'); return; }
    setSearchParams({ id: repairIdInput.trim().toUpperCase() });
  };

  const loadDemoId = (demoId: string) => {
    setRepairIdInput(demoId);
    setSearchParams({ id: demoId });
  };

  const getDeviceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'macbook': return <Laptop className="w-5 h-5 text-[#0F4CFF]" />;
      case 'laptop': return <Laptop className="w-5 h-5 text-indigo-600" />;
      case 'mobile': return <Smartphone className="w-5 h-5 text-[#00C48C]" />;
      case 'tablet': return <Tablet className="w-5 h-5 text-amber-600" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusDetail = (status: string) => {
    switch (status) {
      case 'pending': return { title: 'Request Pending Verification', desc: 'We have received your repair request. Our service coordinators are currently reviewing your issues and matching your device with the best-certified chip-level technician in Delhi NCR.', colorClass: 'border-amber-400 bg-amber-50', textClass: 'text-amber-700', stepIndex: 0 };
      case 'accepted': return { title: 'Booking Approved & Engineer Assigned', desc: 'Excellent news! Your repair request has been approved. A certified senior technician has been assigned and is preparing genuine OEM components for your specific model.', colorClass: 'border-[#0F4CFF] bg-blue-50', textClass: 'text-[#0F4CFF]', stepIndex: 1 };
      case 'in_repair': return { title: 'Repair Underway in Laboratory', desc: 'Your device is actively being serviced in our laboratory. High-precision chip-level logic board micro-soldering, internal servicing, or certified spare parts replacements are in progress.', colorClass: 'border-indigo-400 bg-indigo-50', textClass: 'text-indigo-700', stepIndex: 2 };
      case 'completed': return { title: 'Service Completed & QC Passed', desc: 'Congratulations! Your device is fully repaired and has successfully passed our 15-point diagnostic and stress testing checklist. It has been sealed for doorstep return transit.', colorClass: 'border-[#00C48C] bg-emerald-50', textClass: 'text-emerald-700', stepIndex: 3 };
      case 'cancelled': return { title: 'Service Request Cancelled', desc: 'This service request was cancelled. If you believe this is an error or wish to re-open the request, please reach out immediately to our priority Delhi NCR support desk.', colorClass: 'border-rose-400 bg-rose-50', textClass: 'text-rose-700', stepIndex: -1 };
      default: return { title: 'Unknown Status', desc: 'Tracking status details could not be parsed.', colorClass: 'border-slate-300 bg-slate-50', textClass: 'text-slate-600', stepIndex: 0 };
    }
  };

  const steps = [
    { label: 'Booking Filed', desc: 'Request logged into database' },
    { label: 'Approved', desc: 'Certified technician assigned' },
    { label: 'In Laboratory', desc: 'Repair & micro-soldering' },
    { label: 'Fully Restored', desc: 'Diagnostic testing passed' },
  ];

  const currentStatusDetail = repairRequest ? getStatusDetail(repairRequest.status) : null;
  const activeStep = currentStatusDetail ? currentStatusDetail.stepIndex : 0;

  return (
    <div className="pt-20 md:pt-32 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="tracker-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020] animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-time Delhi NCR Transit Sync</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Repair Status Tracker
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Track your MacBook, laptop, or mobile repair request progress live from filing to laboratory restoration and secure doorstep delivery.
          </p>
        </div>
      </section>

      {/* ─── TRACKER FORM & RESULTS ──────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-16 space-y-8">

        {/* Input card */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#0A1020]">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="trackingId" className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                Enter your unique Repair Booking ID
              </label>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute inset-y-0 left-4 my-auto w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text" id="trackingId"
                    value={repairIdInput}
                    onChange={(e) => setRepairIdInput(e.target.value)}
                    placeholder="e.g., LAPY-89241"
                    className="w-full border-2 border-slate-900 rounded-xl pl-12 pr-4 py-3.5 text-sm font-black text-slate-800 placeholder-slate-400 bg-[#F8FAFC] uppercase shadow-[2px_2px_0px_#0A1020] focus:outline-none focus:shadow-[3px_3px_0px_#0A1020] transition-all"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="bg-[#0F4CFF] disabled:bg-blue-400 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Searching...</span></>
                  ) : (
                    <span>Track Repair Progress</span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Demo IDs */}
          <div className="mt-6 pt-6 border-t-2 border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">Don't have a Repair ID? Test with demo files:</span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'LAPY-89241', label: 'LAPY-89241', status: 'In Repair', bg: 'bg-indigo-50 text-indigo-700' },
                { id: 'LAPY-73105', label: 'LAPY-73105', status: 'Approved', bg: 'bg-blue-50 text-blue-700' },
                { id: 'LAPY-12045', label: 'LAPY-12045', status: 'Completed', bg: 'bg-emerald-50 text-emerald-700' },
              ].map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => loadDemoId(demo.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[1px_1px_0px_#0A1020] hover:shadow-[2px_2px_0px_#0A1020] hover:-translate-y-[0.5px] hover:-translate-x-[0.5px] transition-all cursor-pointer flex items-center gap-1.5 ${demo.bg}`}
                >
                  <span>{demo.label}</span>
                  <span className="opacity-50 text-[10px]">•</span>
                  <span className="text-[10px] font-bold">{demo.status}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white border-2 border-rose-500 rounded-2xl p-5 text-sm font-bold flex items-start gap-3 shadow-[3px_3px_0px_#F43F5E] text-rose-700"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <div>
                <p>{error}</p>
                <span className="text-xs text-rose-500 font-medium block mt-1">Note: Tracking IDs are created automatically when you book a repair on our doorstep booking sheet.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracking result */}
        <AnimatePresence>
          {repairRequest && currentStatusDetail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-8" id="repair-status-result"
            >
              {/* Timeline progress */}
              {repairRequest.status !== 'cancelled' ? (
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[5px_5px_0px_#0A1020]">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-8">Service Stage Timeline</h3>
                  <div className="relative">
                    {/* Background track */}
                    <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-200 -z-10 hidden sm:block" />
                    {/* Active track */}
                    <div
                      className="absolute top-5 left-4 h-0.5 bg-[#0F4CFF] -z-10 transition-all duration-500 hidden sm:block"
                      style={{ width: `${(activeStep / (steps.length - 1)) * 96}%` }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
                      {steps.map((step, idx) => {
                        const isDone = idx <= activeStep;
                        const isCurrent = idx === activeStep;
                        return (
                          <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border-2 border-slate-900 transition-all duration-300 shadow-[2px_2px_0px_#0A1020] ${isDone ? 'bg-[#FFB800] text-slate-950' : 'bg-white text-slate-400'} ${isCurrent ? 'ring-4 ring-[#FFB800]/30' : ''}`}>
                              {isDone ? <CheckCircle2 className="w-5 h-5" /> : <span>0{idx + 1}</span>}
                            </div>
                            <div>
                              <span className={`text-xs font-black block ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                              <span className="text-[10px] text-slate-500 leading-tight block mt-0.5 sm:max-w-[150px] sm:mx-auto">{step.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-rose-500 rounded-2xl p-6 md:p-8 flex items-start gap-4 shadow-[4px_4px_0px_#F43F5E]">
                  <ShieldAlert className="w-10 h-10 text-rose-500 shrink-0" />
                  <div>
                    <h3 className="font-black text-rose-800 text-lg">Booking Cancelled</h3>
                    <p className="text-sm text-rose-600 mt-1 leading-relaxed">This service tracking file has been cancelled and closed. No diagnostics or technical actions are actively in queue.</p>
                  </div>
                </div>
              )}

              {/* Status detail header */}
              <div className={`border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[5px_5px_0px_#0A1020] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${currentStatusDetail.colorClass}`}>
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-current animate-ping ${currentStatusDetail.textClass}`} />
                    <h2 className={`text-lg font-black tracking-tight ${currentStatusDetail.textClass}`}>{currentStatusDetail.title}</h2>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium ${currentStatusDetail.textClass} opacity-80`}>{currentStatusDetail.desc}</p>
                </div>
                <div className="bg-white border-2 border-slate-900 px-4 py-3 rounded-xl shadow-[2px_2px_0px_#0A1020] shrink-0">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest leading-none mb-1">Booking ID</span>
                  <span className="font-black text-sm text-slate-900 tracking-wide block uppercase">{repairRequest.id}</span>
                </div>
              </div>

              {/* Device & Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Booking file details */}
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[5px_5px_0px_#0A1020] md:col-span-7 space-y-5">
                  <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider border-b-2 border-slate-900 pb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0F4CFF]" />
                    <span>Booking Diagnostic File</span>
                  </h3>
                  <div className="space-y-3 text-xs font-bold">
                    {[
                      { label: 'Owner Name', value: repairRequest.customerName },
                      { label: 'Device Type', value: <span className="flex items-center gap-1.5 uppercase">{getDeviceIcon(repairRequest.deviceType)}<span>{repairRequest.deviceType}</span></span> },
                      { label: 'Brand / Model', value: `${repairRequest.brand} ${repairRequest.model}` },
                      { label: 'Pickup Required?', value: repairRequest.pickupRequired ? 'Yes (Doorstep Pickup & Return)' : 'No (In-Lab Walk-in)' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-400">{row.label}</span>
                        <span className="text-slate-800">{row.value}</span>
                      </div>
                    ))}
                    {repairRequest.pickupRequired && repairRequest.pickupAddress && (
                      <div className="flex flex-col gap-1 border-b border-slate-100 pb-2.5 text-left">
                        <span className="text-slate-400 text-xs">Registered Pickup Address</span>
                        <span className="text-slate-700 font-bold text-[11px] border-2 border-slate-900 bg-[#F8FAFC] p-2 rounded-xl leading-relaxed shadow-[1px_1px_0px_#0A1020]">{repairRequest.pickupAddress}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Preferred Service Date</span>
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(repairRequest.preferredDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <span className="text-slate-400 shrink-0">Issue Logged</span>
                      <span className="text-slate-600 font-medium italic text-right leading-relaxed max-w-[250px]">"{repairRequest.issueDescription}"</span>
                    </div>
                  </div>
                </div>

                {/* Analytics card */}
                <div className="bg-slate-950 text-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[5px_5px_0px_#0A1020] md:col-span-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#0F4CFF]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="space-y-5 relative z-10">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Filing Analytics</span>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Estimated Completion</span>
                      <span className="text-xl font-black block text-white">
                        {repairRequest.status === 'completed' ? (
                          <span className="text-[#00C48C] flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5" /><span>Service Completed</span></span>
                        ) : repairRequest.status === 'cancelled' ? (
                          <span className="text-rose-400">Closed File</span>
                        ) : (
                          <span>{new Date(new Date(repairRequest.createdAt).getTime() + 48 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Assigned Laboratory</span>
                      <span className="text-sm font-bold text-slate-200 block">Nehru Place G-12 Head Laboratory</span>
                      <span className="text-[10px] text-slate-500 block">Central Delhi Micro-Soldering Station</span>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="pt-6 border-t border-white/10 relative z-10 space-y-3">
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-widest mb-1">Need Live Assistance?</span>
                    <a
                      href="tel:+919999999999"
                      className="w-full bg-[#0F4CFF] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl border-2 border-[#0F4CFF] shadow-[2px_2px_0px_#FFB800] hover:shadow-[3px_3px_0px_#FFB800] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] transition-all flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Tech Helpline</span>
                    </a>
                    <a
                      href={`https://wa.me/919999999999?text=Hi%20TheMobifixx,%20I'm%20tracking%20my%20repair%20ID%20${repairRequest.id}%20and%20need%20an%20update.`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full bg-[#00C48C] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl border-2 border-[#00C48C] shadow-[2px_2px_0px_#0A1020] hover:shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Query On WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help card when idle */}
        {!repairRequest && !loading && (
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#0A1020] space-y-3">
            <h4 className="font-black text-slate-900 text-sm">Where can I find my Repair ID?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              When you submit a doorstep repair booking or drop off your device at one of our laboratory hubs, a unique tracking file is generated in our system (formatted as <span className="font-mono text-slate-800 font-black">LAPY-XXXXX</span>).
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              This ID is instantly sent to your verified mobile number via SMS and email confirmation. If you lost your ID, please call our direct hotline at <a href="tel:+919999999999" className="text-[#0F4CFF] hover:underline font-black">+91 99999 99999</a>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
