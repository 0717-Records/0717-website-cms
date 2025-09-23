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
      name: 'rowSize',
      title: 'Row Size',
      type: 'string',
      description:
        'Selection informs the height of the row, which informs the size of the cards and the max that can fit on a row. Small allows 4 items per row, Large allows 3 items per row. If CTA is enabled, it will be included in this count.',
      options: {
        list: [
          { title: 'Small (4 items per row)', value: 'small' },
          { title: 'Large (3 items per row)', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'large',
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
      rowSize: 'rowSize',
    },
    prepare({ showCTA, rowSize }) {
      const ctaText = showCTA ? ' + CTA' : '';
      const rowSizeText = rowSize ? ` • ${rowSize === 'small' ? 'Small (4/row)' : 'Large (3/row)'}` : '';

      return {
        title: 'Collaboration Block',
        subtitle: `All collaborations${ctaText}${rowSizeText}`,
        media: UsersIcon,
      };
    },
  },
});