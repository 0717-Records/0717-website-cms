import React from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface BlogPost {
  _id: string;
  title: string | null;
  slug: {
    current?: string;
  } | null;
}

interface BlogPostNavigationProps {
  prevPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export default function BlogPostNavigation({ prevPost, nextPost }: BlogPostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className='pt-8 mt-8'>
      <div className='flex flex-col sm:flex-row justify-between gap-6 sm:items-stretch'>
        {/* Previous Post */}
        <div className='flex-1 flex'>
          {prevPost && prevPost.slug?.current ? (
            <Link
              href={`/blog/${prevPost.slug.current}`}
              className='group bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg py-6 px-6 w-full hover:bg-brand-secondary/15 hover:border-brand-secondary/30 hover:shadow-md transition-all duration-200 cursor-pointer flex items-start gap-4'>
              <div className='flex-shrink-0 mt-1'>
                <div className='group-hover:bg-brand-primary p-3 rounded-full transition-all duration-200 group-hover:shadow-sm'>
                  <FaChevronLeft className='text-brand-secondary group-hover:text-black transition-colors duration-200' />
                </div>
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-body-sm text-text-subtle font-medium mb-1'>Previous Post</p>
                <h3 className='text-body-lg font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2'>
                  {prevPost.title || 'Untitled Post'}
                </h3>
              </div>
            </Link>
          ) : (
            <div className='flex-1' /> // Empty space when no previous post
          )}
        </div>

        {/* Next Post */}
        <div className='flex-1 flex'>
          {nextPost && nextPost.slug?.current ? (
            <Link
              href={`/blog/${nextPost.slug.current}`}
              className='group bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg py-6 px-6 w-full hover:bg-brand-secondary/15 hover:border-brand-secondary/30 hover:shadow-md transition-all duration-200 cursor-pointer flex items-start gap-4 text-right'>
              <div className='min-w-0 flex-1'>
                <p className='text-body-sm text-text-subtle font-medium mb-1'>Next Post</p>
                <h3 className='text-body-lg font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2'>
                  {nextPost.title || 'Untitled Post'}
                </h3>
              </div>
              <div className='flex-shrink-0 mt-1'>
                <div className='group-hover:bg-brand-primary p-3 rounded-full transition-all duration-200 group-hover:shadow-sm'>
                  <FaChevronRight className='text-brand-secondary group-hover:text-black transition-colors duration-200' />
                </div>
              </div>
            </Link>
          ) : (
            <div className='flex-1' /> // Empty space when no next post
          )}
        </div>
      </div>
    </nav>
  );
}
