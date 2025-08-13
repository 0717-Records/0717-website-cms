import { defineType, defineField } from 'sanity';

export const dividerType = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [{ title: 'Default', value: 'default' }],
      },
      initialValue: 'default',
      hidden: true, // Hide this field as it's not needed for now
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
