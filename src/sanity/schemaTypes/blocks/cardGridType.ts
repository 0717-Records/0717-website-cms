import { defineField, defineType, defineArrayMember } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export const cardGridType = defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  type: 'object',
  icon: ComponentIcon,
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'card',
          title: 'Card',
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Card grid must contain at least one card'),
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
      cards: 'cards',
    },
    prepare({ columns, cards }) {
      const cardCount = cards?.length || 0;
      const title = `Card Grid (${columns} columns)`;
      const subtitle = `${cardCount} card${cardCount !== 1 ? 's' : ''}`;

      return {
        title,
        subtitle,
        media: ComponentIcon,
      };
    },
  },
});
