import React from 'react';
import SocialLink from '@/components/UI/SocialLink';
import Heading from '@/components/Typography/Heading/Heading';
import { getPlatformFromField } from '@/utils/socialIcons';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface SocialLinksData {
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  twitter?: string | null;
  soundcloud?: string | null;
  bandcamp?: string | null;
  spotify?: string | null;
  itunes?: string | null;
  officialWebsite?: string | null;
  genericLinks?: Array<{
    _key: string;
    title: string | null;
    url: string | null;
  }> | null;
}

interface CollabLinksProps {
  links?: SocialLinksData | null;
  documentId?: string;
  documentType?: string;
}

const CollabLinks: React.FC<CollabLinksProps> = ({ links, documentId, documentType }) => {
  if (!links) return null;

  // Extract all the social platform links
  const platformLinks = [
    { field: 'facebook', url: links.facebook },
    { field: 'instagram', url: links.instagram },
    { field: 'youtube', url: links.youtube },
    { field: 'twitter', url: links.twitter },
    { field: 'soundcloud', url: links.soundcloud },
    { field: 'bandcamp', url: links.bandcamp },
    { field: 'spotify', url: links.spotify },
    { field: 'itunes', url: links.itunes },
    { field: 'officialWebsite', url: links.officialWebsite },
  ].filter(link => link.url);

  const genericLinks = links.genericLinks || [];
  
  // If no links exist, don't render anything
  if (platformLinks.length === 0 && genericLinks.length === 0) {
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
        {/* Platform-specific links */}
        {platformLinks.map(({ field, url }) => (
          <SocialLink
            key={field}
            platform={getPlatformFromField(field)}
            url={url!}
            dataAttributes={createSanityDataAttribute(documentId, documentType, `links.${field}`)}
          />
        ))}
        
        {/* Generic links */}
        {genericLinks.filter(link => link.url && link.title).map((link, index) => (
          <SocialLink
            key={link._key || index}
            platform="genericLink"
            url={link.url!}
            label={link.title!}
            dataAttributes={createSanityDataAttribute(documentId, documentType, `links.genericLinks[_key=="${link._key}"]`)}
          />
        ))}
      </div>
    </aside>
  );
};

export default CollabLinks;