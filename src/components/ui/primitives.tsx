import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto scrollbar-none">
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm text-fg-subtle">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />}
            {c.to ? (
              <Link to={c.to} className="capitalize hover:text-fg">{c.label}</Link>
            ) : (
              <span aria-current="page" className="capitalize text-fg">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface SectionHeadingProps {
  title: ReactNode;
  intro?: ReactNode;
  /** Right-aligned slot from tablet up (e.g. a "view all" link). */
  aside?: ReactNode;
  tone?: 'light' | 'ink';
}

export function SectionHeading({ title, intro, aside, tone = 'light' }: SectionHeadingProps) {
  const ink = tone === 'ink';
  return (
    <header className="mb-6 flex items-end justify-between gap-4 md:mb-10">
      <div className="max-w-2xl">
        <h2 className={`h2 ${ink ? '!text-on-ink' : ''}`}>{title}</h2>
        {intro && <p className={`mt-2 text-[0.9375rem] md:text-base ${ink ? 'text-on-ink-muted' : 'text-fg-muted'}`}>{intro}</p>}
      </div>
      {aside && <div className="hidden shrink-0 md:block">{aside}</div>}
    </header>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + hint/error wiring. Pass `aria-describedby={`${id}-msg`}` and `aria-invalid` to the control. */
export function Field({ id, label, required, error, hint, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-danger" aria-hidden="true"> *</span> : <span className="font-normal text-fg-subtle"> (optional)</span>}
      </label>
      {children}
      {(error || hint) && (
        <p id={`${id}-msg`} className={`mt-1.5 text-sm ${error ? 'text-danger' : 'text-fg-subtle'}`} role={error ? 'alert' : undefined}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
