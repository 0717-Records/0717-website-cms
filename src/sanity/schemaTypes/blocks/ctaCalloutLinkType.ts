import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { createLinkFieldSet } from '../shared/linkSystem';

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
    ...createLinkFieldSet({ group: 'link' }),
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