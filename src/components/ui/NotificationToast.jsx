import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationToast() {
  const { notifications } = useApp();

  if (!notifications || notifications.length === 0) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-success-500 shrink-0" />,
    error: <AlertCircle size={18} className="text-danger-500 shrink-0" />,
    info: <Info size={18} className="text-primary-500 shrink-0" />,
  };

  const borderColors = {
    success: 'border-success-200 bg-white',
    error: 'border-danger-200 bg-white',
    info: 'border-primary-200 bg-white',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-center gap-3 transition-all duration-300 transform translate-y-0 ${
            borderColors[n.type] || borderColors.info
          }`}
        >
          {icons[n.type] || icons.info}
          <p className="text-sm font-medium text-surface-800 flex-1">{n.message}</p>
        </div>
      ))}
    </div>
  );
}
