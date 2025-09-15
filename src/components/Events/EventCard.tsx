import React, { useMemo } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { formatEventDate, getEventLink } from '@/components/Events/eventUtils';
import EventImage from '@/components/Events/EventImage';
import { generateEventSchema, generateStructuredDataScript, type EventData } from '@/lib/structuredData';

interface EventCardProps {
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
  isPast: boolean;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
}

const EventCard = (props: EventCardProps) => {
  const {
    title,
    shortDescription,
    venue,
    location,
    image,
    tags,
    startDate,
    endDate,
    timeDescription,
    pastEventText,
    isPast,
    generateSchema = false,
    baseUrl = 'https://0717records.com',
  } = props;

  const { dateDisplay, timeDisplay } = formatEventDate(startDate, endDate, timeDescription);
  const eventLink = getEventLink({
    link: props.link,
    isPast,
    pastEventLinkBehavior: props.pastEventLinkBehavior,
    pastEventLink: props.pastEventLink,
  });
  const hasLink = Boolean(eventLink);

  // Generate Event schema with location data
  const eventSchema = useMemo(() => {
    if (!generateSchema) return null;

    // Create organization data directly for events
    const organizationData = {
      name: '07:17 Records',
      url: baseUrl,
      description: 'Independent Record Label',
    };

    const eventData: EventData = {
      name: title,
      description: shortDescription || `Event at ${venue ? `${venue}, ${location}` : location}`,
      startDate: new Date(startDate).toISOString(),
      ...(endDate && { endDate: new Date(endDate).toISOString() }),
      location: {
        name: venue || location,
        address: venue ? `${venue}, ${location}` : location,
      },
      ...(image && { image }),
      url: eventLink || baseUrl,
      organizer: organizationData,
    };

    return generateEventSchema(eventData);
  }, [generateSchema, title, shortDescription, venue, location, startDate, endDate, image, eventLink, baseUrl]);

  const cardContent = (
    <div
      className={`w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-row md:flex-col transition-all duration-300 ${
        hasLink ? 'group hover:shadow-xl hover:scale-103 cursor-pointer' : ''
      }`}>
      {/* Event Poster */}
      <div className='relative w-1/3 md:w-full aspect-[724/1024] bg-gray-900 overflow-hidden flex-shrink-0'>
        <EventImage
          image={image}
          title={title}
          isPast={isPast}
          pastEventText={pastEventText}
          sizes='(max-width: 768px) 33vw, 400px'
          fallbackIconSize='text-body-3xl md:text-h2'
        />
      </div>
      {/* Event Details */}
      <div className='p-3 md:p-4 flex flex-col items-start md:items-center text-left md:text-center flex-grow w-2/3 md:w-full'>
        {/* Date / Time */}
        <div className='text-brand-secondary text-body-xs mb-2 md:mb-1'>
          <span>{dateDisplay}</span>
          {timeDisplay && (
            <>
              <span className='md:hidden mx-1'>•</span>
              <span className='md:hidden'>{timeDisplay}</span>
            </>
          )}
        </div>
        {timeDisplay && (
          <div className='hidden md:block text-body-xs text-brand-secondary mb-3'>
            {timeDisplay}
          </div>
        )}

        {/* Title */}
        <p
          className={`text-h7 font-medium mb-2 md:mb-3 text-gray-800 transition-all duration-300 leading-tight ${
            hasLink ? 'group-hover:underline' : ''
          }`}>
          {title}
        </p>

        {/* Short Description - keeping for future if needed */}
        {/* {shortDescription && (
          <div className=' text-text-subtle text-body-sm mb-2 md:mb-3'>
            <div className='leading-snug'>{shortDescription}</div>
          </div>
        )} */}

        {/* Venue and Location */}
        <div className='flex items-center text-body-sm text-text-subtle mb-2 md:mb-3'>
          <FaLocationDot className='mr-1 md:mr-2 text-brand-secondary' />
          <span>{venue ? `${venue}, ${location}` : location}</span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap justify-start md:justify-center gap-1 md:gap-2 mb-2 md:mb-4'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='px-1 py-0.5 md:px-2 md:py-1 bg-gray-100 text-text-subtle text-body-xs rounded'>
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
      <>
        {/* Event Schema Markup */}
        {eventSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={generateStructuredDataScript(eventSchema)}
          />
        )}
        <a
          href={eventLink}
          target='_blank'
          rel='noopener noreferrer'
          className='block w-full h-full text-inherit no-underline'
          aria-label={`View details for ${title} event`}>
          {cardContent}
        </a>
      </>
    );
  }

  // If no link, return the card content directly
  return (
    <>
      {/* Event Schema Markup */}
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredDataScript(eventSchema)}
        />
      )}
      {cardContent}
    </>
  );
};

export default EventCard;
