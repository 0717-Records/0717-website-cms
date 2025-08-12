'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HEADER_QUERYResult } from '@/sanity/types';

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
        <Link href='/' className='flex items-center gap-2'>
          {headerData?.logo ? (
            <Image
              src={urlFor(headerData.logo).url()}
              alt={headerData.logo.alt || '07:17 Records'}
              width={200}
              height={125}
              className='object-contain'
            />
          ) : (
            <>
              <span className='text-2xl font-bold'>07:17</span>
              <span className='hidden md:inline text-lg font-semibold'>Records</span>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden xl:block'>
          <ul className='flex items-center gap-6'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-2xl font-medium hover:text-yellow-400 transition-colors'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className='xl:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer'
          aria-label='Toggle menu'>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 mt-1.5 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 mt-1.5 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={closeMenu}
        />

        {/* Menu Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          {/* Menu Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200'>
            {/* Logo in Menu */}
            <Link href='/' onClick={closeMenu} className='flex items-center gap-2'>
              {headerData?.logo ? (
                <Image
                  src={urlFor(headerData.logo).url()}
                  alt={headerData.logo.alt || '07:17 Records'}
                  width={120}
                  height={75}
                  className='object-contain'
                />
              ) : (
                <>
                  <span className='text-xl font-bold'>07:17</span>
                  <span className='text-sm font-semibold'>Records</span>
                </>
              )}
            </Link>

            {/* Close Button */}
            <button
              onClick={closeMenu}
              className='w-8 h-8 flex items-center justify-center'
              aria-label='Close menu'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className='flex flex-col justify-center flex-1 px-6 py-12'>
            <ul className='space-y-8'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className='block text-3xl font-bold text-black hover:text-yellow-400 transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
