import React from 'react';
import EventCard from '../Events/EventCard';
import EventImage from '../Events/EventImage';
import CTA from '../UI/CTA';
import CTAEmailButton from '../UI/CTAEmailButton';
import { transformEvents } from '@/utils/transformEvents';
import { getEventLink } from '../Events/eventUtils';
import type { EVENTS_QUERYResult } from '@/sanity/types';

interface EventBlockProps {
  events: EVENTS_QUERYResult;
  displayStyle: 'posterOnly' | 'detailed';
  showCTA?: boolean;
  ctaMessage?: string;
  itemsPerRow?: '3' | '4';
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

const EventBlock = ({
  events,
  displayStyle,
  showCTA = false,
  ctaMessage,
  itemsPerRow = '3',
  generateSchema = false,
  baseUrl,
}: EventBlockProps) => {
  // Transform Sanity data to EventCard format
  const transformedEvents = transformEvents(events);

  // Sort events by startDate (most recent first)
  const sortedEvents = [...transformedEvents].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  // Calculate grid classes based on itemsPerRow
  const gridClasses =
    itemsPerRow === '4'
      ? 'w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3*1.5rem)/4)]' // 4 items per row on large screens
      : 'w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-2*1.5rem)/3)]'; // 3 items per row on large screens

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
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6'>
        {/* Render event cards */}
        {sortedEvents.map((event, index: number) => {
          const isPast = isEventPast(event);
          const eventLink = getEventLink({
            link: event.link,
            isPast,
            pastEventLinkBehavior: event.pastEventLinkBehavior,
            pastEventLink: event.pastEventLink,
          });
          const hasLink = Boolean(eventLink);

          return (
            <div key={`${event.title}-${index}`} className={`${gridClasses} flex`}>
              {displayStyle === 'posterOnly' ? (
                // Poster Only Style - Just the image, clickable if has link
                <div
                  className={`w-full h-full bg-white rounded-lg shadow-lg overflow-hidden ${
                    hasLink
                      ? 'transition-all duration-300 hover:shadow-xl hover:scale-103 cursor-pointer'
                      : ''
                  }`}>
                  <div className='relative w-full aspect-[724/1024] bg-gray-900 overflow-hidden'>
                    {hasLink && eventLink ? (
                      <a
                        href={eventLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-full h-full text-inherit no-underline'
                        aria-label={`View details for ${event.title} event`}>
                        <EventImage
                          image={event.image}
                          title={event.title}
                          isPast={isPast}
                          pastEventText={event.pastEventText}
                          sizes='(max-width: 768px) 100vw, 400px'
                          fallbackIconSize='text-h2'
                        />
                      </a>
                    ) : (
                      <EventImage
                        image={event.image}
                        title={event.title}
                        isPast={isPast}
                        pastEventText={event.pastEventText}
                        sizes='(max-width: 768px) 100vw, 400px'
                        fallbackIconSize='text-h2'
                      />
                    )}
                  </div>
                </div>
              ) : (
                // Detailed Style - Full event card
                <EventCard
                  {...event}
                  isPast={isPast}
                  generateSchema={generateSchema}
                  baseUrl={baseUrl}
                />
              )}
            </div>
          );
        })}

        {/* CTA Item - appears at the end of the events list */}
        {showCTA && ctaMessage && (
          <div className={`${gridClasses} flex`}>
            <div className='w-full h-full bg-white rounded-lg shadow-lg overflow-hidden'>
              {displayStyle === 'posterOnly' ? (
                // Poster Only CTA Style
                <div className='relative w-full aspect-[724/1024] bg-card-gradient overflow-hidden flex flex-col items-center justify-center p-4 text-center'>
                  <div className='text-9xl md:text-body-8xl mb-4'>🎭</div>
                  <p
                    className={`${itemsPerRow === '4' ? 'text-body-base' : 'text-body-xl'} text-gray-700 mb-6 max-w-xs leading-relaxed whitespace-pre-line`}>
                    {ctaMessage}
                  </p>
                  <CTAEmailButton
                    className='flex-shrink-0'
                    textClasses='text-body-base md:text-body-sm'
                  />
                </div>
              ) : (
                // Detailed CTA Style
                <div className='flex flex-row md:flex-col h-full'>
                  {/* CTA "Poster" area */}
                  <div className='relative w-1/3 md:w-full aspect-[724/1024] bg-card-gradient overflow-hidden flex items-center justify-center flex-shrink-0'>
                    <div className='text-body-8xl'>🎭</div>
                  </div>
                  {/* CTA Content area */}
                  <div className='p-3 md:p-4 flex flex-col items-start md:items-center text-left md:text-center justify-center flex-grow w-2/3 md:w-full'>
                    <p
                      className={`text-body-lg text-gray-700 mb-6 leading-relaxed whitespace-pre-line`}>
                      {ctaMessage}
                    </p>
                    <CTAEmailButton textClasses='text-body-base md:text-body-sm' />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA Link to view all events */}
      <div className='flex justify-center mt-8'>
        <CTA href='/events' variant='outline'>
          View all events
        </CTA>
      </div>
    </div>
  );
};

export default EventBlock;
