// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const ctaEventType = defineType({
  name: 'ctaEvent',
  title: 'CTA Event',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'event',
      title: 'Select Event',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Choose an event to display as a CTA. The event link (if available) will be used for navigation.',
      validation: (Rule) => Rule.required().error('Please select an event'),
      options: {
        filter: () => {
          // This will show all events, sorted by latest first
          return {
            filter: '_type == "event"',
            params: {},
          };
        },
      },
    }),
  ],
  preview: {
    select: {
      eventTitle: 'event.title',
      eventLocation: 'event.location',
      eventVenue: 'event.venue',
      eventStartDate: 'event.startDate',
      eventImage: 'event.image',
    },
    prepare({ eventTitle, eventLocation, eventVenue, eventStartDate, eventImage }) {
      const title = eventTitle || 'Unknown Event';
      
      let subtitle = 'No event selected';
      if (eventTitle) {
        const location = eventVenue ? `${eventVenue}, ${eventLocation}` : eventLocation;
        const date = eventStartDate ? new Date(eventStartDate).toLocaleDateString() : '';
        subtitle = `${location}${date ? ` • ${date}` : ''}`;
      }

      return {
        title: `Event: ${title}`,
        subtitle,
        media: eventImage || CalendarIcon,
      };
    },
  },
});