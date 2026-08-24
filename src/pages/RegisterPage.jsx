import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, addNotification } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Service';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      register(formData.name, formData.email, formData.password);
      setLoading(false);
      addNotification('Account created successfully!', 'success');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-surface-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <UserPlus size={22} />
          </div>
          <h1 className="text-2xl font-black text-surface-900">Create your account</h1>
          <p className="text-xs text-surface-500">
            Join thousands of attendees and event organizers worldwide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            id="register-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="John Doe"
          />

          <FormField
            label="Email Address"
            id="register-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="john@example.com"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Password"
              id="register-password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
            />
            <FormField
              label="Confirm Password"
              id="register-confirm"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              placeholder="••••••••"
            />
          </div>

          {/* Role Choice */}
          <div>
            <label className="block text-xs font-medium text-surface-700 mb-1.5">
              I want to participate as
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'attendee' })}
                className={`py-2 px-3 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  formData.role === 'attendee'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-surface-200 text-surface-600 hover:bg-surface-50'
                }`}
              >
                Event Attendee
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'organizer' })}
                className={`py-2 px-3 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  formData.role === 'organizer'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-surface-200 text-surface-600 hover:bg-surface-50'
                }`}
              >
                Event Organizer
              </button>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-surface-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-0.5 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
              />
              <span>
                I agree to the <a href="#" className="text-primary-600 underline">Terms of Service</a> and <a href="#" className="text-primary-600 underline">Privacy Policy</a>.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-danger-500 mt-1">{errors.agreeTerms}</p>}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full font-bold mt-2" loading={loading}>
            Create Account <ArrowRight size={16} />
          </Button>
        </form>

        <p className="text-xs text-surface-500 text-center pt-2 border-t border-surface-100">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
