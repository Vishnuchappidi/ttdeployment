import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { requestAPI } from '../services/api';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';
import { HiPhotograph, HiLocationMarker, HiExclamation, HiTrash, HiCheckCircle } from 'react-icons/hi';

const wasteTypes = ['HOUSEHOLD', 'ELECTRONIC', 'MEDICAL', 'CONSTRUCTION', 'HAZARDOUS', 'GREEN_WASTE', 'PLASTIC', 'OTHER'];
const urgencies = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const ReportWaste = () => {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    wasteType: '', description: '', location: '', area: '', city: '', pincode: '', urgency: 'MEDIUM', photoUrl: ''
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setToast({ message: 'Please login to submit a waste report.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, userId: user.id };
      const res = await requestAPI.create(payload);
      setSuccess(res.data.data);
      setToast({ message: 'Waste report submitted successfully!', type: 'success' });
      setForm({ wasteType: '', description: '', location: '', area: '', city: '', pincode: '', urgency: 'MEDIUM', photoUrl: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit report. Please try again.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-lg mx-auto px-4 animate-slide-up">
          <div className="bg-white rounded-3xl shadow-glass p-10 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiCheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Report Submitted!</h2>
            <p className="text-slate-500 mb-6">Your waste complaint has been registered successfully.</p>
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Request ID</span>
                <span className="font-bold text-primary-600">#{success.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Type</span>
                <span className="font-semibold text-slate-700">{success.wasteType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Status</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">PENDING</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Location</span>
                <span className="font-semibold text-slate-700">{success.location}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSuccess(null)} className="btn-primary flex-1">Report Another</button>
              <Link to="/track" className="btn-secondary flex-1 text-center">Track Request</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
            <HiTrash className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Report Waste Issue</h1>
          <p className="text-slate-500 mt-2">Help us keep your community clean by reporting waste problems</p>
        </div>

        {!user && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-3 animate-fade-in">
            <HiExclamation className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800">Login Required</p>
              <p className="text-amber-700 text-sm">You need to <Link to="/login" className="underline font-bold">sign in</Link> before submitting a waste report.</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-glass border border-slate-100 p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Waste Type *</label>
                <select required value={form.wasteType} onChange={(e) => update('wasteType', e.target.value)} className="select-field">
                  <option value="">Select waste type</option>
                  {wasteTypes.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urgency Level *</label>
                <select required value={form.urgency} onChange={(e) => update('urgency', e.target.value)} className="select-field">
                  {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description *</label>
              <textarea required value={form.description} onChange={(e) => update('description', e.target.value)}
                className="input-field resize-none" rows="3" placeholder="Describe the waste issue in detail..." />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <HiLocationMarker className="inline w-4 h-4 mr-1" /> Full Address / Location *
              </label>
              <input type="text" required value={form.location} onChange={(e) => update('location', e.target.value)}
                className="input-field" placeholder="Street address or landmark" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Area / Zone</label>
                <input type="text" value={form.area} onChange={(e) => update('area', e.target.value)}
                  className="input-field" placeholder="e.g. Sector 15" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
                <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)}
                  className="input-field" placeholder="City name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Pincode</label>
                <input type="text" value={form.pincode} onChange={(e) => update('pincode', e.target.value)}
                  className="input-field" placeholder="ZIP code" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <HiPhotograph className="inline w-4 h-4 mr-1" /> Photo URL (Optional)
              </label>
              <input type="url" value={form.photoUrl} onChange={(e) => update('photoUrl', e.target.value)}
                className="input-field" placeholder="https://example.com/photo.jpg" />
            </div>

            <button type="submit" disabled={loading || !user}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-base !mt-8">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Submit Report <HiTrash className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportWaste;
