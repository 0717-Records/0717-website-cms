import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'companyInfo',
      type: 'object',
      title: 'Company Information',
      fields: [
        defineField({
          name: 'companyName',
          type: 'string',
          title: 'Company Name',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Company Description',
          rows: 3,
        }),
        defineField({
          name: 'logo',
          type: 'image',
          title: 'Footer Logo',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      title: 'Contact Information',
      fields: [
        defineField({
          name: 'email',
          type: 'string',
          title: 'Email Address',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
        }),
        defineField({
          name: 'address',
          type: 'text',
          title: 'Physical Address',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      type: 'array',
      title: 'Footer Columns',
      description: 'Add link columns to your footer',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'columnTitle',
              type: 'string',
              title: 'Column Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Link Label',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      type: 'string',
                      title: 'URL',
                      validation: (Rule) => Rule.required(),
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
          ],
          preview: {
            select: {
              title: 'columnTitle',
              linksCount: 'links.length',
            },
            prepare({ title, linksCount }) {
              return {
                title,
                subtitle: `${linksCount || 0} links`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      type: 'array',
      title: 'Social Media Links',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'Profile URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'customName',
              type: 'string',
              title: 'Custom Platform Name',
              description: 'Only used if "Other" is selected',
              hidden: ({ parent }) => parent?.platform !== 'other',
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              customName: 'customName',
              url: 'url',
            },
            prepare({ platform, customName, url }) {
              const title = platform === 'other' ? customName : platform;
              return {
                title: title || 'Social Media Link',
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      initialValue: '© 2025 Your Company Name. All rights reserved.',
    }),
    defineField({
      name: 'bottomLinks',
      type: 'array',
      title: 'Bottom Links',
      description: 'Links that appear at the bottom of the footer (e.g., Privacy Policy, Terms)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Link Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'string',
              title: 'URL',
              validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Site footer content and links',
      };
    },
  },
});
