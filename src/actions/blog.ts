import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_POSTS_QUERY, BLOG_INDEX_PAGE_QUERY } from '@/sanity/lib/queries';

// Server-side function using live queries (for use in server components)
export async function getAllBlogPosts() {
  const { data: posts } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
  });

  return posts;
}

// Server-side function to get blog index page data
export async function getBlogIndexPage() {
  const { data: page } = await sanityFetch({
    query: BLOG_INDEX_PAGE_QUERY,
  });

  return page;
}