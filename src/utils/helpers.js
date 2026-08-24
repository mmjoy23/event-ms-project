export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateShort = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateRange = (startDate, endDate) => {
  if (startDate === endDate) return formatDate(startDate);
  return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}, ${new Date(endDate + 'T00:00:00').getFullYear()}`;
};

export const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
};

export const getSeatsInfo = (capacity, registered) => {
  const available = capacity - registered;
  const percentage = (registered / capacity) * 100;
  let status = 'available';
  if (available <= 0) status = 'full';
  else if (percentage >= 90) status = 'almost-full';
  else if (percentage >= 70) status = 'filling';
  return { available, percentage, status };
};

export const generateRegistrationId = () => {
  return 'REG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const truncateText = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

export const isEventPast = (dateStr) => {
  return new Date(dateStr) < new Date();
};

export const isEventUpcoming = (dateStr) => {
  return new Date(dateStr) >= new Date();
};

export const daysUntil = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
