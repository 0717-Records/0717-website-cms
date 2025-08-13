import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider = ({ className = '' }: DividerProps) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`.trim()}>
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
