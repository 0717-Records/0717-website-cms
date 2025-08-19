'use client';

import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

type CTAEmailButtonProps = {
  email: string;
  className?: string;
};

const CTAEmailButton = ({ email, className = '' }: CTAEmailButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      // Reset the icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email to clipboard:', err);
    }
  };

  const Icon = isCopied ? FaCheck : FaCopy;

  return (
    <button
      onClick={copyToClipboard}
      className={`
        bg-brand-gradient 
        hover:bg-brand-primary
        inline-flex 
        items-center 
        justify-between
        px-6 
        py-3 
        font-medium 
        rounded-lg 
        transition-all 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-brand-primary
        cursor-pointer 
        active:scale-95
        text-black
        group
        ${className}
      `.trim()}
      title={`Copy email: ${email}`}
    >
      <span>{email}</span>
      <div className="flex-shrink-0 ml-4 w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-200">
        <Icon className="w-4 h-4 text-white group-hover:text-black transition-colors duration-200" />
      </div>
    </button>
  );
};

export default CTAEmailButton;