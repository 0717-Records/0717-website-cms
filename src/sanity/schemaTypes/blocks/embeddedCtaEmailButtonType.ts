// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';
import { createCTAEmailButtonFields, createCTAEmailButtonPreview } from './ctaEmailButtonHelpers';

export const embeddedCtaEmailButtonType = defineType({
  name: 'embeddedCtaEmailButton',
  title: 'CTA Email Button',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'A button that displays the company email and copies it to clipboard when clicked',
  fields: createCTAEmailButtonFields({
    includeAlignment: false,
    groups: [], // No groups for embedded use
  }),
  preview: createCTAEmailButtonPreview(),
});