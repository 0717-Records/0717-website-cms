// Site configuration constants
// This file centralizes all site-specific configuration values
// Update these values when setting up a new project

export const SITE_CONFIG = {
  // Production domain - update this for your new project
  PRODUCTION_DOMAIN: 'https://0717records.com',

  // Organization information
  ORGANIZATION_NAME: '07:17 Records',
  ORGANIZATION_DESCRIPTION:
    'A New Zealand based record label supporting local and international artists.',

  // Contact information
  ORGANIZATION_EMAIL: '0717records@gmail.com',
} as const;

// Type-safe access to configuration values
export type SiteConfig = typeof SITE_CONFIG;
