import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { setAuthToken, setAuthUser } from '../utils/auth';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Login failed. Please try again.');
      }

      setAuthToken(resData.token);
      setAuthUser(resData.user);

      // Redirect based on role
      if (resData.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(resData.user.dashboardAccess ? '/dashboard' : '/');
      }
      
      // Force reload to update navigation header states
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-36 md:pt-44 pb-20 min-h-screen flex items-center justify-center relative" style={dotgridStyle}>
      <div className="absolute inset-0 bg-[#F8FAFC]/50 pointer-events-none" />

      <div className="relative w-full max-w-md px-4 z-10">
        {/* Logo Rebranding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_#0A1020] mb-4 hover:-translate-y-0.5 transition-transform">
            <ShieldCheck className="w-4 h-4" />
            <span>TheMobifixx Service Suite</span>
          </Link>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Access Your Console</h2>
          <p className="text-sm text-slate-500 font-medium mt-1.5">Manage diagnostics, track repair status, or write testimonials.</p>
        </div>

        {/* Card Container */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#0A1020]">
          {errorMessage && (
            <div className="mb-5 flex items-center space-x-2 bg-white border-2 border-rose-500 text-rose-600 p-3.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#F43F5E]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="Rahul@example.com"
                  {...register('email', { required: 'Please enter your email address' })}
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl pl-11 pr-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.email ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
              </div>
              {errors.email && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Please enter your password' })}
                  className={`w-full text-sm border-2 border-slate-900 rounded-xl pl-11 pr-4 py-3 bg-[#F8FAFC] shadow-[1px_1px_0px_#0A1020] focus:outline-none focus:shadow-[2px_2px_0px_#0A1020] transition-all font-medium ${
                    errors.password ? 'border-rose-500 focus:shadow-[2px_2px_0px_#F43F5E]' : ''
                  }`}
                />
              </div>
              {errors.password && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4CFF] disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Redirect text */}
        <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-wider mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#0F4CFF] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
