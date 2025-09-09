// AI Helper: This file contains all spacing constants used across the website for consistent spacing management.
// All spacing values are defined as Tailwind CSS classes with mobile-first responsive design.
// These constants should be imported and used instead of hardcoded spacing classes.

/**
 * Space under all hero sections (PageHero, HomeHero) before the next content
 */
export const heroBottomSpacing = 'mb-14 md:mb-24';

/**
 * Space under page subtitles (non-blog pages)
 */
export const pageSubtitleBottomSpacing = 'mb-12 md:mb-16';

/**
 * Space above PageSections that come after orphaned content blocks
 */
export const pageSectionTopSpacing = 'mt-8 md:mt-12';

/**
 * Space under blog header sections (title, subtitle, author, date, horizontal line group)
 */
export const blogHeaderBottomSpacing = 'mb-10 md:mb-14';

/**
 * Space after PageSection titles and subtitles
 */
export const sectionTitleBottomSpacing = 'mb-6 md:mb-8';

/**
 * Space after PageSection dividers
 */
export const sectionDividerBottomSpacing = 'mb-8 md:mb-12';

/**
 * Bottom padding for PageSections (after the last piece of content in that section)
 */
export const sectionBottomPadding = 'pb-14 md:pb-24';

/**
 * Space after most content blocks (with exceptions defined in implementation)
 */
export const contentBlockBottomSpacing = 'mb-6 md:mb-8';

/**
 * Space above SubSection/SubSubSection when they have a sibling before them
 */
export const subSectionTopSpacing = 'mt-10 md:mt-14';

/**
 * Space after SubSection and SubSubSection titles
 */
export const subSectionTitleBottomSpacing = 'mb-4 md:mb-6';

/**
 * Space above and below closing cards on all pages
 */
export const closingCardSpacing = 'mt-16 md:mt-24';
