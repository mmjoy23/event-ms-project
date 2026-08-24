import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard, CalendarPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary-600' : 'text-surface-600 hover:text-primary-600'}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-surface-900">Event<span className="text-primary-600">Hub</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/events" className={navLinkClass}>Browse Events</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-surface-700 max-w-[120px] truncate">{currentUser.name}</span>
                  <ChevronDown size={14} className="text-surface-400" />
                </button>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-surface-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-surface-100">
                        <p className="text-sm font-semibold text-surface-900">{currentUser.name}</p>
                        <p className="text-xs text-surface-500">{currentUser.email}</p>
                      </div>
                      {currentUser.role === 'organizer' ? (
                        <>
                          <Link to="/organizer/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          <Link to="/organizer/events" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
                            <CalendarPlus size={16} /> Manage Events
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
                            <LayoutDashboard size={16} /> My Dashboard
                          </Link>
                          <Link to="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
                            <User size={16} /> Profile
                          </Link>
                        </>
                      )}
                      <div className="border-t border-surface-100 mt-1 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-danger-500 hover:bg-danger-50 w-full transition-colors">
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-surface-600 hover:text-primary-600 px-4 py-2 transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-5 py-2 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-surface-100 py-4 space-y-2">
            <NavLink to="/" end onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-50'}`}>Home</NavLink>
            <NavLink to="/events" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-50'}`}>Browse Events</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-50'}`}>About</NavLink>
            <div className="border-t border-surface-100 pt-3 mt-3">
              {currentUser ? (
                <>
                  <Link to={currentUser.role === 'organizer' ? '/organizer/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-danger-500 hover:bg-danger-50">Sign Out</button>
                </>
              ) : (
                <div className="flex gap-2 px-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center text-sm font-medium text-surface-600 border border-surface-300 px-4 py-2 rounded-lg hover:bg-surface-50">Log In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 text-center text-sm font-medium text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
