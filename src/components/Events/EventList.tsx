import React from 'react';
import EventCard from './EventCard';

interface Event {
  title: string;
  shortDescription?: string | null;
  venue?: string | null;
  location: string;
  image?: string | null;
  tags?: string[] | null;
  link?: string | null;
  startDate: string;
  endDate?: string | null;
  timeDescription?: string | null;
  pastEventText: string;
  pastEventLinkBehavior: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
}

interface EventListProps {
  events: Event[];
  filter: 'all' | 'upcoming' | 'past';
  limit?: number;
  noEventsText: string;
}

function isEventPast(event: Event): boolean {
  // Get current date/time in New Zealand timezone
  const nowInNZ = new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Auckland' }));

  // Create event end date (or start date if no end date)
  const eventDateString = event.endDate || event.startDate;
  const eventDate = new Date(eventDateString + 'T00:00:00'); // Ensure consistent parsing

  // Event is considered past at midnight NZ time the day after it ends
  const dayAfterEvent = new Date(eventDate);
  dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);
  dayAfterEvent.setHours(0, 0, 0, 0);

  return nowInNZ >= dayAfterEvent;
}

const EventList = ({ events, filter, limit, noEventsText }: EventListProps) => {
  // Filter events based on the filter prop
  let filteredEvents: Event[] = [];

  switch (filter) {
    case 'upcoming':
      filteredEvents = events.filter((event) => !isEventPast(event));
      break;
    case 'past':
      filteredEvents = events.filter((event) => isEventPast(event));
      break;
    case 'all':
    default:
      filteredEvents = [...events];
      break;
  }

  // Sort events by startDate based on filter type
  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();

    if (filter === 'upcoming') {
      // Upcoming events: earliest first (soonest events first)
      return dateA - dateB;
    } else {
      // Past events and 'all': latest first (most recent first)
      return dateB - dateA;
    }
  });

  // Apply limit if provided
  if (limit && limit > 0) {
    filteredEvents = filteredEvents.slice(0, limit);
  }

  if (filteredEvents.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='text-gray-400 text-h2 mb-4'>🎭</div>
        <p className='text-gray-500 text-body-lg'>{noEventsText}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 md:gap-8'>
      {filteredEvents.map((event, index: number) => (
        <div
          key={`${filter}-${event.title}-${index}`}
          className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex'>
          <EventCard {...event} isPast={isEventPast(event)} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
