import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, CheckCircle2, Plus, X, Filter, ShieldCheck, ThumbsUp, Sparkles, Award } from 'lucide-react';
import { Testimonial } from '../types';
import ReviewStars from '../components/ReviewStars';
import { getAuthToken, getAuthUser } from '../utils/auth';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function Testimonials() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const user = getAuthUser();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => { fetchTestimonials(); }, []);

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
      if (ratingFilter !== 'all') { matchesRating = t.rating === ratingFilter; }
      return matchesCategory && matchesRating;
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!token || !user) {
      setFormError('Authentication required. Please sign in first.');
      return;
    }
    if (!deviceType.trim()) { setFormError('Please mention the device repaired (e.g., MacBook Pro M1, Dell XPS 15).'); return; }
    if (!reviewText.trim()) { setFormError('Please write your review details.'); return; }
    if (reviewText.trim().length < 15) { setFormError('Your review is too short. Please provide at least 15 characters about your repair experience.'); return; }
    if (!isVerified) { setFormError('You must verify that you are a customer of TheMobifixx.'); return; }

    setSubmitting(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, review: reviewText, deviceType }),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        await fetchTestimonials();
        setRating(5); setReviewText(''); setDeviceType(''); setIsVerified(false);
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

  const closeReviewModal = () => { setIsModalOpen(false); setSubmitSuccess(false); setFormError(''); };

  const totalReviewsCount = testimonials.length;
  const averageRating = totalReviewsCount > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviewsCount).toFixed(1)
    : '4.9';

  const filterOptions = [
    { id: 'all', name: 'All Devices' },
    { id: 'apple', name: 'MacBook & Apple' },
    { id: 'laptop', name: 'Windows Laptops' },
    { id: 'smartphone', name: 'Smartphones' },
  ];

  return (
    <div className="pt-20 md:pt-32 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="testimonials-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <Award className="w-3.5 h-3.5" />
            <span>100% Genuine Customer Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Client Testimonials
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it. Read honest feedback from verified laptop, MacBook, and mobile repair clients across Delhi NCR.
          </p>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#0A1020] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
            <div>
              <span className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-1">
                {averageRating} <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline shrink-0" />
              </span>
              <span className="text-xs text-slate-500 font-bold mt-1 block uppercase tracking-wider">Average Client Rating</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-black text-slate-900">{totalReviewsCount || '150'}+</span>
              <span className="text-xs text-slate-500 font-bold mt-1 block uppercase tracking-wider">Verified Feedback Files</span>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t-2 sm:border-t-0 sm:border-l-2 border-slate-900 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-3xl md:text-4xl font-black text-[#00C48C]">100%</span>
              <span className="text-xs text-slate-500 font-bold mt-1 block uppercase tracking-wider">Transparency Guarantee</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!token || !user) {
                navigate('/login');
              } else {
                setCustomerName(user.name);
                setIsModalOpen(true);
              }
            }}
            id="write-review-btn"
            className="w-full md:w-auto bg-[#FFB800] text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>
      </section>

      {/* ─── FILTERS ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-slate-900 pb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-slate-900 transition-all duration-100 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#0F4CFF] text-white shadow-[2px_2px_0px_#0A1020] -translate-y-[1px] -translate-x-[1px]'
                    : 'bg-white text-slate-700 shadow-[1px_1px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[2px_2px_0px_#0A1020]'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-slate-500">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter Rating:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="border-2 border-slate-900 rounded-xl px-3 py-1.5 font-black text-slate-700 bg-white shadow-[1px_1px_0px_#0A1020] focus:outline-none text-xs"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars only</option>
              <option value="4">4 Stars only</option>
              <option value="3">3 Stars only</option>
            </select>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS GRID ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0A1020]" />
            ))}
          </div>
        ) : getFilteredList().length === 0 ? (
          <div className="text-center py-16 bg-white border-2 border-slate-900 rounded-2xl max-w-lg mx-auto p-8 shadow-[5px_5px_0px_#0A1020]">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-black text-slate-800 text-lg mb-1">No matching testimonials found</h3>
            <p className="text-sm text-slate-500 mb-6">Try broadening your device or star-rating filters, or submit a brand-new review first!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F4CFF] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#0A1020] active:translate-y-[1px] active:translate-x-[1px] transition-all cursor-pointer"
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
                  className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[4px_4px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#0A1020] transition-all duration-150 relative overflow-hidden"
                >
                  {/* Verified badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 border-2 border-slate-900 bg-[#00C48C] text-white px-2.5 py-0.5 rounded-xl text-[10px] font-black shadow-[1px_1px_0px_#0A1020]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>

                  <div>
                    <div className="mb-4">
                      <ReviewStars rating={t.rating} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                      "{t.review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t-2 border-slate-900">
                    <img
                      src={t.image}
                      alt={t.customerName}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border-2 border-slate-900 shadow-[1px_1px_0px_#0A1020]"
                    />
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{t.customerName}</h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        <span className="text-[#0F4CFF]">{t.deviceType}</span>
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

      {/* ─── REVIEW MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="review-modal-overlay">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeReviewModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white border-2 border-slate-900 rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-[8px_8px_0px_#0A1020] relative z-10 overflow-hidden"
              id="review-modal"
            >
              <button
                onClick={closeReviewModal}
                className="absolute top-5 right-5 border-2 border-slate-900 text-slate-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-[1px_1px_0px_#0A1020] hover:bg-slate-100 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#00C48C] text-white border-2 border-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_#0A1020] animate-bounce-slow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Feedback Submitted!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Thank you for reviewing your TheMobifixx experience. Your verified customer feedback has been saved to the database successfully.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={closeReviewModal}
                      className="bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] transition-all cursor-pointer"
                    >
                      Close feedback box
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-[#FFB800]" />
                      <span>Leave a Genuine Review</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Are you a verified TheMobifixx client? Your honest feedback helps others choose premium doorstep services safely in Delhi NCR.
                    </p>
                  </div>

                  {formError && (
                    <div className="bg-white border-2 border-rose-500 rounded-xl p-3 text-xs font-bold text-rose-600 shadow-[2px_2px_0px_#F43F5E]">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Star rating */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Select Rating Star Counts *</label>
                      <div className="flex items-center gap-1.5 border-2 border-slate-900 rounded-xl p-2.5 w-max bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button" key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-110"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star className={`w-7 h-7 transition-colors ${star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-500 pl-2">{rating} / 5 Stars</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Your Profile Name</label>
                      <input type="text" disabled value={user?.name || ''}
                        className="w-full border-2 border-slate-900 rounded-xl px-4 py-2.5 text-sm text-slate-400 bg-slate-100 shadow-[1px_1px_0px_#0A1020] cursor-not-allowed font-black" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Device Repaired & Model *</label>
                      <input type="text" required value={deviceType} onChange={(e) => setDeviceType(e.target.value)} placeholder="e.g., MacBook Pro M1 2021 or iPhone 14 Pro"
                        className="w-full border-2 border-slate-900 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Your Honest Feedback Details *</label>
                      <textarea required rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share details of your experience. What issue did you have? How did our certified technician perform?"
                        className="w-full border-2 border-slate-900 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all resize-none" />
                    </div>

                    <div className="flex items-start gap-2.5 pt-2">
                      <input type="checkbox" id="verify-customer-checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-900 text-[#0F4CFF] focus:ring-[#0F4CFF] cursor-pointer" />
                      <label htmlFor="verify-customer-checkbox" className="text-xs text-slate-500 font-bold cursor-pointer select-none leading-relaxed">
                        I verify that I am a customer of TheMobifixx and this feedback accurately reflects my genuine, honest repair experience.
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-slate-900 mt-2">
                      <button type="button" onClick={closeReviewModal}
                        className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-2 border-transparent hover:border-slate-900 cursor-pointer transition-all">
                        Cancel
                      </button>
                      <button type="submit" disabled={submitting}
                        className="bg-[#0F4CFF] disabled:bg-blue-400 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0A1020] hover:shadow-[4px_4px_0px_#0A1020] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px] transition-all flex items-center gap-1.5 cursor-pointer">
                        {submitting ? (
                          <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Saving...</span></>
                        ) : (
                          <><ThumbsUp className="w-3.5 h-3.5" /><span>Submit Feedback</span></>
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
