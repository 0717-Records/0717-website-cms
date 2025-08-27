// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import {
  createSocialPlatformFields,
  createGenericLinksField,
  createSocialLinksPreview,
} from './socialPlatformFields';

export const companyLinksType = defineType({
  name: 'companyLinks',
  title: 'Company Links',
  type: 'object',
  icon: LinkIcon,
  description: 'Add links to company social media profiles',
  fields: [...createSocialPlatformFields(), createGenericLinksField()],
  preview: createSocialLinksPreview(
    ['facebook', 'instagram', 'youtube', 'twitter', 'soundcloud', 'bandcamp', 'spotify', 'itunes'],
    'Company Links'
  ),
});
