import React from 'react';
import Link from 'next/link';

type BaseCTAProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'filled' | 'outline';
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

const getVariantStyles = (variant: 'filled' | 'outline' = 'filled') => {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer active:scale-95';

  if (variant === 'outline') {
    return `${baseStyles} border-2 border-brand-secondary text-brand-secondary bg-transparent hover:bg-brand-gradient hover:text-black hover:border-transparent focus:ring-brand-secondary`;
  }

  // Default to filled variant with brand gradient
  return `${baseStyles} bg-brand-gradient text-black hover:opacity-90 focus:ring-brand-primary`;
};

const CTA = (props: CTAProps) => {
  const { children, className = '', variant = 'filled', ...restProps } = props;
  const combinedClassName = `${getVariantStyles(variant)} ${className}`.trim();

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

  // Use Next.js Link for internal links, regular anchor for external links or when target="_blank"
  const isExternal =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const shouldUseAnchor = isExternal || target === '_blank';

  if (shouldUseAnchor) {
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
