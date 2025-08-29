// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField } from 'sanity';
import { createCTAButtonFields } from '../blocks/ctaButtonHelpers';

interface ClosingCardOptions {
  group?: string;
  enableByDefault?: boolean;
}

export const createClosingCardFields = (options: ClosingCardOptions = {}) => {
  const { group, enableByDefault = false } = options;

  return [
    defineField({
      name: 'hasClosingCard',
      title: 'Show Closing Card',
      type: 'boolean',
      group,
      description: 'Display a closing card at the bottom of the page with a call-to-action',
      initialValue: enableByDefault,
    }),
    defineField({
      name: 'closingCardTitle',
      title: 'Closing Card Title',
      type: 'string',
      group,
      description: 'Title for the closing card section',
      validation: (Rule) => Rule.max(100),
      hidden: ({ parent }) => !parent?.hasClosingCard,
    }),
    defineField({
      name: 'closingCardMessage',
      title: 'Closing Card Message',
      type: 'string',
      group,
      description: 'Message text for the closing card',
      validation: (Rule) => Rule.max(200),
      hidden: ({ parent }) => !parent?.hasClosingCard,
    }),
    defineField({
      name: 'closingCardCTA',
      title: 'Closing Card CTA Button',
      type: 'object',
      group,
      description: 'Call-to-action button for the closing card',
      fields: createCTAButtonFields({
        includeAlignment: false,
        includeVariant: true,
        groups: [], // No groups for nested fields
      }),
      hidden: ({ parent }) => !parent?.hasClosingCard,
    }),
  ];
};