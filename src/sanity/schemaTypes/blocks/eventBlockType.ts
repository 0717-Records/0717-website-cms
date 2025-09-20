// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const eventBlockType = defineType({
  name: 'eventBlock',
  title: 'Event Block',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'itemsPerRow',
      title: 'Items Per Row',
      type: 'string',
      description:
        'Maximum number of events to display per row on desktop. Note: If CTA is enabled, it will be included in this count.',
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
      name: 'events',
      title: 'Select Events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'event' }],
          options: {
            filter: () => {
              // This will show all events, sorted by latest first
              return {
                filter: '_type == "event"',
                params: {},
              };
            },
          },
        },
      ],
      description:
        'Choose one or multiple events to display. Events will be shown in the order you add them here.',
      validation: (Rule) => Rule.required().min(1).error('Please select at least one event'),
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      description: 'Choose how to display the events',
      options: {
        list: [
          { title: 'Poster Only', value: 'posterOnly' },
          { title: 'Detailed', value: 'detailed' },
        ],
        layout: 'radio',
      },
      initialValue: 'detailed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showCTA',
      title: 'Show Event Organization CTA',
      type: 'boolean',
      description:
        'Show a call-to-action asking users to contact the label to help organize their event',
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
      events: 'events',
      displayStyle: 'displayStyle',
      showCTA: 'showCTA',
      itemsPerRow: 'itemsPerRow',
    },
    prepare({ events, displayStyle, showCTA, itemsPerRow }) {
      const eventCount = events?.length || 0;
      const styleText = displayStyle === 'posterOnly' ? 'Poster Only' : 'Detailed';
      const ctaText = showCTA ? ' + CTA' : '';
      const itemsText = itemsPerRow ? ` • ${itemsPerRow}/row` : '';

      return {
        title: 'Event Block',
        subtitle: `${eventCount} event${eventCount !== 1 ? 's' : ''} • ${styleText}${ctaText}${itemsText}`,
        media: CalendarIcon,
      };
    },
  },
});
