'use client';

import React, { useMemo, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { formatEventDate, getEventLink } from '@/components/Events/eventUtils';
import EventImage from '@/components/Events/EventImage';
import EventModal from '@/components/Events/EventModal';
import { createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import {
  generateEventSchema,
  generateStructuredDataScript,
  type EventData,
} from '@/lib/structuredData';

interface EventCardProps {
  title: string;
  shortDescription?: string | null;
  venue?: string | null;
  location: string;
  image?: string | null;
  tags?: string[] | null;
  link?: string | null;
  linkLabel?: string | null;
  startDate: string;
  endDate?: string | null;
  timeDescription?: string | null;
  pastEventText: string;
  pastEventLinkBehavior: 'keep' | 'change' | 'remove';
  pastEventLink?: string | null;
  pastEventLinkLabel?: string | null;
  isPast: boolean;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
  // Optional Sanity Live Editing props
  documentId?: string;
  documentType?: string;
  fieldPathPrefix?: string;
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
    documentId,
    documentType,
    fieldPathPrefix,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sanity Live Editing configuration
  const { projectId, dataset, stega } = client.config();
  const createDataAttributeConfig = {
    projectId,
    dataset,
    baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
  };

  const { dateDisplay, timeDisplay } = formatEventDate(startDate, endDate, timeDescription);
  const eventLink = getEventLink({
    link: props.link,
    isPast,
    pastEventLinkBehavior: props.pastEventLinkBehavior,
    pastEventLink: props.pastEventLink,
  });

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
  }, [
    generateSchema,
    title,
    shortDescription,
    venue,
    location,
    startDate,
    endDate,
    image,
    eventLink,
    baseUrl,
  ]);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const cardContent = (
    <div
      className={`w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-row sm:flex-col transition-all duration-300 cursor-pointer group hover:shadow-xl hover:scale-103`}
      onClick={handleCardClick}>
      {/* Event Poster */}
      <div
        className='relative w-1/3 sm:w-full aspect-[724/1024] bg-gray-900 overflow-hidden flex-shrink-0'
        {...(documentId &&
          documentType &&
          fieldPathPrefix !== undefined && {
            'data-sanity': createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: fieldPathPrefix ? `${fieldPathPrefix}.image` : 'image',
            }).toString(),
          })}>
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
      <div className='p-3 md:p-4 flex flex-col items-start sm:items-center text-left sm:text-center flex-grow w-2/3 sm:w-full'>
        {/* Date / Time */}
        <div
          className='text-brand-secondary text-body-sm sm:text-body-base mb-2 md:mb-1'
          {...(documentId &&
            documentType &&
            fieldPathPrefix !== undefined && {
              'data-sanity': createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: fieldPathPrefix ? `${fieldPathPrefix}.startDate` : 'startDate',
              }).toString(),
            })}>
          <span>{dateDisplay}</span>
          {timeDisplay && (
            <>
              <span className='sm:hidden mx-1'>•</span>
              <span className='sm:hidden'>{timeDisplay}</span>
            </>
          )}
        </div>
        {timeDisplay && (
          <div
            className='hidden sm:block text-body-sm sm:text-body-base text-brand-secondary mb-3'
            {...(documentId &&
              documentType &&
              fieldPathPrefix !== undefined && {
                'data-sanity': createDataAttribute({
                  ...createDataAttributeConfig,
                  id: documentId,
                  type: documentType,
                  path: fieldPathPrefix ? `${fieldPathPrefix}.timeDescription` : 'timeDescription',
                }).toString(),
              })}>
            {timeDisplay}
          </div>
        )}

        {/* Title */}
        <p
          className={`text-h7 font-medium mb-2 md:mb-3 text-body-lg text-gray-800 transition-all duration-300 leading-tight group-hover:underline`}>
          {title}
        </p>

        {/* Short Description - keeping for future if needed */}
        {/* {shortDescription && (
          <div className=' text-text-subtle text-body-sm mb-2 md:mb-3'>
            <div className='leading-snug'>{shortDescription}</div>
          </div>
        )} */}

        {/* Past Event Message or Event Details */}
        {isPast ? (
          /* Past Event Message */
          <div className='flex items-center justify-start sm:justify-center text-text-subtle text-body-sm sm:text-body-base mb-2 md:mb-4'>
            <span className='whitespace-pre-line'>
              {pastEventText || 'This Event Has Been.\nThanks For Your Support.'}
            </span>
          </div>
        ) : (
          <>
            {/* Venue and Location - Only for upcoming events */}
            <div className='flex items-center text-text-subtle text-body-sm sm:text-body-base mb-2 sm:mb-3'>
              <FaLocationDot className='mr-1 sm:mr-2 text-brand-secondary' />
              <span>{venue ? `${venue}, ${location}` : location}</span>
            </div>

            {/* Tags - Only for upcoming events */}
            {tags && tags.length > 0 && (
              <div className='flex flex-wrap justify-start sm:justify-center gap-1 sm:gap-2 mb-2 sm:mb-4'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-1 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-text-subtle text-body-xs sm:text-body-sm rounded'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Event Schema Markup */}
      {eventSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={generateStructuredDataScript(eventSchema)}
        />
      )}
      {cardContent}

      {/* Event Modal */}
      <EventModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={title}
        image={image}
        link={props.link}
        linkLabel={props.linkLabel}
        isPast={isPast}
        pastEventText={pastEventText}
        pastEventLinkBehavior={props.pastEventLinkBehavior}
        pastEventLink={props.pastEventLink}
        pastEventLinkLabel={props.pastEventLinkLabel}
      />
    </>
  );
};

export default EventCard;
