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
      name: 'genre',
      title: 'Genre',
      type: 'string',
      group: 'basic',
      description: 'Musical genre or style of the collaboration',
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .max(50)
          .error('Genre is required and must be under 50 characters'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'basic',
      description: 'Geographic location (city, country, etc.)',
      validation: (Rule) => Rule.max(100),
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
          description: 'Describe the image for accessibility',
          validation: (Rule) => Rule.max(100),
        }),
      ],
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'images',
      description: 'Smaller image used in cards and previews (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility',
          validation: (Rule) => Rule.max(100),
        }),
      ],
    }),

    // Content & Bio Group
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      description: 'Brief description used as subtitle on the detail page',
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
      description: 'Use the short description above for card previews. Uncheck to provide a custom card description.',
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
      type: 'socialLinks',
      group: 'social',
      description: 'Social media profiles and website links',
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
      subtitle: 'genre',
      location: 'location',
      media: 'previewImage',
      shortDescription: 'shortDescription',
    },
    prepare({ title, subtitle, location, media, shortDescription }) {
      const locationText = location ? ` • ${location}` : '';
      const descriptionPreview = shortDescription 
        ? ` • ${shortDescription.slice(0, 40)}${shortDescription.length > 40 ? '...' : ''}`
        : '';
      
      return {
        title: title || 'Untitled Collaboration',
        subtitle: `${subtitle || 'No genre'}${locationText}${descriptionPreview}`,
        media: media || UsersIcon,
      };
    },
  },
});