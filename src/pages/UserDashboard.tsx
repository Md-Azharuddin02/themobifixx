import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ShieldCheck, Mail, Calendar, Loader2, ArrowRight, Wrench, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAuthToken, getAuthUser, clearAuth } from '../utils/auth';
import { RepairRequest } from '../types';

const statusMeta = {
  pending: { label: 'Awaiting Confirmation', color: 'bg-amber-100 text-amber-800' },
  accepted: { label: 'Transit / Tech Assigned', color: 'bg-blue-100 text-blue-800' },
  in_repair: { label: 'In Service (Repairing)', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'QC Passed & Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Request Cancelled', color: 'bg-gray-100 text-gray-600' },
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => getAuthToken());
  const [user] = useState(() => getAuthUser());

  const [bookings, setBookings] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Testimonial State
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewDevice, setReviewDevice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    if (!token || !user) {
      clearAuth();
      navigate('/login');
      return;
    }

    fetchUserBookings();

    const interval = setInterval(fetchUserBookings, 20000); // Poll every 20 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [token, user, navigate]);

  const fetchUserBookings = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/user/repair-requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        clearAuth();
        navigate('/login');
        window.location.reload();
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bookings.');
      }
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard files.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setIsSubmitting(true);
    setReviewMessage('');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customerName: user?.name || 'Anonymous',
          rating: reviewRating,
          review: reviewText,
          deviceType: reviewDevice,
          userId: user?.id
        })
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setReviewMessage('Thank you for your feedback! It will appear on our homepage.');
      setReviewText('');
      setReviewDevice('');
      setReviewRating(5);

      // Clear message after 5 seconds
      setTimeout(() => setReviewMessage(''), 5000);
    } catch (err: any) {
      setReviewMessage('Error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-orange animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Dashboard Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{user?.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange bg-orange-50 px-5 py-2.5 rounded-full hover:bg-orange-100 transition-colors"
              >
                <span>Admin Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 border border-gray-200 bg-white px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left panel: Active orders (8-cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-orange" />
              <span>Your Active Repair Orders ({bookings.length})</span>
            </h2>

            {error && (
              <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm space-y-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto text-gray-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">No Bookings Found</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">You haven't scheduled any doorstep pickups or repair requests under this account yet.</p>
                <Link
                  to="/contact?tab=booking"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange px-6 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <span>Book Repair Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const meta = statusMeta[booking.status] || statusMeta.pending;
                  return (
                    <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                        <div>
                          <span className="text-xs text-gray-400 block mb-0.5">Order ID</span>
                          <span className="font-bold text-gray-900 font-mono tracking-wider">{booking.id}</span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${meta.color}`}>
                          {meta.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5">
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Device Details</span>
                          <p className="text-sm text-gray-900 font-bold">{booking.brand} {booking.model}</p>
                          <p className="text-xs text-gray-500 mt-0.5 capitalize">{booking.deviceType}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Pickup Date</span>
                          <p className="text-sm text-gray-900 font-bold flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{booking.preferredDate}</span>
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Address</span>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {booking.pickupRequired ? booking.pickupAddress : 'Counter Drop-in'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                        <span className="text-xs text-gray-500 font-bold block mb-1">Issue Description</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{booking.issueDescription}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400">Created on {new Date(booking.createdAt).toLocaleDateString()}</span>
                        <Link
                          to={`/tracker?id=${booking.id}`}
                          className="inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-orange-600 transition-colors"
                        >
                          <span>Track Order</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right panel: Information support (4-cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Useful Resources</h2>

            {/* Guarantee support panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-base">Security & Warranty Guarantee</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Every replacement part installed is covered by our standard 90-day warranty. We prioritize data security and part authenticity.
                </p>
              </div>
            </div>

            {/* Step diagnostics panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-base">Quick Tracking Steps</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Use the live tracker panel to monitor your order in real-time. If you require immediate updates, directly chat with our helpdesk.
                </p>
              </div>
            </div>

            {/* Testimonial Form Panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Share Your Experience</h2>
              <form onSubmit={handleTestimonialSubmit} className="space-y-3">
                {reviewMessage && (
                  <div className={`p-3 rounded-lg text-sm font-medium ${reviewMessage.includes('Thank') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {reviewMessage}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={e => setReviewRating(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-brand-orange"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Terrible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Device Fixed (Optional)</label>
                  <input
                    type="text"
                    value={reviewDevice}
                    onChange={e => setReviewDevice(e.target.value)}
                    placeholder="e.g. iPhone 13 Pro"
                    className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Review</label>
                  <textarea
                    required
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Tell us about your repair experience..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-brand-orange resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Review
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
