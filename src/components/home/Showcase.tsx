import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { GALLERY_ITEMS, TECHNICIANS } from '../../content/home';
import { cldVideoStill, cldWidth } from '../../utils/cloudinary';

/** Testimonial slot on the reference. We have no published reviews, so this shows real repair videos instead. */
export function Gallery() {
  return (
    <section id="gallery" className="section-rule section container-page">
      <h2 className="h2">Real repairs from our workshop</h2>
      <p className="sub">Filmed at our Nehru Place workshop.</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5 lg:grid-cols-4">
        {GALLERY_ITEMS.map((g) => (
          <li key={g.src} className="min-w-0">
            <video
              src={g.src}
              poster={cldVideoStill(g.src, 480)}
              controls
              playsInline
              preload="none"
              className="aspect-[3/4] w-full rounded-xl bg-ink object-cover md:aspect-[4/5]"
            >
              <track kind="captions" />
            </video>
            <p className="mt-2 font-display text-[0.9375rem] font-bold leading-snug text-fg">{g.title}</p>
            <p className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-snug text-fg-muted md:text-sm">{g.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const AUTOPLAY_MS = 3500;
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Team carousel styled like the reference's customer cards. Auto-advances; any touch, hover or focus pauses it. */
export function Technicians() {
  const row = useRef<HTMLUListElement>(null);
  const lastTouch = useRef(0);
  const hovering = useRef(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [playing, setPlaying] = useState(() => !reducedMotion());

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const stepWidth = () => {
    const card = row.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 12 : 0;
  };

  // Move one card; wrap to the first card after the last.
  const go = (dir: 1 | -1) => {
    const el = row.current;
    const step = stepWidth();
    if (!el || !step) return;
    const atEnd = el.scrollLeft + el.clientWidth > el.scrollWidth - 8;
    const target = dir === 1 && atEnd ? 0 : (Math.round(el.scrollLeft / step) + dir) * step;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      const idle = Date.now() - lastTouch.current > 6000;
      if (idle && !hovering.current && !document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [playing]);

  const touched = () => {
    lastTouch.current = Date.now();
  };
  const ctl = 'flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-fg transition-colors hover:border-accent hover:text-accent disabled:opacity-35 disabled:hover:border-line-strong disabled:hover:text-fg';

  return (
    <section id="technicians" className="section-rule section container-page">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="h2">Meet our technicians</h2>
          <p className="sub">The people who repair your device.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={`${ctl} hidden sm:flex`} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause automatic scrolling' : 'Start automatic scrolling'}>
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
          <button type="button" className={ctl} onClick={() => { touched(); go(-1); }} disabled={edge.start} aria-label="Previous technician" aria-controls="technicians-row">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" className={ctl} onClick={() => { touched(); go(1); }} aria-label="Next technician" aria-controls="technicians-row">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        id="technicians-row"
        ref={row}
        tabIndex={0}
        aria-label="Technicians, scroll sideways"
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') hovering.current = true; }}
        onPointerLeave={() => { hovering.current = false; }}
        onTouchStart={touched}
        onWheel={touched}
        onKeyDown={touched}
        onFocus={touched}
        className="swipe-row mt-6 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {TECHNICIANS.map((t) => (
          <li key={t.name} className="relative w-[70%] overflow-hidden rounded-xl bg-paper-2 sm:w-[44%] md:w-[30%] lg:w-[23%]">
            <img src={cldWidth(t.profileImage, 480)} alt={t.name} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent px-3.5 pb-3.5 pt-14 text-white">
              <p className="font-display text-base font-bold leading-tight md:text-lg">{t.name}</p>
              <p className="mt-1 text-xs text-white/85">
                <span className="font-semibold text-white">{t.isOwner ? 'Founder' : 'Technician'}</span> · {t.experience}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
