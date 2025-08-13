import { defineType, defineArrayMember } from 'sanity';
import { ImageIcon, DropIcon } from '@sanity/icons';
import React from 'react';
import BodyTextPreview, { type BlockStyleProps } from '../components/BodyTextPreview';

/**
 * This is the schema type for block content used in the post document type
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
        // Heading Styles
        { title: 'Heading 1 (H1)', value: 'h1' },
        { title: 'Heading 2 (H2)', value: 'h2' },
        { title: 'Heading 3 (H3)', value: 'h3' },
        { title: 'Heading 4 (H4)', value: 'h4' },
        { title: 'Heading 5 (H5)', value: 'h5' },
        { title: 'Heading 6 (H6)', value: 'h6' },

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
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
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
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
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
