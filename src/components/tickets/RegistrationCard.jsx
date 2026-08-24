import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, ExternalLink, XCircle } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/helpers';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';

export default function RegistrationCard({ registration, event, onCancel }) {
  if (!event) return null;

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
      <div className="flex gap-4 items-start">
        <img
          src={event.image}
          alt={event.title}
          className="w-20 h-20 rounded-xl object-cover shrink-0"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <StatusBadge status={registration.status} />
            <span className="text-xs text-surface-500 font-mono">ID: {registration.id.toUpperCase()}</span>
          </div>
          <Link to={`/events/${event.id}`} className="hover:text-primary-600 transition-colors">
            <h4 className="font-bold text-surface-900 text-base line-clamp-1">{event.title}</h4>
          </Link>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-surface-400" />
              {formatDate(event.date)} at {formatTime(event.startTime)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-surface-400" />
              {event.location}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md">
              {registration.ticketType}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-surface-100">
        {registration.status !== 'cancelled' && onCancel && (
          <Button
            variant="ghost"
            size="sm"
            className="text-danger-500 hover:bg-danger-50 text-xs"
            onClick={() => onCancel(registration.id)}
            icon={XCircle}
          >
            Cancel
          </Button>
        )}
        <Link to={`/tickets/${registration.id}`}>
          <Button variant="outline" size="sm" icon={Ticket} className="text-xs">
            View Ticket
          </Button>
        </Link>
      </div>
    </div>
  );
}
