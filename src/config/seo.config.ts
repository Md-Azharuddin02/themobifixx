export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  robots?: string;
  h1?: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
  schemas?: object[];
}

export const SEO_CONFIG = {
  siteName: 'TheMobifixx',
  alternateNames: ['The Mobi Fixx', 'TheMobiFixx.com', 'TheMobiFixx Repair', 'TheMobiFixx Delhi'],
  domain: 'https://themobifixx.com',
  logo: 'https://res.cloudinary.com/dzhsxv2wq/image/upload/v1784028396/WhatsApp_Image_2026-07-14_at_4.48.50_PM_1_rfu6xy.jpg',
  defaultOgImage: 'https://themobifixx.com/og-cover.jpg',
  phone: '+91-9310112994',
  displayPhone: '+91 9310112994',
  email: 'themobifixx@gmail.com',
  address: {
    streetAddress: 'G-12, Ground Floor, Nehru Place Market',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110019',
    addressCountry: 'IN',
    landmark: 'Near Blue Dart',
  },
  geo: {
    latitude: 28.5494,
    longitude: 77.2513,
  },
  hasMap: 'https://maps.google.com/maps?q=28.5494,77.2513',
  priceRange: '₹₹',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '23:59',
    },
  ],
  socialProfiles: {
    instagram: 'https://www.instagram.com/The_mobifixx',
    youtube: 'https://youtube.com/@themobifixx?si=dO7H-G9hVmKg2i7E',
    whatsapp: 'https://wa.me/919310112994',
  },
  serviceAreas: [
    'Nehru Place',
    'South Delhi',
    'West Delhi',
    'Connaught Place',
    'East Delhi',
    'Laxmi Nagar',
    'North Delhi',
    'Model Town',
    'Noida',
    'Ghaziabad',
    'Indirapuram',
    'Greater Noida',
    'Faridabad',
    'Gurugram',
  ],
};

// Base Schemas
export const BASE_WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_CONFIG.domain}/#website`,
  name: SEO_CONFIG.siteName,
  alternateName: SEO_CONFIG.alternateNames,
  url: SEO_CONFIG.domain,
  description: "Delhi NCR's #1 certified mobile phone and laptop repair center at Nehru Place, New Delhi.",
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SEO_CONFIG.domain}/services?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const BASE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO_CONFIG.domain}/#organization`,
  name: SEO_CONFIG.siteName,
  alternateName: SEO_CONFIG.alternateNames,
  url: SEO_CONFIG.domain,
  logo: SEO_CONFIG.logo,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SEO_CONFIG.phone,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  sameAs: [SEO_CONFIG.socialProfiles.instagram, SEO_CONFIG.socialProfiles.youtube, SEO_CONFIG.socialProfiles.whatsapp],
};

export const BASE_LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SEO_CONFIG.domain}/#business`,
  name: SEO_CONFIG.siteName,
  alternateName: SEO_CONFIG.alternateNames,
  description:
    "Delhi's premier chip-level mobile and laptop repair workshop at Nehru Place. Certified engineers, OEM parts, 90-day warranty, and free doorstep pickup across Delhi NCR.",
  url: SEO_CONFIG.domain,
  telephone: SEO_CONFIG.phone,
  email: SEO_CONFIG.email,
  image: SEO_CONFIG.defaultOgImage,
  logo: SEO_CONFIG.logo,
  priceRange: SEO_CONFIG.priceRange,
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    ...SEO_CONFIG.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...SEO_CONFIG.geo,
  },
  hasMap: SEO_CONFIG.hasMap,
  areaServed: SEO_CONFIG.serviceAreas.map((area) => ({
    '@type': 'City',
    name: area,
  })),
  openingHoursSpecification: SEO_CONFIG.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1240',
    reviewCount: '1240',
  },
  sameAs: [SEO_CONFIG.socialProfiles.instagram, SEO_CONFIG.socialProfiles.youtube, SEO_CONFIG.socialProfiles.whatsapp],
};

// Route Specific Metadata
export const ROUTE_SEO_MAP: Record<string, SEOData> = {
  '/': {
    title: 'TheMobiFixx | Best Mobile & Laptop Repair in Delhi, Nehru Place',
    description:
      "TheMobiFixx is Delhi NCR's #1 certified mobile phone and laptop repair center at Nehru Place. Logic board micro-soldering, 90-day warranty, free doorstep pickup across Delhi, Noida & Gurugram.",
    keywords:
      'TheMobiFixx, The Mobi Fixx, TheMobiFixx.com, TheMobiFixx repair, TheMobiFixx mobile repair, TheMobiFixx laptop repair, mobile repair nehru place, laptop repair delhi',
    canonical: `${SEO_CONFIG.domain}/`,
    h1: 'Best Mobile & Laptop Repair in Delhi, Nehru Place',
    schemas: [BASE_WEBSITE_SCHEMA, BASE_ORGANIZATION_SCHEMA, BASE_LOCAL_BUSINESS_SCHEMA],
  },
  '/about': {
    title: 'About TheMobiFixx | Mobile & Laptop Repair Center Nehru Place',
    description:
      'Learn about TheMobiFixx, Delhi NCR’s premier chip-level electronics repair workshop in Nehru Place Market, New Delhi. Certified engineers, OEM parts, and doorstep service.',
    keywords: 'about themobifixx, themobifixx delhi, chip level laptop repair nehru place, certified mobile repair engineers delhi',
    canonical: `${SEO_CONFIG.domain}/about`,
    h1: 'About TheMobiFixx Repair Workshop',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'About Us', item: `${SEO_CONFIG.domain}/about` },
    ],
    schemas: [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About TheMobiFixx',
        description: 'Certified chip-level mobile and laptop repair center located in Nehru Place, New Delhi.',
        url: `${SEO_CONFIG.domain}/about`,
      },
    ],
  },
  '/services': {
    title: 'Electronics Repair Services | TheMobiFixx Nehru Place Delhi NCR',
    description:
      'Explore professional repair services at TheMobiFixx: mobile screen replacement, laptop motherboard repair, MacBook micro-soldering, battery replacement, and doorstep pickup.',
    keywords: 'themobifixx services, mobile repair services delhi, laptop repair services nehru place, macbook logic board repair',
    canonical: `${SEO_CONFIG.domain}/services`,
    h1: 'Our Professional Repair Services',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Services', item: `${SEO_CONFIG.domain}/services` },
    ],
    schemas: [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ServiceCatalog',
        name: 'TheMobiFixx Repair Services',
        url: `${SEO_CONFIG.domain}/services`,
      },
    ],
  },
  '/services/mobile-repair': {
    title: 'Mobile Repair Service | Screen, Battery & Logic Board | TheMobiFixx',
    description:
      'Expert mobile phone repair at TheMobiFixx Nehru Place. Certified repair for iPhone, Samsung, OnePlus, Vivo, Oppo & Xiaomi. Genuine parts with 90-day warranty.',
    keywords: 'themobifixx mobile repair, mobile repairing delhi, smartphone repair nehru place, iphone repair delhi, samsung screen replacement',
    canonical: `${SEO_CONFIG.domain}/services/mobile-repair`,
    h1: 'Professional Mobile Phone Repair Service',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Services', item: `${SEO_CONFIG.domain}/services` },
      { name: 'Mobile Repair', item: `${SEO_CONFIG.domain}/services/mobile-repair` },
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Mobile Phone Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Mobile Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/mobile-repair`,
      },
    ],
  },
  '/services/laptop-repair': {
    title: 'Laptop Repair & Motherboard Chip-Level Service | TheMobiFixx',
    description:
      'Certified laptop repair in Nehru Place, Delhi by TheMobiFixx. Motherboard chip-level micro-soldering, screen replacement, liquid damage recovery, and RAM/SSD upgrades for Dell, HP, Lenovo, Asus & Acer.',
    keywords: 'themobifixx laptop repair, laptop repair nehru place, laptop motherboard repair delhi, chip level repairing, hp laptop repair, dell repair center',
    canonical: `${SEO_CONFIG.domain}/services/laptop-repair`,
    h1: 'Laptop Repair & Chip-Level Motherboard Service',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Services', item: `${SEO_CONFIG.domain}/services` },
      { name: 'Laptop Repair', item: `${SEO_CONFIG.domain}/services/laptop-repair` },
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Laptop Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Laptop & Chip-Level Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/laptop-repair`,
      },
    ],
  },
  '/services/macbook-repair': {
    title: 'MacBook Logic Board & Screen Repair | TheMobiFixx Nehru Place',
    description:
      'Specialized MacBook Pro, Air & iMac repair center in Delhi NCR. Chip-level logic board repair, display replacement, battery swap & liquid damage restoration by senior engineers.',
    keywords: 'themobifixx macbook repair, macbook logic board repair delhi, macbook screen replacement, macbook repair nehru place, apple mac repair',
    canonical: `${SEO_CONFIG.domain}/services/macbook-repair`,
    h1: 'MacBook & Apple Mac Specialist Repair Service',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Services', item: `${SEO_CONFIG.domain}/services` },
      { name: 'MacBook Repair', item: `${SEO_CONFIG.domain}/services/macbook-repair` },
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'MacBook & Mac Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'MacBook Micro-Soldering & Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/macbook-repair`,
      },
    ],
  },
  '/services/tablet-repair': {
    title: 'Tablet & iPad Repair Service | Screen & Battery | TheMobiFixx',
    description:
      'Professional tablet and iPad repair service in Delhi NCR. Screen replacement, charging port repair, battery replacement for iPad, Samsung Tab & Lenovo Tab with warranty.',
    keywords: 'tablet repair delhi, ipad repair nehru place, ipad screen replacement, samsung tab repair, themobifixx tablet repair',
    canonical: `${SEO_CONFIG.domain}/services/tablet-repair`,
    h1: 'Tablet & iPad Repair Service',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Services', item: `${SEO_CONFIG.domain}/services` },
      { name: 'Tablet Repair', item: `${SEO_CONFIG.domain}/services/tablet-repair` },
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Tablet & iPad Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Tablet Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/tablet-repair`,
      },
    ],
  },
  '/services/screen-repair': {
    title: 'Mobile & Laptop Screen Replacement Service | TheMobiFixx Delhi',
    description:
      'Fast 30-minute mobile phone display and laptop screen replacement at TheMobiFixx. Original OEM screens, touch glass replacement, 90-day warranty.',
    keywords: 'screen replacement delhi, mobile display replacement nehru place, laptop glass replacement, iphone screen repair',
    canonical: `${SEO_CONFIG.domain}/services/screen-repair`,
    h1: 'Mobile & Laptop Display Screen Replacement',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Display Screen Replacement Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Screen Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/screen-repair`,
      },
    ],
  },
  '/services/screen-replacement': {
    title: 'Screen Replacement Service | Genuine Displays | TheMobiFixx',
    description:
      'OEM display and touch screen replacement for smartphones and laptops in Delhi NCR. Fast doorstep installation with 90-day warranty.',
    keywords: 'screen replacement service, phone display change, laptop screen repair delhi',
    canonical: `${SEO_CONFIG.domain}/services/screen-replacement`,
    h1: 'OEM Display Screen Replacement Service',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'OEM Screen Replacement Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Screen Replacement',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/screen-replacement`,
      },
    ],
  },
  '/services/battery-replacement': {
    title: 'Battery Replacement Service for Mobile & Laptop | TheMobiFixx',
    description:
      'Replace aging, swelling, or fast-draining batteries for smartphones, iPhones, MacBooks, and laptops. High capacity OEM battery with full warranty.',
    keywords: 'battery replacement delhi, iphone battery replacement nehru place, laptop battery replacement, themobifixx battery service',
    canonical: `${SEO_CONFIG.domain}/services/battery-replacement`,
    h1: 'Mobile & Laptop Battery Replacement Service',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Battery Replacement Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Battery Swap',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/battery-replacement`,
      },
    ],
  },
  '/services/motherboard-repair': {
    title: 'Logic Board & Motherboard Chip-Level Micro-Soldering | TheMobiFixx',
    description:
      'Advanced chip-level IC replacement, short-circuit fixing, power IC repair, and logic board micro-soldering for laptops and smartphones in Nehru Place.',
    keywords: 'chip level repair nehru place, logic board repair delhi, laptop motherboard repair, mobile ic repair, micro soldering service',
    canonical: `${SEO_CONFIG.domain}/services/motherboard-repair`,
    h1: 'Logic Board & Motherboard Micro-Soldering',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Motherboard & Logic Board Micro-Soldering Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Chip Level Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/motherboard-repair`,
      },
    ],
  },
  '/services/water-damage-repair': {
    title: 'Liquid & Water Damage Recovery Service | TheMobiFixx',
    description:
      'Emergency water damage restoration for smartphones, MacBooks, and laptops. Ultrasonic cleaning, IC corrosion repair, and data recovery in Delhi NCR.',
    keywords: 'water damage phone repair delhi, liquid damage macbook repair, wet phone recovery nehru place, data recovery water damaged laptop',
    canonical: `${SEO_CONFIG.domain}/services/water-damage-repair`,
    h1: 'Emergency Water & Liquid Damage Recovery',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Water & Liquid Damage Recovery Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Emergency Liquid Damage Recovery',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/water-damage-repair`,
      },
    ],
  },
  '/services/doorstep-repair': {
    title: 'Free Doorstep Mobile & Laptop Repair Service Delhi NCR | TheMobiFixx',
    description:
      'Book free doorstep device pickup and repair in Delhi, Noida, Gurugram, Ghaziabad & Faridabad. Technician visits your location for instant diagnostics.',
    keywords: 'doorstep mobile repair delhi, doorstep laptop service ncr, pickup drop repair delhi, mobile repair at home',
    canonical: `${SEO_CONFIG.domain}/services/doorstep-repair`,
    h1: 'Free Doorstep Device Repair & Pickup Service',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Doorstep Device Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'On-Site Doorstep Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/doorstep-repair`,
      },
    ],
  },
  '/services/pickup-drop': {
    title: 'Free Pickup & Drop Device Repair Service | TheMobiFixx NCR',
    description:
      'Hassle-free pickup & drop service for your broken phone, laptop, or MacBook across Delhi NCR. Safe handling, live status updates, quick return.',
    keywords: 'pickup and drop mobile repair, free device pickup delhi, laptop pickup service nehru place',
    canonical: `${SEO_CONFIG.domain}/services/pickup-drop`,
    h1: 'Free Pickup & Drop Repair Service',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Free Pickup & Drop Device Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Pickup & Drop Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/pickup-drop`,
      },
    ],
  },
  '/services/mobile-repair/iphone-repair': {
    title: 'Apple iPhone Repair Service in Delhi | TheMobiFixx Nehru Place',
    description:
      'Certified Apple iPhone repair center in Nehru Place, New Delhi. Screen replacement, battery swap, back glass laser repair, camera lens & logic board fix.',
    keywords: 'iphone repair delhi, iphone repair nehru place, iphone screen replacement, iphone battery repair ncr',
    canonical: `${SEO_CONFIG.domain}/services/mobile-repair/iphone-repair`,
    h1: 'Apple iPhone Repair Service Center',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Apple iPhone Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'iPhone Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/mobile-repair/iphone-repair`,
      },
    ],
  },
  '/services/mobile-repair/samsung-repair': {
    title: 'Samsung Galaxy Phone Repair Service in Delhi | TheMobiFixx',
    description:
      'Expert Samsung smartphone and Galaxy Tab repair center at Nehru Place, Delhi. Original AMOLED screen replacement, battery repair & motherboard fix.',
    keywords: 'samsung repair delhi, samsung galaxy screen replacement, samsung service center nehru place',
    canonical: `${SEO_CONFIG.domain}/services/mobile-repair/samsung-repair`,
    h1: 'Samsung Galaxy Phone Repair Service',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Samsung Galaxy Phone Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Samsung Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/services/mobile-repair/samsung-repair`,
      },
    ],
  },
  '/laptop-repair/dell': {
    title: 'Dell Laptop Repair & Motherboard Service Delhi | TheMobiFixx',
    description:
      'Certified Dell laptop repair service center in Nehru Place, Delhi. Inspiron, XPS, Vostro & Latitude motherboard repair, display change & battery swap.',
    keywords: 'dell laptop repair delhi, dell repair center nehru place, dell inspiron motherboard repair',
    canonical: `${SEO_CONFIG.domain}/laptop-repair/dell`,
    h1: 'Dell Laptop Repair & Service Center',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Dell Laptop Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'Dell Laptop Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/laptop-repair/dell`,
      },
    ],
  },
  '/laptop-repair/hp': {
    title: 'HP Laptop Repair & Motherboard Service Delhi | TheMobiFixx',
    description:
      'Expert HP laptop repair in Nehru Place Market. HP Pavilion, Spectre, Envy, Omen & ProBook screen replacement, power IC repair & hinge restoration.',
    keywords: 'hp laptop repair delhi, hp service center nehru place, hp pavilion motherboard repair',
    canonical: `${SEO_CONFIG.domain}/laptop-repair/hp`,
    h1: 'HP Laptop Repair & Service Center',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'HP Laptop Repair Service',
        provider: BASE_ORGANIZATION_SCHEMA,
        serviceType: 'HP Laptop Repair',
        areaServed: 'Delhi NCR',
        url: `${SEO_CONFIG.domain}/laptop-repair/hp`,
      },
    ],
  },
  '/contact': {
    title: 'Contact TheMobiFixx | Phone, WhatsApp & Nehru Place Workshop Address',
    description:
      'Contact TheMobiFixx at G-12, Ground Floor, Nehru Place Market, New Delhi or call +91-9310112994. Instant WhatsApp repair assistance and doorstep pickup booking.',
    keywords: 'TheMobiFixx contact, contact themobifixx, themobifixx phone number, themobifixx nehru place address, book doorstep mobile repair',
    canonical: `${SEO_CONFIG.domain}/contact`,
    h1: 'Contact TheMobiFixx Repair Desk',
    breadcrumbs: [
      { name: 'Home', item: `${SEO_CONFIG.domain}/` },
      { name: 'Contact Us', item: `${SEO_CONFIG.domain}/contact` },
    ],
    schemas: [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact TheMobiFixx',
        url: `${SEO_CONFIG.domain}/contact`,
      },
    ],
  },
  '/reviews': {
    title: 'TheMobiFixx Reviews | Customer Feedback & Ratings',
    description:
      'Read genuine customer reviews for TheMobiFixx mobile and laptop repair services in Delhi NCR. 4.9/5 star rated repair center in Nehru Place Market.',
    keywords: 'TheMobiFixx reviews, themobifixx rating, mobile repair reviews nehru place, customer feedback themobifixx',
    canonical: `${SEO_CONFIG.domain}/reviews`,
    h1: 'TheMobiFixx Customer Reviews & Feedback',
    schemas: [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'AggregateRating',
        itemReviewed: BASE_LOCAL_BUSINESS_SCHEMA,
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1240',
        reviewCount: '1240',
      },
    ],
  },
  '/technicians': {
    title: 'Meet Our Expert Technicians | TheMobiFixx Nehru Place',
    description:
      'Meet the certified chip-level hardware engineers and micro-soldering specialists at TheMobiFixx Nehru Place, New Delhi.',
    keywords: 'themobifixx technicians, laptop repair engineers nehru place, mobile repair experts delhi',
    canonical: `${SEO_CONFIG.domain}/technicians`,
    h1: 'Certified Hardware Engineers & Technicians',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TheMobiFixx Hardware Technicians & Engineers',
        itemListElement: [
          { '@type': 'Person', name: 'Tusar Singh', jobTitle: 'Senior Chip-Level Engineer & Workshop Owner' },
          { '@type': 'Person', name: 'Suhail Malik', jobTitle: 'Mobile Display & IC Specialist' },
          { '@type': 'Person', name: 'Nikhil Chandel', jobTitle: 'MacBook Logic Board Technician' },
          { '@type': 'Person', name: 'Arif Sheikh', jobTitle: 'Laptop Hardware Technician' },
        ],
      },
    ],
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) | TheMobiFixx Repair',
    description:
      'Find answers to common questions about mobile and laptop repair warranty, doorstep pickup charges, turn-around times, and genuine OEM parts at TheMobiFixx.',
    keywords: 'themobifixx faq, mobile repair questions delhi, laptop repair warranty terms',
    canonical: `${SEO_CONFIG.domain}/faq`,
    h1: 'Frequently Asked Questions',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What warranty does TheMobiFixx provide on repairs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TheMobiFixx provides up to a 90-day comprehensive warranty on replacement spare parts and chip-level repairs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is doorstep pickup free across Delhi NCR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! We offer convenient doorstep pickup and delivery across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is your physical workshop located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our primary repair workshop is located at G-12, Ground Floor, Nehru Place Market, New Delhi - 110019 (Near Blue Dart).',
            },
          },
        ],
      },
    ],
  },
  '/gallery': {
    title: 'Repair Work Showcase & Workshop Gallery | TheMobiFixx',
    description:
      'View photos of our state-of-the-art repair lab, micro-soldering stations, BGA reballing equipment, and real repair work at TheMobiFixx Nehru Place.',
    keywords: 'themobifixx photos, repair workshop gallery nehru place, micro soldering lab delhi',
    canonical: `${SEO_CONFIG.domain}/gallery`,
    h1: 'Repair Workshop Gallery & Facilities',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'TheMobiFixx Workshop & Repair Lab Gallery',
        url: `${SEO_CONFIG.domain}/gallery`,
      },
    ],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | TheMobiFixx New Delhi',
    description:
      'Read TheMobiFixx privacy policy covering customer data protection, diagnostic report privacy, and secure handling of personal device information.',
    canonical: `${SEO_CONFIG.domain}/privacy-policy`,
    h1: 'Privacy Policy',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: `${SEO_CONFIG.domain}/privacy-policy`,
      },
    ],
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | TheMobiFixx Nehru Place',
    description:
      'Terms of service for TheMobiFixx electronics repair: 90-day warranty guidelines, doorstep pickup conditions, flat diagnostic policy, and customer rights.',
    canonical: `${SEO_CONFIG.domain}/terms-and-conditions`,
    h1: 'Terms & Conditions',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms & Conditions',
        url: `${SEO_CONFIG.domain}/terms-and-conditions`,
      },
    ],
  },
};
