import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  User,
  Ticket,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/helpers';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

export default function ManageRegistrationsPage() {
  const { userRegistrations, events, cancelRegistration, addNotification } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [inspectingReg, setInspectingReg] = useState(null);

  // Merge registration records with event details
  const enrichedRegistrations = useMemo(() => {
    return userRegistrations.map((reg) => {
      const event = events.find((e) => e.id === reg.eventId);
      return {
        ...reg,
        eventTitle: event?.title || 'Unknown Event',
        eventDate: event?.date || '',
        eventLocation: event?.location || '',
      };
    });
  }, [userRegistrations, events]);

  const filteredRegistrations = useMemo(() => {
    return enrichedRegistrations.filter((r) => {
      if (selectedEventId !== 'all' && r.eventId !== selectedEventId) return false;
      if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.attendeeName.toLowerCase().includes(q) ||
          r.attendeeEmail.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.eventTitle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [enrichedRegistrations, selectedEventId, selectedStatus, searchQuery]);

  const handleExportCSV = () => {
    addNotification('Attendee list exported to CSV!', 'success');
  };

  const handleApprove = (regId) => {
    addNotification(`Registration ${regId.toUpperCase()} approved!`, 'success');
  };

  const handleCancel = (regId) => {
    cancelRegistration(regId);
    addNotification(`Registration ${regId.toUpperCase()} marked as cancelled.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900">
            Manage Registrations
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Review attendee registrations, verify passes, and monitor admissions.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Attendee CSV
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attendee by name, email, or registration ID..."
            className="w-full pl-9 pr-4 py-2 border border-surface-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Event Filter */}
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs font-medium text-surface-700 focus:outline-none cursor-pointer max-w-[200px] truncate"
          >
            <option value="all">All Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs font-medium text-surface-700 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-xs overflow-hidden">
        {filteredRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-surface-600">
              <thead className="bg-surface-50 text-surface-500 font-bold uppercase tracking-wider text-[11px] border-b border-surface-200">
                <tr>
                  <th className="py-3.5 px-5">Reg ID</th>
                  <th className="py-3.5 px-4">Attendee</th>
                  <th className="py-3.5 px-4">Event</th>
                  <th className="py-3.5 px-4">Ticket Pass</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-medium">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-surface-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-5 font-mono font-bold text-surface-900">
                      {reg.id.toUpperCase()}
                    </td>

                    {/* Attendee */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {reg.attendeeName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-surface-900 truncate">{reg.attendeeName}</p>
                          <p className="text-[11px] text-surface-400 truncate">{reg.attendeeEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Event */}
                    <td className="py-4 px-4 max-w-[200px]">
                      <p className="font-bold text-surface-800 truncate">{reg.eventTitle}</p>
                      <p className="text-[10px] text-surface-400 truncate">{reg.eventLocation}</p>
                    </td>

                    {/* Ticket type */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-surface-100 text-surface-700 font-semibold text-xs">
                        {reg.ticketType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-surface-500">
                      {reg.registrationDate}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge status={reg.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectingReg(reg)}
                          title="View Attendee Record"
                          className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye size={15} />
                        </button>
                        {reg.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(reg.id)}
                            title="Approve Registration"
                            className="p-1.5 text-surface-400 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        {reg.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(reg.id)}
                            title="Revoke / Cancel Registration"
                            className="p-1.5 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12">
            <EmptyState
              title="No registrations found"
              description="No attendee registrations match the selected event or search filters."
              icon="users"
            />
          </div>
        )}
      </div>

      {/* Attendee Details Inspection Modal */}
      {inspectingReg && (
        <Modal
          isOpen={!!inspectingReg}
          onClose={() => setInspectingReg(null)}
          title="Attendee Registration Details"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <span className="text-surface-400 uppercase text-[10px] font-bold">Pass ID</span>
                <p className="font-mono font-bold text-sm text-surface-900">{inspectingReg.id.toUpperCase()}</p>
              </div>
              <StatusBadge status={inspectingReg.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-surface-400 uppercase text-[10px] font-bold">Attendee Name</span>
                <p className="font-bold text-surface-900 text-sm">{inspectingReg.attendeeName}</p>
              </div>
              <div>
                <span className="text-surface-400 uppercase text-[10px] font-bold">Email Address</span>
                <p className="font-bold text-surface-900 text-sm">{inspectingReg.attendeeEmail}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-surface-400 uppercase text-[10px] font-bold">Event</span>
                <p className="font-semibold text-surface-800">{inspectingReg.eventTitle}</p>
              </div>
              <div>
                <span className="text-surface-400 uppercase text-[10px] font-bold">Ticket Tier</span>
                <p className="font-semibold text-primary-700">{inspectingReg.ticketType}</p>
              </div>
            </div>

            <div className="p-3 bg-surface-50 rounded-xl border border-surface-200">
              <span className="text-surface-400 uppercase text-[10px] font-bold">QR Verification Code</span>
              <p className="font-mono font-bold text-surface-800 text-xs mt-0.5">{inspectingReg.qrCode || inspectingReg.id}</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-100">
              <Button variant="secondary" size="sm" onClick={() => setInspectingReg(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
