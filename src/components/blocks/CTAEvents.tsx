import React from 'react';
import EventList from '../Events/EventList';
import { urlFor } from '@/sanity/lib/image';

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

interface CTAEventsProps {
  events?: (DereferencedEvent | ReferencedEvent)[] | null;
  className?: string;
  // Optional schema generation props
  generateSchema?: boolean;
  baseUrl?: string;
}

// Type guard to check if event is dereferenced
function isDereferencedEvent(
  event: DereferencedEvent | ReferencedEvent | null | undefined
): event is DereferencedEvent {
  return event !== null && event !== undefined && '_id' in event && 'title' in event;
}

// Transform function to convert DereferencedEvent to EventList compatible format
function transformEvent(event: DereferencedEvent) {
  return {
    title: event.title!,
    shortDescription: event.shortDescription,
    venue: event.venue,
    location: event.location!,
    image: event.image ? urlFor(event.image).url() : null,
    tags: event.tags,
    link: event.link,
    startDate: event.startDate!,
    endDate: event.endDate,
    timeDescription: event.timeDescription,
    pastEventText: event.pastEventText || 'This Event Has Been.\nThanks For Your Support.',
    pastEventLinkBehavior: (event.pastEventLinkBehavior as 'keep' | 'change' | 'remove') || 'keep',
    pastEventLink: event.pastEventLink,
  };
}

const CTAEvents = ({ events, className = '', generateSchema = false, baseUrl }: CTAEventsProps) => {
  // Don't render if no events are selected
  if (!events || events.length === 0) {
    return null;
  }

  // Filter and transform only dereferenced events, maintaining order
  const transformedEvents = events
    .filter(isDereferencedEvent)
    .filter((event) => event.title && event.location && event.startDate) // Filter out invalid events
    .map(transformEvent);

  // Don't render if no valid events after filtering
  if (transformedEvents.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <EventList
        events={transformedEvents}
        filter='all' // Show all selected events regardless of date
        noEventsText='No events selected.'
        generateSchema={generateSchema}
        baseUrl={baseUrl}
      />
    </div>
  );
};

export default CTAEvents;