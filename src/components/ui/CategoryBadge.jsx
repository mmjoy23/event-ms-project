import { cn } from '../../utils/helpers';
import { categories } from '../../data/mockData';

export default function CategoryBadge({ categoryId, categoryName, className, icon }) {
  const cat = categories.find(c => c.id === categoryId);
  const name = categoryName || cat?.name || categoryId;
  const colorClass = cat?.color || 'bg-surface-100 text-surface-700';
  const displayIcon = icon !== undefined ? icon : cat?.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-transform duration-150',
        colorClass,
        className
      )}
    >
      {displayIcon && <span>{displayIcon}</span>}
      <span>{name}</span>
    </span>
  );
}
