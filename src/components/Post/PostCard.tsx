import React from 'react';
import type { POSTS_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import PublishedAt from './PublishedAt';

const PostCard = (props: POSTS_QUERYResult[0]) => {
  const { title, mainImage, publishedAt } = props;

  return (
    <Link className='group' href={`/posts/${props.slug!.current}`}>
      <article className='flex flex-col-reverse gap-4 md:grid md:grid-cols-12 md:gap-0'>
        <div className='md:col-span-7 md:w-full'>
          <h2 className='text-h6 text-pretty font-semibold text-slate-800 group-hover:text-pink-600 transition-colors relative'>
            <span className='relative z-[1]'>{title}</span>
            <span className='bg-pink-50 z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75' />
          </h2>
          <div className='flex items-center mt-2 md:mt-6 gap-x-6'>
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>
        <div className='md:col-start-8 md:col-span-5 rounded-lg overflow-hidden flex'>
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(200).url()}
              width={400}
              height={200}
              alt={mainImage.alt || title || ''}
            />
          ) : null}
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
