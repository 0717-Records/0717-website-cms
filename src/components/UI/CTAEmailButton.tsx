'use client';

import React, { useState, useRef } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { useSiteData } from '@/contexts/SiteDataContext';

interface CTAEmailButtonProps {
  className?: string;
  textClasses?: string;
}

const CTAEmailButton = ({ className = '', textClasses }: CTAEmailButtonProps) => {
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
        justify-center 
        items-center 
        max-w-full 
        px-5 
        py-3 
        gap-y-2 
        gap-x-2 
        font-medium 
        rounded-lg 
        transition-all 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-brand-primary
        cursor-pointer 
        active:scale-90
        text-black
        group
        ${className}
      `.trim()}
      title={`Copy email: ${email}`}>
      <span className={`${textClasses ? textClasses : 'text-body-base'}`}>{email}</span>
      <div className='flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-200'>
        <Icon className='w-4 h-4 text-white group-hover:text-black transition-colors duration-200' />
      </div>
    </button>
  );
};

export default CTAEmailButton;
