import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import Toast from '../components/Toast';
import { HiUser, HiMail, HiLockClosed, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '', address: '', role: 'CITIZEN' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.register(form);
      setToast({ message: 'Registration successful! Redirecting to login...', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50 pt-20 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-lg px-4 animate-slide-up">
        <div className="bg-white rounded-3xl shadow-glass border border-slate-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
              <HiUser className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Create Account</h1>
            <p className="text-slate-500 mt-1">Join EcoClean and report waste issues</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)}
                  className="input-field !pl-12" placeholder="Enter your full name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                  className="input-field !pl-12" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" required minLength="6" value={form.password} onChange={(e) => update('password', e.target.value)}
                  className="input-field !pl-12" placeholder="Min 6 characters" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                <div className="relative">
                  <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                    className="input-field !pl-12" placeholder="Phone number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
                <select value={form.role} onChange={(e) => update('role', e.target.value)} className="select-field">
                  <option value="CITIZEN">Citizen</option>
                  <option value="WORKER">Worker</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Address</label>
              <div className="relative">
                <HiLocationMarker className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <textarea value={form.address} onChange={(e) => update('address', e.target.value)}
                  className="input-field !pl-12 resize-none" rows="2" placeholder="Your address" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 text-base !mt-6">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Create Account <HiArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
