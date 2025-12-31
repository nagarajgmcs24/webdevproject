
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole, User } from '../../types';
import { dbService } from '../../services/dbService';
import { BENGALURU_WARDS } from '../../constants';
import { UserPlus, ShieldCheck, UserCircle, MapPin, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.CITIZEN);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    ward: BENGALURU_WARDS[0].name
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (dbService.findUserByUsername(formData.username)) {
      setError('Username already exists');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username: formData.username,
      fullName: formData.fullName,
      password: formData.password,
      role: role,
      ward: formData.ward
    };

    dbService.saveUser(newUser);
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 pb-0">
            <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Create Account</h1>
            <p className="text-slate-500 text-center mb-8">Join the civic revolution in Bengaluru</p>

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

          <form onSubmit={handleSignup} className="p-8 pt-0 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Assign Ward</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none appearance-none"
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                >
                  {BENGALURU_WARDS.map(w => (
                    <option key={w.name} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Sign Up
            </button>

            <div className="text-center pt-2">
              <span className="text-slate-500 text-sm">Already have an account? </span>
              <Link to="/login" className="text-indigo-600 font-bold text-sm hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
