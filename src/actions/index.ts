// Pages actions
export { getHomePage, getPageBySlug } from './pages';

// Posts actions
export { getAllPosts, getPostBySlug } from './posts';

// Site data actions
export { getHeader, getFooter, getSiteSettings } from './siteData';

// Types
export type {
  HOME_PAGE_QUERYResult,
  PAGE_QUERYResult,
  POSTS_QUERYResult,
  POST_QUERYResult,
} from './types';
