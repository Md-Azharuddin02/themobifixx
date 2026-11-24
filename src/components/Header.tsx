import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, Search, X } from 'lucide-react';
import { CONTACT } from '../config/contact';
import Dialog from './ui/Dialog';
import DeviceSearch from './DeviceSearch';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

const NAV: { label: string; section?: string; to?: string }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Book Repair', to: '/contact?tab=booking' },
  { label: 'Services', section: 'services' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const goToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate(`/?scroll=${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: (typeof NAV)[number]) =>
    item.to ? pathname === item.to.split('?')[0] && (item.label === 'Book Repair') === new URLSearchParams(search).has('tab') : item.section === 'home' && pathname === '/';
  const navItem = 'relative whitespace-nowrap py-2 text-[0.9375rem] font-medium text-fg transition-colors hover:text-accent';
  const iconBtn = 'h-11 w-11 items-center justify-center rounded-xl text-fg hover:bg-paper-2';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_var(--color-line)]">
      <div className="container-page flex h-16 items-center gap-2 md:h-[4.75rem]">
        <Link to="/" className="mr-auto flex shrink-0 items-center rounded-xl bg-ink px-2.5 py-1.5" aria-label="TheMobifixx home">
          <img src={CONTACT.logo} alt="TheMobifixx" width={1414} height={363} className="h-8 w-auto md:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item);
            const cls = `${navItem} ${active ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-fg' : ''}`;
            return item.to ? (
              <Link key={item.label} to={item.to} className={cls} aria-current={active ? 'page' : undefined}>
                {item.label}
              </Link>
            ) : (
              <button key={item.label} type="button" onClick={() => goToSection(item.section!)} className={`${cls} cursor-pointer`} aria-current={active ? 'page' : undefined}>
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          className={`${iconBtn} ml-4 hidden lg:inline-flex`}
          aria-label={searchOpen ? 'Close device search' : 'Search devices'}
          aria-expanded={searchOpen}
          aria-controls="header-search"
        >
          {searchOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Search className="h-5 w-5" aria-hidden="true" />}
        </button>
        <a href={CONTACT.phoneHref} className={`${iconBtn} inline-flex lg:hidden`} aria-label={`Call ${CONTACT.phoneDisplay}`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
        <button type="button" className={`${iconBtn} -mr-2 inline-flex lg:hidden`} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Info strip under the header (the reference uses this slot for an offer; we state real service facts). */}
      <p className="bg-accent-soft px-4 py-1.5 text-center text-xs font-medium text-fg md:text-[0.8125rem]">
        Free pickup &amp; drop across Delhi NCR
        <span className="hidden sm:inline">
          {' '}· Call <a href={CONTACT.phoneHref} className="font-bold text-accent">{CONTACT.phoneDisplay}</a>
        </span>
      </p>

      {searchOpen && (
        <div id="header-search" className="border-t border-line bg-white py-4">
          <div className="container-page max-w-2xl">
            <DeviceSearch autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" hideTitle placement="right" className="bg-white p-5">
        <p className="text-lg font-bold">Menu</p>
        <div className="mt-5">
          <DeviceSearch onDone={() => setMenuOpen(false)} />
        </div>
        <nav aria-label="Mobile" className="mt-4">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-line">
                {item.to ? (
                  <Link to={item.to} onClick={() => setMenuOpen(false)} className="flex min-h-13 items-center text-base font-semibold">
                    {item.label}
                  </Link>
                ) : (
                  <button type="button" onClick={() => goToSection(item.section!)} className="flex min-h-13 w-full items-center text-left text-base font-semibold">
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid gap-3">
          <Link to="/contact?tab=booking" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full">
            Book Repair
          </Link>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenConsultation?.();
            }}
            className="btn btn-outline w-full"
          >
            Book a free consultation
          </button>
          <a href={CONTACT.phoneHref} className="btn btn-outline w-full">
            <Phone className="h-4 w-4" aria-hidden="true" /> {CONTACT.phoneDisplay}
          </a>
        </div>
      </Dialog>
    </header>
  );
}
