import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { headerType } from './headerType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { sectionType } from './sectionType';
import { splitImageType } from './blocks/splitImageType';
import { heroType } from './blocks/heroType';
import { featureType } from './blocks/featureType';
import { dividerType } from './blocks/dividerType';
import { itemListType } from './blocks/itemListType';
import { gridType } from './blocks/gridType';
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
    sectionType,
    splitImageType,
    heroType,
    featureType,
    dividerType,
    itemListType,
    gridType,
    siteSettingsType,
  ],
};
