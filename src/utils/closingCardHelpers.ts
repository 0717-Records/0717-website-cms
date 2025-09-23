import type { CtaList } from '@/sanity/types';

/**
 * Converts a closing card object from GROQ query results to the format expected by the Card component.
 * This handles the type mismatch where GROQ queries return expanded CTA data that doesn't match
 * the base schema types expected by the Card component.
 */
export function normalizeClosingCardForCard<T extends { ctaList?: unknown }>(
  closingCard: T
): Omit<T, 'ctaList'> & { ctaList?: CtaList } {
  return closingCard as Omit<T, 'ctaList'> & { ctaList?: CtaList };
}