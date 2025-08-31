'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import type { HEADER_QUERYResult } from '@/sanity/types';
import MenuButton from '../MenuButton';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import Divider from '@/components/UI/Divider';
import {
  VerticalNavData,
  isNavigationLink,
  isNavigationDivider,
  getNavLinkProps,
  getNavLinkLabel,
} from '@/utils/navigationHelpers';
import styles from './VerticalNav.module.css';

interface VerticalNavProps {
  isMenuOpen: boolean;
  onClose: () => void;
  navLinks: VerticalNavData | null;
  headerData: HEADER_QUERYResult | null;
}

const VerticalNav = ({ isMenuOpen, onClose, navLinks, headerData }: VerticalNavProps) => {
  useBodyScrollLock(isMenuOpen);

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
      {/* Background Overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : styles.overlayClosed}`}
        onClick={onClose}
      />

      {/* Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Menu Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          {/* Logo in Menu */}
          <Link href='/#home' onClick={onClose} className='flex items-center gap-2'>
            {headerData?.logo ? (
              <Image
                src={urlFor(headerData.logo).url()}
                alt={headerData.logo.alt || '07:17 Records'}
                width={160}
                height={100}
                className='object-contain'
                {...createSanityDataAttribute(headerData._id, 'header', 'logo')}
              />
            ) : (
              <>
                <span className='text-body-xl font-bold'>07:17</span>
                <span className='text-body-sm font-semibold'>Records</span>
              </>
            )}
          </Link>

          {/* Close Button */}
          <MenuButton variant='close' onClick={onClose} />
        </div>

        {/* Menu Navigation */}
        <div
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
          }}
          onTouchMove={(e) => {
            // Allow touch scrolling within this container by stopping event propagation
            // This prevents the global touchmove prevention from useBodyScrollLock
            // e.stopPropagation();
          }}>
          <nav className='px-10 py-12'>
            <div className='space-y-6'>
              {navLinks && navLinks.length > 0 ? (
                navLinks.map((item, index) => {
                  if (isNavigationLink(item)) {
                    const linkProps = getNavLinkProps(item);
                    const label = getNavLinkLabel(item);
                    return (
                      <div key={`nav-link-${index}`}>
                        <Link
                          {...linkProps}
                          onClick={onClose}
                          className='block text-body-xl uppercase font-medium text-black hover:text-brand-secondary transition-colors'>
                          {label}
                        </Link>
                      </div>
                    );
                  } else if (isNavigationDivider(item)) {
                    return (
                      <div key={`nav-divider-${index}`} className='py-2'>
                        <Divider isSmall alignment='left' />
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <div className='text-body-base text-gray-500 text-center'>
                  No navigation links configured
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
