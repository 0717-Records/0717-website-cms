// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const collabBlockType = defineType({
  name: 'collabBlock',
  title: 'Collaboration Block',
  type: 'object',
  icon: UsersIcon,
  description: 'Shows all collaborations in a responsive grid layout',
  fields: [
    defineField({
      name: 'itemsPerRow',
      title: 'Items Per Row',
      type: 'string',
      description:
        'Maximum number of collaborations to display per row on desktop. Note: If CTA is enabled, it will be included in this count.',
      options: {
        list: [
          { title: '3 items per row', value: '3' },
          { title: '4 items per row', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showCTA',
      title: 'Show Collab Help CTA',
      type: 'boolean',
      description:
        'Show a call-to-action asking users to contact the label to help with collaborations',
      initialValue: false,
    }),
    defineField({
      name: 'ctaMessage',
      title: 'CTA Message',
      type: 'text',
      description: 'Message to display in the CTA section',
      hidden: ({ parent }) => !parent?.showCTA,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { showCTA?: boolean };
          if (parent?.showCTA && !value) {
            return 'CTA message is required when CTA is enabled';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      showCTA: 'showCTA',
      itemsPerRow: 'itemsPerRow',
    },
    prepare({ showCTA, itemsPerRow }) {
      const ctaText = showCTA ? ' + CTA' : '';
      const itemsText = itemsPerRow ? ` • ${itemsPerRow}/row` : '';

      return {
        title: 'Collaboration Block',
        subtitle: `All collaborations${ctaText}${itemsText}`,
        media: UsersIcon,
      };
    },
  },
});