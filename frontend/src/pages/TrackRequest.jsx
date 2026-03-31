import { useState } from 'react';
import { requestAPI } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import UrgencyBadge from '../components/UrgencyBadge';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { HiSearch, HiClipboardList, HiLocationMarker, HiClock, HiUser } from 'react-icons/hi';

const TrackRequest = () => {
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      let params = {};
      if (searchType === 'id') params.requestId = searchValue;
      else if (searchType === 'email') params.email = searchValue;
      else params.phone = searchValue;

      const res = await requestAPI.search(params);
      const data = res.data.data || [];
      setResults(data);
      if (data.length === 0) {
        setToast({ message: 'No requests found for this search.', type: 'info' });
      }
    } catch (err) {
      setToast({ message: 'Search failed. Please check your input.', type: 'error' });
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-200">
            <HiSearch className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Track Your Request</h1>
          <p className="text-slate-500 mt-2">Search by request ID, email, or phone number</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl shadow-glass border border-slate-100 p-8 mb-8 animate-slide-up">
          <div className="flex gap-2 mb-5">
            {[{ value: 'id', label: 'Request ID' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }].map(type => (
              <button key={type.value}
                onClick={() => { setSearchType(type.value); setSearchValue(''); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${searchType === type.value
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {type.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={searchType === 'id' ? 'number' : searchType === 'email' ? 'email' : 'tel'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="input-field !pl-12"
                placeholder={searchType === 'id' ? 'Enter request ID (e.g. 1)' : searchType === 'email' ? 'Enter registered email' : 'Enter phone number'}
                required
              />
            </div>
            <button type="submit" className="btn-primary !px-8" disabled={loading}>
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>

        {/* Results */}
        {loading && <LoadingSpinner message="Searching requests..." />}

        {results && results.length === 0 && !loading && (
          <EmptyState
            title="No Requests Found"
            message="We couldn't find any waste requests matching your search. Please check your input and try again."
          />
        )}

        {results && results.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm font-semibold text-slate-500">{results.length} request(s) found</p>
            {results.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-slate-800">#{req.id}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">{req.wasteType.replace('_', ' ')}</span>
                    </div>
                    <p className="text-slate-500 text-sm">{req.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <UrgencyBadge urgency={req.urgency} />
                    <StatusBadge status={req.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <HiLocationMarker className="w-4 h-4 text-primary-500" />
                    <span>{req.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <HiClock className="w-4 h-4 text-primary-500" />
                    <span>{formatDate(req.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <HiUser className="w-4 h-4 text-primary-500" />
                    <span>{req.userName}</span>
                  </div>
                </div>

                {req.assignment && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-700 uppercase mb-1">Assigned Worker</p>
                    <p className="text-sm text-blue-800 font-semibold">{req.assignment.workerName} · {req.assignment.workerPhone}</p>
                    {req.assignment.notes && <p className="text-sm text-blue-600 mt-1">Notes: {req.assignment.notes}</p>}
                  </div>
                )}

                {req.adminRemarks && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Admin Remarks</p>
                    <p className="text-sm text-slate-700">{req.adminRemarks}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackRequest;
