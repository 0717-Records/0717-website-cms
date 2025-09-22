import { sanityFetch } from '@/sanity/lib/live';
import { FAVOURITES_ALL_QUERY, FAVOURITES_INDEX_PAGE_QUERY } from '@/sanity/lib/queries';

export async function getFavourites() {
  const { data } = await sanityFetch({
    query: FAVOURITES_ALL_QUERY,
    stega: false
  });
  return data;
}

export async function getAllFavourites() {
  const { data } = await sanityFetch({
    query: FAVOURITES_ALL_QUERY,
    stega: false
  });
  return data;
}

export async function getFavouritesIndexPage() {
  const { data } = await sanityFetch({
    query: FAVOURITES_INDEX_PAGE_QUERY,
    stega: false
  });
  return data;
}