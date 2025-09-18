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
    defineField({
      name: 'hamburgerCallout',
      title: 'Hamburger Menu Callout',
      type: 'object',
      description: 'Settings for the callout that appears next to the hamburger menu button',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Callout',
          type: 'boolean',
          description: 'Toggle to show or hide the hamburger menu callout',
          initialValue: true,
        }),
        defineField({
          name: 'text',
          title: 'Callout Text',
          type: 'string',
          description: 'Text to display in the callout bubble',
          initialValue: 'Explore more content',
          validation: (rule) => rule.max(50).warning('Keep text short for better display'),
        }),
        defineField({
          name: 'hideDelay',
          title: 'Hide Delay (seconds)',
          type: 'number',
          description: 'How long the callout remains visible before auto-hiding',
          initialValue: 5,
          validation: (rule) => rule.min(1).max(30).integer(),
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
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
