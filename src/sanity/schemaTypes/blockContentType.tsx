import { defineType, defineArrayMember } from 'sanity';
import { ImageIcon, DropIcon, LinkIcon } from '@sanity/icons';
import React from 'react';
import BodyTextPreview, { type BlockStyleProps } from '../components/BodyTextPreview';
import { createLinkFieldSet } from './shared/linkSystem';

/**
 * This is the schema type for block content used across various document types
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        // Default paragraph style  
        { title: 'Normal', value: 'normal' },

        // Body Text Styles with custom previews
        {
          title: 'Body Text - 3X Large',
          value: 'body-3xl',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-3xl'>{props.children}</BodyTextPreview>
          ),
        },
        {
          title: 'Body Text - 2X Large',
          value: 'body-2xl',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-2xl'>{props.children}</BodyTextPreview>
          ),
        },
        {
          title: 'Body Text - Extra Large',
          value: 'body-xl',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-xl'>{props.children}</BodyTextPreview>
          ),
        },
        {
          title: 'Body Text - Large',
          value: 'body-lg',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-lg'>{props.children}</BodyTextPreview>
          ),
        },
        {
          title: 'Body Text - Small',
          value: 'body-sm',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-sm'>{props.children}</BodyTextPreview>
          ),
        },
        {
          title: 'Body Text - Extra Small',
          value: 'body-xs',
          component: (props: BlockStyleProps) => (
            <BodyTextPreview value='body-xs'>{props.children}</BodyTextPreview>
          ),
        },

        // Special Styles
        { title: 'Standout', value: 'standout' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              ...createLinkFieldSet({
                linkTypeConfig: {
                  description: 'Choose whether this links to another page on your site or an external URL'
                },
                internalLinkConfig: {
                  description: 'Select a page from your website to link to'
                },
                externalUrlConfig: {
                  description: 'Enter the full URL (e.g., https://example.com)'
                },
                openInNewTabConfig: {
                  description: 'Check this to open the link in a new tab/window'
                },
                pageSectionConfig: {
                  description: 'Optional: Select a specific section on the page to link to'
                }
              })
            ],
            preview: {
              select: {
                linkType: 'linkType',
                internalTitle: 'internalLink.title',
                externalUrl: 'externalUrl',
                openInNewTab: 'openInNewTab',
              },
              prepare({ linkType, internalTitle, externalUrl, openInNewTab }) {
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
                  title: linkInfo,
                  subtitle: 'Rich Text Link',
                  media: LinkIcon,
                };
              },
            },
          },
          {
            title: 'Color',
            name: 'color',
            type: 'color',
            icon: DropIcon,
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
});
