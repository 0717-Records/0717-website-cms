// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const eventsIndexPageType = defineType({
  name: 'eventsIndexPage',
  title: 'Events Index Page',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      name: 'header',
      title: 'Page Header',
    },
    {
      name: 'content',
      title: 'Page Content',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The main title (H1) for the events page',
      validation: (Rule) => Rule.required().error('Page title is required'),
      group: 'header',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      description:
        'Optional background image for the page header. If not provided, a default placeholder image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility when image cannot be displayed',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      description: 'Optional subtitle that appears below the page title',
      rows: 3,
      group: 'header',
    }),
    defineField({
      name: 'noUpcomingEventsMessage',
      type: 'text',
      title: 'No Upcoming Events Message',
      description:
        'Message displayed when there are no upcoming events to show. This appears in the "Upcoming Events" section when the events list is empty.',
      rows: 2,
      initialValue: 'No upcoming events at the moment. Check back soon!',
      validation: (Rule) => Rule.required().error('No upcoming events message is required'),
      group: 'content',
    }),
    defineField({
      name: 'hasEventsMessage',
      title: 'Show Events Message Card',
      type: 'boolean',
      group: 'content',
      description: 'Display a message card at the bottom of the Upcoming Events section',
      initialValue: false,
    }),
    defineField({
      name: 'eventsMessage',
      title: 'Events Message Card',
      type: 'card',
      group: 'content',
      description:
        'Card displayed at the bottom of the Upcoming Events section with optional call-to-action',
      hidden: ({ parent }) => !parent?.hasEventsMessage,
    }),
    defineField({
      name: 'noPastEventsMessage',
      type: 'text',
      title: 'No Past Events Message',
      description:
        'Message displayed when there are no past events to show. This appears in the "Past Events" section when the events list is empty.',
      rows: 2,
      initialValue: 'No past events to display yet.',
      validation: (Rule) => Rule.required().error('No past events message is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Events Index Page',
        subtitle: subtitle || 'Main events listing page',
        media,
      };
    },
  },
});
