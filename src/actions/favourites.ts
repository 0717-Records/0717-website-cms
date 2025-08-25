import { sanityFetch } from '@/sanity/lib/live';
import { FAVOURITES_ALL_QUERY } from '@/sanity/lib/queries';

export async function getFavourites() {
  const { data } = await sanityFetch({
    query: FAVOURITES_ALL_QUERY,
    stega: false
  });
  return data;
}