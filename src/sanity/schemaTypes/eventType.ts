import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const eventType = defineType({
  name: 'event',
  title: 'Events',
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
      name: 'name',
      title: 'Event Name',
      type: 'string',
      group: 'details',
      description: 'The name or title of the event',
      validation: (Rule) => Rule.required().error('Event name is required'),
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
          description: 'Important for SEO and accessibility when image cannot be displayed',
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Event Location',
      type: 'string',
      group: 'details',
      description: 'Where the event is taking place (venue, city, or online)',
      validation: (Rule) => Rule.required().error('Event location is required'),
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
      description: 'The date when the event begins',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required().error('Start date is required'),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'object',
      group: 'timing',
      description: 'Optional start time. Leave empty if time is not specified.',
      fields: [
        {
          name: 'hour',
          title: 'Hour',
          type: 'number',
          options: {
            list: Array.from({ length: 24 }, (_, i) => ({
              title: i.toString().padStart(2, '0'),
              value: i,
            })),
          },
          validation: (Rule) => Rule.min(0).max(23),
        },
        {
          name: 'minute',
          title: 'Minute',
          type: 'number',
          options: {
            list: Array.from({ length: 12 }, (_, i) => ({
              title: (i * 5).toString().padStart(2, '0'),
              value: i * 5,
            })),
          },
          validation: (Rule) => Rule.min(0).max(59),
        },
      ],
      options: {
        columns: 2,
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'timing',
      description:
        'Optional end date. If left empty, the event will be assumed to end at the end of the evening on the start date.',
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
      name: 'endTime',
      title: 'End Time',
      type: 'object',
      group: 'timing',
      description: 'Optional end time. Only relevant if an end date is specified.',
      fields: [
        {
          name: 'hour',
          title: 'Hour',
          type: 'number',
          options: {
            list: Array.from({ length: 24 }, (_, i) => ({
              title: i.toString().padStart(2, '0'),
              value: i,
            })),
          },
          validation: (Rule) => Rule.min(0).max(23),
        },
        {
          name: 'minute',
          title: 'Minute',
          type: 'number',
          options: {
            list: Array.from({ length: 12 }, (_, i) => ({
              title: (i * 5).toString().padStart(2, '0'),
              value: i * 5,
            })),
          },
          validation: (Rule) => Rule.min(0).max(59),
        },
      ],
      options: {
        columns: 2,
      },
      hidden: ({ parent }) => !parent?.endDate,
      validation: (Rule) =>
        Rule.custom((endTime, context) => {
          if (!endTime?.hour && !endTime?.minute) return true; // Optional field

          const parent = context.parent as Record<string, unknown>;
          const startDate = parent?.startDate;
          const endDate = parent?.endDate;
          const startTime = parent?.startTime as { hour?: number; minute?: number } | undefined;

          // If same date and both times provided, end time must be after start time
          if (
            startDate &&
            endDate &&
            startTime &&
            startDate === endDate &&
            typeof startTime.hour === 'number' &&
            typeof startTime.minute === 'number' &&
            typeof endTime.hour === 'number' &&
            typeof endTime.minute === 'number'
          ) {
            const startMinutes = startTime.hour * 60 + startTime.minute;
            const endMinutes = endTime.hour * 60 + endTime.minute;

            if (endMinutes <= startMinutes) {
              return 'End time must be after start time when on the same date';
            }
          }

          return true;
        }),
    }),
    defineField({
      name: 'pastEventText',
      title: 'Past Event Text',
      type: 'text',
      group: 'past',
      rows: 3,
      description:
        'Text that will display over the event image when the event has ended. Use line breaks to separate sentences.',
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
      title: 'Event Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  initialValue: () => ({
    pastEventText: 'This Event Has Been.\nThanks For Your Support.',
  }),
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
      startDate: 'startDate',
      startTime: 'startTime',
    },
    prepare({ title, subtitle, media, startDate, startTime }) {
      const date = startDate ? new Date(startDate).toLocaleDateString() : '';
      let timeString = '';
      if (startTime && typeof startTime.hour === 'number' && typeof startTime.minute === 'number') {
        const hour = startTime.hour.toString().padStart(2, '0');
        const minute = startTime.minute.toString().padStart(2, '0');
        timeString = ` at ${hour}:${minute}`;
      }
      const dateTimeString = date ? ` • ${date}${timeString}` : '';

      return {
        title: title || 'Untitled Event',
        subtitle: `${subtitle || 'No location'}${dateTimeString}`,
        media,
      };
    },
  },
});
