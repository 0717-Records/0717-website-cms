import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';


export const ctaEmailButtonType = defineType({
  name: 'ctaEmailButton',
  title: 'CTA Email Button',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'A button that displays the company email and copies it to clipboard when clicked',
  fields: [
    // Hidden placeholder field - required because Sanity objects need at least one field
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: true,
      initialValue: 'ctaEmailButton',
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