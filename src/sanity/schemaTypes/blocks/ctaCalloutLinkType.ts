import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const ctaCalloutLinkType = defineType({
  name: 'ctaCalloutLink',
  title: 'CTA Callout Link',
  type: 'object',
  icon: LinkIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'link',
      title: 'Link',
    },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (Optional)',
      type: 'string',
      group: 'content',
      description: 'Optional heading text - will be displayed in bold and larger',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      group: 'content',
      description: 'Main text content - supports line breaks',
      validation: (Rule) => Rule.required().min(1).max(500),
    }),
    defineField({
      name: 'image',
      title: 'Image (Optional)',
      type: 'image',
      group: 'content',
      description: 'Optional image - will be displayed in a circular frame',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        }),
      ],
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
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      group: 'link',
      description: 'Check this to open the link in a new tab/window',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== 'internal',
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
      heading: 'heading',
      text: 'text',
      linkType: 'linkType',
      internalTitle: 'internalLink.title',
      externalUrl: 'externalUrl',
      openInNewTab: 'openInNewTab',
      imageAsset: 'image.asset',
    },
    prepare({ heading, text, linkType, internalTitle, externalUrl, openInNewTab, imageAsset }) {
      const title = heading || text?.slice(0, 50) + (text?.length > 50 ? '...' : '') || 'Untitled Callout';
      
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
        title,
        subtitle: linkInfo,
        media: imageAsset || LinkIcon,
      };
    },
  },
});