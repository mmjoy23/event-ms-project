import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  PlusCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDateShort, getSeatsInfo } from '../utils/helpers';
import DashboardCard from '../components/ui/DashboardCard';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';

export default function OrganizerDashboardPage() {
  const { events, userRegistrations, currentUser } = useApp();

  const totalEvents = events.length;
  const publishedEvents = events.filter((e) => e.status === 'published').length;
  const totalRegistrations = events.reduce((sum, e) => sum + (e.registered || 0), 0);

  // Revenue estimation
  const totalRevenue = events.reduce((sum, e) => {
    return sum + (e.registered || 0) * (e.price || 0);
  }, 0);

  // Recent registrations from state
  const recentRegistrations = userRegistrations.slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900">
            Organizer Overview
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Track your event performance, registration velocity, and attendee growth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/organizer/events/create">
            <Button variant="primary" icon={PlusCircle} className="font-bold text-xs sm:text-sm">
              Create New Event
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Events"
          value={totalEvents}
          subtitle={`${publishedEvents} currently live`}
          icon={Calendar}
          color="primary"
          trend="up"
          trendValue="+2 this month"
        />
        <DashboardCard
          title="Total Registrations"
          value={totalRegistrations.toLocaleString()}
          subtitle="Across all active events"
          icon={Users}
          color="purple"
          trend="up"
          trendValue="+14.2%"
        />
        <DashboardCard
          title="Ticket Volume"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="Estimated gross admissions"
          icon={DollarSign}
          color="emerald"
          trend="up"
          trendValue="+8.5%"
        />
        <DashboardCard
          title="Avg. Occupancy"
          value="76.4%"
          subtitle="Seat conversion rate"
          icon={TrendingUp}
          color="amber"
          trend="up"
          trendValue="+5.1%"
        />
      </div>

      {/* Two Column Layout: Event Performance & Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Event Performance */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-surface-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-surface-900">Event Capacity & Performance</h2>
              <p className="text-xs text-surface-500 mt-0.5">Real-time seat occupancy across events</p>
            </div>
            <Link
              to="/organizer/events"
              className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="space-y-4">
            {events.slice(0, 5).map((evt) => {
              const seats = getSeatsInfo(evt.capacity, evt.registered);
              return (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-surface-50 border border-surface-200/70 hover:bg-surface-100/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={evt.status} />
                        <h4 className="font-bold text-surface-900 text-sm truncate">{evt.title}</h4>
                      </div>
                      <p className="text-xs text-surface-500 mt-0.5">
                        {formatDateShort(evt.date)} • {evt.location}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-surface-900">
                        {evt.registered} / {evt.capacity}
                      </span>
                      <span className="text-[11px] text-surface-400 block">seats taken</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-surface-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        seats.percentage >= 90 ? 'bg-danger-500' : seats.percentage >= 70 ? 'bg-warning-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${Math.min(100, seats.percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Recent Registrations Activity */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-surface-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-surface-900">Recent Attendees</h2>
              <p className="text-xs text-surface-500 mt-0.5">Latest registrations received</p>
            </div>
            <Link
              to="/organizer/registrations"
              className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentRegistrations.length > 0 ? (
              recentRegistrations.map((reg) => {
                const evt = events.find((e) => e.id === reg.eventId);
                return (
                  <div
                    key={reg.id}
                    className="p-3 rounded-xl bg-surface-50 border border-surface-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-surface-900 truncate max-w-[130px]">
                        {reg.attendeeName}
                      </span>
                      <StatusBadge status={reg.status} />
                    </div>
                    <p className="text-xs text-primary-700 font-medium truncate">
                      {evt?.title || 'Event'}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-surface-400 font-mono">
                      <span>{reg.ticketType}</span>
                      <span>{reg.registrationDate}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-surface-400 text-center py-6">No registrations recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
