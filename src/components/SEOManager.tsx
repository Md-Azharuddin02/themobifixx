import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../config/seo.config';
import { resolvePageSEO, generateBreadcrumbSchema } from '../utils/seo.utils';

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.includes('property=')) {
      const propMatch = selector.match(/property="([^"]+)"/);
      if (propMatch) el.setAttribute('property', propMatch[1]);
    } else if (selector.includes('name=')) {
      const nameMatch = selector.match(/name="([^"]+)"/);
      if (nameMatch) el.setAttribute('name', nameMatch[1]);
    }
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

function injectSchemas(schemas: object[]) {
  // Clean previously injected dynamic schemas
  document.querySelectorAll('script[data-dynamic-schema]').forEach((s) => s.remove());

  schemas.forEach((schema) => {
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
    const seoData = resolvePageSEO(pathname);
    const canonicalUrl = seoData.canonical || `${SEO_CONFIG.domain}${pathname === '/' ? '' : pathname}`;
    const ogImage = seoData.ogImage || SEO_CONFIG.defaultOgImage;

    // Check if route should be noindex
    const isPrivate = ['/admin', '/dashboard', '/login', '/signup', '/account', '/api', '/tracking'].some((p) =>
      pathname.startsWith(p)
    );
    const robotsDirective = isPrivate
      ? 'noindex, nofollow'
      : seoData.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    // 1. Primary Title & Description
    document.title = seoData.title;
    setMeta('meta[name="description"]', 'content', seoData.description);
    if (seoData.keywords) {
      setMeta('meta[name="keywords"]', 'content', seoData.keywords);
    }
    setMeta('meta[name="robots"]', 'content', robotsDirective);

    // 2. Canonical & Hreflang Tags
    setLink('canonical', canonicalUrl);
    setLink('alternate', canonicalUrl, { hreflang: 'en-IN' });
    setLink('alternate', canonicalUrl, { hreflang: 'x-default' });

    // 3. Geo Tags
    setMeta('meta[name="geo.region"]', 'content', 'IN-DL');
    setMeta('meta[name="geo.placename"]', 'content', 'Nehru Place, New Delhi, India');
    setMeta('meta[name="geo.position"]', 'content', `${SEO_CONFIG.geo.latitude};${SEO_CONFIG.geo.longitude}`);
    setMeta('meta[name="ICBM"]', 'content', `${SEO_CONFIG.geo.latitude}, ${SEO_CONFIG.geo.longitude}`);

    // 4. Open Graph Tags
    setMeta('meta[property="og:title"]', 'content', seoData.title);
    setMeta('meta[property="og:description"]', 'content', seoData.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '630');
    setMeta('meta[property="og:image:alt"]', 'content', `${SEO_CONFIG.siteName} — Mobile & Laptop Repair Center, Nehru Place Delhi`);
    setMeta('meta[property="og:type"]', 'content', seoData.ogType || 'website');
    setMeta('meta[property="og:locale"]', 'content', 'en_IN');
    setMeta('meta[property="og:site_name"]', 'content', SEO_CONFIG.siteName);

    // 5. Twitter / X Card Tags
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]', 'content', '@themobifixx');
    setMeta('meta[name="twitter:creator"]', 'content', '@themobifixx');
    setMeta('meta[name="twitter:title"]', 'content', seoData.title);
    setMeta('meta[name="twitter:description"]', 'content', seoData.description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // 6. JSON-LD Schemas
    const schemasToInject: object[] = [];
    if (seoData.schemas && seoData.schemas.length > 0) {
      schemasToInject.push(...seoData.schemas);
    }
    if (seoData.breadcrumbs && seoData.breadcrumbs.length > 0) {
      schemasToInject.push(generateBreadcrumbSchema(seoData.breadcrumbs));
    }

    injectSchemas(schemasToInject);
  }, [pathname]);

  return null;
}
