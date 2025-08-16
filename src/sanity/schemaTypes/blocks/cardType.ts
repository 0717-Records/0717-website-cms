import { defineField, defineType, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'itemList' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'icon' }),
        // Note: cards cannot contain other cards or cardGrids to prevent nesting
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Card must contain at least one content item'),
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const itemCount = content?.length || 0;
      const title = `Card (${itemCount} item${itemCount !== 1 ? 's' : ''})`;

      // Show preview of first content item if available
      const firstItem = content?.[0];
      const subtitle = firstItem ? `First: ${firstItem._type}` : 'Empty card';

      return {
        title,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});
