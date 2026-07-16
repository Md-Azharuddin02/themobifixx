import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Laptop, Tablet, Watch } from 'lucide-react';

const MicrosoftSVG = () => (
    <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <rect x="0" y="0" width="11" height="11" fill="#F25022" />
        <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
        <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
        <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
    </svg>
);

const CATEGORY_DATA = {
    mobile: {
        title: 'Mobile Phone',
        icon: Smartphone,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/fff', path: '/brand/xiaomi' },
            { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus/fff', path: '/brand/oneplus' },
            { name: 'Vivo', logo: 'https://cdn.simpleicons.org/vivo/fff', path: '/brand/vivo' },
            { name: 'Oppo', logo: 'https://cdn.simpleicons.org/oppo/fff', path: '/brand/oppo' },
            { name: 'Realme', logo: 'https://cdn.simpleicons.org/realme/fff', path: '/brand/realme' },
            { name: 'Motorola', logo: 'https://cdn.simpleicons.org/motorola/fff', path: '/brand/motorola' },
            { name: 'Redmi', logo: 'https://cdn.simpleicons.org/redmi/fff', path: '/brand/redmi' },
            { name: 'Poco', logo: 'https://cdn.simpleicons.org/poco/fff', path: '/brand/poco' },
            { name: 'Google Pixel', logo: 'https://cdn.simpleicons.org/google/fff', path: '/brand/google' },
            { name: 'Nothing', logo: 'https://cdn.simpleicons.org/nothing/fff', path: '/brand/nothing' },
            { name: 'Iqoo', logo: 'https://cdn.simpleicons.org/iqoo/fff', path: '/brand/iqoo' },
            { name: 'Infinix', logo: 'https://cdn.simpleicons.org/infinix/fff', path: '/brand/infinix' },
            { name: 'Nokia', logo: 'https://cdn.simpleicons.org/nokia/fff', path: '/brand/nokia' },
            { name: 'Other', logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>', path: '/brand/other' }
        ]
    },
    laptop: {
        title: 'Laptop',
        icon: Laptop,
        brands: [
            { name: 'Macbook', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple' },
            { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/fff', path: '/brand/hp' },
            { name: 'Intel', logo: 'https://cdn.simpleicons.org/intel/fff', path: '/brand/intel' },
            { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/fff', path: '/brand/dell' },
            { name: 'MSI', logo: 'https://cdn.simpleicons.org/msi/fff', path: '/brand/msi' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/fff', path: '/brand/lenovo' },
            { name: 'Microsoft', logo: 'svgInline:microsoft', path: '/brand/microsoft' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung' },
            { name: 'Alienware', logo: 'https://cdn.simpleicons.org/alienware/fff', path: '/brand/alienware' },
            { name: 'Asus', logo: 'https://cdn.simpleicons.org/asus/fff', path: '/brand/asus' },
            { name: 'Acer', logo: 'https://cdn.simpleicons.org/acer/fff', path: '/brand/acer' },
            { name: 'Other', logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>', path: '/brand/other' }
        ]
    },
    macbook: {
        title: 'MacBook',
        icon: Laptop,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple' },
        ]
    },
    tablet: {
        title: 'Tablet',
        icon: Tablet,
        brands: [
            { name: 'Ipads', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/fff', path: '/brand/lenovo' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/fff', path: '/brand/xiaomi' },
            { name: 'Realme', logo: '/realme.avif', path: '/brand/realme' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung' },
            { name: 'Redmi Pad', logo: 'https://cdn.simpleicons.org/xiaomi/fff', path: '/brand/redmipad' },
            { name: 'Other', logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>', path: '/brand/other' }
        ]
    },
    watch: {
        title: 'Smart Watch',
        icon: Watch,
        brands: [
            { name: 'Apple Watch', logo: 'https://cdn.simpleicons.org/apple/fff', path: '/brand/apple' },
            { name: 'Samsung Watch', logo: 'https://cdn.simpleicons.org/samsung/fff', path: '/brand/samsung' },
            { name: 'Other', logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>', path: '/brand/other' }
        ]
    },
};

export default function CategoryPage() {
    const { categoryId } = useParams<{ categoryId: keyof typeof CATEGORY_DATA }>();
    const category = categoryId ? CATEGORY_DATA[categoryId] : null;

    if (!category) {
        return (
            <div className="pt-32 text-center bg-[#050B18] min-h-screen text-slate-200">
                <h2 className="text-xl font-bold text-white">Category not found.</h2>
                <Link to="/" className="text-blue-450 hover:underline mt-4 inline-block">Return to Home</Link>
            </div>
        );
    }

    const { title, brands } = category;

    return (
        <div className="min-h-screen bg-[#050B18] pt-24 pb-20 text-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-slate-450 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-slate-650 shrink-0" />
                <span className="text-slate-300">Select Brand</span>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
                <h1 className="text-3xl font-bold text-white mb-4">Choose Your {title} Brand</h1>
                <p className="text-sm text-slate-400 mb-12">Select the brand of your device to see available models for repair.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <Link
                            to={`${brand.path}?category=${categoryId}`}
                            key={brand.name}
                            className="bg-[#0A1329] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-slate-700 hover:bg-[#0E1B38] hover:shadow-2xl transition-all group cursor-pointer"
                        >
                            {brand.logo === 'svgInline:microsoft' ? (
                                <MicrosoftSVG />
                            ) : (
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="h-10 w-auto object-contain transition-all duration-300"
                                    style={{
                                        filter: brand.name === 'Vivo'
                                            ? 'none'
                                            : brand.logo.includes('simpleicons.org')
                                                ? 'none'
                                                : 'grayscale(1) invert(1) brightness(2)'
                                    }}
                                />
                            )}
                            <span className="text-sm font-bold text-slate-300 text-center group-hover:text-blue-400 transition-colors">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}