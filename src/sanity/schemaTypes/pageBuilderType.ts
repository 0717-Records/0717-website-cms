import { defineType, defineArrayMember } from 'sanity';

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'pageSection',
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
    'Build your page by adding page sections. Each page section can contain nested sections and content blocks.',
});
