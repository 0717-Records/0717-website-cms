// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const collabAllBlockType = defineType({
  name: 'collabAllBlock',
  title: 'Collaboration Block - All Collaborations',
  type: 'object',
  icon: UsersIcon,
  description: 'Shows all collaborations in a responsive grid layout',
  fields: [
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text that appears on all the CTA buttons across all collaboration cards',
      initialValue: 'View Details',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(50)
          .error('CTA button text is required and must be under 50 characters'),
    }),
    defineField({
      name: 'noCollabsMessage',
      title: 'No Collaborations Message',
      type: 'string',
      description: 'Message to display when there are no collaborations available',
      initialValue: 'No collaborations available at the moment. Check back soon!',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(200)
          .error('No collaborations message is required and must be under 200 characters'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'All Collaborations Block',
        subtitle: 'Displays all collaborations in a responsive grid',
        media: UsersIcon,
      };
    },
  },
});