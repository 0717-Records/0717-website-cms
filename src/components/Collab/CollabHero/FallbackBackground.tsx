import React from 'react';
import Image from 'next/image';

const FallbackBackground = () => {
  return (
    <div className='absolute inset-0 z-10'>
      {/* Left logo */}
      <div className='absolute top-0 left-1/8'>
        <Image
          src='/images/logo-dark.jpg'
          alt=''
          width={400}
          height={400}
          className='opacity-40 blur-sm'
        />
      </div>

      {/* Right logo */}
      <div className='absolute top-0 right-1/8'>
        <Image
          src='/images/logo-dark.jpg'
          alt=''
          width={400}
          height={400}
          className='opacity-40 blur-sm'
        />
      </div>
    </div>
  );
};

export default FallbackBackground;
