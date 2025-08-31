// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField } from 'sanity';
import { SectionDropdown } from '../../components/SectionDropdown';

/**
 * SINGLE SOURCE OF TRUTH FOR ALL LINK TYPES
 * When adding new page types, only update this array
 */
export const LINKABLE_PAGE_TYPES = [
  { type: 'page' },
  { type: 'homePage' },
  { type: 'eventsIndexPage' },
  { type: 'collab' },
  // Add new page types here as the website grows
  // { type: 'artist' },
  // { type: 'company' },
] as const;

/**
 * Standard link type options - used across all link fields
 */
export const LINK_TYPE_OPTIONS = [
  { title: 'Internal Page', value: 'internal' },
  { title: 'External URL', value: 'external' },
] as const;

/**
 * Create a complete link field set (linkType + internalLink + externalUrl + openInNewTab + pageSection)
 * This is the most comprehensive link setup for buttons and similar components
 */
export const createLinkFieldSet = (
  options: {
    group?: string;
    linkTypeConfig?: {
      name?: string;
      title?: string;
      description?: string;
      initialValue?: 'internal' | 'external';
    };
    internalLinkConfig?: {
      name?: string;
      title?: string;
      description?: string;
      hidden?: (context: { parent?: Record<string, unknown> }) => boolean;
      validationMessage?: string;
    };
    externalUrlConfig?: {
      name?: string;
      title?: string;
      description?: string;
      placeholder?: string;
      hidden?: (context: { parent?: Record<string, unknown> }) => boolean;
      validationMessage?: string;
    };
    openInNewTabConfig?: {
      name?: string;
      title?: string;
      description?: string;
      hidden?: (context: { parent?: Record<string, unknown> }) => boolean;
      initialValue?: boolean;
    };
    pageSectionConfig?: {
      name?: string;
      title?: string;
      description?: string;
      hidden?: (context: { parent?: Record<string, unknown> }) => boolean;
    };
  } = {}
) => {
  const {
    group,
    linkTypeConfig = {},
    internalLinkConfig = {},
    externalUrlConfig = {},
    openInNewTabConfig = {},
    pageSectionConfig = {},
  } = options;

  return [
    // Link Type Selection
    defineField({
      name: linkTypeConfig.name || 'linkType',
      title: linkTypeConfig.title || 'Link Type',
      type: 'string',
      group,
      options: {
        list: [...LINK_TYPE_OPTIONS],
      },
      initialValue: linkTypeConfig.initialValue || 'internal',
      description:
        linkTypeConfig.description ||
        'Choose whether this links to another page on your site or an external URL',
    }),

    // Internal Link Reference
    defineField({
      name: internalLinkConfig.name || 'internalLink',
      title: internalLinkConfig.title || 'Internal Page',
      type: 'reference',
      group,
      to: [...LINKABLE_PAGE_TYPES],
      description:
        internalLinkConfig.description ||
        'Select a page from your website. If left empty, will link to the home page',
      hidden: internalLinkConfig.hidden || (({ parent }) => parent?.linkType !== 'internal'),
      // Removed validation - making this field optional
    }),

    // External URL
    defineField({
      name: externalUrlConfig.name || 'externalUrl',
      title: externalUrlConfig.title || 'External URL',
      type: 'url',
      group,
      description:
        externalUrlConfig.description || 'Enter the full URL (e.g., https://example.com)',
      placeholder: externalUrlConfig.placeholder || 'https://example.com',
      hidden: externalUrlConfig.hidden || (({ parent }) => parent?.linkType !== 'external'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.linkType === 'external') {
            if (!value) {
              return externalUrlConfig.validationMessage || 'Please enter an external URL';
            }
            try {
              new URL(value as string);
              return true;
            } catch {
              return 'Please enter a valid URL';
            }
          }
          return true;
        }),
    }),

    // Page Section Dropdown (searchable dropdown with all available sections)
    defineField({
      name: pageSectionConfig.name || 'pageSectionId',
      title: pageSectionConfig.title || 'Section Anchor ID (Optional)',
      type: 'string',
      group,
      description:
        pageSectionConfig.description ||
        'Select a section from the chosen page to link directly to it. Use the dropdown to choose from available sections.',
      components: {
        input: SectionDropdown,
      },
      hidden: pageSectionConfig.hidden || (({ parent }) => parent?.linkType !== 'internal'),
    }),

    // Open in New Tab
    defineField({
      name: openInNewTabConfig.name || 'openInNewTab',
      title: openInNewTabConfig.title || 'Open in New Tab',
      type: 'boolean',
      group,
      description:
        openInNewTabConfig.description || 'Check this to open the link in a new tab/window',
      initialValue: openInNewTabConfig.initialValue ?? false,
      hidden: openInNewTabConfig.hidden || (({ parent }) => parent?.linkType !== 'internal'),
    }),
  ];
};

/**
 * Create just an internal link reference field
 * Useful for simpler cases where you only need internal linking
 */
export const createInternalLinkField = (
  options: {
    name?: string;
    title?: string;
    description?: string;
    group?: string;
    hidden?: (context: { parent?: Record<string, unknown> }) => boolean;
    validationCondition?: (parent: Record<string, unknown>) => boolean;
    validationMessage?: string;
    makeOptional?: boolean; // New option to control validation
  } = {}
) => {
  return defineField({
    name: options.name || 'internalLink',
    title: options.title || (options.makeOptional ? 'Internal Page (Optional)' : 'Internal Page'),
    type: 'reference',
    group: options.group,
    to: [...LINKABLE_PAGE_TYPES],
    description:
      options.description ||
      (options.makeOptional
        ? 'Select a page from your website. If left empty, will link to the home page'
        : 'Select a page from your website'),
    hidden: options.hidden,
    validation: options.makeOptional
      ? undefined
      : (Rule) =>
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
 */
export const standardInternalLinkField = createInternalLinkField({
  hidden: ({ parent }) => parent?.linkType !== 'internal',
});

/**
 * Standard complete link field set for buttons
 */
export const standardLinkFieldSet = createLinkFieldSet();
