import { Award, ChevronRight, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { GALLERY_ITEMS, PROCESS, TECHNICIANS } from '../../content/home';
import { cldVideoStill, cldWidth } from '../../utils/cloudinary';
import { WhatsAppIcon } from '../ui/primitives';

// Picked from the client's own "Why choose us" list. The warranty is left out until the
// 6-month (home/Terms) vs 90-day (service pages) conflict is settled.
const PROMISES = [
  { label: 'Expert technicians', icon: Wrench },
  { label: 'Data security', icon: ShieldCheck },
  { label: 'Doorstep repair service', icon: MapPin },
  { label: '15+ years of experience', icon: Award },
];

/** "Our Promise" brand band, as on the reference. */
export function OurPromise() {
  return (
    <section id="about-us" className="band">
      <div className="container-page grid items-center gap-5 py-8 md:grid-cols-[1fr_2fr] md:gap-6 md:py-12">
        <h2 className="font-display text-4xl font-extrabold uppercase italic leading-none tracking-tight md:text-6xl">
          Our
          <br />
          promise
        </h2>
        <ul className="grid grid-cols-4 items-start gap-1 text-center md:gap-6">
          {PROMISES.map(({ label, icon: Icon }) => (
            <li key={label} className="flex flex-col items-center gap-2 px-0.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 md:h-16 md:w-16">
                <Icon className="h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
              </span>
              <span className="text-[0.6875rem] font-semibold leading-tight sm:text-xs md:text-base">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const person = (name: string) => TECHNICIANS.find((t) => t.name === name)!;

/** Step 1 visual: the real booking channel — a WhatsApp chat — drawn as a tiny phone screen. */
function ChatVisual() {
  return (
    <div className="flex h-full items-center justify-center bg-[linear-gradient(160deg,#eef1fe,#dfe5fb)]">
      <div aria-hidden="true" className="w-[78%] rounded-[1.1rem] bg-ink p-1.5 shadow-lg">
        <div className="rounded-[0.9rem] bg-[#efeae2] p-2.5">
          <p className="mb-2 flex items-center gap-1.5 text-[0.625rem] font-bold text-fg">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-whatsapp text-white"><WhatsAppIcon className="h-2.5 w-2.5" /></span>
            TheMobifixx
          </p>
          <p className="ml-auto w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-2 py-1.5 text-[0.625rem] leading-snug text-fg">
            Hi! I'd like to book a repair for my phone.
          </p>
          <p className="mt-2 rounded-md bg-whatsapp py-1.5 text-center text-[0.625rem] font-bold text-white">Book on WhatsApp</p>
        </div>
      </div>
    </div>
  );
}

function PhotoVisual({ src, alt, blend }: { src: string; alt: string; blend?: boolean }) {
  return blend ? (
    <div className="flex h-full items-end justify-center bg-[linear-gradient(160deg,#eef1fe,#dfe5fb)]">
      <img src={cldWidth(src, 420)} alt={alt} loading="lazy" className="h-[95%] w-auto object-contain object-bottom mix-blend-multiply" />
    </div>
  ) : (
    <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
  );
}

const STEPS = [
  { title: PROCESS[0], text: 'Book online, on WhatsApp or by phone.', visual: <ChatVisual /> },
  { title: PROCESS[1], text: 'We assign a technician for your device.', visual: <PhotoVisual src={person('Suhail Malik').profileImage} alt="TheMobifixx technician" blend /> },
  { title: PROCESS[2], text: 'The technician comes to you, or you visit our workshop.', visual: <PhotoVisual src={person('Sunny Sharma').profileImage} alt="TheMobifixx technician" blend /> },
  { title: PROCESS[3], text: 'Your device is repaired and checked with you.', visual: <PhotoVisual src={cldVideoStill(GALLERY_ITEMS[3].src, 480)} alt="Quality check of a repaired phone" /> },
];

/** "How do we work?" — bordered cards with a large visual and a centred caption, as on the reference. */
export function Process() {
  return (
    <section className="section-rule section container-page">
      <h2 className="h2">How do we work?</h2>
      <p className="sub">Four steps from booking to a working device.</p>
      <ol className="mt-6 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="h-full overflow-hidden rounded-2xl border border-line bg-white">
              <div className="relative aspect-square overflow-hidden">
                {step.visual}
                <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-[0.6875rem] font-bold text-white">Step {i + 1}</span>
              </div>
              <div className="px-3 pb-4 pt-3 text-center">
                <h3 className="font-display text-[0.9375rem] font-bold leading-snug text-fg md:text-lg">{step.title}</h3>
                <p className="mt-1 text-[0.8125rem] leading-snug text-fg-muted md:text-sm">{step.text}</p>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight className="absolute -right-6 top-[38%] hidden h-5 w-5 text-fg-subtle lg:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
