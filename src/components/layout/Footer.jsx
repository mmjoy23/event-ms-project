import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-white">Event<span className="text-primary-400">Hub</span></span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed mb-4">
              Discover and register for events that inspire, educate, and connect people around the world.
            </p>
            <div className="flex gap-3">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map(social => (
                <a key={social} href="#" className="w-9 h-9 bg-surface-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-xs text-surface-400 hover:text-white uppercase font-bold">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Browse Events', to: '/events' },
                { label: 'About Us', to: '/about' },
                { label: 'Create Event', to: '/organizer/events/create' },
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-surface-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Technology', 'Business', 'Design', 'Science', 'Education', 'Networking'].map(cat => (
                <li key={cat}>
                  <Link to="/events" className="text-sm text-surface-400 hover:text-white transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-surface-400 mt-0.5 shrink-0" />
                <span className="text-sm text-surface-400">support@eventhub.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-surface-400 mt-0.5 shrink-0" />
                <span className="text-sm text-surface-400">+1 (555) 000-1234</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-surface-400 mt-0.5 shrink-0" />
                <span className="text-sm text-surface-400">123 Event Street<br />San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">© 2026 EventHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-surface-500 hover:text-surface-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-surface-500 hover:text-surface-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
