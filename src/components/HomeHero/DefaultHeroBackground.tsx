import React from 'react';

const DefaultHeroBackground = () => {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Transparent background - allows body color to show through */}

      {/* Key decorative circles - minimal and strategic */}
      {/* Large left circle - positioned to peek from bottom-left */}
      <div className='absolute bottom-0 left-0 w-80 h-80 md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] rounded-full bg-gradient-to-tr from-[#ffea00]/20 to-[#ffea00]/10 transform -translate-x-1/2 translate-y-1/2 blur-xl' />

      {/* Large right circle - positioned to peek from top-right */}
      <div className='absolute top-0 right-0 w-72 h-72 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full bg-gradient-to-bl from-[#ffea00]/30 to-[#f4a300]/20 transform translate-x-1/2 -translate-y-1/2 blur-sm' />

      {/* Central accent circle - subtly positioned behind content area */}
      <div className='absolute top-1/2 left-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#ffea00]/20 to-[#ffea00]/10 transform -translate-y-1/2 -translate-x-1/2 blur-sm' />
    </div>
  );
};

export default DefaultHeroBackground;
