// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Footer Logo',
      description: 'Logo image that appears in the footer (can be different from header logo). Company email and company links can be managed under Site Management → Site Settings.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'footerMessages',
      type: 'array',
      title: 'Footer Messages',
      description: 'Add messages that will appear below the logo in the footer',
      of: [
        {
          type: 'object',
          title: 'Footer Message',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Message Title',
              description: 'Optional title for the message (e.g., "To All Artists:")',
              validation: (Rule) => Rule.max(100).warning('Keep titles concise for better display'),
            }),
            defineField({
              name: 'message',
              type: 'string',
              title: 'Message Text',
              description: 'The main message content (e.g., "Thank you for creating")',
              validation: (Rule) => Rule.max(200).warning('Keep messages concise for better display'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              message: 'message',
            },
            prepare({ title, message }) {
              const displayTitle = title || 'Untitled Message';
              const displaySubtitle = message ? message.substring(0, 50) + (message.length > 50 ? '...' : '') : 'No message';
              return {
                title: displayTitle,
                subtitle: displaySubtitle,
              };
            },
          },
        },
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'Copyright notice that appears at the bottom of the footer',
      initialValue: '© 07:17 Records 2025',
      validation: (Rule) => Rule.required().error('Copyright text is required'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Site footer content and messages',
      };
    },
  },
});
