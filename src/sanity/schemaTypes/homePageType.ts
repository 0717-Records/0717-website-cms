import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Home Page',
      description: 'The title of your home page',
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
      title: 'Page Content',
      description: 'The content blocks for your home page',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
      description: 'Main image for the home page (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Site homepage content',
      };
    },
  },
});
