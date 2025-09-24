// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const ctaEventsType = defineType({
  name: 'ctaEvents',
  title: 'CTA Events',
  type: 'object',
  icon: CalendarIcon,
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
      name: 'eventListType',
      title: 'Event List',
      type: 'string',
      description: 'Choose how to generate the event list',
      options: {
        list: [
          {
            title: 'Automatic (latest events used based on items per row selected)',
            value: 'automatic',
          },
          { title: 'Manual selection', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'automatic',
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
      hidden: ({ parent }) => parent?.eventListType !== 'manual',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { eventListType?: string };
          if (parent?.eventListType === 'manual' && (!value || value.length === 0)) {
            return 'Please select at least one event when using manual selection';
          }
          return true;
        }),
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
      title: 'Show Event Help CTA',
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
    defineField({
      name: 'hideViewAllButton',
      title: 'Hide "View All Events" Button',
      type: 'boolean',
      description: 'Turn this on to hide the "View All Events" button at the bottom of the component',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      events: 'events',
      eventListType: 'eventListType',
      displayStyle: 'displayStyle',
      showCTA: 'showCTA',
      rowSize: 'rowSize',
    },
    prepare({ events, eventListType, displayStyle, showCTA, rowSize }) {
      const eventCount = eventListType === 'manual' ? events?.length || 0 : 'Auto';
      const styleText = displayStyle === 'posterOnly' ? 'Poster Only' : 'Detailed';
      const ctaText = showCTA ? ' + CTA' : '';
      const rowSizeText = rowSize ? ` • ${rowSize === 'small' ? 'Small (4/row)' : 'Large (3/row)'}` : '';
      const listTypeText = eventListType === 'automatic' ? 'Auto' : 'Manual';

      return {
        title: 'CTA Events',
        subtitle: `${listTypeText} • ${eventCount} event${eventCount !== 1 && eventCount !== 'Auto' ? 's' : ''} • ${styleText}${ctaText}${rowSizeText}`,
        media: CalendarIcon,
      };
    },
  },
});
