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

## Sanity Image Array Handling
**CRITICAL: Always filter null/undefined images when working with Sanity image arrays.**

### Common Error Prevention
When working with Sanity image arrays (like `featuredImages`, `gallery`, etc.), always filter out invalid entries to prevent `Cannot read properties of null (reading '_ref')` errors:

```typescript
// ❌ Wrong - Will crash if array contains null/undefined entries
{featuredImages.map((image, index) => (
  <Image src={urlFor(image).url()} ... />
))}

// ✅ Correct - Filter out invalid entries first
const validImages = featuredImages?.filter((image) => image && image.asset && image.asset._ref) || [];

{validImages.map((image, index) => (
  <Image src={urlFor(image).url()} ... />
))}
```

### Why This Happens
- Sanity Studio allows adding array items that aren't fully saved
- Draft content can contain null/undefined entries
- Image uploads can fail leaving empty references
- Always validate `image.asset._ref` exists before using `urlFor()`

### Standard Pattern
Apply this pattern to ALL Sanity image array components:
1. Check if array exists and has length
2. Filter for valid images with proper asset references  
3. Check filtered array length before rendering
4. Use filtered array for mapping

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

## General Development Guidelines
- Follow existing code patterns and conventions
- Ensure proper TypeScript types are maintained
- Test changes thoroughly before committing
- Use existing utility functions and components where possible