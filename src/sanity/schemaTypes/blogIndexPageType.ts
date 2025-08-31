// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const blogIndexPageType = defineType({
  name: 'blogIndexPage',
  title: 'Blog Index Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'header',
      title: 'Page Header',
    },
    {
      name: 'content',
      title: 'Content Settings',
    },
    {
      name: 'closingCard',
      title: 'Closing Card',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The main title (H1) for the blog index page',
      validation: (Rule) => Rule.required().error('Page title is required'),
      group: 'header',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'Hero image for the blog index page header. Note: This image will also be used as the hero image for all individual blog posts.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility when image cannot be displayed',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      description: 'Optional subtitle that appears below the page title',
      rows: 3,
      validation: (Rule) => Rule.max(300),
      group: 'header',
    }),
    defineField({
      name: 'noArticlesMessage',
      type: 'string',
      title: 'No Articles Message',
      description: 'Message displayed when there are no blog articles to show',
      initialValue: 'No articles available at the moment. Check back soon!',
      validation: (Rule) => Rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'hasClosingCard',
      title: 'Show Closing Card',
      type: 'boolean',
      group: 'closingCard',
      description: 'Display a closing card at the bottom of the page',
      initialValue: false,
    }),
    defineField({
      name: 'closingCard',
      title: 'Closing Card',
      type: 'card',
      group: 'closingCard',
      description: 'Card displayed at the bottom of the page with optional call-to-action',
      hidden: ({ parent }) => !parent?.hasClosingCard,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Blog Index Page',
        subtitle: subtitle || 'Main blog listing page',
        media,
      };
    },
  },
});