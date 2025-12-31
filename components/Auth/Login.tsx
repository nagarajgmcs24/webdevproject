
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../../types';
import { dbService } from '../../services/dbService';
import { LogIn, ShieldCheck, UserCircle, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CITIZEN);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = dbService.findUserByUsername(username);

    if (!user) {
      setError('Username not found. Please sign up.');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    if (user.role !== role) {
      setError(`This account is registered as a ${user.role}. Please select correct role.`);
      return;
    }

    // Success
    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem('fmw_session', JSON.stringify(sessionUser));
    onLogin(sessionUser);
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 pb-0">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-center mb-8">Login to your Fix-My-Ward account</p>

            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setRole(UserRole.CITIZEN)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === UserRole.CITIZEN ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <UserCircle className="w-4 h-4" />
                Citizen
              </button>
              <button
                onClick={() => setRole(UserRole.COUNCILLOR)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === UserRole.COUNCILLOR ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Councillor
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 pt-0 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>

            <div className="pt-4 text-center">
              <span className="text-slate-500 text-sm">Don't have an account? </span>
              <Link to="/signup" className="text-indigo-600 font-bold text-sm hover:underline">
                Create Account
              </Link>
            </div>
          </form>
          
          <div className="relative group overflow-hidden">
            <img 
              src="https://picsum.photos/seed/bengaluru/600/200" 
              className="w-full h-24 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              alt="Bengaluru skyline"
            />
            <div className="absolute inset-0 bg-indigo-900/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
