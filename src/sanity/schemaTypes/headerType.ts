import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
      description: 'Logo image for the header',
    }),
    // defineField({
    //   name: 'menuItems',
    //   type: 'array',
    //   title: 'Menu Items',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'label',
    //           type: 'string',
    //           title: 'Menu Label',
    //           validation: (Rule) => Rule.required(),
    //         }),
    //         defineField({
    //           name: 'url',
    //           type: 'string',
    //           title: 'URL',
    //           description: 'Internal path (e.g., /about) or external URL',
    //           validation: (Rule) => Rule.required(),
    //         }),
    //         defineField({
    //           name: 'openInNewTab',
    //           type: 'boolean',
    //           title: 'Open in New Tab',
    //           initialValue: false,
    //         }),
    //       ],
    //       preview: {
    //         select: {
    //           title: 'label',
    //           subtitle: 'url',
    //         },
    //       },
    //     },
    //   ],
    // }),
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
