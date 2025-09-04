import React from 'react';

const DefaultHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Decorative circles with brand colors - inspired by the design */}
      {/* Large background circles */}
      <div className="absolute top-1/4 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#ffea00]/25 to-[#f4a300]/20 blur-xl transform -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-gradient-to-bl from-[#f4a300]/20 to-[#ffea00]/25 blur-2xl transform translate-x-1/3" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-[#ffea00]/30 to-[#f4a300]/25 blur-xl" />
      
      {/* Medium accent circles */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#ffea00]/35 blur-lg" />
      <div className="absolute bottom-1/3 left-1/6 w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#f4a300]/30 blur-md" />
      <div className="absolute top-2/3 right-1/3 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ffea00]/40 to-[#f4a300]/35 blur-md" />
      
      {/* Small detail circles */}
      <div className="absolute top-1/5 left-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#f4a300]/45 blur-sm" />
      <div className="absolute bottom-1/5 right-1/5 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#ffea00]/50 blur-sm" />
      <div className="absolute top-3/5 left-1/4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tl from-[#ffea00]/45 to-[#f4a300]/40 blur-sm" />
      
      {/* Mobile-optimized circles */}
      <div className="md:hidden absolute top-16 right-8 w-10 h-10 rounded-full bg-[#ffea00]/40 blur-sm" />
      <div className="md:hidden absolute bottom-24 left-8 w-12 h-12 rounded-full bg-[#f4a300]/35 blur-sm" />
      <div className="md:hidden absolute top-1/2 left-3/4 w-8 h-8 rounded-full bg-[#ffea00]/50 blur-sm" />
      
      {/* Very subtle overall overlay for cohesion */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#ffea00]/5 to-[#f4a300]/5" />
    </div>
  );
};

export default DefaultHeroBackground;