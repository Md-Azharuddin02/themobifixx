import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Cpu, CheckCircle2, Clock, AlertCircle,
  Calendar, Smartphone, Laptop, Tablet, HelpCircle,
  PhoneCall, ShieldAlert, FileText, MessageSquare
} from 'lucide-react';
import { RepairRequest } from '../types';

export default function RepairTracker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repairIdInput, setRepairIdInput] = useState('');
  const [repairRequest, setRepairRequest] = useState<RepairRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPolling, setIsPolling] = useState(false);

  const idParam = searchParams.get('id') || '';

  const fetchRepairStatus = async (trackingId: string, isSilentUpdate = false) => {
    if (!trackingId.trim()) return;
    if (!isSilentUpdate) {
      setLoading(true); setError(''); setRepairRequest(null);
    } else {
      setIsPolling(true);
    }
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
      setIsPolling(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idParam) {
      fetchRepairStatus(idParam);
    }
    // Set up polling to refresh data every 15 seconds if an ID is present
    const interval = setInterval(() => {
      const currentId = searchParams.get('id');
      if (currentId) {
        fetchRepairStatus(currentId, true); // Perform a silent update
      }
    }, 15000); // Poll every 15 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ id: repairIdInput.trim().toUpperCase() });
  };

  const loadDemoId = (demoId: string) => {
    setRepairIdInput(demoId);
    setSearchParams({ id: demoId });
  };

  const getDeviceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'macbook': return <Laptop className="w-5 h-5 text-gray-500" />;
      case 'laptop': return <Laptop className="w-5 h-5 text-gray-500" />;
      case 'mobile': return <Smartphone className="w-5 h-5 text-gray-500" />;
      case 'tablet': return <Tablet className="w-5 h-5 text-gray-500" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusDetail = (status: string) => {
    switch (status) {
      case 'pending': return { title: 'Request Pending Verification', desc: 'We have received your repair request. Our service coordinators are currently reviewing your issues.', colorClass: 'border-amber-200 bg-amber-50', textClass: 'text-amber-700', stepIndex: 0 };
      case 'accepted': return { title: 'Booking Approved & Engineer Assigned', desc: 'Your repair request has been approved. A certified senior technician has been assigned.', colorClass: 'border-blue-200 bg-blue-50', textClass: 'text-blue-700', stepIndex: 1 };
      case 'in_repair': return { title: 'Repair Underway in Laboratory', desc: 'Your device is actively being serviced in our laboratory.', colorClass: 'border-purple-200 bg-purple-50', textClass: 'text-purple-700', stepIndex: 2 };
      case 'completed': return { title: 'Service Completed & QC Passed', desc: 'Congratulations! Your device is fully repaired and has successfully passed our checklist.', colorClass: 'border-green-200 bg-green-50', textClass: 'text-green-700', stepIndex: 3 };
      case 'cancelled': return { title: 'Service Request Cancelled', desc: 'This service request was cancelled. If you believe this is an error, please reach out.', colorClass: 'border-rose-200 bg-rose-50', textClass: 'text-rose-700', stepIndex: -1 };
      default: return { title: 'Unknown Status', desc: 'Tracking status details could not be parsed.', colorClass: 'border-gray-200 bg-gray-50', textClass: 'text-gray-600', stepIndex: 0 };
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
    <div className="pt-24 md:pt-32 pb-0 bg-gray-50 min-h-screen font-sans text-gray-800">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 border-b border-gray-100 bg-gray-50" id="tracker-header">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm">
            <Clock className="w-4 h-4" />
            <span>Real-time Transit Sync</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Repair Status Tracker
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Track your MacBook, laptop, or mobile repair request progress live from filing to laboratory restoration and secure doorstep delivery.
          </p>
        </div>
      </section>

      {/* ─── TRACKER FORM & RESULTS ──────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-16 space-y-8">

        {/* Input card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="space-y-3">
              <label htmlFor="trackingId" className="text-xs font-bold uppercase text-gray-500 tracking-wider block">
                Enter your Repair Booking ID
              </label>
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute inset-y-0 left-5 my-auto w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text" id="trackingId"
                    value={repairIdInput}
                    onChange={(e) => setRepairIdInput(e.target.value)}
                    placeholder="e.g., LAPY-89241"
                    className="w-full border border-gray-200 rounded-full pl-14 pr-5 py-4 text-sm font-bold text-gray-800 placeholder-gray-400 uppercase focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="bg-brand-orange disabled:bg-orange-300 text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-orange-600 shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
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

        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-sm font-medium flex items-start gap-4 text-rose-700 shadow-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <div>
                <p className="font-bold">{error}</p>
                <span className="text-xs block mt-1">Note: Tracking IDs are created automatically when you book a repair.</span>
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
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-8">Service Stage Timeline</h3>
                  <div className="relative">
                    {/* Background track */}
                    <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 rounded-full hidden sm:block -z-10" />
                    {/* Active track */}
                    <div
                      className="absolute top-6 left-6 h-1 bg-brand-orange rounded-full hidden sm:block -z-10 transition-all duration-500"
                      style={{ width: `${(activeStep / (steps.length - 1)) * 96}%` }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
                      {steps.map((step, idx) => {
                        const isDone = idx <= activeStep;
                        const isCurrent = idx === activeStep;
                        return (
                          <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 ${isDone ? 'bg-brand-orange text-white shadow-md' : 'bg-white text-gray-400 border-2 border-gray-100'} ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}>
                              {isDone ? <CheckCircle2 className="w-6 h-6" /> : <span>0{idx + 1}</span>}
                            </div>
                            <div>
                              <span className={`text-sm font-bold block ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                              <span className="text-xs text-gray-500 block mt-1 sm:max-w-[140px] sm:mx-auto">{step.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-rose-200 rounded-3xl p-8 flex items-start gap-5 shadow-sm">
                  <ShieldAlert className="w-12 h-12 text-rose-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-rose-800 text-xl">Booking Cancelled</h3>
                    <p className="text-sm text-rose-600 mt-2 leading-relaxed">This service tracking file has been cancelled and closed. No diagnostics or technical actions are actively in queue.</p>
                  </div>
                </div>
              )}

              {/* Status detail header */}
              <div className={`border rounded-3xl p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm ${currentStatusDetail.colorClass}`}>
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full bg-current ${isPolling ? 'animate-pulse' : ''} ${currentStatusDetail.textClass}`} />
                    <h2 className={`text-xl font-bold tracking-tight ${currentStatusDetail.textClass}`}>{currentStatusDetail.title}</h2>
                  </div>
                  <p className={`text-sm leading-relaxed ${currentStatusDetail.textClass} opacity-90`}>{currentStatusDetail.desc}</p>
                </div>
                <div className="bg-white/80 border border-current/20 px-5 py-4 rounded-2xl shrink-0">
                  <span className="text-xs font-bold uppercase block tracking-widest leading-none mb-1 opacity-70">Booking ID</span>
                  <span className="font-bold text-lg tracking-wide block uppercase">{repairRequest.id}</span>
                </div>
              </div>

              {/* Device & Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Booking file details */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm md:col-span-7 space-y-6">
                  <h3 className="text-sm font-bold uppercase text-gray-900 tracking-wider border-b border-gray-100 pb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-orange" />
                    <span>Booking Diagnostic File</span>
                  </h3>
                  <div className="space-y-4 text-sm font-medium">
                    {[
                      { label: 'Owner Name', value: repairRequest.customerName },
                      { label: 'Device Type', value: <span className="flex items-center gap-2 uppercase font-bold">{getDeviceIcon(repairRequest.deviceType)}<span>{repairRequest.deviceType}</span></span> },
                      { label: 'Brand / Model', value: <span className="font-bold">{repairRequest.brand} {repairRequest.model}</span> },
                      { label: 'Pickup Required?', value: repairRequest.pickupRequired ? 'Yes (Doorstep Pickup & Return)' : 'No (In-Lab Walk-in)' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3">
                        <span className="text-gray-500">{row.label}</span>
                        <span className="text-gray-900">{row.value}</span>
                      </div>
                    ))}
                    {repairRequest.pickupRequired && repairRequest.pickupAddress && (
                      <div className="flex flex-col gap-2 border-b border-gray-50 pb-3 text-left">
                        <span className="text-gray-500">Registered Pickup Address</span>
                        <span className="text-gray-800 font-bold bg-gray-50 p-3 rounded-xl leading-relaxed">{repairRequest.pickupAddress}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                      <span className="text-gray-500">Preferred Service Date</span>
                      <span className="text-gray-900 font-bold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(repairRequest.preferredDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-2">
                      <span className="text-gray-500 shrink-0">Issue Logged</span>
                      <span className="text-gray-700 italic text-right leading-relaxed max-w-[250px]">"{repairRequest.issueDescription}"</span>
                    </div>
                  </div>
                </div>

                {/* Analytics card */}
                <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-md md:col-span-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="space-y-6 relative z-10">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider block">Filing Analytics</span>
                    <div>
                      <span className="text-sm text-gray-400 block mb-1">Estimated Completion</span>
                      <span className="text-xl font-bold block text-white">
                        {repairRequest.status === 'completed' ? (
                          <span className="text-green-400 flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /><span>Service Completed</span></span>
                        ) : repairRequest.status === 'cancelled' ? (
                          <span className="text-rose-400">Closed File</span>
                        ) : (
                          <span>{new Date(new Date(repairRequest.createdAt).getTime() + 48 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 block mb-1.5">Our Service Centre</span>
                      <span className="text-base font-bold text-gray-100 block">Nehru Place G-12 Main service centre</span>
                      <span className="text-xs text-gray-400 block mt-1">Near Nehru place metro station</span>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="pt-8 border-t border-white/10 relative z-10 space-y-3">
                    <span className="text-xs font-bold text-gray-400 block uppercase tracking-widest mb-2">Need Live Assistance?</span>
                    <a
                      href="tel:+919818409122"
                      className="w-full bg-white text-gray-900 text-sm font-bold py-3.5 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Tech Helpline</span>
                    </a>
                    <a
                      href={`https://wa.me/919818409122?text=Hi%20TheMobifixx,%20I'm%20tracking%20my%20repair%20ID%20${repairRequest.id}%20and%20need%20an%20update.`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full bg-green-500 text-white text-sm font-bold py-3.5 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
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
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-3 text-center md:text-left">
            <h4 className="font-bold text-gray-900 text-base">Where can I find my Repair ID?</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              When you submit a doorstep repair booking or drop off your device at one of our laboratory hubs, a unique tracking file is generated in our system (formatted as <span className="font-mono text-gray-800 font-bold bg-gray-50 px-2 py-0.5 rounded">LAPY-XXXXX</span>).
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              This ID is instantly sent to your verified mobile number via SMS and email confirmation. If you lost your ID, please call our direct hotline at <a href="tel:+919818409122" className="text-brand-orange hover:underline font-bold">+91 9818409122</a>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
