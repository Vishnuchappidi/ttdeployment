import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI, requestAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import UrgencyBadge from '../../components/UrgencyBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { HiClipboardList, HiClock, HiTruck, HiCheckCircle, HiExclamation, HiXCircle, HiUserGroup, HiArrowRight, HiTrendingUp } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, requestsRes] = await Promise.all([
        dashboardAPI.getStats(),
        requestAPI.getAll()
      ]);
      setStats(statsRes.data.data);
      setRecentRequests((requestsRes.data.data || []).slice(0, 5));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  const statCards = [
    { label: 'Total Requests', value: stats?.totalRequests || 0, icon: HiClipboardList, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: stats?.pendingRequests || 0, icon: HiClock, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
    { label: 'Assigned', value: stats?.assignedRequests || 0, icon: HiTruck, color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
    { label: 'In Progress', value: stats?.inProgressRequests || 0, icon: HiTrendingUp, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Collected', value: stats?.collectedRequests || 0, icon: HiCheckCircle, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected', value: stats?.rejectedRequests || 0, icon: HiXCircle, color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
    { label: 'High Priority', value: stats?.highPriorityRequests || 0, icon: HiExclamation, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Workers', value: stats?.totalWorkers || 0, icon: HiUserGroup, color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50' },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of waste management operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card group" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${card.bg} text-slate-600`}>Today</span>
            </div>
            <p className="text-3xl font-black text-slate-800">{card.value}</p>
            <p className="text-sm text-slate-500 mt-1 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Distribution */}
      {stats?.requestsByType && Object.keys(stats.requestsByType).length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Requests by Waste Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stats.requestsByType).map(([type, count]) => (
              <div key={type} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-primary-50 transition-all">
                <p className="text-2xl font-black text-slate-700">{count}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">{type.replace('_', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Requests Table */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Recent Requests</h3>
          <Link to="/admin/requests" className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
            View All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="table-cell font-bold text-primary-600">#{req.id}</td>
                  <td className="table-cell font-medium text-slate-700">{req.userName}</td>
                  <td className="table-cell">
                    <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                      {req.wasteType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="table-cell text-slate-500 max-w-[150px] truncate">{req.location}</td>
                  <td className="table-cell"><UrgencyBadge urgency={req.urgency} /></td>
                  <td className="table-cell"><StatusBadge status={req.status} size="sm" /></td>
                  <td className="table-cell text-slate-400 text-xs">{formatDate(req.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentRequests.length === 0 && (
            <div className="text-center py-10 text-slate-400">No requests yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
