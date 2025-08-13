import { defineType, defineArrayMember, defineField } from 'sanity';

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  description: 'A section contains blocks and provides semantic structure to your page',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'splitImage' }),
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'feature' }),
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
      content: 'content',
    },
    prepare({ content }) {
      const blockCount = Array.isArray(content) ? content.length : 0;
      return {
        title: `Section`,
        subtitle: blockCount === 1 ? '1 block' : `${blockCount} blocks`,
      };
    },
  },
});
