import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { headerType } from './headerType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { heroType } from './blocks/heroType';
import { splitImageType } from './blocks/splitImageType';
import { siteSettingsType } from './siteSettingsType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,
    pageType,
    homePageType,
    headerType,
    footerType,
    pageBuilderType,
    heroType,
    splitImageType,
    siteSettingsType,
  ],
};
