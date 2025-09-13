// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const collabType = defineType({
  name: 'collab',
  title: 'Collaboration',
  type: 'document',
  icon: UsersIcon,
  description: 'A collaboration entry with details, content, and social links',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'images',
      title: 'Images',
    },
    {
      name: 'content',
      title: 'Content & Bio',
    },
    {
      name: 'social',
      title: 'Links & Social',
    },
    {
      name: 'sidebar',
      title: 'Side Content',
    },
  ],
  fields: [
    // Basic Information Group
    defineField({
      name: 'name',
      title: 'Collaboration Name',
      type: 'string',
      group: 'basic',
      description: 'The name of this collaboration',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('Collaboration name is required and must be under 100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'URL-friendly version of the collaboration name',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('URL slug is required'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      description:
        'Category or classification of the collaboration (e.g., music genre, record label, organization type, etc.) - optional',
      validation: (Rule) => Rule.max(50).error('Category must be under 50 characters'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'basic',
      description: 'Geographic location (city, country, etc.)',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'basic',
      description: 'Order in which this collaboration appears (lower numbers appear first)',
      initialValue: 100,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .max(9999)
          .error('Display order must be a whole number between 0 and 9999'),
    }),

    // Images Group
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'images',
      description: 'Large banner image for the collaboration detail page (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        }),
      ],
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'images',
      description:
        'Smaller image used in cards and previews. This image will also be used as the Open Graph image for social media sharing when this collaboration is shared on social platforms (optional).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        }),
      ],
    }),

    // Content & Bio Group
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      description:
        'Brief description used as subtitle on the detail page. This text will also be used for SEO meta tags (the description that appears in search engine results and when sharing on social media).',
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(300)
          .error('Short description is required and should be 10-300 characters'),
    }),
    defineField({
      name: 'useShortDescriptionForCards',
      title: 'Use Short Description for Cards',
      type: 'boolean',
      group: 'content',
      description:
        'Use the short description above for card previews. Uncheck to provide a custom card description.',
      initialValue: true,
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      group: 'content',
      description: 'Custom description for use in cards and previews',
      rows: 2,
      hidden: ({ parent }) => parent?.useShortDescriptionForCards !== false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.useShortDescriptionForCards === false && !value) {
            return 'Card description is required when not using short description for cards';
          }
          if (value && value.length > 200) {
            return 'Card description must be 200 characters or less';
          }
          return true;
        }),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'content',
      description: 'Longer biographical information about the collaboration (optional)',
      rows: 5,
      validation: (Rule) => Rule.max(1000),
    }),
    defineField({
      name: 'mainContent',
      title: 'Main Content',
      type: 'array',
      group: 'content',
      description: 'Main content sections for the collaboration page',
      of: [{ type: 'collabPageSection' }],
    }),

    // Social Links Group
    defineField({
      name: 'links',
      title: 'Social Media & Links',
      type: 'collabLinksArray',
      group: 'social',
      description: 'Social media profiles and website links with drag-and-drop ordering',
    }),

    // Sidebar Content Group
    defineField({
      name: 'sideContent',
      title: 'Sidebar Content',
      type: 'sideContent',
      group: 'sidebar',
      description: 'Content blocks for the right sidebar of the collaboration page',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
    {
      title: 'Recent First',
      name: 'recentFirst',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: '_createdAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      location: 'location',
      media: 'previewImage',
    },
    prepare({ title, location, media }) {
      const locationText = location ? ` • ${location}` : '';

      return {
        title: title || 'Untitled Collaboration',
        subtitle: `${locationText}`,
        media: media || UsersIcon,
      };
    },
  },
});
