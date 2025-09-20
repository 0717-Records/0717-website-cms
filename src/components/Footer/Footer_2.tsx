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
import Divider from '../UI/Divider';

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

const Footer_2 = ({ footerData, siteSettingsData, companyLinksData }: FooterProps) => {
  const { isPageReady } = usePageLoad();

  // Get company links from company links data, filtering out hidden ones and invalid entries
  const companyLinks =
    companyLinksData?.companyLinks?.socialLinksArray?.filter((link) => {
      if (!link.url || link.hideFromFooter) return false;

      // Get final platform from auto-detection or manual selection
      const detected = detectPlatformFromUrl(link.url);
      const finalPlatform = detected?.key || link.platform;

      return finalPlatform && typeof finalPlatform === 'string' && finalPlatform.trim() !== '';
    }) || [];

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

  // Cast footer data to include proper footerMessages array
  const footerMessages =
    footerData?._type === 'footer'
      ? (footerData as unknown as { footerMessages?: FooterMessage[] })?.footerMessages
      : null;

  return (
    <footer
      className={`bg-white text-gray-800 py-10 px-6 md:px-16 w-full transition-opacity duration-500 ease-in-out ${
        isPageReady ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label='Site Footer'>
      <div className='container md:grid grid-cols-3 grid-rows-[auto_auto] mx-auto'>
        {/* LEFT COLUMN */}
        <div className='flex flex-col items-center md:items-start col-start-1 row-start-1 text-center md:text-left'>
          {/* Logo */}
          <Link href='/#home' className='footer-logo'>
            <UnifiedImage
              src='/images/logo-text-black.png'
              alt='07:17 Records Logo'
              mode='sized'
              width={400}
              height={190}
              sizeContext='logo'
              objectFit='contain'
              className='w-[200px] md:w-[300px] h-auto footer-logo'
            />
          </Link>

          {/* Messages */}
          {footerMessages && footerMessages.length > 0 && (
            <div className='space-y-4 mt-8 footer-messages'>
              {footerMessages.map((message) => (
                <div key={message._key} className='space-y-1'>
                  {message.title && (
                    <div className='font-bold text-body-xl text-black footer-message-title'>
                      {message.title}
                    </div>
                  )}
                  {message.message && (
                    <div className='text-gray-800 text-body-lg footer-message-text mb-4'>
                      {message.message}
                    </div>
                  )}
                  <Divider />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CENTER COLUMN - Quick Links */}
        <div className='flex flex-col justify-start items-center col-start-2 row-start-1 mt-10 md:mt-0 text-center md:text-left'>
          <div className='footer-quick-links'>
            <h3 className='text-body-xl font-semibold mb-4 footer-quick-links-title'>
              Quick Links
            </h3>
            <div className='space-y-2'>
              <Link
                href='/artists'
                className='block hover:text-brand-secondary transition-colors duration-200 footer-quick-link'>
                Home
              </Link>
              <Link
                href='/releases'
                className='block hover:text-brand-secondary transition-colors duration-200 footer-quick-link'>
                Blog
              </Link>
              <Link
                href='/events'
                className='block hover:text-brand-secondary transition-colors duration-200 footer-quick-link'>
                All Events
              </Link>
              <Link
                href='/blog'
                className='block hover:text-brand-secondary transition-colors duration-200 footer-quick-link'>
                Services
              </Link>
              <Link
                href='/blog'
                className='block hover:text-brand-secondary transition-colors duration-200 footer-quick-link'>
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className='flex flex-col justify-start items-center md:items-end col-start-3 row-start-1 mt-10 md:mt-0'>
          {/* CTA Email Button */}
          {siteSettingsData?.companyEmail && (
            <CTAEmailButton className='text-body-base font-medium footer-cta-button' />
          )}

          {/* Company Links */}
          {transformedLinks.length > 0 && (
            <div
              className='flex flex-wrap justify-center md:justify-end gap-6 max-w-full mt-8 footer-social-links'
              {...createSanityDataAttribute('companyLinks', 'companyLinks', 'companyLinks')}>
              {transformedLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.label}
                  title={link.label}
                  className='group transition-transform duration-200 hover:scale-105'
                  {...createSanityDataAttribute(
                    'companyLinks',
                    'companyLinks',
                    `companyLinks.socialLinksArray[_key=="${link._key}"]`
                  )}>
                  {/* Brand gradient background for social icons */}
                  <div
                    className='w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center footer-social-icon'
                    style={{ background: 'linear-gradient(to right, #ffea00, #ffc800)' }}>
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

        {/* BOTTOM ROW - Copyright and Legal Links */}
        <div className='col-start-1 col-span-3 row-start-2 mt-20'>
          {/* Separator Line */}
          <div className='w-full h-px bg-gray-300 mb-6 footer-separator'></div>

          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            {/* Copyright */}
            {footerData?._type === 'footer' && footerData.copyrightText && (
              <div className='text-gray-800 text-body-sm footer-copyright'>
                {footerData.copyrightText}
              </div>
            )}

            {/* Legal Links */}
            <div className='flex flex-wrap justify-center gap-6 footer-legal-links'>
              <Link
                href='/terms'
                className='text-gray-800 hover:text-brand-secondary transition-colors duration-200 text-body-sm footer-legal-link'>
                Terms & Conditions
              </Link>
              <Link
                href='/privacy'
                className='text-gray-800 hover:text-brand-secondary transition-colors duration-200 text-body-sm footer-legal-link'>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer_2;
