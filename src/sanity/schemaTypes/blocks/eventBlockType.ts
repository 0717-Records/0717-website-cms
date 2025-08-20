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
      name: 'maxEvents',
      title: 'Maximum Number of Events',
      type: 'number',
      description: 'Maximum number of events to display. Leave empty to show all events.',
      initialValue: 6,
      validation: (Rule) =>
        Rule.min(1)
          .max(50)
          .integer()
          .warning('We recommend showing between 1-12 events for better user experience'),
    }),
    defineField({
      name: 'eventFilter',
      title: 'Which Events to Show',
      type: 'string',
      options: {
        list: [
          {
            title: 'Show All Events',
            value: 'all',
          },
          {
            title: 'Show Upcoming Events Only',
            value: 'upcoming',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      maxEvents: 'maxEvents',
      eventFilter: 'eventFilter',
    },
    prepare({ maxEvents, eventFilter }) {
      const filterText = eventFilter === 'all' ? 'All Events' : 'Upcoming Events';
      const limitText = maxEvents ? ` (max ${maxEvents})` : '';
      
      return {
        title: 'Event Block',
        subtitle: `${filterText}${limitText}`,
        media: CalendarIcon,
      };
    },
  },
});