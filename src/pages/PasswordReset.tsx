import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export function ForgotPassword() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();

    const onSubmit = async (data: { email: string }) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || 'Failed to send reset link.');

            setSubmitStatus('success');
            setMessage(resData.message);
        } catch (err: any) {
            setSubmitStatus('error');
            setMessage(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 md:pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="relative w-full max-w-md px-4 z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <img src='https://res.cloudinary.com/dzhsxv2wq/image/upload/v1783492584/logo_ixtnqx.jpg' alt="TheMobifixx" className="h-12 w-auto mx-auto" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-sm text-gray-500 mt-2">Enter your email to receive a password reset link.</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                    {message && (
                        <div className={`mb-5 flex items-center space-x-2 p-3.5 rounded-lg text-sm font-medium ${submitStatus === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                            {submitStatus === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                            <span>{message}</span>
                        </div>
                    )}

                    {submitStatus !== 'success' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        {...register('email', { required: 'Please enter your email address' })}
                                        className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${errors.email ? 'border-rose-300' : ''}`}
                                    />
                                </div>
                                {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>}
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm">
                                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></> : 'Send Reset Link'}
                            </button>
                        </form>
                    )}
                </div>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-brand-orange font-bold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: { password: '', confirmPassword: '' }
    });
    const password = watch('password');

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setStatus('idle');
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password: data.password }),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || 'Failed to reset password.');

            setStatus('success');
            setMessage(resData.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="pt-32 text-center">
                <h2 className="text-xl font-bold">Invalid Reset Link</h2>
                <p className="text-gray-600">No reset token was provided. Please request a new link.</p>
                <Link to="/forgot-password" className="text-brand-orange font-bold mt-4 inline-block">Request Again</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="relative w-full max-w-md px-4 z-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
                    <p className="text-sm text-gray-500 mt-2">Enter a new secure password for your account.</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                    {message && (
                        <div className={`mb-5 flex items-center space-x-2 p-3.5 rounded-lg text-sm font-medium ${status === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                            {status === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                            <span>{message}</span>
                        </div>
                    )}

                    {status !== 'success' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        {...register('password', { required: 'Please enter a new password', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                        className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-12 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange transition-all ${errors.password ? 'border-rose-300' : ''}`}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-xs text-rose-500 mt-1 block">{errors.password.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || 'Passwords do not match' })}
                                    className={`w-full text-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-orange transition-all ${errors.confirmPassword ? 'border-rose-300' : ''}`}
                                />
                                {errors.confirmPassword && <span className="text-xs text-rose-500 mt-1 block">{errors.confirmPassword.message}</span>}
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-brand-orange disabled:bg-gray-300 text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm">
                                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving...</span></> : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}