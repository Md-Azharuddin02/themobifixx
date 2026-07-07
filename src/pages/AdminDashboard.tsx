import React, { useEffect, useState } from 'react';
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

const stages = ['pending', 'accepted', 'in_repair', 'completed', 'cancelled'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => getAuthToken());
  const [admin] = useState(() => getAuthUser());

  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'reviews' | 'technicians' | 'inquiries'>('orders');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [usersList, setUsersList] = useState<User[]>([]);
  const [ordersList, setOrdersList] = useState<RepairRequest[]>([]);
  const [reviewsList, setReviewsList] = useState<Testimonial[]>([]);
  const [techList, setTechList] = useState<Technician[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);

  const [isTechFormOpen, setIsTechFormOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technician | null>(null);

  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    customerName: '',
    rating: 5,
    deviceType: '',
    review: ''
  });

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

      const rRes = await fetch('/api/testimonials');
      if (!rRes.ok) throw new Error('Failed to fetch testimonials');
      const rData = await rRes.json();
      setReviewsList(Array.isArray(rData) ? rData : []);

      const tRes = await fetch('/api/technicians');
      if (!tRes.ok) throw new Error('Failed to fetch technicians');
      const tData = await tRes.json();
      setTechList(Array.isArray(tData) ? tData : []);

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

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.customerName || !newTestimonial.review) return;
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTestimonial)
      });
      if (!response.ok) throw new Error('Failed to add testimonial');
      const data = await response.json();
      setReviewsList(prev => [data, ...prev]);
      setIsTestimonialFormOpen(false);
      setNewTestimonial({ customerName: '', rating: 5, deviceType: '', review: '' });
      showAlert('Success', 'Testimonial added successfully');
    } catch (err: any) {
      showAlert('Error', err.message);
    }
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
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-orange animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Loading Admin Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-slate-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Header Banner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Administration Hub</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">TheMobifixx Operations Suite</h1>
            <p className="text-sm text-gray-500 mt-2">Manage diagnostics, user access, engineers, and verify feedback.</p>
          </div>
          <div className="bg-slate-100 text-gray-800 border border-gray-200 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
            Admin: {admin?.name}
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'orders' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:text-primary hover:border-gray-300'
              }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Repair Orders ({ordersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'users' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:text-primary hover:border-gray-300'
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Access ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'reviews' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:text-primary hover:border-gray-300'
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials ({reviewsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('technicians')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'technicians' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:text-primary hover:border-gray-300'
              }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Technicians ({techList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:text-primary hover:border-gray-300'
              }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({inquiriesList.length})</span>
          </button>
        </div>

        {/* Tab contents */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">Repair Diagnostics Queue</h2>
                <span className="text-xs bg-slate-100 text-gray-600 font-bold border border-gray-200 px-3 py-1.5 rounded-full">
                  {ordersList.length} inquiries registered
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4 font-bold">Order ID / Date</th>
                      <th className="py-3 px-4 font-bold">Customer info</th>
                      <th className="py-3 px-4 font-bold">Device Details</th>
                      <th className="py-3 px-4 font-bold">Status Step</th>
                      <th className="py-3 px-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(ordersList) && ordersList.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-slate-50/50 text-sm">
                        <td className="py-4 px-4">
                          <span className="font-mono font-bold text-gray-900">{order.id}</span>
                          <span className="block text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.phone}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-800">{order.brand} {order.model}</p>
                          <p className="text-xs text-gray-500 capitalize">{order.deviceType}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="relative inline-block w-44">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id!, e.target.value)}
                              className="w-full bg-slate-100 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-accent appearance-none cursor-pointer"
                            >
                              {stages.map(s => (
                                <option key={s} value={s}>{s.toUpperCase().replace('_', ' ')}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/tracker?id=${order.id}`)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            Tracker
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id!)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 p-1.5 rounded-lg hover:bg-rose-100 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
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
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">User Accounts Management</h2>
                <span className="text-xs bg-slate-100 text-gray-600 font-bold border border-gray-200 px-3 py-1.5 rounded-full">
                  {usersList.length} Profiles Registered
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Name / Date</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(usersList) && usersList.map((userRecord) => (
                      <tr key={userRecord.id} className="border-b border-gray-50 hover:bg-slate-50/50 text-sm">
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{userRecord.name}</p>
                          <span className="text-xs text-gray-400 block mt-0.5">{new Date(userRecord.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{userRecord.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${userRecord.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {userRecord.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {userRecord.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(userRecord.id)}
                              className="text-rose-500 hover:text-rose-700 p-2 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
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
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Testimonials Feedback Audit</h2>
                  <span className="text-xs bg-slate-100 text-gray-600 font-bold border border-gray-200 px-3 py-1.5 rounded-full mt-2 inline-block">
                    {reviewsList.length} Feedbacks active
                  </span>
                </div>
                <button
                  onClick={() => setIsTestimonialFormOpen(true)}
                  className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-secondary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </div>

              {isTestimonialFormOpen && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
                  <h3 className="text-md font-bold mb-4">Add New Testimonial</h3>
                  <form onSubmit={handleAddTestimonial} className="space-y-4 max-w-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Customer Name</label>
                        <input
                          type="text"
                          required
                          value={newTestimonial.customerName}
                          onChange={e => setNewTestimonial({ ...newTestimonial, customerName: e.target.value })}
                          className="w-full bg-slate-100 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                        <select
                          value={newTestimonial.rating}
                          onChange={e => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                          className="w-full bg-slate-100 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-accent"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Device Fixed (Optional)</label>
                      <input
                        type="text"
                        value={newTestimonial.deviceType}
                        onChange={e => setNewTestimonial({ ...newTestimonial, deviceType: e.target.value })}
                        placeholder="e.g. iPhone 13 Pro"
                        className="w-full bg-slate-100 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Review Content</label>
                      <textarea
                        required
                        rows={3}
                        value={newTestimonial.review}
                        onChange={e => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                        className="w-full bg-slate-100 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:border-accent resize-none"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsTestimonialFormOpen(false)}
                        className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-secondary"
                      >
                        Save Testimonial
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(reviewsList) && reviewsList.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50 mb-3">
                        <div className="flex items-center gap-3">
                          <img src={review.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{review.customerName}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{review.deviceType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          <span>★</span>
                          <span>{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium line-clamp-3">"{review.review}"</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50 text-xs">
                      <span className="text-gray-400 font-mono">{review.id}</span>
                      <button
                        onClick={() => handleDeleteTestimonial(review.id!)}
                        className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
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
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Engineers Directory</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage technician profiles and specializations.</p>
                </div>
                <button
                  onClick={handleOpenAddTech}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary px-5 py-2.5 rounded-full hover:bg-secondary transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Engineer</span>
                </button>
              </div>

              {/* Add/Edit Form Overlay */}
              {isTechFormOpen && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-8 space-y-5">
                  <h3 className="text-base font-bold text-gray-900">
                    {editingTech ? 'Modify Engineer Profile' : 'Register New Service Engineer'}
                  </h3>

                  <form onSubmit={handleSubmit(onSubmitTechForm)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Designation</label>
                      <input
                        type="text"
                        {...register('designation', { required: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Experience (Years)</label>
                      <input
                        type="number"
                        {...register('experience', { required: true, valueAsNumber: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Specialization</label>
                      <input
                        type="text"
                        {...register('specialization', { required: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                        placeholder="e.g. Logic Board Repair"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Repairs Completed</label>
                      <input
                        type="number"
                        {...register('repairsCompleted', { required: true, valueAsNumber: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('rating', { required: true, valueAsNumber: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Service Areas (Comma-separated)</label>
                      <input
                        type="text"
                        {...register('serviceAreas', { required: true })}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                        placeholder="e.g. Nehru Place, Gurugram, Noida"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Certifications (Comma-separated)</label>
                      <input
                        type="text"
                        {...register('certifications')}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                        placeholder="e.g. ACMT, Electronics Eng"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Photo Image URL</label>
                      <input
                        type="text"
                        {...register('profileImage')}
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsTechFormOpen(false)}
                        className="text-sm font-bold text-gray-700 bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm font-bold text-white bg-primary px-6 py-2.5 rounded-full hover:bg-secondary shadow-sm transition-colors cursor-pointer"
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
                  <div key={tech.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 bg-gray-100">
                        <img src={tech.profileImage} className="w-full h-full object-cover object-top" alt="" />
                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {tech.designation}
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{tech.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{tech.specialization}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600 bg-slate-100 p-3 rounded-xl border border-gray-100">
                          <div>EXP: {tech.experience} Years</div>
                          <div className="text-right">REPAIRS: {tech.repairsCompleted}+</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 pt-0 flex justify-between gap-3">
                      <button
                        onClick={() => handleOpenEditTech(tech)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-gray-700 bg-slate-100 hover:bg-slate-200 border border-gray-200 py-2.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTech(tech.id!)}
                        className="inline-flex items-center justify-center text-rose-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">General Inquiries Inbox</h2>
                <span className="text-xs bg-slate-100 text-gray-600 font-bold border border-gray-200 px-3 py-1.5 rounded-full">
                  {inquiriesList.length} Messages
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(inquiriesList) && inquiriesList.map((inq) => (
                  <div key={inq.id} className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between border-b border-gray-50 pb-3 mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{inq.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{new Date(inq.createdAt).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id!)}
                          className="text-rose-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 mb-4 text-sm text-gray-700">
                        <p><strong>Phone:</strong> {inq.phone}</p>
                        {inq.email && <p><strong>Email:</strong> {inq.email}</p>}
                      </div>
                      <div className="bg-slate-100 border border-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed font-medium">
                        "{inq.message}"
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-end">
                      <a
                        href={`https://wa.me/91${inq.phone}?text=Hi%20${encodeURIComponent(inq.name)},%20we%20received%20your%20inquiry%20regarding:%20${encodeURIComponent(inq.message)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-green-500 px-5 py-2 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Reply via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}

                {inquiriesList.length === 0 && (
                  <div className="col-span-full py-10 text-center text-gray-500">
                    <Mail className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                    <p className="font-medium text-sm">Inbox is empty. No general inquiries yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Global Dialog Modal */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{dialog.title}</h3>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">{dialog.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDialog}
                className="text-sm font-bold text-gray-700 bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                {dialog.type === 'confirm' ? 'Cancel' : 'Dismiss'}
              </button>
              {dialog.type === 'confirm' && (
                <button
                  onClick={() => {
                    dialog.onConfirm?.();
                    closeDialog();
                  }}
                  className="text-sm font-bold text-white bg-primary px-6 py-2.5 rounded-full hover:bg-secondary shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Action
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
