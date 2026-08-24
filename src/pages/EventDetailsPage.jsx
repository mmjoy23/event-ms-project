import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Bookmark,
  CheckCircle,
  Video,
  ArrowLeft,
  Building,
  CalendarCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { speakers as mockSpeakers } from '../data/mockData';
import { formatDate, formatTime, getSeatsInfo, isEventPast } from '../utils/helpers';
import CategoryBadge from '../components/ui/CategoryBadge';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import EventCard from '../components/events/EventCard';
import RegistrationModal from '../components/events/RegistrationModal';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, isBookmarked, toggleBookmark, addNotification } = useApp();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-surface-900">Event Not Found</h2>
        <p className="text-surface-500 text-sm">
          The event you are looking for does not exist or may have been removed.
        </p>
        <Link to="/events">
          <Button variant="primary">Browse All Events</Button>
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(event.id);
  const seats = getSeatsInfo(event.capacity, event.registered);
  const isPast = isEventPast(event.date);

  // Resolve speakers
  const eventSpeakers = (event.speakers || [])
    .map((spId) => mockSpeakers.find((s) => s.id === spId))
    .filter(Boolean);

  // Related events
  const relatedEvents = events
    .filter((e) => e.id !== event.id && e.category === event.category && e.status === 'published')
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedShare(true);
    addNotification('Event link copied to clipboard!', 'info');
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="pb-20">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Events
        </button>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-surface-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-900/80 to-surface-900/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <CategoryBadge categoryId={event.category} />
              {event.isOnline && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-xs">
                  <Video size={12} /> Virtual Event
                </span>
              )}
              {isPast && <StatusBadge status="draft" />}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-surface-300 leading-relaxed max-w-3xl">
              {event.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-surface-300">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-primary-400" />
                <span>Organized by <strong className="text-white">{event.organizer}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck size={16} className="text-primary-400" />
                <span>{formatDate(event.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details, Speakers, Schedule */}
        <div className="lg:col-span-2 space-y-10">
          {/* About Event */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-surface-900">About the Event</h2>
            <div className="text-surface-600 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
              {event.description}
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="pt-4 border-t border-surface-100 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-surface-400 uppercase">Tags:</span>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-surface-100 text-surface-600 rounded-lg text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Speakers Section */}
          {eventSpeakers.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-surface-900">Featured Speakers</h2>
                <p className="text-xs text-surface-500 mt-1">
                  Learn from domain leaders and seasoned industry practitioners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventSpeakers.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-4 rounded-2xl bg-surface-50 border border-surface-200/80 flex gap-3.5 items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                      {sp.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-bold text-surface-900 text-sm">{sp.name}</h4>
                      <p className="text-xs text-primary-600 font-medium truncate">
                        {sp.title} • {sp.company}
                      </p>
                      <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed">
                        {sp.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Event Schedule Section */}
          {event.schedule && event.schedule.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-surface-900">Event Schedule</h2>
                <p className="text-xs text-surface-500 mt-1">
                  Agenda and timeline of sessions throughout the event.
                </p>
              </div>

              <div className="space-y-4">
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start p-3.5 rounded-xl hover:bg-surface-50 transition-colors border-l-2 border-primary-500 pl-4"
                  >
                    <div className="font-mono text-xs font-bold text-primary-700 w-16 shrink-0 mt-0.5">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-surface-900">{item.title}</p>
                      {item.speaker && (
                        <p className="text-xs text-surface-500 mt-0.5">
                          Speaker: {mockSpeakers.find((s) => s.id === item.speaker)?.name || item.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Registration Card & Key Information */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Main Action Box */}
          <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-md sticky top-24 space-y-6">
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase">Registration</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-surface-900">
                  {event.isFree ? 'Free' : `$${event.price}`}
                </span>
                {!event.isFree && <span className="text-xs text-surface-500">/ per ticket</span>}
              </div>
            </div>

            {/* Seat Availability Meter */}
            <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-surface-600">Seat Capacity</span>
                <span className={seats.available > 0 ? 'text-primary-700' : 'text-danger-500'}>
                  {seats.available > 0 ? `${seats.available} seats left` : 'Sold Out'}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    seats.percentage >= 90 ? 'bg-danger-500' : seats.percentage >= 70 ? 'bg-warning-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${Math.min(100, seats.percentage)}%` }}
                />
              </div>
              <p className="text-[11px] text-surface-400 text-center">
                {event.registered} of {event.capacity} total seats taken
              </p>
            </div>

            {/* Main Action Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-lg shadow-primary-600/20 text-base"
              disabled={isPast || seats.available <= 0}
              onClick={() => setIsRegisterOpen(true)}
            >
              {isPast ? 'Event Ended' : seats.available <= 0 ? 'Sold Out' : 'Register Now'}
            </Button>

            {/* Event Key Meta list */}
            <div className="space-y-3 pt-4 border-t border-surface-100 text-xs text-surface-600">
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-surface-900">{formatDate(event.date)}</p>
                  <p className="text-surface-400">Add to calendar</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-surface-900">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                  <p className="text-surface-400">Duration: ~4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-surface-900">{event.location}</p>
                  <p className="text-surface-400">{event.address}</p>
                </div>
              </div>
            </div>

            {/* Secondary Actions (Bookmark, Share) */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-100">
              <Button
                variant={bookmarked ? 'primary' : 'outline'}
                size="sm"
                icon={Bookmark}
                onClick={() => toggleBookmark(event.id)}
              >
                {bookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Share2}
                onClick={handleShare}
              >
                {copiedShare ? 'Copied!' : 'Share'}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Events Section */}
      {relatedEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-surface-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-surface-900">Similar Events You Might Like</h3>
            <Link to="/events" className="text-xs font-bold text-primary-600 hover:text-primary-700">
              Browse More →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} onQuickRegister={() => setIsRegisterOpen(true)} />
            ))}
          </div>
        </section>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        event={event}
      />
    </div>
  );
}
