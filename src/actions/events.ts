import { sanityFetch } from '@/sanity/lib/live';
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import type { EVENTS_QUERYResult } from '@/sanity/types';

// Server-side function using live queries (for use in server components)
export async function getAllEvents(): Promise<EVENTS_QUERYResult> {
  const { data: events } = await sanityFetch({
    query: EVENTS_QUERY,
  });

  return events;
}