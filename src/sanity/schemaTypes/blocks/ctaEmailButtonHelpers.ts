// AI Helper: This is a Sanity CMS schema definition helper. It defines reusable field configurations for CTA Email Button components.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

interface CTAEmailButtonOptions {
  includeAlignment?: boolean;
  name?: string;
  title?: string;
  description?: string;
  groups?: Array<{
    name: string;
    title: string;
  }>;
}

export const createCTAEmailButtonFields = (options: CTAEmailButtonOptions = {}) => {
  const {
    includeAlignment = true,
    groups = [
      { name: 'content', title: 'Content' },
      { name: 'styling', title: 'Styling' },
    ],
  } = options;

  const fields: ReturnType<typeof defineField>[] = [
    defineField({
      name: 'buttonText',
      title: 'Email Button Added!',
      type: 'string',
      group: groups.length > 0 ? 'content' : undefined,
      initialValue: 'You can close this dialog',
      readOnly: true,
    }),
  ];

  // Add alignment field if requested
  if (includeAlignment) {
    fields.push(
      defineField({
        name: 'alignment',
        title: 'Button Alignment',
        type: 'string',
        group: groups.length > 0 ? 'styling' : undefined,
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
      })
    );
  }

  return fields;
};

export const createCTAEmailButtonPreview = () => ({
  prepare() {
    return {
      title: 'Copy Email Button',
      subtitle: 'Displays company email with copy to clipboard functionality',
      media: EnvelopeIcon,
    };
  },
});