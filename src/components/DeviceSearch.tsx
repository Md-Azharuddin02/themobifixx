import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wrench } from 'lucide-react';
import { DEVICE_MODELS } from './devices';
import { cldWidth } from '../utils/cloudinary';

interface Result {
  id: string;
  name: string;
  brand: string;
  image?: string;
}

const ALL_DEVICES: Result[] = Object.entries(DEVICE_MODELS).flatMap(([brand, list]) => list.map((d) => ({ ...d, brand })));

/** Model search with combobox keyboard support (↑ ↓ Enter Esc). */
export default function DeviceSearch({ onDone, autoFocus }: { onDone: () => void; autoFocus?: boolean }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return ALL_DEVICES.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  const go = (r: Result) => {
    navigate(`/repair/${r.brand}/${r.id}`);
    setQuery('');
    onDone();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === 'Escape') {
      onDone();
    }
  };

  const showEmpty = query.trim().length >= 2 && results.length === 0;

  return (
    <div className="relative">
      <label htmlFor={`${listId}-input`} className="sr-only">Search your device model</label>
      <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-fg-subtle" aria-hidden="true" />
      <input
        id={`${listId}-input`}
        type="search"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls={listId}
        aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder="Search device, e.g. iPhone 15 Pro"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        className="field-input pl-10"
      />
      {results.length > 0 && (
        <ul id={listId} role="listbox" className="mt-2 max-h-80 overflow-y-auto rounded-md border border-line bg-card">
          {results.map((r, i) => (
            <li
              key={`${r.brand}-${r.id}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r)}
              className={`flex cursor-pointer items-center gap-3 border-b border-line px-3 py-2.5 last:border-0 ${i === active ? 'bg-accent-soft' : ''}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-paper-2">
                {r.image ? <img src={cldWidth(r.image, 80)} alt="" loading="lazy" className="h-full w-full object-contain" /> : <Wrench className="h-4 w-4 text-fg-subtle" aria-hidden="true" />}
              </span>
              <span className="text-sm font-medium text-fg">{r.name}</span>
              <span className="ml-auto font-mono text-xs capitalize text-fg-subtle">{r.brand}</span>
            </li>
          ))}
        </ul>
      )}
      {showEmpty && <p className="mt-2 text-sm text-fg-muted" role="status">No models match “{query.trim()}”. Try a shorter name.</p>}
    </div>
  );
}
