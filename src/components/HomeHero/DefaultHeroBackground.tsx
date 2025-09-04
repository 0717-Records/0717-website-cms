import React from 'react';

const DefaultHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Key decorative circles - minimal and strategic */}
      {/* Large left circle - primary accent */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full bg-gradient-to-br from-[#ffea00]/20 to-[#f4a300]/15 blur-2xl" />
      
      {/* Large right circle - secondary accent */}
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full bg-gradient-to-bl from-[#f4a300]/18 to-[#ffea00]/22 blur-2xl" />
      
      {/* Single focal accent circle - positioned strategically */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-[#ffea00]/25 to-[#f4a300]/20 blur-xl opacity-60" />
      
      {/* Subtle background gradient for warmth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffea00]/3 via-transparent to-[#f4a300]/2" />
    </div>
  );
};

export default DefaultHeroBackground;