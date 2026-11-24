import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, brandHref, type CategoryId } from '../../content/brands';
import { GALLERY_ITEMS } from '../../content/home';
import { cldVideoStill } from '../../utils/cloudinary';
import BrandLogo from '../ui/BrandLogo';

const DEVICE_ORDER: CategoryId[] = ['mobile', 'laptop', 'tablet', 'watch', 'macbook', 'desktop'];

/** Brand picker used on the category pages. */
export function BrandGrid({ category }: { category: CategoryId }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {CATEGORIES[category].brands.map((brand) => (
        <li key={`${category}-${brand.name}`}>
          <Link
            to={brandHref(brand.id, category)}
            className="card flex h-full min-h-28 flex-col items-center justify-center gap-3 p-4 text-center transition-colors hover:border-accent"
          >
            <span className="flex h-9 items-center">
              <BrandLogo name={brand.name} src={brand.logo} />
            </span>
            <span className="text-sm font-semibold text-fg">{brand.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const LOGO_STRIP = ['apple', 'xiaomi', 'oneplus', 'oppo', 'motorola', 'google'];

/** "What can we repair for you?" — device cards plus a strip of brand logos, as on the reference. */
export function DeviceChooser() {
  const brands = CATEGORIES.mobile.brands.filter((b) => LOGO_STRIP.includes(b.id));
  return (
    <section id="brands" className="section-rule section container-page">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="h2">What can we repair for you?</h2>
        <ul className="flex items-center gap-1 overflow-x-auto scrollbar-none rounded-xl bg-paper-2 px-3 py-2 md:gap-2" aria-label="Popular brands">
          {brands.map((b) => (
            <li key={b.id}>
              <Link to={brandHref(b.id, 'mobile')} aria-label={b.name} className="flex h-10 min-w-12 items-center justify-center rounded-lg px-2 hover:bg-white">
                <BrandLogo name={b.name} src={b.logo} className="h-5 w-auto max-w-[4.5rem]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-3 md:gap-5 lg:grid-cols-6">
        {DEVICE_ORDER.map((id) => {
          const c = CATEGORIES[id];
          const Icon = c.icon;
          return (
            <li key={id}>
              <Link
                to={`/category/${id}`}
                className="flex h-full flex-col items-center rounded-xl border border-line bg-gradient-to-b from-white to-accent-soft px-2 pb-4 pt-3 text-center transition-colors hover:border-accent md:pb-6 md:pt-4"
              >
                <span className="font-semibold text-fg">{c.shortTitle}</span>
                <Icon className="mt-3 h-10 w-10 text-accent md:mt-5 md:h-14 md:w-14" strokeWidth={1.25} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const SPOTLIGHT = [
  { to: '/services/mobile-repair', title: 'Phone Screen Replacement', text: 'Doorstep or at our Nehru Place workshop', video: 2 },
  { to: '/services/motherboard-repair', title: 'Motherboard Repair', text: 'Chip-level IC and short-circuit repair', video: 1 },
  { to: '/services/battery-replacement', title: 'Battery Replacement', text: 'Fast drain, swelling or sudden shutdowns', video: 4 },
  { to: '/services/water-damage-repair', title: 'Water Damage Repair', text: 'Cleaning and corrosion treatment', video: 6 },
];

/** "Services in the spotlight" — photo cards with a Book now button; photos are stills from the client's own workshop videos. */
export function ServicesOverview() {
  return (
    <section id="services" className="section-rule section container-page">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="h2">Services in the spotlight</h2>
          <p className="sub">Repairs we do every day for phones, laptops and tablets</p>
        </div>
        <Link to="/services" className="shrink-0 rounded-lg bg-paper-2 px-3 py-2 text-sm font-semibold text-fg hover:bg-accent-soft">View all</Link>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {SPOTLIGHT.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className="flex h-full flex-col overflow-hidden rounded-xl bg-accent-soft lg:relative lg:h-52 lg:flex-row">
              <img src={cldVideoStill(GALLERY_ITEMS[s.video].src, 520)} alt="" loading="lazy" className="h-36 w-full object-cover sm:h-40 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-3/5 lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]" />
              <span className="relative flex flex-1 flex-col p-4 lg:w-3/5 lg:flex-none lg:p-5">
                <span className="font-display text-lg font-bold leading-snug text-fg">{s.title}</span>
                <span className="mt-1 text-sm text-fg-muted">{s.text}</span>
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-lg bg-ink px-3 py-2 text-xs font-bold text-white lg:mt-auto">
                  Book now <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
