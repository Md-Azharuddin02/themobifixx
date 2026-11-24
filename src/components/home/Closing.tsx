import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Minus, Phone, Plus } from 'lucide-react';
import { CONTACT, WA_GENERAL_MESSAGE, waLink } from '../../config/contact';
import { COVERAGE, FAQS } from '../../content/home';
import { WhatsAppIcon } from '../ui/primitives';

/** Warranty-band slot on the reference: here, the doorstep coverage area. */
export function CoverageBand() {
  return (
    <section className="section-rule container-page py-8 md:py-12">
      <div className="band relative overflow-hidden rounded-2xl p-6 md:p-10">
        <MapPin className="absolute -right-6 -top-4 h-40 w-40 text-white/10 md:right-10 md:top-1/2 md:h-56 md:w-56 md:-translate-y-1/2" strokeWidth={1} aria-hidden="true" />
        <div className="relative max-w-xl">
          <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">Doorstep repairs across Delhi NCR</h2>
          <p className="mt-2 text-white/85 md:text-lg">Free pickup &amp; drop service available across all major NCR zones. Book once — we come to you.</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas covered">
            {COVERAGE.map((z) => (
              <li key={z.city} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white md:text-sm">{z.city}</li>
            ))}
          </ul>
          <Link to="/contact?tab=booking" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl bg-white px-5 font-bold text-ink sm:w-auto">
            Book a pickup <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** "Got a question?" support band, as on the reference. */
export function GotAQuestion() {
  return (
    <section id="contact-us" className="section-rule container-page py-8 md:py-12">
      <div className="relative overflow-hidden rounded-2xl bg-accent-soft p-6 md:p-10">
        <Phone className="absolute -bottom-6 -right-4 h-36 w-36 text-accent/15 md:bottom-auto md:right-12 md:top-1/2 md:h-48 md:w-48 md:-translate-y-1/2" strokeWidth={1.25} aria-hidden="true" />
        <div className="relative max-w-xl">
          <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">Got a question?</h2>
          <p className="mt-2 text-fg-muted md:text-lg">Call or WhatsApp our team. We respond within 15 minutes.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              Contact us <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** FAQ accordion with tinted rows, as on the reference. */
export function Faq() {
  return (
    <section id="faq" className="section-rule section container-page">
      <h2 className="h2">Frequently asked questions</h2>
      <p className="sub">Common questions about our repairs in Delhi NCR</p>
      <div className="mt-6 grid gap-3">
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0} className="group rounded-lg bg-paper-2 px-4 md:px-5">
            <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-semibold text-accent [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="h-4 w-4 shrink-0 group-open:hidden" aria-hidden="true" />
              <Minus className="hidden h-4 w-4 shrink-0 group-open:block" aria-hidden="true" />
            </summary>
            <p className="border-t border-line pb-4 pt-3 text-fg-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-sm text-fg-muted">
        Still unsure? Call <a href={CONTACT.phoneHref} className="font-semibold text-accent">{CONTACT.phoneDisplay}</a>.
      </p>
    </section>
  );
}
