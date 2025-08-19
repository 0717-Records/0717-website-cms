import { defineType, defineField } from 'sanity';

export const dividerType = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  options: {
    columns: 1,
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'style',
      title: 'Divider Added!',
      type: 'string',
      initialValue: 'You can close this dialog',
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Divider',
        subtitle: 'Decorative section divider',
      };
    },
  },
});
