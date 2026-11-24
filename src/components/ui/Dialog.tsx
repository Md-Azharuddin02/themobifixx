import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name; rendered visibly unless `hideTitle`. */
  title: string;
  hideTitle?: boolean;
  children: ReactNode;
  /** Tailwind classes for the panel (width, padding, colours). */
  className?: string;
  /** 'center' for modals, 'right' for the mobile navigation drawer. */
  placement?: 'center' | 'right';
}

/**
 * Native <dialog> wrapper: the browser provides focus trapping, Esc to close and inert background.
 */
export default function Dialog({ open, onClose, title, hideTitle, children, className = '', placement = 'center' }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && el.open) {
      el.close();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const position =
    placement === 'right'
      ? 'ml-auto mr-0 my-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none'
      : 'm-auto w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)]';

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Clicks on the ::backdrop land on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
      className={`${position} overflow-y-auto overscroll-contain p-0 text-fg backdrop:backdrop-blur-[2px] ${className}`}
    >
      <div className="relative">
        <div className={hideTitle ? 'sr-only' : 'flex items-start justify-between gap-4 pb-4'}>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 -right-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-current opacity-70 transition-opacity hover:opacity-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
