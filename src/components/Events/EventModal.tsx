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
  linkLabel?: string | null;
  isPast: boolean;
  pastEventText: string;
  pastEventLinkBehavior: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
  pastEventLinkLabel?: string | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  image,
  link,
  linkLabel,
  isPast,
  pastEventText,
  pastEventLinkBehavior,
  pastEventLink,
  pastEventLinkLabel,
}) => {
  const eventLink = getEventLink({
    link,
    isPast,
    pastEventLinkBehavior,
    pastEventLink,
  });
  const hasLink = Boolean(eventLink);

  // Determine which label to use based on event state and availability
  const getCtaLabel = () => {
    if (isPast && pastEventLinkBehavior === 'change' && pastEventLinkLabel) {
      return pastEventLinkLabel;
    }
    if (linkLabel) {
      return linkLabel;
    }
    return 'More Info';
  };

  const ctaLabel = getCtaLabel();

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      aria-labelledby='event-modal-title'
      aria-describedby='event-modal-description'>
      <div className='flex flex-col items-center justify-center h-full w-full gap-4 mt-8 p-4 pointer-events-none'>
        {/* Event Image - constrained by available space */}
        <div className='pointer-events-auto'>
          <div
            className='relative bg-gray-900 rounded-lg overflow-hidden shadow-lg'
            style={{
              width: 'min(90vw, calc(90vh - 80px) * 724 / 1024)',
              height: 'min(calc(90vw * 1024 / 724), calc(90vh - 80px))',
              aspectRatio: '724 / 1024',
            }}>
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
          <div className='flex-shrink-0 w-full max-w-[400px] pointer-events-auto'>
            <CTA href={eventLink} variant='filled' target='_blank' rel='noopener noreferrer'>
              {ctaLabel}
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
