import { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import EmptyState from '../../components/EmptyState';
import { HiUserGroup, HiSearch, HiShieldCheck, HiTruck, HiUser, HiTrash, HiBan, HiCheck } from 'react-icons/hi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userAPI.getAll();
      setUsers(res.data.data || []);
    } catch (err) {
      setToast({ message: 'Failed to load users', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await userAPI.toggleStatus(id);
      setToast({ message: 'User status toggled', type: 'success' });
      fetchUsers();
    } catch (err) {
      setToast({ message: 'Action failed', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await userAPI.delete(id);
      setToast({ message: 'User deleted', type: 'success' });
      fetchUsers();
    } catch (err) {
      setToast({ message: 'Failed to delete user', type: 'error' });
    }
  };

  const roleConfig = {
    ADMIN: { icon: HiShieldCheck, color: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
    WORKER: { icon: HiTruck, color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    CITIZEN: { icon: HiUser, color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  };

  const filtered = users.filter(u => {
    const matchSearch = !search || u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-black text-slate-800">Users & Workers</h1>
        <p className="text-slate-500 mt-1">Manage all registered users, workers, and admins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {['CITIZEN', 'WORKER', 'ADMIN'].map(role => {
          const config = roleConfig[role];
          const count = users.filter(u => u.role === role).length;
          return (
            <div key={role} className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
                <config.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">{count}</p>
                <p className="text-sm text-slate-500">{role.charAt(0) + role.slice(1).toLowerCase()}s</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-12" placeholder="Search by name or email..." />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="select-field !w-auto min-w-[150px]">
          <option value="">All Roles</option>
          <option value="CITIZEN">Citizens</option>
          <option value="WORKER">Workers</option>
          <option value="ADMIN">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
        <EmptyState title="No Users Found" message="No users match your search criteria." icon={HiUserGroup} />
      ) : (
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-header">User</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Joined</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => {
                  const config = roleConfig[u.role] || roleConfig.CITIZEN;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center font-bold text-sm`}>
                            {u.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700">{u.fullName}</p>
                            <p className="text-xs text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>{u.role}</span>
                      </td>
                      <td className="table-cell text-slate-500">{u.phone || '—'}</td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${u.active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          {u.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="table-cell text-xs text-slate-400">{formatDate(u.createdAt)}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleToggle(u.id)}
                            className={`p-2 rounded-lg transition-colors ${u.active ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                            title={u.active ? 'Deactivate' : 'Activate'}>
                            {u.active ? <HiBan className="w-4 h-4" /> : <HiCheck className="w-4 h-4" />}
                          </button>
                          <button onClick={() => handleDelete(u.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
