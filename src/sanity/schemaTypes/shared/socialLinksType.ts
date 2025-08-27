// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { 
  createSocialPlatformFields, 
  createOfficialWebsiteField, 
  createGenericLinksField,
  createSocialLinksPreview 
} from './socialPlatformFields';

export const socialLinksType = defineType({
  name: 'socialLinks',
  title: 'Social Media Links',
  type: 'object',
  icon: LinkIcon,
  description: 'Add links to social media profiles and websites',
  fields: [
    ...createSocialPlatformFields(),
    createOfficialWebsiteField(),
    createGenericLinksField(),
  ],
  preview: createSocialLinksPreview([
    'facebook', 'instagram', 'youtube', 'twitter', 'soundcloud',
    'bandcamp', 'spotify', 'itunes', 'officialWebsite'
  ], 'Social Media Links'),
});