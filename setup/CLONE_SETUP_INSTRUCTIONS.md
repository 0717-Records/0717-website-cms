# Clone Setup Instructions for New Project

## Overview
This guide provides precise instructions for cloning this repository and setting it up for a brand new project. The clone will start with identical schemas and functionality, which can be modified later.

## Step 1: Clone Repository and Update Git Remote

1. **Clone the repository:**
   ```bash
   git clone <current-repo-url> <new-project-name>
   cd <new-project-name>
   ```

2. **Update Git remote to point to your new repository:**
   ```bash
   git remote set-url origin <new-repo-url>
   git push -u origin main
   ```

## Step 2: Update Dependencies to Latest Versions

> **IMPORTANT:** Install latest versions of all dependencies instead of using locked versions.

1. **Delete existing dependency lock files:**
   ```bash
   rm package-lock.json
   ```

2. **Update package.json with latest dependency versions:**
   ```bash
   # This command updates all dependencies to their latest versions
   npx npm-check-updates -u
   ```

3. **Install the updated dependencies:**
   ```bash
   npm install
   ```

4. **Test that everything works:**
   ```bash
   npm run build
   npm run typecheck
   ```

5. **If there are any breaking changes from version updates, address them:**
   - Check the build output for errors
   - Review dependency changelogs for breaking changes
   - Update code as needed for compatibility

## Step 3: Update Project Identity

### A. Package.json Updates
**File:** `package.json`
- **Line 2:** Change `"name": "0717-website-cms"` to `"name": "your-new-project-name"`
- **Line 3:** Update version if desired (currently `"0.1.0"`)

## Step 4: Update Environment Variables (CRITICAL)

### A. Update .env.local file
Replace **ALL** values with your new project details:

```env
# Environment
NEXT_PUBLIC_ENV="development"

# Sanity Configuration - UPDATE THESE WITH YOUR NEW PROJECT
NEXT_PUBLIC_SANITY_PROJECT_ID="your-new-project-id"     # Currently: "ppc11sza"
NEXT_PUBLIC_SANITY_DATASET="your-dataset-name"          # Currently: "development"
NEXT_PUBLIC_SANITY_STUDIO_URL="/studio"

# Site Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"            # For development
NEXT_PUBLIC_SITE_URL="http://localhost:3000"            # For development

# Sanity API Tokens - GET THESE FROM YOUR NEW SANITY PROJECT
SANITY_API_READ_TOKEN="your-new-read-token"
SANITY_API_WRITE_TOKEN="your-new-write-token"           # If you have one
```

### B. Create .env.example Template
Create this file for other developers:

```env
# Copy this file to .env.local and update with your actual values

# Environment
NEXT_PUBLIC_ENV="development"

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="your-dataset-name"
NEXT_PUBLIC_SANITY_STUDIO_URL="/studio"

# Site Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Sanity API Tokens
SANITY_API_READ_TOKEN="your-sanity-api-read-token"
SANITY_API_WRITE_TOKEN="your-sanity-api-write-token"
```

## Step 5: Update Domain References (CRITICAL)

### A. Domain Fallback Values
Update the hardcoded domain fallbacks in these files:

1. **File:** `src/app/robots.txt/route.ts`
   - **Line 3:** Change `'https://0717records.com'` to `'https://your-domain.com'`

2. **File:** `src/app/sitemap.xml/route.ts`
   - **Line 15:** Change `'https://0717records.com'` to `'https://your-domain.com'`

3. **File:** `src/app/layout.tsx`
   - **Line 17:** Change `'https://0717records.com'` to `'https://your-domain.com'`

4. **File:** `src/app/(frontend)/layout.tsx`
   - **Line 53:** Change `'https://0717records.com'` to `'https://your-domain.com'`

### B. Email References
1. **File:** `scripts/pages/pages.json`
   - **Line 683:** Change `newsletter@0717records.com` to `newsletter@your-domain.com`

## Step 6: Update Organization Schema and Branding

### A. Main Organization Schema
**File:** `src/app/layout.tsx`
**Lines 20-26,** update the organization schema:

```javascript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Organization Name',                    // Change from '07:17 Records'
  url: baseUrl,
  description: 'Your organization description',     // Change from 'Thank You For Creating'
};
```

### B. Sanity Schema Default Values
Update these schema initial values:

1. **File:** `src/sanity/schemaTypes/siteSettingsType.ts`
   - **Line 19:** Change `initialValue: '07:17 Records'` to `initialValue: 'Your Organization Name'`

2. **File:** `src/sanity/schemaTypes/footerType.ts`
   - **Line 64:** Change `initialValue: '© 07:17 Records 2025'` to `initialValue: '© Your Organization Name 2025'`

### C. Structured Data Fallbacks
**File:** `src/lib/structuredData.ts`
- **Line 200:** Change `'07:17 Records'` to `'Your Organization Name'`
- **Line 215:** Change `'07:17 Records'` to `'Your Organization Name'`

### D. Event Organizer Reference
**File:** `src/components/Events/EventCard.tsx`
- **Line 86:** Change `'07:17 Records'` to `'Your Organization Name'`

## Step 7: Test the Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Verify the Sanity Studio works:**
   - Visit `http://localhost:3000/studio`
   - You should see an empty studio with all the schemas from the original project

3. **Check that the frontend loads:**
   - Visit `http://localhost:3000`
   - The site should load (may show empty content since Sanity is empty)

4. **Run type checking:**
   ```bash
   npm run typecheck
   ```

5. **Test the build process:**
   ```bash
   npm run build
   ```

6. **Test other routes:**
   - Visit `http://localhost:3000/robots.txt` - Should show your domain
   - Visit `http://localhost:3000/sitemap.xml` - Should generate correctly

## Step 8: Optional Global Brand Replacement

If you want to replace all remaining "07:17 Records" references at once (83 occurrences):

```bash
# Use your IDE's global find/replace or command line:
grep -r "07:17 Records" src/ --exclude-dir=node_modules
# Then replace with your organization name
```

> **Note:** Most of these are in UI components and can be updated later through the CMS or individually.

## Step 9: Production Environment Setup (When Ready)

For production deployment, update these environment variables in your hosting platform:

```env
NEXT_PUBLIC_ENV="production"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
# All other variables with production values
```

## Step 10: Cleanup Sample Data (Optional)

The `/scripts/` directory contains example data that you can update later:
- `scripts/collabs.json` - Example collaboration data
- `scripts/events.json` - Example events
- `scripts/pages.json` - Example page content
- `scripts/blogPosts.json` - Example blog posts

These contain placeholder content and `https://example.com` URLs that can be updated with real data.

## Verification Checklist

### Critical Setup (Must Work):
- [ ] Git remote points to new repository
- [ ] Dependencies updated to latest versions and project builds (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Environment variables updated with your Sanity project credentials
- [ ] Sanity Studio accessible at `/studio` with your project's empty schemas
- [ ] Frontend loads without errors at `http://localhost:3000`

### Domain Configuration:
- [ ] Domain fallbacks updated in robots.txt, sitemap, and layout files
- [ ] `robots.txt` route shows your domain
- [ ] `sitemap.xml` generates with your domain

### Branding Updates:
- [ ] Organization schema updated in layout.tsx
- [ ] Sanity schema default values updated
- [ ] Package.json name updated
- [ ] Email references updated

### Production Ready:
- [ ] Production environment variables configured
- [ ] Domain configured in hosting platform
- [ ] SSL certificate configured
- [ ] Build and deployment successful

## Next Steps

After completing this setup, you can work with the AI assistant to:
1. Remove schemas and components you don't need
2. Modify existing schemas for your use case
3. Update remaining branding and styling throughout the UI
4. Add new functionality specific to your project
5. Populate with your actual content through the Sanity Studio

The foundation will be solid and ready for customization while preserving all the performance optimizations, SEO implementation, and technical architecture.

## Troubleshooting

### Common Issues:
1. **Sanity Studio not loading:** Check your project ID and API tokens in .env.local
2. **Build errors after dependency updates:** Review breaking changes in updated packages
3. **Domain not showing in robots.txt:** Verify NEXT_PUBLIC_BASE_URL is set correctly
4. **TypeScript errors:** Run `npm run typegen` to regenerate Sanity types

### Getting Help:
- Check Sanity project settings at sanity.io/manage
- Verify environment variables are correctly set
- Ensure your Sanity project dataset exists and is accessible