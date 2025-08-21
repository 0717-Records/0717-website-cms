// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const sideContentBlockType = defineType({
  name: 'sideContentBlock',
  title: 'Side Content Block',
  type: 'object',
  icon: DocumentIcon,
  description: 'A content block for sidebar/aside sections with optional CTA',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
    {
      name: 'cta',
      title: 'Call to Action',
    },
  ],
  fields: [
    defineField({
      name: 'style',
      title: 'Block Style',
      type: 'string',
      group: 'styling',
      description: 'Choose the visual style for this content block',
      options: {
        list: [
          { title: 'Plain (Default)', value: 'plain' },
          { title: 'Highlighted', value: 'highlighted' },
        ],
        layout: 'radio',
      },
      initialValue: 'plain',
    }),
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      group: 'content',
      description: 'Optional title for this content block',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'richText',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
      description: 'Rich text content for this block',
    }),
    defineField({
      name: 'ctaType',
      title: 'Call to Action Type',
      type: 'string',
      group: 'cta',
      description:
        'Choose what type of call to action to include (if any). Company Email Button will render the standard company email button component.',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Button Link', value: 'button' },
          { title: 'Company Email Button', value: 'email' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
      group: 'cta',
      description: 'Configure the button link',
      hidden: ({ parent }) => parent?.ctaType !== 'button',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.ctaType === 'button' && !value) {
            return 'Please configure the button settings';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style',
      ctaType: 'ctaType',
      ctaButtonText: 'ctaButton.text',
      richText: 'richText',
    },
    prepare({ title, style, ctaType, ctaButtonText, richText }) {
      const blockTitle = title || 'Side Content Block';
      const styleText = style === 'highlighted' ? 'Highlighted' : 'Plain';

      let ctaText = '';
      if (ctaType === 'button' && ctaButtonText) {
        ctaText = ` • Button: ${ctaButtonText}`;
      } else if (ctaType === 'email') {
        ctaText = ' • Company Email Button';
      }

      const hasContent = Array.isArray(richText) && richText.length > 0;
      const contentIndicator = hasContent ? ' • Has content' : ' • No content';

      return {
        title: blockTitle,
        subtitle: `${styleText}${contentIndicator}${ctaText}`,
        media: DocumentIcon,
      };
    },
  },
});

export const sideContentType = defineType({
  name: 'sideContent',
  title: 'Side Content',
  type: 'array',
  description: 'Content blocks for sidebar/aside sections',
  of: [
    defineArrayMember({
      type: 'sideContentBlock',
    }),
  ],
});
