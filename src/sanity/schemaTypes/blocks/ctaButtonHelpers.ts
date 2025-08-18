import { defineField } from 'sanity';
import { LinkIcon } from '@sanity/icons';

interface CTAButtonOptions {
  includeAlignment?: boolean;
  includeVariant?: boolean;
  name?: string;
  title?: string;
  description?: string;
  groups?: Array<{
    name: string;
    title: string;
  }>;
}

export const createCTAButtonFields = (options: CTAButtonOptions = {}) => {
  const {
    includeAlignment = true,
    includeVariant = true,
    groups = [
      { name: 'content', title: 'Content' },
      { name: 'styling', title: 'Styling' },
      { name: 'link', title: 'Link' },
    ]
  } = options;

  const fields: ReturnType<typeof defineField>[] = [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: groups.length > 0 ? 'content' : undefined,
      description: 'The text that will appear on the button',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
  ];

  // Add variant field if requested
  if (includeVariant) {
    fields.push(
      defineField({
        name: 'variant',
        title: 'Button Style',
        type: 'string',
        group: groups.length > 0 ? 'styling' : undefined,
        options: {
          list: [
            { title: 'Filled (Default)', value: 'filled' },
            { title: 'Outline', value: 'outline' },
          ],
        },
        initialValue: 'filled',
        description: 'Choose the visual style of the button',
      })
    );
  }

  // Add alignment field if requested
  if (includeAlignment) {
    fields.push(
      defineField({
        name: 'alignment',
        title: 'Button Alignment',
        type: 'string',
        group: groups.length > 0 ? 'styling' : undefined,
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
      })
    );
  }

  // Add link fields
  fields.push(
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      group: groups.length > 0 ? 'link' : undefined,
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
      group: groups.length > 0 ? 'link' : undefined,
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
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      group: groups.length > 0 ? 'link' : undefined,
      description: 'Check this to open the link in a new tab/window',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: groups.length > 0 ? 'link' : undefined,
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
            try {
              new URL(value as string);
              return true;
            } catch {
              return 'Please enter a valid URL';
            }
          }
          return true;
        }),
    })
  );

  return fields;
};

export const createCTAButtonPreview = () => ({
  select: {
    text: 'text',
    variant: 'variant',
    linkType: 'linkType',
    internalTitle: 'internalLink.title',
    externalUrl: 'externalUrl',
    openInNewTab: 'openInNewTab',
  },
  prepare({ text, variant, linkType, internalTitle, externalUrl, openInNewTab }: {
    text?: string;
    variant?: string;
    linkType?: string;
    internalTitle?: string;
    externalUrl?: string;
    openInNewTab?: boolean;
  }) {
    const buttonText = text || 'Untitled Button';
    const style = variant === 'outline' ? 'Outline' : 'Filled';
    
    let linkInfo = 'No link';
    if (linkType === 'internal' && internalTitle) {
      const newTabIndicator = openInNewTab ? ' ↗' : '';
      linkInfo = `→ ${internalTitle}${newTabIndicator}`;
    } else if (linkType === 'external' && externalUrl) {
      try {
        const url = new URL(externalUrl);
        linkInfo = `→ ${url.hostname} ↗`;
      } catch {
        linkInfo = '→ External URL ↗';
      }
    }

    return {
      title: buttonText,
      subtitle: `${style} button • ${linkInfo}`,
      media: LinkIcon,
    };
  },
});