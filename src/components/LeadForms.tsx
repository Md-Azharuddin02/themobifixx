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
        const whatsAppUrl = `https://wa.me/919818409122?text=${encodeURIComponent(textMsg)}`;
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
    <div className="bg-white">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Send General Inquiry</h3>
      <p className="text-sm text-gray-500 mb-6 font-medium">Have a question about our repairs or refurbish warranty? Reach out and we will respond in 15 minutes.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Inquiry Submitted!</h4>
            <p className="text-sm text-gray-500 max-w-sm">
              Thank you for contacting TheMobifixx. Our customer support expert will call or WhatsApp you shortly.
            </p>

            {!getAuthToken() && submittedData && (
              <div className="mt-6 mb-2 p-5 bg-gray-50 border border-gray-100 rounded-xl space-y-4 max-w-sm w-full text-left">
                <p className="text-xs font-bold text-brand-orange">Direct Support Links</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  To ensure fastest resolution, you can also send this inquiry directly to our support handlers via:
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/919818409122?text=${encodeURIComponent(
                      `*New General Inquiry from TheMobifixx Website*\n\n` +
                      `*Name:* ${submittedData.name}\n` +
                      `*Phone:* ${submittedData.phone}\n` +
                      `*Email:* ${submittedData.email || 'N/A'}\n` +
                      `*Message:* ${submittedData.message}`
                    )}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 text-white text-sm font-bold py-3 px-4 rounded-full shadow-sm hover:bg-green-600 transition-colors"
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
                    className="inline-flex items-center justify-center bg-blue-500 text-white text-sm font-bold py-3 px-4 rounded-full shadow-sm hover:bg-blue-600 transition-colors"
                  >
                    <span>Send via Email</span>
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSubmittedData(null);
                setSubmitStatus('idle');
              }}
              className="mt-6 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors underline"
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
              <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-lg text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                placeholder="E.g., Rahul Sharma"
                {...register('name', { required: 'Please enter your full name' })}
                className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                  errors.name ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                }`}
              />
              {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
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
                  className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                    errors.phone ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="E.g., name@example.com"
                  {...register('email', {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
                {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Inquiry Details *</label>
              <textarea
                rows={4}
                placeholder="What device or service are you inquiring about?"
                {...register('message', { required: 'Please enter details of your inquiry' })}
                className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none ${
                  errors.message ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                }`}
              />
              {errors.message && <span className="text-xs text-rose-500 mt-1 block">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
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
        const whatsAppUrl = `https://wa.me/919818409122?text=${encodeURIComponent(textMsg)}`;
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
    <div className="bg-white relative">

      <h3 className="text-xl font-bold text-gray-900 mb-1">Book Premium Repair Service</h3>
      <p className="text-sm text-gray-500 mb-6 font-medium">Free Doorstep Pickup & Return transit in Delhi, Noida, and Gurugram.</p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Repair Request Booked!</h4>
            <p className="text-sm text-gray-500 max-w-sm font-medium mb-1">
              Your pickup order has been logged in our queue.
            </p>
            {createdId && (
              <div className="my-6 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Your Tracking ID</span>
                <span className="text-lg font-bold text-gray-900 font-mono tracking-wider">{createdId}</span>
                <Link
                  to={`/tracker?id=${createdId}`}
                  className="mt-4 inline-flex items-center gap-2 bg-brand-orange text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <span>Track Live Status</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {!getAuthToken() && submittedData && (
              <div className="mt-4 mb-2 p-5 bg-gray-50 border border-gray-100 rounded-xl space-y-4 max-w-sm w-full text-left">
                <p className="text-xs font-bold text-brand-orange">Direct Support Links</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  To speed up dispatch, you can also send this booking details directly to our support handlers via:
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/919818409122?text=${encodeURIComponent(
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
                    className="inline-flex items-center justify-center bg-green-500 text-white text-sm font-bold py-3 px-4 rounded-full shadow-sm hover:bg-green-600 transition-colors"
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
                    className="inline-flex items-center justify-center bg-blue-500 text-white text-sm font-bold py-3 px-4 rounded-full shadow-sm hover:bg-blue-600 transition-colors"
                  >
                    <span>Send via Email</span>
                  </a>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 max-w-xs mt-4">
              A certified technician will call you in 15 minutes to confirm the exact address and scheduling time.
            </p>
            <button
              onClick={() => {
                setSubmittedData(null);
                setSubmitStatus('idle');
              }}
              className="mt-6 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors underline"
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
              <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-lg text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('customerName', { required: 'Please enter your name' })}
                  className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                    errors.customerName ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                  }`}
                />
                {errors.customerName && <span className="text-xs text-rose-500 mt-1 block">{errors.customerName.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
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
                  className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                    errors.phone ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Device Type *</label>
                <select
                  {...register('deviceType', { required: 'Required' })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-gray-800"
                >
                  <option value="laptop">Laptop</option>
                  <option value="macbook">MacBook</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="other">Other Gadget</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand *</label>
                <input
                  type="text"
                  placeholder="E.g., Apple, Samsung"
                  {...register('brand', { required: 'Please enter brand name' })}
                  className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                    errors.brand ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                  }`}
                />
                {errors.brand && <span className="text-xs text-rose-500 mt-1 block">{errors.brand.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Model *</label>
                <input
                  type="text"
                  placeholder="E.g., iPhone 15 Pro"
                  {...register('model', { required: 'Please enter model name' })}
                  className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                    errors.model ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                  }`}
                />
                {errors.model && <span className="text-xs text-rose-500 mt-1 block">{errors.model.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('preferredDate', { required: 'Please select a preferred date' })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Describe Issue(s) *</label>
              <textarea
                rows={3}
                placeholder="E.g., Screen replacement, battery draining fast..."
                {...register('issueDescription', { required: 'Please briefly describe the issues' })}
                className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none ${
                  errors.issueDescription ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                }`}
              />
              {errors.issueDescription && <span className="text-xs text-rose-500 mt-1 block">{errors.issueDescription.message}</span>}
            </div>

            {/* Checkbox for pickup */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="pickupRequired"
                  {...register('pickupRequired')}
                  className="mt-1 h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded cursor-pointer"
                />
                <div>
                  <label htmlFor="pickupRequired" className="text-sm font-bold text-gray-900 cursor-pointer block select-none">
                    Request Free Doorstep Pickup & Delivery
                  </label>
                  <span className="text-xs text-gray-500 block">
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
                  className="overflow-hidden pt-3 border-t border-gray-200"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Doorstep Pickup Address *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., Flat 402, Building 3, Sector 62, Noida"
                    {...register('pickupAddress', { 
                      required: pickupRequired ? 'Please enter your complete doorstep pickup address' : false 
                    })}
                    className={`w-full text-sm border border-gray-200 rounded-lg px-4 py-3.5 bg-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none ${
                      errors.pickupAddress ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
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
              className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm mt-6"
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
