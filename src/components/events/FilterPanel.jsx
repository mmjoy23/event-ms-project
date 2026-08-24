import { Filter, RotateCcw } from 'lucide-react';
import { categories } from '../../data/mockData';

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  priceFilter,
  onSelectPrice,
  typeFilter,
  onSelectType,
  dateFilter,
  onSelectDate,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-100">
        <div className="flex items-center gap-2 text-surface-900 font-bold text-sm">
          <Filter size={16} className="text-primary-600" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2.5">
          Categories
        </label>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-primary-50 text-primary-700 font-semibold'
                : 'text-surface-600 hover:bg-surface-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                selectedCategory === cat.id
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-surface-600 hover:bg-surface-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Format / Type Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2.5">
          Event Format
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'in-person', label: 'In-Person' },
            { id: 'online', label: 'Virtual' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                typeFilter === type.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                  : 'bg-surface-50 text-surface-600 border-surface-200 hover:bg-surface-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2.5">
          Pricing
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'free', label: 'Free' },
            { id: 'paid', label: 'Paid' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectPrice(item.id)}
              className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                priceFilter === item.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                  : 'bg-surface-50 text-surface-600 border-surface-200 hover:bg-surface-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Timing Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2.5">
          Timing
        </label>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'Anytime' },
            { id: 'this-month', label: 'This Month' },
            { id: 'next-month', label: 'Upcoming Months' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDate(d.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                dateFilter === d.id
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-surface-600 hover:bg-surface-50'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
