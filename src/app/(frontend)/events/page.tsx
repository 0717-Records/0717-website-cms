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
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import { closingCardSpacing } from '@/utils/spacingConstants';
import { normalizeClosingCardForCard } from '@/utils/closingCardHelpers';

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
    canonicalUrl: generateCanonicalUrl('/events'),
  });
}

export default async function EventsPage() {
  const [rawEvents, eventsIndexPage] = await Promise.all([
    getAllEvents(), // CMS data
    getEventsIndexPage(), // CMS page data
  ]);
  const allEvents = transformEvents(rawEvents);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0717records.com';
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
            showEventHelpCTA={eventsIndexPage?.showEventHelpCTA || false}
            eventHelpCTAMessage={eventsIndexPage?.eventHelpCTAMessage || undefined}
            generateSchema={true}
            baseUrl={baseUrl}
          />
        </PageSection>
        {/* Past Events Section */}
        <PageSection
          title='Past Events'
          documentId={eventsIndexPage?._id}
          documentType={eventsIndexPage?._type}
          shouldApplyBottomPadding={false}>
          <EventList
            events={allEvents}
            filter='past'
            noEventsText='No past events to display yet.'
            generateSchema={true}
            baseUrl={baseUrl}
          />
        </PageSection>

        {/* Events Message Card - moved to bottom of page */}
        {eventsIndexPage?.hasEventsMessage && eventsIndexPage?.eventsMessage && (
          <div className={closingCardSpacing}>
            <Card
              {...normalizeClosingCardForCard(eventsIndexPage.eventsMessage)}
              documentId={eventsIndexPage._id}
              documentType={eventsIndexPage._type}
              fieldPathPrefix='eventsMessage'
            />
          </div>
        )}
      </Container>
    </>
  );
}
