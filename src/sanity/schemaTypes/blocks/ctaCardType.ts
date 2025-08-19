import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const ctaCardType = defineType({
  name: 'ctaCard',
  title: 'CTA Card',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'button',
      title: 'Button',
    },
  ],
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      group: 'content',
      description: 'Optional icon to display at the top of the card',
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
          { title: 'Link Button', value: 'link' },
          { title: 'Email Button', value: 'email' },
          { title: 'No Button', value: 'none' }
        ],
        layout: 'radio',
      },
      initialValue: 'link',
      description: 'Choose the type of button to display, or select "No Button" if the call-to-action is in the text only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: 'button',
      description: 'The text that will appear on the button',
      validation: (Rule) => Rule.required().min(1).max(50),
      hidden: ({ parent }) => parent?.buttonType !== 'link',
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
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      group: 'button',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
      },
      initialValue: 'internal',
      description: 'Choose whether this links to another page on your site or an external URL',
      hidden: ({ parent }) => parent?.buttonType !== 'link',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Page',
      type: 'reference',
      group: 'button',
      to: [{ type: 'page' }],
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
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      group: 'button',
      description: 'Check this to open the link in a new tab/window',
      initialValue: false,
      hidden: ({ parent }) => parent?.buttonType !== 'link' || parent?.linkType !== 'internal',
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
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      bodyText: 'bodyText',
    },
    prepare({ title, icon, bodyText }) {
      const displayTitle = title || 'Untitled CTA Card';
      const subtitle = icon
        ? `Icon: ${icon}`
        : bodyText
          ? `${bodyText.slice(0, 50)}...`
          : 'No content';

      return {
        title: displayTitle,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});
