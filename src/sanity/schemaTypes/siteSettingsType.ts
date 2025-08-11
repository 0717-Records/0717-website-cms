import { defineType, defineField } from 'sanity';
import { ControlsIcon } from '@sanity/icons';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: 'The title of your website',
    }),
    // Additional site settings can be added here
    // The home page is now managed as a separate singleton
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
