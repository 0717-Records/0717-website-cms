import { defineType, defineArrayMember, defineField } from 'sanity';

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  description: 'A page-level section with title, subtitle, and content blocks (cannot be nested)',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for this section (will be rendered as h2)',
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
        defineArrayMember({ type: 'section' }),
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'itemList' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'cardGrid' }),
        defineArrayMember({ type: 'icon' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'imageGallery' }),
        // Note: pageSection cannot contain other pageSections - only regular nestable sections
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      content: 'content',
    },
    prepare({ title, subtitle, content }) {
      const blockCount = Array.isArray(content) ? content.length : 0;
      const displaySubtitle = subtitle 
        ? `${subtitle.slice(0, 50)}${subtitle.length > 50 ? '...' : ''}`
        : `${blockCount} block${blockCount !== 1 ? 's' : ''}`;
      
      return {
        title: title || 'Page Section',
        subtitle: displaySubtitle,
      };
    },
  },
});