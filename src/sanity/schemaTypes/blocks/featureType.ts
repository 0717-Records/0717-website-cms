import { defineType, defineField } from 'sanity';

export const featureType = defineType({
  name: 'feature',
  title: 'Feature Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Card Style', value: 'card' },
          { title: 'Inline Style', value: 'inline' },
          { title: 'Banner Style', value: 'banner' },
        ],
      },
      initialValue: 'card',
    }),
    defineField({
      name: 'content',
      title: 'Nested Content',
      type: 'array',
      description: 'Blocks that can be nested within this feature',
      of: [
        // Feature can contain various blocks but NOT sections
        { type: 'splitImage' },
        { type: 'hero' },
        // Features can even contain other features for complex nested structures
        { type: 'feature' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'icon',
      content: 'content',
      layout: 'layout',
    },
    prepare({ title, media, content, layout }) {
      const blockCount = Array.isArray(content) ? content.length : 0;
      return {
        title: title || 'Feature Block',
        subtitle: `${layout || 'card'} layout • ${blockCount} nested block${blockCount !== 1 ? 's' : ''}`,
        media,
      };
    },
  },
});
