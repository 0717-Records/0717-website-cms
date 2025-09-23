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
              className={`text-8xl ${rowSize === 'small' ? 'md:text-body-6xl' : 'md:text-body-8xl'} mb-4`}>
              🎭
            </div>
            <p
              className={`${rowSize === 'small' ? 'text-body-xl md:text-body-base' : 'text-body-xl'} mb-6 max-w-xs leading-relaxed whitespace-pre-line`}>
              {message}
            </p>
            <CTAEmailButton className='flex-shrink-0' />
          </div>
        ) : (
          // Detailed CTA Style - Mobile: row layout, Desktop: column layout
          <div className='flex flex-row md:flex-col h-full'>
            {/* CTA "Poster" area */}
            <div className='relative w-1/3 md:w-full aspect-[724/1024] md:py-8 bg-card-gradient overflow-hidden flex items-center justify-center flex-shrink-0'>
              <div className='text-body-8xl'>🎭</div>
            </div>
            {/* CTA Content area */}
            <div className='p-4 flex flex-col items-start md:items-center text-left md:text-center justify-center flex-grow w-2/3 md:w-full'>
              <p className={`text-body-lg mb-6 leading-relaxed whitespace-pre-line`}>{message}</p>
              <CTAEmailButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHelpCTA;
