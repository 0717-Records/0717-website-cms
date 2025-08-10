import { sanityFetch } from '@/sanity/lib/live';
import { POSTS_QUERY, POST_QUERY } from '@/sanity/lib/queries';
import type { POSTS_QUERYResult, POST_QUERYResult } from '@/sanity/types';

export async function getAllPosts(): Promise<POSTS_QUERYResult> {
  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<POST_QUERYResult | null> {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return post;
}
