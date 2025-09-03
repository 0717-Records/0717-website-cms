import EventList from '@/components/Events/EventList';
import { getAllEvents, getEventsIndexPage } from '@/actions/events'; // CMS data
// import { getEvents } from '../../../../scripts/events/getEvents'; // Test JSON data - uncomment for testing
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';
import { transformEvents } from '@/utils/transformEvents';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import { pageSubtitleBottomSpacing } from '@/utils/spacingConstants';

export default async function EventsPage() {
  const [rawEvents, eventsIndexPage] = await Promise.all([
    getAllEvents(), // CMS data
    getEventsIndexPage(), // CMS page data
  ]);
  const allEvents = transformEvents(rawEvents);
  // const allEvents = (await getEvents()) as TransformedEvent[]; // Test JSON data - uncomment for testing

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={eventsIndexPage?.title || 'All Events'}
        heroImage={eventsIndexPage?.backgroundImage}
        documentId={eventsIndexPage?._id}
        documentType={eventsIndexPage?._type}
      />
      <Container textAlign='center'>
        {/* Page Subtitle */}
        {eventsIndexPage?.subtitle && (
          <div className={`container mx-auto px-4 md:px-8 ${pageSubtitleBottomSpacing}`}>
            <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center'>
              {eventsIndexPage.subtitle}
            </p>
          </div>
        )}
        {/* Upcoming Events Section */}
        <PageSection
          title='Upcoming Events'
          documentId={eventsIndexPage?._id}
          documentType={eventsIndexPage?._type}>
          <EventList
            events={allEvents}
            filter='upcoming'
            noEventsText={
              eventsIndexPage?.noUpcomingEventsMessage ||
              'No upcoming events at the moment. Check back soon!'
            }
          />
          
          {/* Events Message Card */}
          {eventsIndexPage?.hasEventsMessage && eventsIndexPage?.eventsMessage && (
            <Card
              {...eventsIndexPage.eventsMessage}
              documentId={eventsIndexPage._id}
              documentType={eventsIndexPage._type}
            />
          )}
        </PageSection>
        {/* Past Events Section */}
        <PageSection
          title='Past Events'
          documentId={eventsIndexPage?._id}
          documentType={eventsIndexPage?._type}>
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
