import { urlFor } from '@/sanity/lib/image';
import type { SITE_SETTINGS_QUERYResult } from '@/sanity/types';
import type { ImageObjectData } from '@/lib/imageUtils';

export interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  sameAs?: string[];
}

export interface WebSiteData {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}


export interface BlogPostData {
  headline: string;
  description?: string;
  image?: string | ImageObjectData;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    type?: string;
  };
  publisher: OrganizationData;
  url: string;
}

export interface EventData {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  image?: string;
  url: string;
  organizer: OrganizationData;
}

export interface ArticleData {
  headline: string;
  description?: string;
  image?: string | ImageObjectData;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    type?: string;
  };
  publisher: OrganizationData;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateImageObjectSchema(data: ImageObjectData) {
  return {
    '@type': 'ImageObject',
    url: data.url,
    ...(data.width && { width: data.width }),
    ...(data.height && { height: data.height }),
    ...(data.alt && { description: data.alt }),
    ...(data.caption && { caption: data.caption }),
  };
}

export function generateOrganizationSchema(data: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...(data.email && { email: `mailto:${data.email}` }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

export function generateWebSiteSchema(data: WebSiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    ...(data.potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: data.potentialAction.target,
        'query-input': data.potentialAction.queryInput,
      },
    }),
  };
}

export function generateBlogPostSchema(data: BlogPostData) {
  const imageSchema = data.image
    ? (typeof data.image === 'string'
        ? data.image
        : generateImageObjectSchema(data.image))
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    ...(data.description && { description: data.description }),
    ...(imageSchema && { image: imageSchema }),
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': data.author.type || 'Person',
      name: data.author.name,
    },
    publisher: generateOrganizationSchema(data.publisher),
    url: data.url,
  };
}

export function generateEventSchema(data: EventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    ...(data.description && { description: data.description }),
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    ...(data.location && {
      location: {
        '@type': 'Place',
        name: data.location.name,
        ...(data.location.address && { address: data.location.address }),
      },
    }),
    ...(data.image && { image: data.image }),
    url: data.url,
    organizer: generateOrganizationSchema(data.organizer),
  };
}

export function generateArticleSchema(data: ArticleData) {
  const imageSchema = data.image
    ? (typeof data.image === 'string'
        ? data.image
        : generateImageObjectSchema(data.image))
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    ...(data.description && { description: data.description }),
    ...(imageSchema && { image: imageSchema }),
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': data.author.type || 'Person',
      name: data.author.name,
    },
    publisher: generateOrganizationSchema(data.publisher),
    url: data.url,
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getOrganizationDataFromSiteSettings(
  siteSettings: SITE_SETTINGS_QUERYResult,
  baseUrl: string
): OrganizationData {
  return {
    name: siteSettings?.siteTitle || '07:17 Records',
    url: baseUrl,
    ...(siteSettings?.siteDescription && { description: siteSettings.siteDescription }),
    ...(siteSettings?.companyEmail && { email: siteSettings.companyEmail }),
    ...(siteSettings?.defaultOgImage && {
      logo: urlFor(siteSettings.defaultOgImage).width(512).height(512).url(),
    }),
  };
}

export function getWebSiteDataFromSiteSettings(
  siteSettings: SITE_SETTINGS_QUERYResult,
  baseUrl: string
): WebSiteData {
  return {
    name: siteSettings?.siteTitle || '07:17 Records',
    url: baseUrl,
    ...(siteSettings?.siteDescription && { description: siteSettings.siteDescription }),
  };
}

export function generateStructuredDataScript(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}