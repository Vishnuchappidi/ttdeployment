import { useState, useEffect } from 'react';
import { dashboardAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { HiChartPie, HiChartBar, HiTrendingUp } from 'react-icons/hi';

const COLORS = ['#22a665', '#3b99f5', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#6366f1'];

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await dashboardAPI.getStats();
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner message="Loading analytics..." />;

  const statusData = [
    { name: 'Pending', value: stats?.pendingRequests || 0 },
    { name: 'Assigned', value: stats?.assignedRequests || 0 },
    { name: 'In Progress', value: stats?.inProgressRequests || 0 },
    { name: 'Collected', value: stats?.collectedRequests || 0 },
    { name: 'Rejected', value: stats?.rejectedRequests || 0 },
  ].filter(d => d.value > 0);

  const typeData = stats?.requestsByType ? Object.entries(stats.requestsByType).map(([name, value]) => ({
    name: name.replace('_', ' '), value
  })) : [];

  const areaData = stats?.requestsByArea ? Object.entries(stats.requestsByArea).map(([name, value]) => ({
    name, value
  })) : [];

  const urgencyData = stats?.requestsByUrgency ? Object.entries(stats.requestsByUrgency).map(([name, value]) => ({
    name, value
  })) : [];

  const total = stats?.totalRequests || 0;
  const collected = stats?.collectedRequests || 0;
  const completionRate = total > 0 ? Math.round((collected / total) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Analytics & Reports</h1>
        <p className="text-slate-500 mt-1">Insights into waste management operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-xl">
          <HiTrendingUp className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-4xl font-black">{completionRate}%</p>
          <p className="text-sm opacity-80 mt-1">Collection Rate</p>
        </div>
        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white shadow-xl">
          <HiChartBar className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-4xl font-black">{total}</p>
          <p className="text-sm opacity-80 mt-1">Total Requests</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl">
          <HiChartPie className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-4xl font-black">{stats?.totalWorkers || 0}</p>
          <p className="text-sm opacity-80 mt-1">Active Workers</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Status Distribution</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                  paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusData.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-slate-400 py-16">No data to display</p>}
        </div>

        {/* Waste Type Bar Chart */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">By Waste Type</h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#22a665" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-slate-400 py-16">No data to display</p>}
        </div>

        {/* Area Distribution */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">By Area</h3>
          {areaData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={areaData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b99f5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-slate-400 py-16">No area data yet. Requests need area field filled.</p>}
        </div>

        {/* Urgency Distribution */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">By Urgency</h3>
          {urgencyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={urgencyData} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}>
                  {urgencyData.map((_, idx) => <Cell key={idx} fill={['#94a3b8', '#f59e0b', '#f97316', '#ef4444'][idx % 4]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-slate-400 py-16">No data to display</p>}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
