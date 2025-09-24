import React from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
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
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug.current}`}
              className='group flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:border-brand-secondary hover:shadow-md transition-all duration-300 w-full'>
              <div className='flex-shrink-0 mt-1'>
                <div className='group-hover:bg-brand-primary p-3 rounded-full transition-all duration-200 group-hover:shadow-sm'>
                  <FaChevronLeft className='text-brand-secondary group-hover:text-black transition-colors duration-200' />
                </div>
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-body-sm text-text-subtle font-medium mb-1'>Previous Post</p>
                <h3 className='text-body-lg font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2'>
                  {prevPost.title}
                </h3>
              </div>
            </Link>
          ) : (
            <div className='flex-1' /> // Empty space when no previous post
          )}
        </div>

        {/* Next Post */}
        <div className='flex-1 flex'>
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug.current}`}
              className='group flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:border-brand-secondary hover:shadow-md transition-all duration-300 text-right w-full'>
              <div className='min-w-0 flex-1'>
                <p className='text-body-sm text-text-subtle font-medium mb-1'>Next Post</p>
                <h3 className='text-body-lg font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2'>
                  {nextPost.title}
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
