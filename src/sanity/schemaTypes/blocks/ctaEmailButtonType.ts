import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export const ctaEmailButtonType = defineType({
  name: 'ctaEmailButton',
  title: 'CTA Email Button',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'A button that displays the company email and copies it to clipboard when clicked',
  options: {
    columns: 1,
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Email Button Added!',
      type: 'string',
      initialValue: 'You can close this dialog',
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Copy Email Button',
        subtitle: 'Displays company email with copy to clipboard functionality',
        media: EnvelopeIcon,
      };
    },
  },
});
