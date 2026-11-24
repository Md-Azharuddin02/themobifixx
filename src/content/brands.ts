import type { LucideIcon } from 'lucide-react';
import { Laptop, Monitor, Smartphone, Tablet, Watch } from 'lucide-react';

const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/1a1f2e`;

/** Logo source per brand id. `null` renders a typographic fallback; 'microsoft' renders an inline mark. */
const LOGOS: Record<string, string | null> = {
  apple: icon('apple'),
  samsung: icon('samsung'),
  xiaomi: icon('xiaomi'),
  oneplus: icon('oneplus'),
  vivo: '/vivo.avif',
  oppo: icon('oppo'),
  realme: '/realme.avif',
  motorola: icon('motorola'),
  redmi: null,
  redmipad: icon('xiaomi'),
  poco: '/poco.avif',
  google: icon('google'),
  nothing: '/nothing.avif',
  iqoo: '/iqoo.avif',
  infinix: null,
  nokia: '/nokia.avif',
  hp: icon('hp'),
  intel: icon('intel'),
  dell: icon('dell'),
  msi: icon('msi'),
  lenovo: icon('lenovo'),
  microsoft: 'inline:microsoft',
  alienware: icon('alienware'),
  asus: icon('asus'),
  acer: icon('acer'),
  other: null,
};

export interface BrandEntry {
  id: string;
  name: string;
  logo: string | null;
}

const b = (id: string, name: string): BrandEntry => ({ id, name, logo: LOGOS[id] ?? null });

export type CategoryId = 'mobile' | 'laptop' | 'macbook' | 'tablet' | 'watch' | 'desktop';

export interface Category {
  id: CategoryId;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  /** Line shown under the brand grid on the home page (existing copy). */
  note: string;
  brands: BrandEntry[];
}

export const CATEGORIES: Record<CategoryId, Category> = {
  mobile: {
    id: 'mobile',
    title: 'Mobile Phone',
    shortTitle: 'Mobile',
    icon: Smartphone,
    note: 'We repair/fix 36,000+ Mobiles in warranty and out of warranty.',
    brands: [
      b('apple', 'Apple'), b('samsung', 'Samsung'), b('xiaomi', 'Xiaomi'), b('oneplus', 'OnePlus'),
      b('vivo', 'Vivo'), b('oppo', 'Oppo'), b('realme', 'Realme'), b('motorola', 'Motorola'),
      b('redmi', 'Redmi'), b('poco', 'Poco'), b('google', 'Google Pixel'), b('nothing', 'Nothing'),
      b('iqoo', 'Iqoo'), b('infinix', 'Infinix'), b('nokia', 'Nokia'), b('other', 'Other'),
    ],
  },
  laptop: {
    id: 'laptop',
    title: 'Laptop',
    shortTitle: 'Laptop',
    icon: Laptop,
    note: 'We repair out of warranty devices of all major brands',
    brands: [
      b('apple', 'Macbook'), b('hp', 'HP'), b('intel', 'Intel'), b('dell', 'Dell'), b('msi', 'MSI'),
      b('lenovo', 'Lenovo'), b('microsoft', 'Microsoft'), b('samsung', 'Samsung'), b('alienware', 'Alienware'),
      b('asus', 'Asus'), b('acer', 'Acer'), b('other', 'Other'),
    ],
  },
  macbook: {
    id: 'macbook',
    title: 'MacBook',
    shortTitle: 'Mac',
    icon: Laptop,
    note: 'We repair out of warranty devices of all major brands',
    brands: [b('apple', 'Apple')],
  },
  tablet: {
    id: 'tablet',
    title: 'Tablet',
    shortTitle: 'Tablet',
    icon: Tablet,
    note: 'We repair out of warranty devices of all major brands',
    brands: [
      b('apple', 'Ipads'), b('lenovo', 'Lenovo'), b('xiaomi', 'Xiaomi'), b('realme', 'Realme'),
      b('samsung', 'Samsung'), b('redmipad', 'Redmi Pad'), b('other', 'Other'),
    ],
  },
  watch: {
    id: 'watch',
    title: 'Smart Watch',
    shortTitle: 'Smart Watch',
    icon: Watch,
    note: 'We repair out of warranty devices of all major brands',
    brands: [b('apple', 'Apple Watch'), b('samsung', 'Samsung Watch'), b('other', 'Other')],
  },
  desktop: {
    id: 'desktop',
    title: 'Desktop / iMac',
    shortTitle: 'Desktop',
    icon: Monitor,
    note: 'We repair out of warranty devices of all major brands',
    brands: [
      b('apple', 'Apple iMac / Mac Mini'), b('dell', 'Dell PC'), b('hp', 'HP PC'), b('lenovo', 'Lenovo PC'), b('other', 'Other'),
    ],
  },
};

/** Order of the device tabs on the home page (matches the original home sections). */
export const HOME_CATEGORIES: CategoryId[] = ['mobile', 'laptop', 'tablet', 'watch'];

export const brandHref = (brandId: string, category: CategoryId) => `/brand/${brandId}?category=${category}`;
