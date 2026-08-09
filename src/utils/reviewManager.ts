import { Testimonial } from '../types';

const STORAGE_KEY = 'themobifixx_user_submitted_reviews';
const LEGACY_STORAGE_KEY = 'themobifixx_reviews';

export function getSavedReviews(defaultTestimonials: Testimonial[]): Testimonial[] {
  try {
    let userReviews: Testimonial[] = [];
    const userSaved = localStorage.getItem(STORAGE_KEY);

    if (userSaved) {
      userReviews = JSON.parse(userSaved);
    } else {
      // Legacy fallback migration
      const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacySaved) {
        const legacyList: Testimonial[] = JSON.parse(legacySaved);
        const defaultIds = new Set(defaultTestimonials.map((d) => d.id));
        userReviews = legacyList.filter((item) => item.id && !defaultIds.has(item.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
      }
    }

    // Filter out duplicates and combine user reviews with default testimonials
    const defaultIds = new Set(defaultTestimonials.map((d) => d.id));
    const cleanUserReviews = userReviews.filter((item) => item.id && !defaultIds.has(item.id));

    return [...cleanUserReviews, ...defaultTestimonials];
  } catch (e) {
    console.error('Failed reading user reviews:', e);
    return defaultTestimonials;
  }
}

export function saveUserReview(newReview: Testimonial, defaultTestimonials: Testimonial[]): Testimonial[] {
  try {
    const userSaved = localStorage.getItem(STORAGE_KEY);
    let userReviews: Testimonial[] = userSaved ? JSON.parse(userSaved) : [];
    userReviews = [newReview, ...userReviews.filter((r) => r.id !== newReview.id)];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
    
    // Also update combined legacy key for backwards compatibility
    const combined = [...userReviews, ...defaultTestimonials];
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(combined));

    // Dispatch global event for instant UI sync
    window.dispatchEvent(new CustomEvent('themobifixx_review_added', { detail: newReview }));

    return combined;
  } catch (e) {
    console.error('Failed saving user review:', e);
    return [newReview, ...defaultTestimonials];
  }
}
