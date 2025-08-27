// AI Helper: This is a Sanity CMS schema utility. It provides reusable field definitions for social platform links.
// When modifying, ensure all platforms have appropriate validation and descriptions for content editors.

import { defineField } from 'sanity';

// Common social platform fields that can be reused across different schema types
export const createSocialPlatformFields = () => [
  defineField({
    name: 'facebook',
    title: 'Facebook',
    type: 'url',
    description: 'Facebook profile or page URL',
    placeholder: 'https://facebook.com/yourpage',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('facebook.com')) {
        return 'Please enter a valid Facebook URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'instagram',
    title: 'Instagram',
    type: 'url',
    description: 'Instagram profile URL',
    placeholder: 'https://instagram.com/yourusername',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('instagram.com')) {
        return 'Please enter a valid Instagram URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'youtube',
    title: 'YouTube',
    type: 'url',
    description: 'YouTube channel URL',
    placeholder: 'https://youtube.com/c/yourchannel',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('youtube.com') && !value.includes('youtu.be')) {
        return 'Please enter a valid YouTube URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'twitter',
    title: 'X/Twitter',
    type: 'url',
    description: 'X (formerly Twitter) profile URL',
    placeholder: 'https://x.com/yourusername or https://twitter.com/yourusername',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('twitter.com') && !value.includes('x.com')) {
        return 'Please enter a valid X/Twitter URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'soundcloud',
    title: 'SoundCloud',
    type: 'url',
    description: 'SoundCloud profile URL',
    placeholder: 'https://soundcloud.com/yourusername',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('soundcloud.com')) {
        return 'Please enter a valid SoundCloud URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'bandcamp',
    title: 'Bandcamp',
    type: 'url',
    description: 'Bandcamp profile URL',
    placeholder: 'https://yourbandname.bandcamp.com',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('bandcamp.com')) {
        return 'Please enter a valid Bandcamp URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'spotify',
    title: 'Spotify',
    type: 'url',
    description: 'Spotify artist profile URL',
    placeholder: 'https://open.spotify.com/artist/...',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('spotify.com')) {
        return 'Please enter a valid Spotify URL';
      }
      return true;
    }),
  }),
  defineField({
    name: 'itunes',
    title: 'iTunes/Apple Music',
    type: 'url',
    description: 'iTunes or Apple Music artist URL',
    placeholder: 'https://music.apple.com/artist/...',
    validation: (Rule) => Rule.uri({
      scheme: ['http', 'https'],
      allowRelative: false
    }).custom((value) => {
      if (value && !value.includes('apple.com') && !value.includes('itunes.apple.com') && !value.includes('music.apple.com')) {
        return 'Please enter a valid iTunes/Apple Music URL';
      }
      return true;
    }),
  }),
];

// Official website field (only used in socialLinksType)
export const createOfficialWebsiteField = () => defineField({
  name: 'officialWebsite',
  title: 'Official Website',
  type: 'url',
  description: 'Official website URL',
  placeholder: 'https://yourwebsite.com',
  validation: (Rule) => Rule.uri({
    scheme: ['http', 'https'],
    allowRelative: false
  }),
});

// Generic links field (shared by both types)
export const createGenericLinksField = () => defineField({
  name: 'genericLinks',
  title: 'Other Links',
  type: 'array',
  description: 'Add any other relevant links',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Link Title',
          type: 'string',
          description: 'What should this link be called?',
          validation: (Rule) => Rule.required().min(1).max(50),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'The web address for this link',
          validation: (Rule) => Rule.required().uri({
            scheme: ['http', 'https'],
            allowRelative: false
          }),
        }),
      ],
      preview: {
        select: {
          title: 'title',
          url: 'url',
        },
        prepare({ title, url }) {
          let displayUrl = url;
          try {
            const urlObj = new URL(url);
            displayUrl = urlObj.hostname;
          } catch {
            // Keep original if URL parsing fails
          }
          
          return {
            title: title || 'Untitled Link',
            subtitle: displayUrl,
            media: () => '🔗',
          };
        },
      },
    },
  ],
});

// Helper function to create preview configuration
export const createSocialLinksPreview = (includePlatforms: string[], title: string) => ({
  select: {
    facebook: 'facebook',
    instagram: 'instagram',
    youtube: 'youtube',
    twitter: 'twitter',
    soundcloud: 'soundcloud',
    bandcamp: 'bandcamp',
    spotify: 'spotify',
    itunes: 'itunes',
    ...(includePlatforms.includes('officialWebsite') && { officialWebsite: 'officialWebsite' }),
    genericLinks: 'genericLinks',
  },
  prepare(selection: Record<string, unknown>) {
    const platformValues = includePlatforms.map(platform => selection[platform]).filter(Boolean);
    const genericLinksCount = Array.isArray(selection.genericLinks) ? selection.genericLinks.length : 0;
    const totalCount = platformValues.length + genericLinksCount;
    
    const linkText = totalCount === 1 ? 'link' : 'links';
    
    return {
      title,
      subtitle: `${totalCount} ${linkText} configured`,
      media: () => '🔗',
    };
  },
});