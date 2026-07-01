/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  max?: number;
  className?: string;
}

export default function ReviewStars({ rating, max = 5, className = "w-4 h-4 text-amber-400 fill-amber-400" }: ReviewStarsProps) {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= max; i++) {
    if (i <= roundedRating) {
      stars.push(
        <Star key={i} className={className} />
      );
    } else if (i - 0.5 === roundedRating) {
      stars.push(
        <div key={i} className="relative inline-block">
          <Star className={`${className} text-slate-200 fill-slate-200`} />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className={`${className} fill-amber-400`} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className={`${className} text-slate-200 fill-slate-200`} />
      );
    }
  }

  return <div className="flex items-center space-x-0.5">{stars}</div>;
}
