'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import type { HEADER_QUERYResult } from '@/sanity/types';
import Navbar from './Navbar';
import MenuButton from './MenuButton';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '#about', label: 'EXPLORE' },
  { href: '#artists', label: 'CONNECT' },
  { href: '#events', label: 'ENGAGE' },
  { href: '#news', label: 'SHOP' },
  { href: '#contact', label: 'DISCOVER' },
];

interface HeaderProps {
  headerData: HEADER_QUERYResult | null;
}

const Header = ({ headerData }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  /* 
    HEADER HEIGHT DEFINITION:
    Desktop: h-24 (6rem = 96px)
    Mobile: h-20 (5rem = 80px)
    
    ⚠️ IMPORTANT: If these heights are changed, update the corresponding values in:
    src/components/HomeHero/styles.module.css
  */
  return (
    <>
      <header className='w-full px-4 md:px-8 h-20 md:h-24 flex items-center justify-between sticky top-0 z-30 bg-white'>
        {/* Logo */}
        <Link href='/#home' className='flex items-center gap-2'>
          {headerData?.logo ? (
            <Image
              src={urlFor(headerData.logo).url()}
              alt={headerData.logo.alt || '07:17 Records'}
              width={200}
              height={125}
              className='object-contain w-[160px] md:w-[200px] h-auto'
              {...createSanityDataAttribute(headerData._id, 'header', 'logo')}
            />
          ) : (
            <>
              <span className='text-body-xl md:text-h6 font-bold'>07:17</span>
              <span className='hidden md:inline text-body-sm md:text-body-lg font-semibold'>Records</span>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <Navbar navLinks={navLinks} />

        {/* Hamburger Menu Button */}
        <MenuButton variant='hamburger' isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        headerData={headerData}
      />
    </>
  );
};

export default Header;
