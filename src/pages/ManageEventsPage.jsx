import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDateShort, getSeatsInfo } from '../utils/helpers';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import EmptyState from '../components/ui/EmptyState';

export default function ManageEventsPage() {
  const navigate = useNavigate();
  const { events, deleteEvent, updateEvent, addNotification } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingEventId, setDeletingEventId] = useState(null);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (statusFilter !== 'all' && evt.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          evt.title.toLowerCase().includes(q) ||
          evt.location.toLowerCase().includes(q) ||
          evt.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, searchQuery, statusFilter]);

  const handleTogglePublish = (evt) => {
    const newStatus = evt.status === 'published' ? 'draft' : 'published';
    updateEvent(evt.id, { status: newStatus });
    addNotification(
      `Event "${evt.title}" is now ${newStatus}.`,
      newStatus === 'published' ? 'success' : 'info'
    );
  };

  const handleConfirmDelete = () => {
    if (deletingEventId) {
      deleteEvent(deletingEventId);
      addNotification('Event deleted successfully.', 'info');
      setDeletingEventId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900">Manage Events</h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Create, update, publish, or remove events from your portfolio.
          </p>
        </div>

        <Link to="/organizer/events/create">
          <Button variant="primary" icon={PlusCircle} className="font-bold text-xs sm:text-sm">
            Create Event
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location, or category..."
            className="w-full pl-9 pr-4 py-2 border border-surface-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-surface-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs font-medium text-surface-700 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Events Table / Card List */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-xs overflow-hidden">
        {filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-surface-600">
              <thead className="bg-surface-50 text-surface-500 font-bold uppercase tracking-wider text-[11px] border-b border-surface-200">
                <tr>
                  <th className="py-3.5 px-5">Event Details</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Occupancy</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-medium">
                {filteredEvents.map((evt) => {
                  const seats = getSeatsInfo(evt.capacity, evt.registered);
                  return (
                    <tr key={evt.id} className="hover:bg-surface-50/80 transition-colors">
                      {/* Event Column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5 max-w-sm">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-surface-900 text-sm truncate">{evt.title}</h4>
                            <p className="text-[11px] text-surface-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} />
                              <span className="truncate">{evt.location}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <p className="font-bold text-surface-800">{formatDateShort(evt.date)}</p>
                        <p className="text-[11px] text-surface-400">{evt.startTime} - {evt.endTime}</p>
                      </td>

                      {/* Occupancy */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-surface-800">
                            {evt.registered} / {evt.capacity}
                          </span>
                          <span className="text-[10px] text-surface-400 font-mono">
                            ({Math.round(seats.percentage)}%)
                          </span>
                        </div>
                        <div className="w-20 h-1.5 bg-surface-100 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              seats.percentage >= 90 ? 'bg-danger-500' : 'bg-primary-500'
                            }`}
                            style={{ width: `${Math.min(100, seats.percentage)}%` }}
                          />
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 whitespace-nowrap font-bold text-surface-800">
                        {evt.isFree ? 'Free' : `$${evt.price}`}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(evt)}
                          title="Click to toggle status"
                          className="cursor-pointer"
                        >
                          <StatusBadge status={evt.status} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/events/${evt.id}`}
                            target="_blank"
                            title="Preview live event page"
                            className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye size={15} />
                          </Link>
                          <Link
                            to={`/organizer/events/edit/${evt.id}`}
                            title="Edit Event"
                            className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <button
                            onClick={() => setDeletingEventId(evt.id)}
                            title="Delete Event"
                            className="p-2 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12">
            <EmptyState
              title="No events found"
              description="No events match your current filter criteria."
              icon="events"
              actionLabel="Create Event"
              onAction={() => navigate('/organizer/events/create')}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deletingEventId}
        onClose={() => setDeletingEventId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Event?"
        message="Are you sure you want to delete this event? All attendee registrations linked to it will also be impacted."
        confirmText="Delete Event"
        variant="danger"
      />
    </div>
  );
}
