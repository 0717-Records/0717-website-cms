import CTA from '../UI/CTA';

interface EventCardProps {
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

export default function EventCard({
  title,
  date,
  time,
  venue,
  location,
  artists,
  genres,
  image,
  status,
}: EventCardProps) {
  return (
    <div className='w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col'>
      {/* Event Poster */}
      <div className='relative aspect-[3/4] bg-gray-900 overflow-hidden'>
        {image ? (
          <img 
            src={image} 
            alt={`${title} event poster`}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900'>
            <div className='text-center text-white/70'>
              <div className='text-4xl mb-2'>🎵</div>
              <div className='text-sm font-semibold'>EVENT POSTER</div>
              <div className='text-xs'>COMING SOON</div>
            </div>
          </div>
        )}
      </div>
      {/* Event Details */}
      <div className='p-4 flex flex-col flex-grow'>
        <div className='text-yellow-500 text-sm font-semibold mb-1'>{date}</div>
        <div className='text-yellow-500 text-sm mb-3'>{time}</div>

        <h3 className='text-xl font-bold mb-3 text-gray-800'>{title}</h3>

        <div className='text-gray-600 mb-3'>
          <div className='font-semibold'>{artists.join(', ')}</div>
        </div>

        <div className='flex items-center text-gray-600 mb-3'>
          <span className='text-orange-500 mr-2'>📍</span>
          <span className='font-medium'>{venue}</span>
        </div>

        <div className='flex gap-2 mb-4'>
          {genres.map((genre) => (
            <span key={genre} className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>
              {genre}
            </span>
          ))}
        </div>

        <div className='mt-auto'>
          {status === 'active' ? (
            <CTA 
              href="#"
              variant="filled"
              className="w-full justify-center"
            >
              MORE INFO
            </CTA>
          ) : (
            <div className='w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-md cursor-not-allowed text-center'>
              EVENT COMPLETED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
