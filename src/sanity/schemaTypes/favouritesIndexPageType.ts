// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { HeartIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const favouritesIndexPageType = defineType({
  name: 'favouritesIndexPage',
  title: 'Favourites Index Page',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {
      name: 'header',
      title: 'Page Header',
    },
    {
      name: 'content',
      title: 'Page Content',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The main title (H1) for the favourites page',
      validation: (Rule) => Rule.required().error('Page title is required'),
      group: 'header',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      description:
        'Optional background image for the page header. If not provided, a default placeholder image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      description: 'Optional subtitle that appears below the page title. This text will also be used for SEO meta tags (the description that appears in search engine results and when sharing on social media).',
      rows: 3,
      group: 'header',
    }),
    defineField({
      name: 'showFavouritesMessage',
      title: 'Show Favourites Message Card',
      type: 'boolean',
      group: 'content',
      description: 'Display a message card at the bottom of the favourites section',
      initialValue: false,
    }),
    defineField({
      name: 'favouritesMessage',
      title: 'Favourites Message Card',
      type: 'card',
      group: 'content',
      description:
        'Card displayed at the bottom of the page with optional call-to-action',
      hidden: ({ parent }) => !parent?.showFavouritesMessage,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Favourites Index Page',
        subtitle: subtitle || 'Main favourites listing page',
        media,
      };
    },
  },
});