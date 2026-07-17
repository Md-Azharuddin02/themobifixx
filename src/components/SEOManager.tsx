import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://themobifixx.com';
const SITE_NAME = 'TheMobifixx';
const DEFAULT_OG_IMAGE = 'https://themobifixx.com/og-cover.jpg';
const PHONE = '+91-9310112994';

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

function getPageMeta(pathname: string): PageMeta {
  if (pathname === '/') {
    return {
      title: 'Best Mobile & Laptop Repair in Delhi, Nehru Place | TheMobifixx',
      description:
        "Delhi NCR's #1 certified mobile phone and laptop repair center at Nehru Place. Chip-level logic board repairs, 90-day warranty, free doorstep pickup across Delhi, Noida & Gurugram. Book online now!",
      keywords:
        'best mobile repairing in delhi, best laptop repairing in delhi, mobile repair nehru place, laptop repair nehru place, iphone screen repair delhi, macbook repair delhi, doorstep mobile repair delhi ncr, chip level laptop repair nehru place, samsung repair delhi, oneplus repair delhi',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/services?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#business`,
          name: SITE_NAME,
          description:
            "Delhi's premier chip-level mobile and laptop repair center. Certified engineers, OEM parts, 90-day warranty.",
          url: SITE_URL,
          telephone: PHONE,
          email: 'themobifixx@gmail.com',
          image: `${SITE_URL}/og-cover.jpg`,
          logo: `${SITE_URL}/logo.png`,
          priceRange: '₹₹',
          currenciesAccepted: 'INR',
          paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'G-12, Ground Floor, Nehru Place',
            addressLocality: 'New Delhi',
            addressRegion: 'Delhi',
            postalCode: '110019',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 28.5494,
            longitude: 77.2513,
          },
          areaServed: [
            { '@type': 'City', name: 'New Delhi' },
            { '@type': 'City', name: 'Noida' },
            { '@type': 'City', name: 'Gurugram' },
            { '@type': 'City', name: 'Faridabad' },
            { '@type': 'City', name: 'Ghaziabad' },
          ],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '09:00',
              closes: '23:59',
            },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Device Repair Services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Screen Replacement' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laptop Logic Board Repair' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Chip-Level Repair' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Battery Replacement' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Damage Recovery' } },
            ],
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '1240',
          },
          sameAs: [
            'https://www.instagram.com/themobifixx',
            'https://wa.me/919310112994',
          ],
        },
      ],
    };
  }

  if (pathname === '/contact') {
    return {
      title: 'Contact & Book Repair | TheMobifixx Nehru Place, New Delhi',
      description:
        'Visit TheMobifixx at G-12, Nehru Place, New Delhi or book a free doorstep pickup. Call +91-9310112994 or chat on WhatsApp. We respond in 15 minutes.',
      keywords:
        'contact themobifixx, book mobile repair delhi, doorstep laptop pickup delhi, repair booking nehru place, whatsapp mobile repair delhi',
    };
  }

  if (pathname === '/services') {
    return {
      title: 'Repair Services — Mobile, Laptop, MacBook | TheMobifixx Nehru Place',
      description:
        'Explore all repair services at TheMobifixx: chip-level laptop & MacBook logic board, mobile screen & battery, water damage recovery, micro-soldering — at Nehru Place, Delhi.',
      keywords:
        'mobile repair services delhi, laptop repair services nehru place, macbook logic board repair delhi, battery replacement delhi ncr, screen repair delhi, water damage phone repair',
    };
  }

  if (pathname.startsWith('/services/')) {
    const slug = pathname.split('/').pop() || '';
    const serviceName = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${serviceName} | TheMobifixx — Nehru Place, Delhi NCR`,
      description: `Need premium ${serviceName} in Delhi NCR? TheMobifixx at Nehru Place offers certified ${serviceName} with OEM parts and a 90-day warranty. Book doorstep pickup today.`,
      keywords: `${serviceName.toLowerCase()} delhi, ${serviceName.toLowerCase()} nehru place, certified ${serviceName.toLowerCase()} ncr`,
    };
  }

  if (pathname.startsWith('/brand/')) {
    const brand = pathname.split('/').pop() || '';
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    return {
      title: `${brandName} Repair Service in Delhi | TheMobifixx Nehru Place`,
      description: `Certified ${brandName} phone repair at Nehru Place, New Delhi. Screen, battery, charging port & water damage repair with 90-day warranty. Free doorstep pickup in Delhi NCR.`,
      keywords: `${brand} repair delhi, ${brand} screen repair nehru place, ${brand} battery replacement delhi, ${brand} service center delhi ncr`,
    };
  }

  if (pathname.startsWith('/repair/')) {
    const parts = pathname.split('/');
    const brand = parts[2] || '';
    const model = (parts[3] || '').replace(/-/g, ' ');
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    return {
      title: `${brandName} ${model} Repair in Delhi | TheMobifixx`,
      description: `Expert ${brandName} ${model} repair at Nehru Place, Delhi. Screen replacement, battery swap, water damage fix with genuine parts & 90-day warranty. Book free pickup now.`,
      keywords: `${brand} ${model} repair delhi, ${brand} ${model} screen replacement, ${brand} ${model} battery repair nehru place`,
    };
  }

  if (pathname === '/privacy-policy') {
    return {
      title: 'Privacy Policy | TheMobifixx New Delhi',
      description:
        "Read TheMobifixx's privacy policy covering data handling, diagnostic reports, customer information security and your rights as a client.",
    };
  }

  if (pathname === '/terms-and-conditions') {
    return {
      title: 'Terms & Conditions | TheMobifixx Nehru Place',
      description:
        'Terms of service for TheMobifixx repair services: warranty terms, flat-rate pricing, diagnostic policy, doorstep pickup policy, and customer rights.',
    };
  }

  

  return {
    title: 'Best Mobile & Laptop Repair in Delhi, Nehru Place | TheMobifixx',
    description:
      "Delhi NCR's #1 trusted mobile phone and laptop repair service center at Nehru Place. Certified chip-level repairs, 90-day warranty, free doorstep pickup.",
  };
}



function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  el.setAttribute('rel', rel);
  el.setAttribute('href', href);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

function injectSchema(schemas: object | object[]) {
  

  document.querySelectorAll('script[data-dynamic-schema]').forEach((s) => s.remove());
  const arr = Array.isArray(schemas) ? schemas : [schemas];
  arr.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.dynamicSchema = 'true';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

    

    document.title = meta.title;

    

    setMeta('meta[name="description"]', 'content', meta.description);
    if (meta.keywords) {
      setMeta('meta[name="keywords"]', 'content', meta.keywords);
    }
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    

    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '630');
    setMeta('meta[property="og:image:alt"]', 'content', `${SITE_NAME} — Mobile & Laptop Repair Center, Nehru Place Delhi`);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:locale"]', 'content', 'en_IN');
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);

    

    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]', 'content', '@themobifixx');
    setMeta('meta[name="twitter:creator"]', 'content', '@themobifixx');
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:image:alt"]', 'content', `${SITE_NAME} Repair Center`);

    

    setMeta('meta[name="geo.region"]', 'content', 'IN-DL');
    setMeta('meta[name="geo.placename"]', 'content', 'Nehru Place, New Delhi, India');
    setMeta('meta[name="geo.position"]', 'content', '28.5494;77.2513');
    setMeta('meta[name="ICBM"]', 'content', '28.5494, 77.2513');

    

    setLink('canonical', canonicalUrl);
    

    setLink('alternate', canonicalUrl, { hreflang: 'en-IN' });
    setLink('alternate', canonicalUrl, { hreflang: 'x-default' });

    

    if (meta.schema) {
      injectSchema(meta.schema);
    }
  }, [pathname]);

  return null;
}
