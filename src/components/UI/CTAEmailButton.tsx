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

  return (
    <button
      onClick={copyToClipboard}
      className={`
        bg-brand-gradient 
        inline-flex 
        flex-wrap 
        justify-center 
        items-center 
        max-w-full 
        px-6 
        py-3 
        gap-y-2 
        gap-x-4 
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
      <span>{email}</span>
      <div className='flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-200'>
        <Icon className='w-5 h-5 text-white group-hover:text-black transition-colors duration-200' />
      </div>
    </button>
  );
};

export default CTAEmailButton;
