import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const textImageType = defineType({
  name: 'textImage',
  title: 'Text & Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Text Content',
      type: 'blockContent',
      description: 'Rich text content to display alongside the image',
      validation: (Rule) => Rule.required().error('Text content is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) =>
            Rule.required().error('Alternative text is required for accessibility'),
        },
      ],
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description: 'Choose how to arrange text and image',
      options: {
        list: [
          { 
            title: 'Text Left, Image Right', 
            value: 'text-left'
          },
          { 
            title: 'Text Right, Image Left', 
            value: 'text-right'
          },
        ],
        layout: 'radio',
      },
      initialValue: 'text-left',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      image: 'image',
      layout: 'layout',
      alt: 'image.alt',
    },
    prepare({ content, image, layout, alt }) {
      // Try to extract the first text block for preview
      const firstBlock = Array.isArray(content) ? content[0] : null;
      const previewText = firstBlock?.children?.[0]?.text || 'Text content';
      const truncatedText = previewText.length > 40 ? `${previewText.substring(0, 40)}...` : previewText;
      
      const layoutLabel = layout === 'text-right' ? 'Text Right' : 'Text Left';
      
      return {
        title: truncatedText,
        subtitle: `${layoutLabel} • ${alt || 'Image'}`,
        media: image,
      };
    },
  },
});