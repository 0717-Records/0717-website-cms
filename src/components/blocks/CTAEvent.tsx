import React from 'react';
import { urlFor } from '@/sanity/lib/image';
import { formatEventDate, getEventLink, isEventPast } from '@/components/Events/eventUtils';
import EventImage from '@/components/Events/EventImage';
import { FaLocationDot } from 'react-icons/fa6';
import { maxCardWidth } from '@/utils/spacingConstants';

// Interface that matches the dereferenced event data from GROQ queries
interface DereferencedEvent {
  _id: string;
  title: string | null;
  shortDescription: string | null;
  venue: string | null;
  location: string | null;
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
    } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  tags?: string[] | null;
  link?: string | null;
  startDate: string;
  endDate?: string | null;
  timeDescription?: string | null;
  pastEventText: string | null;
  pastEventLinkBehavior: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
}

// Type for referenced (not dereferenced) event
interface ReferencedEvent {
  _ref: string;
  _type: 'reference';
}

interface CTAEventProps {
  event?: DereferencedEvent | ReferencedEvent | null;
  className?: string;
}

// Type guard to check if event is dereferenced
function isDereferencedEvent(
  event: DereferencedEvent | ReferencedEvent | null | undefined
): event is DereferencedEvent {
  return event !== null && event !== undefined && '_id' in event && 'title' in event;
}

const CTAEvent = ({ event, className = '' }: CTAEventProps) => {
  // Don't render if no event is selected or if it's not dereferenced
  if (!event || !isDereferencedEvent(event)) {
    return null;
  }

  const {
    title,
    // shortDescription,
    venue,
    location,
    image,
    tags,
    link,
    startDate,
    endDate,
    timeDescription,
    pastEventText,
    pastEventLinkBehavior,
    pastEventLink,
  } = event;

  // Don't render if essential data is missing
  if (!title || !location || !startDate) {
    return null;
  }

  const { dateDisplay, timeDisplay } = formatEventDate(startDate, endDate, timeDescription);
  const isPast = isEventPast(startDate, endDate);
  const eventLink = getEventLink({ link, isPast, pastEventLinkBehavior, pastEventLink });
  const hasLink = Boolean(eventLink);

  // Process image if provided
  let processedImage: string | null = null;
  if (image?.asset) {
    processedImage = urlFor(image.asset).width(362).height(512).url(); // A4 aspect ratio (724:1024 = 362:512)
  }

  const cardContent = (
    <div
      className={`mx-auto ${maxCardWidth} bg-white rounded-lg shadow-lg overflow-hidden flex flex-row gap-2 sm:gap-4 transition-all duration-300 ${
        hasLink ? 'group hover:shadow-xl hover:scale-103 cursor-pointer' : ''
      }`}>
      {/* Event Poster - Mobile layout always (1/3 width) */}
      <div className='relative w-2/5 md:w-1/4 aspect-[724/1024] bg-gray-900 overflow-hidden flex-shrink-0'>
        <EventImage
          image={processedImage}
          title={title}
          isPast={isPast}
          pastEventText={pastEventText}
          sizes='(max-width: 768px) 33vw, 200px'
          fallbackIconSize='text-body-3xl'
        />
      </div>

      {/* Event Details - Mobile layout (2/3 width) */}
      <div className='p-3 flex flex-col items-start text-left flex-grow w-2/3'>
        {/* Date / Time */}
        <div className='text-brand-secondary mb-2 text-body-xs sm:text-body-sm'>
          <span>{dateDisplay}</span>
          {timeDisplay && (
            <>
              <span className='mx-1'>•</span>
              <span>{timeDisplay}</span>
            </>
          )}
        </div>

        {/* Title */}
        <p
          className={`text-h7 sm:text-h6 font-medium mb-2 text-gray-800 transition-all duration-300 leading-tight ${
            hasLink ? 'group-hover:underline' : ''
          }`}>
          {title}
        </p>

        {/* Short Description - keeping for future if needed */}
        {/* {shortDescription && (
          <div className='text-text-subtle mb-2'>
            <div className='leading-snug'>{shortDescription}</div>
          </div>
        )} */}

        {/* Venue and Location */}
        <div className='flex items-center text-text-subtle mb-2 text-body-sm sm:text-body-base'>
          <FaLocationDot className='mr-1 md:mr-2 text-brand-secondary' />
          <span>{venue ? `${venue}, ${location}` : location}</span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap justify-start gap-2 mb-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='px-1 py-0.5 bg-gray-100 text-text-subtle text-body-xs sm:text-body-base rounded'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // If there's a link, wrap the entire card in an anchor tag
  if (hasLink && eventLink) {
    return (
      <div className={className}>
        <a
          href={eventLink}
          target='_blank'
          rel='noopener noreferrer'
          className='block w-full h-full text-inherit no-underline'
          aria-label={`View details for ${title} event`}>
          {cardContent}
        </a>
      </div>
    );
  }

  // If no link, return the card content directly
  return <div className={className}>{cardContent}</div>;
};

export default CTAEvent;
