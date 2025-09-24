import React, { useState } from 'react';
import EventCard from '../Events/EventCard';
import EventImage from '../Events/EventImage';
import EventModal from '../Events/EventModal';
import EventHelpCTA from '../Events/EventHelpCTA';
import CTA from '../UI/CTA';
import { transformEvents } from '@/utils/transformEvents';
import { createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { EVENTS_QUERYResult } from '@/sanity/types';
import type { TransformedEvent } from '@/utils/transformEvents';

interface CTAEventsProps {
  events?: EVENTS_QUERYResult;
  allEvents?: EVENTS_QUERYResult; // For automatic mode
  eventListType?: 'automatic' | 'manual';
  displayStyle: 'posterOnly' | 'detailed';
  showCTA?: boolean;
  ctaMessage?: string;
  rowSize?: 'small' | 'large';
  hideViewAllButton?: boolean;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
}

function isEventPast(event: { startDate: string; endDate?: string | null }): boolean {
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

const CTAEvents = ({
  events,
  allEvents,
  eventListType = 'manual',
  displayStyle,
  showCTA = false,
  ctaMessage,
  rowSize = 'large',
  hideViewAllButton = false,
  generateSchema = false,
  baseUrl,
}: CTAEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<TransformedEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sanity Live Editing configuration
  const { projectId, dataset, stega } = client.config();
  const createDataAttributeConfig = {
    projectId,
    dataset,
    baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
  };
  // Determine which events to use based on eventListType
  let eventsToUse: EVENTS_QUERYResult = [];

  if (eventListType === 'manual') {
    eventsToUse = events || [];
  } else if (eventListType === 'automatic' && allEvents) {
    // Calculate how many events to show based on row size (small=4, large=3)
    const maxEvents = rowSize === 'small' ? 4 : 3;
    const eventsToShow = showCTA ? maxEvents - 1 : maxEvents;

    // Sort all events by date (latest/furthest in future first, then go backwards in time)
    const sortedByDate = [...allEvents].sort((a, b) => {
      const dateA = new Date(a.startDate || '').getTime();
      const dateB = new Date(b.startDate || '').getTime();
      return dateB - dateA; // Most recent/future first
    });

    // Take the first N events
    eventsToUse = sortedByDate.slice(0, eventsToShow);
  }

  // Transform Sanity data to EventCard format
  const transformedEvents = transformEvents(eventsToUse);

  // For manual mode, sort events by their order in the array (as set by editor)
  // For automatic mode, events are already sorted by date
  const sortedEvents =
    eventListType === 'manual'
      ? transformedEvents // Keep editor's order for manual selection
      : [...transformedEvents].sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateB - dateA; // Most recent/future first for automatic
        });

  // Calculate grid classes based on row size (small=4 items, large=3 items)
  const gridClasses =
    rowSize === 'small'
      ? `${displayStyle === 'posterOnly' ? 'w-full xs:w-[calc((100%-1rem)/2)]' : 'w-full sm:w-[calc((100%-1rem)/2)]'}  lg:w-[calc((100%-3*1rem)/4)]` // Small row size: 4 items per row on large screens
      : `${displayStyle === 'posterOnly' ? 'w-full xs:w-[calc((100%-1rem)/2)]' : 'w-full sm:w-[calc((100%-1rem)/2)]'} md:w-[calc((100%-2*1rem)/3)]`; // Large row size: 3 items per row on large screens

  if (sortedEvents.length === 0 && !showCTA) {
    return (
      <div className='text-center py-16'>
        <div className='text-gray-400 text-h2 mb-4'>🎭</div>
        <p className='text-gray-500 text-body-lg'>No events at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex flex-wrap justify-center gap-4'>
        {/* Render event cards */}
        {sortedEvents.map((event, index: number) => {
          const isPast = isEventPast(event);
          const handlePosterClick = () => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          };

          return (
            <div key={`${event.title}-${index}`} className={`${gridClasses} flex`}>
              {displayStyle === 'posterOnly' ? (
                // Poster Only Style - Just the image, always clickable to open modal
                <div
                  className={`w-full h-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-103 cursor-pointer`}
                  onClick={handlePosterClick}>
                  <div
                    className='relative w-full aspect-[724/1024] bg-gray-900 overflow-hidden'
                    {...{
                      'data-sanity': createDataAttribute({
                        ...createDataAttributeConfig,
                        id: event._id,
                        type: 'event',
                        path: 'image',
                      }).toString(),
                    }}>
                    <EventImage
                      image={event.image}
                      title={event.title}
                      isPast={isPast}
                      pastEventText={event.pastEventText}
                      sizes='(max-width: 768px) 100vw, 400px'
                      fallbackIconSize='text-h2'
                    />
                  </div>
                </div>
              ) : (
                // Detailed Style - Full event card
                <EventCard
                  {...event}
                  isPast={isPast}
                  generateSchema={generateSchema}
                  baseUrl={baseUrl}
                  documentId={event._id}
                  documentType='event'
                  fieldPathPrefix=''
                />
              )}
            </div>
          );
        })}

        {/* CTA Item - appears at the end of the events list */}
        {showCTA && ctaMessage && (
          <EventHelpCTA
            message={ctaMessage}
            displayStyle={displayStyle}
            rowSize={rowSize}
            gridClasses={gridClasses}
          />
        )}
      </div>

      {/* CTA Link to view all events */}
      {!hideViewAllButton && (
        <div className='flex justify-center mt-8'>
          <CTA href='/events' variant='outline'>
            View all events
          </CTA>
        </div>
      )}

      {/* Event Modal - for poster-only events */}
      {selectedEvent && (
        <EventModal
          isModalOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          title={selectedEvent.title}
          image={selectedEvent.image}
          link={selectedEvent.link}
          linkLabel={selectedEvent.linkLabel}
          isPast={isEventPast(selectedEvent)}
          pastEventText={selectedEvent.pastEventText}
          pastEventLinkBehavior={selectedEvent.pastEventLinkBehavior}
          pastEventLink={selectedEvent.pastEventLink}
          pastEventLinkLabel={selectedEvent.pastEventLinkLabel}
        />
      )}
    </div>
  );
};

export default CTAEvents;
