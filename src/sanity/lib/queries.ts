import { defineQuery } from 'next-sanity';


// Reusable internal link dereferencing with href computation and section anchor support
const internalLinkProjection = `{
  _id,
  _type,
  title,
  slug,
  "pageType": _type,
  "href": select(
    _type == "homePage" => "/",
    _type == "eventsIndexPage" => "/events",
    _type == "blogIndexPage" => "/blog",
    _type == "blogPost" => "/blog/" + slug.current,
    _type == "collab" => "/collabs/" + slug.current,
    "/" + slug.current
  )
}`;

// Enhanced link projection that includes section anchors
const fullLinkProjection = `
  ...,
  internalLink->${internalLinkProjection},
  "computedHref": select(
    linkType == "external" => externalUrl,
    linkType == "internal" && defined(pageSectionId) && pageSectionId != "" => 
      coalesce(internalLink->${internalLinkProjection}.href, "/") + "#" + pageSectionId,
    linkType == "internal" => 
      coalesce(internalLink->${internalLinkProjection}.href, "/"),
    "/"
  )
`;

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
  _type == "pageSection" => {
    ...,
    anchorId
  },
  _type == "subSection" => {
    ...,
    anchorId
  },
  _type == "subSubSection" => {
    ...,
    anchorId
  },
  _type == "ctaButton" => {${fullLinkProjection}},
  _type == "ctaCalloutLink" => {${fullLinkProjection}},
  _type == "ctaCard" => {${fullLinkProjection}},
  _type == "cardGrid" => {
    ...,
    cards[]{${fullLinkProjection}}
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
  heroCallToAction{${fullLinkProjection}},
  heroContentPosition,
  ${recursiveContent}
}`);

export const HEADER_QUERY = defineQuery(`*[_id == "header"][0]{
  _id,
  _type,
  logo{
    asset,
    alt
  },
  horizontalNav[]{${fullLinkProjection}},
  verticalNav[]{
    _type,
    _type == "navLink" => {${fullLinkProjection}},
    _type == "divider" => {...}
  }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  _id,
  _type,
  siteTitle,
  companyEmail,
  siteDescription,
  companyLinks{
    _type,
    socialLinksArray[]{
      _key,
      platform,
      url,
      customTitle,
      hideFromFooter
    }
  }
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

// Blog Post Queries
export const BLOG_POSTS_QUERY = defineQuery(`*[_type == "blogPost"]|order(coalesce(overrideDate, _createdAt) desc){
  _id,
  _createdAt,
  title,
  slug,
  subtitle,
  author,
  mainImage{
    asset,
    alt,
    hotspot,
    crop
  },
  hasOverrideDate,
  overrideDate,
  hasClosingCard,
  closingCard
}`);

export const BLOG_INDEX_PAGE_QUERY = defineQuery(`*[_id == "blogIndexPage"][0]{
  _id,
  _type,
  title,
  heroImage{
    asset,
    alt,
    hotspot,
    crop
  },
  subtitle,
  noArticlesMessage,
  hasClosingCard,
  closingCard
}`);

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  title,
  slug,
  subtitle,
  author,
  mainImage{
    asset,
    alt,
    hotspot,
    crop
  },
  hasOverrideDate,
  overrideDate,
  content,
  hasClosingCard,
  closingCard,
  "blogIndexHeroImage": *[_id == "blogIndexPage"][0].heroImage{
    asset,
    alt,
    hotspot,
    crop
  }
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
    socialLinksArray[]{
      _key,
      platform,
      url,
      customTitle
    }
  }
}`);

export const COLLABS_SLUGS_QUERY = defineQuery(`*[_type == "collab" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const COLLABS_ALL_QUERY = defineQuery(`*[_type == "collab" && defined(slug.current)]|order(order asc, name asc){
  _id,
  name,
  slug,
  genre,
  location,
  order,
  previewImage{
    asset,
    alt,
    hotspot,
    crop
  },
  shortDescription,
  useShortDescriptionForCards,
  cardDescription
}`);

export const FAVOURITES_ALL_QUERY = defineQuery(`*[_type == "favourites"]|order(order asc, name asc){
  _id,
  name,
  genre,
  order,
  profileImage{
    asset,
    alt,
    hotspot,
    crop
  },
  description,
  link,
  linkLabel
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer" && _id == "footer"][0]{
  _id,
  _type,
  logo{
    asset,
    alt,
    hotspot,
    crop
  },
  footerMessages[]{
    _key,
    title,
    message
  },
  copyrightText
}`);
