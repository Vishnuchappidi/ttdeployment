import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assignmentAPI, dashboardAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import UrgencyBadge from '../../components/UrgencyBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import { HiClipboardList, HiCheckCircle, HiClock, HiTruck, HiLocationMarker, HiArrowRight } from 'react-icons/hi';

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (user?.id) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await assignmentAPI.getWorkerTasks(user.id);
      setTasks(res.data.data || []);
    } catch (err) {
      setToast({ message: 'Failed to load tasks', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    setUpdating(requestId);
    try {
      await assignmentAPI.updateStatus(requestId, status);
      setToast({ message: `Task marked as ${status.toLowerCase().replace('_', ' ')}!`, type: 'success' });
      fetchTasks();
    } catch (err) {
      setToast({ message: 'Failed to update status', type: 'error' });
    } finally {
      setUpdating(null);
    }
  };

  const activeTasks = tasks.filter(t => t.status !== 'COLLECTED');
  const completedTasks = tasks.filter(t => t.status === 'COLLECTED');

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';

  if (loading) return <LoadingSpinner message="Loading your tasks..." />;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-black text-slate-800">Worker Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.fullName}! Here are your assigned tasks.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HiClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">{tasks.length}</p>
            <p className="text-sm text-slate-500">Total Assigned</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HiClock className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">{activeTasks.length}</p>
            <p className="text-sm text-slate-500">Active Tasks</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HiCheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">{completedTasks.length}</p>
            <p className="text-sm text-slate-500">Completed</p>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <HiTruck className="w-5 h-5 text-primary-500" /> Active Tasks
          </h2>

          {activeTasks.length === 0 ? (
            <EmptyState 
              title="No Active Tasks" 
              message="You don't have any pending tasks. All assignments are completed!"
              icon={HiCheckCircle}
            />
          ) : (
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-primary-600">#{task.id}</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">{task.wasteType.replace('_', ' ')}</span>
                      </div>
                      <p className="text-slate-600">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <UrgencyBadge urgency={task.urgency} />
                      <StatusBadge status={task.status} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <HiLocationMarker className="w-4 h-4 text-primary-500" /> {task.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <HiClock className="w-4 h-4 text-primary-500" /> {formatDate(task.createdAt)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      Reported by: <span className="font-semibold text-slate-700">{task.userName}</span>
                    </div>
                  </div>

                  {task.assignment?.notes && (
                    <div className="bg-blue-50 rounded-xl p-3 mb-4 text-sm text-blue-700">
                      <span className="font-bold">Admin Notes:</span> {task.assignment.notes}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    {task.status === 'ASSIGNED' && (
                      <button
                        onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}
                        disabled={updating === task.id}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-md">
                        {updating === task.id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                          <><HiArrowRight className="w-4 h-4" /> Start Collection</>
                        )}
                      </button>
                    )}
                    {(task.status === 'ASSIGNED' || task.status === 'IN_PROGRESS') && (
                      <button
                        onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}
                        disabled={updating === task.id}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-md">
                        {updating === task.id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                          <><HiCheckCircle className="w-4 h-4" /> Mark Collected</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5 text-emerald-500" /> Completed ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-500">#{task.id}</span>
                      <span className="text-sm text-slate-500">{task.wasteType.replace('_', ' ')}</span>
                      <span className="text-sm text-slate-400">·</span>
                      <span className="text-sm text-slate-400">{task.location}</span>
                    </div>
                    <StatusBadge status="COLLECTED" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
