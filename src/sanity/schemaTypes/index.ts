import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { headerType } from './headerType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { sectionType } from './sectionType';
import { pageSectionType } from './pageSectionType';
import { dividerType } from './blocks/dividerType';
import { itemListType } from './blocks/itemListType';
import { richTextType } from './blocks/richTextType';
import { cardType } from './blocks/cardType';
import { cardGridType } from './blocks/cardGridType';
import { iconType } from './blocks/iconType';
import { imageType } from './blocks/imageType';
import { imageGalleryType } from './blocks/imageGalleryType';
import { youTubeVideoType } from './blocks/youTubeVideoType';
import { siteSettingsType } from './siteSettingsType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettingsType,
    homePageType,
    pageType,
    postType,
    blockContentType,
    // Objects
    headerType,
    footerType,
    pageBuilderType,
    sectionType,
    pageSectionType,
    dividerType,
    itemListType,
    richTextType,
    cardType,
    cardGridType,
    iconType,
    imageType,
    imageGalleryType,
    youTubeVideoType,
  ],
};
