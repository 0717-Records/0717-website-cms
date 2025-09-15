import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';

const FallbackBackground = () => {
  return (
    <div className='absolute inset-0 z-10'>
      {/* Left logo */}
      <div className='absolute top-0 left-1/8 w-[400px] h-[400px]'>
        <UnifiedImage
          src='/images/logo-dark.jpg'
          alt=''
          mode="fill"
          sizeContext="hero"
          objectFit="cover"
          className='opacity-40 blur-sm'
        />
      </div>

      {/* Right logo */}
      <div className='absolute top-0 right-1/8 w-[400px] h-[400px]'>
        <UnifiedImage
          src='/images/logo-dark.jpg'
          alt=''
          mode="fill"
          sizeContext="hero"
          objectFit="cover"
          className='opacity-40 blur-sm'
        />
      </div>
    </div>
  );
};

export default FallbackBackground;
