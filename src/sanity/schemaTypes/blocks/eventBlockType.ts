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
      description: 'Maximum number of upcoming events to display. Leave empty to show all upcoming events.',
      initialValue: 6,
      validation: (Rule) =>
        Rule.min(1)
          .max(50)
          .integer()
          .warning('We recommend showing between 1-12 events for better user experience'),
    }),
  ],
  preview: {
    select: {
      maxEvents: 'maxEvents',
    },
    prepare({ maxEvents }) {
      const limitText = maxEvents ? ` (max ${maxEvents})` : '';
      
      return {
        title: 'Event Block',
        subtitle: `Upcoming Events${limitText}`,
        media: CalendarIcon,
      };
    },
  },
});