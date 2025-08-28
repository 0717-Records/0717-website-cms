'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import type { HEADER_QUERYResult } from '@/sanity/types';
import MenuButton from '../MenuButton';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import styles from './VerticalNav.module.css';

interface NavLink {
  href: string;
  label: string;
}

interface VerticalNavProps {
  isMenuOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
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
        className={`fixed top-0 right-0 h-full w-80 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out ${
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
        <nav className='flex flex-col justify-center flex-1 px-10 py-12'>
          <ul className='space-y-6'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className='block text-body-xl font-medium text-black hover:text-brand-secondary transition-colors'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default VerticalNav;
