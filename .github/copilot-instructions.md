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

### Component Structure

- Keep components focused on presentation
- Extract business logic to action functions
- Use proper prop typing
- Handle loading and error states

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
