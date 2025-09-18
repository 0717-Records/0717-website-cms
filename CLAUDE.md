# AI Development Instructions

This file contains instructions for AI assistants working on this project.

## Sanity CMS Schema Development

When working with Sanity schema types, please follow these guidelines:

### Schema Structure and Validation
- Always include proper field validation (required fields, character limits, etc.)
- Use descriptive field names and titles
- Provide helpful descriptions for content editors
- Include preview configurations where appropriate
- Follow the existing naming conventions in the codebase

### AI Helper Comment
When creating or modifying Sanity schema files, include this standardized comment at the top of each schema file to help AI assistants understand the context:

```javascript
// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.
```

This comment should be referenced and applied consistently across all schema files to maintain development standards.

## Typography Guidelines
**IMPORTANT: Always use custom font size classes from globals.css instead of native Tailwind font size classes.**

### Custom Font Size Classes Available:
- **Headings**: `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-h5`, `text-h6`
- **Body Text**: `text-body-xs`, `text-body-sm`, `text-body-base`, `text-body-lg`, `text-body-xl`, `text-body-2xl`, `text-body-3xl`, `text-body-4xl`, `text-body-5xl`, `text-body-6xl`, `text-body-7xl`, `text-body-8xl`, `text-body-9xl`

### Mapping Guide:
- `text-xs` → `text-body-xs`
- `text-sm` → `text-body-sm` 
- `text-base` → `text-body-base`
- `text-lg` → `text-body-lg`
- `text-xl` → `text-body-xl`
- `text-2xl` → `text-body-2xl`
- `text-3xl` → `text-body-3xl`
- `text-4xl` → `text-body-4xl`
- `text-5xl` → `text-body-5xl`
- `text-6xl` → `text-body-6xl`
- `text-7xl` → `text-body-7xl`
- `text-8xl` → `text-body-8xl`
- `text-9xl` → `text-body-9xl`

### Usage Guidelines:
- **Use `text-h*` classes** for actual headings that need specific heading styling (font weight, etc.)
- **Use `text-body-*` classes** for all other text sizing needs, including icons and decorative text

**These custom classes include responsive behavior and proper line heights. Never use native Tailwind font size classes like `text-xs`, `text-sm`, `text-lg`, `text-xl`, `text-2xl`, etc.**

## TypeScript Guidelines
**IMPORTANT: Never use `any` type - the ESLint configuration prohibits this.**

### Schema Field Removal Protocol
When removing fields from Sanity schemas that are referenced in frontend components:

1. **Remove field from schema** (e.g., `sectionFactory.ts`)
2. **Regenerate types** using `npm run typegen`
3. **Update PageBuilder references** using proper typing:
   ```typescript
   // ❌ Wrong - ESLint error
   textAlign={(block as any).textAlign}
   
   // ✅ Correct - Use specific type assertion
   textAlign={(block as { textAlign?: string }).textAlign}
   ```

### Type-Safe Field Access
When accessing potentially undefined fields from removed schema properties:
- Use type assertions with specific interface definitions
- Avoid `any` type at all costs
- Consider making the field optional (`?:`) in component interfaces
- Add explanatory comments about field availability

## Unified Image Component Usage
**CRITICAL: Use the UnifiedImage component for all image handling to ensure consistency, performance, and SEO.**

### Overview
The `UnifiedImage` component (`@/components/UI/UnifiedImage`) automatically handles:
- **Auto-sizing for crisp images**: Automatically requests 2-3x display size from Sanity for high-DPI displays
- **Schema markup generation**: Adds ImageObject structured data for SEO
- **Responsive optimization**: Generates appropriate sizes for different breakpoints
- **Null/undefined handling**: Built-in validation and fallback rendering
- **Modal support**: Optional full-screen image viewing
- **Sanity live editing**: Proper data attributes for Studio editing

### Basic Usage Patterns

#### 1. Blog Card Images
```typescript
<div className="relative w-full aspect-[4/3] overflow-hidden">
  <UnifiedImage
    src={post.mainImage}
    alt={`${post.title} image`}
    mode="fill"
    sizeContext="card"
    objectFit="cover"
    generateSchema
    schemaContext="blog"
  />
</div>
```

#### 2. Header/Logo Images
```typescript
<UnifiedImage
  src={headerData.logo}
  alt="07:17 Records"
  mode="sized"
  width={180}
  height={125}
  sizeContext="logo"
  objectFit="contain"
  documentId={headerData._id}
  documentType="header"
  fieldPath="logo"
/>
```

#### 3. Profile Images
```typescript
<UnifiedImage
  src={profileImage}
  alt="Profile image"
  mode="fill"
  sizeContext="profile"
  objectFit="cover"
  sizes="(max-width: 768px) 150px, 200px"
/>
```

#### 4. Gallery Images with Modal
```typescript
<UnifiedImage
  src={image}
  alt={`Gallery image ${index + 1}`}
  mode="fill"
  sizeContext="gallery"
  objectFit="cover"
  enableModal
  modalCaption="Optional caption"
  sizes="(max-width: 768px) 50vw, 33vw"
/>
```

#### 5. Hero/Background Images
```typescript
<UnifiedImage
  src={heroImage}
  alt=""
  mode="fill"
  sizeContext="hero"
  objectFit="cover"
  priority
  sizes="100vw"
/>
```

#### 6. Icon Images
```typescript
<UnifiedImage
  src={icon}
  alt="Icon description"
  mode="sized"
  width={24}
  height={24}
  sizeContext="icon"
  objectFit="contain"
/>
```

### CRITICAL: Image Implementation Error Prevention

**ALWAYS follow these patterns to avoid Next.js Image errors:**

#### ✅ CORRECT: Sized Mode Pattern (Preferred for most cases)
```typescript
// Use for logos, content images, cards - any image where you want responsive sizing
<UnifiedImage
  src={image}
  alt="Description"
  mode="sized"
  width={1200}          // Explicit width for Next.js optimization
  height={800}          // Explicit height for Next.js optimization
  sizeContext="full"    // Or appropriate context
  objectFit="cover"
  className="w-full h-auto rounded-lg"  // REQUIRED: w-full h-auto for responsive
  enableModal
  generateSchema
  schemaContext="article"
/>
```

#### ✅ CORRECT: Fill Mode Pattern (For constrained containers only)
```typescript
// Use ONLY when you have a container with defined dimensions
<div className="relative w-full aspect-[4/3] overflow-hidden">
  <UnifiedImage
    src={image}
    alt="Description"
    mode="fill"
    sizeContext="gallery"
    objectFit="cover"
    fillContainer={true}  // Default - creates relative positioning
    sizes="(max-width: 768px) 100vw, 50vw"
    enableModal
  />
</div>
```

#### ❌ WRONG: Common Patterns That Cause Errors

**Never do this - causes aspect ratio warnings:**
```typescript
// ❌ WRONG: Sized mode without proper className
<UnifiedImage
  mode="sized"
  width={800}
  height={600}
  className="w-full"  // Missing h-auto
/>

// ❌ WRONG: Fill mode without proper container
<UnifiedImage
  mode="fill"  // No relative positioned parent
/>

// ❌ WRONG: fillContainer=false without absolute positioned parent
<div className="static">  // Should be relative
  <UnifiedImage
    mode="fill"
    fillContainer={false}
  />
</div>
```

#### Mode Selection Guidelines

**Use `mode="sized"`** when:
- Logo images (Header, Footer, Navigation)
- Content images in articles/blogs
- Card images that need responsive sizing
- Any image that should scale with container width

**Use `mode="fill"`** when:
- Hero background images
- Gallery thumbnails in fixed-size grids
- Images in containers with specific aspect ratios
- You have a container with defined dimensions (relative w-full h-full)

#### Mandatory Props for Each Mode

**For `mode="sized"` (ALWAYS include these):**
- `width` and `height` - Explicit dimensions for Next.js
- `className="w-full h-auto"` - Responsive scaling
- `sizeContext` - Appropriate size context

**For `mode="fill"` (ALWAYS include these):**
- Parent container with `relative` positioning
- `sizes` prop for responsive images
- `fillContainer={true}` (default) or proper absolute positioning setup

### Key Props

#### Size Context (Automatic Optimization)
- `sizeContext="icon"`: 24px base, 3x multiplier (72px from Sanity)
- `sizeContext="thumbnail"`: 64px base, 2.5x multiplier (160px from Sanity)
- `sizeContext="logo"`: 200px base, 2x multiplier (400px from Sanity)
- `sizeContext="profile"`: 300px base, 2x multiplier (600px from Sanity)
- `sizeContext="card"`: 200px base, 2x multiplier (400px from Sanity)
- `sizeContext="gallery"`: 300px base, 2x multiplier (600px from Sanity)
- `sizeContext="hero"`: 800px base, 2x multiplier (1600px from Sanity)
- `sizeContext="full"`: 1200px base, 1.5x multiplier (1800px from Sanity)

#### Layout Modes
- `mode="fill"`: Use with containers that have defined dimensions/aspect ratios
- `mode="sized"`: Use with explicit width/height props

#### Fill Mode Options
- `fillContainer={true}` (default): Creates positioned container for fill images (use for logos, contained images)
- `fillContainer={false}`: No container positioning, lets image fill parent directly (use for backgrounds, hero images)

#### Object Fit
- `objectFit="cover"`: Crops image to fill container (default)
- `objectFit="contain"`: Scales image to fit within container

#### Schema Generation
- `generateSchema={true}`: Adds ImageObject structured data
- `schemaContext="blog|article|gallery|profile"`: Context for schema generation

**IMPORTANT: Schema markup is required for all featured/content images for SEO:**
- **Blog images**: Use `generateSchema schemaContext="blog"`
- **Content/article images**: Use `generateSchema schemaContext="article"`
- **Gallery images**: Use `generateSchema schemaContext="gallery"`
- **Profile/user images**: Use `generateSchema schemaContext="profile"`

### Advanced Usage

#### Custom Display Sizes
```typescript
<UnifiedImage
  src={image}
  displaySize={{ width: 400, height: 300 }}
  dpiMultiplier={3}
  mode="fill"
/>
```

#### Responsive Sizes
```typescript
<UnifiedImage
  src={image}
  responsiveSizes={{
    mobile: { width: 400, height: 300 },
    tablet: { width: 600, height: 450 },
    desktop: { width: 800, height: 600 }
  }}
  sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
  mode="fill"
/>
```

### Sanity Image Array Handling
**The UnifiedImage component automatically handles invalid images, but you should still filter arrays:**

```typescript
// ✅ Recommended pattern with UnifiedImage
const validImages = images?.filter(item => item.image?.asset?._ref) || [];

{validImages.map((item, index) => (
  <UnifiedImage
    key={item._key || index}
    src={item.image}
    alt={`Gallery image ${index + 1}`}
    mode="fill"
    sizeContext="gallery"
    // Component handles null/undefined gracefully
  />
))}
```

### Migration from Old Patterns
- **Replace** `urlFor(image).width(X).height(Y).url()` → Use `sizeContext` or `displaySize`
- **Replace** manual `object-cover`/`object-contain` classes → Use `objectFit` prop
- **Replace** custom modal implementations → Use `enableModal={true}`
- **Replace** manual schema generation → Use `generateSchema={true}`
- **Replace** manual alt text fallbacks → Component handles automatically

### Performance Benefits
- **Automatic DPI optimization**: No more blurry images on high-resolution displays
- **Optimal Sanity requests**: Automatically calculates best image dimensions
- **Built-in Next.js optimization**: Proper `sizes`, `priority`, and responsive handling
- **Consistent quality settings**: Optimal quality for each context

### Maintenance Requirements
**CRITICAL: When adding new image components, you MUST:**

1. **Use UnifiedImage instead of Next.js Image** - Never use native `next/image` directly
2. **Add schema markup for content images** - Use `generateSchema={true}` with appropriate `schemaContext`
3. **Choose appropriate size context** - Use predefined contexts (icon, thumbnail, card, gallery, hero, full) for optimal sizing
4. **Provide meaningful alt text** - Essential for accessibility and SEO
5. **Add proper sizes prop** - For responsive images, especially with `mode="fill"`

**Schema markup is required for:**
- Featured images (blog posts, articles, events)
- Gallery images and collections
- Profile/author images
- Content images within rich text

## Event Schema Maintenance
**CRITICAL: All event components must include location-specific schema markup for local SEO.**

### Event Schema Implementation
The website includes comprehensive Event schema markup with Place/location data using `src/lib/structuredData.ts`. Event schema generation is enabled in:

- **EventCard component** - Individual event cards with full location data
- **EventList component** - Event listing pages (passes through to EventCard)
- **EventBlock component** - Event blocks in page content

### Usage Requirements
**IMPORTANT: When displaying events, you MUST enable schema generation:**

```typescript
// Event pages (like /events)
<EventList
  events={events}
  filter="upcoming"
  generateSchema={true}
  baseUrl={baseUrl}
  noEventsText="No events message"
/>

// Event blocks in page content
<EventBlock
  events={events}
  maxEvents={6}
  generateSchema={true}
  baseUrl={baseUrl}
/>
```

### Location Schema Benefits
Event schema automatically generates:
- **Event structured data** with start/end dates
- **Place schema** for venue and location information
- **Organization schema** for event organizer (07:17 Records)
- **Local SEO benefits** for location-based searches

**Generated schema includes:**
- Event name, description, dates
- Venue name and full address
- Event URL and organizer details
- Proper schema.org Event and Place markup

## SEO Sitemap Maintenance
**CRITICAL: When adding new document types or routes, the sitemap must be updated to maintain SEO.**

### Sitemap Implementation
The XML sitemap is generated dynamically at `/sitemap.xml` using the route handler at `src/app/sitemap.xml/route.ts`. It automatically includes:
- Static pages (home, blog index, events index, collabs index)
- Dynamic pages from Sanity (`page` document type)
- Blog posts (`blogPost` document type)
- Collaborations (`collab` document type)

### When to Update Sitemap
**YOU MUST update the sitemap when:**

1. **Adding new document types** with public-facing pages
2. **Adding new static routes** (new page components)
3. **Changing URL structure** for existing content types
4. **Adding new index/listing pages**

### How to Update Sitemap
1. **Add query to `src/sanity/lib/queries.ts`** for new document type:
   ```typescript
   export const ALL_NEW_TYPE_QUERY = defineQuery(`*[_type == "newType" && defined(slug.current)]{
     _id,
     _updatedAt,
     title,
     slug
   }`);
   ```

2. **Add action to appropriate file in `src/actions/`**:
   ```typescript
   export async function getAllNewTypeForSitemap() {
     const { data: items } = await sanityFetch({
       query: ALL_NEW_TYPE_QUERY,
     });
     return items;
   }
   ```

3. **Export from `src/actions/index.ts`**

4. **Update `src/app/sitemap.xml/route.ts`**:
   - Import the new action
   - Add to Promise.all() fetch
   - Add URL mapping to dynamicUrls array with appropriate priority and changefreq

### URL Priority Guidelines
- Homepage: 1.0
- Main index pages: 0.9
- Category/listing pages: 0.8
- Individual content pages: 0.6-0.7
- Archive/old content: 0.5

### Change Frequency Guidelines
- Homepage: weekly
- Blog index: daily (if content updates frequently)
- Category pages: weekly
- Individual content: monthly
- Static pages: monthly

**Failure to update the sitemap when adding new content types will result in poor SEO performance and content discovery issues.**

## SEO Implementation Maintenance
**CRITICAL: All SEO features must be maintained when making structural changes to the website.**

### Implemented SEO Features
The website has comprehensive SEO implementation including:
- **XML Sitemap** (`/sitemap.xml`) - Dynamically generated
- **Robots.txt** (`/robots.txt`) - Static configuration
- **Breadcrumbs** - Dynamic navigation aids
- **Canonical URLs** - Prevents duplicate content issues
- **Structured Data (JSON-LD)** - Rich snippets for search engines

### Breadcrumb Maintenance
**Location**: `src/components/ui/Breadcrumb.tsx`

**MUST update breadcrumbs when:**
1. **Adding new page types** or content types
2. **Changing URL structure** or routing patterns
3. **Adding nested navigation** or hierarchical content
4. **Modifying page titles** or display names

**How to update breadcrumbs:**
1. Add new route patterns to the breadcrumb mapping logic
2. Ensure proper parent-child relationships for nested pages
3. Update the breadcrumb generation for new content types
4. Test breadcrumb paths match actual navigation structure

### Canonical URL Maintenance
**Location**: Meta tags in page components and layout files

**MUST update canonical URLs when:**
1. **Changing domain** or subdomain structure
2. **Modifying URL patterns** for existing content types
3. **Adding URL parameters** that should be canonicalized
4. **Implementing URL redirects** or aliases

**How to maintain canonical URLs:**
1. Ensure all pages have proper canonical meta tags
2. Use absolute URLs (including domain)
3. Point to the preferred version of duplicate content
4. Update the canonical URL generation logic for new page types

### Structured Data (JSON-LD) Maintenance
**Location**: Various page components with structured data scripts

**MUST update structured data when:**
1. **Adding new content types** (Article, Event, Organization, etc.)
2. **Changing content structure** or available fields
3. **Adding new schema.org types** for rich snippets
4. **Modifying business information** (contact, address, etc.)

**How to update structured data:**
1. **For new content types**: Add appropriate schema.org JSON-LD scripts
2. **For content changes**: Update existing structured data to match new fields
3. **For business info**: Update Organization schema across all pages
4. **Validation**: Test with Google's Rich Results Test tool

**Common structured data types to maintain:**
- **WebSite** - Homepage search box and site info
- **Organization** - Business details and contact info
- **Article** - Blog posts and content pages
- **Event** - Event listings and details
- **BreadcrumbList** - Navigation breadcrumbs
- **WebPage** - General page information
- **ImageObject** - Featured images with detailed metadata (automatically handled by UnifiedImage component)

### Robots.txt Maintenance
**Location**: `src/app/robots.txt/route.ts`

**MUST update robots.txt when:**
1. **Adding admin/private sections** that should be blocked
2. **Changing sitemap URL** or adding new sitemaps
3. **Adding crawl directives** for specific user agents
4. **Blocking specific URL patterns** or directories

**How to update robots.txt:**
1. Add new Disallow rules for private content
2. Update sitemap references if sitemap location changes
3. Add specific crawl rules for different bots if needed
4. Test that important content is not accidentally blocked

### SEO Testing Checklist
**After making changes that affect SEO, ALWAYS verify:**

1. **Sitemap validation**: Visit `/sitemap.xml` and ensure new content appears
2. **Robots.txt check**: Visit `/robots.txt` and verify directives are correct
3. **Breadcrumb testing**: Navigate through pages and check breadcrumb accuracy
4. **Canonical URL verification**: View page source and confirm canonical tags
5. **Structured data validation**: Use Google's Rich Results Test
6. **Mobile-friendly test**: Ensure responsive design maintains SEO benefits

### SEO Impact Assessment
**Before making these changes, consider SEO impact:**
- **URL structure changes**: May affect existing search rankings
- **Content type additions**: Require comprehensive SEO implementation
- **Navigation changes**: Must be reflected in breadcrumbs and structured data
- **Meta tag modifications**: Could affect search result appearance
- **Schema changes**: May break existing structured data

**Always test SEO changes in staging environment before production deployment.**

## Critical CSS Performance Optimization

**CRITICAL: This project uses intentional CSS duplication for performance optimization.**

### Overview
The website implements critical CSS inlining in `src/app/layout.tsx` to improve Core Web Vitals and reduce render-blocking. This creates **intentional duplication** between two files that must be kept in sync.

### Files with Duplicated Styles

**Primary styles:** `src/app/globals.css`
**Critical inline styles:** `src/app/layout.tsx` (in `<style>` tag)

### Maintenance Requirements

**When modifying these style categories, update BOTH files:**

1. **Brand colors** (`--color-brand-primary`, `--color-brand-secondary`, etc.)
2. **Typography** (`text-body-base`, heading sizes, line heights)
3. **Layout positioning** (`scroll-padding-top`, header positioning)
4. **Critical spacing** (margins, padding for above-the-fold content)
5. **Interactive elements** (button styles, hover states)

### Why This Pattern Exists

- **Performance**: Critical styles load immediately, preventing render blocking
- **LCP optimization**: Above-the-fold content renders faster
- **Core Web Vitals**: Reduces Largest Contentful Paint and Cumulative Layout Shift
- **User experience**: Prevents Flash of Unstyled Content (FOUC)

### Warning System

Both files contain prominent warnings with ⚠️ symbols:
- `globals.css` - Warning at the top of the file
- `layout.tsx` - Warning before the inline `<style>` tag

### Best Practices

1. **Always check both files** when making style changes
2. **Test performance impact** after modifications
3. **Keep critical CSS minimal** - only above-the-fold essentials
4. **Update cross-references** if file locations change
5. **Document new duplications** if adding critical styles

### Alternative Approaches Considered

- **CSS-in-JS critical extraction**: More complex, harder to maintain
- **Build-time critical CSS tools**: Additional build complexity
- **No critical CSS**: Worse Core Web Vitals scores

**The current approach prioritizes maintainability while achieving performance goals.**

## Body Scroll Lock Management
**CRITICAL: Prevent page jumping when opening/closing modals, navigation, and overlays.**

### The Problem
The website uses `useBodyScrollLock` hook in multiple components to prevent background scrolling when overlays are open. However, when multiple components use this hook simultaneously, it can cause page jumping issues due to scroll position conflicts.

### Components Using Body Scroll Lock
These components currently use the `useBodyScrollLock` hook:
- **VerticalNav** (`src/components/Header/VerticalNav/VerticalNav.tsx`)
- **Modal** (`src/components/UI/Modal.tsx`)
- **LoadingOverlay** (`src/components/UI/LoadingOverlay.tsx`)

### Root Cause of Page Jumping
When multiple components lock body scroll simultaneously:

1. **First component** (e.g., Modal) captures original scroll position Y and applies CSS lock
2. **Second component** (e.g., VerticalNav) captures scroll position (now 0 due to fixed positioning) and tries to apply lock again
3. **Components close in different order** than they opened
4. **Wrong scroll position gets restored**, causing the page to jump

### The Reference Counting Solution
The `useBodyScrollLock` hook (`src/hooks/useBodyScrollLock.ts`) now implements reference counting:

```typescript
// Global state tracks multiple simultaneous locks
let lockCount = 0;
let originalScrollY = 0;
let isCurrentlyLocked = false;

// Only the FIRST lock captures scroll position
// Only the LAST unlock restores scroll position
```

### Critical Implementation Rules

**✅ DO:**
- Use `useBodyScrollLock(isOpen)` for any component that needs to prevent background scrolling
- Trust the hook to handle multiple simultaneous locks correctly
- Keep the hook implementation centralized in `src/hooks/useBodyScrollLock.ts`

**❌ NEVER:**
- Create custom scroll lock implementations for individual components
- Directly manipulate `document.body.style` for scroll prevention
- Use multiple different scroll lock libraries or approaches
- Remove the reference counting logic from the hook

### Why This Issue Keeps Recurring
1. **Multiple components need scroll lock** - Modal, Navigation, LoadingOverlay
2. **Hook appears to work in isolation** - Testing single components doesn't reveal the conflict
3. **Edge case combinations** - Users opening multiple overlays simultaneously
4. **Previous fixes were component-specific** - Didn't address the multi-component conflict

### Warning Signs of Regression
If users report page jumping when:
- Opening vertical navigation while a modal is open
- Closing modals after using navigation
- Loading overlays appearing during navigation
- Any combination of overlays being used together

**IMMEDIATELY check if:**
1. New components are using custom scroll lock instead of `useBodyScrollLock`
2. The reference counting logic has been removed from the hook
3. Multiple instances of scroll lock management exist

### Debugging Steps
If page jumping returns:

1. **Check hook usage**: `grep -r "useBodyScrollLock" src/`
2. **Verify single implementation**: Ensure only one scroll lock hook exists
3. **Test component combinations**: Open Modal → Open VerticalNav → Close in various orders
4. **Console log the lock count**: Add temporary logging to the hook to track reference counting

### Prevention Checklist
Before adding new overlay/modal components:

- [ ] Use `useBodyScrollLock(isOpen)` for scroll prevention
- [ ] Never implement custom scroll lock solutions
- [ ] Test with existing overlays (Modal, VerticalNav, LoadingOverlay)
- [ ] Verify no page jumping occurs when opening/closing in various combinations
- [ ] Check that only one body scroll lock implementation exists in the codebase

**This issue has been fixed multiple times. The solution is reference counting in the hook. Do not create alternative scroll lock implementations.**

## General Development Guidelines
- Follow existing code patterns and conventions
- Ensure proper TypeScript types are maintained
- Test changes thoroughly before committing
- Use existing utility functions and components where possible

### TypeScript Error Checking
**IMPORTANT: Always run `npm run typecheck` after making code changes** to ensure TypeScript errors are caught early. This script performs type checking without compilation and is faster than a full build.

**When to run typecheck:**
- After modifying component interfaces or props
- After changing import/export statements
- After adding or removing dependencies
- After schema changes that affect types
- After any code changes (unless trivial changes like comments)

**Skip only for:**
- Adding comments or documentation
- Modifying CSS/styling without type changes
- Non-code file changes (README, configs without type impact)

```bash
npm run typecheck
```