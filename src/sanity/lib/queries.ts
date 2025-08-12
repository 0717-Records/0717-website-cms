import { defineQuery } from 'next-sanity';

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
  slug,
  content[]{
    ...
  },
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
    internalLink->{
      _id,
      title,
      slug
    },
    externalLink,
    openInNewTab
  },
  heroContentPosition,
  content[]{
    ...,
    _type == "hero" => {
      ...,
      image{
        asset,
        hotspot,
        crop,
        alt,
        _type
      }
    },
    _type == "splitImage" => {
      ...,
      image{
        asset,
        hotspot,
        crop,
        _type
      }
    }
  }
}`);

export const HEADER_QUERY = defineQuery(`*[_id == "header"][0]{
  _id,
  _type,
  logo{
    asset,
    alt
  }
}`);
