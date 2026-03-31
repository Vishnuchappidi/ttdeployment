import { useState, useEffect } from 'react';
import { requestAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import UrgencyBadge from '../../components/UrgencyBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import { HiSearch, HiFilter, HiEye, HiTrash, HiRefresh, HiX } from 'react-icons/hi';

const statusOptions = ['', 'PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COLLECTED', 'REJECTED'];
const urgencyOptions = ['', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const AdminRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await requestAPI.getAll();
      setRequests(res.data.data || []);
    } catch (err) {
      setToast({ message: 'Failed to load requests', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!statusFilter && !urgencyFilter) { fetchRequests(); return; }
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (urgencyFilter) params.urgency = urgencyFilter;
      const res = await requestAPI.filter(params);
      setRequests(res.data.data || []);
    } catch (err) {
      setToast({ message: 'Filter failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest || !newStatus) return;
    try {
      await requestAPI.updateStatus(selectedRequest.id, { status: newStatus, remarks, changedBy: user?.id });
      setToast({ message: 'Status updated successfully', type: 'success' });
      setSelectedRequest(null);
      setNewStatus('');
      setRemarks('');
      fetchRequests();
    } catch (err) {
      setToast({ message: 'Failed to update status', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await requestAPI.delete(id);
      setToast({ message: 'Request deleted', type: 'success' });
      fetchRequests();
    } catch (err) {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const filtered = requests.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.id.toString().includes(q) || r.userName?.toLowerCase().includes(q) ||
           r.location?.toLowerCase().includes(q) || r.wasteType?.toLowerCase().includes(q);
  });

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Waste Requests</h1>
          <p className="text-slate-500 mt-1">Manage all waste complaints and reports</p>
        </div>
        <button onClick={fetchRequests} className="btn-secondary flex items-center gap-2">
          <HiRefresh className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field !pl-12" placeholder="Search by ID, citizen, location..." />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select-field !w-auto min-w-[150px]">
            <option value="">All Status</option>
            {statusOptions.filter(s => s).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
          <select value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)} className="select-field !w-auto min-w-[140px]">
            <option value="">All Urgency</option>
            {urgencyOptions.filter(u => u).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <button onClick={handleFilter} className="btn-primary flex items-center gap-2 !py-3">
            <HiFilter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
        <EmptyState title="No Requests Found" message="No waste requests match your filters." />
      ) : (
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Citizen</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Location</th>
                  <th className="table-header">Urgency</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell font-bold text-primary-600">#{req.id}</td>
                    <td className="table-cell">
                      <div>
                        <p className="font-semibold text-slate-700 text-sm">{req.userName}</p>
                        <p className="text-xs text-slate-400">{req.userEmail}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-xs font-semibold">{req.wasteType.replace('_', ' ')}</span>
                    </td>
                    <td className="table-cell text-slate-500 max-w-[140px] truncate text-sm">{req.location}</td>
                    <td className="table-cell"><UrgencyBadge urgency={req.urgency} /></td>
                    <td className="table-cell"><StatusBadge status={req.status} size="sm" /></td>
                    <td className="table-cell text-xs text-slate-400">{formatDate(req.createdAt)}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedRequest(req); setNewStatus(req.status); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Update Status">
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(req.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 text-sm text-slate-500">
            Showing {filtered.length} of {requests.length} requests
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRequest(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Request #{selectedRequest.id}</h3>
              <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-100 rounded-xl"><HiX className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 text-xs font-semibold">Citizen</p>
                  <p className="text-slate-800 font-medium">{selectedRequest.userName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 text-xs font-semibold">Type</p>
                  <p className="text-slate-800 font-medium">{selectedRequest.wasteType}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 text-xs font-semibold">Location</p>
                  <p className="text-slate-800 font-medium">{selectedRequest.location}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 text-xs font-semibold">Current Status</p>
                  <StatusBadge status={selectedRequest.status} size="sm" />
                </div>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3">{selectedRequest.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Update Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select-field">
                  {statusOptions.filter(s => s).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Admin Remarks</label>
                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}
                  className="input-field resize-none" rows="2" placeholder="Optional remarks..." />
              </div>
              <button onClick={handleStatusUpdate} className="btn-primary w-full">Update Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
