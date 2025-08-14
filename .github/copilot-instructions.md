# GitHub Copilot Instructions

## Project Overview

This is a Next.js website with Sanity CMS integration. The project uses TypeScript, Tailwind CSS, and follows a specific architecture pattern.

## Code Style & Standards

### TypeScript

- Always use TypeScript with strict type checking
- Import types using `import type { ... }` syntax when importing only types
- Use proper return type annotations for functions
- Prefer interface over type for object definitions when possible

### React & Next.js

- Use functional components with hooks
- Always use arrow function syntax for React components following the `rafce` pattern:

  ```tsx
  import React from 'react'

  const ComponentName = () => {
    return (
      <div>ComponentName</div>
    )
  }

  export default ComponentName
  ```

- Use `export default` at the bottom of component files
- Always use Next.js `<Link>` component for internal navigation instead of `<a>` tags
- Prefer Server Components when possible (Next.js App Router)
- Use `async/await` for server-side data fetching
- Always destructure props in function parameters
- Use proper Next.js conventions for file-based routing

### File Organization

- Components go in `src/components/`
- Data fetching actions go in `src/actions/`
- Sanity-related code goes in `src/sanity/`
- Use index files for clean imports

## Architecture Patterns

### Data Fetching

- Use action functions from `src/actions/` instead of direct sanityFetch calls
- Actions should be organized by feature (pages, posts, etc.)
- Always use proper TypeScript types from Sanity's generated types
- Handle null/undefined cases gracefully

### Sanity Integration

- Use generated types from `src/sanity/types.ts`
- Prefer query result types (e.g., `POSTS_QUERYResult`) over base types
- Keep queries in `src/sanity/lib/queries.ts`
- Use `sanityFetch` from live.ts for real-time updates
- **Implement live editing for all new components and blocks** by adding proper data attributes (see `docs/sanity-live-editing-guide.md` for detailed implementation patterns)
- When creating new Sanity schema types or blocks, ensure frontend components include the necessary `data-sanity` attributes for presentation view compatibility

### Component Structure

- Keep components focused on presentation
- Extract business logic to action functions
- Use proper prop typing
- Handle loading and error states
- **Maintain semantic heading hierarchy** (h1 → h2 → h3 → h4 → h5 → h6) to ensure proper document structure and accessibility

### Block Spacing Standards

**Standardized Block Spacing System:**

- **Between blocks**: `mb-8` (2rem) is automatically applied to all blocks except the last one in a group
- **Section padding**: `py-16 md:py-24` (4rem/6rem vertical)
- **Section header spacing**: `mb-8 md:mb-12` (2rem/3rem) for title/subtitle areas

**Implementation:**

- The `PageBuilder` automatically adds `mb-8` to all blocks except the last one
- Individual components should NOT add their own bottom margins - spacing is handled centrally
- Last blocks in a group get no bottom margin to avoid conflicting with section padding
- This ensures consistent spacing across all block combinations

**When adding new block components:**

1. Do NOT add bottom margins (`mb-*`) to the root element
2. Focus on internal spacing and padding within the component
3. The PageBuilder will handle spacing between blocks automatically
4. For standalone components outside of PageBuilder, manually add `mb-8` if needed

**Heading Component Spacing:**

- Headings used in Rich Text content: Default `showMargin={true}` provides `mb-4` spacing
- Headings used as standalone blocks: Use `showMargin={false}` to rely on PageBuilder spacing
- Section titles: Use `showMargin={false}` with manual `className='mb-6'` for specific spacing

## Naming Conventions

### Files

- Use camelCase for component files: `PostCard.tsx`
- Use kebab-case for page routes: `[slug]/page.tsx`
- Use camelCase for utility/action files: `getAllPosts.ts`

### Variables & Functions

- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use descriptive names that indicate purpose
- Prefix action functions with verbs: `getPostBySlug`, `createPost`

### CSS Classes

- Use Tailwind utility classes
- Prefer utility classes over custom CSS
- Use responsive prefixes consistently
- Group related classes logically
- **Utilize existing global CSS classes and custom utilities** from `src/app/globals.css` before creating new styles:
  - Typography utilities: `text-h1` through `text-h6`, `text-body-xs` through `text-body-3xl`
  - Brand gradient utilities: `bg-brand-gradient`, heading underline classes (`heading-underline-h2`, etc.)
  - CSS custom properties: `--color-brand-primary`, `--color-brand-secondary`, `--color-text-subtle`
  - Font variant utilities: `font-variant-small-caps`, `font-variant-normal`

## Common Patterns

### Page Components

```tsx
import { getPageBySlug } from '@/actions';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      {/* Page content */}
    </div>
  );
}
```

### Action Functions

```tsx
import { sanityFetch } from '@/sanity/lib/live';
import { QUERY_NAME } from '@/sanity/lib/queries';
import type { QUERY_NAMEResult } from '@/sanity/types';

export async function getDataBySlug(slug: string): Promise<QUERY_NAMEResult | null> {
  const { data } = await sanityFetch({
    query: QUERY_NAME,
    params: { slug },
  });

  return data;
}
```

### Component Functions

```tsx
import React from 'react'
import type { ComponentProps } from '@/types'

const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  return (
    <div className="container mx-auto">
      {/* Component content */}
    </div>
  )
}

export default ComponentName
```

### Navigation Components

```tsx
import React from 'react'
import Link from 'next/link'

const NavigationComponent = () => {
  return (
    <nav>
      {/* Internal links - always use Next.js Link */}
      <Link href="/posts" className="hover:text-pink-500">
        Posts
      </Link>

      {/* External links - use regular anchor tags */}
      <a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    </nav>
  )
}

export default NavigationComponent
```

## Error Handling

- Always handle null/undefined responses from Sanity
- Use Next.js `notFound()` for 404 cases
- Provide meaningful error messages
- Handle loading states appropriately

## Performance Considerations

- Leverage Next.js Server Components for better performance
- Use proper image optimization with Next.js Image component
- Minimize client-side JavaScript when possible
- Cache data appropriately using Next.js caching strategies

### Image Optimization Best Practices

**Always ensure crisp images on high-DPI displays:**

- **For small icons/images (24px or smaller)**: Request 3x the display size from Sanity (e.g., 72px for 24px display)
- **For medium images (up to 200px)**: Request 2-3x the display size
- **For large images**: Use responsive sizing with multiple breakpoints

**Sanity Image Implementation Pattern:**

```tsx
// ✅ CORRECT - Crisp on all displays
<Image
  src={urlFor(image).width(72).height(72).url()}
  alt={image.alt || ''}
  fill
  sizes='24px'
  className='object-contain'
/>

// ❌ INCORRECT - Blurry on high-DPI displays
<Image
  src={urlFor(image).width(24).height(24).url()}
  alt={image.alt || ''}
  fill
  className='object-contain'
/>
```

**Always handle uploading/incomplete images:**

```tsx
// ✅ CORRECT - Handles uploading state
{image && image.asset ? (
  <Image src={urlFor(image).width(72).height(72).url()} ... />
) : image && !image.asset ? (
  <div className="loading-placeholder animate-pulse">...</div>
) : null}

// ❌ INCORRECT - Will crash on uploading images
{image && (
  <Image src={urlFor(image).width(72).height(72).url()} ... />
)}
```

**Sizing Guidelines:**

- Icons (16-32px display): Request 48-96px from Sanity
- Small images (32-100px display): Request 96-300px from Sanity
- Medium images (100-400px display): Request 300-1200px from Sanity
- Large images (400px+ display): Use responsive sizing with `sizes` attribute

**Always include:**

- `sizes` attribute for responsive images
- `alt` text from Sanity (with fallback)
- Asset existence check before rendering
- Loading state for uploading images

## Development Workflow

When making changes to code:

1. Make the requested changes
2. Run build verification if needed
3. Complete all requested modifications and tasks
4. **Only at the very end, if the dev server was already running**: restart the dev server with `npm run dev` to ensure all changes are properly loaded
5. Set the restarted dev server to run in background so it continues running
6. **Never use `pkill` or force-stop the dev server** - let it restart naturally
7. If the dev server was running but gets stopped during the process, note it for restart at the end since it was originally running
8. Do not start the dev server if it wasn't already running

### File Management Best Practices

**Always use Git commands for file operations to prevent files reappearing:**

- **For renaming files**: Use `git mv old-file.tsx new-file.tsx` instead of `mv`
- **For deleting files**: Use `git rm file.tsx` instead of `rm`
- **After file operations**: Leave all changes for the user to manually stage and commit outside of the copilot chat
- **Never use terminal `mv` or `rm`** for tracked files - this causes files to reappear when VS Code reopens
- **Never run `git add` or `git commit`** - the user will handle staging and committing manually outside of the copilot chat

**Proper file operation workflow:**

```bash
# ✅ CORRECT - Git tracks the changes, user handles staging/committing
git mv src/components/OldComponent.tsx src/components/NewComponent.tsx
# Leave changes unstaged for user to review and commit when ready

# ❌ INCORRECT - File will reappear as untracked
mv src/components/OldComponent.tsx src/components/NewComponent.tsx

# ❌ INCORRECT - Don't stage or commit automatically
git add .
git commit -m "..."
```

## Dependencies to Favor

- Next.js App Router patterns
- Tailwind CSS for styling
- Sanity for content management
- TypeScript for type safety
- Server Components over Client Components when possible

## Code Examples to Avoid

- Direct sanityFetch calls in components (use actions instead)
- Missing type annotations
- Mixing client and server logic inappropriately
- Overly complex component hierarchies

## Testing Patterns

- Write tests for action functions
- Test component rendering with mock data
- Use proper TypeScript types in tests
- Follow Next.js testing best practices

---

_Replace these instructions with your specific project requirements and coding standards._
