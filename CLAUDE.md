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

## General Development Guidelines
- Follow existing code patterns and conventions
- Ensure proper TypeScript types are maintained
- Test changes thoroughly before committing
- Use existing utility functions and components where possible