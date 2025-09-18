'use client';

import React from 'react';

type ButtonVariant = 'hamburger' | 'close';

interface MenuButtonProps {
  variant: ButtonVariant;
  isMenuOpen?: boolean;
  onClick: () => void;
  className?: string;
  ariaControls?: string;
}

const MenuButton = ({ variant, isMenuOpen = false, onClick, className = '', ariaControls }: MenuButtonProps) => {
  if (variant === 'close') {
    return (
      <button
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none hover:text-brand-secondary transition-colors ${className}`}
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
    );
  }

  // Hamburger variant
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-center items-center w-8 h-8 cursor-pointer focus:outline-none group ${className}`}
      aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
      aria-expanded={isMenuOpen}
      aria-controls={ariaControls}>
      <span
        className={`block w-6 h-0.5 bg-black group-hover:bg-brand-secondary transition-all duration-300 transform origin-center ${
          isMenuOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-black group-hover:bg-brand-secondary transition-all duration-300 mt-1.5 ${
          isMenuOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-black group-hover:bg-brand-secondary transition-all duration-300 mt-1.5 transform origin-center ${
          isMenuOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
};

export default MenuButton;
