import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import type { Testimonial } from '../../types';
import { getSavedReviews, saveUserReview } from '../../utils/reviewManager';
import { Field } from '../ui/primitives';

const DEFAULT_TESTIMONIALS: Testimonial[] = [];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-star" aria-label={`${value} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < value ? 'fill-current' : 'text-line-strong'}`} aria-hidden="true" />
      ))}
    </span>
  );
}

type Errors = Partial<Record<'name' | 'device' | 'comment', string>>;

export default function Reviews() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getSavedReviews(DEFAULT_TESTIMONIALS));
  const [name, setName] = useState('');
  const [device, setDevice] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onAdded = (event: Event) => {
      const detail = (event as CustomEvent<Testimonial>).detail;
      if (detail) setTestimonials((prev) => [detail, ...prev.filter((r) => r.id !== detail.id)]);
    };
    window.addEventListener('themobifixx_review_added', onAdded);
    return () => window.removeEventListener('themobifixx_review_added', onAdded);
  }, []);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(t);
  }, [success]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = 'Please fill in your name.';
    if (!device.trim()) next.device = 'Please tell us which device was repaired.';
    if (!comment.trim()) next.comment = 'Please write a short comment.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setTestimonials(
      saveUserReview(
        {
          id: `review-${Date.now()}`,
          customerName: name.trim(),
          rating,
          review: comment.trim(),
          image: '',
          deviceType: device.trim() || 'Repaired Device',
          createdAt: new Date().toISOString().split('T')[0],
        },
        DEFAULT_TESTIMONIALS,
      ),
    );
    setSuccess(true);
    setName('');
    setDevice('');
    setComment('');
    setRating(5);
  };

  return (
    <section id="reviews" className="container-page pb-10 md:pb-16">
      <h2 className="sr-only">Customer reviews</h2>

      {testimonials.length > 0 && (
        <ul className="swipe-row mb-8 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {testimonials.map((r) => (
            <li key={r.id} className="card flex w-[85%] flex-col p-5 sm:w-[60%] md:w-auto">
              <Stars value={r.rating} />
              <blockquote className="mt-3 flex-1 text-[0.9375rem] text-fg">“{r.review}”</blockquote>
              <p className="mt-4 text-sm font-bold">{r.customerName}</p>
              <p className="text-sm text-fg-subtle">{r.deviceType} · {r.createdAt}</p>
            </li>
          ))}
        </ul>
      )}

      <details className="group rounded-2xl border border-line-strong">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold md:px-8 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-base font-bold">Had a repair with us?</span>
            <span className="block text-sm font-normal text-fg-muted">Share your experience with other customers.</span>
          </span>
          <span className="btn btn-sm btn-outline shrink-0 group-open:hidden">Write a review</span>
        </summary>
      <form onSubmit={submit} noValidate className="px-5 pb-5 md:px-8 md:pb-8">
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field id="r-name" label="Your Name" required error={errors.name}>
            <input id="r-name" className="field-input" autoComplete="name" placeholder="E.g., Tusar Singh" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="r-name-msg" />
          </Field>
          <Field id="r-device" label="Device Repaired" required error={errors.device}>
            <input id="r-device" className="field-input" placeholder="E.g., iPhone 15 Pro, Dell Laptop" value={device} onChange={(e) => setDevice(e.target.value)} aria-invalid={!!errors.device} aria-describedby="r-device-msg" />
          </Field>
        </div>
        <fieldset className="mt-4">
          <legend className="field-label">Rating <span className="text-danger" aria-hidden="true">*</span></legend>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <label key={s} className="cursor-pointer p-1">
                <input type="radio" name="rating" value={s} checked={rating === s} onChange={() => setRating(s)} className="peer sr-only" />
                <span className="sr-only">{s} star{s > 1 ? 's' : ''}</span>
                <Star className={`h-8 w-8 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-accent ${s <= rating ? 'fill-star text-star' : 'text-line-strong'}`} aria-hidden="true" />
              </label>
            ))}
          </div>
        </fieldset>
        <Field id="r-comment" label="Your Feedback" required error={errors.comment} className="mt-4">
          <textarea id="r-comment" rows={3} className="field-input" placeholder="Write details of your experience..." value={comment} onChange={(e) => setComment(e.target.value)} aria-invalid={!!errors.comment} aria-describedby="r-comment-msg" />
        </Field>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary">Submit review</button>
          <p role="status" className="flex items-center gap-1.5 text-sm font-semibold text-success">
            {success && (<><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Review added successfully!</>)}
          </p>
        </div>
      </form>
      </details>
    </section>
  );
}
