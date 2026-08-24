import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Bookmark, ArrowRight, Video } from 'lucide-react';
import { formatDateShort, formatTime, getSeatsInfo } from '../../utils/helpers';
import CategoryBadge from '../ui/CategoryBadge';
import StatusBadge from '../ui/StatusBadge';
import { useApp } from '../../context/AppContext';

export default function EventCard({ event, onQuickRegister }) {
  const { isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(event.id);
  const seats = getSeatsInfo(event.capacity, event.registered);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(event.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-surface-200/80 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category & Online Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 items-center">
          <CategoryBadge categoryId={event.category} />
          {event.isOnline && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-xs">
              <Video size={12} /> Online
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove from bookmarks' : 'Bookmark event'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow flex items-center justify-center text-surface-700 hover:text-primary-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <Bookmark size={16} className={bookmarked ? 'fill-primary-600 text-primary-600' : ''} />
        </button>

        {/* Price Tag & Date Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="bg-surface-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-white/10">
            <Calendar size={13} className="text-primary-300" />
            <span>{formatDateShort(event.date)} • {formatTime(event.startTime)}</span>
          </div>
          <span className="font-bold text-sm px-2.5 py-1 rounded-lg bg-primary-600 text-white shadow-sm">
            {event.isFree ? 'Free' : `$${event.price}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs text-surface-500">
            <span className="font-medium text-surface-700">{event.organizer}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-surface-400" />
              <span className="truncate max-w-[140px]">{event.location}</span>
            </span>
          </div>

          <Link to={`/events/${event.id}`}>
            <h3 className="text-base font-bold text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
              {event.title}
            </h3>
          </Link>

          <p className="text-sm text-surface-600 line-clamp-2 leading-relaxed mb-4">
            {event.shortDescription || event.description}
          </p>
        </div>

        {/* Footer info: Seats + Action */}
        <div className="pt-3 border-t border-surface-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-surface-600">
              <Users size={14} className="text-surface-400" />
              <span>{seats.available > 0 ? `${seats.available} seats left` : 'Full'}</span>
            </div>
            {/* Small progress bar */}
            <div className="w-24 h-1.5 bg-surface-100 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full ${
                  seats.percentage >= 90 ? 'bg-danger-500' : seats.percentage >= 70 ? 'bg-warning-500' : 'bg-primary-500'
                }`}
                style={{ width: `${Math.min(100, seats.percentage)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 px-2.5 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Details <ArrowRight size={13} />
            </Link>
            {onQuickRegister && seats.available > 0 && (
              <button
                onClick={() => onQuickRegister(event)}
                className="text-xs font-semibold bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
