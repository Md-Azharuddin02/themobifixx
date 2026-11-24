import { useState, type FormEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Battery, Check, Smartphone, Wrench } from 'lucide-react';
import { resolvePageSEO } from '../utils/seo.utils';
import { SERVICE_CATALOG_DATA, type ServiceDetailsData } from '../content/services';
import { INDIAN_MOBILE, openWhatsApp } from '../config/contact';
import PageHeader from '../components/ui/PageHeader';
import { Field, WhatsAppIcon } from '../components/ui/primitives';

const RELATED = [
  { label: 'Mobile Repair', to: '/services/mobile-repair' },
  { label: 'Laptop Repair', to: '/services/laptop-repair' },
  { label: 'MacBook Repair', to: '/services/macbook-repair' },
  { label: 'Doorstep Repair', to: '/services/doorstep-repair' },
];

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  // Named routes like /services/laptop-repair carry no :slug param, so take it from the path.
  const currentSlug = slug || pathname.split('/').filter(Boolean)[1] || 'mobile-repair';

  const seoData = resolvePageSEO(`/services/${currentSlug}`);
  const serviceInfo: ServiceDetailsData = SERVICE_CATALOG_DATA[currentSlug] || {
    title: seoData.h1 || 'Repair Service',
    subtitle: 'Professional Repair in Delhi NCR, Nehru Place',
    description: seoData.description,
    features: ['OEM Replacement Parts', 'Certified Engineers', '90-Day Warranty', 'Doorstep Service'],
    options: [
      { id: 1, name: 'Standard Diagnostic & Repair', icon: <Wrench className="h-5 w-5" />, price: 'Best Market Price' },
      { id: 2, name: 'Display Screen Replacement', icon: <Smartphone className="h-5 w-5" />, price: 'OEM Parts' },
      { id: 3, name: 'Battery Replacement', icon: <Battery className="h-5 w-5" />, price: 'Full Warranty' },
    ],
  };

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const quickBook = (e: FormEvent) => {
    e.preventDefault();
    if (!INDIAN_MOBILE.test(phone.trim())) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    setSent(true);
    openWhatsApp(`Hi! 👋 I want to book ${serviceInfo.title} for my device. Phone number: ${phone.trim()}.`);
  };

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: serviceInfo.title }]}
        title={serviceInfo.title}
        intro={<span className="font-medium text-accent">{serviceInfo.subtitle}</span>}
      />

      <div className="container-page grid gap-12 py-10 md:py-14 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          <section>
            <div>
              <p className="text-base leading-relaxed text-fg-muted">{serviceInfo.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {serviceInfo.features.map((f) => (
                  <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-semibold text-fg">
                    <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {serviceInfo.options.length > 0 && (
            <section>
              <h2 className="text-xl font-bold md:text-2xl">Available Repair Options &amp; Pricing</h2>
              <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-line">
                {serviceInfo.options.map((opt) => (
                  <li key={opt.id} className="flex items-center gap-4 bg-white px-5 py-4">
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{opt.name}</span>
                      <span className="block text-sm font-semibold text-accent">{opt.price}</span>
                    </span>
                    <Link to={`/contact?tab=booking&service=${encodeURIComponent(opt.name)}`} className="btn btn-sm btn-outline">
                      Book
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold md:text-2xl">Why Choose TheMobiFixx in Nehru Place?</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="card p-5">
                <dt className="font-bold">Certified Engineers</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg-muted">10+ years of experience in micro-soldering, IC reballing, and logic board schematics.</dd>
              </div>
              <div className="card p-5">
                <dt className="font-bold">90-Day Parts Warranty</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg-muted">Every replacement display, battery, or motherboard component comes backed by a 90-day warranty.</dd>
              </div>
            </dl>
          </section>

          <nav aria-label="Related services" className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-sm">
            <span className="font-semibold">Related Services:</span>
            {RELATED.map((r) => (
              <Link key={r.to} to={r.to} className="link-underline text-fg-muted hover:text-fg">{r.label}</Link>
            ))}
          </nav>
        </div>

        <aside className="lg:col-span-4">
          <div className="card sticky top-24 p-6">
            <h2 className="text-lg font-bold">Instant Repair Quote</h2>
            <p className="mt-1 text-sm text-fg-muted">Leave your number and continue on WhatsApp.</p>
            <form onSubmit={quickBook} noValidate className="mt-5 grid gap-4">
              <Field id="q-phone" label="Your Phone Number" required error={error}>
                <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" className="field-input" placeholder="Enter 10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!error} aria-describedby="q-phone-msg" />
              </Field>
              <button type="submit" className="btn btn-whatsapp w-full">
                <WhatsAppIcon /> Book Repair on WhatsApp
              </button>
            </form>
            {sent && <p role="status" className="mt-3 text-sm text-success">Redirecting to WhatsApp support...</p>}
          </div>
        </aside>
      </div>
    </>
  );
}
