import EventList from '@/components/Events/EventList';
import { getAllEvents } from '@/actions/events'; // CMS data
// import { getEvents } from '../../../../scripts/events/getEvents'; // Test JSON data - uncomment for testing
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';
import { transformEvents } from '@/utils/transformEvents';

export default async function EventsPage() {
  const rawEvents = await getAllEvents(); // CMS data
  const allEvents = transformEvents(rawEvents);
  // const allEvents = (await getEvents()) as TransformedEvent[]; // Test JSON data - uncomment for testing

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title='All Events'
        height='medium'
        showBackLink={true}
        backLinkText='Back to Home'
        backLinkHref='/'
        backgroundImage='/event-test-img.webp'
      />

      <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line'>
        Sub Title text will go here
      </p>

      {/* Upcoming Events Section */}
      <PageSection title='Upcoming Events' isFirst>
        <EventList
          events={allEvents}
          filter='upcoming'
          noEventsText='No upcoming events at the moment. Check back soon!'
        />
      </PageSection>

      {/* Past Events Section */}
      <PageSection title='Past Events'>
        <EventList events={allEvents} filter='past' noEventsText='No past events to display yet.' />
      </PageSection>
    </>
  );
}
