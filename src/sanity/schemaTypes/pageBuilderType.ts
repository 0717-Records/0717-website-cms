import { defineType, defineArrayMember } from 'sanity';

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'section',
    }),
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: 'list',
        },
      ],
    },
    // Improve the modal experience
    modal: { type: 'dialog' },
  },
  // Clear description for editors
  description:
    'Build your page by adding sections. Each section can contain different types of content blocks.',
});
