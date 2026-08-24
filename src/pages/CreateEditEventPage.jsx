import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, Plus, Trash2, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

const presetImages = [
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
];

export default function CreateEditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent, addNotification } = useApp();

  const isEditing = !!id;
  const existingEvent = isEditing ? events.find((e) => e.id === id) : null;

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: 'tech',
    date: '2026-10-15',
    endDate: '2026-10-15',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Metropolitan Center, NY',
    address: '100 Main St, New York, NY 10001',
    isOnline: false,
    capacity: 200,
    price: 0,
    isFree: true,
    image: presetImages[0],
    registrationDeadline: '2026-10-10',
    status: 'published',
    tags: 'Technology, Innovation, Workshop',
    ticketTypes: [
      { id: 'tt-1', name: 'General Admission', price: 0, available: 150 },
      { id: 'tt-2', name: 'VIP Pass', price: 49, available: 50 },
    ],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        ...existingEvent,
        tags: (existingEvent.tags || []).join(', '),
      });
    }
  }, [existingEvent]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.description.trim()) errs.description = 'Event description is required';
    if (!formData.date) errs.date = 'Event date is required';
    if (!formData.location.trim()) errs.location = 'Location or Virtual platform is required';
    if (formData.capacity <= 0) errs.capacity = 'Capacity must be greater than zero';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (statusToSet) => {
    if (!validate()) return;

    setLoading(true);
    const cleanedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const eventPayload = {
      ...formData,
      status: statusToSet || formData.status,
      tags: cleanedTags,
      price: formData.isFree ? 0 : Number(formData.price),
      capacity: Number(formData.capacity),
    };

    setTimeout(() => {
      if (isEditing) {
        updateEvent(id, eventPayload);
        addNotification(`Event "${formData.title}" updated successfully!`, 'success');
      } else {
        addEvent(eventPayload);
        addNotification(`Event "${formData.title}" created successfully!`, 'success');
      }
      setLoading(false);
      navigate('/organizer/events');
    }, 400);
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticketTypes: [
        ...(formData.ticketTypes || []),
        { id: `tt-${Date.now()}`, name: 'New Ticket Tier', price: 0, available: 50 },
      ],
    });
  };

  const removeTicketType = (ticketId) => {
    setFormData({
      ...formData,
      ticketTypes: formData.ticketTypes.filter((t) => t.id !== ticketId),
    });
  };

  const updateTicketTier = (ticketId, field, val) => {
    setFormData({
      ...formData,
      ticketTypes: formData.ticketTypes.map((t) =>
        t.id === ticketId ? { ...t, [field]: val } : t
      ),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header & Back link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/organizer/events')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Events
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Fill in the details below to publish your event or save it as a draft.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={loading}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => handleSave('published')}
            loading={loading}
            icon={Save}
          >
            {isEditing ? 'Update Event' : 'Publish Event'}
          </Button>
        </div>
      </div>

      {/* Main Form container */}
      <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* 1. Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-surface-900 uppercase tracking-wider pb-2 border-b border-surface-100">
            1. Basic Information
          </h3>

          <FormField
            label="Event Title"
            id="event-title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            placeholder="e.g. Annual Cloud & AI Developer Conference 2026"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" id="event-category" required>
              <select
                id="event-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Tags (Comma separated)"
              id="event-tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="AI, Cloud, React, Architecture"
            />
          </div>

          <FormField
            label="Short Summary"
            id="event-short-desc"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="A compelling 1-2 sentence hook for cards and previews..."
          />

          <FormField label="Full Description" id="event-desc" required error={errors.description}>
            <textarea
              id="event-desc"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="Detailed overview of schedule, key topics, workshops, and attendee expectations..."
            />
          </FormField>
        </div>

        {/* 2. Date, Time & Venue */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-surface-900 uppercase tracking-wider pb-2 border-b border-surface-100">
            2. Date, Time & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Event Date"
              id="event-date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              error={errors.date}
            />
            <FormField
              label="Start Time"
              id="event-start-time"
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
            <FormField
              label="End Time"
              id="event-end-time"
              type="time"
              required
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>

          {/* Virtual Toggle */}
          <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl border border-surface-200">
            <input
              type="checkbox"
              id="event-online"
              checked={formData.isOnline}
              onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
              className="rounded border-surface-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="event-online" className="text-xs font-semibold text-surface-800 cursor-pointer">
              This is an online / virtual event (Zoom, Teams, Google Meet)
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={formData.isOnline ? 'Platform / Online URL' : 'Venue Name'}
              id="event-location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              error={errors.location}
              placeholder={formData.isOnline ? 'Online (Zoom Meeting)' : 'Convention Center'}
            />
            <FormField
              label={formData.isOnline ? 'Meeting Password / Instructions' : 'Physical Street Address'}
              id="event-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={formData.isOnline ? 'Passcode provided on pass' : '123 Main St, City, Country'}
            />
          </div>
        </div>

        {/* 3. Capacity & Ticket Tiers */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-surface-900 uppercase tracking-wider pb-2 border-b border-surface-100">
            3. Capacity & Tickets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Total Capacity (Seats)"
              id="event-capacity"
              type="number"
              required
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              error={errors.capacity}
            />

            <FormField
              label="Base Ticket Price ($)"
              id="event-price"
              type="number"
              disabled={formData.isFree}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2.5 bg-surface-50 border border-surface-200 rounded-lg text-xs font-semibold text-surface-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                />
                <span>Free Admission</span>
              </label>
            </div>
          </div>

          {/* Ticket Tier List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-surface-700 uppercase">Ticket Tiers</span>
              <button
                type="button"
                onClick={addTicketType}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Tier
              </button>
            </div>

            {formData.ticketTypes?.map((ticket, idx) => (
              <div
                key={ticket.id || idx}
                className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl border border-surface-200"
              >
                <input
                  type="text"
                  value={ticket.name}
                  onChange={(e) => updateTicketTier(ticket.id, 'name', e.target.value)}
                  placeholder="Ticket Name"
                  className="flex-1 px-3 py-1.5 bg-white border border-surface-200 rounded-lg text-xs font-medium"
                />
                <div className="w-24">
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => updateTicketTier(ticket.id, 'price', Number(e.target.value))}
                    placeholder="Price ($)"
                    className="w-full px-3 py-1.5 bg-white border border-surface-200 rounded-lg text-xs font-medium"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={ticket.available}
                    onChange={(e) => updateTicketTier(ticket.id, 'available', Number(e.target.value))}
                    placeholder="Seats"
                    className="w-full px-3 py-1.5 bg-white border border-surface-200 rounded-lg text-xs font-medium"
                  />
                </div>
                {formData.ticketTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(ticket.id)}
                    className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Event Banner Artwork */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-surface-900 uppercase tracking-wider pb-2 border-b border-surface-100">
            4. Cover Image
          </h3>

          <FormField
            label="Image URL"
            id="event-image-url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />

          <div>
            <p className="text-xs text-surface-500 mb-2">Or select from curated presets:</p>
            <div className="grid grid-cols-5 gap-2">
              {presetImages.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData({ ...formData, image: imgUrl })}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    formData.image === imgUrl ? 'border-primary-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Preset cover" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom submit buttons */}
        <div className="pt-6 border-t border-surface-200 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/organizer/events')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={loading}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => handleSave('published')}
            loading={loading}
            icon={Save}
          >
            {isEditing ? 'Save Changes' : 'Publish Event'}
          </Button>
        </div>
      </div>
    </div>
  );
}
