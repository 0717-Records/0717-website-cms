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
      title: 'Page Content',
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
      type: 'blockContent',
      title: 'Hero Subtitle',
      description: 'Rich text subtitle for the hero section',
      group: 'hero',
    }),
    defineField({
      name: 'heroCallToAction',
      type: 'object',
      title: 'Call to Action',
      description: 'Button or link for the hero section',
      group: 'hero',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          description: 'Text displayed on the button',
        }),
        defineField({
          name: 'linkType',
          type: 'string',
          title: 'Link Type',
          description: 'Choose whether to link to an internal page or external URL',
          options: {
            list: [
              { title: 'Internal Page', value: 'internal' },
              { title: 'External URL', value: 'external' },
            ],
            layout: 'radio',
          },
          initialValue: 'internal',
        }),
        defineField({
          name: 'internalLink',
          type: 'reference',
          title: 'Internal Page',
          description: 'Select a page on this website',
          to: [{ type: 'page' }, { type: 'homePage' }],
          hidden: ({ parent }) => parent?.linkType !== 'internal',
        }),
        defineField({
          name: 'externalLink',
          type: 'url',
          title: 'External URL',
          description: 'Enter a full URL (e.g., https://example.com)',
          hidden: ({ parent }) => parent?.linkType !== 'external',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'openInNewTab',
          type: 'boolean',
          title: 'Open in New Tab',
          description: 'Check to open the link in a new tab/window',
          initialValue: false,
          hidden: ({ parent }) => parent?.linkType !== 'external',
        }),
      ],
      preview: {
        select: {
          title: 'text',
          linkType: 'linkType',
          internalLink: 'internalLink.title',
          externalLink: 'externalLink',
        },
        prepare({ title, linkType, internalLink, externalLink }) {
          const subtitle =
            linkType === 'internal'
              ? `Internal: ${internalLink || 'No page selected'}`
              : `External: ${externalLink || 'No URL entered'}`;
          return {
            title: title || 'No button text',
            subtitle,
          };
        },
      },
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
      title: 'Page Content',
      description: 'Additional content blocks for your home page',
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
