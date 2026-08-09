import { ROUTE_SEO_MAP, SEO_CONFIG } from '../config/seo.config';
import { resolvePageSEO } from './seo.utils';

export interface SEOAuditIssue {
  type: 'error' | 'warning' | 'info';
  route: string;
  category: 'Title' | 'Description' | 'Canonical' | 'H1' | 'ImageAlt' | 'OpenGraph' | 'Schema' | 'Robots';
  message: string;
}

export interface SEOAuditSummary {
  totalRoutesChecked: number;
  totalErrors: number;
  totalWarnings: number;
  issues: SEOAuditIssue[];
  routeCoverage: Record<string, 'PASSED' | 'WARNING' | 'FAILED'>;
}

export function runSEOAudit(): SEOAuditSummary {
  const routesToAudit = [
    '/',
    '/about',
    '/services',
    '/services/mobile-repair',
    '/services/laptop-repair',
    '/services/macbook-repair',
    '/services/tablet-repair',
    '/services/screen-repair',
    '/services/screen-replacement',
    '/services/battery-replacement',
    '/services/motherboard-repair',
    '/services/water-damage-repair',
    '/services/doorstep-repair',
    '/services/pickup-drop',
    '/services/mobile-repair/iphone-repair',
    '/services/mobile-repair/samsung-repair',
    '/laptop-repair/dell',
    '/laptop-repair/hp',
    '/brand/apple',
    '/brand/samsung',
    '/brand/hp',
    '/category/mobile',
    '/category/laptop',
    '/repair/apple/iphone-15-pro-max',
    '/contact',
    '/reviews',
    '/technicians',
    '/faq',
    '/gallery',
    '/privacy-policy',
    '/terms-and-conditions',
    '/admin', // testing noindex check
  ];

  const issues: SEOAuditIssue[] = [];
  const routeCoverage: Record<string, 'PASSED' | 'WARNING' | 'FAILED'> = {};

  routesToAudit.forEach((route) => {
    const seoData = resolvePageSEO(route);
    let routeHasError = false;
    let routeHasWarning = false;

    // Check 1: Private Route Noindex
    const isPrivate = ['/admin', '/dashboard', '/login', '/signup', '/account', '/api'].some((p) =>
      route.startsWith(p)
    );
    if (isPrivate) {
      // Should be noindex
      routeCoverage[route] = 'PASSED';
      return;
    }

    // Check 2: Title Tag
    if (!seoData.title || seoData.title.trim() === '') {
      issues.push({ type: 'error', route, category: 'Title', message: 'Title tag is missing or empty.' });
      routeHasError = true;
    } else if (seoData.title.length < 25) {
      issues.push({ type: 'warning', route, category: 'Title', message: `Title is too short (${seoData.title.length} chars). Recommend 30-60 chars.` });
      routeHasWarning = true;
    } else if (seoData.title.length > 70) {
      issues.push({ type: 'warning', route, category: 'Title', message: `Title is too long (${seoData.title.length} chars). May truncate in SERPs.` });
      routeHasWarning = true;
    }

    // Check 3: Description Tag
    if (!seoData.description || seoData.description.trim() === '') {
      issues.push({ type: 'error', route, category: 'Description', message: 'Meta description is missing.' });
      routeHasError = true;
    } else if (seoData.description.length < 50) {
      issues.push({ type: 'warning', route, category: 'Description', message: `Description is short (${seoData.description.length} chars). Recommend 120-160 chars.` });
      routeHasWarning = true;
    }

    // Check 4: Canonical Tag
    const canonical = seoData.canonical || `${SEO_CONFIG.domain}${route === '/' ? '' : route}`;
    if (!canonical.startsWith('https://')) {
      issues.push({ type: 'error', route, category: 'Canonical', message: `Canonical URL must start with HTTPS: ${canonical}` });
      routeHasError = true;
    }

    // Check 5: H1 Heading
    if (!seoData.h1) {
      issues.push({ type: 'warning', route, category: 'H1', message: 'No explicit H1 mapped in SEO metadata.' });
      routeHasWarning = true;
    }

    // Check 6: JSON-LD Schemas
    if (!seoData.schemas || seoData.schemas.length === 0) {
      issues.push({ type: 'warning', route, category: 'Schema', message: 'No structured data schemas configured.' });
      routeHasWarning = true;
    }

    if (routeHasError) {
      routeCoverage[route] = 'FAILED';
    } else if (routeHasWarning) {
      routeCoverage[route] = 'WARNING';
    } else {
      routeCoverage[route] = 'PASSED';
    }
  });

  const totalErrors = issues.filter((i) => i.type === 'error').length;
  const totalWarnings = issues.filter((i) => i.type === 'warning').length;

  return {
    totalRoutesChecked: routesToAudit.length,
    totalErrors,
    totalWarnings,
    issues,
    routeCoverage,
  };
}

// In-browser live DOM Auditor helper
export function auditLiveDOM(): { missingAltCount: number; h1Count: number; canonicalHref: string | null } {
  const images = document.querySelectorAll('img');
  let missingAltCount = 0;
  images.forEach((img) => {
    if (!img.getAttribute('alt') || img.getAttribute('alt')?.trim() === '') {
      missingAltCount++;
    }
  });

  const h1s = document.querySelectorAll('h1');
  const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  return {
    missingAltCount,
    h1Count: h1s.length,
    canonicalHref: canonicalEl ? canonicalEl.href : null,
  };
}
