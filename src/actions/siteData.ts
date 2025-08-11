import { sanityFetch } from '@/sanity/lib/live';
import type { Navbar, Footer, SiteSettings } from '@/sanity/types';

// Navbar actions
export async function getNavbar(): Promise<Navbar | null> {
  const { data } = await sanityFetch({
    query: `*[_id == "navbar"][0]`,
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
