import { defineType, defineField } from 'sanity';
import { ControlsIcon } from '@sanity/icons';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The main title of your website',
    }),
    defineField({
      name: 'siteDescription',
      type: 'text',
      title: 'Site Description',
      description: 'A brief description of your website (used for SEO)',
      rows: 3,
    }),
    defineField({
      name: 'companyEmail',
      type: 'string',
      title: 'Company Email',
      description: 'Primary contact email for your company',
      validation: (Rule) => Rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
