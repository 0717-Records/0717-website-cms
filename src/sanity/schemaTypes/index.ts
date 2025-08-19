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
import { subSectionType } from './subSectionType';
import { subSubSectionType } from './subSubSectionType';
import { dividerType } from './blocks/dividerType';
import { itemListType } from './blocks/itemListType';
import { richTextType } from './blocks/richTextType';
import { ctaCardType } from './blocks/ctaCardType';
import { cardGridType } from './blocks/cardGridType';
import { iconType } from './blocks/iconType';
import { imageType } from './blocks/imageType';
import { imageGalleryType } from './blocks/imageGalleryType';
import { youTubeVideoType } from './blocks/youTubeVideoType';
import { spotifyWidgetType } from './blocks/spotifyWidgetType';
import { bandcampWidgetType } from './blocks/bandcampWidgetType';
import { quoteType } from './blocks/quoteType';
import { textImageType } from './blocks/textImageType';
import { ctaButtonType } from './blocks/ctaButtonType';
import { embeddedCtaButtonType } from './blocks/embeddedCtaButtonType';
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
    subSectionType,
    subSubSectionType,
    dividerType,
    itemListType,
    richTextType,
    ctaCardType,
    cardGridType,
    iconType,
    imageType,
    imageGalleryType,
    youTubeVideoType,
    spotifyWidgetType,
    bandcampWidgetType,
    quoteType,
    textImageType,
    ctaButtonType,
    embeddedCtaButtonType,
  ],
};
