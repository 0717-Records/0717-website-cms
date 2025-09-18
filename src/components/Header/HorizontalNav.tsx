'use client';

import React from 'react';
import Link from 'next/link';
import { HorizontalNavData, getHorizontalNavLinkProps, getHorizontalNavLinkLabel } from '@/utils/navigationHelpers';

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
      {/* RESPONSIVE VISIBILITY: lg:flex breakpoint must align with VerticalNav hideOnDesktop logic */}
      {/* ⚠️ IMPORTANT: If this 'lg:flex' changes, update VerticalNav.tsx hideOnDesktop 'lg:hidden' accordingly */}
      <ul className='hidden lg:flex items-center gap-6'>
        {visibleLinks.map((link, index) => {
          const linkProps = getHorizontalNavLinkProps(link);
          const label = getHorizontalNavLinkLabel(link);
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
