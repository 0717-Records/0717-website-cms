import { defineType, defineArrayMember, defineField } from 'sanity';

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  description: 'A nestable section for organizing content with semantic heading hierarchy (no subtitle)',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for this section (used to generate semantic heading hierarchy)',
      validation: (Rule) => Rule.required().error('Section title is required'),
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      description: 'Text alignment for this section and its content (overrides parent section alignment)',
      options: {
        list: [
          { title: 'Inherit from Parent', value: 'inherit' },
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'inherit',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'section' }),
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'itemList' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'cardGrid' }),
        defineArrayMember({ type: 'icon' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'imageGallery' }),
        // Add other block types here as you create them
        // Note: Sections can now contain nested sections for proper semantic hierarchy
      ],
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
