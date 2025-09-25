import React from 'react';
import CTAEmailButton from '../UI/CTAEmailButton';

interface EventHelpCTAProps {
  message: string;
  displayStyle: 'posterOnly' | 'detailed';
  rowSize?: 'small' | 'large';
  gridClasses: string;
}

const EventHelpCTA = ({
  message,
  displayStyle,
  rowSize = 'large',
  gridClasses,
}: EventHelpCTAProps) => {
  return (
    <div className={`${gridClasses} flex`}>
      <div className='w-full h-full bg-white rounded-lg shadow-lg overflow-hidden'>
        {displayStyle === 'posterOnly' ? (
          // Poster Only CTA Style
          <div className='relative w-full aspect-[724/1024] bg-card-gradient overflow-hidden flex flex-col items-center justify-center p-4 text-center'>
            <div
              className={`${rowSize === 'small' ? 'text-body-8xl xs:text-body-6xl' : 'text-body-8xl'} mb-4`}>
              🎭
            </div>
            <p
              className={`${rowSize === 'small' ? 'text-body-xl xs:text-body-base' : 'text-body-xl'} mb-6 max-w-xs leading-relaxed whitespace-pre-line`}>
              {message}
            </p>
            <CTAEmailButton className='flex-shrink-0' />
          </div>
        ) : (
          // Detailed CTA Style - Mobile: row layout, Desktop: column layout
          <div className='flex flex-row sm:flex-col h-full'>
            {/* CTA "Poster" area */}
            <div className='relative w-1/3 sm:w-full aspect-[724/1024] sm:py-8 bg-card-gradient overflow-hidden flex items-center justify-center flex-shrink-0'>
              <div className='text-body-8xl'>🎭</div>
            </div>
            {/* CTA Content area */}
            <div className='p-4 flex flex-col items-start sm:items-center text-left sm:text-center justify-center flex-grow w-2/3 sm:w-full'>
              <p
                className={`text-body-sm sm:text-body-lg mb-6 leading-relaxed whitespace-pre-line`}>
                {message}
              </p>
              <CTAEmailButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHelpCTA;
