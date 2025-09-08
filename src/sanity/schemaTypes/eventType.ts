// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      name: 'details',
      title: 'Event Details',
    },
    {
      name: 'timing',
      title: 'Date & Time',
    },
    {
      name: 'additional',
      title: 'Additional Info',
    },
    {
      name: 'past',
      title: 'Past Event Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      group: 'details',
      description: 'The title or name of the event',
      validation: (Rule) => Rule.required().error('Event title is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'details',
      rows: 2,
      description:
        'Optional short description. Can be used to describe the event or list artists (e.g., "Star Control, Brother Sister, JJ Mist" or "An eclectic festival of the finest music and art from the underground!")',
      validation: (Rule) =>
        Rule.max(200).warning('Keep description concise - under 200 characters works best'),
      // NOTE: Hidden from editor as field is not currently used in frontend rendering
      // Keeping field in schema for potential future use
      hidden: true,
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      group: 'details',
      description: 'Optional venue name (e.g., "Warehouse 23", "Metro Theatre")',
      validation: (Rule) => Rule.max(100).warning('Keep venue name concise'),
    }),
    defineField({
      name: 'location',
      title: 'Event Location',
      type: 'string',
      group: 'details',
      description: 'Where the event is taking place (city, or online)',
      validation: (Rule) => Rule.required().error('Event location is required'),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      group: 'details',
      description: 'Optional image/poster for the event.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Event Tags',
      type: 'array',
      group: 'additional',
      of: [{ type: 'string' }],
      description:
        'Optional tags to categorize the event (e.g., Electronic, Synthwave, Rock). Leave empty if not needed.',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'link',
      title: 'Event Link',
      type: 'url',
      group: 'additional',
      description:
        'Optional external link for more information about the event. Leave empty if not needed.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Please enter a valid URL starting with http:// or https://'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'timing',
      description:
        'The date when the event begins. This field determines when the event is considered past (at 12:00 AM the day after this date for single-day events).',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required().error('Start date is required'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (Optional)',
      type: 'date',
      group: 'timing',
      description:
        'Only add an end date for multi-day events. If provided, the event is considered past at 12:00 AM the day after this date. Leave empty for single-day events.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.parent as Record<string, unknown>)?.startDate;
          if (!endDate || !startDate) return true; // Allow empty end date

          const start = new Date(startDate as string);
          const end = new Date(endDate as string);

          if (end < start) {
            return 'End date must be on or after the start date';
          }
          return true;
        }),
    }),
    defineField({
      name: 'timeDescription',
      title: 'Time Description',
      type: 'string',
      group: 'timing',
      description:
        'Flexible time description (e.g., "8PM - LATE", "2PM - 11PM", "9PM - 3AM", "All Day"). This gives you full control over how time is displayed.',
      placeholder: 'e.g., 8PM - LATE',
      validation: (Rule) => Rule.max(50).warning('Keep time description concise'),
    }),
    defineField({
      name: 'pastEventText',
      title: 'Past Event Text',
      type: 'text',
      group: 'past',
      rows: 3,
      description:
        'Text that will display over the event image when the event has ended. Use line breaks to separate sentences. Event becomes "past" at 12:00 AM the day after the Start Date (single-day events) or End Date (multi-day events).',
      initialValue: 'This Event Has Been.\nThanks For Your Support.',
    }),
    defineField({
      name: 'pastEventLinkBehavior',
      title: 'Link Behavior When Event Has Passed',
      type: 'string',
      group: 'past',
      options: {
        list: [
          {
            title: 'Keep the same link',
            value: 'keep',
          },
          {
            title: 'Change to a different link',
            value: 'change',
          },
          {
            title: 'Remove the link entirely',
            value: 'remove',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'keep',
      description:
        'Choose what happens to the event link after the event has ended. "Keep the same link" will use the original event link (or no link if none was provided).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pastEventLink',
      title: 'Past Event Link',
      type: 'url',
      group: 'past',
      description: 'Enter the new URL to use when the event has ended.',
      placeholder: 'https://example.com',
      hidden: ({ parent }) => parent?.pastEventLinkBehavior !== 'change',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.pastEventLinkBehavior === 'change') {
            if (!value) {
              return 'Please enter a URL for the past event link';
            }
            try {
              new URL(value as string);
              return true;
            } catch {
              return 'Please enter a valid URL starting with http:// or https://';
            }
          }
          return true;
        }),
    }),
  ],
  orderings: [
    {
      title: 'Latest Event First',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Oldest Event First',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Event Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  initialValue: () => ({
    pastEventText: 'This Event Has Been.\nThanks For Your Support.',
  }),
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
      startDate: 'startDate',
      endDate: 'endDate',
      timeDescription: 'timeDescription',
      venue: 'venue',
    },
    prepare({ title, subtitle, media, startDate, endDate, timeDescription, venue }) {
      const date = startDate ? new Date(startDate).toLocaleDateString() : '';
      const endDateStr = endDate ? ` - ${new Date(endDate).toLocaleDateString()}` : '';
      const timeString = timeDescription ? ` • ${timeDescription}` : '';
      const venueString = venue ? ` @ ${venue}` : '';
      const locationString = subtitle ? ` • ${subtitle}` : '';

      const dateTimeString = date ? ` • ${date}${endDateStr}${timeString}` : '';

      return {
        title: title || 'Untitled Event',
        subtitle: `${venueString}${locationString}${dateTimeString}`.replace(/^• /, ''),
        media,
      };
    },
  },
});
