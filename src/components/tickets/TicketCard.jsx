import { Calendar, MapPin, QrCode, User, Download, Printer } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/helpers';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';

export default function TicketCard({ registration, event, onPrint, onDownload }) {
  if (!registration || !event) return null;

  return (
    <div className="bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Top Banner with Event Art */}
      <div className="relative h-44 bg-gradient-to-r from-primary-900 to-surface-900 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-5 right-5">
          <StatusBadge status={registration.status} />
        </div>
        <div className="absolute bottom-5 left-6 right-6 text-white">
          <span className="text-xs uppercase font-bold tracking-wider text-primary-300">
            {event.category?.toUpperCase()}
          </span>
          <h2 className="text-xl md:text-2xl font-black mt-0.5 line-clamp-1">{event.title}</h2>
          <p className="text-xs text-surface-300 flex items-center gap-1.5 mt-1">
            <span>By {event.organizer}</span>
          </p>
        </div>
      </div>

      {/* Perforated Divider Visual */}
      <div className="relative flex items-center justify-between px-2 bg-surface-50 border-y border-dashed border-surface-300 py-3">
        <div className="w-5 h-5 rounded-full bg-surface-100 -ml-4 border-r border-surface-300" />
        <div className="flex-1 border-t-2 border-dashed border-surface-300 mx-4" />
        <span className="text-xs font-mono font-bold tracking-widest text-surface-400">
          EVENT PASS
        </span>
        <div className="flex-1 border-t-2 border-dashed border-surface-300 mx-4" />
        <div className="w-5 h-5 rounded-full bg-surface-100 -mr-4 border-l border-surface-300" />
      </div>

      {/* Main Ticket Info Section */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Event & Attendee Details */}
        <div className="md:col-span-2 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase">Date & Time</p>
              <div className="flex items-start gap-2 mt-1">
                <Calendar size={16} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-surface-900">{formatDate(event.date)}</p>
                  <p className="text-xs text-surface-500">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase">Location</p>
              <div className="flex items-start gap-2 mt-1">
                <MapPin size={16} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-surface-900 line-clamp-1">{event.location}</p>
                  <p className="text-xs text-surface-500 line-clamp-1">{event.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-100 pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase">Attendee Name</p>
              <div className="flex items-center gap-2 mt-1">
                <User size={15} className="text-surface-400 shrink-0" />
                <p className="text-sm font-bold text-surface-800">{registration.attendeeName}</p>
              </div>
              <p className="text-xs text-surface-500">{registration.attendeeEmail}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase">Pass Type</p>
              <p className="text-sm font-bold text-primary-700 mt-1">{registration.ticketType}</p>
              <p className="text-xs text-surface-500 font-mono">Issued: {registration.registrationDate}</p>
            </div>
          </div>
        </div>

        {/* QR Code and Check-in verification simulation */}
        <div className="flex flex-col items-center justify-center p-4 bg-surface-50 rounded-2xl border border-surface-200/70 text-center">
          <div className="w-28 h-28 bg-white p-2 rounded-xl border border-surface-200 shadow-xs flex items-center justify-center relative group">
            {/* Real SVG QR Placeholder Representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-surface-900">
              <rect x="0" y="0" width="30" height="30" fill="currentColor" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="currentColor" />
              
              <rect x="70" y="0" width="30" height="30" fill="currentColor" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" fill="currentColor" />

              <rect x="0" y="70" width="30" height="30" fill="currentColor" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" fill="currentColor" />

              <rect x="40" y="10" width="10" height="10" fill="currentColor" />
              <rect x="55" y="20" width="10" height="10" fill="currentColor" />
              <rect x="40" y="40" width="20" height="20" fill="currentColor" />
              <rect x="70" y="50" width="10" height="20" fill="currentColor" />
              <rect x="20" y="45" width="10" height="15" fill="currentColor" />
              <rect x="45" y="75" width="20" height="10" fill="currentColor" />
              <rect x="75" y="80" width="15" height="10" fill="currentColor" />
            </svg>
          </div>

          <p className="font-mono text-xs font-bold text-surface-800 mt-2 tracking-widest">
            {registration.id.toUpperCase()}
          </p>
          <span className="text-[10px] text-surface-400 mt-0.5">Scan at entry gate</span>
        </div>
      </div>

      {/* Action Bar (Print / Download) */}
      <div className="bg-surface-50 px-6 py-4 border-t border-surface-200 flex items-center justify-between">
        <p className="text-xs text-surface-500">
          Please present this digital pass or physical printout at check-in.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Printer} onClick={onPrint || (() => window.print())}>
            Print
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={onDownload || (() => alert('Downloading Ticket PDF...'))}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
