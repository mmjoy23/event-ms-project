import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TicketCard from '../components/tickets/TicketCard';
import Button from '../components/ui/Button';

export default function TicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRegistrations, events, addNotification } = useApp();

  const registration = userRegistrations.find((r) => r.id === id);
  const event = registration ? events.find((e) => e.id === registration.eventId) : null;

  if (!registration || !event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-surface-900">Ticket Not Found</h2>
        <p className="text-sm text-surface-500">
          The registration record you are looking for does not exist or has been revoked.
        </p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addNotification('Ticket pass downloaded successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-600 hover:text-surface-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to My Registrations
        </button>

        <div className="flex items-center gap-1.5 text-xs font-bold text-success-600 bg-success-50 px-3 py-1 rounded-full border border-success-200">
          <CheckCircle2 size={14} /> Verified Admission
        </div>
      </div>

      {/* Ticket Card */}
      <div className="py-2">
        <TicketCard
          registration={registration}
          event={event}
          onPrint={handlePrint}
          onDownload={handleDownload}
        />
      </div>

      {/* Important instructions */}
      <div className="max-w-2xl mx-auto bg-surface-100 p-6 rounded-2xl text-xs text-surface-600 space-y-2 border border-surface-200">
        <h4 className="font-bold text-surface-800 uppercase tracking-wider text-[11px]">
          Important Venue Instructions
        </h4>
        <ul className="list-disc list-inside space-y-1 text-surface-600">
          <li>Please arrive at least 15 minutes before the opening keynote.</li>
          <li>Bring a government-issued photo ID that matches the attendee name on this pass.</li>
          <li>For online/virtual sessions, access links will also be broadcast to your email.</li>
        </ul>
      </div>
    </div>
  );
}
