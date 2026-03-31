import { NavLink } from 'react-router-dom';
import {
  HiChartBar, HiClipboardList, HiUserGroup, HiTruck, HiChartPie,
  HiCog, HiX, HiViewGrid
} from 'react-icons/hi';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: HiViewGrid },
  { to: '/admin/requests', label: 'Waste Requests', icon: HiClipboardList },
  { to: '/admin/assign', label: 'Assign Worker', icon: HiTruck },
  { to: '/admin/users', label: 'Users & Workers', icon: HiUserGroup },
  { to: '/admin/analytics', label: 'Analytics', icon: HiChartPie },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/30">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">EcoClean</h2>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
              <HiCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">System v1.0</p>
              <p className="text-slate-400 text-xs">EcoClean Platform</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
