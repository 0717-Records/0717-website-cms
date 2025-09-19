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

const quickLinks = [
  { label: 'Artists', url: '/artists' },
  { label: 'Releases', url: '/releases' },
  { label: 'Events', url: '/events' },
  { label: 'Blog', url: '/blog' },
  { label: 'Collaborations', url: '/collabs' },
  { label: 'About', url: '/about' },
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

// Variation 2: Subtle Glass Effect with Vertical Layout
export const FooterVariation2: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-white/80 backdrop-blur-md text-gray-800 py-16 px-6 md:px-16 w-full border-t border-white/30 ${className}`}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          {/* Logo and Description */}
          <div className='text-center space-y-6'>
            <Link href='/' className='inline-block'>
              <div className='flex flex-col items-center gap-1'>
                <span className='text-h3 font-bold text-gray-900'>07:17</span>
                <span className='text-h5 font-semibold text-brand-primary'>Records</span>
              </div>
            </Link>
            <div className='text-body-sm text-gray-600 max-w-xs mx-auto leading-relaxed'>
              Independent record label supporting artists and music creation.
            </div>
            <Link
              href='mailto:info@0717records.com'
              className='inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors text-body-sm font-medium'>
              <FaEnvelope />
              Get in Touch
            </Link>
          </div>

          {/* Quick Links */}
          <div className='text-center space-y-6'>
            <div className='font-semibold text-gray-900 text-body-lg'>Quick Links</div>
            <div className='space-y-3'>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='block text-gray-600 hover:text-brand-primary transition-colors text-body-sm'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className='text-center space-y-6'>
            <div className='font-semibold text-gray-900 text-body-lg'>Our Message</div>
            <div className='space-y-4'>
              {footerMessages.map((message, index) => (
                <div key={index} className='space-y-2'>
                  <div className='font-medium text-gray-900 text-body-sm'>{message.title}</div>
                  <div className='text-gray-600 text-body-xs italic'>{message.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex flex-wrap justify-center gap-3 mb-8 py-6 border-t border-white/30'>
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              className='w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm'
              title={link.label}>
              <SocialIcon platform={link.platform} className='text-body-sm' />
            </Link>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-body-xs text-gray-500 border-t border-white/30 pt-6'>
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

// Variation 3: Soft Gradient Background with Vertical Stacks
export const FooterVariation3: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gradient-to-b from-gray-50/90 to-white/90 text-gray-800 py-16 px-6 md:px-16 w-full border-t border-gray-100/50 ${className}`}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
          {/* Logo */}
          <div className='text-center space-y-4'>
            <Link href='/' className='inline-block'>
              <div className='flex flex-col items-center gap-1'>
                <span className='text-h3 font-bold text-gray-900'>07:17</span>
                <span className='text-h5 font-semibold text-brand-primary'>Records</span>
              </div>
            </Link>
            <div className='text-body-xs text-gray-500'>Est. 2025</div>
          </div>

          {/* Quick Links */}
          <div className='text-center space-y-4'>
            <div className='font-semibold text-gray-900 text-body-base'>Explore</div>
            <div className='space-y-2'>
              {quickLinks.slice(0, 4).map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='block text-gray-600 hover:text-brand-primary transition-colors text-body-sm'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className='text-center space-y-4'>
            <div className='font-semibold text-gray-900 text-body-base'>Messages</div>
            <div className='space-y-3'>
              {footerMessages.map((message, index) => (
                <div key={index} className='space-y-1'>
                  <div className='font-medium text-gray-800 text-body-sm'>{message.title}</div>
                  <div className='text-gray-600 text-body-xs'>{message.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='text-center space-y-4'>
            <div className='font-semibold text-gray-900 text-body-base'>Connect</div>
            <div className='space-y-3'>
              <Link
                href='mailto:info@0717records.com'
                className='inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-body-sm hover:bg-brand-primary hover:text-white transition-all'>
                <FaEnvelope className='text-body-xs' />
                Email Us
              </Link>
              <div className='flex flex-wrap justify-center gap-2'>
                {socialLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.platform}
                    href={link.url}
                    className='w-8 h-8 rounded-full bg-gray-200/70 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all'
                    title={link.label}>
                    <SocialIcon platform={link.platform} className='text-body-xs' />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-body-xs text-gray-500 border-t border-gray-200/50 pt-6'>
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

// Variation 4: Paper Texture Effect with Centered Vertical Layout
export const FooterVariation4: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-50/95 text-gray-800 py-16 px-6 md:px-16 w-full relative ${className}`} style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)`,
      backgroundSize: '20px 20px'
    }}>
      <div className='container mx-auto max-w-4xl'>
        {/* Header */}
        <div className='text-center mb-16 space-y-6'>
          <Link href='/' className='inline-block'>
            <div className='flex flex-col items-center gap-2'>
              <span className='text-h2 font-bold text-gray-900'>07:17</span>
              <span className='text-h4 font-semibold text-brand-primary'>Records</span>
            </div>
          </Link>
          <div className='text-body-base text-gray-600 max-w-md mx-auto leading-relaxed'>
            An independent record label dedicated to discovering and nurturing exceptional musical talent.
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
          {/* Quick Links */}
          <div className='text-center space-y-6'>
            <div className='font-semibold text-gray-900 text-body-lg'>Navigate</div>
            <div className='space-y-3'>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='block text-gray-600 hover:text-brand-primary transition-colors text-body-sm'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className='text-center space-y-6'>
            <div className='font-semibold text-gray-900 text-body-lg'>Our Values</div>
            <div className='space-y-4'>
              {footerMessages.map((message, index) => (
                <div key={index} className='space-y-2 p-4 bg-white/60 rounded-lg border border-gray-200/30'>
                  <div className='font-medium text-gray-900 text-body-sm'>{message.title}</div>
                  <div className='text-gray-600 text-body-xs italic leading-relaxed'>{message.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className='text-center space-y-6'>
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

        {/* Contact and Social */}
        <div className='text-center space-y-8 border-t border-gray-200/50 pt-12'>
          <Link
            href='mailto:info@0717records.com'
            className='inline-flex items-center gap-3 bg-white/80 border border-gray-200/50 text-brand-primary px-6 py-3 rounded-full font-medium hover:bg-brand-primary hover:text-white transition-all shadow-sm'>
            <FaEnvelope />
            info@0717records.com
          </Link>

          <div className='flex flex-wrap justify-center gap-3'>
            {socialLinks.map((link) => (
              <Link
                key={link.platform}
                href={link.url}
                className='w-10 h-10 rounded-full bg-white/80 border border-gray-200/50 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm'
                title={link.label}>
                <SocialIcon platform={link.platform} className='text-body-sm' />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-body-xs text-gray-500 border-t border-gray-200/50 pt-8 mt-12'>
          {copyrightText}
        </div>
      </div>
    </footer>
  );
};

// Variation 5: Frosted Glass Effect with Vertical Sections
export const FooterVariation5: React.FC<FooterVariationProps> = ({ className = '' }) => {
  return (
    <footer className={`relative py-16 px-6 md:px-16 w-full ${className}`} style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className='absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5'></div>

      <div className='container mx-auto relative z-10'>
        {/* Logo Header */}
        <div className='text-center mb-16'>
          <Link href='/' className='inline-block'>
            <div className='flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20'>
              <span className='text-h2 font-bold text-gray-900'>07:17</span>
              <span className='text-h4 font-semibold text-brand-primary'>Records</span>
              <div className='text-body-xs text-gray-600 mt-2'>Independent Music Label</div>
            </div>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
          {/* Quick Links */}
          <div className='text-center space-y-4'>
            <div className='font-semibold text-gray-900 text-body-base mb-6'>Quick Links</div>
            <div className='space-y-2'>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className='block text-gray-700 hover:text-brand-primary transition-colors text-body-sm py-1 px-3 rounded-md hover:bg-white/20'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className='md:col-span-2 text-center space-y-6'>
            <div className='font-semibold text-gray-900 text-body-base mb-6'>Our Mission</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {footerMessages.map((message, index) => (
                <div key={index} className='p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 space-y-2'>
                  <div className='font-medium text-gray-900 text-body-sm flex items-center justify-center gap-2'>
                    <FaHeart className='text-brand-primary text-body-xs' />
                    {message.title}
                  </div>
                  <div className='text-gray-700 text-body-xs leading-relaxed'>{message.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='text-center space-y-4'>
            <div className='font-semibold text-gray-900 text-body-base mb-6'>Connect</div>
            <div className='space-y-4'>
              <Link
                href='mailto:info@0717records.com'
                className='inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm border border-white/30 text-gray-800 px-4 py-3 rounded-full text-body-sm hover:bg-brand-primary hover:text-white transition-all'>
                <FaEnvelope className='text-body-xs' />
                Email Us
              </Link>

              <div className='text-body-xs text-gray-600'>Follow Us</div>
              <div className='flex flex-wrap justify-center gap-2'>
                {socialLinks.slice(0, 6).map((link) => (
                  <Link
                    key={link.platform}
                    href={link.url}
                    className='w-8 h-8 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all'
                    title={link.label}>
                    <SocialIcon platform={link.platform} className='text-body-xs' />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-body-xs text-gray-600 border-t border-white/20 pt-8'>
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