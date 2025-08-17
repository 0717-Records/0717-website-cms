import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const iconType = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Icon Image',
      type: 'image',
      description: 'Upload an icon image (recommended: 40x40px or square aspect ratio)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO. Required when an icon image is provided.',
        },
      ],
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
      initialValue: 'center',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alignment: 'alignment',
      alt: 'image.alt',
    },
    prepare({ media, alignment, alt }) {
      return {
        title: `Icon${alt ? ` - ${alt}` : ''}`,
        subtitle: `Aligned ${alignment}`,
        media: media || ImageIcon,
      };
    },
  },
});