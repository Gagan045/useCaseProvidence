
import React, { useState } from 'react';
import { MailIcon, LockIcon } from './Icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic: success if fields are not empty
        if(email.trim() && password.trim()) {
            onLoginSuccess();
        } else {
            alert('Please enter your email and password.');
        }
    };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                     <h1 className="text-4xl font-bold text-providence-blue">
                        Health<span className="text-providence-green">Hub</span>
                    </h1>
                    <p className="text-slate-500 mt-2">Welcome back! Please sign in to your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="text-slate-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-providence-green focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                         <div className="flex justify-between items-baseline">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <a href="#" className="text-sm text-providence-blue hover:underline">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="text-slate-400" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-providence-green focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-providence-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-providence-green/90 transition transform hover:-translate-y-0.5">
                            Sign In
                        </button>
                    </div>
                </form>
                
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="w-full flex items-center justify-center py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                       {/* Placeholder for Google Icon */}
                       <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.655-3.657-11.127-8.588l-6.521 5.023C9.507 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.417 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                        Google
                    </button>
                    <button className="w-full flex items-center justify-center py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                       {/* Placeholder for Apple Icon */}
                       <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M17.485 15.358c-.89 2.23-2.73 3.633-4.717 3.633c-1.852 0-3.04-1.12-4.575-3.328c-2.92-4.217-4.14-9.39-2.23-12.425c.983-1.56 2.66-2.52 4.456-2.52c1.78 0 2.93.923 4.22 2.738c-2.113 1.25-3.48 3.32-3.48 5.673c0 2.93 1.88 4.39 3.86 3.52c.21-.093.42-.186.63-.278c.244-.104.48-.19.673-.243c.22-.06.38-.09.47-.1c.09-.01.13 0 .13 0c.03.003 1.05.41 1.05 2.12zM15.22 5.46c.92-.98 1.54-2.22 1.48-3.46c-1.1.03-2.3.62-3.22 1.63c-.83.89-1.57 2.28-1.48 3.42c1.24.03 2.3-.59 3.22-1.59z"/></svg>
                        Apple
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Don't have an account? <a href="#" className="font-semibold text-providence-blue hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    </div>
  );
};

export default Login;
