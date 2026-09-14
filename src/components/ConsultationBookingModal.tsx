import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, MapPin, Wrench, X, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
];

const SERVICE_OPTIONS = [
  'Mobile Repair',
  'Laptop / Desktop Repair',
  'MacBook Repair',
  'Tablet / iPad Repair',
  'Doorstep Repair Service',
  'General Consultation / Inquiry',
];

const WA_NUMBER = '919310112994';

export default function ConsultationBookingModal({ isOpen, onClose }: ConsultationBookingModalProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Step management: 1 = Date, 2 = Time, 3 = Details, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('Mobile Repair');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

  const handlePrevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(year, month - 1, 1);
    if (prevMonthDate.getFullYear() > today.getFullYear() || 
       (prevMonthDate.getFullYear() === today.getFullYear() && prevMonthDate.getMonth() >= today.getMonth())) {
      setCurrentDate(prevMonthDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1: Date | null, d2: Date) => {
    if (!d1) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const handleDateSelect = (day: number) => {
    if (isPastDate(day)) return;
    const newSelected = new Date(year, month, day);
    setSelectedDate(newSelected);
  };

  const formatDateDisplay = (d: Date | null) => {
    if (!d) return 'Select a date';
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const generateWhatsAppUrl = () => {
    const formattedDate = selectedDate ? formatDateDisplay(selectedDate) : 'Not selected';
    const message = `*FREE CONSULTATION BOOKING* 🛠️
-----------------------------------
📅 *Date:* ${formattedDate}
⏰ *Time:* ${selectedTime || 'Not selected'}
👤 *Name:* ${name.trim()}
📱 *Mobile:* ${mobile.trim()}
🏠 *Address:* ${address.trim()}
🔧 *Service:* ${service}
${notes.trim() ? `📝 *Notes:* ${notes.trim()}` : ''}

Please confirm my appointment! Thank you.`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !address.trim()) {
      setFormError('Please fill in all required fields (Name, Mobile, Address).');
      return;
    }
    setFormError('');
    setStep(4);
    window.open(generateWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedTime('');
    setName('');
    setMobile('');
    setAddress('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-[#0a1329] dark:via-[#050b18] dark:to-[#0a1329] text-slate-900 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Grid Background Effect matching the uploaded design */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:24px_24px]" />

          <div className="relative z-10 p-3.5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
              
              {/* LEFT SIDE PANEL - "Booking Details" (Matching screenshot layout & glassmorphic styling, responsive on mobile) */}
              <div className="lg:col-span-5 bg-white/70 dark:bg-[#0f1d3e]/70 backdrop-blur-xl border border-white/60 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <h3 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-6">
                    Booking Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:space-y-5">
                    {/* Date Item */}
                    <div className="flex items-center lg:items-start gap-3 sm:gap-4 p-2 sm:p-0 rounded-xl bg-slate-50/50 dark:bg-transparent lg:bg-transparent">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
                        <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                          DATE
                        </span>
                        <p className={`text-xs sm:text-sm font-bold truncate ${selectedDate ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-400'}`}>
                          {selectedDate ? formatDateDisplay(selectedDate) : 'Select a date'}
                        </p>
                      </div>
                    </div>

                    {/* Time Item */}
                    <div className="flex items-center lg:items-start gap-3 sm:gap-4 p-2 sm:p-0 rounded-xl bg-slate-50/50 dark:bg-transparent lg:bg-transparent">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                          TIME
                        </span>
                        <p className={`text-xs sm:text-sm font-bold truncate ${selectedTime ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`}>
                          {selectedTime || 'Select a time'}
                        </p>
                      </div>
                    </div>

                    {/* Details Item */}
                    <div className="flex items-center lg:items-start gap-3 sm:gap-4 p-2 sm:p-0 rounded-xl bg-slate-50/50 dark:bg-transparent lg:bg-transparent">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                          DETAILS
                        </span>
                        {name ? (
                          <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                            <p className="font-bold truncate">{name}</p>
                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{mobile}</p>
                            <span className="inline-block mt-0.5 text-[10px] sm:text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded truncate max-w-full">
                              {service}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-400 truncate">
                            Pending details
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-slate-200/60 dark:border-slate-800/80">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                      Step {step} of 4
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400">
                      {step === 1 && 'Select Date'}
                      {step === 2 && 'Select Time Slot'}
                      {step === 3 && 'Your Information'}
                      {step === 4 && 'Confirmation'}
                    </span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT MAIN PANEL - Interactive Steps */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0a1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                
                {/* STEP 1: DATE PICKER (Matching exact design screenshot) */}
                {step === 1 && (
                  <div>
                    {/* Header Controls */}
                    <div className="flex items-center justify-between mb-4 sm:mb-8">
                      <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Select a Date
                      </h2>
                      <div className="flex items-center gap-1.5 sm:gap-3">
                        <span className="text-[11px] sm:text-xs font-extrabold tracking-wider text-slate-700 dark:text-slate-300 uppercase mr-1">
                          {monthNames[month]} {year}
                        </span>
                        <button
                          onClick={handlePrevMonth}
                          className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={handleNextMonth}
                          className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day Names Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2 sm:mb-3">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                        <span key={d} className="text-[9px] sm:text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-400 py-1">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-6 sm:mb-8">
                      {/* Empty cells for padding */}
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-8 sm:h-10 lg:h-12" />
                      ))}

                      {/* Days */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const thisDate = new Date(year, month, dayNum);
                        const selected = isSameDay(selectedDate, thisDate);
                        const past = isPastDate(dayNum);

                        return (
                          <button
                            key={`day-${dayNum}`}
                            onClick={() => handleDateSelect(dayNum)}
                            disabled={past}
                            className={`h-8 sm:h-10 lg:h-12 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center cursor-pointer ${
                              selected
                                ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-lg scale-105'
                                : past
                                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end gap-3 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => selectedDate && setStep(2)}
                        disabled={!selectedDate}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        Continue to Time <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: TIME SLOT SELECTION */}
                {step === 2 && (
                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Select Time Slot
                      </h2>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {selectedDate ? formatDateDisplay(selectedDate) : ''}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
                      Choose an available time slot for your free consultation:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-md scale-105'
                                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setStep(1)}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold text-xs sm:text-sm px-3 py-2 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        onClick={() => selectedTime && setStep(3)}
                        disabled={!selectedTime}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                      >
                        Continue to Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CUSTOMER DETAILS FORM */}
                {step === 3 && (
                  <form onSubmit={handleSubmitToWhatsApp}>
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Your Information
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Enter your details to confirm your consultation slot.
                      </p>
                    </div>

                    {formError && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
                        {formError}
                      </div>
                    )}

                    <div className="space-y-3 sm:space-y-4 mb-6">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                            Mobile / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                            Service Needed
                          </label>
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100"
                          >
                            {SERVICE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                          Address / Location *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your street address, area or landmark"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                          Additional Notes / Issue Description (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tell us a little bit about the device issue or consultation requirement..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-slate-100 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold text-xs sm:text-sm px-3 py-2 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" /> Book via WhatsApp
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 4: SUCCESS CONFIRMATION */}
                {step === 4 && (
                  <div className="text-center py-4 sm:py-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                      Booking Submitted!
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-5 sm:mb-6">
                      Your consultation details have been formatted and sent directly to our shop owner via WhatsApp.
                    </p>

                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left mb-6 sm:mb-8 text-xs space-y-1.5 sm:space-y-2">
                      <p><strong className="text-slate-700 dark:text-slate-300">Appointment Date:</strong> {selectedDate ? formatDateDisplay(selectedDate) : ''}</p>
                      <p><strong className="text-slate-700 dark:text-slate-300">Time Slot:</strong> {selectedTime}</p>
                      <p><strong className="text-slate-700 dark:text-slate-300">Customer:</strong> {name} ({mobile})</p>
                      <p><strong className="text-slate-700 dark:text-slate-300">Service:</strong> {service}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                      <a
                        href={generateWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" /> Re-open WhatsApp
                      </a>
                      <button
                        onClick={resetAndClose}
                        className="w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
