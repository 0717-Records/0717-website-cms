'use client';

import React from 'react';
import Link from 'next/link';
import type { POST_QUERYResult } from '@/sanity/types';
import { useOptimistic } from 'react';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';


const RelatedPosts = ({
  relatedPosts,
  documentId,
  documentType,
}: {
  relatedPosts: NonNullable<POST_QUERYResult>['relatedPosts'];
  documentId: string;
  documentType: string;
}) => {
  const [posts] = useOptimistic(
    relatedPosts,
    (
      state: NonNullable<POST_QUERYResult>['relatedPosts'],
      action: {
        id: string;
        document?: { relatedPosts?: NonNullable<POST_QUERYResult>['relatedPosts'] };
      }
    ) => {
      if (action.id === documentId && action?.document?.relatedPosts) {
        return action.document.relatedPosts.map(
          (post) => state?.find((p) => p._id === post._id) ?? post
        );
      }
      return state;
    }
  );

  if (!posts) {
    return null;
  }
  return (
    <aside className='border-t'>
      <h2>Related Posts</h2>
      <div className='not-prose text-balance'>
        <ul
          className='flex flex-col sm:flex-row gap-0.5'
          {...createSanityDataAttribute(documentId, documentType, 'relatedPosts')}>
          {posts.map((post) => (
            <li
              key={post._id}
              className='p-4 bg-blue-50 sm:w-1/3 flex-shrink-0'
              {...createSanityDataAttribute(documentId, documentType, `relatedPosts[_ref=="${post._id}"]`)}>
              <Link href={`/posts/${post?.slug?.current}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RelatedPosts;
