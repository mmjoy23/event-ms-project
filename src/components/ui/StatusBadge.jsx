import { cn } from '../../utils/helpers';

const statusConfig = {
  confirmed: { label: 'Confirmed', classes: 'bg-success-50 text-success-600 ring-success-500/20' },
  pending: { label: 'Pending', classes: 'bg-warning-50 text-warning-600 ring-warning-500/20' },
  cancelled: { label: 'Cancelled', classes: 'bg-danger-50 text-danger-500 ring-danger-500/20' },
  published: { label: 'Published', classes: 'bg-success-50 text-success-600 ring-success-500/20' },
  draft: { label: 'Draft', classes: 'bg-surface-100 text-surface-600 ring-surface-500/20' },
  full: { label: 'Sold Out', classes: 'bg-danger-50 text-danger-500 ring-danger-500/20' },
  'almost-full': { label: 'Almost Full', classes: 'bg-warning-50 text-warning-600 ring-warning-500/20' },
  available: { label: 'Available', classes: 'bg-success-50 text-success-600 ring-success-500/20' },
  filling: { label: 'Filling Fast', classes: 'bg-amber-50 text-amber-700 ring-amber-500/20' },
  free: { label: 'Free', classes: 'bg-primary-50 text-primary-600 ring-primary-500/20' },
  online: { label: 'Online', classes: 'bg-indigo-50 text-indigo-600 ring-indigo-500/20' },
};

export default function StatusBadge({ status, className }) {
  const config = statusConfig[status] || { label: status, classes: 'bg-surface-100 text-surface-600 ring-surface-500/20' };
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
      config.classes,
      className
    )}>
      {config.label}
    </span>
  );
}
