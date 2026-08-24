import EventCard from './EventCard';

export default function EventGrid({ events, onQuickRegister, columns = 3 }) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[columns] || colClasses[3]} gap-6`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onQuickRegister={onQuickRegister} />
      ))}
    </div>
  );
}
