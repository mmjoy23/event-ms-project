import { CalendarX, Search, Ticket, Users } from 'lucide-react';
import Button from './Button';

const iconMap = {
  events: CalendarX,
  search: Search,
  tickets: Ticket,
  users: Users,
};

export default function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  icon = 'search',
  actionLabel,
  onAction,
}) {
  const IconComponent = iconMap[icon] || Search;

  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-surface-300">
      <div className="w-16 h-16 bg-surface-100 text-surface-400 rounded-full flex items-center justify-center mb-4">
        <IconComponent size={32} />
      </div>
      <h3 className="text-lg font-bold text-surface-800 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
