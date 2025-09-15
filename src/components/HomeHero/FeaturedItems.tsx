import React from 'react';
import { getImageDimensions } from '@/sanity/lib/image';
import UnifiedImage from '@/components/UI/UnifiedImage';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import LinkWrapper from '../UI/LinkWrapper';

interface FeaturedItemsProps {
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
}
const FeaturedItems = ({ featuredImages }: FeaturedItemsProps) => {
  // Memoize validImages to prevent useEffect dependency changes
  const validImages = featuredImages?.filter((image) => image && image.asset && image.asset._ref);

  const hasValidImages =
    featuredImages && featuredImages.length > 0 && validImages && validImages.length > 0;

  if (!hasValidImages) {
    return null;
  }

  return (
    <div className={`w-full flex flex-wrap justify-center gap-4`}>
      {validImages.map((image, index) => {
        const dimensions = getImageDimensions(image as { asset: { _ref: string } });
        const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;
        const isPortrait = aspectRatio <= 1;

        // Check if this image has link data (exclude 'none' linkType)
        const hasLink = image.linkType && (
          (image.linkType === 'internal') ||
          (image.linkType === 'external' && image.externalUrl)
        );

        return (
          <LinkWrapper
            key={index}
            linkType={image.linkType}
            internalLink={image.internalLink}
            externalUrl={image.externalUrl}
            openInNewTab={image.openInNewTab}
            computedHref={image.computedHref}
            pageSectionId={image.pageSectionId}
            className={`relative w-full landscape:h-[45vh] landscape:w-auto ${isPortrait ? 'max-w-[300px] landscape:max-w-none' : 'max-w-[2000px] landscape:max-w-full'} ${hasLink ? 'cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95' : ''}`}
            style={{ aspectRatio: aspectRatio }}
          >
            <UnifiedImage
              src={image}
              alt={image.alt || 'Featured item'}
              mode="fill"
              objectFit="contain"
              displaySize={{ width: 2000 }}
              sizes='(max-width: 768px) 90vw, 400px'
              priority={index === 0}
            />
          </LinkWrapper>
        );
      })}
    </div>
  );
};

export default FeaturedItems;
