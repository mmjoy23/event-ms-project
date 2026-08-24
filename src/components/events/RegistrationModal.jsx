import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, MapPin, Ticket, ShieldCheck } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import { formatDate, formatTime } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';

export default function RegistrationModal({ isOpen, onClose, event }) {
  const { currentUser, registerForEvent, addNotification } = useApp();
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState(event?.ticketTypes?.[0]?.id || '');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    company: '',
    jobTitle: '',
    dietary: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(null);

  if (!event) return null;

  const activeTicket = event.ticketTypes?.find((t) => t.id === selectedTicket) || event.ticketTypes?.[0];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must accept the terms and conditions';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerForEvent(event.id, formData, activeTicket?.name || 'General Admission');
      setIsSubmitting(false);
      if (res.success) {
        setSuccessRegistration(res.registration);
        addNotification(`Successfully registered for ${event.title}!`, 'success');
      }
    }, 600);
  };

  const handleClose = () => {
    setSuccessRegistration(null);
    setErrors({});
    onClose();
  };

  const handleViewTicket = () => {
    handleClose();
    if (successRegistration) {
      navigate(`/tickets/${successRegistration.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" title={successRegistration ? '' : 'Event Registration'}>
      {successRegistration ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check size={32} />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 mb-2">Registration Confirmed!</h3>
          <p className="text-surface-600 text-sm max-w-md mx-auto mb-6">
            You're all set for <span className="font-semibold text-surface-800">{event.title}</span>. A confirmation email has been dispatched to <span className="font-semibold text-surface-800">{formData.email}</span>.
          </p>

          <div className="bg-surface-50 border border-surface-200 rounded-xl p-4 max-w-md mx-auto text-left mb-6 space-y-2">
            <div className="flex justify-between text-xs text-surface-500 pb-2 border-b border-surface-200">
              <span>Registration ID</span>
              <span className="font-mono font-bold text-surface-800">{successRegistration.id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-surface-500">Attendee</span>
              <span className="font-semibold text-surface-800">{formData.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-surface-500">Ticket Type</span>
              <span className="font-semibold text-surface-800">{activeTicket?.name || 'Standard'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-surface-500">Date</span>
              <span className="font-semibold text-surface-800">{formatDate(event.date)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleViewTicket}>
              View Ticket & QR Code
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Quick Overview */}
          <div className="bg-surface-50 p-4 rounded-xl border border-surface-200 flex gap-4 items-center">
            <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-surface-900 text-sm truncate">{event.title}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-500 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Selection */}
          {event.ticketTypes && event.ticketTypes.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-600 mb-2">
                Select Ticket Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      (selectedTicket === ticket.id || (!selectedTicket && ticket === event.ticketTypes[0]))
                        ? 'border-primary-600 bg-primary-50/50'
                        : 'border-surface-200 hover:border-surface-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-sm text-surface-900">{ticket.name}</div>
                      <div className="font-extrabold text-sm text-primary-700">
                        {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-surface-500 mt-2">
                      <span>{ticket.available} tickets left</span>
                      {(selectedTicket === ticket.id || (!selectedTicket && ticket === event.ticketTypes[0])) && (
                        <span className="text-primary-600 font-bold flex items-center gap-1">
                          <Check size={12} /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendee Details Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-surface-600 pb-1 border-b border-surface-100">
              Attendee Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Full Name"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                placeholder="e.g. John Doe"
              />
              <FormField
                label="Email Address"
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                placeholder="e.g. john@example.com"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Phone Number"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
              <FormField
                label="Organization / University (Optional)"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Acme Corp / Stanford"
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-surface-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-0.5 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
              />
              <span>
                I agree to the <a href="#" className="text-primary-600 underline">Terms of Service</a> and confirm that the registration information provided is accurate.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-danger-500 mt-1">{errors.agreeTerms}</p>}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100">
            <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isSubmitting} icon={ShieldCheck}>
              Confirm Registration ({activeTicket?.price === 0 ? 'Free' : `$${activeTicket?.price || 0}`})
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
