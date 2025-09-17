import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { maxCardWidth } from '@/utils/spacingConstants';

type CTACalloutLinkProps = {
  heading?: string;
  text?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  href: string;
  target?: string;
  rel?: string;
  className?: string;
};

const CTACalloutLink = ({
  heading,
  text,
  image,
  href,
  target,
  rel,
  className = '',
}: CTACalloutLinkProps) => {
  // Determine if this is an external link
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    target === '_blank';

  // Choose appropriate icon
  const LinkIcon = isExternal ? FaExternalLinkAlt : FaArrowRight;

  const content = (
    <div
      className={`
        bg-brand-secondary/10 
        border border-brand-secondary/20 
        rounded-lg 
        py-4 
        px-6 
        sm:py-6 
        sm:px-8 
        w-full 
        ${maxCardWidth}  
        m-auto  
        hover:bg-brand-secondary/15 
        hover:border-brand-secondary/30
        hover:shadow-md
        transition-all 
        duration-200 
        cursor-pointer
        group
        ${className}
      `.trim()}>
      <div className='flex flex-col [@media(min-width:400px)]:flex-row justify-center items-center gap-6 md:gap-10'>
        {/* Image */}
        {image && (
          <div className='flex-shrink-0'>
            <div className='w-18 h-18 [@media(min-width:400px)]:w-24 [@media(min-width:400px)]:h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 64}
                height={image.height || 64}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        )}

        {/* Content */}
        {(heading || text) && (
          <div className='flex-grow text-center [@media(min-width:400px)]:text-left'>
            {heading && <div className='font-semibold text-body-lg mb-1'>{heading}</div>}
            {text && <p className='text-gray-600 leading-relaxed whitespace-pre-line'>{text}</p>}
          </div>
        )}

        {/* Link Icon */}
        <div className='flex-shrink-0 bg-brand-secondary group-hover:bg-brand-primary p-4 [@media(min-width:400px)]:p-6 rounded-full transition-colors duration-200'>
          <LinkIcon className='w-6 h-6 text-black' />
        </div>
      </div>
    </div>
  );

  // Render as Next.js Link for internal links, regular anchor for external
  if (isExternal) {
    return (
      <a href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
};

export default CTACalloutLink;
