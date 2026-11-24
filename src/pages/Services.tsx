import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import type { ServiceCategory } from '../types';
import { SERVICE_CATALOG_DATA } from '../content/services';
import PageHeader from '../components/ui/PageHeader';

type Filter = 'all' | 'repairs' | 'upgrades' | 'software';
type Status = 'loading' | 'ready' | 'error';

const FILTERS: { id: Filter; name: string; slugs?: string[] }[] = [
  { id: 'all', name: 'All Services' },
  { id: 'repairs', name: 'Device Repairs', slugs: ['laptop-repair', 'macbook-repair', 'mobile-repair', 'tablet-repair', 'motherboard-repair', 'keyboard-repair'] },
  { id: 'upgrades', name: 'Hardware Upgrades', slugs: ['ssd-upgrade', 'ram-upgrade', 'battery-replacement', 'screen-replacement'] },
  { id: 'software', name: 'Software & Maintenance', slugs: ['deep-cleaning', 'software-installation', 'virus-removal', 'data-recovery', 'doorstep-repair'] },
];

// Used when /api/services is unavailable: the service pages that already exist on the site.
const LOCAL_SERVICES = Object.entries(SERVICE_CATALOG_DATA).map(([slug, s]) => ({ slug, title: s.title, description: s.description }));

export default function Services() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/services', { signal: controller.signal });
        if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) throw new Error(`Unexpected response ${res.status}`);
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
        setStatus('ready');
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error('Failed fetching services:', err);
        setStatus('error');
      }
    })();
    return () => controller.abort();
  }, []);

  const source = status === 'ready' && services.length > 0 ? services : LOCAL_SERVICES;
  const q = query.toLowerCase();
  const slugs = FILTERS.find((f) => f.id === filter)?.slugs;
  const visible = source.filter(
    (s) => (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) && (!slugs || slugs.includes(s.slug)),
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title="Our Professional Catalog"
        intro="Discover our complete list of premium diagnostics, chip-level logic board repairs, and speed optimizations in Delhi NCR."
      >
        <div className="relative mt-6 max-w-lg">
          <label htmlFor="service-search" className="sr-only">Search services</label>
          <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-fg-subtle" aria-hidden="true" />
          <input
            id="service-search"
            type="search"
            placeholder="Search services, e.g. Battery"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field-input pl-10"
          />
        </div>
      </PageHeader>

      <div className="container-page py-10 md:py-14">
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter services">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`btn btn-sm shrink-0 ${filter === f.id ? 'btn-dark' : 'btn-outline'}`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {status === 'loading' ? (
          <ul className="grid gap-3" aria-busy="true" aria-label="Loading services">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="card p-5">
                <div className="h-5 w-1/3 animate-pulse rounded-sm bg-paper-2" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded-sm bg-paper-2" />
              </li>
            ))}
          </ul>
        ) : (
          <>
            {status === 'error' && (
              <p className="mb-6 text-sm text-fg-muted" role="status">
                The live catalogue couldn't be loaded, so here are our service pages.
              </p>
            )}
            {visible.length > 0 ? (
              <ul className="grid gap-3 md:grid-cols-2">
                {visible.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="card group flex h-full items-start gap-4 p-5 transition-colors hover:border-accent md:p-6">
                      <span className="min-w-0 flex-1">
                        <h2 className="text-lg font-bold group-hover:text-accent">{s.title}</h2>
                        <p className="mt-1 line-clamp-3 text-sm text-fg-muted">{s.description}</p>
                      </span>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-fg-subtle group-hover:text-accent" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="card px-6 py-12 text-center">
                <h2 className="text-xl font-semibold">No services match your search</h2>
                <p className="mt-2 text-sm text-fg-muted">Try a different keyword or filter, or ask us directly.</p>
                <Link to="/contact?tab=inquiry" className="btn btn-dark mt-6">Send an inquiry</Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
