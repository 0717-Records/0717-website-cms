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
  const nowInNZ = new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' });
  const today = new Date(nowInNZ);
  today.setHours(0, 0, 0, 0);

  const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);

  // Event is considered past the day after it ends
  const dayAfterEvent = new Date(eventEndDate);
  dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);

  return today >= dayAfterEvent;
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

  // Sort events by startDate (latest first)
  filteredEvents.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  // Apply limit if provided
  if (limit && limit > 0) {
    filteredEvents = filteredEvents.slice(0, limit);
  }

  if (filteredEvents.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='text-gray-400 text-6xl mb-4'>🎭</div>
        <p className='text-gray-500 text-lg'>{noEventsText}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 md:gap-8'>
      {filteredEvents.map((event, index: number) => (
        <div
          key={`${filter}-${event.title}-${index}`}
          className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-sm flex'>
          <EventCard {...event} isPast={isEventPast(event)} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
