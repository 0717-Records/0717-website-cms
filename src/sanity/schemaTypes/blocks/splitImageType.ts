import { defineField, defineType } from 'sanity';
import { BlockContentIcon } from '@sanity/icons';

export const splitImageType = defineType({
  name: 'splitImage',
  type: 'object',
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          { value: 'imageLeft', title: 'Image Left' },
          { value: 'imageRight', title: 'Image Right' },
        ],
      },
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Content',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      content: 'content',
      media: 'image',
    },
    prepare({ content, media }) {
      return {
        title: 'Split Image',
        subtitle: content ? 'With rich text content' : 'No content',
        media: media ?? BlockContentIcon,
      };
    },
  },
});
