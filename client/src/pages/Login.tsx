import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // TODO: handle login logic
    };

    return (
        <div className="min-h-screen flex flex-col w-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-10">
            <div className="absolute top-[7em] left-[7em] flex items-center gap-2">
                <div className="bg-cyan-500 rounded-lg p-2">
                    <img src="/favicon-96x96.png" alt="Logo" className="w-8 h-8" />
                </div>
                <span className="font-bold text-xl tracking-tight">Chat App</span>
            </div>
            <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-lg p-8 mt-12">
                <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
                <p className="text-white/70 text-center mb-6">Sign in to join use <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Chat App</span></p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-200 mt-2"
                    >
                        Login
                    </button>
                </form>
                {error && (
                    <div className="mt-4 text-red-300 text-center text-sm">{error}</div>
                )}
                <div className="mt-6 text-center text-white/70 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-cyan-300 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
