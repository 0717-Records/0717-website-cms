import EventList from '@/components/Events/EventList';
import { getAllEvents, getEventsIndexPage } from '@/actions/events'; // CMS data
// import { getEvents } from '../../../../scripts/events/getEvents'; // Test JSON data - uncomment for testing
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';
import { transformEvents } from '@/utils/transformEvents';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/Layout/Container';

export default async function EventsPage() {
  const [rawEvents, eventsIndexPage] = await Promise.all([
    getAllEvents(), // CMS data
    getEventsIndexPage(), // CMS page data
  ]);
  const allEvents = transformEvents(rawEvents);
  // const allEvents = (await getEvents()) as TransformedEvent[]; // Test JSON data - uncomment for testing

  // Get background image or fallback to placeholder
  const backgroundImage = eventsIndexPage?.backgroundImage
    ? urlFor(eventsIndexPage.backgroundImage).url()
    : '/pagePlaceholderImg.webp';

  return (
    <>
      {/* Page Hero */}
      <PageHero title={eventsIndexPage?.title || 'All Events'} heroImage={backgroundImage} />
      <Container textAlign='center'>
        {/* Page Subtitle */}
        {eventsIndexPage?.subtitle && (
          <div className='container mx-auto px-4 md:px-8 py-8'>
            <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center'>
              {eventsIndexPage.subtitle}
            </p>
          </div>
        )}
        {/* Upcoming Events Section */}
        <PageSection title='Upcoming Events' isFirst>
          <EventList
            events={allEvents}
            filter='upcoming'
            noEventsText={
              eventsIndexPage?.noUpcomingEventsMessage ||
              'No upcoming events at the moment. Check back soon!'
            }
          />
        </PageSection>
        {/* Past Events Section */}
        <PageSection title='Past Events'>
          <EventList
            events={allEvents}
            filter='past'
            noEventsText={eventsIndexPage?.noPastEventsMessage || 'No past events to display yet.'}
          />
        </PageSection>
      </Container>
    </>
  );
}
