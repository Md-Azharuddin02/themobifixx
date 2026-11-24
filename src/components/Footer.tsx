import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Instagram, Monitor, Phone, Youtube } from 'lucide-react';
import { CONTACT, WA_GENERAL_MESSAGE, waLink } from '../config/contact';
import Dialog from './ui/Dialog';
import { WhatsAppIcon } from './ui/primitives';

const SERVICES = [
  { label: 'Mobile Phone Repair', to: '/services/mobile-repair' },
  { label: 'Laptop Motherboard Repair', to: '/services/laptop-repair' },
  { label: 'MacBook Repair', to: '/services/macbook-repair' },
  { label: 'Tablet & iPad Repair', to: '/services/tablet-repair' },
  { label: 'Doorstep Service', to: '/services/doorstep-repair' },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 font-display text-base font-bold text-white">{children}</h2>;
}

function DesktopOption({ icon, title, sub, ...rest }: { icon: ReactNode; title: string; sub: string } & ({ to: string; onClick: () => void } | { href: string; external?: boolean })) {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-fg">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-fg">{title}</span>
        <span className="block text-sm text-fg-muted">{sub}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </>
  );
  const cls = 'group flex items-center gap-3 border-b border-line py-3.5 last:border-0';
  if ('to' in rest) return <Link to={rest.to} onClick={rest.onClick} className={cls}>{body}</Link>;
  return (
    <a href={rest.href} className={cls} {...(rest.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {body}
    </a>
  );
}

export default function Footer() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const year = new Date().getFullYear();
  const linkCls = 'inline-flex min-h-10 items-center gap-2 text-sm text-white/85 transition-colors hover:text-white';

  return (
    <footer className="band">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-9 py-12 md:py-16 lg:grid-cols-12">
        <div className="col-span-2 space-y-6 lg:col-span-5">
          <div>
            <ColumnTitle>Store Address</ColumnTitle>
            <address className="text-sm not-italic leading-relaxed text-white/85">
              {CONTACT.addressLine}
              <br />({CONTACT.coordinates})
            </address>
          </div>
          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <p className="text-sm leading-relaxed text-white/85">
              <a href={CONTACT.phoneHref} className="hover:underline">{CONTACT.phoneDisplay}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a>
              <br />
              {CONTACT.hours}
            </p>
          </div>
          <div className="flex gap-3">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"><Instagram className="h-5 w-5" aria-hidden="true" /></a>
            <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"><Youtube className="h-5 w-5" aria-hidden="true" /></a>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <ColumnTitle>Services</ColumnTitle>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.to}><Link to={s.to} className={linkCls}>{s.label}</Link></li>
            ))}
            <li>
              <button type="button" onClick={() => setDesktopOpen(true)} className={`${linkCls} cursor-pointer text-left`}>
                Desktop &amp; iMac Repair
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <ColumnTitle>Company</ColumnTitle>
          <ul>
            <li><Link to="/about" className={linkCls}>About Us</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact Us</Link></li>
            <li><Link to="/terms-and-conditions" className={linkCls}>Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy-policy" className={linkCls}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <ColumnTitle>Support</ColumnTitle>
          <ul>
            <li><Link to="/contact?tab=booking" className={linkCls}>Book Repair</Link></li>
            <li><Link to="/faq" className={linkCls}>FAQ</Link></li>
            <li><a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp Us</a></li>
            <li><a href={CONTACT.phoneHref} className={linkCls}>Call Us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page py-6 text-xs leading-relaxed text-white/70">
          <p>
            All trademarks, logos, and brand names are the property of their respective owners and are used for identification purposes only.
            “TheMobifixx is an independent third-party repair service provider and is not affiliated with or endorsed by any brand mentioned on this website.
            Please contact us for confirmation of service availability in your locality. Service Charges 499Rs”
          </p>
        </div>
      </div>

      <div className="container-page flex flex-col items-center gap-3 pb-24 pt-2 text-center text-xs text-white/75 md:pb-8">
        <Link to="/" aria-label="TheMobifixx home" className="rounded-xl bg-ink px-2.5 py-1.5">
          <img src={CONTACT.logo} alt="TheMobifixx" loading="lazy" className="h-8 w-auto" />
        </Link>
        <p>
          © {year} TheMobifixx. All rights reserved. | Designed &amp; Developed by{' '}
          <a href="https://www.arbormit.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Arbormit.com</a>
        </p>
      </div>

      <Dialog open={desktopOpen} onClose={() => setDesktopOpen(false)} title="Desktop & iMac Repair" className="max-w-lg rounded-2xl bg-card p-6 md:p-8">
        <p className="-mt-2 mb-4 text-sm leading-relaxed text-fg-muted">
          Premium doorstep and carry-in repair services for iMac, Mac Mini, Custom Gaming PCs, and Workstations.
        </p>
        <div>
          <DesktopOption to="/category/desktop" onClick={() => setDesktopOpen(false)} icon={<Monitor className="h-5 w-5" aria-hidden="true" />} title="Select Desktop Model" sub="iMac, Mac Mini, or specific brand PC models" />
          <DesktopOption to="/contact?tab=booking&device=desktop" onClick={() => setDesktopOpen(false)} icon={<ArrowUpRight className="h-5 w-5" aria-hidden="true" />} title="Book Doorstep Pickup" sub="Fill details directly to schedule technician pickup" />
          <DesktopOption
            href={waLink('Hi, I would like to get a repair quote for my Desktop PC / iMac. Please assist me.')}
            external
            icon={<WhatsAppIcon className="h-5 w-5 text-whatsapp" />}
            title="WhatsApp Live Chat"
            sub="Chat with a technician for custom builds or hardware issues"
          />
          <DesktopOption href={CONTACT.phoneHref} icon={<Phone className="h-5 w-5" aria-hidden="true" />} title="Call Nehru Place Center" sub={`${CONTACT.phoneDisplay} — Speak with an engineer`} />
        </div>
      </Dialog>
    </footer>
  );
}
