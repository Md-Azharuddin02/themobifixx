import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { setAuthToken, setAuthUser } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      // Force reload to update navigation header states
      if (resData.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="relative w-full max-w-md px-4 z-10">

        {/* Logo Rebranding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-12 w-auto mx-auto" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Log in to manage your repairs and bookings.</p>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-5 flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-3.5 rounded-lg text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { required: 'Please enter your email address' })}
                  className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                    }`}
                />
              </div>
              {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-brand-orange hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Please enter your password' })}
                  className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-12 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.password ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-rose-500 mt-1 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Redirect text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-orange font-bold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
