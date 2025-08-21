import { sanityFetch } from '@/sanity/lib/live';
import { EVENTS_QUERY, EVENTS_INDEX_PAGE_QUERY } from '@/sanity/lib/queries';
import type { EVENTS_QUERYResult, EVENTS_INDEX_PAGE_QUERYResult } from '@/sanity/types';

// Server-side function using live queries (for use in server components)
export async function getAllEvents(): Promise<EVENTS_QUERYResult> {
  const { data: events } = await sanityFetch({
    query: EVENTS_QUERY,
  });

  return events;
}

// Server-side function to get events index page data
export async function getEventsIndexPage(): Promise<EVENTS_INDEX_PAGE_QUERYResult | null> {
  const { data: page } = await sanityFetch({
    query: EVENTS_INDEX_PAGE_QUERY,
  });

  return page;
}