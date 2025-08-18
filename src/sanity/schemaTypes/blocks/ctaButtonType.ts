import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const ctaButtonType = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  icon: LinkIcon,
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
      name: 'link',
      title: 'Link',
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: 'content',
      description: 'The text that will appear on the button',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Filled (Default)', value: 'filled' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'filled',
      description: 'Choose the visual style of the button',
    }),
    defineField({
      name: 'alignment',
      title: 'Button Alignment',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Inherit from parent (Default)', value: 'inherit' },
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'inherit',
      description: 'How the button should be aligned within its container',
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      group: 'link',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
      },
      initialValue: 'internal',
      description: 'Choose whether this links to another page on your site or an external URL',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Page',
      type: 'reference',
      group: 'link',
      to: [{ type: 'page' }],
      description: 'Select a page from your website',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.linkType === 'internal' && !value) {
            return 'Please select a page to link to';
          }
          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'link',
      description: 'Enter the full URL (e.g., https://example.com)',
      placeholder: 'https://example.com',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown>;
          if (parent?.linkType === 'external') {
            if (!value) {
              return 'Please enter an external URL';
            }
            // Basic URL validation
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
  ],
  preview: {
    select: {
      text: 'text',
      variant: 'variant',
      linkType: 'linkType',
      internalTitle: 'internalLink.title',
      externalUrl: 'externalUrl',
    },
    prepare({ text, variant, linkType, internalTitle, externalUrl }) {
      const buttonText = text || 'Untitled Button';
      const style = variant === 'outline' ? 'Outline' : 'Filled';
      
      let linkInfo = 'No link';
      if (linkType === 'internal' && internalTitle) {
        linkInfo = `→ ${internalTitle}`;
      } else if (linkType === 'external' && externalUrl) {
        try {
          const url = new URL(externalUrl);
          linkInfo = `→ ${url.hostname}`;
        } catch {
          linkInfo = '→ External URL';
        }
      }

      return {
        title: buttonText,
        subtitle: `${style} button • ${linkInfo}`,
        media: LinkIcon,
      };
    },
  },
});