import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, STATS, TECHNICIANS } from '../../content/home';
import { cldVideoStill, cldWidth } from '../../utils/cloudinary';

// Real team photo on a white studio background — suits the reference's light, photo-led banner.
const heroPhoto = TECHNICIANS.find((t) => t.name === 'Arif Sheikh') ?? TECHNICIANS[0];

/**
 * Full-bleed photo banner in the style of the client's reference: short and wide, headline over the
 * left of the image, one action. The photo's white studio background is multiplied into the tinted
 * banner so the technician sits in the scene instead of in a white box.
 */
function HeroBanner() {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(100deg,#f6f7fe_0%,#eceffd_50%,#dde3fb_100%)]">
      <div className="relative mx-auto h-[12.5rem] max-w-[75rem] sm:h-[16rem] md:h-[22rem] lg:h-[28rem]">
        <img
          src={cldWidth(heroPhoto.profileImage, 900)}
          srcSet={`${cldWidth(heroPhoto.profileImage, 400)} 400w, ${cldWidth(heroPhoto.profileImage, 900)} 900w`}
          sizes="(min-width: 64rem) 420px, 45vw"
          alt={`${heroPhoto.name}, TheMobifixx technician, with repaired phones`}
          fetchPriority="high"
          className="absolute bottom-0 right-2 h-full w-auto max-w-[55%] object-contain object-bottom mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,black_22%),linear-gradient(to_bottom,transparent,black_10%)] [mask-composite:intersect] md:right-6 lg:right-10"
        />
        <div className="relative flex h-full flex-col justify-center px-4 md:px-6">
          <h1 className="font-display text-[1.3rem] font-extrabold uppercase italic leading-[1.05] tracking-tight text-fg sm:text-[1.875rem] md:text-[2.75rem] lg:text-[3.5rem]">
            Mobile &amp; laptop
            <br />
            repair at your
            <br />
            <span className="text-accent [text-shadow:0_0_18px_rgb(47_73_230/0.45)]">doorstep</span>
          </h1>
          <p className="mt-3 hidden text-sm font-semibold text-fg-muted md:block md:text-base">Delhi NCR · Nehru Place workshop</p>
          <Link
            to="/contact?tab=booking"
            className="btn mt-3 min-h-10 w-fit rounded-lg bg-accent px-4 text-sm text-white hover:bg-accent-hover md:mt-7 md:min-h-14 md:rounded-xl md:px-8 md:text-lg"
          >
            Book now <ChevronRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Two promo cards under the banner, as on the reference: brand-colour cards, title, small pill, real photo on the right. */
function PromoCards({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  const card = 'relative flex min-h-[7.5rem] overflow-hidden rounded-xl p-4 text-left md:min-h-[11rem] md:p-7';
  const pill = 'inline-flex min-h-9 w-fit items-center gap-1 whitespace-nowrap rounded-lg bg-white px-3 text-xs font-bold text-ink md:min-h-10 md:px-4 md:text-sm';
  const photo = (src: string) => (
    <img src={cldVideoStill(src, 480)} alt="" loading="lazy" className="absolute inset-y-0 right-0 h-full w-[45%] object-cover opacity-90 [mask-image:linear-gradient(to_right,transparent,black_40%)]" />
  );
  return (
    <div className="container-page grid grid-cols-2 gap-3 py-5 md:gap-6 md:py-8">
      <Link to="/contact?tab=booking" className={`${card} band`}>
        {photo(GALLERY_ITEMS[2].src)}
        <span className="relative flex flex-col justify-between gap-3">
          <span className="font-display text-lg font-bold leading-tight md:text-3xl">Doorstep<br className="md:hidden" /> Repairs</span>
          <span className={pill}>Book Now <ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
        </span>
      </Link>
      <button type="button" onClick={onOpenConsultation} className={`${card} bg-ink text-white`}>
        {photo(GALLERY_ITEMS[3].src)}
        <span className="relative flex flex-col justify-between gap-3">
          <span className="font-display text-lg font-bold leading-tight md:text-3xl">Free<br className="md:hidden" /> Consultation</span>
          <span className={pill}>Pick a Slot <ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
        </span>
      </button>
    </div>
  );
}

export default function Hero({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  return (
    <>
      <HeroBanner />
      <PromoCards onOpenConsultation={onOpenConsultation} />
    </>
  );
}

/** Closing statement, in the slot where the reference states its rating: the original site headline and the client's own figures. */
export function ClosingStatement() {
  return (
    <section className="section-rule container-page py-12 md:py-20">
      <p className="font-display text-3xl font-extrabold leading-tight text-line-strong md:text-6xl">
        Expert Mobile &amp; Laptop Repair Services in Delhi / NCR
      </p>
      <p className="mt-3 text-lg font-semibold text-fg-subtle md:text-2xl">
        {STATS.map((s) => `${s.value} ${s.label}`).join(' · ')}
      </p>
    </section>
  );
}
