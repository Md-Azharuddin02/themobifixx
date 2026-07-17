import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Loader2, Calendar, ArrowRight, MessageSquare, Mail } from 'lucide-react';

const WA_NUMBER = '919310112994';
const SUPPORT_EMAIL = 'themobifixx@gmail.com';



function openWhatsApp(message: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}



function generateBookingRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `TMX-${ts}-${rand}`;
}








interface InquiryFormInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [submittedData, setSubmittedData] = useState<InquiryFormInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormInput>();

  const onSubmit = (data: InquiryFormInput) => {
    setIsSubmitting(true);

    const waMsg =
      `*New General Inquiry — TheMobifixx*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Email:* ${data.email || 'N/A'}\n` +
      `*Message:* ${data.message}`;

    

    setTimeout(() => {
      openWhatsApp(waMsg);
      setSubmittedData(data);
      setSubmitStatus('success');
      setIsSubmitting(false);
      reset();
    }, 600);
  };

  const waLink = (d: InquiryFormInput) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      `*New General Inquiry — TheMobifixx*\n\n` +
      `*Name:* ${d.name}\n*Phone:* ${d.phone}\n*Email:* ${d.email || 'N/A'}\n*Message:* ${d.message}`
    )}`;

  const mailtoLink = (d: InquiryFormInput) =>
    `mailto:${SUPPORT_EMAIL}?subject=General Inquiry - ${encodeURIComponent(d.name)}&body=${encodeURIComponent(
      `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || 'N/A'}\n\nMessage:\n${d.message}`
    )}`;

  return (
    <div className="bg-transparent">
      <h3 className="text-xl font-bold text-white mb-2">Send General Inquiry</h3>
      <p className="text-sm text-slate-400 mb-6 font-medium">
        Have a question about our repairs or refurbish warranty? Reach out and we will respond in 15 minutes.
      </p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && submittedData ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald-950/60 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-900/30 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Inquiry Sent!</h4>
            <p className="text-sm text-slate-400 max-w-sm">
              WhatsApp has opened with your details pre-filled. Our team will respond within 15 minutes.
            </p>

            <div className="mt-6 mb-2 p-5 bg-[#0E1B38] border border-slate-800 rounded-xl space-y-4 max-w-sm w-full text-left shadow-lg">
              <p className="text-xs font-bold text-blue-400">Send via another channel</p>
              <div className="flex flex-col gap-3">
                <a
                  href={waLink(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white text-sm font-bold py-3 px-4 rounded-full shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
                <a
                  href={mailtoLink(submittedData)}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 px-4 rounded-full shadow-md transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => { setSubmittedData(null); setSubmitStatus('idle'); }}
              className="mt-4 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-350 mb-1.5">Full Name *</label>
              <input
                type="text"
                placeholder="E.g., Rahul Sharma"
                {...register('name', { required: 'Please enter your full name' })}
                className={`w-full text-sm border border-slate-800 rounded-lg px-4 py-3.5 bg-[#0E1B38] text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                  errors.name ? 'border-rose-800 focus:border-rose-600 focus:ring-rose-600' : ''
                }`}
              />
              {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="E.g., 9876543210"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit Indian phone number',
                    },
                  })}
                  className={`w-full text-sm border border-slate-800 rounded-lg px-4 py-3.5 bg-[#0E1B38] text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                    errors.phone ? 'border-rose-800 focus:border-rose-600 focus:ring-rose-600' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="E.g., name@example.com"
                  {...register('email', {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className="w-full text-sm border border-slate-800 rounded-lg px-4 py-3.5 bg-[#0E1B38] text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500"
                />
                {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-350 mb-1.5">Inquiry Details *</label>
              <textarea
                rows={4}
                placeholder="What device or service are you inquiring about?"
                {...register('message', { required: 'Please enter details of your inquiry' })}
                className={`w-full text-sm border border-slate-800 rounded-lg px-4 py-3.5 bg-[#0E1B38] text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-slate-500 ${
                  errors.message ? 'border-rose-800 focus:border-rose-600 focus:ring-rose-600' : ''
                }`}
              />
              {errors.message && <span className="text-xs text-rose-500 mt-1 block">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-blue-500 transition-all shadow-lg mt-6 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending via WhatsApp...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
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
  deviceType: 'laptop' | 'macbook' | 'desktop' | 'mobile' | 'tablet' | 'other';
  brand: string;
  model: string;
  issueDescription: string;
  pickupRequired: boolean;
  pickupAddress: string;
  preferredDate: string;
}

interface RepairBookingFormProps {
  initialDeviceType?: 'laptop' | 'macbook' | 'desktop' | 'mobile' | 'tablet' | 'other';
}

export function RepairBookingForm({ initialDeviceType = 'laptop' }: RepairBookingFormProps) {
  const [searchParams] = useSearchParams();
  const urlDevice = searchParams.get('device') as BookingFormInput['deviceType'] | null;
  const urlBrand = searchParams.get('brand') || '';
  const urlIssue = searchParams.get('issue') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [bookingRef, setBookingRef] = useState('');
  const [submittedData, setSubmittedData] = useState<BookingFormInput | null>(null);

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

  const onSubmit = (data: BookingFormInput) => {
    setIsSubmitting(true);
    const ref = generateBookingRef();

    const waMsg =
      `*New Repair Booking — TheMobifixx*\n\n` +
      `*Reference:* ${ref}\n` +
      `*Customer:* ${data.customerName}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Email:* ${data.email || 'N/A'}\n` +
      `*Device:* ${data.deviceType} (${data.brand} ${data.model})\n` +
      `*Issue:* ${data.issueDescription}\n` +
      `*Pickup Required:* ${data.pickupRequired ? 'Yes' : 'No'}\n` +
      `*Pickup Address:* ${data.pickupAddress || 'N/A'}\n` +
      `*Preferred Date:* ${data.preferredDate}`;

    setTimeout(() => {
      openWhatsApp(waMsg);
      setBookingRef(ref);
      setSubmittedData(data);
      setSubmitStatus('success');
      setIsSubmitting(false);
      reset();
    }, 600);
  };

  const waLink = (d: BookingFormInput, ref: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      `*New Repair Booking — TheMobifixx*\n\n` +
      `*Reference:* ${ref}\n*Customer:* ${d.customerName}\n*Phone:* ${d.phone}\n` +
      `*Device:* ${d.deviceType} (${d.brand} ${d.model})\n*Issue:* ${d.issueDescription}\n` +
      `*Pickup:* ${d.pickupRequired ? d.pickupAddress || 'Yes' : 'No'}\n*Date:* ${d.preferredDate}`
    )}`;

  return (
    <div className="bg-transparent relative">
      <h3 className="text-xl font-bold text-white mb-1">Book Premium Repair Service</h3>
      <p className="text-sm text-slate-400 mb-6 font-medium">
        Free Doorstep Pickup &amp; Return transit in Delhi, Noida, and Gurugram.
      </p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && submittedData ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-emerald-950/60 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-900/30 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Booking Request Sent!</h4>
            <p className="text-sm text-slate-400 max-w-sm font-medium mb-1">
              WhatsApp has opened with your booking details. Our team will confirm your pickup slot within 15 minutes.
            </p>

            {bookingRef && (
              <div className="my-5 bg-[#0E1B38] border border-slate-800 rounded-xl px-5 py-4 flex flex-col items-center shadow-lg">
                <span className="text-xs text-slate-450 mb-1">Your Reference Number</span>
                <span className="text-lg font-bold text-white font-mono tracking-wider mb-1">{bookingRef}</span>
                <span className="text-xs text-slate-500">Share this with our team via WhatsApp for quick tracking</span>
              </div>
            )}

            <div className="mt-3 mb-2 p-5 bg-[#0E1B38] border border-slate-800 rounded-xl space-y-4 max-w-sm w-full text-left shadow-lg">
              <p className="text-xs font-bold text-blue-400">Didn't open? Send directly:</p>
              <div className="flex flex-col gap-3">
                <a
                  href={waLink(submittedData, bookingRef)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white text-sm font-bold py-3 px-4 rounded-full shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I'd like to follow up on my booking reference: ${bookingRef}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold py-3 px-4 rounded-full shadow-md transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Follow Up on Booking</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-xs mt-4">
              A certified technician will call you within 15 minutes to confirm the exact address and scheduling time.
            </p>
            <button
              onClick={() => { setSubmittedData(null); setSubmitStatus('idle'); }}
              className="mt-6 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors underline"
            >
              Book Another Repair
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('customerName', { required: 'Please enter your name' })}
                  className={`w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                    errors.customerName ? 'border-rose-800' : ''
                  }`}
                />
                {errors.customerName && <span className="text-xs text-rose-500 mt-1 block">{errors.customerName.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  className={`w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                    errors.phone ? 'border-rose-800' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Device Type *</label>
                <select
                  {...register('deviceType', { required: 'Required' })}
                  className="w-full text-sm border border-slate-800 bg-[#0E1B38] text-slate-300 rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option value="laptop">Laptop</option>
                  <option value="macbook">MacBook</option>
                  <option value="desktop">Desktop / iMac</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="other">Other Gadget</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Brand *</label>
                <input
                  type="text"
                  placeholder="E.g., Apple, Samsung"
                  {...register('brand', { required: 'Please enter brand name' })}
                  className={`w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                    errors.brand ? 'border-rose-800' : ''
                  }`}
                />
                {errors.brand && <span className="text-xs text-rose-500 mt-1 block">{errors.brand.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Model *</label>
                <input
                  type="text"
                  placeholder="E.g., iPhone 15 Pro"
                  {...register('model', { required: 'Please enter model name' })}
                  className={`w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 ${
                    errors.model ? 'border-rose-800' : ''
                  }`}
                />
                {errors.model && <span className="text-xs text-rose-500 mt-1 block">{errors.model.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('preferredDate', { required: 'Please select a preferred date' })}
                  className="w-full text-sm border border-slate-800 bg-[#0E1B38] text-slate-300 rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-1.5">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className="w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-350 mb-1.5">Describe Issue(s) *</label>
              <textarea
                rows={3}
                placeholder="E.g., Screen replacement, battery draining fast..."
                {...register('issueDescription', { required: 'Please briefly describe the issues' })}
                className={`w-full text-sm border border-slate-800 bg-[#0E1B38] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-slate-500 ${
                  errors.issueDescription ? 'border-rose-800' : ''
                }`}
              />
              {errors.issueDescription && <span className="text-xs text-rose-500 mt-1 block">{errors.issueDescription.message}</span>}
            </div>

            {}
            <div className="bg-[#0E1B38] border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="pickupRequired"
                  {...register('pickupRequired')}
                  className="mt-1 h-4 w-4 text-blue-500 focus:ring-blue-500 border-slate-800 rounded bg-slate-900 cursor-pointer"
                />
                <div>
                  <label htmlFor="pickupRequired" className="text-sm font-bold text-slate-200 cursor-pointer block select-none">
                    Request Free Doorstep Pickup &amp; Delivery
                  </label>
                  <span className="text-xs text-slate-450 block">
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
                  className="overflow-hidden pt-3 border-t border-slate-800"
                >
                  <label className="block text-sm font-medium text-slate-350 mb-1.5">
                    Doorstep Pickup Address *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., Flat 402, Building 3, Sector 62, Noida"
                    {...register('pickupAddress', {
                      required: pickupRequired ? 'Please enter your complete doorstep pickup address' : false,
                    })}
                    className={`w-full text-sm border border-slate-800 rounded-lg px-4 py-3.5 bg-slate-900/60 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-slate-500 ${
                      errors.pickupAddress ? 'border-rose-800' : ''
                    }`}
                  />
                  {errors.pickupAddress && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.pickupAddress.message}</span>
                  )}
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-blue-500 transition-all shadow-lg mt-6 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending via WhatsApp...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Booking via WhatsApp</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
