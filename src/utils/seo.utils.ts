import { SEO_CONFIG, ROUTE_SEO_MAP, BASE_ORGANIZATION_SCHEMA, SEOData } from '../config/seo.config';

export function resolvePageSEO(pathname: string): SEOData {
  // Clean trailing slash except root
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // Direct map hit
  if (ROUTE_SEO_MAP[cleanPath]) {
    return ROUTE_SEO_MAP[cleanPath];
  }

  // Dynamic Route: /brand/:brandId
  if (cleanPath.startsWith('/brand/')) {
    const brand = cleanPath.split('/')[2] || 'device';
    const brandName = brand === 'other' ? 'All Brands' : brand.charAt(0).toUpperCase() + brand.slice(1);
    return {
      title: `${brandName} Mobile & Laptop Repair Service in Delhi | TheMobiFixx`,
      description: `Certified ${brandName} repair center at Nehru Place Market, New Delhi. Screen replacement, battery swap, motherboard repair with genuine parts & 90-day warranty. Doorstep service in Delhi NCR.`,
      keywords: `${brand} repair delhi, ${brand} screen repair nehru place, ${brand} battery replacement, certified ${brand} repair center ncr`,
      canonical: `${SEO_CONFIG.domain}${cleanPath}`,
      h1: `${brandName} Repair Services`,
      breadcrumbs: [
        { name: 'Home', item: `${SEO_CONFIG.domain}/` },
        { name: 'Brands', item: `${SEO_CONFIG.domain}/#brands` },
        { name: brandName, item: `${SEO_CONFIG.domain}${cleanPath}` },
      ],
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${brandName} Device Repair`,
          provider: BASE_ORGANIZATION_SCHEMA,
          areaServed: 'Delhi NCR',
          url: `${SEO_CONFIG.domain}${cleanPath}`,
        },
      ],
    };
  }

  // Dynamic Route: /repair/:brandId/:modelId
  if (cleanPath.startsWith('/repair/')) {
    const parts = cleanPath.split('/');
    const brand = parts[2] || '';
    const rawModel = parts[3] || '';
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const modelName = rawModel.replace(/-/g, ' ').toUpperCase();

    return {
      title: `${brandName} ${modelName} Repair in Delhi, Nehru Place | TheMobiFixx`,
      description: `Get expert ${brandName} ${modelName} repair at TheMobiFixx Nehru Place, New Delhi. Screen display replacement, battery swap, liquid damage & logic board repair. Free doorstep pickup!`,
      keywords: `${brand} ${modelName} repair delhi, ${brand} ${modelName} screen replacement, ${brand} ${modelName} battery repair, ${brand} service center nehru place`,
      canonical: `${SEO_CONFIG.domain}${cleanPath}`,
      h1: `${brandName} ${modelName} Repair`,
      breadcrumbs: [
        { name: 'Home', item: `${SEO_CONFIG.domain}/` },
        { name: brandName, item: `${SEO_CONFIG.domain}/brand/${brand}` },
        { name: modelName, item: `${SEO_CONFIG.domain}${cleanPath}` },
      ],
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${brandName} ${modelName} Repair`,
          provider: BASE_ORGANIZATION_SCHEMA,
          areaServed: 'Delhi NCR',
          url: `${SEO_CONFIG.domain}${cleanPath}`,
        },
      ],
    };
  }

  // Dynamic Route: /category/:categoryId
  if (cleanPath.startsWith('/category/')) {
    const category = cleanPath.split('/')[2] || 'device';
    const categoryNames: Record<string, string> = {
      mobile: 'Mobile Phone',
      laptop: 'Laptop',
      macbook: 'MacBook',
      tablet: 'Tablet & iPad',
      watch: 'Smart Watch',
      desktop: 'Desktop & iMac',
    };
    const categoryTitle = categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);

    return {
      title: `${categoryTitle} Repair Service Center in Delhi | TheMobiFixx`,
      description: `Certified ${categoryTitle} repair center at Nehru Place, Delhi. Screen replacement, battery swap, chip-level logic board repairs with 90-day warranty. Free doorstep pickup.`,
      keywords: `${category} repair delhi, ${category} repair center nehru place, ${category} screen replacement, themobifixx ${category}`,
      canonical: `${SEO_CONFIG.domain}${cleanPath}`,
      h1: `${categoryTitle} Repair Service`,
      breadcrumbs: [
        { name: 'Home', item: `${SEO_CONFIG.domain}/` },
        { name: 'Category', item: `${SEO_CONFIG.domain}/#brands` },
        { name: categoryTitle, item: `${SEO_CONFIG.domain}${cleanPath}` },
      ],
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'ServiceCatalog',
          name: `${categoryTitle} Repair Services`,
          url: `${SEO_CONFIG.domain}${cleanPath}`,
        },
      ],
    };
  }

  // Default fallback for any unmatched path
  return {
    title: 'TheMobiFixx | Best Mobile & Laptop Repair in Delhi, Nehru Place',
    description:
      "Delhi NCR's #1 trusted mobile phone and laptop repair center at Nehru Place. Certified chip-level repairs, 90-day warranty, free doorstep pickup.",
    canonical: `${SEO_CONFIG.domain}${cleanPath}`,
    h1: 'Best Mobile & Laptop Repair in Delhi',
    schemas: [BASE_ORGANIZATION_SCHEMA],
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.item,
    })),
  };
}
