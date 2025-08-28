import { defineType, defineField } from 'sanity';
import { ControlsIcon } from '@sanity/icons';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'companyLinks',
      title: 'Company Links',
    },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The main title of your website',
      group: 'general',
    }),
    defineField({
      name: 'companyEmail',
      type: 'string',
      title: 'Company Email',
      description: 'Primary contact email for your company',
      validation: (Rule) => Rule.email(),
      group: 'general',
    }),
    defineField({
      name: 'siteDescription',
      type: 'text',
      title: 'Site Description',
      description: 'A brief description of your website (used for SEO)',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'companyLinks',
      type: 'companyLinksArray',
      title: 'Company Social Links',
      description: 'Manage your company\'s social media links with drag-and-drop ordering. These can be displayed throughout your site.',
      group: 'companyLinks',
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
