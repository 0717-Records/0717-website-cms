'use client';

import React from 'react';
import Link from 'next/link';
import { HorizontalNavData, getNavLinkProps, getNavLinkLabel } from '@/utils/navigationHelpers';

interface HorizontalNavProps {
  navLinks: HorizontalNavData | null;
}

const HorizontalNav = ({ navLinks }: HorizontalNavProps) => {
  if (!navLinks || navLinks.length === 0) {
    return null;
  }

  // Filter out hidden links
  const visibleLinks = navLinks.filter((link) => !link.hideLink);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <nav className=''>
      <ul className='hidden lg:flex items-center gap-6'>
        {visibleLinks.map((link, index) => {
          const linkProps = getNavLinkProps(link);
          const label = getNavLinkLabel(link);
          return (
            <li key={`${link.computedHref}-${index}`}>
              <Link
                {...linkProps}
                className='uppercase font-medium hover:text-brand-secondary transition-colors'>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HorizontalNav;
