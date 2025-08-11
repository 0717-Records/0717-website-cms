import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { navbarType } from './navbarType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { faqType } from './faqType';
import { faqsType } from './blocks/faqsType';
import { featuresType } from './blocks/featuresType';
import { heroType } from './blocks/heroType';
import { splitImageType } from './blocks/splitImageType';
import { siteSettingsType } from './siteSettingsType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    homePageType,
    navbarType,
    footerType,
    pageBuilderType,
    faqType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,
    siteSettingsType,
  ],
};
