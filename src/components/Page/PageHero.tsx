import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  backgroundImage?: string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
  showBackLink?: boolean;
  backLinkText?: string;
  backLinkHref?: string;
}

const PageHero = ({
  title,
  backgroundImage,
  height = 'medium',
  overlay = true,
  className = '',
  showBackLink = false,
  backLinkText = 'Back to Home',
  backLinkHref = '/',
}: PageHeroProps) => {
  // Use provided background image or fallback to placeholder
  const finalBackgroundImage = backgroundImage || '/pagePlaceholderImg.webp';
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
    <section
      className={`relative ${getHeightClass()} bg-black flex items-center justify-center ${className}`}>
      {/* Background Image */}
      <Image src={finalBackgroundImage} alt='' fill className='object-cover z-10' priority />

      {/* Overlay */}
      {overlay && (
        <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
      )}

      {/* Back Link */}
      {showBackLink && (
        <div className='absolute top-4 left-4 md:top-8 md:left-8 z-[25]'>
          <Link
            href={backLinkHref}
            className='inline-flex items-center gap-2 text-white hover:bg-black active:scale-90 transition-all duration-200 text-body-sm md:text-body-base bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20'>
            <span>←</span>
            <span>{backLinkText}</span>
          </Link>
        </div>
      )}

      {/* Content */}
      <div className='relative z-[25] text-white text-center px-4'>
        <h1 className='text-h5 md:text-h3 font-bold mb-2'>
          {title}
          <div className='w-20 h-1 bg-yellow-400 mx-auto mt-3'></div>
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
