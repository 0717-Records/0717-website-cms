// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { EditIcon } from '@sanity/icons';
import { defineField, defineType, defineArrayMember } from 'sanity';
import { commonContentBlocks } from './shared/sectionFactory';

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: EditIcon,
  groups: [
    {
      name: 'header',
      title: 'Article Header',
    },
    {
      name: 'meta',
      title: 'Article Metadata',
    },
    {
      name: 'content',
      title: 'Article Content',
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
      title: 'Article Title',
      description: 'The main title (H1) for the blog article',
      validation: (Rule) => Rule.required().error('Article title is required'),
      group: 'header',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'Optional hero image for the blog article header',
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
      title: 'Article Subtitle',
      description: 'Optional subtitle that appears below the article title',
      rows: 3,
      validation: (Rule) => Rule.max(300),
      group: 'header',
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'Author of the blog article (optional)',
      validation: (Rule) => Rule.max(100),
      group: 'meta',
    }),
    defineField({
      name: 'hasOverrideDate',
      title: 'Override Publication Date',
      type: 'boolean',
      description: 'Enable to set a custom publication date instead of using the document creation/publishing date',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'overrideDate',
      type: 'datetime',
      title: 'Custom Publication Date',
      description: 'Custom publication date for the article. By default, the document publishing date is used on the frontend. Use this field to override it with a different date of your choice.',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { hasOverrideDate?: boolean };
        if (parent?.hasOverrideDate && !value) {
          return 'Custom publication date is required when override is enabled';
        }
        return true;
      }),
      hidden: ({ parent }) => !parent?.hasOverrideDate,
      group: 'meta',
    }),
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'array',
      description: 'Build your article content using page sections and content blocks',
      of: [
        defineArrayMember({
          type: 'pageSection',
        }),
        ...commonContentBlocks,
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'list',
            },
          ],
        },
        // Improve the modal experience
        modal: { type: 'dialog' },
      },
      group: 'content',
    }),
    defineField({
      name: 'hasClosingCard',
      title: 'Show Closing Card',
      type: 'boolean',
      group: 'closingCard',
      description: 'Display a closing card at the bottom of the article',
      initialValue: false,
    }),
    defineField({
      name: 'closingCard',
      title: 'Closing Card',
      type: 'card',
      group: 'closingCard',
      description: 'Card displayed at the bottom of the article with optional call-to-action',
      hidden: ({ parent }) => !parent?.hasClosingCard,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      author: 'author',
      media: 'heroImage',
      publishedAt: '_createdAt',
      overrideDate: 'overrideDate',
      hasOverrideDate: 'hasOverrideDate',
    },
    prepare({ title, subtitle, author, media, publishedAt, overrideDate, hasOverrideDate }) {
      const displayDate = hasOverrideDate && overrideDate 
        ? new Date(overrideDate).toLocaleDateString()
        : publishedAt 
          ? new Date(publishedAt).toLocaleDateString()
          : '';

      const subtitleParts = [
        subtitle,
        author ? `By ${author}` : null,
        displayDate,
      ].filter(Boolean);

      return {
        title: title || 'Untitled Blog Post',
        subtitle: subtitleParts.join(' • '),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publicationDateDesc',
      by: [
        { field: 'overrideDate', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Publication Date, Old',
      name: 'publicationDateAsc',
      by: [
        { field: 'overrideDate', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' }
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{ field: 'title', direction: 'desc' }]
    }
  ],
});