'use client';

import React, { useState, useEffect } from 'react';
import EventList from './EventList';
import CTA from '../UI/CTA';
import { getEvents } from '../../../scripts/events/getEvents';

interface EventBlockProps {
  maxEvents?: number;
}

interface Event {
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
}

const EventBlock = ({ maxEvents = 6 }: EventBlockProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = (await getEvents()) as Event[];
        setEvents(allEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className='w-full flex justify-center py-16'>
        <div className='text-gray-500'>Loading events...</div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <EventList
        events={events}
        filter='upcoming'
        limit={maxEvents}
        noEventsText='No events at the moment. Check back soon!'
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
