import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import EventGrid from '../components/events/EventGrid';
import Button from '../components/ui/Button';
import RegistrationModal from '../components/events/RegistrationModal';

export default function HomePage() {
  const { events } = useApp();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [registeringEvent, setRegisteringEvent] = useState(null);

  const featuredEvents = events.filter((e) => e.isFeatured && e.status === 'published');
  const upcomingEvents = events.filter((e) => e.status === 'published').slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/events?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/events');
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-900 via-surface-900 to-surface-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-accent-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-accent-400" />
              <span>Next-Gen Event Experience & Registration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Discover & Join Extraordinary <span className="bg-gradient-to-r from-primary-400 via-accent-300 to-primary-200 bg-clip-text text-transparent">Events Worldwide</span>
            </h1>

            <p className="text-base sm:text-lg text-surface-300 max-w-2xl mx-auto leading-relaxed">
              Explore conferences, tech masterclasses, investor pitch nights, and creative workshops. Instant registration with zero friction.
            </p>

            {/* Quick Hero Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto pt-4">
              <div className="bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search size={18} className="text-surface-400" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search by topic, speaker, or city..."
                    className="w-full bg-transparent text-white placeholder:text-surface-400 text-sm focus:outline-none py-2"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="sm:w-auto w-full">
                  Search Events
                </Button>
              </div>
            </form>

            {/* Quick Stats Banner */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-white/10">
              <div>
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-xs text-surface-400 font-medium">Curated Events</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">50k+</p>
                <p className="text-xs text-surface-400 font-medium">Attendees</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">99.8%</p>
                <p className="text-xs text-surface-400 font-medium">Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-surface-400 font-medium">Digital Passes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold text-primary-600 tracking-wider">
              Browse Topics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events?category=${cat.id}`}
              className="bg-white hover:bg-primary-50/50 p-4 rounded-2xl border border-surface-200 hover:border-primary-300 text-center transition-all group flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-surface-800 group-hover:text-primary-700">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED EVENTS */}
      {featuredEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold text-amber-600 tracking-wider">
                <Award size={14} /> Handpicked Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
                Featured Conferences & Summits
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View Full Catalog <ArrowRight size={16} />
            </Link>
          </div>

          <EventGrid
            events={featuredEvents}
            onQuickRegister={(evt) => setRegisteringEvent(evt)}
            columns={3}
          />
        </section>
      )}

      {/* 4. UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold text-primary-600 tracking-wider">
              Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
              Upcoming Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Explore All <ArrowRight size={16} />
          </Link>
        </div>

        <EventGrid
          events={upcomingEvents}
          onQuickRegister={(evt) => setRegisteringEvent(evt)}
          columns={3}
        />
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-white border-y border-surface-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold text-primary-600 tracking-wider">
              Seamless Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
              How EventHub Works
            </h2>
            <p className="text-sm text-surface-500 mt-2">
              From discovering top events to entering the venue in three effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Find Your Next Event',
                desc: 'Browse hundreds of conferences, workshops, and networking sessions tailored to your professional interests.',
                icon: Search,
                color: 'bg-primary-50 text-primary-600 border-primary-200',
              },
              {
                step: '02',
                title: '1-Click Registration',
                desc: 'Choose your ticket tier, enter your details, and secure your seat instantly with instant confirmation.',
                icon: Zap,
                color: 'bg-accent-50 text-accent-600 border-accent-200',
              },
              {
                step: '03',
                title: 'Get Digital Pass & QR',
                desc: 'Access your registration dashboard, download your PDF ticket, or present the QR code at the venue gate.',
                icon: ShieldCheck,
                color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="p-8 rounded-3xl bg-surface-50 border border-surface-200/80 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color}`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-3xl font-black text-surface-300 font-mono">
                        {card.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-surface-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-surface-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ORGANIZER CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-700 via-primary-800 to-surface-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-primary-200">
              For Event Creators
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Host Your Next Event on EventHub
            </h2>
            <p className="text-surface-200 text-sm sm:text-base leading-relaxed">
              Create registration pages, track attendees in real time, issue verified digital passes, and grow your audience effortlessly.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/organizer/events/create">
                <Button variant="secondary" size="lg" className="bg-white text-surface-900 hover:bg-surface-100 font-bold">
                  Create an Event Now
                </Button>
              </Link>
              <Link to="/organizer/dashboard">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Organizer Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
              <CheckCircle className="text-success-400 mb-2" size={24} />
              <p className="font-bold text-sm">Real-time Analytics</p>
              <p className="text-xs text-surface-300 mt-1">Live attendee numbers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
              <CheckCircle className="text-success-400 mb-2" size={24} />
              <p className="font-bold text-sm">Instant Passes</p>
              <p className="text-xs text-surface-300 mt-1">Scannable QR codes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {registeringEvent && (
        <RegistrationModal
          isOpen={!!registeringEvent}
          onClose={() => setRegisteringEvent(null)}
          event={registeringEvent}
        />
      )}
    </div>
  );
}
