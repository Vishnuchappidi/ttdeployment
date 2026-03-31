import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Toast from '../components/Toast';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiArrowRight } from 'react-icons/hi';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      const userData = res.data.data;
      login(userData);
      setToast({ message: `Welcome back, ${userData.fullName}!`, type: 'success' });
      setTimeout(() => {
        if (userData.role === 'ADMIN') navigate('/admin/dashboard');
        else if (userData.role === 'WORKER') navigate('/worker/dashboard');
        else navigate('/');
      }, 800);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50 pt-16">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md px-4 animate-slide-up">
        <div className="bg-white rounded-3xl shadow-glass border border-slate-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
              <span className="text-white font-black text-xl">EC</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800">Welcome Back</h1>
            <p className="text-slate-500 mt-1">Sign in to your EcoClean account</p>
          </div>

          {/* Quick Login Cards */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { label: 'Admin', email: 'admin@ecoclean.com', pass: 'admin123', color: 'bg-violet-50 text-violet-700 border-violet-200' },
              { label: 'Worker', email: 'worker1@ecoclean.com', pass: 'worker123', color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: 'Citizen', email: 'citizen@ecoclean.com', pass: 'citizen123', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            ].map((q) => (
              <button key={q.label} type="button"
                onClick={() => setForm({ email: q.email, password: q.pass })}
                className={`px-3 py-2 text-xs font-bold rounded-xl border ${q.color} hover:scale-105 transition-all`}>
                {q.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field !pl-12"
                  placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field !pl-12 !pr-12"
                  placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 text-base">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <HiArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
