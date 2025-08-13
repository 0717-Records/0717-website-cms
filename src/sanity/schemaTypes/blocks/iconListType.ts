import { defineField, defineType } from 'sanity';

export const iconListType = defineType({
  name: 'iconList',
  title: 'Icon List',
  type: 'object',
  fields: [
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'listItem',
          title: 'List Item',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required().min(1).max(100),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for accessibility and SEO.',
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'text',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
  ],
  preview: {
    select: {
      items: 'items',
      alignment: 'alignment',
    },
    prepare({ items, alignment }) {
      const itemCount = items?.length || 0;
      const alignmentText =
        alignment === 'center'
          ? 'centered'
          : alignment === 'right'
            ? 'right-aligned'
            : 'left-aligned';
      return {
        title: `Icon List (${itemCount} items)`,
        subtitle: `${alignmentText}`,
      };
    },
  },
});
