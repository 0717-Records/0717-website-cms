import { defineField, defineType, defineArrayMember } from 'sanity';

export const gridType = defineType({
  name: 'grid',
  title: 'Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '2',
      validation: (Rule) => Rule.required(),
    }),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        defineArrayMember({ type: 'itemList' }),
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'cardGrid' }),
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
      itemCount: 'items.length',
    },
    prepare({ columns, itemCount }) {
      return {
        title: `Grid - ${columns} columns`,
        subtitle: `${itemCount || 0} items`,
      };
    },
  },
});
