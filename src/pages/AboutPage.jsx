import { Link } from 'react-router-dom';
import { Target, Users, Shield, Sparkles, Award, Globe, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function AboutPage() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-950 via-surface-900 to-surface-950 text-white py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-300 text-xs font-semibold">
            <Sparkles size={14} /> Our Mission & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Connecting Curious Minds with Transformative Events
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-2xl mx-auto leading-relaxed">
            EventHub was built to simplify event discovery, seamless digital ticketing, and powerful organizer management into one intuitive platform.
          </p>
        </div>
      </section>

      {/* Values & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold text-primary-600 tracking-wider">
            Our Core Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mt-1">
            Built for Attendees and Organizers Alike
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: 'Effortless Discovery',
              desc: 'Powerful search, category filters, and curated recommendations let users find exactly what advances their careers and passions.',
              color: 'bg-primary-50 text-primary-600',
            },
            {
              icon: Shield,
              title: 'Reliable Ticketing',
              desc: 'Instant verification, QR code digital passes, and seat tracking ensure smooth check-ins with no queues or lost tickets.',
              color: 'bg-emerald-50 text-emerald-600',
            },
            {
              icon: Users,
              title: 'Community Centric',
              desc: 'From intimate tech meetups to global flagship summits, we empower communities of all sizes to convene and collaborate.',
              color: 'bg-purple-50 text-purple-600',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-surface-200 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-surface-900">{item.title}</h3>
                <p className="text-sm text-surface-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Stats */}
      <section className="bg-surface-100 border-y border-surface-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-primary-600">500+</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-600 mt-1">Conferences & Summits</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary-600">120k+</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-600 mt-1">Active Attendees</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary-600">45+</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-600 mt-1">Countries Represented</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary-600">99.9%</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-600 mt-1">Platform Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-surface-900">
          Ready to experience the future of event management?
        </h2>
        <p className="text-sm text-surface-600 max-w-xl mx-auto">
          Start exploring today's top tech, design, business, and research conferences or publish your own event in minutes.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link to="/events">
            <Button variant="primary" size="lg" className="font-bold">
              Browse Events <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
