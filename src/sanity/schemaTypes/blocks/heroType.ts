import { defineType, defineField } from 'sanity';

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Nested Content',
      type: 'array',
      description: 'Blocks that can be nested within this hero section',
      of: [
        // Hero can contain other blocks (but NOT sections - sections are root-level only)
        { type: 'splitImage' },
        { type: 'feature' },
        { type: 'divider' },
        // Can even contain other heroes for complex layouts
        { type: 'hero' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
      content: 'content',
    },
    prepare({ title, subtitle, media, content }) {
      const blockCount = Array.isArray(content) ? content.length : 0;
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || `${blockCount} nested block${blockCount !== 1 ? 's' : ''}`,
        media,
      };
    },
  },
});
