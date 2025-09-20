'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import UnifiedImage from '@/components/UI/UnifiedImage';
import MenuButton from '../MenuButton';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import Divider from '@/components/UI/Divider';
import {
  VerticalNavData,
  VerticalNavCTAData,
  isNavigationSection,
  isNavigationLink,
  getNavLinkProps,
  getNavLinkLabel,
} from '@/utils/navigationHelpers';
import CTAList from '@/components/UI/CTAList';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from './VerticalNav.module.css';

interface VerticalNavProps {
  isMenuOpen: boolean;
  onClose: () => void;
  navLinks: VerticalNavData | null;
  navCtas: VerticalNavCTAData | null;
}

const VerticalNav = ({ isMenuOpen, onClose, navLinks, navCtas }: VerticalNavProps) => {
  useBodyScrollLock(isMenuOpen);
  const focusTrapRef = useFocusTrap(isMenuOpen);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [headerVariation, setHeaderVariation] = useState('white');
  const [useWhiteLogo, setUseWhiteLogo] = useState(false);

  // Scroll to top when menu opens
  useEffect(() => {
    if (isMenuOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isMenuOpen]);

  // Check header style function
  const checkHeaderStyle = useCallback(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const headerStyle = getComputedStyle(header);
    const backgroundColor = headerStyle.backgroundColor;
    const background = headerStyle.background;
    const backdropFilter = headerStyle.backdropFilter;

    // Determine header variation based on styles
    if (backgroundColor === 'rgb(0, 0, 0)' || backgroundColor === 'rgba(0, 0, 0, 1)') {
      setHeaderVariation('black');
      setUseWhiteLogo(true);
    } else if (
      background.includes('linear-gradient') &&
      (background.includes('fffacc') || background.includes('rgb(255, 250, 204)'))
    ) {
      // Check for yellow gradient - also check for RGB equivalent of #fffacc
      setHeaderVariation('yellow');
      setUseWhiteLogo(false);
    } else if (background.includes('linear-gradient') && background.includes('0, 0, 0')) {
      if (backdropFilter.includes('blur')) {
        setHeaderVariation('blurredGradient');
      } else {
        setHeaderVariation('darkGradient');
      }
      setUseWhiteLogo(true);
    } else if (backgroundColor.includes('rgba(0, 0, 0, 0.8)') && backdropFilter.includes('blur')) {
      setHeaderVariation('blurred');
      setUseWhiteLogo(true);
    } else {
      setHeaderVariation('white');
      setUseWhiteLogo(false);
    }
  }, []);

  // Listen for header variation changes by observing the main header
  useEffect(() => {
    // Initial check
    checkHeaderStyle();

    // Create mutation observer to watch for header style changes
    const observer = new MutationObserver(checkHeaderStyle);
    const header = document.querySelector('header');

    if (header) {
      observer.observe(header, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true,
      });
    }

    // Also listen for style changes with a periodic check as backup
    const interval = setInterval(checkHeaderStyle, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [checkHeaderStyle]);

  return (
    <div
      className={`fixed inset-0 z-60 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
      {/* Background Overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : styles.overlayClosed}`}
        onClick={onClose}
      />

      {/* Menu Sidebar */}
      <div
        ref={(el) => {
          // Type assertion is safe here since div element extends HTMLElement
          focusTrapRef.current = el as HTMLElement;
        }}
        id='mobile-navigation-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Main navigation menu'
        className={`fixed top-0 right-0 h-full w-90 max-w-screen bg-white bg-opacity-90 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Menu Header */}
        <div
          className={`flex items-center justify-between px-4 h-18 md:h-20 transition-all duration-300 ${
            headerVariation === 'white'
              ? 'bg-white'
              : headerVariation === 'black'
                ? 'bg-black'
                : headerVariation === 'yellow'
                  ? ''
                  : headerVariation === 'darkGradient'
                    ? ''
                    : headerVariation === 'blurred'
                      ? ''
                      : headerVariation === 'blurredGradient'
                        ? ''
                        : 'bg-white '
          }`}
          style={{
            background:
              headerVariation === 'yellow'
                ? 'linear-gradient(135deg, #fffacc 0%, #fffef0 25%, #ffffff 50%, #fffef0 75%, #fffacc 100%)'
                : headerVariation === 'darkGradient'
                  ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #3a3a3a 50%, #1a1a1a 75%, #000000 100%)'
                  : headerVariation === 'blurred'
                    ? 'rgba(0, 0, 0, 0.8)'
                    : headerVariation === 'blurredGradient'
                      ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 26, 0.8) 25%, rgba(58, 58, 58, 0.8) 50%, rgba(26, 26, 26, 0.8) 75%, rgba(0, 0, 0, 0.8) 100%)'
                      : undefined,
            backdropFilter:
              headerVariation === 'blurred' || headerVariation === 'blurredGradient'
                ? 'blur(10px)'
                : undefined,
            WebkitBackdropFilter:
              headerVariation === 'blurred' || headerVariation === 'blurredGradient'
                ? 'blur(10px)'
                : undefined,
          }}>
          {/* Logo in Menu */}
          <Link href='/' onClick={onClose} className='flex items-center gap-2'>
            <div className='relative w-[160px] h-[60px]'>
              <UnifiedImage
                src={useWhiteLogo ? '/images/logo-text-white.png' : '/images/logo-text-black.png'}
                alt='07:17 Records Logo'
                mode='fill'
                sizeContext='logo'
                objectFit='contain'
                sizes='160px'
              />
            </div>
          </Link>

          {/* Close Button */}
          <MenuButton
            variant='close'
            onClick={onClose}
            className={useWhiteLogo ? 'text-white' : 'text-black'}
          />
        </div>

        {/* Menu Navigation */}
        <div
          ref={scrollContainerRef}
          className='flex-1 overflow-y-auto overflow-x-hidden bg-gray-50'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db transparent',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.scrollbarColor = '#9ca3af transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.scrollbarColor = '#d1d5db transparent';
          }}>
          <nav className='px-10 py-10'>
            <div className='space-y-8'>
              {navLinks && navLinks.length > 0 ? (
                <>
                  {navLinks
                    .filter((section) => {
                      if (!isNavigationSection(section)) return false;
                      // Filter out sections that should be hidden entirely
                      if (section.hideSection) return false;
                      // Filter out sections hidden on desktop if we're on desktop
                      // RESPONSIVE VISIBILITY: hideOnDesktop aligns with HorizontalNav's lg breakpoint
                      // ⚠️ IMPORTANT: If HorizontalNav.tsx line 25 'lg:flex' changes, update this 'lg:hidden' accordingly
                      return true; // Let CSS handle desktop hiding
                    })
                    .map((section, sectionIndex, filteredSections) => {
                      if (!isNavigationSection(section)) return null;

                      // RESPONSIVE VISIBILITY: hideOnDesktop aligns with HorizontalNav's lg breakpoint
                      // ⚠️ IMPORTANT: If HorizontalNav.tsx line 25 'lg:flex' changes, update this 'lg:hidden' accordingly
                      const sectionVisibilityClass = section.hideOnDesktop ? 'lg:hidden' : '';

                      return (
                        <div key={`nav-section-${sectionIndex}`} className={sectionVisibilityClass}>
                          {/* Section Heading */}
                          {section.heading && (
                            <div className='mb-4'>
                              <h3 className='text-text-subtle text-body-sm uppercase tracking-wide'>
                                {section.heading}
                              </h3>
                            </div>
                          )}

                          {/* Section Links */}
                          <div className='space-y-4'>
                            {section.links?.map((link, linkIndex) => {
                              if (!isNavigationLink(link)) return null;

                              // Skip hidden navigation links
                              if (link.hideLink) return null;

                              const linkProps = getNavLinkProps(link);
                              const label = getNavLinkLabel(link);
                              const isExternal = link.linkType === 'external' || link.openInNewTab;

                              // RESPONSIVE VISIBILITY: hideOnDesktop aligns with HorizontalNav's lg breakpoint
                              // ⚠️ IMPORTANT: If HorizontalNav.tsx line 25 'lg:flex' changes, update this 'lg:hidden' accordingly
                              const linkVisibilityClass = link.hideOnDesktop ? 'lg:hidden' : '';

                              return (
                                <div
                                  key={`nav-link-${sectionIndex}-${linkIndex}`}
                                  className={linkVisibilityClass}>
                                  <Link
                                    {...linkProps}
                                    onClick={onClose}
                                    className='flex items-center justify-between w-full uppercase font-medium text-black hover:text-brand-secondary transition-colors'>
                                    <span>{label}</span>
                                    {isExternal && (
                                      <FaExternalLinkAlt className='text-body-xs text-current ml-2 flex-shrink-0' />
                                    )}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>

                          {/* Add divider between sections (but not after the last section) */}
                          {sectionIndex < filteredSections.length - 1 && (
                            <div className='pt-6'>
                              <Divider isSmall alignment='left' />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='text-body-base text-gray-500 text-center'>
                  No navigation links configured
                </div>
              )}

              {/*
                ========================================
                DELETE THIS ENTIRE BLOCK BEFORE PRODUCTION
                From this comment down to the "END DELETE BLOCK" comment
                ========================================
              */}
              <div className='py-2'>
                <Divider isSmall alignment='left' />
              </div>
              <div>
                <Link
                  href='/home-hero-2'
                  onClick={onClose}
                  className='block uppercase font-medium text-gray-500 hover:text-brand-secondary transition-colors text-body-sm'>
                  Demo Hero 2
                </Link>
              </div>
              <div>
                <Link
                  href='/home-hero-3'
                  onClick={onClose}
                  className='block uppercase font-medium text-gray-500 hover:text-brand-secondary transition-colors text-body-sm'>
                  Demo Hero 3
                </Link>
              </div>
              <div>
                <Link
                  href='/home-hero-4'
                  onClick={onClose}
                  className='block uppercase font-medium text-gray-500 hover:text-brand-secondary transition-colors text-body-sm'>
                  Demo Hero 4
                </Link>
              </div>
              <div>
                <Link
                  href='/home-hero-5'
                  onClick={onClose}
                  className='block uppercase font-medium text-gray-500 hover:text-brand-secondary transition-colors text-body-sm'>
                  Demo Hero 5
                </Link>
              </div>
              {/*
                ========================================
                END DELETE BLOCK - DELETE UP TO HERE
                ========================================
              */}

              {/* Navigation CTAs */}
              {navCtas && navCtas.length > 0 && (
                <>
                  {/* Separator line between navigation and CTAs */}
                  <div className='pt-6 border-t border-gray-300'>
                    {/* CTAs rendered in vertical column with full width */}
                    <div className='pt-6'>
                      <CTAList ctaList={navCtas} alignment='flex-col' fullWidth={true} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
