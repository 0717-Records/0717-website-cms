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
      description: 'Choose multiple events to display. Events will be shown in the order you add them here. The event links (if available) will be used for navigation.',
      validation: (Rule) => Rule.required().min(1).error('Please select at least one event'),
    }),
  ],
  preview: {
    select: {
      events: 'events',
    },
    prepare({ events }) {
      const eventCount = events?.length || 0;
      const title = `CTA Events (${eventCount})`;
      let subtitle = 'No events selected';

      if (eventCount > 0) {
        subtitle = `${eventCount} event${eventCount !== 1 ? 's' : ''} selected`;
      }

      return {
        title,
        subtitle,
        media: CalendarIcon,
      };
    },
  },
});