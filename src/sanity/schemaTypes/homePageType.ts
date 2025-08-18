import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'content',
      title: 'Sections',
    },
  ],
  fields: [
    // Hero Section Fields
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'Main background image for the hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }),
      ],
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero Title',
      description: 'Main heading for the hero section',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
      title: 'Hero Subtitle',
      description: 'Plain text subtitle for the hero section (line breaks allowed)',
      group: 'hero',
    }),
    defineField({
      name: 'enableHeroCallToAction',
      type: 'boolean',
      title: 'Enable Call to Action',
      description: 'Show a call to action button in the hero section',
      group: 'hero',
      initialValue: false,
    }),
    defineField({
      name: 'heroCallToAction',
      type: 'embeddedCtaButton',
      title: 'Call to Action Button',
      description: 'Button or link for the hero section',
      group: 'hero',
      hidden: ({ document }) => !document?.enableHeroCallToAction,
    }),
    defineField({
      name: 'heroContentPosition',
      type: 'string',
      title: 'Content Position',
      description:
        'Choose where to position the hero content over the image. Note: On mobile devices, content is always centered horizontally - only the vertical positioning (top/center/bottom) is applied. Full positioning applies on desktop and larger screens.',
      group: 'hero',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Top Center', value: 'top-center' },
          { title: 'Top Right', value: 'top-right' },
          { title: 'Center Left', value: 'center-left' },
          { title: 'Center Center', value: 'center-center' },
          { title: 'Center Right', value: 'center-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Center', value: 'bottom-center' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'center-center',
    }),

    // Page Content Fields
    defineField({
      name: 'content',
      type: 'pageBuilder',
      title: 'Sections',
      description:
        'Build your page by adding sections. Each section can contain different types of content blocks.',
      group: 'content',
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
