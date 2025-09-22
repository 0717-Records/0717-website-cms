import React from 'react';
import EventCard from './EventCard';
import EventHelpCTA from './EventHelpCTA';
import type { TransformedEvent } from '@/utils/transformEvents';

interface EventListProps {
  events: TransformedEvent[];
  filter: 'all' | 'upcoming' | 'past';
  limit?: number;
  noEventsText: string;
  // Event Help CTA props
  showEventHelpCTA?: boolean;
  eventHelpCTAMessage?: string;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
}

function isEventPast(event: TransformedEvent): boolean {
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

const EventList = ({
  events,
  filter,
  limit,
  noEventsText,
  showEventHelpCTA = false,
  eventHelpCTAMessage,
  generateSchema = false,
  baseUrl,
}: EventListProps) => {
  // Filter events based on the filter prop
  let filteredEvents: TransformedEvent[] = [];

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
      <>
        <div className='text-center'>
          <p className='text-gray-500 text-body-lg'>{noEventsText}</p>
        </div>

        {/* Show Event Help CTA for upcoming events when there are no events */}
        {filter === 'upcoming' && showEventHelpCTA && eventHelpCTAMessage && (
          <div className='flex justify-center mt-8'>
            <div className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex'>
              <EventHelpCTA
                message={eventHelpCTAMessage}
                displayStyle='detailed'
                gridClasses='w-full'
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className='flex flex-wrap justify-center gap-4 md:gap-8'>
        {filteredEvents.map((event, index: number) => (
          <div
            key={`${filter}-${event.title}-${index}`}
            className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex'>
            <EventCard
              {...event}
              isPast={isEventPast(event)}
              generateSchema={generateSchema}
              baseUrl={baseUrl}
              documentId={event._id}
              documentType="event"
              fieldPathPrefix=""
            />
          </div>
        ))}

        {/* Show Event Help CTA for upcoming events at the end of the list */}
        {filter === 'upcoming' &&
          showEventHelpCTA &&
          eventHelpCTAMessage &&
          filteredEvents.length > 0 && (
            <div className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex'>
              <EventHelpCTA
                message={eventHelpCTAMessage}
                displayStyle='detailed'
                gridClasses='w-full'
              />
            </div>
          )}
      </div>
    </>
  );
};

export default EventList;
