// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { LINKABLE_PAGE_TYPES, LINK_TYPE_OPTIONS } from '../shared/linkSystem';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    { name: 'style', title: 'Style' },
    { name: 'content', title: 'Content' },
    { name: 'button', title: 'Button' },
  ],
  fields: [
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { 
            title: 'Feature Card', 
            value: 'feature',
          },
          { 
            title: 'Statement Card', 
            value: 'statement',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'feature',
      description: 'Choose the card layout style:\n\n• Feature Card: Standard layout with icon, title, description, and button arranged vertically. Perfect for highlighting services, features, or benefits.\n\n• Statement Card: Decorative layout with larger text and creative arrangement. Ideal for showcasing core values, mission statements, or key principles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      group: 'content',
      description: 'Optional icon to display in the card',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Card title (will be styled as h3)',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Main content text for the card',
    }),
    defineField({
      name: 'buttonType',
      title: 'Button Type',
      type: 'string',
      group: 'button',
      options: {
        list: [
          { title: 'No Button', value: 'none' },
          { title: 'Link Button', value: 'link' },
          { title: 'Email Button', value: 'email' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description:
        'Choose the type of button to display, or select "No Button" if the call-to-action is in the text only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: 'button',
      description: 'The text that will appear on the button',
      hidden: ({ parent }) => parent?.buttonType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.buttonType === 'link') {
            if (!value || value.length < 1) return 'Button text is required';
            if (value.length > 50) return 'Button text must be at most 50 characters';
          }
          return true;
        }),
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      group: 'button',
      options: {
        list: [
          { title: 'Filled (Default)', value: 'filled' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'filled',
      description: 'Choose the visual style of the button',
      hidden: ({ parent }) => parent?.buttonType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.buttonType === 'link' && !value) {
            return 'Button style is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      group: 'button',
      options: {
        list: [...LINK_TYPE_OPTIONS],
      },
      initialValue: 'internal',
      description: 'Choose whether this links to another page on your site or an external URL',
      hidden: ({ parent }) => parent?.buttonType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.buttonType === 'link' && !value) {
            return 'Link type is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Page',
      type: 'reference',
      group: 'button',
      to: [...LINKABLE_PAGE_TYPES],
      description: 'Select a page from your website',
      hidden: ({ parent }) => parent?.buttonType !== 'link' || parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.buttonType === 'link' && parent?.linkType === 'internal' && !value) {
            return 'Please select a page to link to';
          }
          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'button',
      description: 'Enter the full URL (e.g., https://example.com)',
      placeholder: 'https://example.com',
      hidden: ({ parent }) => parent?.buttonType !== 'link' || parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.buttonType === 'link' && parent?.linkType === 'external') {
            if (!value) {
              return 'Please enter an external URL';
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
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      group: 'button',
      description: 'Check this to open the link in a new tab/window',
      initialValue: false,
      hidden: ({ parent }) => parent?.buttonType !== 'link' || parent?.linkType !== 'internal',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      bodyText: 'bodyText',
      cardStyle: 'cardStyle',
    },
    prepare({ title, icon, bodyText, cardStyle }) {
      const displayTitle = title || 'Untitled Card';
      const styleLabel = cardStyle === 'statement' ? 'Statement' : 'Feature';
      const subtitle = icon
        ? `${styleLabel} • Icon: ${icon}`
        : bodyText
          ? `${styleLabel} • ${bodyText.slice(0, 40)}...`
          : `${styleLabel} • No content`;

      return {
        title: displayTitle,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});