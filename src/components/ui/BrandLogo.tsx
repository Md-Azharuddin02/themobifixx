import { useState } from 'react';

function MicrosoftMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 23 23" className={className} aria-hidden="true">
      <rect width="11" height="11" fill="#F25022" />
      <rect x="12" width="11" height="11" fill="#7FBA00" />
      <rect y="12" width="11" height="11" fill="#00A4EF" />
      <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
    </svg>
  );
}

/** Brand logo with a typographic fallback when the image is missing or fails to load. */
export default function BrandLogo({ name, src, className = 'h-7 w-auto max-w-[6.5rem]' }: { name: string; src: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (src === 'inline:microsoft') return <MicrosoftMark className="h-7 w-7" />;

  if (!src || failed) {
    return (
      <span aria-hidden="true" className="text-base font-extrabold tracking-tight text-fg">
        {name === 'Other' ? '+' : name.split(' ')[0]}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      // Local logos are square tiles with a white field: enlarge and multiply so the wordmark reads at the same size.
      className={src.startsWith('/') ? 'h-14 w-14 -my-3 object-cover mix-blend-multiply' : `${className} object-contain`}
    />
  );
}
