
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import CitizenDashboard from './components/Citizen/CitizenDashboard';
import CouncillorDashboard from './components/Councillor/CouncillorDashboard';
import { MapPin, LogOut, LayoutDashboard, PlusCircle, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fmw_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fmw_session');
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900 hidden sm:block">Fix-My-Ward</span>
                <span className="text-sm font-medium text-slate-500 ml-2 px-2 py-0.5 bg-slate-100 rounded-full">
                  Bengaluru
                </span>
              </Link>
              
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <div className="hidden md:flex items-center gap-2 mr-4">
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{user.fullName}</span>
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">{user.role}</span>
                    </div>
                    <Link to="/dashboard" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/dashboard" />} 
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  user.role === UserRole.CITIZEN ? (
                    <CitizenDashboard user={user} />
                  ) : (
                    <CouncillorDashboard user={user} />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Catch-all to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-indigo-600 w-6 h-6" />
                <span className="text-xl font-bold text-slate-900">Fix-My-Ward</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Building a more accountable Bengaluru through citizen participation and modern technology.
              </p>
            </div>
            <div className="col-span-1">
              <h4 className="font-bold text-slate-900 mb-4">Wards</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li>Koramangala</li>
                <li>Indiranagar</li>
                <li>HSR Layout</li>
                <li>Whitefield</li>
              </ul>
            </div>
            <div className="col-span-1">
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <p className="text-slate-500 text-sm">info@fixmyward-blr.in</p>
              <p className="text-slate-500 text-sm">Bengaluru, Karnataka, India</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 text-center mt-10 pt-6 border-t border-slate-100">
            <p className="text-slate-400 text-sm">© 2024 Fix-My-Ward Bengaluru. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
