import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/events/SearchBar';
import FilterPanel from '../components/events/FilterPanel';
import EventGrid from '../components/events/EventGrid';
import EmptyState from '../components/ui/EmptyState';
import RegistrationModal from '../components/events/RegistrationModal';

export default function BrowseEventsPage() {
  const { events } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [registeringEvent, setRegisteringEvent] = useState(null);

  // Sync state if URL query params change
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) setSelectedCategory(urlCategory);
    const urlSearch = searchParams.get('search');
    if (urlSearch) setSearchQuery(urlSearch);
  }, [searchParams]);

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Status check
        if (event.status !== 'published') return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchDesc = (event.description || '').toLowerCase().includes(q);
          const matchLoc = (event.location || '').toLowerCase().includes(q);
          const matchOrg = (event.organizer || '').toLowerCase().includes(q);
          const matchTags = (event.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchLoc && !matchOrg && !matchTags) return false;
        }

        // Category
        if (selectedCategory !== 'all' && event.category !== selectedCategory) {
          return false;
        }

        // Price
        if (priceFilter === 'free' && !event.isFree) return false;
        if (priceFilter === 'paid' && event.isFree) return false;

        // Format
        if (typeFilter === 'online' && !event.isOnline) return false;
        if (typeFilter === 'in-person' && event.isOnline) return false;

        // Date Filter
        if (dateFilter === 'this-month') {
          const eventDate = new Date(event.date);
          const now = new Date();
          if (
            eventDate.getMonth() !== now.getMonth() ||
            eventDate.getFullYear() !== now.getFullYear()
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'popular') return b.registered - a.registered;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [events, searchQuery, selectedCategory, priceFilter, typeFilter, dateFilter, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    priceFilter !== 'all' ||
    typeFilter !== 'all' ||
    dateFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceFilter('all');
    setTypeFilter('all');
    setDateFilter('all');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Page Title & Search Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-extrabold text-surface-900">Explore Events</h1>
          <p className="text-sm text-surface-500 mt-1">
            Discover workshops, conferences, and meetups happening soon.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-surface-200 rounded-xl text-sm font-semibold text-surface-700 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal size={16} /> Filters {hasActiveFilters && '(Active)'}
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterPanel
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceFilter={priceFilter}
            onSelectPrice={setPriceFilter}
            typeFilter={typeFilter}
            onSelectType={setTypeFilter}
            dateFilter={dateFilter}
            onSelectDate={setDateFilter}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Mobile Filter Drawer / Toggle */}
        {showMobileFilters && (
          <div className="lg:hidden bg-white p-4 rounded-2xl border border-surface-200 shadow-lg mb-4">
            <FilterPanel
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setShowMobileFilters(false);
              }}
              priceFilter={priceFilter}
              onSelectPrice={(p) => {
                setPriceFilter(p);
                setShowMobileFilters(false);
              }}
              typeFilter={typeFilter}
              onSelectType={(t) => {
                setTypeFilter(t);
                setShowMobileFilters(false);
              }}
              dateFilter={dateFilter}
              onSelectDate={(d) => {
                setDateFilter(d);
                setShowMobileFilters(false);
              }}
              onResetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Subheader: Count & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-200">
            <div className="text-sm font-medium text-surface-600">
              Showing <span className="font-bold text-surface-900">{filteredEvents.length}</span> {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-surface-600">
              <ArrowUpDown size={14} />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-surface-200 rounded-lg px-2.5 py-1.5 text-xs text-surface-800 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
              >
                <option value="date-asc">Date (Earliest First)</option>
                <option value="date-desc">Date (Latest First)</option>
                <option value="popular">Most Popular</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Events Grid or Empty State */}
          {filteredEvents.length > 0 ? (
            <EventGrid
              events={filteredEvents}
              onQuickRegister={(evt) => setRegisteringEvent(evt)}
              columns={3}
            />
          ) : (
            <EmptyState
              title="No events match your criteria"
              description="Try changing your search terms or clearing some filters to explore more upcoming events."
              icon="search"
              actionLabel="Clear all filters"
              onAction={resetFilters}
            />
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {registeringEvent && (
        <RegistrationModal
          isOpen={!!registeringEvent}
          onClose={() => setRegisteringEvent(null)}
          event={registeringEvent}
        />
      )}
    </div>
  );
}
