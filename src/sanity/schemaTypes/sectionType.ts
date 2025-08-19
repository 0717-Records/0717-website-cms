// DEPRECATED: This schema is being phased out in favor of the new structured approach:
// - PageSection (h2) -> SubSection (h3) -> SubSubSection (h4)
// This ensures clear heading hierarchy and prevents infinite nesting

import { createSectionSchema } from './shared/sectionFactory';

// Legacy section type - will be replaced by the new structured hierarchy
export const sectionType = createSectionSchema({
  name: 'section',
  title: 'Section (Legacy)',
  description: 'DEPRECATED: Use SubSection or SubSubSection instead for proper hierarchy',
  icon: '📄',
  hasSubtitle: false,
  allowedChildSections: ['section'], // Allow self-nesting for backwards compatibility
});
