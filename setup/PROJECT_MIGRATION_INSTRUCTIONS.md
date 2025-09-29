# Project Migration Instructions

> **Purpose**: Step-by-step instructions for using AI to extract architecture from an existing Next.js + Sanity project and implement it in a new project.

## Overview

This document provides the exact prompts and workflow to:
1. Extract reusable architecture patterns from an existing project
2. Set up a new project using those proven patterns
3. Maintain architectural benefits while starting fresh

---

## Phase 1: Extract Architecture from Current Project

### When to Use This Phase
- You have a working Next.js + Sanity project with proven patterns
- You want to start a new project for a different client/business
- You want the same architectural benefits without project-specific content

### Prompt for Current Project (Source)

```
Create a comprehensive project architecture guide that extracts all reusable patterns, utilities, and configurations from this codebase that would be valuable for starting a similar Sanity + Next.js content-driven website. Include:

1. Core architectural patterns and folder structure
2. Reusable utility functions and hooks (especially SEO, scroll management, image handling)
3. Sanity schema patterns and configuration approaches
4. Component architecture patterns (without specific styling)
5. Essential development configurations (TypeScript, ESLint, etc.)
6. Key implementation guidelines from CLAUDE.md that are project-agnostic
7. Categorized dependencies (essential vs project-specific vs recommended)
8. SEO and performance optimization systems
9. A project-agnostic CLAUDE.md template for new projects

Format this as a comprehensive setup guide that can be used to bootstrap a new project with the same architectural benefits but different content and design. Include:

- Complete folder structure recommendations
- Code examples for key utilities and patterns
- Step-by-step implementation checklist
- Dependency categorization with installation commands
- Configuration file templates
- Best practices and common pitfalls to avoid

The goal is to create a blueprint that allows starting a new project with all the hard-won architectural insights without any of the current project's specific content, styling, or business logic.
```

### Expected Output
- Comprehensive ARCHITECTURE_GUIDE.md file
- Categorized dependencies (essential, recommended, project-specific)
- Reusable utility patterns and code examples
- Configuration templates
- Implementation checklist

---

## Phase 2: Implement Architecture in New Project

### When to Use This Phase
- You have the ARCHITECTURE_GUIDE.md from Phase 1
- You're starting a completely new Next.js + Sanity project
- You want to implement the proven architectural patterns

### Prompt for New Project (Target)

```
I'm starting a new Sanity + Next.js content-driven website and want to implement proven architectural patterns from a previous project. I have a comprehensive architecture guide that contains tested patterns for:

- Folder structure and project organization
- Essential vs recommended vs project-specific dependencies
- Reusable utility functions and hooks (scroll management, image optimization, SEO)
- Sanity schema patterns and configuration approaches
- Component architecture patterns (without specific styling)
- SEO and performance optimization systems
- Development configurations and best practices

Help me implement this architecture in my new project by:

1. **Setting up the optimal folder structure** following the proven patterns
2. **Installing essential dependencies** (skip project-specific ones for now)
3. **Implementing core utility systems**:
   - Scroll lock system with reference counting
   - Image optimization with UnifiedImage component
   - SEO utilities and structured data generation
   - Navigation scroll management
4. **Configuring Sanity** with the proven schema patterns and desk structure
5. **Setting up development configurations** (TypeScript, ESLint, Tailwind)
6. **Creating a project-specific CLAUDE.md** file with development guidelines

Focus on implementing the foundational architecture first - I'll handle content types, styling, and business logic separately based on the new project's requirements.

[Then paste the content from ARCHITECTURE_GUIDE.md]
```

### Expected Workflow
1. **Project Initialization**: AI sets up Next.js project with optimal folder structure
2. **Dependency Installation**: AI installs essential and recommended packages
3. **Core Utilities**: AI implements scroll management, image optimization, SEO systems
4. **Sanity Setup**: AI configures Sanity with proven schema patterns
5. **Configuration**: AI sets up TypeScript, ESLint, Tailwind with best practices
6. **Documentation**: AI creates project-specific CLAUDE.md with guidelines

---

## Phase 3: Customization and Content Development

### After Architecture Implementation
Once the foundational architecture is in place, you can:

1. **Customize styling** - Implement new design system and brand colors
2. **Create content types** - Add new schemas specific to the business
3. **Build components** - Create project-specific UI components
4. **Add business logic** - Implement features unique to the new project
5. **Content migration** - If migrating any content from the old project

### Validation Checklist
After implementing the architecture, verify:

- [ ] TypeScript compilation passes without errors
- [ ] Essential utilities work correctly (scroll lock, image optimization)
- [ ] SEO systems are functional (sitemap, structured data)
- [ ] Sanity Studio is properly configured
- [ ] Development workflow scripts work (`npm run typecheck`, `npm run typegen`)
- [ ] Core components render without styling issues

---

## Key Benefits of This Approach

### ✅ What You Gain
- **Proven architecture** - Battle-tested patterns from production use
- **Time savings** - Skip re-solving architectural problems
- **Clean start** - No legacy code or project-specific baggage
- **Consistency** - Maintain quality standards across projects
- **Documentation** - Comprehensive guides for future reference

### ⚠️ What to Avoid
- **Don't copy content** - Extract patterns, not specific business logic
- **Don't copy styling** - Architecture is separate from visual design
- **Don't copy dependencies** - Only install what you actually need
- **Don't skip validation** - Test that everything works in the new context

---

## Advanced Tips

### For Complex Projects
If your source project has very specific or complex patterns:

1. **Extract incrementally** - Focus on core utilities first, add complexity later
2. **Document context** - Note why certain patterns exist and when to use them
3. **Create examples** - Include working code examples for complex integrations
4. **Plan customization** - Consider how patterns might need to adapt for new use cases

### For Team Projects
When multiple developers will work on the new project:

1. **Include team guidelines** - Add coding standards and review processes
2. **Document dependencies** - Explain why each dependency is needed
3. **Create onboarding** - Include setup instructions for new team members
4. **Establish workflows** - Define how to handle schema changes, deployments, etc.

### For Client Projects
When building for external clients:

1. **Simplify documentation** - Focus on content management, not technical details
2. **Include training materials** - How to use Sanity Studio effectively
3. **Plan handoff** - What the client needs to maintain the project
4. **Consider licensing** - Ensure any copied code patterns are appropriately licensed

---

## Troubleshooting Common Issues

### If Architecture Extraction Fails
- **Verify project state** - Ensure source project is working correctly
- **Check file access** - AI might not be able to read certain files
- **Simplify request** - Focus on one area at a time (e.g., just utilities)
- **Provide context** - Explain what the current project does and its key features

### If New Project Implementation Fails
- **Check dependencies** - Ensure all required packages are installed
- **Verify configuration** - TypeScript, ESLint, and Tailwind configs must be correct
- **Test incrementally** - Implement one system at a time and test
- **Compare with source** - Check if patterns were extracted correctly

### If Patterns Don't Work in New Context
- **Adapt, don't copy** - Some patterns may need modification for new requirements
- **Document changes** - Note what was changed and why
- **Test thoroughly** - Ensure modifications don't break other systems
- **Update documentation** - Keep CLAUDE.md in sync with any changes

---

## Example File Structure After Implementation

```
new-project/
├── ARCHITECTURE_GUIDE.md     # Reference from source project
├── CLAUDE.md                 # Project-specific guidelines
├── PROJECT_MIGRATION_INSTRUCTIONS.md  # This file
├── src/
│   ├── actions/              # Server actions
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   │   ├── UI/               # Including UnifiedImage
│   │   └── blocks/           # Content blocks
│   ├── contexts/             # React contexts
│   ├── hooks/                # Including useBodyScrollLock
│   ├── lib/                  # Including structuredData.ts
│   ├── sanity/               # CMS configuration
│   ├── types/                # TypeScript definitions
│   └── utils/                # Utility functions
├── package.json              # With categorized dependencies
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind configuration
└── eslint.config.mjs         # ESLint configuration
```

This structure ensures you have both the architectural foundation and the guidance needed to build upon it effectively.