import React from 'react';
import CTAEmailButton from '../UI/CTAEmailButton';

interface EventHelpCTAProps {
  message: string;
  displayStyle: 'posterOnly' | 'detailed';
  itemsPerRow?: '3' | '4';
  gridClasses: string;
}

const EventHelpCTA = ({
  message,
  displayStyle,
  itemsPerRow = '3',
  gridClasses,
}: EventHelpCTAProps) => {
  return (
    <div className={`${gridClasses} flex`}>
      <div className='w-full h-full bg-white rounded-lg shadow-lg overflow-hidden'>
        {displayStyle === 'posterOnly' ? (
          // Poster Only CTA Style
          <div className='relative w-full aspect-[724/1024] bg-card-gradient overflow-hidden flex flex-col items-center justify-center p-4 text-center'>
            <div className='text-8xl md:text-body-8xl mb-4'>🎭</div>
            <p
              className={`${itemsPerRow === '4' ? 'text-body-xl md:text-body-base' : 'text-body-xl'} text-gray-700 mb-6 max-w-xs leading-relaxed whitespace-pre-line`}>
              {message}
            </p>
            <CTAEmailButton
              className='flex-shrink-0'
              textClasses='text-body-base md:text-body-sm'
            />
          </div>
        ) : (
          // Detailed CTA Style
          // <div className='flex flex-col items-center h-full'>
          //   {/* CTA "Poster" area */}
          //   <div className='relative w-full md:aspect-[724/1024] py-8 md:py-0 bg-card-gradient overflow-hidden flex items-center justify-center flex-shrink-0'>
          //     <div className='text-body-8xl'>🎭</div>
          //   </div>
          //   {/* CTA Content area */}
          //   <div className='p-4 flex flex-col items-center text-center justify-center flex-grow w-full'>
          //     <p className={`text-body-lg text-gray-700 mb-6 leading-relaxed whitespace-pre-line`}>
          //       {message}
          //     </p>
          //     <CTAEmailButton textClasses='text-body-base md:text-body-sm' />
          //   </div>
          // </div>
          <div className='bg-card-gradient'>
            <div className='flex flex-row items-center h-full'>
              {/* CTA "Poster" area */}
              <div className='relative w-1/3 aspect-[724/1024] py-8 md:py-0 overflow-hidden flex items-center justify-center flex-shrink-0'>
                <div className='text-body-8xl'>🎭</div>
              </div>
              <p
                className={`text-body-lg text-gray-700 leading-relaxed whitespace-pre-line text-left px-4`}>
                {message}
              </p>
            </div>
            <CTAEmailButton className='mb-6' />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHelpCTA;
