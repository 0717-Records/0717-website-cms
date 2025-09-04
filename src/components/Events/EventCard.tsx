import React from 'react';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { formatEventDate, getEventLink } from '@/components/Events/eventUtils';
import PastEventOverlay from '@/components/Events/PastEventOverlay';

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
  } = props;

  const { dateDisplay, timeDisplay } = formatEventDate(startDate, endDate, timeDescription);
  const eventLink = getEventLink({
    link: props.link,
    isPast,
    pastEventLinkBehavior: props.pastEventLinkBehavior,
    pastEventLink: props.pastEventLink,
  });
  const hasLink = Boolean(eventLink);

  const cardContent = (
    <div
      className={`w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-row md:flex-col transition-all duration-300 ${
        hasLink ? 'group hover:shadow-xl hover:scale-103 cursor-pointer' : ''
      }`}>
      {/* Event Poster */}
      <div className='relative w-1/3 md:w-full aspect-[3/4] bg-gray-900 overflow-hidden flex-shrink-0'>
        {image ? (
          <>
            <Image
              src={image}
              alt={`${title} event poster`}
              fill
              sizes='(max-width: 768px) 33vw, 400px'
              className={`object-cover transition-all duration-300 ${isPast ? 'brightness-50' : ''}`}
              priority
            />
            {isPast && <PastEventOverlay text={pastEventText} />}
          </>
        ) : (
          <div className='w-full h-full relative'>
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${isPast ? 'brightness-50' : ''}`}>
              <div className='text-center text-white/70'>
                <div className='text-body-3xl md:text-h2 mb-1 md:mb-2'>🎭</div>
              </div>
            </div>
            {isPast && <PastEventOverlay text={pastEventText} />}
          </div>
        )}
      </div>
      {/* Event Details */}
      <div className='p-3 md:p-4 flex flex-col items-start md:items-center text-left md:text-center flex-grow w-2/3 md:w-full'>
        {/* Date / Time */}
        <div className='text-brand-secondary mb-2 md:mb-1'>
          <span>{dateDisplay}</span>
          {timeDisplay && (
            <>
              <span className='md:hidden mx-1'>•</span>
              <span className='md:hidden'>{timeDisplay}</span>
            </>
          )}
        </div>
        {timeDisplay && (
          <div className='hidden md:block text-brand-secondary mb-3 text-body-base'>
            {timeDisplay}
          </div>
        )}

        {/* Title */}
        <p
          className={`text-h6 font-medium mb-2 md:mb-3 text-gray-800 transition-all duration-300 leading-tight ${
            hasLink ? 'group-hover:underline' : ''
          }`}>
          {title}
        </p>

        {/* Short Description */}
        {shortDescription && (
          <div className=' text-text-subtle mb-2 md:mb-3'>
            <div className='leading-snug'>{shortDescription}</div>
          </div>
        )}

        {/* Venue and Location */}
        <div className='flex items-center text-text-subtle mb-2 md:mb-3'>
          <FaLocationDot className='mr-1 md:mr-2 text-brand-secondary' />
          <span>{venue ? `${venue}, ${location}` : location}</span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap justify-start md:justify-center gap-1 md:gap-2 mb-2 md:mb-4'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='px-1 py-0.5 md:px-2 md:py-1 bg-gray-100 text-text-subtle text-body-sm rounded'>
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
      <a
        href={eventLink}
        target='_blank'
        rel='noopener noreferrer'
        className='block w-full h-full text-inherit no-underline'
        aria-label={`View details for ${title} event`}>
        {cardContent}
      </a>
    );
  }

  // If no link, return the card content directly
  return cardContent;
};

export default EventCard;
