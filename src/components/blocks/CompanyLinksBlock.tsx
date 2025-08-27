import React from 'react';
import Link from 'next/link';
import { SocialIcon, type SocialPlatform, getPlatformLabel, getPlatformFromField } from '@/utils/socialIcons';
import { createDataAttribute } from 'next-sanity';
import { createDataAttributeConfig } from '@/components/PageBuilder';

interface CompanyLinksData {
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  twitter?: string | null;
  soundcloud?: string | null;
  bandcamp?: string | null;
  spotify?: string | null;
  itunes?: string | null;
  genericLinks?: Array<{
    _key: string;
    title: string | null;
    url: string | null;
  }> | null;
}

interface CompanyLinksBlockProps {
  companyLinks?: CompanyLinksData | null;
}

const CompanyLinksBlock: React.FC<CompanyLinksBlockProps> = ({ companyLinks }) => {
  if (!companyLinks) return null;

  // Extract all the social platform links
  const platformLinks = [
    { field: 'facebook', url: companyLinks.facebook, platform: getPlatformFromField('facebook') },
    { field: 'instagram', url: companyLinks.instagram, platform: getPlatformFromField('instagram') },
    { field: 'youtube', url: companyLinks.youtube, platform: getPlatformFromField('youtube') },
    { field: 'twitter', url: companyLinks.twitter, platform: getPlatformFromField('twitter') },
    { field: 'soundcloud', url: companyLinks.soundcloud, platform: getPlatformFromField('soundcloud') },
    { field: 'bandcamp', url: companyLinks.bandcamp, platform: getPlatformFromField('bandcamp') },
    { field: 'spotify', url: companyLinks.spotify, platform: getPlatformFromField('spotify') },
    { field: 'itunes', url: companyLinks.itunes, platform: getPlatformFromField('itunes') },
  ].filter(link => link.url);

  const genericLinks = (companyLinks.genericLinks || []).filter(link => link.url && link.title);
  
  // If no links exist, don't render anything
  if (platformLinks.length === 0 && genericLinks.length === 0) {
    return null;
  }

  // Combine all links for display
  const allLinks = [
    ...platformLinks.map(({ platform, url }) => ({
      platform,
      url: url!,
      label: getPlatformLabel(platform),
    })),
    ...genericLinks.map(link => ({
      platform: 'genericLink' as SocialPlatform,
      url: link.url!,
      label: link.title!,
    })),
  ];

  return (
    <div className='w-full'>
      <div 
        className='flex flex-wrap justify-center gap-6 md:gap-8'
        data-sanity={createDataAttribute({
          ...createDataAttributeConfig,
          id: 'siteSettings',
          type: 'siteSettings',
          path: 'companyLinks',
        }).toString()}
      >
        {allLinks.map((link, index) => {
          // Create data attribute for individual social platform field
          const isGenericLink = link.platform === 'genericLink';
          let dataAttribute = '';
          
          if (isGenericLink) {
            // For generic links, point to the specific array item
            const genericIndex = genericLinks.findIndex(gl => gl.url === link.url);
            dataAttribute = createDataAttribute({
              ...createDataAttributeConfig,
              id: 'siteSettings',
              type: 'siteSettings',
              path: `companyLinks.genericLinks[${genericIndex}]`,
            }).toString();
          } else {
            // For platform links, point to the specific field
            const platformField = platformLinks.find(pl => pl.platform === link.platform)?.field;
            dataAttribute = createDataAttribute({
              ...createDataAttributeConfig,
              id: 'siteSettings',
              type: 'siteSettings',
              path: `companyLinks.${platformField}`,
            }).toString();
          }

          return (
            <Link
              key={`${link.platform}-${index}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className='group flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105'
              data-sanity={dataAttribute}
            >
            {/* Icon Circle */}
            <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200'>
              <SocialIcon 
                platform={link.platform}
                className='text-brand-secondary text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110'
              />
            </div>
            
            {/* Label */}
            <span className='text-body-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-center'>
              {link.label}
            </span>
          </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyLinksBlock;