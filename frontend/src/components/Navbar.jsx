import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX, HiLogout, HiUser, HiHome, HiDocumentReport, HiSearch, HiInformationCircle } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'WORKER') return '/worker/dashboard';
    return '/report';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-primary-300 transition-shadow">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="text-xl font-bold text-slate-800">
              Eco<span className="text-primary-500">Clean</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium text-sm">
              <HiHome className="w-4 h-4" /> Home
            </Link>
            <Link to="/report" className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium text-sm">
              <HiDocumentReport className="w-4 h-4" /> Report Waste
            </Link>
            <Link to="/track" className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium text-sm">
              <HiSearch className="w-4 h-4" /> Track Request
            </Link>
            <Link to="/about" className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium text-sm">
              <HiInformationCircle className="w-4 h-4" /> About
            </Link>
          </div>

          {/* Auth Area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardLink()} className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium text-sm hover:bg-primary-100 transition-all">
                  <HiUser className="w-4 h-4" />
                  <span>{user.fullName}</span>
                  <span className="text-xs bg-primary-200 text-primary-800 px-2 py-0.5 rounded-full font-bold">{user.role}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-all">
                  <HiLogout className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm !py-2.5 !px-5">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-primary-50 hover:text-primary-600 font-medium">
              <HiHome className="w-5 h-5" /> Home
            </Link>
            <Link to="/report" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-primary-50 hover:text-primary-600 font-medium">
              <HiDocumentReport className="w-5 h-5" /> Report Waste
            </Link>
            <Link to="/track" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-primary-50 hover:text-primary-600 font-medium">
              <HiSearch className="w-5 h-5" /> Track Request
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-primary-50 hover:text-primary-600 font-medium">
              <HiInformationCircle className="w-5 h-5" /> About
            </Link>
            <hr className="my-2 border-slate-100" />
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-primary-600 bg-primary-50 font-medium">
                  <HiUser className="w-5 h-5" /> {user.fullName} ({user.role})
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium">
                  <HiLogout className="w-5 h-5" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center btn-primary !rounded-xl">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
