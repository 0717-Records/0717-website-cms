'use client';

import React from 'react';
import Modal from '../UI/Modal';
import CTA from '../UI/CTA';
import EventImage from './EventImage';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getEventLink } from './eventUtils';

interface EventModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  image?: string | null;
  link?: string | null;
  isPast: boolean;
  pastEventText: string;
  pastEventLinkBehavior: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  image,
  link,
  isPast,
  pastEventText,
  pastEventLinkBehavior,
  pastEventLink,
}) => {
  const eventLink = getEventLink({
    link,
    isPast,
    pastEventLinkBehavior,
    pastEventLink,
  });
  const hasLink = Boolean(eventLink);

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      aria-labelledby='event-modal-title'
      aria-describedby='event-modal-description'>
      <div className='flex flex-col items-center justify-center h-full w-full max-w-[90vw] max-h-[90vh] gap-4 px-4'>
        {/* Event Image - takes available vertical space while maintaining aspect ratio */}
        <div className='flex-1 flex items-center justify-center w-full'>
          <div className='relative max-w-full max-h-full aspect-[724/1024] bg-gray-900 rounded-lg overflow-hidden shadow-lg'>
            <EventImage
              image={image}
              title={title}
              isPast={isPast}
              pastEventText={pastEventText}
              sizes='90vw'
              fallbackIconSize='text-body-4xl'
            />
          </div>
        </div>

        {/* CTA Button - only show if there's a link */}
        {hasLink && eventLink && (
          <div className='flex-shrink-0 w-full max-w-[400px]'>
            <CTA
              href={eventLink}
              variant='filled'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full'>
              More Info
              <FaExternalLinkAlt className='ml-2' />
            </CTA>
          </div>
        )}

        {/* Hidden accessibility elements */}
        <h2 id='event-modal-title' className='sr-only'>
          {title}
        </h2>
        <div id='event-modal-description' className='sr-only'>
          Event details for {title}
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;