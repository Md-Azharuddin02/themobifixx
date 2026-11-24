import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Phone, Search, Smartphone } from 'lucide-react';
import { DEVICE_MODELS } from '../components/devices';
import { CONTACT, waLink } from '../config/contact';
import PageHeader from '../components/ui/PageHeader';
import { WhatsAppIcon, type Crumb } from '../components/ui/primitives';
import { cldWidth } from '../utils/cloudinary';

function DeviceImage({ src, alt }: { src?: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  useEffect(() => setHasError(false), [src]);

  if (!src || hasError) return <Smartphone className="h-8 w-8 text-line-strong" aria-hidden="true" />;
  return <img src={cldWidth(src, 240)} alt={alt} loading="lazy" decoding="async" onError={() => setHasError(true)} className="h-full w-full object-contain" />;
}

const getDeviceCategory = (brandId: string, modelId: string): string => {
  const brand = brandId.toLowerCase();
  const model = modelId.toLowerCase();

  if (
    model.includes('desktop') ||
    model.startsWith('imac') ||
    model.startsWith('mac-mini') ||
    model.startsWith('mac-studio') ||
    model.includes('thinkcentre') ||
    model.includes('ideacentre') ||
    model.includes('optiplex')
  ) {
    return 'desktop';
  }

  if (brand === 'apple') {
    if (model.startsWith('ipad')) return 'tablet';
    if (model.startsWith('macbook')) return 'laptop';
    if (model.includes('watch')) return 'watch';
    return 'mobile';
  }
  if (brand === 'samsung') {
    if (model.includes('tab')) return 'tablet';
    if (model.includes('watch')) return 'watch';
    if (model.includes('book') || model.includes('laptop')) return 'laptop';
    return 'mobile';
  }
  if (brand === 'lenovo') {
    if (model.includes('tab')) return 'tablet';
    return 'laptop';
  }
  if (brand === 'asus') {
    if (model.includes('phone')) return 'mobile';
    return 'laptop';
  }
  if (brand === 'microsoft') {
    if (model.includes('laptop')) return 'laptop';
    return 'tablet';
  }
  if (['xiaomi', 'realme', 'redmipad'].includes(brand)) {
    if (model.includes('pad')) return 'tablet';
    return 'mobile';
  }
  if (['hp', 'dell', 'acer', 'intel', 'msi', 'nvidia', 'alienware'].includes(brand)) {
    return 'laptop';
  }
  return 'mobile';
};

export default function BrandPage({ brandOverride, categoryOverride }: { brandOverride?: string; categoryOverride?: string } = {}) {
  const { brandId: paramsBrandId } = useParams();
  const brandId = brandOverride || paramsBrandId;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = categoryOverride || searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';

  const allDevices =
    DEVICE_MODELS[brandId?.toLowerCase() || ''] ||
    Array.from({ length: 12 }).map((_, i) => ({ id: `${brandId}-model-${i + 1}`, name: `${formattedBrand} Model ${i + 1}`, image: undefined as string | undefined }));

  const categoryFiltered = category
    ? allDevices.filter((d) => {
        const devCat = getDeviceCategory(brandId || '', d.id);
        if (category === 'macbook') return devCat === 'laptop' && d.id.startsWith('macbook');
        return devCat === category;
      })
    : allDevices;

  const filteredDevices = categoryFiltered.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const brandExists = brandId ? brandId.toLowerCase() === 'other' || Object.prototype.hasOwnProperty.call(DEVICE_MODELS, brandId.toLowerCase()) : false;
    if (!brandExists) navigate('/');
  }, [brandId, navigate]);

  const crumbs: Crumb[] = [
    { label: 'Home', to: '/' },
    category ? { label: category, to: `/category/${category}` } : { label: 'Brands We Repair', to: '/?scroll=brands' },
    { label: brandId?.toLowerCase() === 'other' ? 'Other Brand' : formattedBrand },
  ];

  if (brandId?.toLowerCase() === 'other') {
    return (
      <>
        <PageHeader
          crumbs={crumbs}
          step={2}
          title="Brand Not Listed?"
          intro="Don't worry! We repair devices of all brands and models. Connect with our repair experts directly to get instant support, pricing, and book doorstep diagnostics."
        >
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={CONTACT.phoneHref} className="btn btn-dark">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call Owner
            </a>
            <a
              href={waLink(`Hi! 👋 My device brand/model is not listed under ${category || 'your website'}. I would like to get a repair quote and book doorstep service.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon /> WhatsApp Owner
            </a>
          </div>
        </PageHeader>
        <div className="h-16" />
      </>
    );
  }

  const notListedHref = waLink(
    `Hi! 👋 I have a ${formattedBrand} ${category || 'device'} that is not listed on your website model list. I would like to get a repair quote and book doorstep service.`,
  );

  return (
    <>
      <PageHeader crumbs={crumbs} step={3} title={`Select Your ${formattedBrand} Model`} intro="Choose your device model to proceed with booking diagnostics and repair.">
        <div className="relative mt-6 max-w-md">
          <label htmlFor="model-search" className="sr-only">Search {formattedBrand} models</label>
          <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-fg-subtle" aria-hidden="true" />
          <input
            id="model-search"
            type="search"
            placeholder={`Search ${formattedBrand} models...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="field-input pl-10"
          />
        </div>
        <p className="mt-2 text-sm text-fg-subtle" role="status">
          {filteredDevices.length} model{filteredDevices.length === 1 ? '' : 's'}
        </p>
      </PageHeader>

      <div className="container-page py-10 md:py-14">
        {filteredDevices.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredDevices.map((device) => (
              <li key={device.id}>
                <Link
                  to={`/repair/${brandId}/${device.id}${category ? `?category=${category}` : ''}`}
                  className="card group flex h-full flex-col items-center gap-3 p-4 text-center transition-colors hover:border-accent"
                >
                  <span className="flex h-24 w-20 items-center justify-center md:h-28 md:w-24">
                    <DeviceImage src={device.image} alt="" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-fg group-hover:text-accent">{device.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <a href={notListedHref} target="_blank" rel="noopener noreferrer" className="card flex h-full flex-col items-center justify-center gap-3 p-4 text-center transition-colors hover:border-whatsapp">
                <span className="flex h-24 w-20 items-center justify-center md:h-28 md:w-24">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                </span>
                <span className="text-sm font-medium text-fg">Other / Not Listed</span>
              </a>
            </li>
          </ul>
        ) : (
          <div className="card px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">No models found</h2>
            <p className="mt-2 text-sm text-fg-muted">Try adjusting your search for “{searchQuery}”.</p>
            <a
              href={waLink(`Hi! 👋 My ${formattedBrand} ${category || 'device'} is not listed under keyword "${searchQuery}". I would like to get a repair quote and check availability.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-6"
            >
              <WhatsAppIcon /> Contact via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
