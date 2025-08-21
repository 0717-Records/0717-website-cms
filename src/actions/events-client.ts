import { client } from '@/sanity/lib/client';
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import type { EVENTS_QUERYResult } from '@/sanity/types';

// Client-side function using regular client (for use in client components)
export async function getAllEventsClient(): Promise<EVENTS_QUERYResult> {
  const events = await client.fetch(EVENTS_QUERY);
  return events;
}