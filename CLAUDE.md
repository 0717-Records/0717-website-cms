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
  sizeContext="thumbnail"
  objectFit="contain"
  documentId={headerData._id}
  documentType="header"
  fieldPath="logo"
/>
```

#### 3. Gallery Images with Modal
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

#### 4. Hero/Background Images
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

#### 5. Icon Images
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

### Key Props

#### Size Context (Automatic Optimization)
- `sizeContext="icon"`: 24px base, 3x multiplier (72px from Sanity)
- `sizeContext="thumbnail"`: 64px base, 2.5x multiplier (160px from Sanity)
- `sizeContext="card"`: 200px base, 2x multiplier (400px from Sanity)
- `sizeContext="gallery"`: 300px base, 2x multiplier (600px from Sanity)
- `sizeContext="hero"`: 800px base, 2x multiplier (1600px from Sanity)
- `sizeContext="full"`: 1200px base, 1.5x multiplier (1800px from Sanity)

#### Layout Modes
- `mode="fill"`: Use with containers that have defined dimensions/aspect ratios
- `mode="sized"`: Use with explicit width/height props

#### Object Fit
- `objectFit="cover"`: Crops image to fill container (default)
- `objectFit="contain"`: Scales image to fit within container

#### Schema Generation
- `generateSchema={true}`: Adds ImageObject structured data
- `schemaContext="blog|article|gallery|profile"`: Context for schema generation

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

## General Development Guidelines
- Follow existing code patterns and conventions
- Ensure proper TypeScript types are maintained
- Test changes thoroughly before committing
- Use existing utility functions and components where possible