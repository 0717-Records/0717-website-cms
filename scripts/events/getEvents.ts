import eventsData from './events.json';

export async function getEvents() {
  // Simulate async behavior (in a real app this might fetch from an API)
  return Promise.resolve(eventsData);
}
