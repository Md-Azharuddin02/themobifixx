import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { getAuthToken } from '../utils/auth';

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
  const [submittedData, setSubmittedData] = useState<InquiryFormInput | null>(null);

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

      setSubmittedData(data);

      // Unregistered user check (no local token) -> trigger WhatsApp direct link automatically
      const token = getAuthToken();
      if (!token) {
        const textMsg = `*New General Inquiry from TheMobifixx Website*\n\n` +
          `*Name:* ${data.name}\n` +
          `*Phone:* ${data.phone}\n` +
          `*Email:* ${data.email || 'N/A'}\n` +
          `*Message:* ${data.message}`;
        const whatsAppUrl = `https://wa.me/919310112994?text=${encodeURIComponent(textMsg)}`;
        window.open(whatsAppUrl, '_blank');
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
    <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 md:p-8 shadow-[5px_5px_0px_#0A1020]">
      <h3 className="text-xl font-black text-slate-900 mb-2">Send General Inquiry</h3>
      <p className="text-sm text-slate-500 mb-6 font-medium">Have a question about our repairs or refurbish warranty? Reach out and we will respond in 15 minutes.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="w-16 h-16 bg-[#00C48C]/10 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-4 text-[#00C48C] shadow-[2px_2px_0px_#0A1020]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Inquiry Submitted!</h4>
            <p className="text-sm text-slate-600 max-w-sm font-medium">
              Thank you for contacting TheMobifixx. Our customer support expert will call or WhatsApp you shortly.
            </p>

            {!getAuthToken() && submittedData && (
              <div className="mt-4 mb-2 p-4 bg-slate-50 border-2 border-slate-900 rounded-xl space-y-3 max-w-sm w-full text-left shadow-[2px_2px_0px_#0A1020]">
                <p className="text-[10px] font-black uppercase text-[#0F4CFF] tracking-wider">Direct Support Links</p>
                <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                  To ensure fastest resolution, you can also send this inquiry directly to our support handlers via:
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/919310112994?text=${encodeURIComponent(
                      `*New General Inquiry from TheMobifixx Website*\n\n` +
                      `*Name:* ${submittedData.name}\n` +
                      `*Phone:* ${submittedData.phone}\n` +
                      `*Email:* ${submittedData.email || 'N/A'}\n` +
                      `*Message:* ${submittedData.message}`
                    )}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#00C48C] text-white text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-y-[1px] hover:shadow-[2px_2px_0px] transition-all cursor-pointer text-center"
                  >
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:themobifixx@gmail.com?subject=General Inquiry - ${encodeURIComponent(submittedData.name)}&body=${encodeURIComponent(
                      `Name: ${submittedData.name}\n` +
                      `Phone: ${submittedData.phone}\n` +
                      `Email: ${submittedData.email || 'N/A'}\n\n` +
                      `Message:\n${submittedData.message}`
                    )}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#0F4CFF] text-white text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-y-[1px] hover:shadow-[2px_2px_0px] transition-all cursor-pointer text-center"
                  >
                    <span>Send via Gmail / Email</span>
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSubmittedData(null);
                setSubmitStatus('idle');
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-slate-900 transition-colors uppercase tracking-wider border-2 border-slate-900 bg-white px-4 py-2 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[3px_3px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0A1020] cursor-pointer"
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
              <div className="flex items-center space-x-2 bg-white border-2 border-rose-500 text-rose-600 p-3.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#F43F5E]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                placeholder="E.g., Rahul Sharma"
                {...register('name', { required: 'Please enter your full name' })}
                className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                  errors.name ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                }`}
              />
              {errors.name && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Phone Number *</label>
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
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.phone ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="E.g., name@example.com"
                  {...register('email', {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium"
                />
                {errors.email && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Inquiry Details *</label>
              <textarea
                rows={4}
                placeholder="What device or service are you inquiring about? E.g., MacBook trackpad water damage, Dell battery availability, corporate AMC..."
                {...register('message', { required: 'Please enter details of your inquiry' })}
                className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium resize-none ${
                  errors.message ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                }`}
              />
              {errors.message && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4CFF] disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer"
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

  const onSubmit = async (data: BookingFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setCreatedId('');
    try {
      const token = getAuthToken();
      const response = await fetch('/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Failed to submit repair booking. Please try again.');
      }

      const resData = await response.json();
      let newBookingId = '';
      if (resData.data && resData.data.id) {
        setCreatedId(resData.data.id);
        newBookingId = resData.data.id;
      }

      setSubmittedData(data);

      // Unregistered user check -> auto redirect to WhatsApp
      if (!token) {
        const textMsg = `*New Repair Booking from TheMobifixx Website*\n\n` +
          `*Tracking ID:* ${newBookingId || 'N/A'}\n` +
          `*Customer Name:* ${data.customerName}\n` +
          `*Phone:* ${data.phone}\n` +
          `*Email:* ${data.email || 'N/A'}\n` +
          `*Device:* ${data.deviceType} (${data.brand} ${data.model})\n` +
          `*Issue:* ${data.issueDescription}\n` +
          `*Pickup Required:* ${data.pickupRequired ? 'Yes' : 'No'}\n` +
          `*Pickup Address:* ${data.pickupAddress || 'N/A'}\n` +
          `*Preferred Date:* ${data.preferredDate}`;
        const whatsAppUrl = `https://wa.me/919310112994?text=${encodeURIComponent(textMsg)}`;
        window.open(whatsAppUrl, '_blank');
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
    <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 md:p-8 shadow-[5px_5px_0px_#0A1020] relative overflow-hidden">
      {/* Visual background badge */}
      <div className="absolute top-0 right-0 bg-[#FFB800] text-slate-950 text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-bl-xl border-l-2 border-b-2 border-slate-900 flex items-center gap-1 shadow-[1.5px_1.5px_0px_#0A1020]">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>90-Day Warranty</span>
      </div>

      <h3 className="text-xl font-black text-slate-900 mb-1">Book Premium Repair Service</h3>
      <p className="text-sm text-slate-500 mb-6 font-medium">Free Doorstep Pickup & Return transit in Delhi, Noida, and Gurugram.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-[#00C48C]/10 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-4 text-[#00C48C] shadow-[2px_2px_0px_#0A1020]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Repair Request Booked!</h4>
            <p className="text-sm text-slate-600 max-w-sm font-medium mb-1">
              Your pickup order has been logged in our queue.
            </p>
            {createdId && (
              <div className="my-4 bg-[#F8FAFC] border-2 border-slate-900 rounded-xl px-5 py-3.5 flex flex-col items-center shadow-[3px_3px_0px_#0A1020]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Your Tracking ID</span>
                <span className="text-base font-black text-[#0A1020] tracking-wide uppercase font-mono">{createdId}</span>
                <Link
                  to={`/tracker?id=${createdId}`}
                  className="mt-2.5 inline-flex items-center gap-1.5 bg-[#0F4CFF] text-white font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0A1020] hover:shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#0a1020] transition-all cursor-pointer"
                >
                  <span>Track Live Status</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {!getAuthToken() && submittedData && (
              <div className="mt-4 mb-2 p-4 bg-slate-50 border-2 border-slate-900 rounded-xl space-y-3 max-w-sm w-full text-left shadow-[2px_2px_0px_#0A1020]">
                <p className="text-[10px] font-black uppercase text-[#0F4CFF] tracking-wider">Direct Support Links</p>
                <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                  To speed up dispatch, you can also send this booking details directly to our support handlers via:
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/919310112994?text=${encodeURIComponent(
                      `*New Repair Booking from TheMobifixx Website*\n\n` +
                      `*Tracking ID:* ${createdId || 'N/A'}\n` +
                      `*Customer Name:* ${submittedData.customerName}\n` +
                      `*Phone:* ${submittedData.phone}\n` +
                      `*Email:* ${submittedData.email || 'N/A'}\n` +
                      `*Device:* ${submittedData.deviceType} (${submittedData.brand} ${submittedData.model})\n` +
                      `*Issue:* ${submittedData.issueDescription}\n` +
                      `*Pickup Required:* ${submittedData.pickupRequired ? 'Yes' : 'No'}\n` +
                      `*Pickup Address:* ${submittedData.pickupAddress || 'N/A'}\n` +
                      `*Preferred Date:* ${submittedData.preferredDate}`
                    )}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#00C48C] text-white text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-y-[1px] hover:shadow-[2px_2px_0px] transition-all cursor-pointer text-center"
                  >
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:themobifixx@gmail.com?subject=New Repair Booking - ${encodeURIComponent(submittedData.customerName)}&body=${encodeURIComponent(
                      `Tracking ID: ${createdId || 'N/A'}\n` +
                      `Customer Name: ${submittedData.customerName}\n` +
                      `Phone: ${submittedData.phone}\n` +
                      `Email: ${submittedData.email || 'N/A'}\n` +
                      `Device: ${submittedData.deviceType} (${submittedData.brand} ${submittedData.model})\n` +
                      `Issue: ${submittedData.issueDescription}\n` +
                      `Pickup Required: ${submittedData.pickupRequired ? 'Yes' : 'No'}\n` +
                      `Pickup Address: ${submittedData.pickupAddress || 'N/A'}\n` +
                      `Preferred Date: ${submittedData.preferredDate}`
                    )}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#0F4CFF] text-white text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0A1020] hover:-translate-y-[1px] hover:shadow-[2px_2px_0px] transition-all cursor-pointer text-center"
                  >
                    <span>Send via Gmail / Email</span>
                  </a>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-500 max-w-xs mt-1 font-bold">
              A certified technician will call you in 15 minutes to confirm the exact address and scheduling time.
            </p>
            <button
              onClick={() => {
                setSubmittedData(null);
                setSubmitStatus('idle');
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-white hover:text-slate-200 transition-colors uppercase tracking-wider border-2 border-slate-900 bg-slate-900 px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_#FFB800] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#FFB800] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[0.5px_0.5px_0px_#FFB800] cursor-pointer"
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
              <div className="flex items-center space-x-2 bg-white border-2 border-rose-500 text-rose-600 p-3.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#F43F5E]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('customerName', { required: 'Please enter your name' })}
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.customerName ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
                {errors.customerName && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.customerName.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Phone Number *</label>
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
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.phone ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Device Type *</label>
                <select
                  {...register('deviceType', { required: 'Required' })}
                  className="w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-white shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium cursor-pointer"
                >
                  <option value="laptop">Laptop</option>
                  <option value="macbook">MacBook</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="other">Other Gadget</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Brand *</label>
                <input
                  type="text"
                  placeholder="E.g., Dell, Apple, HP"
                  {...register('brand', { required: 'Please enter brand name' })}
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.brand ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
                {errors.brand && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.brand.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Model *</label>
                <input
                  type="text"
                  placeholder="E.g., XPS 15, Pro M1"
                  {...register('model', { required: 'Please enter model name' })}
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.model ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
                {errors.model && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.model.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('preferredDate', { required: 'Please select a preferred date' })}
                  className="w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className="w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Describe Issue(s) *</label>
              <textarea
                rows={3}
                placeholder="E.g., Water spill, screen replacement, overheating, SSD/RAM slow, keyboard key repeating..."
                {...register('issueDescription', { required: 'Please briefly describe the issues' })}
                className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium resize-none ${
                  errors.issueDescription ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                }`}
              />
              {errors.issueDescription && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.issueDescription.message}</span>}
            </div>

            {/* Checkbox for pickup */}
            <div className="bg-[#F8FAFC] border-2 border-slate-900 rounded-2xl p-4 space-y-4 shadow-[2px_2px_0px_#0A1020]">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="pickupRequired"
                  {...register('pickupRequired')}
                  className="mt-1 h-4 w-4 text-[#0F4CFF] focus:ring-[#0F4CFF]/20 border-slate-900 rounded cursor-pointer"
                />
                <div>
                  <label htmlFor="pickupRequired" className="text-sm font-black text-slate-950 cursor-pointer block select-none">
                    Request Free Doorstep Pickup & Delivery
                  </label>
                  <span className="text-xs text-slate-500 block font-medium">
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
                  className="overflow-hidden pt-2 border-t-2 border-slate-900"
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
                    className={`w-full text-sm border-2 border-slate-900 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4CFF]/10 focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium resize-none ${
                      errors.pickupAddress ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                    }`}
                  />
                  {errors.pickupAddress && (
                    <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.pickupAddress.message}</span>
                  )}
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    * Transit insurance covered by TheMobifixx.
                  </p>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4CFF] disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer"
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
