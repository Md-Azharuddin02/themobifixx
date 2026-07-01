/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface InquiryFormInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormInput>();

  const onSubmit = async (data: InquiryFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Failed to submit. Please try again.');
      }

      setSubmitStatus('success');
      reset();
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Send General Inquiry</h3>
      <p className="text-sm text-slate-500 mb-6">Have a question about our repairs or refurbish warranty? Reach out and we will respond in 15 minutes.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#00C48C] mb-4" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Inquiry Submitted!</h4>
            <p className="text-sm text-slate-600 max-w-sm">
              Thank you for contacting LapyZone. Our customer support expert will call or WhatsApp you shortly.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 text-[#0F4CFF] text-sm font-semibold hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 bg-red-50 text-red-600 p-3.5 rounded-lg text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                placeholder="E.g., Rahul Sharma"
                {...register('name', { required: 'Please enter your full name' })}
                className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]'
                }`}
              />
              {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="E.g., 9876543210"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit Indian phone number'
                    }
                  })}
                  className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]'
                  }`}
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="E.g., name@example.com"
                  {...register('email', {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full text-sm border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]"
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Inquiry Details *</label>
              <textarea
                rows={4}
                placeholder="What device or service are you inquiring about? E.g., MacBook trackpad water damage, Dell battery availability, corporate AMC..."
                {...register('message', { required: 'Please enter details of your inquiry' })}
                className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.message ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]'
                }`}
              />
              {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-[#0F4CFF] hover:bg-[#0A3DCC] disabled:bg-slate-300 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg cursor-pointer transition-all duration-200 shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

interface BookingFormInput {
  customerName: string;
  phone: string;
  email?: string;
  deviceType: 'laptop' | 'macbook' | 'mobile' | 'tablet' | 'other';
  brand: string;
  model: string;
  issueDescription: string;
  pickupRequired: boolean;
  pickupAddress: string;
  preferredDate: string;
}

interface RepairBookingFormProps {
  initialDeviceType?: 'laptop' | 'macbook' | 'mobile' | 'tablet' | 'other';
}

export function RepairBookingForm({ initialDeviceType = 'laptop' }: RepairBookingFormProps) {
  const [searchParams] = useSearchParams();
  const urlDevice = searchParams.get('device') as 'laptop' | 'macbook' | 'mobile' | 'tablet' | 'other' | null;
  const urlBrand = searchParams.get('brand') || '';
  const urlIssue = searchParams.get('issue') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdId, setCreatedId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormInput>({
    defaultValues: {
      deviceType: urlDevice || initialDeviceType,
      brand: urlBrand,
      issueDescription: urlIssue,
      pickupRequired: true,
      pickupAddress: '',
      preferredDate: new Date().toISOString().split('T')[0],
    },
  });

  const pickupRequired = watch('pickupRequired');

  useEffect(() => {
    if (urlDevice) setValue('deviceType', urlDevice);
    if (urlBrand) setValue('brand', urlBrand);
    if (urlIssue) setValue('issueDescription', urlIssue);
  }, [urlDevice, urlBrand, urlIssue, setValue]);

  const onSubmit = async (data: BookingFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setCreatedId('');
    try {
      const response = await fetch('/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Failed to submit repair booking. Please try again.');
      }

      const resData = await response.json();
      if (resData.data && resData.data.id) {
        setCreatedId(resData.data.id);
      }

      setSubmitStatus('success');
      reset();
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm relative overflow-hidden">
      {/* Visual background badge */}
      <div className="absolute top-0 right-0 bg-[#0F4CFF]/5 text-[#0F4CFF] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>90-Day Warranty</span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1">Book Premium Repair Service</h3>
      <p className="text-sm text-slate-500 mb-6">Free Doorstep Pickup & Return transit in Delhi, Noida, and Gurugram.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-[#00C48C]/10 rounded-full flex items-center justify-center mb-4 text-[#00C48C]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Repair Request Booked!</h4>
            <p className="text-sm text-slate-600 max-w-sm mb-1">
              Your pickup order has been logged in our queue.
            </p>
            {createdId && (
              <div className="my-4 bg-slate-50 border border-slate-200/60 rounded-xl px-5 py-3.5 flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Your Tracking ID</span>
                <span className="text-base font-black text-[#0A1020] tracking-wide uppercase font-mono">{createdId}</span>
                <Link
                  to={`/tracker?id=${createdId}`}
                  className="mt-2.5 inline-flex items-center gap-1 bg-[#0F4CFF] hover:bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  <span>Track Live Status</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              A certified technician will call you in 15 minutes to confirm the exact address and scheduling time.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Book Another Repair
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 bg-red-50 text-red-600 p-3.5 rounded-lg text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('customerName', { required: 'Please enter your name' })}
                  className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.customerName ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]'
                  }`}
                />
                {errors.customerName && <span className="text-xs text-red-500 mt-1 block">{errors.customerName.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10 focus:border-[#0F4CFF]'
                  }`}
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Device Type *</label>
                <select
                  {...register('deviceType', { required: 'Required' })}
                  className="w-full text-sm border border-slate-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10"
                >
                  <option value="laptop">Laptop</option>
                  <option value="macbook">MacBook</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="other">Other Gadget</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Brand *</label>
                <input
                  type="text"
                  placeholder="E.g., Dell, Apple, HP"
                  {...register('brand', { required: 'Please enter brand name' })}
                  className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.brand ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10'
                  }`}
                />
                {errors.brand && <span className="text-xs text-red-500 mt-1 block">{errors.brand.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Model *</label>
                <input
                  type="text"
                  placeholder="E.g., XPS 15, Pro M1"
                  {...register('model', { required: 'Please enter model name' })}
                  className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.model ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10'
                  }`}
                />
                {errors.model && <span className="text-xs text-red-500 mt-1 block">{errors.model.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Preferred Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('preferredDate', { required: 'Please select a preferred date' })}
                    className="w-full text-sm border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className="w-full text-sm border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Describe Issue(s) *</label>
              <textarea
                rows={3}
                placeholder="E.g., Water spill, screen replacement, overheating, SSD/RAM slow, keyboard key repeating..."
                {...register('issueDescription', { required: 'Please briefly describe the issues' })}
                className={`w-full text-sm border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.issueDescription ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10'
                }`}
              />
              {errors.issueDescription && <span className="text-xs text-red-500 mt-1 block">{errors.issueDescription.message}</span>}
            </div>

            {/* Checkbox for pickup */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="pickupRequired"
                  {...register('pickupRequired')}
                  className="mt-1 h-4 w-4 text-[#0F4CFF] focus:ring-[#0F4CFF]/20 border-slate-300 rounded cursor-pointer"
                />
                <div>
                  <label htmlFor="pickupRequired" className="text-sm font-bold text-slate-900 cursor-pointer block select-none">
                    Request Free Doorstep Pickup & Delivery
                  </label>
                  <span className="text-xs text-slate-500 block">
                    A certified transit technician will securely pick up, receipt, and return your device after repairs.
                  </span>
                </div>
              </div>

              {pickupRequired && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pt-2 border-t border-slate-200/60"
                >
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Doorstep Pickup Address *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., Flat 402, Building 3, Sector 62, Noida, Delhi NCR - 201301"
                    {...register('pickupAddress', { 
                      required: pickupRequired ? 'Please enter your complete doorstep pickup address' : false 
                    })}
                    className={`w-full text-sm border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 ${
                      errors.pickupAddress ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-[#0F4CFF]/10'
                    }`}
                  />
                  {errors.pickupAddress && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.pickupAddress.message}</span>
                  )}
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    * Transit insurance covered by LapyZone.
                  </p>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-[#FF7A00] hover:bg-[#E06B00] disabled:bg-slate-300 text-white font-black text-sm uppercase tracking-wider py-4 rounded-lg cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scheduling Service...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Pickup Schedule</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
