import { useState, type FormEvent } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { INDIAN_MOBILE, openWhatsApp, waLink } from '../config/contact';
import Dialog from './ui/Dialog';
import { Field, WhatsAppIcon } from './ui/primitives';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'];

const SERVICE_OPTIONS = ['Mobile Repair', 'Laptop / Desktop Repair', 'MacBook Repair', 'Tablet / iPad Repair', 'Doorstep Repair Service', 'General Consultation / Inquiry'];

const STEP_LABELS = ['Select Date', 'Select Time Slot', 'Your Information', 'Confirmation'] as const;
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type Step = 1 | 2 | 3 | 4;
type Errors = Partial<Record<'name' | 'mobile' | 'address', string>>;

const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};

const isSameDay = (a: Date | null, b: Date) =>
  !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const formatDate = (d: Date | null) =>
  d ? d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select a date';

export default function ConsultationBookingModal({ isOpen, onClose }: ConsultationBookingModalProps) {
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = startOfToday();
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const message = () =>
    `*FREE CONSULTATION BOOKING* 🛠️
-----------------------------------
📅 *Date:* ${selectedDate ? formatDate(selectedDate) : 'Not selected'}
⏰ *Time:* ${selectedTime || 'Not selected'}
👤 *Name:* ${name.trim()}
📱 *Mobile:* ${mobile.trim()}
🏠 *Address:* ${address.trim()}
🔧 *Service:* ${service}
${notes.trim() ? `📝 *Notes:* ${notes.trim()}` : ''}

Please confirm my appointment! Thank you.`;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!mobile.trim()) next.mobile = 'Please enter your mobile number.';
    else if (!INDIAN_MOBILE.test(mobile.trim())) next.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (!address.trim()) next.address = 'Please enter your address or area.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStep(4);
    openWhatsApp(message());
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedTime('');
    setName('');
    setMobile('');
    setAddress('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const summary: [string, string, boolean][] = [
    ['Date', formatDate(selectedDate), !!selectedDate],
    ['Time', selectedTime || 'Select a time', !!selectedTime],
    ['Details', name ? `${name}${mobile ? ` · ${mobile}` : ''} · ${service}` : 'Pending details', !!name],
  ];

  const navBtn = 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-fg hover:bg-paper-2 disabled:opacity-30';

  return (
    <Dialog open={isOpen} onClose={resetAndClose} title="Book a free consultation" className="max-w-4xl rounded-2xl bg-card p-5 md:p-8">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        {/* Summary */}
        <aside className="md:col-span-4 md:border-r md:border-line md:pr-8">
          <p className="eyebrow">
            Step {step} of 4 — <span className="text-accent">{STEP_LABELS[step - 1]}</span>
          </p>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-paper-2" aria-hidden="true">
            <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
            {summary.map(([k, v, set]) => (
              <div key={k} className="border-t border-line pt-3">
                <dt className="eyebrow">{k}</dt>
                <dd className={`mt-1 text-sm ${set ? 'font-medium text-fg' : 'text-fg-subtle'}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* Steps */}
        <div className="md:col-span-8">
          {step === 1 && (
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Select a Date</h3>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm" aria-live="polite">
                    {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button type="button" className={navBtn} onClick={() => setViewMonth(new Date(year, month - 1, 1))} disabled={atCurrentMonth} aria-label="Previous month">
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" className={navBtn} onClick={() => setViewMonth(new Date(year, month + 1, 1))} aria-label="Next month">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="pb-2 font-mono text-[11px] uppercase text-fg-subtle" aria-hidden="true">{d}</span>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => <span key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = new Date(year, month, i + 1);
                  const past = date < today;
                  const selected = isSameDay(selectedDate, date);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={past}
                      onClick={() => setSelectedDate(date)}
                      aria-pressed={selected}
                      aria-label={date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                      className={`h-10 rounded-md text-sm font-medium transition-colors md:h-11 ${
                        selected ? 'bg-accent text-white' : past ? 'text-fg-subtle/40' : 'text-fg hover:bg-paper-2'
                      } ${isSameDay(today, date) && !selected ? 'ring-1 ring-inset ring-line-strong' : ''}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end border-t border-line pt-4">
                <button type="button" onClick={() => setStep(2)} disabled={!selectedDate} className="btn btn-primary w-full sm:w-auto">
                  Continue to Time <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">Select Time Slot</h3>
                <span className="font-mono text-sm text-fg-muted">{formatDate(selectedDate)}</span>
              </div>
              <p className="mb-5 text-sm text-fg-muted">Choose an available time slot for your free consultation:</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    aria-pressed={selectedTime === slot}
                    className={`min-h-11 rounded-md border font-mono text-sm transition-colors ${
                      selectedTime === slot ? 'border-accent bg-accent text-white' : 'border-line-strong text-fg hover:border-ink'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button type="button" onClick={() => setStep(3)} disabled={!selectedTime} className="btn btn-primary">
                  Continue to Details <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submit} noValidate>
              <h3 className="text-lg font-semibold">Your Information</h3>
              <p className="mb-5 text-sm text-fg-muted">Enter your details to confirm your consultation slot.</p>
              <div className="grid gap-4">
                <Field id="c-name" label="Full Name" required error={errors.name}>
                  <input id="c-name" className="field-input" autoComplete="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="c-name-msg" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="c-mobile" label="Mobile / WhatsApp Number" required error={errors.mobile}>
                    <input id="c-mobile" type="tel" inputMode="tel" autoComplete="tel" className="field-input" placeholder="e.g. +91 98765 43210" value={mobile} onChange={(e) => setMobile(e.target.value)} aria-invalid={!!errors.mobile} aria-describedby="c-mobile-msg" />
                  </Field>
                  <Field id="c-service" label="Service Needed" required>
                    <select id="c-service" className="field-input" value={service} onChange={(e) => setService(e.target.value)}>
                      {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
                <Field id="c-address" label="Address / Location" required error={errors.address}>
                  <input id="c-address" autoComplete="street-address" className="field-input" placeholder="Your street address, area or landmark" value={address} onChange={(e) => setAddress(e.target.value)} aria-invalid={!!errors.address} aria-describedby="c-address-msg" />
                </Field>
                <Field id="c-notes" label="Additional Notes / Issue Description">
                  <textarea id="c-notes" rows={3} className="field-input" placeholder="Tell us a little bit about the device issue or consultation requirement..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                </Field>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
                <button type="button" onClick={() => setStep(2)} className="btn btn-outline">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button type="submit" className="btn btn-whatsapp">
                  <WhatsAppIcon /> Book via WhatsApp
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="py-2" role="status">
              <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-semibold">Booking Submitted!</h3>
              <p className="mt-2 max-w-md text-sm text-fg-muted">
                Your consultation details have been formatted and sent directly to our shop owner via WhatsApp.
              </p>
              <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                {[
                  ['Appointment Date', formatDate(selectedDate)],
                  ['Time Slot', selectedTime],
                  ['Customer', `${name} (${mobile})`],
                  ['Service', service],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-2 py-2.5">
                    <dt className="text-fg-muted">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(message())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <WhatsAppIcon /> Re-open WhatsApp
                </a>
                <button type="button" onClick={resetAndClose} className="btn btn-outline">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
