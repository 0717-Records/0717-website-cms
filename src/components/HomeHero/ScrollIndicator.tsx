import React from 'react';

interface ScrollIndicatorProps {
  textColor: 'black' | 'white';
  className?: string;
}

const ScrollIndicator = ({ textColor, className = '' }: ScrollIndicatorProps) => {
  const handleScrollDown = () => {
    // Scroll to the next section after the hero
    const heroElement = document.querySelector('[data-hero]') as HTMLElement;
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling as HTMLElement;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: scroll by viewport height
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const arrowColor = textColor === 'white' ? 'text-white' : 'text-black';
  const hoverColor = textColor === 'white' ? 'hover:text-gray-200' : 'hover:text-gray-600';

  return (
    <button
      onClick={handleScrollDown}
      className={`
        group flex flex-col items-center justify-center
        transition-all duration-300 ease-in-out
        ${arrowColor} ${hoverColor}
        cursor-pointer
        ${className}
      `}
      aria-label='Scroll down to content'>
      {/* Animated arrow */}
      <div className='relative z-40'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='
            w-6 h-6 sm:w-8 sm:h-8
            animate-bounce
            transition-transform duration-300
            group-hover:scale-110
          '>
          <path
            d='M7 10L12 15L17 10'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

        {/* Double arrow effect for emphasis */}
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='
            absolute top-0 left-0
            w-6 h-6 sm:w-8 sm:h-8
            animate-bounce
            opacity-50
            transition-transform duration-300
            group-hover:scale-110
          '
          style={{ animationDelay: '0.1s' }}>
          <path
            d='M7 8L12 13L17 8'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </button>
  );
};

export default ScrollIndicator;
