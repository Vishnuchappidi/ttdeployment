import { useState, useEffect } from 'react';
import { requestAPI, userAPI, assignmentAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import UrgencyBadge from '../../components/UrgencyBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import { HiTruck, HiCheckCircle, HiUser } from 'react-icons/hi';

const AssignWorker = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [notes, setNotes] = useState('');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [reqRes, workerRes] = await Promise.all([
        requestAPI.getAll(),
        userAPI.getActiveWorkers()
      ]);
      // Show pending and assigned requests
      const allReqs = reqRes.data.data || [];
      setRequests(allReqs.filter(r => r.status === 'PENDING' || r.status === 'ASSIGNED'));
      setWorkers(workerRes.data.data || []);
    } catch (err) {
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedRequest || !selectedWorker) {
      setToast({ message: 'Please select a request and worker', type: 'error' });
      return;
    }
    setAssigning(true);
    try {
      await assignmentAPI.assign({
        requestId: selectedRequest.id,
        workerId: parseInt(selectedWorker),
        assignedById: user?.id,
        notes: notes
      });
      setToast({ message: 'Worker assigned successfully!', type: 'success' });
      setSelectedRequest(null);
      setSelectedWorker('');
      setNotes('');
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Assignment failed';
      setToast({ message: msg, type: 'error' });
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading requests and workers..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-black text-slate-800">Assign Workers</h1>
        <p className="text-slate-500 mt-1">Assign collection workers to pending waste requests</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-lg font-bold text-slate-700">Pending Requests ({requests.length})</h3>
          {requests.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-card border border-slate-100">
              <HiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">All requests have been assigned!</p>
            </div>
          ) : requests.map((req) => (
            <div key={req.id}
              onClick={() => setSelectedRequest(req)}
              className={`bg-white rounded-2xl p-5 shadow-card border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                selectedRequest?.id === req.id ? 'border-primary-400 ring-2 ring-primary-100' : 'border-slate-100'
              }`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm font-bold text-primary-600">#{req.id}</span>
                  <span className="mx-2 text-slate-300">·</span>
                  <span className="text-sm font-semibold text-slate-700">{req.userName}</span>
                </div>
                <div className="flex gap-2">
                  <UrgencyBadge urgency={req.urgency} />
                  <StatusBadge status={req.status} size="sm" />
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-2 line-clamp-2">{req.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>📍 {req.location}</span>
                <span>🗑️ {req.wasteType.replace('_', ' ')}</span>
              </div>
              {req.assignment && (
                <div className="mt-3 px-3 py-2 bg-blue-50 rounded-xl text-xs text-blue-700 font-medium">
                  Currently assigned to: {req.assignment.workerName}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Assignment Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HiTruck className="w-5 h-5 text-primary-500" /> Assign Worker
            </h3>

            {selectedRequest ? (
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                  <p className="text-xs font-bold text-primary-600 uppercase mb-1">Selected Request</p>
                  <p className="font-bold text-slate-800">#{selectedRequest.id} — {selectedRequest.wasteType.replace('_', ' ')}</p>
                  <p className="text-sm text-slate-500 mt-1">{selectedRequest.location}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Worker</label>
                  <select value={selectedWorker} onChange={(e) => setSelectedWorker(e.target.value)} className="select-field">
                    <option value="">Choose a worker...</option>
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>{w.fullName} — {w.phone || 'No phone'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes (Optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    className="input-field resize-none" rows="2" placeholder="Special instructions..." />
                </div>

                <button onClick={handleAssign} disabled={assigning || !selectedWorker}
                  className="btn-primary w-full flex items-center justify-center gap-2">
                  {assigning ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                    <><HiTruck className="w-5 h-5" /> Assign Worker</>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <HiUser className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Select a request from the left to assign a worker</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignWorker;
