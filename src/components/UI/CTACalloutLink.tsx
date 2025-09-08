import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

type CTACalloutLinkProps = {
  heading?: string;
  text: string;
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
      <div className='flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10'>
        {/* Image */}
        {image && (
          <div className='flex-shrink-0'>
            <div className='w-18 h-18 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
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
        <div className='flex-grow text-center sm:text-left'>
          {heading && <div className='font-semibold text-body-lg mb-1'>{heading}</div>}
          <p className='text-gray-600 leading-relaxed whitespace-pre-line'>{text}</p>
        </div>

        {/* Link Icon */}
        <div className='flex-shrink-0 bg-brand-secondary group-hover:bg-brand-primary p-4 sm:p-6 rounded-full transition-colors duration-200'>
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
