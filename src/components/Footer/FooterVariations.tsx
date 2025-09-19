'use client';

import React from 'react';
import Link from 'next/link';
import { SocialIcon, type SocialPlatform } from '@/utils/socialIcons';
import { FaEnvelope, FaHeart } from 'react-icons/fa';

interface FooterVariationProps {
  className?: string;
}

// Hardcoded content for testing variations
const logoText = '07:17 Records';
const footerMessages = [
  { title: 'To All Artists', message: 'Thank you for creating' },
  { title: 'To all our Supporters', message: 'Thanks for your support, we appreciate you!' },
];
const copyrightText = '© 07:17 Records 2025';

const socialLinks = [
  { platform: 'facebook' as SocialPlatform, url: '#', label: 'Facebook' },
  { platform: 'instagram' as SocialPlatform, url: '#', label: 'Instagram' },
  { platform: 'twitter' as SocialPlatform, url: '#', label: 'Twitter' },
  { platform: 'youtube' as SocialPlatform, url: '#', label: 'YouTube' },
  { platform: 'bandcamp' as SocialPlatform, url: '#', label: 'Bandcamp' },
  { platform: 'spotify' as SocialPlatform, url: '#', label: 'Spotify' },
  { platform: 'itunes' as SocialPlatform, url: '#', label: 'Apple Music' },
  { platform: 'soundcloud' as SocialPlatform, url: '#', label: 'SoundCloud' },
];

const legalLinks = [
  { label: 'Terms & Conditions', url: '#' },
  { label: 'Privacy Policy', url: '#' },
  { label: 'Cookie Policy', url: '#' },
  { label: 'Contact Us', url: '#' },
];

// Variation 1: Current Black Design (Enhanced)
export const FooterVariation1: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-black text-white py-12 px-6 md:px-16 w-full ${className}`}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          {/* Logo and Messages */}
          <div className='md:col-span-2 space-y-8'>
            <Link href='/' className='inline-block'>
              <div className='flex items-center gap-2'>
                <span className='text-h3 font-bold text-brand-primary'>07:17</span>
                <span className='text-h4 font-semibold text-white'>Records</span>
              </div>
            </Link>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {footerMessages.map((message, index) => (
                <div key={index} className='space-y-2'>
                  <div className='font-bold text-brand-secondary text-body-lg flex items-center gap-2'>
                    <FaHeart className='text-brand-primary text-body-sm' />
                    {message.title}
                  </div>
                  <div className='text-white text-body-base'>{message.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact and Social */}
          <div className='space-y-8'>
            <div className='text-center md:text-left'>
              <Link
                href='mailto:info@0717records.com'
                className='inline-flex items-center gap-3 bg-brand-gradient text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform'>
                <FaEnvelope />
                Get in Touch
              </Link>
            </div>

            <div className='grid grid-cols-4 gap-4'>
              {socialLinks.slice(0, 8).map((link) => (
                <Link
                  key={link.platform}
                  href={link.url}
                  className='w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center hover:scale-110 transition-transform'
                  title={link.label}>
                  <SocialIcon platform={link.platform} className='text-black text-body-lg' />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-body-sm text-gray-400'>{copyrightText}</div>
            <div className='flex flex-wrap gap-6'>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='text-body-sm text-gray-400 hover:text-brand-primary transition-colors'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Variation 2: Light Transparent Design
export const FooterVariation2: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-transparent text-black py-12 px-6 md:px-16 w-full border-t border-gray-200 ${className}`}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Logo */}
          <div className='lg:col-span-1'>
            <Link href='/' className='inline-block mb-6'>
              <div className='flex items-center gap-2'>
                <span className='text-h4 font-bold text-black'>07:17</span>
                <span className='text-h5 font-semibold text-gray-600'>Records</span>
              </div>
            </Link>
            <div className='text-body-sm text-gray-600'>
              Independent record label supporting artists and music creation.
            </div>
          </div>

          {/* Messages */}
          <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {footerMessages.map((message, index) => (
              <div key={index} className='space-y-2'>
                <div className='font-semibold text-black text-body-base'>{message.title}</div>
                <div className='text-gray-600 text-body-sm'>{message.message}</div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className='lg:col-span-1 space-y-4'>
            <div className='font-semibold text-black text-body-base'>Connect</div>
            <Link
              href='mailto:info@0717records.com'
              className='inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors text-body-sm'>
              <FaEnvelope />
              info@0717records.com
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex flex-wrap justify-center gap-4 mb-8 py-6 border-t border-b border-gray-200'>
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              className='w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all'
              title={link.label}>
              <SocialIcon platform={link.platform} className='text-body-base' />
            </Link>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-gray-500'>
          <div>{copyrightText}</div>
          <div className='flex flex-wrap gap-4'>
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className='hover:text-brand-primary transition-colors'>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Variation 3: Gradient Design
export const FooterVariation3: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary text-white py-12 px-6 md:px-16 w-full ${className}`}>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <Link href='/' className='inline-block mb-6'>
            <div className='flex items-center justify-center gap-3'>
              <span className='text-h2 font-bold text-white'>07:17</span>
              <span className='text-h3 font-semibold text-white/90'>Records</span>
            </div>
          </Link>
          <div className='text-body-lg text-white/90 max-w-2xl mx-auto'>
            Supporting independent artists and creating meaningful music experiences
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
          {footerMessages.map((message, index) => (
            <div key={index} className='text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6'>
              <div className='font-bold text-white text-body-xl mb-3'>{message.title}</div>
              <div className='text-white/90 text-body-base'>{message.message}</div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className='text-center mb-12'>
          <Link
            href='mailto:info@0717records.com'
            className='inline-flex items-center gap-3 bg-white text-brand-primary px-8 py-4 rounded-full font-semibold text-body-lg hover:scale-105 transition-transform shadow-lg'>
            <FaEnvelope />
            Let's Work Together
          </Link>
        </div>

        {/* Social Links */}
        <div className='flex flex-wrap justify-center gap-6 mb-12'>
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              className='w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all'
              title={link.label}>
              <SocialIcon platform={link.platform} className='text-body-xl' />
            </Link>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-white/20 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-body-sm text-white/80'>{copyrightText}</div>
            <div className='flex flex-wrap gap-6'>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='text-body-sm text-white/80 hover:text-white transition-colors'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Variation 4: Minimal Clean Design
export const FooterVariation4: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-50 text-gray-800 py-16 px-6 md:px-16 w-full ${className}`}>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16'>
          {/* Logo and Description */}
          <div className='lg:col-span-4 space-y-6'>
            <Link href='/' className='inline-block'>
              <div className='flex items-center gap-2'>
                <span className='text-h3 font-bold text-gray-900'>07:17</span>
                <span className='text-h4 font-semibold text-brand-primary'>Records</span>
              </div>
            </Link>
            <div className='text-body-base text-gray-600 leading-relaxed'>
              An independent record label dedicated to discovering and nurturing exceptional musical talent.
            </div>
            <Link
              href='mailto:info@0717records.com'
              className='inline-flex items-center gap-2 text-brand-primary font-medium hover:text-brand-secondary transition-colors'>
              <FaEnvelope />
              info@0717records.com
            </Link>
          </div>

          {/* Messages */}
          <div className='lg:col-span-4 space-y-8'>
            <div className='font-semibold text-gray-900 text-body-lg'>Our Message</div>
            {footerMessages.map((message, index) => (
              <div key={index} className='space-y-2'>
                <div className='font-medium text-gray-900 text-body-base'>{message.title}:</div>
                <div className='text-gray-600 text-body-sm italic'>{message.message}</div>
              </div>
            ))}
          </div>

          {/* Legal Links */}
          <div className='lg:col-span-4 space-y-6'>
            <div className='font-semibold text-gray-900 text-body-lg'>Legal</div>
            <div className='space-y-3'>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='block text-gray-600 hover:text-brand-primary transition-colors text-body-sm'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className='border-t border-gray-200 pt-8 mb-8'>
          <div className='flex flex-wrap justify-center gap-3'>
            {socialLinks.map((link) => (
              <Link
                key={link.platform}
                href={link.url}
                className='w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-primary hover:shadow-md transition-all'
                title={link.label}>
                <SocialIcon platform={link.platform} className='text-gray-600 text-body-lg hover:text-brand-primary transition-colors' />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-body-sm text-gray-500 border-t border-gray-200 pt-6'>
          {copyrightText}
        </div>
      </div>
    </footer>
  );
};

// Variation 5: Card-based Design
export const FooterVariation5: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-white py-16 px-6 md:px-16 w-full ${className}`}>
      <div className='container mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <Link href='/' className='inline-block mb-4'>
            <div className='flex items-center justify-center gap-3'>
              <span className='text-h2 font-bold text-brand-primary'>07:17</span>
              <span className='text-h3 font-semibold text-white'>Records</span>
            </div>
          </Link>
          <div className='text-body-lg text-gray-300'>Music • Community • Creativity</div>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {/* Messages Cards */}
          {footerMessages.map((message, index) => (
            <div key={index} className='bg-gray-800 rounded-xl p-8 text-center'>
              <div className='w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaHeart className='text-black text-body-lg' />
              </div>
              <div className='font-bold text-white text-body-lg mb-3'>{message.title}</div>
              <div className='text-gray-300 text-body-sm'>{message.message}</div>
            </div>
          ))}

          {/* Contact Card */}
          <div className='bg-brand-gradient rounded-xl p-8 text-center text-black'>
            <div className='w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaEnvelope className='text-brand-primary text-body-lg' />
            </div>
            <div className='font-bold text-body-lg mb-3'>Get in Touch</div>
            <Link
              href='mailto:info@0717records.com'
              className='text-body-sm hover:underline font-medium'>
              info@0717records.com
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              className='w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all'
              title={link.label}>
              <SocialIcon platform={link.platform} className='text-body-base' />
            </Link>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-body-sm text-gray-400'>{copyrightText}</div>
            <div className='flex flex-wrap gap-6'>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='text-body-sm text-gray-400 hover:text-brand-primary transition-colors'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};