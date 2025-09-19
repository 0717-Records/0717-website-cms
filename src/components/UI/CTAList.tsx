import React from 'react';
import CTAButton from '../blocks/CTAButton';
import CTAEmailButton from '../blocks/CTAEmailButton';
import type { CTAButtonBlock } from '@/types/blocks';

interface CTAListItem {
  _type: 'embeddedCtaButton' | 'embeddedCtaEmailButton';
  _key: string;
  [key: string]: unknown; // Allow additional properties from the CTA button types
}

interface CTAListProps {
  ctaList: CTAListItem[] | null | undefined;
  alignment?: 'flex-row' | 'flex-col';
  className?: string;
  fullWidth?: boolean;
}

const CTAList = ({ ctaList, alignment = 'flex-row', className = '', fullWidth = false }: CTAListProps) => {
  // Return nothing if no CTAs
  if (!ctaList || ctaList.length === 0) {
    return null;
  }

  // Get base alignment classes
  const getAlignmentClasses = () => {
    if (alignment === 'flex-row') {
      // Desktop/tablet: horizontal layout, Mobile: vertical layout
      return 'flex flex-col md:flex-row justify-start items-center gap-4';
    } else {
      // Always vertical layout
      return 'flex flex-col justify-center items-center gap-4';
    }
  };

  return (
    <div className={`${getAlignmentClasses()} ${className}`.trim()}>
      {ctaList.map((cta) => {
        // Apply full width class if fullWidth prop is true
        const ctaClassName = fullWidth ? 'w-full' : '';

        if (cta._type === 'embeddedCtaButton') {
          return (
            <CTAButton
              key={cta._key}
              text={cta.text as string}
              variant={cta.variant as CTAButtonBlock['variant']}
              linkType={cta.linkType as CTAButtonBlock['linkType']}
              internalLink={cta.internalLink as CTAButtonBlock['internalLink']}
              externalUrl={cta.externalUrl as string}
              openInNewTab={cta.openInNewTab as boolean}
              computedHref={cta.computedHref as string}
              pageSectionId={cta.pageSectionId as string}
              className={ctaClassName}
            />
          );
        } else if (cta._type === 'embeddedCtaEmailButton') {
          return <CTAEmailButton key={cta._key} className={ctaClassName} />;
        }
        return null;
      })}
    </div>
  );
};

export default CTAList;
