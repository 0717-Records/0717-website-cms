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
      name: 'ctaBlocks',
      title: 'Call to Action (Optional)',
      type: 'array',
      group: 'content',
      description: 'Optional call to action - can add a link button or email button',
      of: [
        defineArrayMember({
          type: 'embeddedCtaButton',
          title: 'CTA Button',
        }),
        defineArrayMember({
          type: 'embeddedCtaEmailButton',
          title: 'CTA Email Button',
        }),
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'list',
            },
          ],
        },
      },
      validation: (Rule) => Rule.max(1).error('Only one CTA block is allowed'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style',
      richText: 'richText',
      ctaBlocks: 'ctaBlocks',
    },
    prepare({ title, style, richText, ctaBlocks }) {
      const blockTitle = title || 'Side Content Block';
      const styleText = style === 'highlighted' ? 'Highlighted' : 'Plain';

      let ctaText = '';
      if (Array.isArray(ctaBlocks) && ctaBlocks.length > 0) {
        const firstCta = ctaBlocks[0];
        if (firstCta._type === 'embeddedCtaButton') {
          const buttonText = firstCta.text?.slice(0, 20) + '...' || 'Button';
          ctaText = ` • CTA: ${buttonText}`;
        } else if (firstCta._type === 'embeddedCtaEmailButton') {
          ctaText = ' • Email Button';
        }
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
