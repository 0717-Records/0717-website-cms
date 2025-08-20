import EventCard from '@/components/Events/EventCard';
import { getEvents } from '../../../components/Events/getEvents';
import PageHero from '@/components/Page/PageHero';
import PageSection from '@/components/Layout/PageSection';

interface Event {
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  artists: string[];
  genres: string[];
  image?: string;
  status: 'active' | 'completed';
}

export default async function EventsPage() {
  const allEvents = (await getEvents()) as Event[];

  // Simple date comparison - in a real app you'd use proper date parsing
  // For now, we'll consider "completed" status as past events
  const upcomingEvents = allEvents.filter((event) => event.status === 'active');
  const pastEvents = allEvents.filter((event) => event.status === 'completed');

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
      {upcomingEvents.length > 0 && (
        <PageSection title='Upcoming Events' isFirst>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {upcomingEvents.map((event, index: number) => (
              <EventCard key={`upcoming-${event.title}-${index}`} {...event} />
            ))}
          </div>
        </PageSection>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <PageSection title='Past Events'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {pastEvents.map((event, index: number) => (
              <EventCard key={`past-${event.title}-${index}`} {...event} />
            ))}
          </div>
        </PageSection>
      )}

      {/* Empty State */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <PageSection title='NO EVENTS FOUND' isFirst>
          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>🎵</div>
            <p className='text-gray-500 text-lg'>Check back soon for upcoming events!</p>
          </div>
        </PageSection>
      )}
    </>
  );
}
