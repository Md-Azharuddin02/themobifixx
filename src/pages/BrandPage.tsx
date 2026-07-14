import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, ImageOff, Search } from 'lucide-react';
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
  
  if (brand === 'apple') {
    if (model.startsWith('ipad')) return 'tablet';
    if (model.startsWith('macbook')) return 'laptop';
    return 'mobile';
  }
  if (brand === 'samsung') {
    if (model.includes('tab')) return 'tablet';
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
  if (['xiaomi', 'realme'].includes(brand)) {
    if (model.includes('pad')) return 'tablet';
    return 'mobile';
  }
  if (['hp', 'dell', 'acer', 'intel', 'msi', 'nvidia'].includes(brand)) {
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

  // Format brand name for display
  const formattedBrand = brandId ? brandId.charAt(0).toUpperCase() + brandId.slice(1) : '';

  // Use mock apple data or generate generic mock data for other brands
  const allDevices = DEVICE_MODELS[brandId?.toLowerCase() || ''] || Array.from({ length: 12 }).map((_, i) => ({
    id: `${brandId}-model-${i + 1}`,
    name: `${formattedBrand} Model ${i + 1}`,
    image: undefined as string | undefined
  }));

  // Filter by category if query param is set
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

  // Redirect if brand doesn't exist
  useEffect(() => {
    const brandExists = brandId ? DEVICE_MODELS.hasOwnProperty(brandId.toLowerCase()) : false;
    if (!brandExists) {
      navigate('/');
    }
  }, [brandId, navigate]);

  return (
    <div className="min-h-screen bg-[#050B18] pt-20 pb-12 text-slate-200">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-slate-450 flex items-center gap-2">
        <Link to="/" className="hover:text-blue-450 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        {category ? (
          <>
            <Link to={`/category/${category}`} className="hover:text-blue-450 transition-colors capitalize">{category}</Link>
            <ChevronRight className="w-3 h-3" />
          </>
        ) : (
          <>
            <Link to="/#brands" className="hover:text-blue-450 transition-colors">Brands We Repair</Link>
            <ChevronRight className="w-3 h-3" />
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
