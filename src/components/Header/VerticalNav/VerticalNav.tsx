'use client';

import React, { useRef, useEffect } from 'react';
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

  // Scroll to top when menu opens
  useEffect(() => {
    if (isMenuOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isMenuOpen]);

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
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          {/* Logo in Menu */}
          <Link href='/' onClick={onClose} className='flex items-center gap-2'>
            <div className='relative w-[160px] h-[60px]'>
              <UnifiedImage
                src='/images/logo-text-black.png'
                alt='07:17 Records Logo'
                mode='fill'
                sizeContext='logo'
                objectFit='contain'
                sizes='160px'
              />
            </div>
          </Link>

          {/* Close Button */}
          <MenuButton variant='close' onClick={onClose} />
        </div>

        {/* Menu Navigation */}
        <div
          ref={scrollContainerRef}
          className='flex-1 overflow-y-auto overflow-x-hidden'
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
