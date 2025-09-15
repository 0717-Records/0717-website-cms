import EventList from '@/components/Events/EventList';
import { getAllEvents, getEventsIndexPage } from '@/actions/events'; // CMS data
// import { getEvents } from '../../../../scripts/events/getEvents'; // Test JSON data - uncomment for testing
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';
import { transformEvents } from '@/utils/transformEvents';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { getSiteSettings } from '@/actions';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const [siteSettings, eventsIndexPage] = await Promise.all([
    getSiteSettings(),
    getEventsIndexPage(),
  ]);

  if (!siteSettings) {
    return {
      title: 'Events | 07:17 Records',
      description: 'Discover upcoming and past events',
    };
  }

  return generatePageMetadata({
    title: eventsIndexPage?.title || 'Events',
    description: eventsIndexPage?.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
  });
}

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
        heroImage={eventsIndexPage?.backgroundImage || '/images/hero-bg/hero-bg-option6-2.webp'}
        documentId={eventsIndexPage?._id}
        documentType={eventsIndexPage?._type}
        showBreadcrumb={true}
        breadcrumbPageTitle={eventsIndexPage?.title || 'All Events'}
      />
      <Container textAlign='center'>
        {/* Page Subtitle */}
        {eventsIndexPage?.subtitle && <PageSubtitle>{eventsIndexPage.subtitle}</PageSubtitle>}
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
              fieldPathPrefix='eventsMessage'
              className={'mt-12 md:mt-16'}
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
