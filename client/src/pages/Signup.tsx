
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


type FormData = {
    username: string;
    email: string;
    password: string;
};

export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
    const { signup, loading, error, success, email: registeredEmail } = useAuth();
    const base_url = window.location.origin;
    const onSubmit = async (data: FormData) => {
        await signup({
            username: data.username,
            password: data.password,
            email: data.email,
            baseUrl: base_url
        });
    };

    return (
        <div className="min-h-screen flex flex-col w-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-10">
            <div className="flex items-center gap-2">
                <div className="bg-cyan-500 rounded-lg p-2">
                    <img src="/favicon-96x96.png" alt="Logo" className="w-8 h-8" />
                </div>
                <span className="font-bold text-xl tracking-tight">Chat App</span>
            </div>
            <div className="flex flex-col w-full max-w-md bg-white/10 rounded-2xl shadow-lg p-8 mt-12 items-center justify-center">
                <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
                <p className="text-white/70 text-center mb-6">Create your account to start using <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Chat App</span></p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                    <div>
                        <input
                            type="text"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                                maxLength: { value: 20, message: 'Username must be at most 20 characters' },
                                pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' },
                            })}
                            placeholder="Username"
                            className={`rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full ${errors.username ? 'border border-red-500' : ''}`}
                            autoComplete="username"
                        />
                        {errors.username && <p className="text-xs text-red-300 mt-1">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            placeholder="Email"
                            className={`rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full ${errors.email ? 'border border-red-500' : ''}`}
                            autoComplete="email"
                        />
                        {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>}
                        <span className="text-xs text-cyan-200 mt-1">* Your email will be verified in the next step.</span>
                    </div>
                    <div>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                maxLength: { value: 100, message: 'Password must be at most 100 characters' },
                            })}
                            placeholder="Password"
                            className={`rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full ${errors.password ? 'border border-red-500' : ''}`}
                            autoComplete="new-password"
                        />
                        {errors.password && <p className="text-xs text-red-300 mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-200 mt-2"
                        disabled={isSubmitting || loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                {error && <div className="mt-4 text-red-300 text-center text-sm">{error}</div>}
                {success && registeredEmail && (
                    <div className="mt-4 text-green-300 text-center text-sm">Signup successful! Check your email: {registeredEmail}</div>
                )}
                <div className="mt-6 text-center text-white/70 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-300 hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
}
