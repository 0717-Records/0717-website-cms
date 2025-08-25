// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType, defineField } from 'sanity';
import { HeartIcon } from '@sanity/icons';

export const favouriteBlockType = defineType({
  name: 'favouriteBlock',
  title: 'Favourite Block',
  type: 'object',
  icon: HeartIcon,
  description: 'Displays all favourite bands and artists in a responsive grid layout',
  options: {
    columns: 1,
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'blockAdded',
      title: 'Favourite Block Added!',
      type: 'string',
      initialValue: 'This block will display all favourites in order. You can close this dialog.',
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Favourites Block',
        subtitle: 'Displays all favourite bands and artists in a responsive grid',
        media: HeartIcon,
      };
    },
  },
});