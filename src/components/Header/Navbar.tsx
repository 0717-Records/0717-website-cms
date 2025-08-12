'use client';

import React from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

const Navbar = ({ navLinks }: NavbarProps) => {
  return (
    <nav className='hidden lg:block'>
      <ul className='flex items-center gap-6'>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className='text-xl font-medium hover:text-brand-secondary transition-colors'>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
