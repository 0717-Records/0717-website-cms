import React from 'react';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
}

const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  height = 'medium',
  overlay = true,
  className = ''
}: PageHeroProps) => {
  const getHeightClass = () => {
    switch (height) {
      case 'small':
        return 'h-32 md:h-40';
      case 'medium':
        return 'h-48 md:h-64';
      case 'large':
        return 'h-64 md:h-80';
      default:
        return 'h-48 md:h-64';
    }
  };

  return (
    <section className={`relative ${getHeightClass()} bg-black flex items-center justify-center ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover z-10"
          priority
        />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20" />
      )}
      
      {/* Content */}
      <div className="relative z-[25] text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          {title}
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3"></div>
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;