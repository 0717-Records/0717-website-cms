import React from 'react';
import EventList from '../Events/EventList';
import CTA from '../UI/CTA';
import type { EVENTS_QUERYResult } from '@/sanity/types';
import { transformEvents } from '@/utils/transformEvents';

interface EventBlockProps {
  maxEvents?: number;
  events: EVENTS_QUERYResult;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
}

const EventBlock = ({ maxEvents = 6, events, generateSchema = false, baseUrl }: EventBlockProps) => {
  // Transform Sanity data to EventList format
  const transformedEvents = transformEvents(events);

  return (
    <div className='w-full'>
      <EventList
        events={transformedEvents}
        filter='all'
        limit={maxEvents}
        noEventsText='No events at the moment. Check back soon!'
        generateSchema={generateSchema}
        baseUrl={baseUrl}
      />

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
