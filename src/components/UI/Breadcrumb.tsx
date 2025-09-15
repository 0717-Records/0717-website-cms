'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface BreadcrumbProps {
  /** The current page title */
  pageTitle: string;
  /** Whether the page title should be clickable (for blog posts) */
  pageTitleClickable?: boolean;
  /** The href for clickable page title (e.g., '/blog' for blog posts) */
  pageTitleHref?: string;
}

const Breadcrumb = ({ pageTitle, pageTitleClickable = false, pageTitleHref }: BreadcrumbProps) => {
  return (
    <nav
      className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-body-sm"
      aria-label="Breadcrumb"
    >
      {/* Home Icon */}
      <Link
        href="/"
        className="flex items-center hover:text-white/80 transition-colors duration-200"
        aria-label="Go to home page"
      >
        <FaHome className="text-body-base" />
      </Link>

      {/* Separator */}
      <span className="text-white/60" aria-hidden="true">
        &gt;
      </span>

      {/* Page Title */}
      {pageTitleClickable && pageTitleHref ? (
        <Link
          href={pageTitleHref}
          className="hover:text-white/80 transition-colors duration-200"
        >
          {pageTitle}
        </Link>
      ) : (
        <span className="text-white/80">
          {pageTitle}
        </span>
      )}
    </nav>
  );
};

export default Breadcrumb;