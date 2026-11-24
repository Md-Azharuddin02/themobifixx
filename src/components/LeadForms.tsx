import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { CONTACT, INDIAN_MOBILE, openWhatsApp, waLink } from '../config/contact';
import { Field, WhatsAppIcon } from './ui/primitives';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateBookingRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `TMX-${ts}-${rand}`;
}

const today = () => new Date().toISOString().split('T')[0];

function SuccessPanel({ title, children, onReset, resetLabel }: { title: string; children: ReactNode; onReset: () => void; resetLabel: string }) {
  return (
    <div role="status" className="py-2">
      <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
      <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
      {children}
      <button type="button" onClick={onReset} className="link-underline mt-6 text-sm font-medium text-fg-muted hover:text-fg">
        {resetLabel}
      </button>
    </div>
  );
}

function SubmitButton({ busy, icon, label }: { busy: boolean; icon: ReactNode; label: string }) {
  return (
    <button type="submit" disabled={busy} className="btn btn-whatsapp mt-2 w-full sm:w-auto">
      {busy ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending via WhatsApp...
        </>
      ) : (
        <>
          {icon} {label}
        </>
      )}
    </button>
  );
}

/* ─────────────────────────── General inquiry ─────────────────────────── */

interface InquiryFormInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

const inquiryMessage = (d: InquiryFormInput) =>
  `*New General Inquiry — TheMobifixx*\n\n` +
  `*Name:* ${d.name}\n` +
  `*Phone:* ${d.phone}\n` +
  `*Email:* ${d.email || 'N/A'}\n` +
  `*Message:* ${d.message}`;

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<InquiryFormInput | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormInput>();

  const onSubmit = (data: InquiryFormInput) => {
    setIsSubmitting(true);
    setTimeout(() => {
      openWhatsApp(inquiryMessage(data));
      setSubmitted(data);
      setIsSubmitting(false);
      reset();
    }, 600);
  };

  const mailto = (d: InquiryFormInput) =>
    `mailto:${CONTACT.email}?subject=General Inquiry - ${encodeURIComponent(d.name)}&body=${encodeURIComponent(
      `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || 'N/A'}\n\nMessage:\n${d.message}`,
    )}`;

  if (submitted) {
    return (
      <SuccessPanel title="Inquiry Sent!" onReset={() => setSubmitted(null)} resetLabel="Send another message">
        <p className="mt-2 max-w-md text-sm text-fg-muted">WhatsApp has opened with your details pre-filled. Our team will respond within 15 minutes.</p>
        <p className="eyebrow mt-6">Send via another channel</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <a href={waLink(inquiryMessage(submitted))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> Send via WhatsApp
          </a>
          <a href={mailto(submitted)} className="btn btn-outline">
            <Mail className="h-4 w-4" aria-hidden="true" /> Send via Email
          </a>
        </div>
      </SuccessPanel>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Send General Inquiry</h2>
      <p className="mt-1 text-sm text-fg-muted">Have a question about our repairs or refurbish warranty? Reach out and we will respond in 15 minutes.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-4">
        <Field id="i-name" label="Full Name" required error={errors.name?.message}>
          <input id="i-name" className="field-input" autoComplete="name" placeholder="E.g., Rahul Sharma" aria-invalid={!!errors.name} aria-describedby="i-name-msg"
            {...register('name', { required: 'Please enter your full name', validate: (v) => !!v.trim() || 'Please enter your full name' })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="i-phone" label="Phone Number" required error={errors.phone?.message}>
            <input id="i-phone" type="tel" inputMode="tel" autoComplete="tel" className="field-input" placeholder="E.g., 9876543210" aria-invalid={!!errors.phone} aria-describedby="i-phone-msg"
              {...register('phone', { required: 'Phone number is required', pattern: { value: INDIAN_MOBILE, message: 'Please enter a valid 10-digit Indian phone number' } })} />
          </Field>
          <Field id="i-email" label="Email Address" error={errors.email?.message}>
            <input id="i-email" type="email" autoComplete="email" className="field-input" placeholder="E.g., name@example.com" aria-invalid={!!errors.email} aria-describedby="i-email-msg"
              {...register('email', { pattern: { value: EMAIL, message: 'Please enter a valid email address' } })} />
          </Field>
        </div>
        <Field id="i-message" label="Inquiry Details" required error={errors.message?.message}>
          <textarea id="i-message" rows={4} className="field-input" placeholder="What device or service are you inquiring about?" aria-invalid={!!errors.message} aria-describedby="i-message-msg"
            {...register('message', { required: 'Please enter details of your inquiry', validate: (v) => !!v.trim() || 'Please enter details of your inquiry' })} />
        </Field>
        <SubmitButton busy={isSubmitting} icon={<Send className="h-4 w-4" aria-hidden="true" />} label="Send via WhatsApp" />
      </form>
    </div>
  );
}

/* ─────────────────────────── Repair booking ─────────────────────────── */

type DeviceType = 'laptop' | 'macbook' | 'desktop' | 'mobile' | 'tablet' | 'other';
const DEVICE_TYPES: DeviceType[] = ['laptop', 'macbook', 'desktop', 'mobile', 'tablet', 'other'];

interface BookingFormInput {
  customerName: string;
  phone: string;
  email?: string;
  deviceType: DeviceType;
  brand: string;
  model: string;
  issueDescription: string;
  pickupRequired: boolean;
  pickupAddress: string;
  preferredDate: string;
}

interface RepairBookingFormProps {
  initialDeviceType?: DeviceType;
}

export function RepairBookingForm({ initialDeviceType = 'laptop' }: RepairBookingFormProps) {
  const [searchParams] = useSearchParams();
  const rawDevice = searchParams.get('device') as DeviceType | null;
  const urlDevice = rawDevice && DEVICE_TYPES.includes(rawDevice) ? rawDevice : null;
  const urlBrand = searchParams.get('brand') || '';
  // Service detail pages link here with ?service=; use it to seed the issue when no ?issue= is given.
  const urlIssue = searchParams.get('issue') || searchParams.get('service') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitted, setSubmitted] = useState<BookingFormInput | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BookingFormInput>({
    defaultValues: {
      deviceType: urlDevice || initialDeviceType,
      brand: urlBrand,
      issueDescription: urlIssue,
      pickupRequired: true,
      pickupAddress: '',
      preferredDate: today(),
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
      setSubmitted(data);
      setIsSubmitting(false);
      reset();
    }, 600);
  };

  const resendLink = (d: BookingFormInput, ref: string) =>
    waLink(
      `*New Repair Booking — TheMobifixx*\n\n` +
        `*Reference:* ${ref}\n*Customer:* ${d.customerName}\n*Phone:* ${d.phone}\n` +
        `*Device:* ${d.deviceType} (${d.brand} ${d.model})\n*Issue:* ${d.issueDescription}\n` +
        `*Pickup:* ${d.pickupRequired ? d.pickupAddress || 'Yes' : 'No'}\n*Date:* ${d.preferredDate}`,
    );

  if (submitted) {
    return (
      <SuccessPanel title="Booking Request Sent!" onReset={() => setSubmitted(null)} resetLabel="Book Another Repair">
        <p className="mt-2 max-w-md text-sm text-fg-muted">
          WhatsApp has opened with your booking details. Our team will confirm your pickup slot within 15 minutes.
        </p>
        {bookingRef && (
          <div className="mt-6 border-y border-line py-4">
            <p className="eyebrow">Your Reference Number</p>
            <p className="mt-1 font-mono text-xl font-medium tracking-wide">{bookingRef}</p>
            <p className="mt-1 text-sm text-fg-subtle">Share this with our team via WhatsApp for quick tracking</p>
          </div>
        )}
        <p className="eyebrow mt-6">Didn't open? Send directly:</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <a href={resendLink(submitted, bookingRef)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> Send via WhatsApp
          </a>
          <a href={waLink(`Hi, I'd like to follow up on my booking reference: ${bookingRef}`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <ArrowRight className="h-4 w-4" aria-hidden="true" /> Follow Up on Booking
          </a>
        </div>
        <p className="mt-5 max-w-md text-sm text-fg-muted">A certified technician will call you within 15 minutes to confirm the exact address and scheduling time.</p>
      </SuccessPanel>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Book Premium Repair Service</h2>
      <p className="mt-1 text-sm text-fg-muted">Free Doorstep Pickup &amp; Return transit in Delhi, Noida, and Gurugram.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="b-name" label="Your Name" required error={errors.customerName?.message}>
            <input id="b-name" className="field-input" autoComplete="name" placeholder="Rahul Sharma" aria-invalid={!!errors.customerName} aria-describedby="b-name-msg"
              {...register('customerName', { required: 'Please enter your name', validate: (v) => !!v.trim() || 'Please enter your name' })} />
          </Field>
          <Field id="b-phone" label="Phone Number" required error={errors.phone?.message}>
            <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" className="field-input" placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby="b-phone-msg"
              {...register('phone', { required: 'Phone number is required', pattern: { value: INDIAN_MOBILE, message: 'Please enter a valid 10-digit phone number' } })} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="b-device" label="Device Type" required>
            <select id="b-device" className="field-input" {...register('deviceType', { required: 'Required' })}>
              <option value="laptop">Laptop</option>
              <option value="macbook">MacBook</option>
              <option value="desktop">Desktop / iMac</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="other">Other Gadget</option>
            </select>
          </Field>
          <Field id="b-brand" label="Brand" required error={errors.brand?.message}>
            <input id="b-brand" className="field-input" placeholder="E.g., Apple, Samsung" aria-invalid={!!errors.brand} aria-describedby="b-brand-msg"
              {...register('brand', { required: 'Please enter brand name' })} />
          </Field>
          <Field id="b-model" label="Model" required error={errors.model?.message}>
            <input id="b-model" className="field-input" placeholder="E.g., iPhone 15 Pro" aria-invalid={!!errors.model} aria-describedby="b-model-msg"
              {...register('model', { required: 'Please enter model name' })} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="b-date" label="Preferred Date" required error={errors.preferredDate?.message}>
            <input id="b-date" type="date" min={today()} className="field-input" aria-invalid={!!errors.preferredDate} aria-describedby="b-date-msg"
              {...register('preferredDate', { required: 'Please select a preferred date', validate: (v) => v >= today() || 'Please choose today or a later date' })} />
          </Field>
          <Field id="b-email" label="Email" error={errors.email?.message}>
            <input id="b-email" type="email" autoComplete="email" className="field-input" placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby="b-email-msg"
              {...register('email', { pattern: { value: EMAIL, message: 'Please enter a valid email address' } })} />
          </Field>
        </div>

        <Field id="b-issue" label="Describe Issue(s)" required error={errors.issueDescription?.message}>
          <textarea id="b-issue" rows={3} className="field-input" placeholder="E.g., Screen replacement, battery draining fast..." aria-invalid={!!errors.issueDescription} aria-describedby="b-issue-msg"
            {...register('issueDescription', { required: 'Please briefly describe the issues' })} />
        </Field>

        <div className="rounded-md border border-line bg-paper p-4">
          <label htmlFor="pickupRequired" className="flex cursor-pointer items-start gap-3">
            <input id="pickupRequired" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ink)]" {...register('pickupRequired')} />
            <span>
              <span className="block text-sm font-semibold">Request Free Doorstep Pickup &amp; Delivery</span>
              <span className="block text-sm text-fg-muted">A certified transit technician will securely pick up, receipt, and return your device after repairs.</span>
            </span>
          </label>
          {pickupRequired && (
            <Field id="b-address" label="Doorstep Pickup Address" required error={errors.pickupAddress?.message} className="mt-4 border-t border-line pt-4">
              <textarea id="b-address" rows={2} autoComplete="street-address" className="field-input" placeholder="E.g., Flat 402, Building 3, Sector 62, Noida" aria-invalid={!!errors.pickupAddress} aria-describedby="b-address-msg"
                {...register('pickupAddress', { required: pickupRequired ? 'Please enter your complete doorstep pickup address' : false })} />
            </Field>
          )}
        </div>

        <SubmitButton busy={isSubmitting} icon={<Calendar className="h-4 w-4" aria-hidden="true" />} label="Confirm Booking via WhatsApp" />
      </form>
    </div>
  );
}
