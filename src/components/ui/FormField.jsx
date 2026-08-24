import { cn } from '../../utils/helpers';

export default function FormField({ label, id, error, required, className, children, ...props }) {
  // If children is passed, render custom content (select, textarea, etc.)
  if (children) {
    return (
      <div className={cn('space-y-1.5', className)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-surface-700">
            {label}{required && <span className="text-danger-500 ml-0.5">*</span>}
          </label>
        )}
        {children}
        {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700">
          {label}{required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500',
          error ? 'border-danger-500 bg-danger-50' : 'border-surface-300 bg-white hover:border-surface-400'
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
    </div>
  );
}
