// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { createSectionSchema } from './shared/sectionFactory';

export const collabPageSectionType = createSectionSchema({
  name: 'collabPageSection',
  title: 'Collab Page Section',
  description: 'A page-level section for collaboration pages with title and content blocks (will render as h2)',
  icon: '🤝',
  hasSubtitle: false, // No subtitle for collab sections
  hasTextAlign: false, // No text alignment - handled in frontend
  allowedChildSections: ['subSection'],
});