import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HEADER_QUERYResult } from '@/sanity/types';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#artists', label: 'Artists' },
  { href: '#events', label: 'Events' },
  { href: '#news', label: 'News' },
  { href: '#contact', label: 'Contact' },
];

interface HeaderProps {
  headerData: HEADER_QUERYResult | null;
}

const Header = ({ headerData }: HeaderProps) => {
  return (
    <header className='w-full px-4 md:px-8 py-4 flex items-center justify-between backdrop-blur sticky top-0 z-30 border-b'>
      {/* Logo */}
      <Link href='/' className='flex items-center gap-2'>
        {headerData?.logo ? (
          <Image
            src={urlFor(headerData.logo).url()}
            alt={headerData.title || '07:17 Records'}
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
      {/* Nav */}
      <nav>
        <ul className='flex items-center gap-6'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='text-base font-medium hover:text-yellow-400 transition-colors'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
