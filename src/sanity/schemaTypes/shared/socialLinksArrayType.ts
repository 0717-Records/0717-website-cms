// AI Helper: This is a Sanity CMS schema definition for orderable social links arrays.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { SOCIAL_PLATFORMS, validatePlatformUrl } from './platformsConfig';

const createSocialLinksArrayField = (includeOfficialWebsite: boolean = false) => {
  const availablePlatforms = SOCIAL_PLATFORMS.filter(platform => 
    includeOfficialWebsite || platform.key !== 'officialWebsite'
  );

  return defineField({
    name: 'socialLinksArray',
    title: 'Social Links',
    type: 'array',
    description: 'Add and reorder social media links using drag and drop. Each platform can only be added once, except for generic links.',
    of: [
      {
        type: 'object',
        name: 'socialLinkItem',
        title: 'Social Link',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: availablePlatforms.map(platform => ({
                title: platform.label,
                value: platform.key,
              })),
              layout: 'dropdown',
            },
            validation: (Rule) => Rule.required().error('Platform is required'),
          }),
          defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            description: 'The complete URL for this social link',
            validation: (Rule) => Rule.required().uri({
              scheme: ['http', 'https'],
              allowRelative: false
            }).custom((value, context) => {
              const parent = context.parent as { platform?: string };
              if (value && parent?.platform) {
                return validatePlatformUrl(parent.platform, value);
              }
              return true;
            }),
          }),
          defineField({
            name: 'customTitle',
            title: 'Custom Title',
            type: 'string',
            description: 'Optional custom title (only for generic links, otherwise platform name is used)',
            hidden: ({ parent }) => parent?.platform !== 'genericLink',
            validation: (Rule) => Rule.custom((value, context) => {
              const parent = context.parent as { platform?: string };
              if (parent?.platform === 'genericLink' && !value) {
                return 'Custom title is required for generic links';
              }
              if (value && value.length > 50) {
                return 'Custom title must be 50 characters or less';
              }
              return true;
            }),
          }),
        ],
        preview: {
          select: {
            platform: 'platform',
            url: 'url',
            customTitle: 'customTitle',
          },
          prepare({ platform, url, customTitle }) {
            const platformConfig = availablePlatforms.find(p => p.key === platform);
            const title = platform === 'genericLink' ? customTitle : platformConfig?.label;
            
            let displayUrl = url;
            try {
              const urlObj = new URL(url || '');
              displayUrl = urlObj.hostname;
            } catch {
              // Keep original if URL parsing fails
            }
            
            return {
              title: title || 'Untitled Link',
              subtitle: displayUrl,
              media: () => platformConfig?.icon === 'genericLink' ? '🔗' : '📱',
            };
          },
        },
      },
    ],
    validation: (Rule) => Rule.custom((items) => {
      if (!Array.isArray(items)) return true;
      
      // Check for duplicate platforms (except genericLink)
      const platforms = items.map((item) => (item as { platform?: string }).platform).filter(Boolean) as string[];
      const nonGenericPlatforms = platforms.filter((platform) => platform !== 'genericLink');
      const uniqueNonGeneric = [...new Set(nonGenericPlatforms)];
      
      if (nonGenericPlatforms.length !== uniqueNonGeneric.length) {
        return 'Each platform (except generic links) can only be added once';
      }
      
      return true;
    }),
  });
};

// Company Links Array Type (excludes officialWebsite)
export const companyLinksArrayType = defineType({
  name: 'companyLinksArray',
  title: 'Company Social Links',
  type: 'object',
  icon: LinkIcon,
  description: 'Manage company social media links with drag-and-drop ordering',
  fields: [
    createSocialLinksArrayField(false),
  ],
  preview: {
    select: {
      socialLinksArray: 'socialLinksArray',
    },
    prepare({ socialLinksArray }) {
      const count = Array.isArray(socialLinksArray) ? socialLinksArray.length : 0;
      const linkText = count === 1 ? 'link' : 'links';
      
      return {
        title: 'Company Social Links',
        subtitle: `${count} ${linkText} configured`,
        media: LinkIcon,
      };
    },
  },
});

// Collaboration Links Array Type (includes officialWebsite)
export const collabLinksArrayType = defineType({
  name: 'collabLinksArray',
  title: 'Social Media & Links',
  type: 'object',
  icon: LinkIcon,
  description: 'Manage social media and website links with drag-and-drop ordering',
  fields: [
    createSocialLinksArrayField(true),
  ],
  preview: {
    select: {
      socialLinksArray: 'socialLinksArray',
    },
    prepare({ socialLinksArray }) {
      const count = Array.isArray(socialLinksArray) ? socialLinksArray.length : 0;
      const linkText = count === 1 ? 'link' : 'links';
      
      return {
        title: 'Social Media & Links',
        subtitle: `${count} ${linkText} configured`,
        media: LinkIcon,
      };
    },
  },
});