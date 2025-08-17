import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      description: 'Optional icon to display at the top of the card',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Card title (will be styled as h3)',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      description: 'Main content text for the card',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      description: 'Optional call-to-action button',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      bodyText: 'bodyText',
    },
    prepare({ title, icon, bodyText }) {
      const displayTitle = title || 'Untitled Card';
      const subtitle = icon ? `Icon: ${icon}` : bodyText ? `${bodyText.slice(0, 50)}...` : 'No content';

      return {
        title: displayTitle,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});
