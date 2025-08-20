import React from 'react';
import CTA from '../UI/CTA';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

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

function formatEventDate(
  startDate: string,
  endDate?: string | null,
  timeDescription?: string | null
): { dateDisplay: string; timeDisplay: string } {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  let dateDisplay = startFormatted;

  if (endDate) {
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-AU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();

    if (startFormatted !== endFormatted) {
      dateDisplay = `${startFormatted} - ${endFormatted}`;
    }
  }

  const timeDisplay = timeDescription || '';

  return { dateDisplay, timeDisplay };
}

function getEventLink(event: EventCardProps): string | null {
  if (event.isPast) {
    switch (event.pastEventLinkBehavior) {
      case 'remove':
        return null;
      case 'change':
        return event.pastEventLink || null;
      case 'keep':
      default:
        return event.link || null;
    }
  }
  return event.link || null;
}

const PastEventOverlay = ({ text }: { text: string }) => (
  <div className='absolute inset-0 flex items-center justify-center z-10'>
    <div className='text-center text-white font-bold text-body-lg leading-tight px-4'>
      {text.split('\n').map((line, index) => (
        <div key={index} className='drop-shadow-lg'>
          {line}
        </div>
      ))}
    </div>
  </div>
);

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
  const eventLink = getEventLink(props);

  return (
    <div className='w-full h-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col'>
      {/* Event Poster */}
      <div className='relative aspect-[3/4] bg-gray-900 overflow-hidden'>
        {image ? (
          <>
            <Image
              src={image}
              alt={`${title} event poster`}
              fill
              sizes='(max-width: 640px) 100vw, 400px'
              className={`object-cover transition-all duration-300 ${isPast ? 'brightness-50' : ''}`}
              priority
            />
            {isPast && <PastEventOverlay text={pastEventText} />}
          </>
        ) : (
          <div className='w-full h-full relative'>
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${isPast ? 'brightness-50' : ''}`}>
              <div className='text-center text-white/70'>
                <div className='text-6xl mb-2'>🎭</div>
              </div>
            </div>
            {isPast && <PastEventOverlay text={pastEventText} />}
          </div>
        )}
      </div>
      {/* Event Details */}
      <div className='p-4 flex flex-col flex-grow'>
        {/* Date / Time */}
        <div className='text-brand-secondary font-semibold mb-1'>{dateDisplay}</div>
        {timeDisplay && <div className='text-brand-secondary mb-3'>{timeDisplay}</div>}

        {/* Title */}
        <p className='text-h5 font-bold mb-3 text-gray-800'>{title}</p>

        {/* Short Description */}
        {shortDescription && (
          <div className='text-text-subtle mb-3'>
            <div className='text-body-sm'>{shortDescription}</div>
          </div>
        )}

        {/* Venue and Location */}
        <div className='flex flex-col items-center gap-1 mb-3'>
          {venue && (
            <div className='flex items-center text-text-subtle text-body-xs'>
              <span className='mr-2' aria-label='Venue' title='Venue'>
                🎭
              </span>
              <span className='font-medium'>{venue}</span>
            </div>
          )}
          <div className='flex items-center text-text-subtle'>
            <span className='mr-2' aria-label='Location' title='Location'>
              📍
            </span>
            <span className='font-medium'>{location}</span>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap justify-center gap-2 mb-4'>
            {tags.map((tag) => (
              <span key={tag} className='px-2 py-1 bg-gray-100 text-text-subtle text-body-xs rounded'>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className='mt-auto'>
          {eventLink ? (
            <CTA
              href={eventLink}
              variant='filled'
              className='w-full justify-center'
              target='_blank'
              rel='noopener noreferrer'
            >
              MORE INFO <FaExternalLinkAlt className='ml-2' />
            </CTA>
          ) : isPast ? (
            <div className='w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-md cursor-not-allowed text-center'>
              EVENT COMPLETED
            </div>
          ) : (
            <div className='w-full bg-gray-200 text-gray-400 font-bold py-3 px-4 rounded-md cursor-not-allowed text-center'>
              NO LINK AVAILABLE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
