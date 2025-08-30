import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/actions/blog';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageBuilder from '@/components/PageBuilder';
import { urlFor } from '@/sanity/lib/image';
import { FaUser, FaCalendar } from 'react-icons/fa6';
import type { PAGE_QUERYResult } from '@/sanity/types';

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const backgroundImage = post.heroImage
    ? urlFor(post.heroImage).url()
    : '/pagePlaceholderImg.webp';

  const formattedDate = formatBlogDate(post._createdAt, post.overrideDate, post.hasOverrideDate);

  return (
    <>
      {/* Page Hero - No title, back to blog */}
      <PageHero
        title={null}
        heroImage={backgroundImage}
        backLinkHref='/blog'
        backLinkText='Back to Blog'
      />

      <Container>
        {/* Article Header */}
        <div className='pt-16 md:pt-24 text-left'>
          {/* Title */}
          <h1 className='text-h1 font-bold text-gray-900 mb-4 leading-tight'>{post.title}</h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className='text-body-2xl text-text-subtle mb-6 leading-relaxed whitespace-pre-line'>
              {post.subtitle}
            </p>
          )}

          {/* Author and Date */}
          <div className='flex flex-wrap items-center gap-4 mb-8'>
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
          <hr className='border-t border-gray-200 mb-8' />
        </div>

        {/* Article Content Container */}
        {post.content && (
          <div className='bg-white rounded-lg shadow-sm p-6 md:p-8 mb-16 md:mb-24'>
            <div className='text-left'>
              <PageBuilder
                content={post.content as NonNullable<PAGE_QUERYResult>['content']}
                documentId={post._id}
                documentType='blogPost'
              />
            </div>
          </div>
        )}

        {/* Closing Card */}
        {post.hasClosingCard && post.closingCard && (
          <div className='pb-16 md:pb-24'>
            <Card {...post.closingCard} />
          </div>
        )}
      </Container>
    </>
  );
}
