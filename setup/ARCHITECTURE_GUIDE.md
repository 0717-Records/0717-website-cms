# Next.js + Sanity CMS Architecture Guide

> **Purpose**: This guide extracts proven architectural patterns, utilities, and configurations from a production content-driven website. Use this as a blueprint for starting new Next.js + Sanity projects with the same architectural benefits.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure & Architecture](#folder-structure--architecture)
3. [Essential Dependencies](#essential-dependencies)
4. [Sanity CMS Architecture](#sanity-cms-architecture)
5. [Reusable Utility Systems](#reusable-utility-systems)
6. [SEO & Performance Systems](#seo--performance-systems)
7. [Component Architecture Patterns](#component-architecture-patterns)
8. [Development Setup & Configuration](#development-setup--configuration)
9. [Project-Agnostic CLAUDE.md Template](#project-agnostic-claudemd-template)
10. [Implementation Checklist](#implementation-checklist)

---

## Project Overview

### Architecture Philosophy
- **Performance-first**: Critical CSS inlining, image optimization, structured data
- **Content-driven**: Flexible schema system, live editing, rich content blocks
- **SEO-optimized**: Comprehensive structured data, sitemaps, canonical URLs
- **Type-safe**: Full TypeScript integration with Sanity schema generation
- **Maintainable**: Modular components, consistent patterns, comprehensive documentation

### Core Technologies
- **Frontend**: Next.js 15 with App Router
- **CMS**: Sanity v3 with live editing
- **Styling**: Tailwind CSS v4 with custom design system
- **Type Safety**: TypeScript with auto-generated Sanity types
- **Performance**: Image optimization, critical CSS, structured data

---

## Folder Structure & Architecture

### Recommended Project Structure

```
src/
├── actions/                  # Server actions for data fetching
│   ├── index.ts             # Central exports
│   ├── pages.ts             # Page-related actions
│   ├── blog.ts              # Blog-related actions
│   └── types.ts             # Shared action types
├── app/                     # Next.js App Router
│   ├── (frontend)/          # Public-facing pages
│   │   ├── blog/
│   │   ├── [slug]/          # Dynamic pages
│   │   ├── loading.tsx      # Global loading UI
│   │   └── error.tsx        # Error boundaries
│   ├── api/                 # API routes
│   │   └── draft-mode/      # Sanity draft preview
│   ├── studio/              # Sanity Studio
│   ├── sitemap.xml/         # Dynamic sitemap generation
│   ├── robots.txt/          # SEO robots configuration
│   ├── globals.css          # Global styles + critical CSS
│   └── layout.tsx           # Root layout with critical CSS inlining
├── components/              # React components
│   ├── Layout/              # Layout components (sections, containers)
│   ├── UI/                  # Reusable UI components
│   ├── blocks/              # Content blocks (from Sanity)
│   ├── Header/              # Header components
│   ├── Footer/              # Footer components
│   └── [Feature]/           # Feature-specific components
├── contexts/                # React contexts
│   ├── PageLoadContext.tsx  # Page loading state management
│   └── SiteDataContext.tsx  # Global site data
├── hooks/                   # Custom React hooks
│   ├── useBodyScrollLock.ts # Scroll lock with reference counting
│   └── useFocusTrap.ts      # Accessibility focus management
├── lib/                     # Core utilities
│   ├── structuredData.ts    # SEO structured data generation
│   └── imageUtils.ts        # Image optimization utilities
├── sanity/                  # Sanity CMS configuration
│   ├── schemaTypes/         # Content schemas
│   │   ├── blocks/          # Content block types
│   │   ├── shared/          # Reusable schema components
│   │   └── index.ts         # Schema registry
│   ├── lib/                 # Sanity client configuration
│   ├── structure.ts         # Studio desk structure
│   └── actions/             # Custom studio actions
├── types/                   # TypeScript type definitions
├── utils/                   # Helper utilities
└── styles/                  # Additional stylesheets
```

### Key Architectural Principles

1. **Separation of Concerns**: Clear boundaries between data fetching, UI components, and business logic
2. **Type Safety**: Auto-generated types from Sanity schemas with strict TypeScript
3. **Performance Optimization**: Critical CSS inlining, image optimization, structured data
4. **Content Management**: Flexible schema system with live editing capabilities
5. **SEO Foundation**: Comprehensive structured data, sitemaps, and meta management

---

## Essential Dependencies

### Categorized Package Dependencies

#### **ESSENTIAL ARCHITECTURE** (Always install):
```bash
# Core Next.js and React
npm install next@latest react@latest react-dom@latest

# Sanity CMS Core
npm install sanity@latest next-sanity@latest @sanity/image-url@latest

# TypeScript (for type safety)
npm install typescript @types/node @types/react @types/react-dom

# Styling
npm install tailwindcss@latest @tailwindcss/typography

# Essential utilities
npm install dayjs
```

#### **RECOMMENDED ARCHITECTURE** (Install if using patterns):
```bash
# UI Icons (if using icon system)
npm install @sanity/icons react-icons

# Additional Sanity tools
npm install @sanity/vision @sanity/color-input

# Styled components (if using)
npm install styled-components @types/styled-components

# Development tools
npm install eslint eslint-config-next @eslint/eslintrc
npm install dotenv critters
```

#### **PROJECT-SPECIFIC** (Skip initially, add as needed):
```bash
# Media widgets (only if needed)
npm install @sanity/spotify-widget @sanity/youtube-widget

# Specific UI libraries (evaluate per project)
npm install framer-motion react-spring

# Analytics/tracking (project-dependent)
npm install @vercel/analytics google-analytics
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "predev": "npm run typegen",
    "prebuild": "npm run typegen",
    "typegen": "sanity schema extract --path=./src/sanity/extract.json && sanity typegen generate"
  }
}
```

---

## Sanity CMS Architecture

### Schema Development Patterns

#### 1. Schema Organization
```typescript
// src/sanity/schemaTypes/index.ts
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents (content types)
    homePageType,
    pageType,
    blogPostType,

    // Objects (reusable components)
    pageBuilderType,
    richTextType,
    imageType,

    // Shared components
    linkType,
    ctaType,
  ],
};
```

#### 2. Standard Schema Pattern
```typescript
// AI Helper comment for consistency
// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

export const exampleType = defineType({
  name: 'example',
  title: 'Example Content',
  type: 'document',
  icon: ExampleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'The main title for this content'
    }),
    // More fields...
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  }
});
```

#### 3. Singleton Page Implementation
For pages that should only exist once (About, Contact, etc.):

**Required Steps:**
1. **Schema Definition** with proper structure
2. **Desk Structure** configuration for single document editing
3. **Protected Document Actions** to prevent deletion/duplication
4. **Internal Link System** integration for navigation
5. **URL Generation** in GROQ queries
6. **Validation** that all steps are completed

#### 4. Link System Architecture
Centralized link management for internal/external navigation:

```typescript
// src/sanity/schemaTypes/shared/linkSystem.ts
export const LINKABLE_PAGE_TYPES = [
  { type: 'page' },
  { type: 'homePage' },
  { type: 'blogPost' },
  // Add new page types here
] as const;

export const createLinkFieldSet = (options = {}) => [
  // Link type selection
  // Internal page reference
  // External URL
  // Section anchors
  // Open in new tab option
];
```

#### 5. Content Block System
Flexible page builder with reusable content blocks:

```typescript
// Page builder pattern
export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Content',
  type: 'array',
  of: [
    { type: 'richText' },
    { type: 'imageBlock' },
    { type: 'ctaButton' },
    { type: 'videoEmbed' },
    // Add new block types here
  ]
});
```

### Sanity Studio Configuration

#### Desk Structure for Content Organization
```typescript
// src/sanity/structure.ts
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Singletons (Home, Settings, etc.)
      S.listItem()
        .title('🏠 Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

      // Content collections
      S.listItem()
        .title('📄 Pages')
        .child(S.documentTypeList('page')),

      // More sections...
    ]);
```

#### Protected Document Actions
```typescript
// src/sanity/actions/protectedDocumentActions.ts
const PROTECTED_DOCUMENT_TYPES = [
  'siteSettings',
  'header',
  'footer',
  'homePage',
  // Add singleton types here
];

export const protectedDocumentActions: DocumentActionsResolver = (prev, { schemaType }) => {
  if (PROTECTED_DOCUMENT_TYPES.includes(schemaType)) {
    return prev.filter(action =>
      action.action !== 'delete' &&
      action.action !== 'duplicate'
    );
  }
  return prev;
};
```

---

## Reusable Utility Systems

### 1. Image Optimization System

#### Unified Image Component
A comprehensive image component that handles all optimization automatically:

```typescript
// Key features:
// - Automatic DPI optimization (2-3x for high-resolution displays)
// - Context-based sizing (icon, thumbnail, card, hero, etc.)
// - Schema markup generation for SEO
// - Modal support for full-screen viewing
// - Sanity live editing integration
// - Responsive optimization

<UnifiedImage
  src={image}
  alt="Description"
  mode="sized"
  width={1200}
  height={800}
  sizeContext="full"
  objectFit="cover"
  className="w-full h-auto rounded-lg"
  enableModal
  generateSchema
  schemaContext="article"
/>
```

#### Image Utilities
```typescript
// src/lib/imageUtils.ts
export function validateImageSource(src: unknown): ImageValidationResult
export function extractImageDimensions(src: SanityImageSource): ImageDimensions | null
export function calculateOptimalDimensions(displayWidth: number, options): ImageDimensions
export function generateResponsiveSizes(context: string): string
export function filterValidImages<T>(images: T[]): Array<T & { image: NonNullable<SanityImageSource> }>
```

### 2. Scroll Management System

#### Body Scroll Lock with Reference Counting
Prevents page jumping when multiple components use scroll lock:

```typescript
// src/hooks/useBodyScrollLock.ts
export const useBodyScrollLock = (isLocked: boolean) => {
  // Features:
  // - Reference counting for multiple simultaneous locks
  // - Scrollbar width compensation
  // - Event system for coordination
  // - Position restoration
};

export const useScrollLockStatus = () => ({
  isAnyScrollLocked: () => boolean,
  onScrollUnlocked: (callback: () => void) => cleanup
});
```

#### Navigation Scroll System
Intelligent anchor link navigation that waits for page readiness:

```typescript
// src/components/NavigationScroll.tsx
// Features:
// - Waits for page content to be ready
// - Coordinates with scroll lock system
// - DOM mutation observation for dynamic content
// - Fallback mechanisms for reliability
```

### 3. Section Helper Utilities

```typescript
// src/utils/sectionHelpers.ts
export type TextAlignment = 'left' | 'center' | 'right';

export const createSanityDataAttribute = (
  documentId?: string,
  documentType?: string,
  path?: string
): Record<string, string>

export const getTextAlignClass = (align: TextAlignment): string
```

---

## SEO & Performance Systems

### 1. Structured Data Generation

#### Comprehensive Schema Markup System
```typescript
// src/lib/structuredData.ts
export interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  sameAs?: string[];
}

export function generateOrganizationSchema(data: OrganizationData)
export function generateWebSiteSchema(data: WebSiteData)
export function generateBlogPostSchema(data: BlogPostData)
export function generateArticleSchema(data: ArticleData)
export function generateBreadcrumbSchema(items: BreadcrumbItem[])
export function generateImageObjectSchema(data: ImageObjectData)
```

#### Automatic Schema Integration
- **UnifiedImage Component**: Auto-generates ImageObject schema for content images
- **Blog Components**: Generate Article schema with proper author and publisher data
- **Page Components**: Include WebPage and BreadcrumbList schema
- **Custom Content**: Add structured data for any content types specific to your project

### 2. Dynamic Sitemap Generation

```typescript
// src/app/sitemap.xml/route.ts
export async function GET() {
  const [pages, blogPosts, legal] = await Promise.all([
    getAllPages(),
    getAllBlogPostsForSitemap(),
    getLegalPagesForSitemap(),
  ]);

  const allUrls = [
    ...staticPages,
    ...dynamicPages,
    ...blogPosts.map(post => ({
      url: `/blog/${post.slug.current}`,
      lastmod: post._updatedAt,
      changefreq: 'monthly',
      priority: '0.7'
    }))
  ];

  return new NextResponse(generateSitemapXML(allUrls));
}
```

### 3. Performance Optimization

#### Critical CSS Inlining
```typescript
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Critical CSS inlined for Core Web Vitals */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* ⚠️ WARNING: This critical CSS is duplicated in globals.css */
            /* Keep both files in sync when making changes */
            :root {
              --color-brand-primary: #your-brand-color;
              /* Critical variables only */
            }
            /* Above-the-fold styles only */
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

#### Robots.txt Configuration
```typescript
// src/app/robots.txt/route.ts
export function GET(): Response {
  const robotsText = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /studio/',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`
  ].join('\n');

  return new Response(robotsText, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

### 4. Breadcrumb System

```typescript
// src/components/ui/Breadcrumb.tsx
const Breadcrumb = ({ pageTitle, pageTitleClickable, pageTitleHref }) => (
  <nav aria-label="Breadcrumb">
    <Link href="/" aria-label="Go to home page">
      <FaHome />
    </Link>
    <span>&gt;</span>
    {pageTitleClickable ? (
      <Link href={pageTitleHref}>{pageTitle}</Link>
    ) : (
      <span>{pageTitle}</span>
    )}
  </nav>
);
```

---

## Component Architecture Patterns

### 1. Block-Based Content System

#### Rich Text with Portable Text
```typescript
// src/components/blocks/RichText.tsx
const RichText = ({ content, textAlign, isCallout, inheritAlignment }) => {
  const effectiveTextAlign = resolveAlignment(textAlign, inheritAlignment);
  const alignedComponents = createComponents(effectiveTextAlign);

  const proseContent = (
    <div className={`prose prose-slate max-w-none ${getTextAlignClass(effectiveTextAlign)}`}>
      <PortableText value={content} components={alignedComponents} />
    </div>
  );

  return isCallout ? (
    <div className="bg-card-gradient border rounded-lg p-6 md:p-10">
      {proseContent}
    </div>
  ) : proseContent;
};
```

#### Alignment System
```typescript
// src/components/blocks/shared/alignmentUtils.ts
export const resolveAlignment = (
  blockAlignment: TextAlignmentWithInherit,
  inheritedAlignment?: TextAlignment
): TextAlignment => {
  if (blockAlignment === 'inherit') {
    return inheritedAlignment || 'center';
  }
  return blockAlignment;
};
```

### 2. Context Providers

#### Page Load Context
```typescript
// src/contexts/PageLoadContext.tsx
export const PageLoadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPageReady, setIsPageReady] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <PageLoadContext.Provider value={{ isPageReady, setIsPageReady, showLoading, setShowLoading }}>
      {children}
    </PageLoadContext.Provider>
  );
};
```

#### Site Data Context
```typescript
// src/contexts/SiteDataContext.tsx
export const SiteDataProvider = ({ children, initialData }: Props) => {
  return (
    <SiteDataContext.Provider value={initialData}>
      {children}
    </SiteDataContext.Provider>
  );
};
```

### 3. Layout Components

#### Section Wrappers
```typescript
// src/components/Layout/SubSection.tsx
const SubSection = ({ children, className, ...props }: SubSectionProps) => (
  <div className={`space-y-8 md:space-y-12 ${className}`} {...props}>
    {children}
  </div>
);
```

### 4. Accessibility Patterns

#### Focus Trap Hook
```typescript
// src/hooks/useFocusTrap.ts
export const useFocusTrap = (isActive: boolean) => {
  // Implementation for accessible modal/dropdown focus management
};
```

---

## Development Setup & Configuration

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Use @theme directive in globals.css for Tailwind v4 custom properties
};

export default config;
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
SANITY_API_READ_TOKEN=your_read_token
```

---

## Project-Agnostic CLAUDE.md Template

```markdown
# AI Development Instructions

This file contains instructions for AI assistants working on this project.

## TypeScript Guidelines
**IMPORTANT: Never use `any` type - the ESLint configuration prohibits this.**

When removing fields from Sanity schemas that are referenced in frontend components:
1. Remove field from schema
2. Regenerate types using `npm run typegen`
3. Update component references using proper typing:
   ```typescript
   // ❌ Wrong - ESLint error
   textAlign={(block as any).textAlign}

   // ✅ Correct - Use specific type assertion
   textAlign={(block as { textAlign?: string }).textAlign}
   ```

## Sanity CMS Schema Development

### Schema Structure and Validation
- Always include proper field validation (required fields, character limits, etc.)
- Use descriptive field names and titles
- Provide helpful descriptions for content editors
- Include preview configurations where appropriate
- Follow the existing naming conventions in the codebase

### AI Helper Comment
When creating or modifying Sanity schema files, include this standardized comment:

```javascript
// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.
```

### Singleton Page Implementation Checklist
**CRITICAL: When creating singleton pages, you MUST complete ALL of these steps:**

1. **Schema Definition** with proper structure
2. **Desk Structure Configuration** in `src/sanity/structure.ts`
3. **Protected Document Actions** in `src/sanity/actions/protectedDocumentActions.ts`
4. **Internal Link System Integration** in `src/sanity/schemaTypes/shared/linkSystem.ts`
5. **GROQ Query URL Generation** in `src/sanity/lib/queries.ts`
6. **Validation Checklist** - verify all steps work correctly

## SEO Implementation Maintenance
**CRITICAL: All SEO features must be maintained when making structural changes.**

### Implemented SEO Features
- **XML Sitemap** (`/sitemap.xml`) - Dynamically generated
- **Robots.txt** (`/robots.txt`) - Static configuration
- **Breadcrumbs** - Dynamic navigation aids
- **Canonical URLs** - Prevents duplicate content issues
- **Structured Data (JSON-LD)** - Rich snippets for search engines

### When to Update SEO Components
1. **Adding new document types** - Update sitemap generation
2. **Changing URL structure** - Update canonical URLs and breadcrumbs
3. **Adding new content types** - Add appropriate structured data
4. **Modifying business information** - Update Organization schema

## Image System Usage
**CRITICAL: Use the UnifiedImage component for all image handling.**

### Basic Usage Patterns
```typescript
// Content images
<UnifiedImage
  src={image}
  alt="Description"
  mode="sized"
  width={1200}
  height={800}
  sizeContext="full"
  className="w-full h-auto rounded-lg"
  generateSchema
  schemaContext="article"
/>

// Gallery images with modal
<UnifiedImage
  src={image}
  alt="Gallery image"
  mode="fill"
  sizeContext="gallery"
  enableModal
  sizes="(max-width: 768px) 50vw, 33vw"
/>
```

## Performance Optimization
**CRITICAL: This project uses intentional CSS duplication for performance.**

### Critical CSS System
- **Primary styles**: `src/app/globals.css`
- **Critical inline styles**: `src/app/layout.tsx`
- **Maintenance**: Keep both files in sync for critical styles

## Development Workflow
1. **Always run `npm run typecheck`** after code changes
2. **Use the scroll lock system** for modals and overlays
3. **Generate structured data** for content images
4. **Update sitemap** when adding new content types
5. **Test anchor links** in development environment

## Testing Checklist
After making changes that affect core systems:
- [ ] TypeScript compilation passes
- [ ] SEO structured data validates
- [ ] Image optimization works correctly
- [ ] Scroll lock system prevents page jumping
- [ ] Anchor links work with loading states
- [ ] Sitemap includes new content types
```

---

## Implementation Checklist

### Phase 1: Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Install essential architecture dependencies
- [ ] Set up folder structure following the guide
- [ ] Configure TypeScript, ESLint, and Tailwind
- [ ] Set up environment variables

### Phase 2: Sanity Integration
- [ ] Initialize Sanity project
- [ ] Set up basic schema structure with AI Helper comments
- [ ] Configure desk structure for content organization
- [ ] Implement protected document actions
- [ ] Set up live editing and draft preview

### Phase 3: Core Utilities
- [ ] Implement scroll lock system with reference counting
- [ ] Create image optimization utilities and UnifiedImage component
- [ ] Set up section helpers and alignment utilities
- [ ] Implement page load context and navigation scroll

### Phase 4: SEO Foundation
- [ ] Create structured data generation system
- [ ] Implement dynamic sitemap generation
- [ ] Set up robots.txt configuration
- [ ] Create breadcrumb component
- [ ] Implement critical CSS inlining

### Phase 5: Content Architecture
- [ ] Set up link system for internal/external navigation
- [ ] Create content block system with rich text support
- [ ] Implement page builder architecture
- [ ] Set up live editing attributes
- [ ] Create context providers for global state

### Phase 6: Performance & Polish
- [ ] Optimize image loading and responsive sizes
- [ ] Implement modal and accessibility features
- [ ] Set up comprehensive error handling
- [ ] Create loading states and transitions
- [ ] Validate all SEO features work correctly

### Phase 7: Documentation & Maintenance
- [ ] Create project-specific CLAUDE.md file
- [ ] Document custom schema patterns and conventions
- [ ] Set up development workflow and testing procedures
- [ ] Create deployment and content management guides

---

## Key Success Factors

1. **Type Safety**: Auto-generated Sanity types prevent runtime errors
2. **Performance**: Critical CSS and image optimization improve Core Web Vitals
3. **SEO**: Comprehensive structured data and sitemap boost search visibility
4. **Content Management**: Flexible schema system adapts to changing requirements
5. **Developer Experience**: Consistent patterns and documentation reduce cognitive load
6. **Accessibility**: Focus management and semantic markup ensure inclusive design
7. **Maintainability**: Modular architecture and clear separation of concerns

This architecture guide provides a battle-tested foundation for content-driven websites that prioritize performance, SEO, and maintainability while delivering an excellent content management experience.