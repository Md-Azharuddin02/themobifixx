import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Battery, BatteryCharging, Check, CircleDashed, Cpu, Database, HardDrive, HelpCircle, Keyboard, Maximize, Mic,
  Monitor, Settings, Smartphone, Speaker, Wifi, X,
} from 'lucide-react';
import { waLink } from '../config/contact';
import PageHeader from '../components/ui/PageHeader';
import { WhatsAppIcon, type Crumb } from '../components/ui/primitives';

const LAPTOP_SERVICES = [
  { id: 'laptop-screen', name: 'Screen Replacement', icon: Monitor },
  { id: 'ram-upgrade', name: 'RAM Upgrade', icon: Cpu },
  { id: 'ssd-installation', name: 'SSD Upgrade / Installation', icon: HardDrive },
  { id: 'keyboard-repair', name: 'Keyboard / Trackpad Repair', icon: Keyboard },
  { id: 'laptop-battery', name: 'Battery Replacement', icon: Battery },
  { id: 'laptop-charging', name: 'Charging Port & Jack Repair', icon: BatteryCharging },
  { id: 'software-installation', name: 'Software & OS Installation', icon: Settings },
  { id: 'data-recovery', name: 'Data Backup & Recovery', icon: Database },
  { id: 'laptop-other', name: 'Other Issues (Body/Hinges/Overheating)', icon: HelpCircle },
];

const MOBILE_SERVICES = [
  { id: 'screen-replacement', name: 'Screen Replacement', icon: Maximize },
  { id: 'back-glass', name: 'Back Glass Replacement', icon: CircleDashed },
  { id: 'battery', name: 'Battery Replacement', icon: Battery },
  { id: 'charging-port', name: 'Charging Port Replacement', icon: Smartphone },
  { id: 'camera-repair', name: 'Camera Repair', icon: CircleDashed },
  { id: 'speaker', name: 'Speaker Repair', icon: Speaker },
  { id: 'mic', name: 'Mic Repair', icon: Mic },
  { id: 'wifi', name: 'Wifi/Bluetooth Issue', icon: Wifi },
  { id: 'mobile-other', name: 'Other Issue / Upgrades', icon: HelpCircle },
];

const TABLET_SERVICES = [
  { id: 'tablet-screen', name: 'Screen Replacement', icon: Monitor },
  { id: 'tablet-battery', name: 'Battery Replacement', icon: Battery },
  { id: 'tablet-charging', name: 'Charging Port Repair', icon: BatteryCharging },
  { id: 'tablet-speaker', name: 'Speaker & Mic Repair', icon: Speaker },
  { id: 'tablet-other', name: 'Other Software or Hardware Issue', icon: HelpCircle },
];

const WATCH_SERVICES = [
  { id: 'watch-screen', name: 'Screen & Touch Glass Repair', icon: Monitor },
  { id: 'watch-battery', name: 'Battery Replacement', icon: Battery },
  { id: 'watch-charging', name: 'Charging Port / Wireless Charger', icon: BatteryCharging },
  { id: 'watch-buttons', name: 'Physical Button Repair (Crown/Side)', icon: Settings },
  { id: 'watch-sensor', name: 'Sensor & Back Glass Repair', icon: HelpCircle },
  { id: 'watch-other', name: 'Other Watch Issues', icon: HelpCircle },
];

const DESKTOP_SERVICES = [
  { id: 'desktop-screen', name: 'iMac Screen Replacement', icon: Monitor },
  { id: 'desktop-ram', name: 'RAM Upgrade / Replacement', icon: Cpu },
  { id: 'desktop-ssd', name: 'SSD / HDD Storage Upgrade', icon: HardDrive },
  { id: 'desktop-logicboard', name: 'Motherboard / Logic Board Repair', icon: Cpu },
  { id: 'desktop-psu', name: 'Power Supply (PSU) Replacement', icon: BatteryCharging },
  { id: 'desktop-gpu', name: 'Graphics Card (GPU) Upgrade', icon: HardDrive },
  { id: 'desktop-cleaning', name: 'Deep Dust Cleaning & Thermal Pasting', icon: Settings },
  { id: 'desktop-os', name: 'OS Reinstallation & Software Cleanup', icon: Settings },
  { id: 'desktop-data', name: 'Data Recovery & Backup', icon: Database },
  { id: 'desktop-other', name: 'Other Hardware/Software Issue', icon: HelpCircle },
];

const getDeviceType = (brand: string, model: string, queryCategory: string | null): 'laptop' | 'mobile' | 'tablet' | 'watch' | 'desktop' => {
  if (queryCategory) {
    const cat = queryCategory.toLowerCase();
    if (cat === 'desktop') return 'desktop';
    if (cat === 'macbook' || cat === 'laptop') return 'laptop';
    if (cat === 'tablet') return 'tablet';
    if (cat === 'watch') return 'watch';
    return 'mobile';
  }
  const b = brand.toLowerCase();
  const m = model.toLowerCase();

  if (m.includes('desktop') || m.startsWith('imac') || m.startsWith('mac-mini') || m.startsWith('mac-studio') || m.includes('thinkcentre') || m.includes('ideacentre') || m.includes('optiplex')) {
    return 'desktop';
  }
  if (b === 'apple') {
    if (m.startsWith('macbook')) return 'laptop';
    if (m.startsWith('ipad')) return 'tablet';
    if (m.includes('watch')) return 'watch';
    return 'mobile';
  }
  if (b === 'samsung') {
    if (m.includes('tab')) return 'tablet';
    if (m.includes('watch')) return 'watch';
    return 'mobile';
  }
  if (b === 'lenovo') return m.includes('tab') ? 'tablet' : 'laptop';
  if (b === 'asus') return m.includes('phone') ? 'mobile' : 'laptop';
  if (b === 'microsoft') return m.includes('laptop') ? 'laptop' : 'tablet';
  if (['xiaomi', 'realme', 'redmipad'].includes(b)) return m.includes('pad') ? 'tablet' : 'mobile';
  if (['hp', 'dell', 'acer', 'intel', 'msi', 'nvidia', 'alienware'].includes(b)) return 'laptop';
  return 'mobile';
};

const SERVICES_BY_TYPE = { desktop: DESKTOP_SERVICES, laptop: LAPTOP_SERVICES, tablet: TABLET_SERVICES, watch: WATCH_SERVICES, mobile: MOBILE_SERVICES };

export default function DeviceRepairPage() {
  const { brandId, modelId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [selected, setSelected] = useState<string[]>([]);

  const activeServices = SERVICES_BY_TYPE[getDeviceType(brandId || '', modelId || '', category)];

  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';
  const formattedModel = modelId ? modelId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Device';

  const selectedServices = selected.map((id) => activeServices.find((s) => s.id === id)).filter((s) => !!s);
  const whatsappHref = waLink(
    `Hi, I want to repair my ${formattedBrand} ${formattedModel}. Issues: ${selectedServices.map((s) => s.name).join(', ') || 'None selected'}`,
  );

  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  const crumbs: Crumb[] = [
    { label: 'Home', to: '/' },
    ...(category
      ? [{ label: category, to: `/category/${category}` }, { label: formattedBrand, to: `/brand/${brandId}?category=${category}` }]
      : [{ label: 'Brands', to: '/?scroll=brands' }, { label: formattedBrand, to: `/brand/${brandId}` }]),
    { label: formattedModel },
  ];

  const sendButton = (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={selected.length === 0}
      onClick={(e) => selected.length === 0 && e.preventDefault()}
      className="btn btn-whatsapp w-full"
    >
      <WhatsAppIcon /> Send WhatsApp Inquiry
    </a>
  );

  return (
    <>
      <PageHeader crumbs={crumbs} step={4} title={`${formattedModel} Repair Services`} intro="Select every issue your device has. We'll send the list to our technicians on WhatsApp." />

      <div className="container-page grid gap-10 pb-32 pt-10 md:pt-14 lg:grid-cols-12 lg:pb-20">
        <fieldset className="lg:col-span-8">
          <legend className="mb-3 text-sm font-semibold text-fg-muted">{selected.length} of {activeServices.length} selected</legend>
          <ul className="grid gap-3 sm:grid-cols-2">
            {activeServices.map((service) => {
              const isOn = selected.includes(service.id);
              return (
                <li key={service.id}>
                  <label className={`card flex cursor-pointer items-center gap-4 p-4 transition-colors ${isOn ? '!border-accent bg-accent-soft' : 'hover:border-line-strong'}`}>
                    <input type="checkbox" checked={isOn} onChange={() => toggle(service.id)} className="peer sr-only" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-fg">{service.name}</span>
                      <span className="block text-sm text-fg-subtle">Doorstep Diagnostics &amp; Setup</span>
                    </span>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                        isOn ? 'border-accent bg-accent text-white' : 'border-line-strong bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isOn && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <aside className="hidden lg:col-span-4 lg:block" aria-label="Your list of issues">
          <div className="card sticky top-24 p-6">
            <h2 className="text-lg font-semibold">Your List of Issues</h2>
            <p className="mt-0.5 text-sm text-fg-subtle">{formattedBrand} · {formattedModel}</p>
            <div className="my-5 min-h-32 border-y border-line py-3">
              {selectedServices.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-6 text-center">
                  <Smartphone className="h-7 w-7 text-line-strong" aria-hidden="true" />
                  <p className="mt-2 text-sm font-medium">No repairs selected yet.</p>
                  <p className="mt-1 max-w-[14rem] text-sm text-fg-subtle">Choose one or more issues from the left to request diagnostics.</p>
                </div>
              ) : (
                <ul>
                  {selectedServices.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                      <span>{s.name}</span>
                      <button type="button" onClick={() => toggle(s.id)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-subtle hover:bg-paper-2 hover:text-fg" aria-label={`Remove ${s.name}`}>
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {sendButton}
          </div>
        </aside>
      </div>

      {/* Mobile summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <p className="min-w-0 flex-1 whitespace-nowrap text-sm" aria-live="polite">
            <span className="font-semibold">{selected.length}</span> selected
          </p>
          <div className="shrink-0">{sendButton}</div>
        </div>
      </div>
    </>
  );
}
