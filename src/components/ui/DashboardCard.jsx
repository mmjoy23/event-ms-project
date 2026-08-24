import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
  className,
}) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div
      className={cn(
        'bg-white p-6 rounded-2xl border border-surface-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
            {title}
          </p>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-surface-900 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center border', colorMap[color] || colorMap.primary)}>
            <Icon size={22} />
          </div>
        )}
      </div>

      {(subtitle || trendValue) && (
        <div className="mt-4 pt-3 border-t border-surface-100 flex items-center gap-2 text-xs">
          {trendValue && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-bold',
                trend === 'up' ? 'text-success-600' : 'text-danger-500'
              )}
            >
              {trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {trendValue}
            </span>
          )}
          {subtitle && <span className="text-surface-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
