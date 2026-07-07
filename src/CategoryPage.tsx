import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Laptop, Tablet, Watch, Headphones } from 'lucide-react';

const CATEGORY_DATA = {
    mobile: {
        title: 'Mobile Phone',
        icon: Smartphone,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000', path: '/brand/apple' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000', path: '/brand/samsung' },
            { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus/000', path: '/brand/oneplus' },
            { name: 'Google', logo: 'https://cdn.simpleicons.org/google/000', path: '/brand/google' },
            { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/000', path: '/brand/xiaomi' },
            { name: 'Vivo', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.svg', path: '/brand/vivo' },
            { name: 'Oppo', logo: 'https://cdn.simpleicons.org/oppo/000', path: '/brand/oppo' },
            { name: 'Realme', logo: 'https://cdn.simpleicons.org/realme/000', path: '/brand/realme' },
        ]
    },
    laptop: {
        title: 'Laptop',
        icon: Laptop,
        brands: [
            { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/000', path: '/brand/hp' },
            { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/000', path: '/brand/dell' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/000', path: '/brand/lenovo' },
            { name: 'Asus', logo: 'https://cdn.simpleicons.org/asus/000', path: '/brand/asus' },
            { name: 'Acer', logo: 'https://cdn.simpleicons.org/acer/000', path: '/brand/acer' },
            { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft/000', path: '/brand/microsoft' },
        ]
    },
    macbook: {
        title: 'MacBook',
        icon: Laptop,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000', path: '/brand/apple' },
        ]
    },
    tablet: {
        title: 'Tablet',
        icon: Tablet,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000', path: '/brand/apple' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000', path: '/brand/samsung' },
            { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/000', path: '/brand/lenovo' },
        ]
    },
    watch: {
        title: 'Smart Watch',
        icon: Watch,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000', path: '/brand/apple' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000', path: '/brand/samsung' },
        ]
    },
    earbuds: {
        title: 'Earbuds',
        icon: Headphones,
        brands: [
            { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000', path: '/brand/apple' },
            { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000', path: '/brand/samsung' },
            { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus/000', path: '/brand/oneplus' },
        ]
    },
};

export default function CategoryPage() {
    const { categoryId } = useParams<{ categoryId: keyof typeof CATEGORY_DATA }>();
    const category = categoryId ? CATEGORY_DATA[categoryId] : null;

    if (!category) {
        return <div className="pt-32 text-center">Category not found.</div>;
    }

    const { title, brands } = category;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-medium text-gray-500 flex items-center gap-2">
                <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-900">Select Brand</span>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your {title} Brand</h1>
                <p className="text-sm text-gray-500 mb-12">Select the brand of your device to see available models for repair.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <Link
                            to={brand.path}
                            key={brand.name}
                            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-orange-200 hover:shadow-md transition-all group cursor-pointer"
                        >
                            <img
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                className="h-10 w-auto object-contain"
                                style={{ filter: brand.name === 'Vivo' ? 'none' : 'grayscale(1) brightness(0.5)' }}
                            />
                            <span className="text-sm font-bold text-gray-700 text-center group-hover:text-brand-orange transition-colors">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}