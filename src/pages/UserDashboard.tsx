import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ShieldCheck, Mail, Calendar, Loader2, ArrowRight, Wrench, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAuthToken, getAuthUser, clearAuth } from '../utils/auth';
import { RepairRequest } from '../types';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

const statusMeta = {
  pending: { label: 'Awaiting Confirmation', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  accepted: { label: 'Transit / Tech Assigned', color: 'bg-[#FFB800] text-slate-950 border-slate-900' },
  in_repair: { label: 'In Service (Repairing)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  completed: { label: 'QC Passed & Delivered', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  cancelled: { label: 'Request Cancelled', color: 'bg-slate-100 text-slate-600 border-slate-300' },
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => getAuthToken());
  const [user] = useState(() => getAuthUser());

  const [bookings, setBookings] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If not logged in, or no dashboard access, send back to home
    if (!token || !user) {
      clearAuth();
      navigate('/login');
      return;
    }

    if (!user.dashboardAccess && user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchUserBookings = async () => {
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

    fetchUserBookings();
  }, [token, user, navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#0F4CFF] animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Syncing user dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-44 pb-20 min-h-screen" style={dotgridStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#0A1020] mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-2 border-slate-900 bg-[#FFB800] text-slate-950 rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#0A1020]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">{user?.name}</h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-2 py-0.5 rounded-full">
                  Verified Profile
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-black text-slate-950 border-2 border-slate-900 bg-[#FFB800] px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0A1020] active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all"
              >
                <span>Admin Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white border-2 border-slate-900 bg-slate-900 px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0A1020] active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Active orders (8-cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#0f4cff]" />
              <span>Your Active Repair Orders ({bookings.length})</span>
            </h2>

            {error && (
              <div className="flex items-center space-x-2 bg-white border-2 border-rose-500 text-rose-600 p-3.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#F43F5E]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 text-center shadow-[4px_4px_0px_#0A1020] space-y-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl border-2 border-slate-900 flex items-center justify-center mx-auto text-slate-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-900 text-base">No Bookings Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">You haven't scheduled any doorstep pickups or repair requests under this account yet.</p>
                <Link
                  to="/contact?tab=booking"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-white border-2 border-slate-900 bg-[#0F4CFF] px-5 py-3 rounded-xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0A1020] transition-all"
                >
                  <span>Book Repair Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const meta = statusMeta[booking.status] || statusMeta.pending;
                  return (
                    <div key={booking.id} className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_#0A1020] hover:-translate-y-0.5 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-100">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ORDER INDEX</span>
                          <span className="font-black text-slate-900 text-base tracking-wide uppercase font-mono">{booking.id}</span>
                        </div>
                        <span className={`inline-block px-3 py-1.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-wider ${meta.color}`}>
                          {meta.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Garget Details</span>
                          <p className="text-xs text-slate-800 font-black uppercase">{booking.brand} {booking.model}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Type: {booking.deviceType}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pickup Date</span>
                          <p className="text-xs text-slate-800 font-black uppercase flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{booking.preferredDate}</span>
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Address</span>
                          <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                            {booking.pickupRequired ? booking.pickupAddress : 'Direct Counter Drop-in'}
                          </p>
                        </div>
                      </div>

                      {/* Diagnostic issue desc */}
                      <div className="bg-[#F8FAFC] border-2 border-slate-900 rounded-xl p-4 mb-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Issue Description</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{booking.issueDescription}</p>
                      </div>

                      {/* Track order details link */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Created at {new Date(booking.createdAt).toLocaleDateString()}</span>
                        <Link
                          to={`/tracker?id=${booking.id}`}
                          className="inline-flex items-center gap-1 text-xs font-black text-[#0f4cff] hover:underline uppercase tracking-wider"
                        >
                          <span>Open Live Tracker Panel</span>
                          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
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
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider">Useful Resources</h2>
            
            {/* Guarantee support panel */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 space-y-4 shadow-[4px_4px_0px_#0A1020]">
              <div className="w-10 h-10 border-2 border-slate-900 bg-[#00C48C] text-white rounded-xl flex items-center justify-center shadow-[1.5px_1.5px_0px_#0A1020]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm">Security & Warranty Guarantee</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Every replacement chip, panel, keyboard layout, or mother-circuit soldering swap done under your orders is covered by our standard stamped 90-day warranty card.
                </p>
              </div>
            </div>

            {/* Step diagnostics panel */}
            <div className="bg-slate-950 text-slate-400 border-2 border-slate-900 rounded-2xl p-5 space-y-4 shadow-[4px_4px_0px_#0A1020]">
              <div className="w-10 h-10 border-2 border-slate-900 bg-[#0F4CFF] text-white rounded-xl flex items-center justify-center shadow-[1.5px_1.5px_0px_#0A1020]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-white text-sm">Quick Tracking Steps</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Use the live tracker panel to query your order stages in real-time. If you require immediate updates or coordinates, directly chat with our helpdesk using the green WhatsApp handle.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
