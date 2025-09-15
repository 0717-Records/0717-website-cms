import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/actions/blog';
import { getCompanyLinks, getSiteSettings } from '@/actions';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageBuilder from '@/components/PageBuilder';
import { FaUser, FaCalendar } from 'react-icons/fa6';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { PAGE_QUERYResult } from '@/sanity/types';
import { blogHeaderBottomSpacing, closingCardSpacing } from '@/utils/spacingConstants';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatBlogDate(
  createdAt: string,
  overrideDate?: string | null,
  hasOverrideDate?: boolean | null
): string {
  const date = hasOverrideDate && overrideDate ? new Date(overrideDate) : new Date(createdAt);
  return date
    .toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [siteSettings, post] = await Promise.all([
    getSiteSettings(),
    getBlogPostBySlug(slug),
  ]);

  if (!siteSettings) {
    return {
      title: 'Blog Post | 07:17 Records',
      description: 'Read our latest article',
    };
  }

  if (!post) {
    return {
      title: 'Blog Post Not Found | 07:17 Records',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return generatePageMetadata({
    title: post.title || undefined,
    description: post.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
    image: post.mainImage?.asset?._ref ? post.mainImage : undefined, // Only pass image if it exists, otherwise use default
    canonicalUrl: generateCanonicalUrl(`/blog/${slug}`),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, companyLinks] = await Promise.all([getBlogPostBySlug(slug), getCompanyLinks()]);

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogDate(post._createdAt, post.overrideDate, post.hasOverrideDate);

  return (
    <>
      {/* Page Hero - No title, back to blog */}
      <PageHero
        heroImage={post.blogIndexHeroImage || '/images/hero-bg/hero-bg-option7-2.webp'}
        documentId={post._id}
        documentType={post._type}
        showBreadcrumb={true}
        breadcrumbPageTitle="Blog"
        breadcrumbClickable={true}
        breadcrumbHref="/blog"
      />

      <Container textAlign='left'>
        {/* Article Header */}
        <div className={`text-left ${blogHeaderBottomSpacing}`}>
          {/* Title */}
          <h1 className='mb-4 text-h1 font-bold text-gray-900 leading-tight'>{post.title}</h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className='mb-6 md:mb-8 text-body-2xl text-text-subtle leading-relaxed whitespace-pre-line'>
              {post.subtitle}
            </p>
          )}

          {/* Author and Date */}
          <div className='flex flex-wrap items-center gap-4'>
            {/* Author */}
            {post.author && (
              <div className='flex items-center text-text-subtle text-body-base'>
                <FaUser className='mr-2 text-brand-secondary' />
                <span>{post.author}</span>
              </div>
            )}

            {/* Date */}
            <div className='flex items-center text-text-subtle text-body-base'>
              <FaCalendar className='mr-2 text-brand-secondary' />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Horizontal line */}
          <hr className='border-t border-gray-200' />
        </div>

        {/* Main Image - displayed between horizontal line and content */}
        {post.mainImage && (
          <div className={`'w-full ${blogHeaderBottomSpacing}`}>
            <div className='relative w-full aspect-[16/9] overflow-hidden rounded-lg'>
              <Image
                src={urlFor(post.mainImage).url()}
                alt={(post.mainImage as { alt?: string })?.alt || post.title || 'Blog post image'}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                className='object-cover'
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content Container */}
        {post.content && (
          <div className='bg-white rounded-lg shadow-sm px-6 md:px-16 py-6 md:py-8'>
            <div className='text-left'>
              <PageBuilder
                content={post.content as NonNullable<PAGE_QUERYResult>['content']}
                documentId={post._id}
                documentType='blogPost'
                companyLinks={companyLinks}
                alignment='left'
              />
            </div>
          </div>
        )}

        {/* Closing Card */}
        {post.hasClosingCard && post.closingCard && (
          <div className={closingCardSpacing}>
            <Card {...post.closingCard} documentId={post._id} documentType={post._type} fieldPathPrefix='closingCard' />
          </div>
        )}
      </Container>
    </>
  );
}
