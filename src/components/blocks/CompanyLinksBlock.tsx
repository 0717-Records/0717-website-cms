import React from 'react';
import Link from 'next/link';
import {
  SocialIcon,
  type SocialPlatform,
  getPlatformLabel,
} from '@/utils/socialIcons';
import { createDataAttribute } from 'next-sanity';
import { createDataAttributeConfig } from '@/components/PageBuilder';

interface SocialLinkItem {
  _key: string;
  platform: string | null;
  url: string | null;
  customTitle?: string | null;
}

interface CompanyLinksData {
  _type?: string;
  socialLinksArray?: SocialLinkItem[] | null;
}

interface CompanyLinksBlockProps {
  companyLinks?: CompanyLinksData | null;
}

const CompanyLinksBlock: React.FC<CompanyLinksBlockProps> = ({ companyLinks }) => {
  if (!companyLinks?.socialLinksArray) return null;

  const socialLinks = companyLinks.socialLinksArray.filter((link) => link.url && link.platform);
  
  // If no links exist, don't render anything
  if (socialLinks.length === 0) {
    return null;
  }

  // Transform to display format
  const allLinks = socialLinks.map((link) => ({
    _key: link._key,
    platform: link.platform! as SocialPlatform,
    url: link.url!,
    label: link.platform === 'genericLink' ? (link.customTitle || 'Link') : getPlatformLabel(link.platform! as SocialPlatform),
  }));

  return (
    <div className='w-full'>
      <div
        className='flex flex-wrap justify-center gap-6 md:gap-8'
        data-sanity={createDataAttribute({
          ...createDataAttributeConfig,
          id: 'siteSettings',
          type: 'siteSettings',
          path: 'companyLinks',
        }).toString()}>
        {allLinks.map((link, index) => {
          // Create data attribute for individual social link item
          const dataAttribute = createDataAttribute({
            ...createDataAttributeConfig,
            id: 'siteSettings',
            type: 'siteSettings',
            path: `companyLinks.socialLinksArray[_key=="${link._key}"]`,
          }).toString();

          return (
            <Link
              key={link._key || `${link.platform}-${index}`}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex flex-col items-center gap-3 shadow-sm border border-gray-200 p-4 md:p-8 rounded-2xl bg-white transition-all duration-200 hover:scale-105'
              data-sanity={dataAttribute}>
              {/* Icon Circle */}
              <div className='w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-gradient flex items-center justify-center'>
                <SocialIcon
                  platform={link.platform}
                  className='text-black text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110'
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
