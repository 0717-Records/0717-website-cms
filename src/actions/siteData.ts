import { sanityFetch } from '@/sanity/lib/live';
import { HEADER_QUERY } from '@/sanity/lib/queries';
import type { Footer, SiteSettings, HEADER_QUERYResult } from '@/sanity/types';

// Header actions
export async function getHeader(): Promise<HEADER_QUERYResult | null> {
  const { data } = await sanityFetch({
    query: HEADER_QUERY,
  });

  return data;
}

// Footer actions
export async function getFooter(): Promise<Footer | null> {
  const { data } = await sanityFetch({
    query: `*[_id == "footer"][0]`,
  });

  return data;
}

// Site Settings actions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({
    query: `*[_id == "siteSettings"][0]`,
  });

  return data;
}
