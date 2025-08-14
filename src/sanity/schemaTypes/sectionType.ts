import { defineType, defineArrayMember, defineField } from 'sanity';

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  description: 'A section contains blocks and provides semantic structure to your page',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for this section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      description: 'Optional subtitle for this section',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'itemList' }),
        defineArrayMember({ type: 'grid' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'cardGrid' }),
        // Add other block types here as you create them
        // Note: Sections cannot contain other sections - sections are root-level only
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const blockCount = Array.isArray(content) ? content.length : 0;
      return {
        title: title || 'Section',
        subtitle: blockCount === 1 ? '1 block' : `${blockCount} blocks`,
      };
    },
  },
});
