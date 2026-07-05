import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Users, 
  Wrench, 
  MessageSquare, 
  UserCheck, 
  Trash2, 
  Edit3, 
  Plus, 
  Loader2, 
  AlertCircle, 
  Calendar, 
  CheckCircle,
  Clock,
  Layers,
  ChevronDown,
  Mail
} from 'lucide-react';
import { getAuthToken, getAuthUser, clearAuth } from '../utils/auth';
import { User, RepairRequest, Testimonial, Technician, Inquiry } from '../types';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

const stages = ['pending', 'accepted', 'in_repair', 'completed', 'cancelled'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => getAuthToken());
  const [admin] = useState(() => getAuthUser());

  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'reviews' | 'technicians' | 'inquiries'>('orders');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Data lists
  const [usersList, setUsersList] = useState<User[]>([]);
  const [ordersList, setOrdersList] = useState<RepairRequest[]>([]);
  const [reviewsList, setReviewsList] = useState<Testimonial[]>([]);
  const [techList, setTechList] = useState<Technician[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);

  // Technician Form states
  const [isTechFormOpen, setIsTechFormOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technician | null>(null);

  // Custom neobrutalist dialog configurations
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'alert' | 'confirm';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
  });

  const showAlert = (title: string, message: string) => {
    setDialog({ isOpen: true, type: 'alert', title, message });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setDialog({ isOpen: true, type: 'confirm', title, message, onConfirm });
  };

  const closeDialog = () => {
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      designation: '',
      experience: 1,
      specialization: '',
      repairsCompleted: 0,
      rating: 5.0,
      serviceAreas: '',
      certifications: '',
      profileImage: '',
    }
  });

  const loadAllAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch users
      const uRes = await fetch('/api/admin/users', { headers });
      if (uRes.status === 401) {
        clearAuth();
        navigate('/login');
        window.location.reload();
        return;
      }
      if (!uRes.ok) throw new Error('Failed to fetch users');
      const uData = await uRes.json();
      setUsersList(Array.isArray(uData) ? uData : []);

      // Fetch repair bookings
      const oRes = await fetch('/api/admin/repair-requests', { headers });
      if (oRes.status === 401) {
        clearAuth();
        navigate('/login');
        window.location.reload();
        return;
      }
      if (!oRes.ok) throw new Error('Failed to fetch orders');
      const oData = await oRes.json();
      setOrdersList(Array.isArray(oData) ? oData : []);

      // Fetch testimonials
      const rRes = await fetch('/api/testimonials');
      if (!rRes.ok) throw new Error('Failed to fetch testimonials');
      const rData = await rRes.json();
      setReviewsList(Array.isArray(rData) ? rData : []);

      // Fetch technicians
      const tRes = await fetch('/api/technicians');
      if (!tRes.ok) throw new Error('Failed to fetch technicians');
      const tData = await tRes.json();
      setTechList(Array.isArray(tData) ? tData : []);

      // Fetch general inquiries
      const iRes = await fetch('/api/admin/inquiries', { headers });
      if (iRes.status === 401) {
        clearAuth();
        navigate('/login');
        window.location.reload();
        return;
      }
      if (!iRes.ok) throw new Error('Failed to fetch inquiries');
      const iData = await iRes.json();
      setInquiriesList(Array.isArray(iData) ? iData : []);

    } catch (err: any) {
      setError(err.message || 'Error sync files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !admin || admin.role !== 'admin') {
      navigate('/');
      return;
    }
    loadAllAdminData();
  }, [token, admin, navigate]);

  // Operations
  const handleToggleUserAccess = async (userId: string, currentAccess: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/access`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dashboardAccess: !currentAccess })
      });
      if (!response.ok) throw new Error('Failed to toggle dashboard access.');
      
      setUsersList(prev => prev.map(u => u.id === userId ? { ...u, dashboardAccess: !currentAccess } : u));
    } catch (err: any) {
      showAlert('Error updating access', err.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    showConfirm(
      'Delete User Profile', 
      'Are you sure you want to delete this user profile? All dashboard credentials and doorstep references will be permanently removed.', 
      async () => {
        try {
          const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('Failed to delete user.');
          
          setUsersList(prev => prev.filter(u => u.id !== userId));
          showAlert('Success', 'User profile deleted successfully.');
        } catch (err: any) {
          showAlert('Error deleting user', err.message);
        }
      }
    );
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/repair-requests/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status.');
      
      setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: status as any } : o));
    } catch (err: any) {
      showAlert('Error updating status', err.message);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    showConfirm(
      'Delete Repair Request', 
      'Are you sure you want to delete this repair request? This action cannot be undone and will erase all diagnostics data.', 
      async () => {
        try {
          const response = await fetch(`/api/admin/repair-requests/${orderId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('Failed to delete order.');
          
          setOrdersList(prev => prev.filter(o => o.id !== orderId));
          showAlert('Success', 'Repair request deleted successfully.');
        } catch (err: any) {
          showAlert('Error deleting order', err.message);
        }
      }
    );
  };

  const handleDeleteInquiry = async (inqId: string) => {
    showConfirm(
      'Delete Inquiry', 
      'Are you sure you want to delete this general inquiry message?', 
      async () => {
        try {
          const response = await fetch(`/api/admin/inquiries/${inqId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('Failed to delete inquiry.');
          
          setInquiriesList(prev => prev.filter(i => i.id !== inqId));
          showAlert('Success', 'General inquiry deleted successfully.');
        } catch (err: any) {
          showAlert('Error deleting inquiry', err.message);
        }
      }
    );
  };

  const handleDeleteTestimonial = async (reviewId: string) => {
    showConfirm(
      'Delete Testimonial', 
      'Are you sure you want to delete this testimonial review from the database?', 
      async () => {
        try {
          const response = await fetch(`/api/admin/testimonials/${reviewId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('Failed to delete testimonial review.');
          
          setReviewsList(prev => prev.filter(r => r.id !== reviewId));
          showAlert('Success', 'Testimonial review deleted successfully.');
        } catch (err: any) {
          showAlert('Error deleting testimonial', err.message);
        }
      }
    );
  };

  const handleDeleteTech = async (techId: string) => {
    showConfirm(
      'Delete Technician Profile', 
      'Are you sure you want to delete this technician profile? The engineer will no longer be listed.', 
      async () => {
        try {
          const response = await fetch(`/api/admin/technicians/${techId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('Failed to delete technician.');
          
          setTechList(prev => prev.filter(t => t.id !== techId));
          showAlert('Success', 'Technician profile deleted successfully.');
        } catch (err: any) {
          showAlert('Error deleting technician', err.message);
        }
      }
    );
  };

  const handleOpenAddTech = () => {
    setEditingTech(null);
    reset({
      name: '',
      designation: '',
      experience: 3,
      specialization: '',
      repairsCompleted: 150,
      rating: 4.8,
      serviceAreas: 'Nehru Place, South Delhi',
      certifications: 'Apple Certified Technical Coordinator, ACMT',
      profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
    });
    setIsTechFormOpen(true);
  };

  const handleOpenEditTech = (tech: Technician) => {
    setEditingTech(tech);
    reset({
      name: tech.name,
      designation: tech.designation,
      experience: tech.experience,
      specialization: tech.specialization,
      repairsCompleted: tech.repairsCompleted,
      rating: tech.rating,
      serviceAreas: tech.serviceAreas.join(', '),
      certifications: tech.certifications.join(', '),
      profileImage: tech.profileImage,
    });
    setIsTechFormOpen(true);
  };

  const onSubmitTechForm = async (data: any) => {
    try {
      const payload = {
        ...data,
        serviceAreas: data.serviceAreas.split(',').map((s: string) => s.trim()).filter(Boolean),
        certifications: data.certifications.split(',').map((c: string) => c.trim()).filter(Boolean),
      };

      const url = editingTech 
        ? `/api/admin/technicians/${editingTech.id}`
        : '/api/admin/technicians';

      const method = editingTech ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save technician information.');
      
      setIsTechFormOpen(false);
      loadAllAdminData();
      showAlert('Success', 'Technician database saved successfully.');
    } catch (err: any) {
      showAlert('Error saving profile', err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#0F4CFF] animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Syncing Admin Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-44 pb-20 min-h-screen" style={dotgridStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Banner */}
        <div className="bg-slate-900 border-2 border-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-[6px_6px_0px_#FFB800] mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB800]">Administration Hub</span>
            <h1 className="text-2xl md:text-3xl font-black mt-1">TheMobifixx Operations Suite</h1>
            <p className="text-xs text-slate-300 font-medium mt-1">Audit diagnostics, grant dashboard tokens, edit engineers, or verify feedback testimonials.</p>
          </div>
          <div className="bg-[#FFB800] text-slate-950 border-2 border-slate-900 px-4 py-2.5 rounded-xl text-xs font-black shadow-[2px_2px_0px_#ffffff]">
            Logged in as {admin?.name}
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2 bg-white border-2 border-rose-500 text-rose-600 p-3.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#F43F5E]">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b-2 border-slate-200 pb-5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#0f4cff] text-white border-slate-900' : 'bg-white text-slate-700 border-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Repair Orders ({ordersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-[#0f4cff] text-white border-slate-900' : 'bg-white text-slate-700 border-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Access ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'bg-[#0f4cff] text-white border-slate-900' : 'bg-white text-slate-700 border-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials ({reviewsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('technicians')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer ${
              activeTab === 'technicians' ? 'bg-[#0f4cff] text-white border-slate-900' : 'bg-white text-slate-700 border-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Technicians ({techList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px] transition-all cursor-pointer ${
              activeTab === 'inquiries' ? 'bg-[#0f4cff] text-white border-slate-900' : 'bg-white text-slate-700 border-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({inquiriesList.length})</span>
          </button>
        </div>

        {/* Tab contents */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[5px_5px_0px_#0A1020]">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 uppercase">Repair Diagnostics Queue</h2>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold border border-blue-200 px-3 py-1 rounded-xl">
                  {ordersList.length} inquiries registered
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-slate-50 text-[10px] uppercase font-black tracking-wider text-slate-500">
                      <th className="py-3 px-4">Order ID / Date</th>
                      <th className="py-3 px-4">Customer info</th>
                      <th className="py-3 px-4">Device Details</th>
                      <th className="py-3 px-4 text-center">Status Step</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(ordersList) && ordersList.map((order) => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/50 text-xs">
                        <td className="py-4 px-4">
                          <span className="font-mono font-black text-slate-900 uppercase">{order.id}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          <p className="font-black text-slate-900">{order.customerName}</p>
                          <p className="text-[10px] text-slate-500">{order.phone}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800 uppercase">{order.brand} {order.model}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{order.deviceType}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="relative inline-block w-44">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id!, e.target.value)}
                              className="w-full bg-[#F8FAFC] border-2 border-slate-900 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer"
                            >
                              {stages.map(s => (
                                <option key={s} value={s}>{s.toUpperCase().replace('_', ' ')}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-slate-600 pointer-events-none" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/tracker?id=${order.id}`)}
                            className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f4cff] border border-[#0f4cff]/30 px-2 py-1 rounded hover:bg-[#0f4cff]/5"
                          >
                            <span>Open Tracker</span>
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id!)}
                            className="inline-flex items-center gap-1 text-[10px] font-black text-rose-500 border border-rose-200 bg-rose-50 p-1.5 rounded hover:bg-rose-100 cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 uppercase">User Accounts Management</h2>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold border border-blue-200 px-3 py-1 rounded-xl">
                  {usersList.length} Profiles Registered
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-slate-50 text-[10px] uppercase font-black tracking-wider text-slate-500">
                      <th className="py-3 px-4">Name / Date</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4 text-center">Dashboard Access</th>
                      <th className="py-3 px-4 text-right">Delete Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(usersList) && usersList.map((userRecord) => (
                      <tr key={userRecord.id} className="border-b border-slate-100 hover:bg-slate-50/50 text-xs">
                        <td className="py-4 px-4">
                          <p className="font-black text-slate-900">{userRecord.name}</p>
                          <span className="text-[10px] text-slate-400">{new Date(userRecord.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-700">{userRecord.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border-2 ${
                            userRecord.role === 'admin' ? 'bg-[#FFB800] border-slate-900 text-slate-900' : 'bg-slate-100 border-slate-300 text-slate-600'
                          }`}>
                            {userRecord.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {userRecord.role === 'admin' ? (
                            <span className="text-slate-400 font-bold text-[10px] uppercase">Always Enabled</span>
                          ) : (
                            <button
                              onClick={() => handleToggleUserAccess(userRecord.id, userRecord.dashboardAccess)}
                              className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                                userRecord.dashboardAccess 
                                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-[1px_1px_0px_#00c48c]'
                                  : 'bg-rose-100 border-rose-300 text-rose-800 shadow-[1px_1px_0px_#f43f5e]'
                              }`}
                            >
                              <span>{userRecord.dashboardAccess ? 'Access Approved' : 'Requires Approval'}</span>
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {userRecord.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(userRecord.id)}
                              className="text-rose-500 hover:text-rose-600 p-1 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONIAL REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 uppercase">Testimonials Feedback Audit</h2>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold border border-blue-200 px-3 py-1 rounded-xl">
                  {reviewsList.length} Feedbacks active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.isArray(reviewsList) && reviewsList.map((review) => (
                  <div key={review.id} className="border-2 border-slate-900 rounded-xl p-4 flex flex-col justify-between shadow-[3px_3px_0px_#0A1020]">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                        <div className="flex items-center gap-2">
                          <img src={review.image} className="w-8 h-8 rounded-full border border-slate-900" alt="" />
                          <div>
                            <p className="text-xs font-black text-slate-900">{review.customerName}</p>
                            <p className="text-[9px] text-slate-400 uppercase font-black mt-0.5">{review.deviceType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <span>★</span>
                          <span>{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">"{review.review}"</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400 font-mono font-bold uppercase">{review.id}</span>
                      <button
                        onClick={() => handleDeleteTestimonial(review.id!)}
                        className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-black cursor-pointer uppercase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TECHNICIANS */}
          {activeTab === 'technicians' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase">Engineers Directory</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage technician profile listings, completed repair counts, and specializations.</p>
                </div>
                <button
                  onClick={handleOpenAddTech}
                  className="inline-flex items-center gap-1 text-xs font-black text-slate-950 border-2 border-slate-900 bg-[#FFB800] px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_#0A1020] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Engineer</span>
                </button>
              </div>

              {/* Add/Edit Form Overlay */}
              {isTechFormOpen && (
                <div className="bg-slate-50 border-2 border-slate-900 rounded-xl p-5 md:p-6 mb-8 space-y-4">
                  <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">
                    {editingTech ? 'Modify Engineer Profile' : 'Register New Service Engineer'}
                  </h3>

                  <form onSubmit={handleSubmit(onSubmitTechForm)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Designation</label>
                      <input
                        type="text"
                        {...register('designation', { required: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Experience (Years)</label>
                      <input
                        type="number"
                        {...register('experience', { required: true, valueAsNumber: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Specialization</label>
                      <input
                        type="text"
                        {...register('specialization', { required: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                        placeholder="e.g. Logic Board Repair"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Repairs Completed</label>
                      <input
                        type="number"
                        {...register('repairsCompleted', { required: true, valueAsNumber: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('rating', { required: true, valueAsNumber: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Service Areas (Comma-separated)</label>
                      <input
                        type="text"
                        {...register('serviceAreas', { required: true })}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                        placeholder="e.g. Nehru Place, Gurugram, Noida"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Certifications (Comma-separated)</label>
                      <input
                        type="text"
                        {...register('certifications')}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                        placeholder="e.g. Apple Certified Technical Coordinator"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Photo Image URL</label>
                      <input
                        type="text"
                        {...register('profileImage')}
                        className="w-full text-xs border-2 border-slate-900 rounded-lg p-2.5 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2.5 mt-2.5">
                      <button
                        type="button"
                        onClick={() => setIsTechFormOpen(false)}
                        className="text-xs font-black text-slate-700 border border-slate-300 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-xs font-black text-white bg-[#0F4CFF] border-2 border-slate-900 px-4 py-2 rounded-xl shadow-[2px_2px_0px_#0A1020] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px] transition-all cursor-pointer"
                      >
                        Save Engineer Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Technician list grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(techList) && techList.map((tech) => (
                  <div key={tech.id} className="border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#0A1020] bg-white flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 bg-slate-100 border-b-2 border-slate-900">
                        <img src={tech.profileImage} className="w-full h-full object-cover object-top" alt="" />
                        <span className="absolute bottom-3 left-3 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded border border-slate-700 uppercase">
                          {tech.designation}
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-black text-slate-900 text-base">{tech.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Specialty: {tech.specialization}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <div>EXP: {tech.experience} Years</div>
                          <div className="text-right">REPAIRS: {tech.repairsCompleted}+</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex justify-between gap-2.5">
                      <button
                        onClick={() => handleOpenEditTech(tech)}
                        className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-black text-slate-700 border border-slate-300 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTech(tech.id!)}
                        className="inline-flex items-center justify-center text-[10px] font-black text-rose-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase">General Inquiries Queue</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Audit contact messages, customer requests, and support queries submitted via web form.</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold border border-blue-200 px-3 py-1 rounded-xl">
                  {inquiriesList.length} Messages
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-slate-50 text-[10px] uppercase font-black tracking-wider text-slate-500">
                      <th className="py-3 px-4">Inquiry Details</th>
                      <th className="py-3 px-4">Contact info</th>
                      <th className="py-3 px-4">Message Context</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(inquiriesList) && inquiriesList.map((inq) => (
                      <tr key={inq.id} className="border-b border-slate-100 hover:bg-slate-50/50 text-xs">
                        <td className="py-4 px-4">
                          <span className="font-mono font-black text-slate-900 uppercase">{inq.id}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          <p className="font-black text-slate-900">{inq.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold">{inq.phone}</p>
                          <p className="text-[10px] text-slate-400">{inq.email}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-700 max-w-md break-words font-medium">"{inq.message}"</p>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id!)}
                            className="inline-flex items-center justify-center text-[10px] font-black text-rose-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>

      {/* Unified Custom Neobrutalist Dialog Modal */}
      {dialog.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-slate-900 rounded-2xl p-6 max-w-md w-full shadow-[8px_8px_0px_#0A1020] relative transform transition-transform duration-200">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700 border-2 border-rose-300 px-2 py-0.5 rounded">
                System Notification
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2 uppercase tracking-tight">
                {dialog.title}
              </h3>
            </div>
            <p className="text-xs font-bold text-slate-600 mb-6 leading-relaxed">
              {dialog.message}
            </p>
            <div className="flex items-center justify-end gap-3.5">
              {dialog.type === 'confirm' && (
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 border-2 border-slate-900 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 shadow-[2px_2px_0px_#0A1020] cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  if (dialog.type === 'confirm' && dialog.onConfirm) {
                    dialog.onConfirm();
                  }
                  closeDialog();
                }}
                className="px-4 py-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 shadow-[2px_2px_0px_#0A1020] cursor-pointer"
              >
                {dialog.type === 'confirm' ? 'Yes, Proceed' : 'Okay'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
