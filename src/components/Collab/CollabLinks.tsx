import React from 'react';
import SocialLink from '@/components/UI/SocialLink';
import Heading from '@/components/Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { cleanPlatform } from '@/utils/cleanPlatform';
import { type SocialPlatform } from '@/utils/socialIcons';
import { detectPlatformFromUrl } from '@/sanity/schemaTypes/shared/platformsConfig';

interface SocialLinkItem {
  _key: string;
  platform?: string | null;
  url: string | null;
  customTitle?: string | null;
}

interface SocialLinksData {
  _type?: string;
  socialLinksArray?: SocialLinkItem[] | null;
}

interface CollabLinksProps {
  links?: SocialLinksData | null;
  documentId?: string;
  documentType?: string;
}

const CollabLinks: React.FC<CollabLinksProps> = ({ links, documentId, documentType }) => {
  if (!links?.socialLinksArray) return null;

  // Filter for valid links and get final platform (detected or manual)
  const socialLinks = links.socialLinksArray.filter((link) => {
    if (!link.url) return false;
    
    // Get final platform from auto-detection or manual selection
    const detected = detectPlatformFromUrl(link.url);
    const finalPlatform = detected?.key || link.platform;
    
    return finalPlatform && typeof finalPlatform === 'string' && finalPlatform.trim() !== '';
  });
  
  // If no links exist, don't render anything
  if (socialLinks.length === 0) {
    return null;
  }

  // Transform to display format with final platform values
  const allLinks = socialLinks.map((link) => {
    const detected = detectPlatformFromUrl(link.url!);
    const finalPlatform = detected?.key || link.platform;
    const platform = cleanPlatform(finalPlatform) as SocialPlatform;
    
    return {
      _key: link._key,
      platform,
      url: link.url!,
      customTitle: link.customTitle,
    };
  });

  return (
    <aside className="bg-white border border-gray-200 rounded-lg p-6">
      <Heading 
        level="h3" 
        className="text-h4 font-bold text-gray-900 mb-4"
        {...createSanityDataAttribute(documentId, documentType, 'links')}
      >
        Links
      </Heading>
      
      <div className="space-y-3">
        {/* Social links in the order they were arranged */}
        {allLinks.map((link) => (
          <SocialLink
            key={link._key}
            platform={link.platform}
            url={link.url}
            label={link.platform === 'genericLink' ? link.customTitle || 'Link' : undefined}
            dataAttributes={createSanityDataAttribute(documentId, documentType, `links.socialLinksArray[_key=="${link._key}"]`)}
          />
        ))}
      </div>
    </aside>
  );
};

export default CollabLinks;