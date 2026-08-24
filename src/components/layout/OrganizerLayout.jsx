import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarPlus,
  Users,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NotificationToast from '../ui/NotificationToast';

export default function OrganizerLayout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-primary-600 text-white shadow-sm'
        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-surface-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo & Switcher */}
          <div className="p-6 border-b border-surface-100 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <span className="text-base font-bold text-surface-900">EventHub</span>
                <span className="block text-[10px] uppercase tracking-wider font-extrabold text-primary-600">
                  Organizer Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Create Event Button */}
          <div className="p-4">
            <Link
              to="/organizer/events/create"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-xl font-bold text-xs transition-colors border border-primary-200"
            >
              <PlusCircle size={16} /> Create New Event
            </Link>
          </div>

          {/* Nav links */}
          <nav className="px-4 space-y-1.5">
            <NavLink to="/organizer/dashboard" end className={navItemClass}>
              <LayoutDashboard size={18} /> Overview
            </NavLink>
            <NavLink to="/organizer/events" className={navItemClass}>
              <CalendarPlus size={18} /> Manage Events
            </NavLink>
            <NavLink to="/organizer/registrations" className={navItemClass}>
              <Users size={18} /> Registrations
            </NavLink>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-surface-100 space-y-3">
          <Link
            to="/events"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-surface-500 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-colors"
          >
            <span>Switch to Public View</span>
            <ArrowUpRight size={14} />
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-surface-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                {currentUser?.name?.charAt(0) || 'O'}
              </div>
              <div className="truncate max-w-[110px]">
                <p className="text-xs font-bold text-surface-900 truncate">{currentUser?.name || 'Organizer'}</p>
                <p className="text-[10px] text-surface-400">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-surface-200 px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              E
            </div>
            <span className="font-bold text-sm text-surface-900">Organizer Portal</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link to="/organizer/dashboard" className="text-surface-700 font-medium">Dashboard</Link>
            <Link to="/organizer/events" className="text-surface-700 font-medium">Events</Link>
            <Link to="/organizer/events/create" className="text-primary-600 font-bold">+ New</Link>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <NotificationToast />
    </div>
  );
}
