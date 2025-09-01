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
          description:
            'Important for accessibility and SEO. Required when an icon image is provided.',
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
    },
    prepare({ media, alt }) {
      return {
        title: 'Icon',
        subtitle: `${alt ? alt : ''}`,
        media: media || ImageIcon,
      };
    },
  },
});
