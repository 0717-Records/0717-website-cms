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
  description: 'Displays favourite bands and artists in a responsive grid layout',
  options: {
    columns: 1,
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'itemsPerRow',
      title: 'Items Per Row',
      type: 'string',
      description:
        'Maximum number of favourites to display per row on desktop.',
      options: {
        list: [
          { title: '3 items per row', value: '3' },
          { title: '4 items per row', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favouriteListType',
      title: 'Favourite List',
      type: 'string',
      description: 'Choose how to generate the favourite list',
      options: {
        list: [
          {
            title: 'Automatic (uses ordering from Favourites Index page to fill a single row)',
            value: 'automatic',
          },
          { title: 'Manual selection', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'automatic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favourites',
      title: 'Select Favourites',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'favourites' }],
          options: {
            filter: () => {
              // This will show all favourites, sorted by display order
              return {
                filter: '_type == "favourites"',
                params: {},
              };
            },
          },
        },
      ],
      description:
        'Choose one or multiple favourites to display. Favourites will be shown in the order you add them here.',
      hidden: ({ parent }) => parent?.favouriteListType !== 'manual',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { favouriteListType?: string };
          if (parent?.favouriteListType === 'manual' && (!value || value.length === 0)) {
            return 'Please select at least one favourite when using manual selection';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      favourites: 'favourites',
      favouriteListType: 'favouriteListType',
      itemsPerRow: 'itemsPerRow',
    },
    prepare({ favourites, favouriteListType, itemsPerRow }) {
      const favouriteCount = favouriteListType === 'manual' ? favourites?.length || 0 : 'Auto';
      const itemsText = itemsPerRow ? ` • ${itemsPerRow}/row` : '';
      const listTypeText = favouriteListType === 'automatic' ? 'Auto' : 'Manual';

      return {
        title: 'Favourite Block',
        subtitle: `${listTypeText} • ${favouriteCount} favourite${favouriteCount !== 1 && favouriteCount !== 'Auto' ? 's' : ''}${itemsText}`,
        media: HeartIcon,
      };
    },
  },
});