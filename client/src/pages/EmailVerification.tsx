/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface FormData {
    otp: string;
}

export default function EmailVerification() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
    //   const navigate = useNavigate();
    const location = useLocation();
    const email = (location.state && location.state.email) || '';
    const params = useParams();
    const base_url = window.location.origin;
    const { verifyEmail } = useAuth();
    const onSubmit = async (data: FormData) => {
        // TODO: Call /api/auth/verifyEmail with email and otp
        // If success, navigate to login or home
        // If error, show error message
        alert(`Verifying OTP: ${data.otp} for email: ${email}`);
    };
    const checkParams = async() => {
        if(params.token && params.otp) {
        toast.info('We are verifying your email. Please wait a moment...');
        await verifyEmail({ token: params.token, otp: params.otp });
        // Optionally, you could add a delay here if you want to simulate waiting
        // await new Promise(res => setTimeout(res, 1500));
    }
    }
    useEffect(()=>{
        checkParams();
        
    },[])
    return (
        <div className="min-h-screen flex flex-col w-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-10">
            <div className="flex flex-col w-full max-w-md bg-white/10 rounded-2xl shadow-lg p-8 items-center justify-center">
                {params.otp ? null : (
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-center">Verify Your Email</h2>
                        <p className="text-white/70 text-center mb-6">Enter the 6-digit code sent to your email.</p>
                    </div>
                )}
                {params.otp ? (
                    <div className="flex flex-col items-center justify-center w-full py-12">
                        <svg className="animate-spin h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <p className="text-lg font-semibold text-cyan-200 mb-2">Verifying your code...</p>
                        <p className="text-sm text-white/70">Please wait while we verify your email.</p>
                        <p className="text-xs text-white/50 mt-4 text-center">{base_url}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full" autoComplete="off">
                        <input
                            type="text"
                            maxLength={6}
                            inputMode="numeric"
                            pattern="[0-9]{6}"
                            {...register('otp', {
                                required: 'OTP is required',
                                minLength: { value: 6, message: 'OTP must be 6 digits' },
                                maxLength: { value: 6, message: 'OTP must be 6 digits' },
                                pattern: { value: /^[0-9]{6}$/, message: 'OTP must be 6 digits' },
                            })}
                            placeholder="Enter 6-digit code"
                            className={`rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-center tracking-widest text-2xl ${errors.otp ? 'border border-red-500' : ''}`}
                            autoFocus
                        />
                        {errors.otp && <p className="text-xs text-red-300 mt-1 text-center">{errors.otp.message}</p>}
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-200 mt-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify Email'}
                        </button>
                        <p className="text-xs text-white/70 mt-2 text-center">Didn't receive the code? <button className="text-cyan-400 hover:underline">Resend OTP</button></p>
                    </form>
                )}
            </div>
        </div>
    );
}
