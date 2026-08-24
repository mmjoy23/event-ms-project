import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Ticket,
  Bookmark,
  Calendar,
  Clock,
  LogOut,
  Mail,
  Phone,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { isEventPast } from '../utils/helpers';
import RegistrationCard from '../components/tickets/RegistrationCard';
import EventCard from '../components/events/EventCard';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import Button from '../components/ui/Button';

export default function UserDashboardPage() {
  const {
    currentUser,
    events,
    userRegistrations,
    bookmarks,
    cancelRegistration,
    logout,
    addNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [cancellingRegId, setCancellingRegId] = useState(null);

  // Fallback demo user if not logged in
  const user = currentUser || {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    joinedDate: '2026-06-15',
    bio: 'Software engineer passionate about AI and tech events.',
  };

  // Filter registrations
  const userRegs = userRegistrations.map((reg) => ({
    ...reg,
    event: events.find((e) => e.id === reg.eventId),
  })).filter((r) => r.event);

  const upcomingRegistrations = userRegs.filter(
    (r) => !isEventPast(r.event.date) && r.status !== 'cancelled'
  );

  const pastRegistrations = userRegs.filter(
    (r) => isEventPast(r.event.date) || r.status === 'cancelled'
  );

  const bookmarkedEvents = events.filter((e) => bookmarks.includes(e.id));

  const handleConfirmCancel = () => {
    if (cancellingRegId) {
      cancelRegistration(cancellingRegId);
      addNotification('Registration has been cancelled.', 'info');
      setCancellingRegId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Top Banner / User Header */}
      <div className="bg-white rounded-3xl border border-surface-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-surface-900">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700">
                Attendee
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail size={13} /> {user.email}
              </span>
              {user.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={13} /> {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User stats summary */}
        <div className="flex items-center gap-4 sm:gap-8 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto border-surface-100">
          <div className="text-center">
            <p className="text-2xl font-black text-surface-900">{upcomingRegistrations.length}</p>
            <p className="text-xs text-surface-500 font-medium">Upcoming Events</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-surface-900">{userRegs.length}</p>
            <p className="text-xs text-surface-500 font-medium">Total Passes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-surface-900">{bookmarks.length}</p>
            <p className="text-xs text-surface-500 font-medium">Bookmarked</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-200 gap-6">
        {[
          { id: 'upcoming', label: 'Upcoming Registrations', count: upcomingRegistrations.length, icon: Calendar },
          { id: 'past', label: 'Past & Cancelled', count: pastRegistrations.length, icon: Clock },
          { id: 'saved', label: 'Saved Events', count: bookmarkedEvents.length, icon: Bookmark },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-surface-500 hover:text-surface-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-primary-100 text-primary-800' : 'bg-surface-100 text-surface-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingRegistrations.length > 0 ? (
              upcomingRegistrations.map((reg) => (
                <RegistrationCard
                  key={reg.id}
                  registration={reg}
                  event={reg.event}
                  onCancel={(id) => setCancellingRegId(id)}
                />
              ))
            ) : (
              <EmptyState
                title="No upcoming registrations"
                description="You haven't registered for any upcoming events yet. Discover thousands of conferences and workshops happening soon!"
                icon="tickets"
                actionLabel="Browse Events"
                onAction={() => window.location.href = '/events'}
              />
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastRegistrations.length > 0 ? (
              pastRegistrations.map((reg) => (
                <RegistrationCard
                  key={reg.id}
                  registration={reg}
                  event={reg.event}
                />
              ))
            ) : (
              <EmptyState
                title="No past events"
                description="You do not have any past or cancelled event records."
                icon="events"
              />
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {bookmarkedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedEvents.map((evt) => (
                  <EventCard key={evt.id} event={evt} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No saved events"
                description="Save events you're interested in by tapping the bookmark button on any event card."
                icon="search"
                actionLabel="Explore Events"
                onAction={() => window.location.href = '/events'}
              />
            )}
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!cancellingRegId}
        onClose={() => setCancellingRegId(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration?"
        message="Are you sure you want to cancel your seat for this event? Your ticket will be invalidated."
        confirmText="Confirm Cancellation"
        variant="danger"
      />
    </div>
  );
}
