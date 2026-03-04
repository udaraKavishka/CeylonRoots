'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Leaf, Mail, Lock, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const DESTINATIONS = ['🐘 Yala Safari', '🏯 Sigiriya Rock', '🌊 Southern Coast', '🍵 Tea Country', '🕌 Galle Fort'];

export default function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useUser();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fullName, email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Registration failed. Please try again.');
                setIsLoading(false);
                return;
            }

            const result = await signIn('credentials', { email, password, redirect: false });
            if (result?.error) {
                setError('Account created but login failed. Please log in manually.');
                setIsLoading(false);
                return;
            }

            const nameParts = fullName.split(' ');
            login({
                firstName: nameParts[0] || fullName,
                lastName: nameParts.slice(1).join(' ') || '',
                email,
                role: 'user',
            });

            router.push('/');
        } catch {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Decorative top bar (mobile) */}
            <div className="lg:hidden h-1 w-full" style={{ background: 'linear-gradient(90deg, #2E8B57, #1A5276, #D4AF37)' }} />

            {/* Form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[hsl(40,30%,98%)] order-2 lg:order-1">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
                        <Leaf className="h-5 w-5 text-ceylon-tea" />
                        <span className="text-xl font-bold">Ceylon<span className="text-ceylon-spice">Roots</span></span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Start your adventure
                        </h1>
                        <p className="text-gray-500 text-sm">Create your free CeylonRoots account</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{width:'17px',height:'17px'}} />
                                <input
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="Jane Smith"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{width:'17px',height:'17px'}} />
                                <input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{width:'17px',height:'17px'}} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff style={{width:'17px',height:'17px'}} /> : <Eye style={{width:'17px',height:'17px'}} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3">
                                <span className="mt-0.5">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 mt-1 rounded-xl font-semibold text-sm text-white transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ background: 'linear-gradient(135deg, #2E8B57 0%, #1A5276 100%)' }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : 'Create free account'}
                        </button>

                        <div className="relative my-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[hsl(40,30%,98%)] px-3 text-xs text-gray-400 uppercase tracking-wider">or</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        By joining, you agree to our{' '}
                        <Link href="/tos" className="text-ceylon-tea hover:underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-ceylon-tea hover:underline">Privacy Policy</Link>
                    </p>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-ceylon-tea hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Visual panel */}
            <div className="lg:w-[45%] bg-gradient-to-br from-ceylon-tea via-ceylon-ocean to-ceylon-ocean/90 flex flex-col justify-between p-12 order-1 lg:order-2 min-h-[240px] lg:min-h-screen">
                <Link href="/" className="flex items-center gap-2 text-white hidden lg:flex">
                    <Leaf className="h-6 w-6 text-ceylon-sand" />
                    <span className="text-2xl font-bold tracking-tight">Ceylon<span className="text-ceylon-sand">Roots</span></span>
                </Link>

                <div className="hidden lg:block space-y-8">
                    <p className="text-ceylon-sand/80 text-sm uppercase tracking-widest font-medium">Your next adventure awaits</p>
                    <h2 className="text-white text-4xl leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Discover Sri Lanka like a local
                    </h2>
                    <div className="space-y-3">
                        {DESTINATIONS.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-ceylon-sand/60 flex-shrink-0" />
                                <span className="text-sm">{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden lg:grid grid-cols-3 gap-6 text-white">
                    {[['10K+','Happy travelers'],['50+','Destinations'],['14','Years of expertise']].map(([n, l]) => (
                        <div key={n}>
                            <div className="text-2xl font-bold text-ceylon-sand">{n}</div>
                            <div className="text-xs text-white/60 mt-0.5">{l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
