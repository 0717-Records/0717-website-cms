import { defineQuery } from 'next-sanity';

// Reusable internal link dereferencing with href computation
const internalLinkProjection = `{
  _id,
  _type,
  title,
  slug,
  "pageType": _type,
  "href": select(
    _type == "homePage" => "/",
    _type == "eventsIndexPage" => "/events",
    _type == "collab" => "/collabs/" + slug.current,
    "/" + slug.current
  )
}`;

// Single content block projection that recursively handles nested content
// Add new block types here and they'll work at all nesting levels automatically
const contentProjection = `
  ...,
  image{
    asset,
    alt,
    hotspot,
    crop
  },
  _type == "ctaButton" => {
    ...,
    internalLink->${internalLinkProjection}
  },
  _type == "ctaCalloutLink" => {
    ...,
    internalLink->${internalLinkProjection}
  },
  _type == "ctaCard" => {
    ...,
    internalLink->${internalLinkProjection}
  },
  _type == "cardGrid" => {
    ...,
    cards[]{
      ...,
      internalLink->${internalLinkProjection}
    }
  },
  _type == "ctaEvent" => {
    ...,
    event->{
      _id,
      title,
      shortDescription,
      venue,
      location,
      image{
        asset,
        alt,
        hotspot,
        crop
      },
      tags,
      link,
      startDate,
      endDate,
      timeDescription,
      pastEventText,
      pastEventLinkBehavior,
      pastEventLink
    }
  }
`;

// Recursive content structure with 4 levels of nesting
// This is the complete content pattern that can be reused across queries
const recursiveContent = `content[]{${contentProjection},
  "content": content[]{${contentProjection},
    "content": content[]{${contentProjection},
      "content": content[]{${contentProjection}
      }
    }
  }
}`;

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage{
    asset,
    alt
  },
  publishedAt
}`);

export const POSTS_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage{
    asset,
    alt
  },
  publishedAt,
  relatedPosts[]->{
    _id,
    title,
    slug,
    mainImage{
      asset,
      alt
    },
    publishedAt
  }
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  subtitle,
  alignment,
  slug,
  ${recursiveContent},
  mainImage{
    asset,
    alt
  }
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
  _id,
  _type,
  heroImage{
    asset,
    alt
  },
  heroTitle,
  heroSubtitle,
  enableHeroCallToAction,
  heroCallToAction{
    text,
    linkType,
    internalLink->${internalLinkProjection},
    externalUrl,
    openInNewTab
  },
  heroContentPosition,
  ${recursiveContent}
}`);

export const HEADER_QUERY = defineQuery(`*[_id == "header"][0]{
  _id,
  _type,
  logo{
    asset,
    alt
  }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  _id,
  _type,
  siteTitle,
  companyEmail,
  siteDescription
}`);

export const EVENTS_QUERY = defineQuery(`*[_type == "event"]|order(startDate desc){
  _id,
  title,
  shortDescription,
  venue,
  location,
  image{
    asset,
    alt,
    hotspot,
    crop
  },
  tags,
  link,
  startDate,
  endDate,
  timeDescription,
  pastEventText,
  pastEventLinkBehavior,
  pastEventLink
}`);

export const EVENTS_INDEX_PAGE_QUERY = defineQuery(`*[_id == "eventsIndexPage"][0]{
  _id,
  _type,
  title,
  backgroundImage{
    asset,
    alt,
    hotspot,
    crop
  },
  subtitle,
  noUpcomingEventsMessage,
  noPastEventsMessage
}`);

// Side content projection for sidebar sections
const sideContentProjection = `sideContent[]{
  _type,
  _key,
  style,
  title,
  richText,
  ctaBlocks[]{
    _type,
    _key,
    _type == "ctaCalloutLink" => {
      ...,
      internalLink->${internalLinkProjection}
    },
    _type == "ctaEmailButton" => {
      ...
    }
  }
}`;

// Collab page section projection for main content
const collabContentProjection = `mainContent[]{
  _type,
  _key,
  title,
  ${recursiveContent}
}`;

export const COLLAB_QUERY = defineQuery(`*[_type == "collab" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  slug,
  genre,
  location,
  heroImage{
    asset,
    alt,
    hotspot,
    crop
  },
  previewImage{
    asset,
    alt,
    hotspot,
    crop
  },
  shortDescription,
  bio,
  ${collabContentProjection},
  ${sideContentProjection},
  links{
    _type,
    facebook,
    instagram,
    youtube,
    twitter,
    soundcloud,
    bandcamp,
    spotify,
    itunes,
    officialWebsite,
    genericLinks[]{
      _key,
      title,
      url
    }
  }
}`);

export const COLLABS_SLUGS_QUERY = defineQuery(`*[_type == "collab" && defined(slug.current)]{ 
  "slug": slug.current
}`);
