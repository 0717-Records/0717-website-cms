// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'header',
      title: 'Page Header',
    },
    {
      name: 'content',
      title: 'Page Content',
    },
    {
      name: 'settings',
      title: 'Page Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The main title (H1) of the page',
      validation: (Rule) => Rule.required().error('Page title is required'),
      group: 'header',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      description: 'Optional subtitle that appears below the page title',
      rows: 3,
      group: 'header',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'The URL path for this page',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('URL slug is required'),
      group: 'settings',
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Page Content Alignment',
      description: 'Default alignment for page content. Individual sections can override this.',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      group: 'settings',
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
      title: 'Sections',
      description:
        'Build your page by adding sections. Each section can contain different types of content blocks.',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Featured Image',
      description: 'Optional featured image for the page',
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
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
