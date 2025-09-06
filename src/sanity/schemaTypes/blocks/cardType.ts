// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { createCTAListField } from '../shared/ctaListType';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    { name: 'style', title: 'Style' },
    { name: 'content', title: 'Content' },
    { name: 'cta', title: 'Call to Action' },
  ],
  fields: [
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { 
            title: 'Feature Card', 
            value: 'feature',
          },
          { 
            title: 'Statement Card', 
            value: 'statement',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'feature',
      description: 'Choose the card layout style:\n\n• Feature Card: Standard layout with icon, title, description, and button arranged vertically. Perfect for highlighting services, features, or benefits.\n\n• Statement Card: Decorative layout with larger text and creative arrangement. Ideal for showcasing core values, mission statements, or key principles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      group: 'content',
      description: 'Optional icon to display in the card',
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
    createCTAListField({
      name: 'ctaList',
      title: 'Call to Action Buttons',
      description: 'Add call-to-action buttons for this card. Leave empty if no CTA is needed.',
      group: 'cta',
      maxItems: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      bodyText: 'bodyText',
      cardStyle: 'cardStyle',
      ctaList: 'ctaList',
    },
    prepare({ title, icon, bodyText, cardStyle, ctaList }) {
      const displayTitle = title || 'Untitled Card';
      const styleLabel = cardStyle === 'statement' ? 'Statement' : 'Feature';
      const ctaCount = ctaList?.length || 0;
      const ctaLabel = ctaCount > 0 ? ` • ${ctaCount} CTA${ctaCount !== 1 ? 's' : ''}` : '';
      
      const subtitle = icon
        ? `${styleLabel} • Icon: ${icon}${ctaLabel}`
        : bodyText
          ? `${styleLabel} • ${bodyText.slice(0, 30)}...${ctaLabel}`
          : `${styleLabel} • No content${ctaLabel}`;

      return {
        title: displayTitle,
        subtitle,
        media: DocumentIcon,
      };
    },
  },
});