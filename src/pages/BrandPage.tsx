import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, ImageOff, Search, Phone, MessageSquare } from 'lucide-react';
import { DEVICE_MODELS } from '../components/devices';

const DeviceImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return <ImageOff className="w-8 h-8 text-slate-500" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full rounded z-10 opacity-80"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

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

export default function BrandPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

  

  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';

  

  const allDevices = DEVICE_MODELS[brandId?.toLowerCase() || ''] || Array.from({ length: 12 }).map((_, i) => ({
    id: `${brandId}-model-${i + 1}`,
    name: `${formattedBrand} Model ${i + 1}`,
    image: undefined as string | undefined
  }));

  

  const categoryFiltered = category 
    ? allDevices.filter(d => {
        const devCat = getDeviceCategory(brandId || '', d.id);
        if (category === 'macbook') {
          return devCat === 'laptop' && d.id.startsWith('macbook');
        }
        return devCat === category;
      })
    : allDevices;

  const filteredDevices = categoryFiltered.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  useEffect(() => {
    const brandExists = brandId ? (brandId.toLowerCase() === 'other' || DEVICE_MODELS.hasOwnProperty(brandId.toLowerCase())) : false;
    if (!brandExists) {
      navigate('/');
    }
  }, [brandId, navigate]);

  if (brandId?.toLowerCase() === 'other') {
    return (
      <div className="min-h-screen bg-[#050B18] pt-20 pb-12 text-slate-200">
        {}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-slate-450 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          {category && (
            <>
              <Link to={`/category/${category}`} className="hover:text-blue-400 transition-colors capitalize">{category}</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
            </>
          )}
          <span className="text-slate-300">Other Brand</span>
        </div>

        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="bg-[#0A1329] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400">
                <Search className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">Brand Not Listed?</h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Don't worry! We repair devices of all brands and models. Connect with our repair experts directly to get instant support, pricing, and book doorstep diagnostics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a 
                href="tel:+919310112994" 
                className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-blue-500/10 transition-all text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Owner</span>
              </a>
              <a
                href={`https://wa.me/919310112994?text=${encodeURIComponent(
                  `Hi! 👋 My device brand/model is not listed under ${category || 'your website'}. I would like to get a repair quote and book doorstep service.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-green-500/10 transition-all text-sm cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Owner</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B18] pt-20 pb-12 text-slate-200">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-slate-450 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-blue-450 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        {category ? (
          <>
            <Link to={`/category/${category}`} className="hover:text-blue-450 transition-colors capitalize">{category}</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
          </>
        ) : (
          <>
            <Link to="/#brands" className="hover:text-blue-450 transition-colors">Brands We Repair</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
          </>
        )}
        <span className="text-slate-300">{formattedBrand}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Select Your {formattedBrand} Model
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Choose your device model to proceed with booking diagnostics and repair.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${formattedBrand} models...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1329] border border-slate-800 text-slate-200 text-sm rounded-2xl py-3.5 px-5 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-500 shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mt-8">
          {filteredDevices.map((device) => (
            <Link
              to={`/repair/${brandId}/${device.id}${category ? `?category=${category}` : ''}`}
              key={device.id}
              className="bg-[#0A1329] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-4 hover:border-blue-500/80 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer shadow-lg"
            >
              <div className="w-20 h-24 sm:w-24 sm:h-28 relative overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-center p-2.5 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="relative w-full h-full flex items-center justify-center">
                  <DeviceImage src={device.image} alt={device.name} />
                </div>
              </div>
              <span className="text-xs font-bold text-slate-300 text-center group-hover:text-blue-400 transition-colors leading-relaxed">
                {device.name}
              </span>
            </Link>
          ))}
          {filteredDevices.length === 0 && (
            <div className="col-span-full text-center py-16 bg-[#0A1329] border border-slate-800/60 rounded-3xl">
              <h3 className="font-bold text-slate-300">No models found</h3>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your search for "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
