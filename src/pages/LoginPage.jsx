import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsOrganizer, addNotification } = useApp();

  const [email, setEmail] = useState('alex.johnson@email.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      addNotification('Welcome back!', 'success');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }, 400);
  };

  const handleQuickOrganizerLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsOrganizer();
      setLoading(false);
      addNotification('Logged in as Event Organizer', 'info');
      navigate('/organizer/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-surface-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-black text-surface-900">Sign in to EventHub</h1>
          <p className="text-xs text-surface-500">
            Access your registrations, saved events, and digital tickets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-danger-50 text-danger-600 text-xs rounded-xl border border-danger-200">
              {error}
            </div>
          )}

          <FormField
            label="Email Address"
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <FormField
            label="Password"
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-surface-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full font-bold" loading={loading}>
            Sign In <ArrowRight size={16} />
          </Button>
        </form>

        {/* Quick Demo Switchers */}
        <div className="pt-4 border-t border-surface-100 space-y-3">
          <p className="text-[11px] uppercase tracking-wider font-bold text-surface-400 text-center">
            Demo Quick Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              icon={UserCheck}
              onClick={() => {
                login('alex.johnson@email.com', 'demo');
                addNotification('Logged in as Attendee', 'info');
                navigate('/dashboard');
              }}
            >
              Demo Attendee
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              icon={ShieldCheck}
              onClick={handleQuickOrganizerLogin}
            >
              Demo Organizer
            </Button>
          </div>
        </div>

        {/* Sign up prompt */}
        <p className="text-xs text-surface-500 text-center pt-2">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-primary-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
