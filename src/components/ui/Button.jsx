import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300',
  secondary: 'bg-surface-100 text-surface-700 hover:bg-surface-200 focus:ring-surface-300',
  outline: 'border-2 border-surface-300 text-surface-700 hover:bg-surface-50 focus:ring-surface-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-300',
  success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-300',
  ghost: 'text-surface-600 hover:bg-surface-100 focus:ring-surface-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
  xl: 'px-8 py-3 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', className, disabled, loading, icon: Icon, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </button>
  );
}
