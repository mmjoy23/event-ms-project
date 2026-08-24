export default function LoadingState({ count = 3, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-surface-200 overflow-hidden animate-pulse">
            <div className="h-48 bg-surface-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-surface-200 rounded-md w-1/3" />
              <div className="h-6 bg-surface-200 rounded-md w-3/4" />
              <div className="h-4 bg-surface-100 rounded-md w-full" />
              <div className="h-4 bg-surface-100 rounded-md w-2/3" />
              <div className="pt-4 border-t border-surface-100 flex justify-between items-center">
                <div className="h-4 bg-surface-200 rounded-md w-1/4" />
                <div className="h-8 bg-surface-200 rounded-lg w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 bg-surface-100 rounded-xl border border-surface-200" />
      ))}
    </div>
  );
}
