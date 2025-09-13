import { Metadata } from 'next';
import { urlFor } from '@/sanity/lib/image';
import type { SITE_SETTINGS_QUERYResult } from '@/sanity/types';

export interface MetadataConfig {
  title?: string;
  description?: string;
  image?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
  } | null;
  siteSettings: SITE_SETTINGS_QUERYResult;
}

export function generateMetadata({
  title,
  description,
  image,
  siteSettings,
}: MetadataConfig): Metadata {
  const siteTitle = siteSettings?.siteTitle || '07:17 Records';
  const defaultPageTitle = siteSettings?.defaultPageTitle || 'Thank You For Creating';
  const siteDescription = siteSettings?.siteDescription || '';
  const seoKeywords = siteSettings?.seoKeywords || '';

  // Generate page title
  const pageTitle = title
    ? `${siteTitle} | ${title}`
    : `${siteTitle} | ${defaultPageTitle}`;

  // Generate description
  const pageDescription = description || siteDescription;

  // Generate OG image URL
  let ogImageUrl: string | undefined;
  let ogImageAlt: string | undefined;

  if (image?.asset?._ref) {
    // Use provided image
    ogImageUrl = urlFor(image).width(1200).height(630).url();
    ogImageAlt = image.alt || `${siteTitle} - ${title || defaultPageTitle}`;
  } else if (siteSettings?.defaultOgImage?.asset?._ref) {
    // Fall back to site default image
    ogImageUrl = urlFor(siteSettings.defaultOgImage).width(1200).height(630).url();
    ogImageAlt = siteSettings.defaultOgImage.alt || `${siteTitle} - ${title || defaultPageTitle}`;
  }

  const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: pageTitle,
    description: pageDescription,
    keywords: seoKeywords || undefined,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: ogImageAlt || `${siteTitle} - ${title || defaultPageTitle}`,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            alt: ogImageAlt || `${siteTitle} - ${title || defaultPageTitle}`,
          },
        ],
      }),
    },
  };

  return metadata;
}