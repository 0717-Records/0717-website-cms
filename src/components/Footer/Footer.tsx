'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { SocialIcon, type SocialPlatform, getPlatformLabel } from '@/utils/socialIcons';
import { cleanPlatform } from '@/utils/cleanPlatform';
import CTAEmailButton from '@/components/UI/CTAEmailButton';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import type { FOOTER_QUERYResult, HEADER_QUERYResult, SITE_SETTINGS_QUERYResult } from '@/sanity/types';

interface FooterMessage {
  _key: string;
  title?: string | null;
  message?: string | null;
}

interface FooterProps {
  footerData: FOOTER_QUERYResult | null;
  headerData: HEADER_QUERYResult | null;
  siteSettingsData: SITE_SETTINGS_QUERYResult | null;
}

const Footer = ({ footerData, headerData, siteSettingsData }: FooterProps) => {
  // Get company links from site settings, filtering out hidden ones and invalid entries
  const companyLinks = siteSettingsData?.companyLinks?.socialLinksArray?.filter(
    (link) =>
      link.url && 
      link.platform && 
      typeof link.platform === 'string' && 
      link.platform.trim() !== '' &&
      !link.hideFromFooter // Hide links marked as hideFromFooter
  ) || [];

  // Transform company links to display format
  const transformedLinks = companyLinks.map((link) => {
    const platform = cleanPlatform(link.platform) as SocialPlatform;

    return {
      _key: link._key,
      platform,
      url: link.url!,
      label: platform === 'genericLink' ? link.customTitle || 'Link' : getPlatformLabel(platform),
    };
  });

  // Cast footer data to include proper footerMessages array and logo
  const footerMessages = footerData?._type === 'footer' ? (footerData as unknown as { footerMessages?: FooterMessage[] })?.footerMessages : null;
  const footerLogo = footerData?._type === 'footer' ? (footerData as unknown as { logo?: { asset?: object; alt?: string; hotspot?: object; crop?: object } })?.logo : null;

  return (
    <footer
      className='bg-black text-white py-10 px-6 md:px-16 w-full'
      aria-label='Site Footer'>
      {/* Mobile Layout */}
      <div className='flex flex-col md:hidden items-center text-center space-y-8'>
        {/* Logo */}
        <Link href='/#home' className='flex items-center gap-2'>
          {footerLogo ? (
            <Image
              src={urlFor(footerLogo).url()}
              alt={footerLogo.alt || '07:17 Records'}
              width={200}
              height={125}
              className='object-contain w-[160px] md:w-[200px] h-auto'
              {...createSanityDataAttribute(footerData?._id, 'footer', 'logo')}
            />
          ) : headerData?.logo ? (
            <Image
              src={urlFor(headerData.logo).url()}
              alt={headerData.logo.alt || '07:17 Records'}
              width={200}
              height={125}
              className='object-contain w-[160px] md:w-[200px] h-auto'
              {...createSanityDataAttribute(headerData._id, 'header', 'logo')}
            />
          ) : (
            <div className='flex items-center gap-2'>
              <span className='text-h6 font-bold'>07:17</span>
              <span className='text-body-lg font-semibold'>Records</span>
            </div>
          )}
        </Link>

        {/* Messages */}
        {footerMessages && footerMessages.length > 0 && (
          <div className='space-y-4'>
            {footerMessages.map((message) => (
              <div key={message._key} className='space-y-1'>
                {message.title && (
                  <div className='font-bold text-brand-secondary text-body-lg'>{message.title}</div>
                )}
                {message.message && (
                  <div className='text-white text-body-lg'>{message.message}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Email Button */}
        {siteSettingsData?.companyEmail && (
          <div className='flex justify-center'>
            <CTAEmailButton 
              email={siteSettingsData.companyEmail}
              className='text-body-base font-medium'
            />
          </div>
        )}

        {/* Company Links */}
        {transformedLinks.length > 0 && (
          <div 
            className='flex flex-wrap justify-center gap-6'
            {...createSanityDataAttribute('siteSettings', 'siteSettings', 'companyLinks')}>
            {transformedLinks.map((link) => (
              <Link
                key={link._key}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}
                title={link.label} // Hover text
                className='group transition-transform duration-200 hover:scale-105'
                {...createSanityDataAttribute('siteSettings', 'siteSettings', `companyLinks.socialLinksArray[_key=="${link._key}"]`)}>
                <div className='w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center'>
                  <SocialIcon
                    platform={link.platform}
                    className='text-black text-3xl transition-transform duration-200 group-hover:scale-110'
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Copyright */}
        {footerData?._type === 'footer' && footerData.copyrightText && (
          <div className='text-white text-body-sm'>{footerData.copyrightText}</div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className='hidden md:flex justify-between'>
        {/* Left Side - Logo, Messages, Copyright */}
        <div className='flex-1 max-w-[50%] flex flex-col gap-8'>
          {/* Logo */}
          <Link href='/#home' className='flex items-center gap-2'>
            {footerLogo ? (
              <Image
                src={urlFor(footerLogo).url()}
                alt={footerLogo.alt || '07:17 Records'}
                width={200}
                height={125}
                className='object-contain w-[160px] md:w-[200px] h-auto'
                {...createSanityDataAttribute(footerData?._id, 'footer', 'logo')}
              />
            ) : headerData?.logo ? (
              <Image
                src={urlFor(headerData.logo).url()}
                alt={headerData.logo.alt || '07:17 Records'}
                width={200}
                height={125}
                className='object-contain w-[160px] md:w-[200px] h-auto'
                {...createSanityDataAttribute(headerData._id, 'header', 'logo')}
              />
            ) : (
              <div className='flex items-center gap-2'>
                <span className='text-h6 font-bold'>07:17</span>
                <span className='text-body-lg font-semibold'>Records</span>
              </div>
            )}
          </Link>

          {/* Messages */}
          {footerMessages && footerMessages.length > 0 && (
            <div className='space-y-4'>
              {footerMessages.map((message) => (
                <div key={message._key} className='space-y-1'>
                  {message.title && (
                    <div className='font-bold text-brand-secondary text-body-lg'>{message.title}</div>
                  )}
                  {message.message && (
                    <div className='text-white text-body-lg'>{message.message}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Copyright */}
          {footerData?._type === 'footer' && footerData.copyrightText && (
            <div className='text-white text-body-sm mt-auto'>{footerData.copyrightText}</div>
          )}
        </div>

        {/* Right Side - CTA Email Button, Company Links */}
        <div className='flex-1 max-w-[50%] flex flex-col items-end gap-8'>
          {/* CTA Email Button */}
          {siteSettingsData?.companyEmail && (
            <CTAEmailButton 
              email={siteSettingsData.companyEmail}
              className='text-body-base font-medium'
            />
          )}

          {/* Company Links */}
          {transformedLinks.length > 0 && (
            <div 
              className='flex flex-wrap justify-end gap-6 max-w-full'
              {...createSanityDataAttribute('siteSettings', 'siteSettings', 'companyLinks')}>
              {transformedLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.label}
                  title={link.label} // Hover text
                  className='group transition-transform duration-200 hover:scale-105'
                  {...createSanityDataAttribute('siteSettings', 'siteSettings', `companyLinks.socialLinksArray[_key=="${link._key}"]`)}>
                  <div className='w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center'>
                    <SocialIcon
                      platform={link.platform}
                      className='text-black text-4xl transition-transform duration-200 group-hover:scale-110'
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
