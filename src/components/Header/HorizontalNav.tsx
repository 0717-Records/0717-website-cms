'use client';

import React from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface HorizontalNavProps {
  navLinks: NavLink[];
}

const HorizontalNav = ({ navLinks }: HorizontalNavProps) => {
  return (
    <nav className=''>
      <ul className='hidden lg:flex items-center gap-6'>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className='text-body-xl font-medium hover:text-brand-secondary transition-colors'>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
