import React from 'react';

interface DividerProps {
  className?: string;
  isSmall?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

const getJustifyClass = (alignment: 'left' | 'center' | 'right'): string => {
  switch (alignment) {
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-center';
  }
};

const Divider = ({ className = '', isSmall = false, alignment = 'center' }: DividerProps) => {
  const justifyClass = getJustifyClass(alignment);

  if (isSmall) {
    return (
      <div className={`flex items-center ${justifyClass} py-4 ${className}`.trim()}>
        <div className='flex items-center space-x-2'>
          {/* Left line */}
          <div className='w-8 h-0.5 bg-brand-gradient'></div>
          {/* Left dot */}
          <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
          {/* Center line */}
          <div className='w-4 h-0.5 bg-brand-gradient'></div>
          {/* Right dot */}
          <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
          {/* Right line */}
          <div className='w-8 h-0.5 bg-brand-gradient'></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${justifyClass} py-8 ${className}`.trim()}>
      <div className='flex items-center space-x-4'>
        {/* Left line */}
        <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
        {/* Left dot */}
        <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
        {/* Center line */}
        <div className='w-8 md:w-12 h-0.5 bg-brand-gradient'></div>
        {/* Right dot */}
        <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
        {/* Right line */}
        <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
      </div>
    </div>
  );
};

export default Divider;
