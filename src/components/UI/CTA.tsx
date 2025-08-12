import React from 'react';
import Link from 'next/link';

type BaseCTAProps = {
  children: React.ReactNode;
  className?: string;
};

type LinkCTAProps = BaseCTAProps & {
  as?: 'link';
  href: string;
  target?: string;
  rel?: string;
};

type ButtonCTAProps = BaseCTAProps & {
  as: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

type CTAProps = LinkCTAProps | ButtonCTAProps;

const baseStyles =
  'inline-flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2';

const CTA = (props: CTAProps) => {
  const { children, className = '', ...restProps } = props;
  const combinedClassName = `${baseStyles} ${className}`.trim();

  if (props.as === 'button') {
    const { onClick, type = 'button', disabled } = restProps as ButtonCTAProps;
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
        {children}
      </button>
    );
  }

  // Default to link behavior
  const { href, target, rel } = restProps as LinkCTAProps;

  // Use Next.js Link for internal links, regular anchor for external
  const isExternal =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  if (isExternal) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default CTA;
