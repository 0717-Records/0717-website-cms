import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Header Title',
      description: 'Optional title/brand name for the header',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
      description: 'Logo image for the header',
    }),
    defineField({
      name: 'menuItems',
      type: 'array',
      title: 'Menu Items',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Menu Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'Internal path (e.g., /about) or external URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in New Tab',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'Call-to-Action Button',
      description: 'Optional CTA button in the header',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Button Label',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'Button URL',
        }),
        defineField({
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        subtitle: 'Site header settings',
      };
    },
  },
});
