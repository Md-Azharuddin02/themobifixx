import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, MapPin, Phone } from 'lucide-react';
import { InquiryForm, RepairBookingForm } from '../components/LeadForms';
import { CONTACT, WA_GENERAL_MESSAGE, waLink } from '../config/contact';
import PageHeader from '../components/ui/PageHeader';
import { WhatsAppIcon } from '../components/ui/primitives';

type Tab = 'booking' | 'inquiry';

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTech = searchParams.get('tech') || '';
  const [activeTab, setActiveTab] = useState<Tab>(searchParams.get('tab') === 'inquiry' ? 'inquiry' : 'booking');

  useEffect(() => {
    setActiveTab(searchParams.get('tab') === 'inquiry' ? 'inquiry' : 'booking');
  }, [searchParams]);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'booking', label: 'Book Repair' },
    { id: 'inquiry', label: 'General Inquiry' },
  ];

  return (
    <div id="contact-us">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Get Connected With Us"
        intro="Book a repair, ask a question, or reach us directly. We respond within 15 minutes."
      >
        <div className="mt-5 grid grid-cols-2 gap-3 sm:flex">
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" /> Call us
          </a>
          <a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </PageHeader>

      <div className="container-page grid gap-10 py-8 md:py-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7 lg:order-2">
          <div role="tablist" aria-label="Contact form type" className="mb-4 grid grid-cols-2 rounded-xl bg-paper-2 p-1 sm:inline-grid">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                id={`contact-tab-${t.id}`}
                aria-selected={activeTab === t.id}
                aria-controls="contact-panel"
                onClick={() => changeTab(t.id)}
                className={`min-h-11 rounded-lg px-5 text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-white text-fg shadow-sm' : 'text-fg-muted hover:text-fg'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div id="contact-panel" role="tabpanel" aria-labelledby={`contact-tab-${activeTab}`} className="card p-5 md:p-8">
            {activeTab === 'booking' ? (
              <>
                {selectedTech && (
                  <div className="mb-6 flex items-center justify-between rounded-xl bg-accent-soft px-4 py-3 text-sm font-semibold">
                    <span>Requesting Technician: {selectedTech}</span>
                    <button type="button" onClick={() => setSearchParams({ tab: 'booking' })} className="link-underline text-danger">Clear</button>
                  </div>
                )}
                <RepairBookingForm />
              </>
            ) : (
              <InquiryForm />
            )}
          </div>
        </div>

        <aside className="min-w-0 space-y-4 lg:col-span-5 lg:order-1">
          <div className="card p-5 md:p-6">
            <h2 className="text-lg font-bold">Emergency Support</h2>
            <dl className="mt-4 space-y-4">
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-fg-muted">Direct Hotline</dt>
                  <dd><a href={CONTACT.phoneHref} className="text-lg font-bold hover:text-accent">{CONTACT.phoneDisplay}</a></dd>
                </div>
              </div>
              <div className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 text-whatsapp" />
                <div>
                  <dt className="text-sm text-fg-muted">WhatsApp Support</dt>
                  <dd><a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-accent">Chat with us</a></dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-fg-muted">Business Hours</dt>
                  <dd className="font-semibold">{CONTACT.hours}</dd>
                  <dd className="text-sm text-fg-muted">{CONTACT.hoursNote}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="card overflow-hidden">
            <div className="p-5 md:p-6">
              <h2 className="text-lg font-bold">Service Centre Address</h2>
              <p className="mt-3 flex gap-3 font-semibold">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" /> Nehru Place Market (Shop Location)
              </p>
              <p className="mt-1 pl-8 text-sm text-fg-muted">
                {CONTACT.coordinates}, {CONTACT.addressLine}
              </p>
              <p className="mt-1 pl-8 text-sm text-fg-muted">Landmark: {CONTACT.landmark}</p>
            </div>
            <div className="relative h-60 bg-paper-2">
              <iframe title="TheMobifixx Nehru Place Location" src={CONTACT.mapEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" allowFullScreen />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
