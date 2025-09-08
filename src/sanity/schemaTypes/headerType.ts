import { MenuIcon } from '@sanity/icons';
import { defineField, defineType, defineArrayMember } from 'sanity';

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
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Helps explain what the logo is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        },
      ],
      description: 'Logo image for the header',
    }),
    defineField({
      name: 'horizontalNav',
      title: 'Horizontal Navigation',
      type: 'array',
      description: 'Links displayed in the horizontal navigation bar',
      of: [
        defineArrayMember({
          type: 'navLink',
        }),
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'verticalNav',
      title: 'Vertical Navigation',
      type: 'array',
      description:
        'Links displayed in the vertical navigation menu (when selecting the hamburger icon)',
      of: [
        defineArrayMember({
          type: 'navLink',
        }),
        defineArrayMember({
          type: 'divider',
        }),
      ],
      options: {
        sortable: true,
      },
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
