'use client';

import React from 'react';
import Link from 'next/link';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { SocialIcon, type SocialPlatform, getPlatformLabel } from '@/utils/socialIcons';
import { cleanPlatform } from '@/utils/cleanPlatform';
import CTAEmailButton from '@/components/UI/CTAEmailButton';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { detectPlatformFromUrl } from '@/sanity/schemaTypes/shared/platformsConfig';
import { usePageLoad } from '@/contexts/PageLoadContext';
import type {
  FOOTER_QUERYResult,
  SITE_SETTINGS_QUERYResult,
  COMPANY_LINKS_QUERYResult,
} from '@/sanity/types';

interface FooterMessage {
  _key: string;
  title?: string | null;
  message?: string | null;
}

interface FooterProps {
  footerData: FOOTER_QUERYResult | null;
  siteSettingsData: SITE_SETTINGS_QUERYResult | null;
  companyLinksData: COMPANY_LINKS_QUERYResult | null;
}

const Footer = ({ footerData, siteSettingsData, companyLinksData }: FooterProps) => {
  const { isPageReady } = usePageLoad();

  // Get company links from company links data, filtering out hidden ones and invalid entries
  const companyLinks =
    companyLinksData?.companyLinks?.socialLinksArray?.filter(
      (link) => {
        if (!link.url || link.hideFromFooter) return false;
        
        // Get final platform from auto-detection or manual selection
        const detected = detectPlatformFromUrl(link.url);
        const finalPlatform = detected?.key || link.platform;
        
        return finalPlatform && typeof finalPlatform === 'string' && finalPlatform.trim() !== '';
      }
    ) || [];

  // Transform company links to display format with final platform values
  const transformedLinks = companyLinks.map((link) => {
    const detected = detectPlatformFromUrl(link.url!);
    const finalPlatform = detected?.key || link.platform;
    const platform = cleanPlatform(finalPlatform) as SocialPlatform;

    return {
      _key: link._key,
      platform,
      url: link.url!,
      label: platform === 'genericLink' ? link.customTitle || 'Link' : getPlatformLabel(platform),
    };
  });

  // Cast footer data to include proper footerMessages array and logo
  const footerMessages =
    footerData?._type === 'footer'
      ? (footerData as unknown as { footerMessages?: FooterMessage[] })?.footerMessages
      : null;
  const footerLogo =
    footerData?._type === 'footer'
      ? (
          footerData as unknown as {
            logo?: { asset?: object; alt?: string; hotspot?: object; crop?: object };
          }
        )?.logo
      : null;

  return (
    <footer 
      className={`bg-black text-white py-10 px-6 md:px-16 w-full transition-opacity duration-500 ease-in-out ${
        isPageReady ? 'opacity-100' : 'opacity-0'
      }`} 
      aria-label='Site Footer'>
      <div className='container md:grid grid-cols-2 grid-rows-[auto_auto] mx-auto'>
        {/* LEFT COLUMN */}
        <div className='flex flex-col items-center md:items-start col-start-1 row-start-1 text-center md:text-left'>
          {/* Logo */}
          <Link href='/#home' className=''>
            {footerLogo ? (
              <UnifiedImage
                src={footerLogo}
                alt={footerLogo.alt || '07:17 Records'}
                mode="sized"
                width={400}
                height={190}
                sizeContext="logo"
                objectFit="contain"
                className='w-[200px] md:w-[300px] h-auto'
                {...createSanityDataAttribute(footerData?._id, 'footer', 'logo')}
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
            <div className='space-y-4 mt-8'>
              {footerMessages.map((message) => (
                <div key={message._key} className='space-y-1'>
                  {message.title && (
                    <div className='font-bold text-brand-secondary'>{message.title}</div>
                  )}
                  {message.message && (
                    <div className='text-white text-body-lg'>{message.message}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className='flex flex-col justify-start items-center md:items-end col-start-2 row-start-1 mt-10 md:mt-0'>
          {/* CTA Email Button */}
          {siteSettingsData?.companyEmail && (
            <CTAEmailButton className='text-body-base font-medium' />
          )}

          {/* Company Links */}
          {transformedLinks.length > 0 && (
            <div
              className='flex flex-wrap justify-center md:justify-end gap-6 max-w-full mt-8'
              {...createSanityDataAttribute('companyLinks', 'companyLinks', 'companyLinks')}>
              {transformedLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.label}
                  title={link.label} // Hover text
                  className='group transition-transform duration-200 hover:scale-105'
                  {...createSanityDataAttribute(
                    'companyLinks',
                    'companyLinks',
                    `companyLinks.socialLinksArray[_key=="${link._key}"]`
                  )}>
                  <div className='w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-gradient flex items-center justify-center'>
                    <SocialIcon
                      platform={link.platform}
                      className='text-black text-body-3xl transition-transform duration-200 group-hover:scale-110'
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        {footerData?._type === 'footer' && footerData.copyrightText && (
          <div className='text-white text-body-sm mt-20 col-start-1 col-span-2 row-start-2 text-center md:text-left'>
            {footerData.copyrightText}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
