import EventCard from '@/components/Events/EventCard';
import Link from 'next/link';
import { getEvents } from '../../components/Events/getEvents';

export default async function EventsPage() {
  const allEvents = await getEvents();

  // Simple date comparison - in a real app you'd use proper date parsing
  // For now, we'll consider "completed" status as past events
  const upcomingEvents = allEvents.filter((event: any) => event.status === 'active');
  const pastEvents = allEvents.filter((event: any) => event.status === 'completed');

  return (
    <main className='min-h-screen bg-gray-50'>
      {/* Back Button */}
      <div className='container-max pt-8'>
        <Link
          href='/#events'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8'>
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className='container-max pb-16'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-black'>
            ALL EVENTS
            <div className='w-20 h-1 bg-yellow-400 mx-auto mt-2'></div>
          </h1>
          <p className='text-lg text-gray-600 font-medium'>
            COMPLETE LISTING OF 07:17 RECORDS EVENTS
          </p>
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className='mb-16'>
            <div className='flex items-center mb-8'>
              <div className='flex-1 h-px bg-yellow-400'></div>
              <h2 className='px-6 text-2xl md:text-3xl font-bold text-black bg-gray-50'>
                UPCOMING EVENTS
              </h2>
              <div className='flex-1 h-px bg-yellow-400'></div>
            </div>

            <div className='flex gap-8'>
              {upcomingEvents.map((event: any, index: number) => (
                <EventCard key={`upcoming-${event.title}-${index}`} {...event} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section>
            <div className='flex items-center mb-8'>
              <div className='flex-1 h-px bg-gray-300'></div>
              <h2 className='px-6 text-2xl md:text-3xl font-bold text-gray-600 bg-gray-50'>
                PAST EVENTS
              </h2>
              <div className='flex-1 h-px bg-gray-300'></div>
            </div>

            <div className='flex gap-8'>
              {pastEvents.map((event: any, index: number) => (
                <EventCard key={`past-${event.title}-${index}`} {...event} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>🎵</div>
            <h2 className='text-2xl font-bold text-gray-600 mb-2'>No Events Found</h2>
            <p className='text-gray-500'>Check back soon for upcoming events!</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className='mt-16 bg-yellow-50 rounded-lg p-8 text-center'>
          <h3 className='text-2xl md:text-3xl font-bold mb-4 text-black'>
            WANT TO BOOK AN EVENT?
            <div className='w-16 h-1 bg-yellow-400 mx-auto mt-2'></div>
          </h3>
          <p className='text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed'>
            INTERESTED IN HOSTING ONE OF OUR ARTISTS OR ORGANIZING A COLLABORATION? GET IN TOUCH AND
            LETS MAKE SOMETHING HAPPEN.
          </p>
          <a
            href='mailto:0717records@gmail.com'
            className='inline-flex items-center gap-2 bg-yellow-400 text-black font-bold py-3 px-6 rounded-md hover:bg-yellow-500 transition-colors duration-200'>
            <span>CONTACT US</span>
            <span className='text-lg'>📧</span>
          </a>
        </div>
      </div>
    </main>
  );
}
