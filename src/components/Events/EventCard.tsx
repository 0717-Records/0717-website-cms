import React from 'react';
import CTA from '../UI/CTA';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  artists: string[];
  genres: string[];
  image?: string;
  status: 'active' | 'completed';
}

const EventCard = ({
  title,
  date,
  time,
  venue,
  location,
  artists,
  genres,
  image,
  status,
}: EventCardProps) => {
  return (
    <div className='w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col'>
      {/* Event Poster */}
      <div className='relative aspect-[3/4] bg-gray-900 overflow-hidden'>
        {image ? (
          <Image
            src={image}
            alt={`${title} event poster`}
            fill
            sizes='(max-width: 640px) 100vw, 400px'
            className='object-cover'
            priority
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900'>
            <div className='text-center text-white/70'>
              <div className='text-6xl mb-2'>🎭</div>
            </div>
          </div>
        )}
      </div>
      {/* Event Details */}
      <div className='p-4 flex flex-col flex-grow'>
        {/* Date / Time */}
        <div className='text-brand-secondary font-semibold mb-1'>{date}</div>
        <div className='text-brand-secondary mb-3'>{time}</div>

        {/* Title */}
        <p className='text-h5 font-bold mb-3 text-gray-800'>{title}</p>

        {/* Artists */}
        <div className='text-text-subtle mb-3'>
          <div className='font-semibold'>{artists.join(', ')}</div>
        </div>

        {/* Venue and Location */}
        <div className='flex flex-col items-center gap-1 mb-3'>
          <div className='flex items-center text-text-subtle text-sm'>
            <span className='mr-2' aria-label='Venue' title='Venue'>
              🎭
            </span>
            <span className='font-medium'>{venue}</span>
          </div>
          <div className='flex items-center text-text-subtle'>
            <span className='mr-2' aria-label='Location' title='Location'>
              📍
            </span>
            <span className='font-medium'>{location || 'Everywhere'}</span>
          </div>
        </div>

        {/* Tags */}
        <div className='flex justify-center gap-2 mb-4'>
          {genres.map((genre) => (
            <span key={genre} className='px-2 py-1 bg-gray-100 text-text-subtle text-sm rounded'>
              {genre}
            </span>
          ))}
        </div>

        <div className='mt-auto'>
          {status === 'active' ? (
            <CTA href='#' variant='filled' className='w-full justify-center'>
              MORE INFO <FaExternalLinkAlt className='ml-2' />
            </CTA>
          ) : (
            <div className='w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-md cursor-not-allowed text-center'>
              EVENT COMPLETED
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
