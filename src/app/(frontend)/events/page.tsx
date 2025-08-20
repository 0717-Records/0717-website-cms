import EventCard from '@/components/Events/EventCard';
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

function isEventPast(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);

  // Event is considered past the day after it ends
  const dayAfterEvent = new Date(eventEndDate);
  dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);

  return today >= dayAfterEvent;
}

export default async function EventsPage() {
  const allEvents = (await getEvents()) as Event[];

  // Determine if events have passed based on their dates and sort by startDate (earliest first)
  const upcomingEvents = allEvents
    .filter((event) => !isEventPast(event))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const pastEvents = allEvents
    .filter((event) => isEventPast(event))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

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
        {upcomingEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {upcomingEvents.map((event, index: number) => (
              <EventCard key={`upcoming-${event.title}-${index}`} {...event} isPast={false} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>🎭</div>
            <p className='text-gray-500 text-lg'>
              No upcoming events at the moment. Check back soon!
            </p>
          </div>
        )}
      </PageSection>

      {/* Past Events Section */}
      <PageSection title='Past Events'>
        {pastEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {pastEvents.map((event, index: number) => (
              <EventCard key={`past-${event.title}-${index}`} {...event} isPast={true} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>⏰</div>
            <p className='text-gray-500 text-lg'>No past events to display yet.</p>
          </div>
        )}
      </PageSection>
    </>
  );
}
