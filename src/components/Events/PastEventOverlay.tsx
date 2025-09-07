import React from 'react';

interface PastEventOverlayProps {
  text: string;
}

const PastEventOverlay = ({ text }: PastEventOverlayProps) => (
  <div className='absolute inset-0 flex items-center justify-center z-10'>
    <div className='text-center text-white leading-tight px-4'>
      {text.split('\n').map((line, index) => (
        <div key={index} className='drop-shadow-lg'>
          {line}
        </div>
      ))}
    </div>
  </div>
);

export default PastEventOverlay;
