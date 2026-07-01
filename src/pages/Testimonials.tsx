/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, Plus, X, Filter, ShieldCheck, ThumbsUp, Sparkles, Award } from 'lucide-react';
import { Testimonial } from '../types';
import ReviewStars from '../components/ReviewStars';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Filter unique device categories from testimonials list
  const getDeviceCategories = () => {
    const categories = new Set<string>();
    testimonials.forEach((t) => {
      const dev = t.deviceType.toLowerCase();
      if (dev.includes('macbook') || dev.includes('apple') || dev.includes('ipad')) {
        categories.add('Apple & MacBook');
      } else if (dev.includes('laptop') || dev.includes('dell') || dev.includes('hp') || dev.includes('lenovo') || dev.includes('asus')) {
        categories.add('Windows Laptop');
      } else if (dev.includes('iphone') || dev.includes('phone') || dev.includes('mobile') || dev.includes('samsung') || dev.includes('oneplus')) {
        categories.add('Smartphone');
      } else {
        categories.add('Other Devices');
      }
    });
    return Array.from(categories);
  };

  const getFilteredList = () => {
    return testimonials.filter((t) => {
      const dev = t.deviceType.toLowerCase();
      let matchesCategory = true;
      
      if (activeFilter === 'apple') {
        matchesCategory = dev.includes('macbook') || dev.includes('apple') || dev.includes('ipad');
      } else if (activeFilter === 'laptop') {
        matchesCategory = (dev.includes('laptop') || dev.includes('dell') || dev.includes('hp') || dev.includes('lenovo') || dev.includes('asus')) && !dev.includes('macbook');
      } else if (activeFilter === 'smartphone') {
        matchesCategory = dev.includes('iphone') || dev.includes('phone') || dev.includes('mobile') || dev.includes('samsung') || dev.includes('oneplus');
      }
      
      let matchesRating = true;
      if (ratingFilter !== 'all') {
        matchesRating = t.rating === ratingFilter;
      }
      
      return matchesCategory && matchesRating;
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!deviceType.trim()) {
      setFormError('Please mention the device repaired (e.g., MacBook Pro M1, Dell XPS 15).');
      return;
    }
    if (!reviewText.trim()) {
      setFormError('Please write your review details.');
      return;
    }
    if (reviewText.trim().length < 15) {
      setFormError('Your review is too short. Please provide at least 15 characters about your repair experience.');
      return;
    }
    if (!isVerified) {
      setFormError('You must verify that you are a customer of LapyZone.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          rating,
          review: reviewText,
          deviceType,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Refresh testimonials list
        await fetchTestimonials();
        // Reset form
        setCustomerName('');
        setRating(5);
        setReviewText('');
        setDeviceType('');
        setIsVerified(false);
      } else {
        const errData = await response.json();
        setFormError(errData.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setFormError('A server network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setFormError('');
  };

  // Stats calculation
  const totalReviewsCount = testimonials.length;
  const averageRating = totalReviewsCount > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviewsCount).toFixed(1) 
    : '4.9';

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Header Banner Section */}
      <section className="bg-slate-50 border-b border-slate-200/50 py-16" id="testimonials-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>100% Genuine Customer Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1020] tracking-tight leading-none">
            Client Testimonials
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it. Read honest feedback from verified laptop, MacBook, and mobile repair clients across Delhi NCR.
          </p>
        </div>
      </section>

      {/* Stats Summary & Call to Action bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-[#0A1020] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
            <div>
              <span className="text-3xl md:text-4xl font-black text-white flex items-center gap-1">
                {averageRating} <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline shrink-0" />
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1 block">Average Client Rating</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-black text-white">{totalReviewsCount || '150'}+</span>
              <span className="text-xs text-slate-400 font-medium mt-1 block">Verified Feedback Files</span>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-3xl md:text-4xl font-black text-emerald-500">100%</span>
              <span className="text-xs text-slate-400 font-medium mt-1 block">Transparency Guarantee</span>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            id="write-review-btn"
            className="w-full md:w-auto bg-[#0F4CFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-blue-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>
      </section>

      {/* Filtering Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', name: 'All Devices' },
              { id: 'apple', name: 'MacBook & Apple' },
              { id: 'laptop', name: 'Windows Laptops' },
              { id: 'smartphone', name: 'Smartphones' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#0F4CFF] text-white shadow-md shadow-blue-100'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Rating Filter dropdown */}
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter Rating:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars only</option>
              <option value="4">4 Stars only</option>
              <option value="3">3 Stars only</option>
            </select>
          </div>
        </div>
      </section>

      {/* Reviews Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 bg-slate-50 border border-slate-200/50 rounded-2xl"></div>
            ))}
          </div>
        ) : getFilteredList().length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-lg mx-auto p-8">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-slate-800 text-lg mb-1">No matching testimonials found</h3>
            <p className="text-sm text-slate-500 mb-6">Try broadening your device or star-rating filters, or submit a brand-new review first!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F4CFF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {getFilteredList().map((t, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.05, 0.3) }}
                  key={t.id || idx}
                  className="bg-slate-50/40 border border-slate-200/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group"
                >
                  {/* Subtle stamp icon to verify */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" />
                    <span>Verified Customer</span>
                  </div>

                  <div>
                    {/* Rating stars */}
                    <div className="mb-4">
                      <ReviewStars rating={t.rating} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>

                    {/* Review text */}
                    <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                      "{t.review}"
                    </p>
                  </div>

                  {/* Customer author section */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/40">
                    <img
                      src={t.image}
                      alt={t.customerName}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 bg-white"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.customerName}</h4>
                      <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        <span className="text-blue-600">{t.deviceType}</span>
                        <span>•</span>
                        <span>{t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : 'Verified Repair'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* VERIFIED CUSTOMER REVIEW MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="review-modal-overlay">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeReviewModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
              id="review-modal"
            >
              {/* Close Button */}
              <button
                onClick={closeReviewModal}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                // Success Screen
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm animate-bounce-slow">
                    <CheckCircle2 className="w-8 h-8 fill-emerald-50" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0A1020] tracking-tight">Feedback Submitted!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Thank you for reviewing your LapyZone experience. Your verified customer feedback has been saved to the database successfully.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={closeReviewModal}
                      className="bg-[#0A1020] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full cursor-pointer transition-all"
                    >
                      Close feedback box
                    </button>
                  </div>
                </div>
              ) : (
                // Form Screen
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A1020] tracking-tight flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <span>Leave a Genuine Review</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Are you a verified LapyZone client? Your honest feedback helps others choose premium doorstep services safely in Delhi NCR.
                    </p>
                  </div>

                  {formError && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs font-semibold text-rose-600">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Interactive Star Rating */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Select Rating Star Counts *
                      </label>
                      <div className="flex items-center space-x-1.5 bg-slate-50/60 border border-slate-200/50 rounded-xl p-2.5 w-max">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-110"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-7 h-7 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-500 pl-2">
                          {rating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Hamza Khan"
                        className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Device Repaired */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Device Repaired & Model *
                      </label>
                      <input
                        type="text"
                        required
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        placeholder="e.g., MacBook Pro M1 2021 or iPhone 14 Pro"
                        className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Review message text */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Your Honest Feedback Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share details of your experience. What issue did you have? How did our certified technician perform?"
                        className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>

                    {/* Verification check checkbox */}
                    <div className="flex items-start space-x-2.5 pt-2">
                      <input
                        type="checkbox"
                        id="verify-customer-checkbox"
                        checked={isVerified}
                        onChange={(e) => setIsVerified(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="verify-customer-checkbox" className="text-xs text-slate-500 font-semibold cursor-pointer select-none leading-relaxed">
                        I verify that I am a customer of LapyZone and this feedback accurately reflects my genuine, honest repair experience.
                      </label>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100 mt-2">
                      <button
                        type="button"
                        onClick={closeReviewModal}
                        className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#0F4CFF] hover:bg-blue-600 disabled:bg-blue-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-md shadow-blue-100 flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        {submitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Saving Review...</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Submit Feedback</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
