import React from 'react';
import SocialLink from '@/components/UI/SocialLink';
import Heading from '@/components/Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { type SocialPlatform } from '@/utils/socialIcons';

interface SocialLinkItem {
  _key: string;
  platform: string | null;
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

  const socialLinks = links.socialLinksArray.filter((link) => link.url && link.platform);
  
  // If no links exist, don't render anything
  if (socialLinks.length === 0) {
    return null;
  }

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
        {socialLinks.map((link) => (
          <SocialLink
            key={link._key}
            platform={link.platform! as SocialPlatform}
            url={link.url!}
            label={link.platform === 'genericLink' ? link.customTitle || 'Link' : undefined}
            dataAttributes={createSanityDataAttribute(documentId, documentType, `links.socialLinksArray[_key=="${link._key}"]`)}
          />
        ))}
      </div>
    </aside>
  );
};

export default CollabLinks;