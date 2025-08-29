// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType, defineField } from 'sanity';
import { createLinkFieldSet } from '../shared/linkSystem';

export const navLinkType = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      description: 'The text that will be displayed for this navigation link',
      validation: (Rule) => Rule.required().error('Link label is required'),
    }),
    ...createLinkFieldSet({
      linkTypeConfig: {
        description: 'Choose whether this links to another page on your site or an external URL',
      },
      internalLinkConfig: {
        description: 'Select a page from your website. If left empty, will link to the home page',
      },
      externalUrlConfig: {
        description: 'Enter the full URL (e.g., https://example.com)',
        placeholder: 'https://example.com',
      },
      openInNewTabConfig: {
        description: 'Check this to open the link in a new tab/window',
      },
      pageSectionConfig: {
        description: 'Select a section from the chosen page to link directly to it, or type manually',
      },
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internalLink: 'internalLink.title',
      externalUrl: 'externalUrl',
    },
    prepare(selection) {
      const { title, linkType, internalLink, externalUrl } = selection;
      let subtitle = '';
      
      if (linkType === 'internal') {
        subtitle = internalLink ? `→ ${internalLink}` : '→ Home Page';
      } else if (linkType === 'external') {
        subtitle = externalUrl ? `→ ${externalUrl}` : '→ External URL';
      }
      
      return {
        title: title || 'Navigation Link',
        subtitle,
      };
    },
  },
});