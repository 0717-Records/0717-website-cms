import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const ctaCardType = defineType({
  name: 'ctaCard',
  title: 'CTA Card',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'button',
      title: 'Button',
    },
  ],
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      group: 'content',
      description: 'Optional icon to display at the top of the card',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Card title (will be styled as h3)',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Main content text for the card',
    }),
    defineField({
      name: 'button',
      title: 'Call to Action Button',
      type: 'embeddedCtaButton',
      group: 'button',
      description: 'Call-to-action button for the card',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      bodyText: 'bodyText',
    },
    prepare({ title, icon, bodyText }) {
      const displayTitle = title || 'Untitled CTA Card';
      const subtitle = icon
        ? `Icon: ${icon}`
        : bodyText
          ? `${bodyText.slice(0, 50)}...`
          : 'No content';

      return {
        title: displayTitle,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});
