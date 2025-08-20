import EventList from '@/components/Events/EventList';
import { getEvents } from '../../../components/Events/getEvents';
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';

interface Event {
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

export default async function EventsPage() {
  const allEvents = (await getEvents()) as Event[];

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title='ALL EVENTS'
        subtitle='COMPLETE LISTING OF 07:17 RECORDS EVENTS'
        height='medium'
        showBackLink={true}
        backLinkText='Back to Home'
        backLinkHref='/'
        backgroundImage='/event-test-img.webp'
      />

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
