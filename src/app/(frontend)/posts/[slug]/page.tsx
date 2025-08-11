import React from 'react';
import Post from '@/components/Post/Post';
import { getPostBySlug } from '@/actions';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='container mx-auto grid grid-cols-1 gap-6 p-12'>
      <Post {...post} />
    </div>
  );
};

export default Page;
