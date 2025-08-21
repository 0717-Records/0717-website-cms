import type { EVENTS_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

export interface TransformedEvent {
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

export function transformEvents(events: EVENTS_QUERYResult): TransformedEvent[] {
  return events
    .filter((event) => event.title && event.location && event.startDate) // Filter out invalid events
    .map((event) => ({
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
    }));
}