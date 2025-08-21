// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField } from 'sanity';

/**
 * Reusable internal link field configuration
 * This is the single source of truth for all internal page references across the website
 */
export const createInternalLinkField = (options: {
  name?: string;
  title?: string;
  description?: string;
  hidden?: (context: { parent: Record<string, unknown> }) => boolean;
  validationCondition?: (parent: Record<string, unknown>) => boolean;
  validationMessage?: string;
} = {}) => {
  return defineField({
    name: options.name || 'internalLink',
    title: options.title || 'Internal Page',
    type: 'reference',
    description: options.description || 'Select a page from your website',
    to: [
      { type: 'page' },
      { type: 'homePage' },
      { type: 'eventsIndexPage' },
      { type: 'collab' }
      // Add new page types here as the website grows
    ],
    hidden: options.hidden,
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const parent = context.parent as Record<string, unknown>;
        
        // Use custom validation condition if provided
        if (options.validationCondition) {
          if (options.validationCondition(parent) && !value) {
            return options.validationMessage || 'Please select a page to link to';
          }
        } else {
          // Default validation for linkType === 'internal'
          if (parent?.linkType === 'internal' && !value) {
            return options.validationMessage || 'Please select a page to link to';
          }
        }
        
        return true;
      }),
  });
};

/**
 * Standard internal link field for most use cases
 * Hidden when linkType !== 'internal'
 */
export const standardInternalLinkField = createInternalLinkField({
  hidden: ({ parent }) => parent?.linkType !== 'internal',
});