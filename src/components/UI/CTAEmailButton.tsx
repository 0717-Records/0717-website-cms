'use client';

import React, { useState, useRef } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { useSiteData } from '@/contexts/SiteDataContext';

interface CTAEmailButtonProps {
  className?: string;
}

const CTAEmailButton = ({ className = '' }: CTAEmailButtonProps) => {
  const { companyEmail } = useSiteData();
  const email = companyEmail || 'noemailexists@noemail.com';
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);

      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        timeoutRef.current = null;
      }, 4000);
    } catch (err) {
      console.error('Failed to copy email to clipboard:', err);
    }
  };

  const Icon = isCopied ? FaCheck : FaRegCopy;

  // Note that the Icon in the email button, together with the py padding, gives the email button a height of 56px. Hence min-h-[56px] has been added to CTA buttons so all buttons are the same height.
  return (
    <button
      onClick={copyToClipboard}
      className={`
        bg-brand-gradient
        inline-flex
        flex-col
        justify-center
        items-center
        px-3
        py-2
        gap-y-1 
        rounded-lg
        transition-all
        duration-200
        focus:outline-none 
        cursor-pointer
        active:scale-90
        text-black
        group
        min-h-[56px]
        max-w-full
        ${className}
      `.trim()}
      title={`Copy email: ${email}`}>
      <div className='flex items-center gap-x-1.5'>
        <span className={`transition-colors duration-200 text-body-sm`}>
          {isCopied ? 'Copied!' : 'Copy email'}
        </span>
        <div className='flex-shrink-0 w-7 h-7 bg-black rounded-full flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-200'>
          <Icon className='w-4 h-4 text-white group-hover:text-black transition-colors duration-200' />
        </div>
      </div>
      <span className='text-body-sm truncate max-w-full leading-tight transition-colors duration-200'>
        {email}
      </span>
    </button>
  );
};

export default CTAEmailButton;
