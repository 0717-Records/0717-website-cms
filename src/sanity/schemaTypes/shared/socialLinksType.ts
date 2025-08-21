// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const socialLinksType = defineType({
  name: 'socialLinks',
  title: 'Social Media Links',
  type: 'object',
  icon: LinkIcon,
  description: 'Add links to social media profiles and websites',
  fields: [
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
    defineField({
      name: 'officialWebsite',
      title: 'Official Website',
      type: 'url',
      description: 'Official website URL',
      placeholder: 'https://yourwebsite.com',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false
      }),
    }),
    defineField({
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
                media: LinkIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      facebook: 'facebook',
      instagram: 'instagram',
      youtube: 'youtube',
      twitter: 'twitter',
      soundcloud: 'soundcloud',
      bandcamp: 'bandcamp',
      spotify: 'spotify',
      itunes: 'itunes',
      officialWebsite: 'officialWebsite',
      genericLinks: 'genericLinks',
    },
    prepare(selection) {
      const {
        facebook, instagram, youtube, twitter, soundcloud,
        bandcamp, spotify, itunes, officialWebsite, genericLinks
      } = selection;
      
      const linkCount = [
        facebook, instagram, youtube, twitter, soundcloud,
        bandcamp, spotify, itunes, officialWebsite
      ].filter(Boolean).length + (Array.isArray(genericLinks) ? genericLinks.length : 0);
      
      const linkText = linkCount === 1 ? 'link' : 'links';
      
      return {
        title: 'Social Media Links',
        subtitle: `${linkCount} ${linkText} configured`,
        media: LinkIcon,
      };
    },
  },
});