import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight, AlertCircle, Info, Eye, EyeOff } from 'lucide-react';
import { setAuthToken, setAuthUser } from '../utils/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Registration failed. Please try again.');
      }

      setAuthToken(resData.token);
      setAuthUser(resData.user);

      // Instantly navigate to home since access to UserDashboard needs Admin approval!
      navigate('/');

      // Force reload to update navigation header states
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="relative w-full max-w-md px-4 z-10">

        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-12 w-auto mx-auto" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">Sign up to book repairs and track your devices.</p>
        </div>

        {/* Card Form container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-5 flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-600 p-3.5 rounded-lg text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  {...register('name', { required: 'Please enter your name' })}
                  className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.name ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                    }`}
                />
              </div>
              {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  {...register('email', {
                    required: 'Please enter your email address',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                    }`}
                />
              </div>
              {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Please enter your password',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match'
                  })}
                  className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-12 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.confirmPassword ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' : ''
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-xs text-rose-500 mt-1 block">{errors.confirmPassword.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Redirect back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-orange font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
