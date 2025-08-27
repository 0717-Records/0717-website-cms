import { type SchemaTypeDefinition } from 'sanity';


import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { headerType } from './headerType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { pageSectionType } from './pageSectionType';
import { subSectionType } from './subSectionType';
import { subSubSectionType } from './subSubSectionType';
import { dividerType } from './blocks/dividerType';
import { itemListType } from './blocks/itemListType';
import { richTextType } from './blocks/richTextType';
import { cardType } from './blocks/cardType';
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
import { ctaCalloutLinkType } from './blocks/ctaCalloutLinkType';
import { ctaEmailButtonType } from './blocks/ctaEmailButtonType';
import { embeddedCtaButtonType } from './blocks/embeddedCtaButtonType';
import { homeHeroCtaButtonType } from './blocks/homeHeroCtaButtonType';
import { ctaEventType } from './blocks/ctaEventType';
import { eventBlockType } from './blocks/eventBlockType';
import { collabAllBlockType } from './blocks/collabAllBlockType';
import { favouriteBlockType } from './blocks/favouriteBlockType';
import { siteSettingsType } from './siteSettingsType';
import { eventType } from './eventType';
import { eventsIndexPageType } from './eventsIndexPageType';
import { collabType } from './collabType';
import { collabPageSectionType } from './collabPageSectionType';
import { favouritesType } from './favouritesType';
import { socialLinksType } from './shared/socialLinksType';
import { sideContentBlockType, sideContentType } from './shared/sideContentBlockType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettingsType,
    homePageType,
    pageType,
    postType,
    eventType,
    eventsIndexPageType,
    collabType,
    favouritesType,
    blockContentType,
    // Objects
    headerType,
    footerType,
    pageBuilderType,
    pageSectionType,
    collabPageSectionType,
    subSectionType,
    subSubSectionType,
    dividerType,
    itemListType,
    richTextType,
    cardType,
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
    ctaCalloutLinkType,
    ctaEmailButtonType,
    embeddedCtaButtonType,
    homeHeroCtaButtonType,
    ctaEventType,
    eventBlockType,
    collabAllBlockType,
    favouriteBlockType,
    // Shared Components
    socialLinksType,
    sideContentBlockType,
    sideContentType,
  ],
};
