import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { createLinkFieldSet } from '../shared/linkSystem';

export const ctaButtonType = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  icon: LinkIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
    {
      name: 'link',
      title: 'Link',
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: 'content',
      description: 'The text that will appear on the button',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Filled (Default)', value: 'filled' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'filled',
      description: 'Choose the visual style of the button',
    }),
    defineField({
      name: 'alignment',
      title: 'Button Alignment',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          { title: 'Inherit from parent (Default)', value: 'inherit' },
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'inherit',
      description: 'How the button should be aligned within its container',
    }),
    // Use unified link system
    ...createLinkFieldSet({ group: 'link' }),
  ],
  preview: {
    select: {
      text: 'text',
      variant: 'variant',
      linkType: 'linkType',
      internalTitle: 'internalLink.title',
      externalUrl: 'externalUrl',
      openInNewTab: 'openInNewTab',
    },
    prepare({ text, variant, linkType, internalTitle, externalUrl, openInNewTab }) {
      const buttonText = text || 'Untitled Button';
      const style = variant === 'outline' ? 'Outline' : 'Filled';
      
      let linkInfo = 'No link';
      if (linkType === 'internal' && internalTitle) {
        const newTabIndicator = openInNewTab ? ' ↗' : '';
        linkInfo = `→ ${internalTitle}${newTabIndicator}`;
      } else if (linkType === 'external' && externalUrl) {
        try {
          const url = new URL(externalUrl);
          linkInfo = `→ ${url.hostname} ↗`;
        } catch {
          linkInfo = '→ External URL ↗';
        }
      }

      return {
        title: buttonText,
        subtitle: `${style} button • ${linkInfo}`,
        media: LinkIcon,
      };
    },
  },
});