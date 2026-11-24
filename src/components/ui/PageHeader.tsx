import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './primitives';

const FUNNEL = ['Choose device', 'Choose brand', 'Choose model', 'Select issues'];

interface PageHeaderProps {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  /** 1-based position in the Device → Brand → Model → Issues booking flow. */
  step?: number;
  children?: ReactNode;
}

export default function PageHeader({ crumbs, title, intro, step, children }: PageHeaderProps) {
  return (
    <div className="bg-paper-2">
      <div className="container-page py-6 md:py-10">
        <Breadcrumbs items={crumbs} />
        {step && (
          <p className="eyebrow mt-5">
            Step {step} of 4 · {FUNNEL[step - 1]}
          </p>
        )}
        <h1 className={`${step ? 'mt-1' : 'mt-5'} text-[1.75rem] font-bold leading-tight text-fg md:text-[2.5rem]`}>{title}</h1>
        {intro && <p className="mt-2 max-w-2xl text-[0.9375rem] text-fg-muted md:text-base">{intro}</p>}
        {children}
      </div>
    </div>
  );
}
