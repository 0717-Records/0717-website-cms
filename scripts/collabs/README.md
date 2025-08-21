# Collaborations Population Script

This directory contains scripts and data for populating Sanity CMS with collaboration data.

## Files

- `collabs.json` - Sample collaboration data for C.R. Avery and Star Control
- `populate-collabs.js` - Script to import collaboration data into Sanity CMS
- `README.md` - This documentation file

## Running the Population Script

### Prerequisites

1. Make sure you have the required environment variables set in your `.env.local` file:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=your-dataset
   SANITY_API_WRITE_TOKEN=your-write-token
   ```

2. Ensure you have write permissions to your Sanity dataset (the API token needs write access)

### Running the Script

From the project root directory, run:

```bash
node scripts/collabs/populate-collabs.js
```

### What the Script Does

The script will:

1. ✅ Read collaboration data from `collabs.json`
2. ✅ Transform the data to match Sanity's document structure
3. ✅ Create collaboration documents in your Sanity CMS
4. ✅ Preserve basic content like text, social links, and simple CTAs
5. ✅ Handle rich text content and quotes

### What the Script Excludes

For simplicity and to avoid asset management issues, the script **does not** create:

- ❌ Image assets (hero images, preview images, gallery images)
- ❌ Image galleries
- ❌ Spotify/Bandcamp widgets
- ❌ Complex media blocks

### Post-Script Manual Steps

After running the script, you'll need to manually add in Sanity Studio:

1. **Upload Images**: Add hero images, preview images, and any content images
2. **Image Galleries**: Add gallery blocks with uploaded images
3. **Media Widgets**: Add Spotify and Bandcamp embed blocks
4. **Internal Links**: Fix any internal page references in CTAs
5. **Review Content**: Check all content renders correctly

## Data Structure

The `collabs.json` file contains an array of collaboration objects matching the Sanity `collab` schema:

```json
[
  {
    "_id": "unique-id",
    "_type": "collab",
    "name": "Collaboration Name",
    "slug": { "current": "url-slug", "_type": "slug" },
    "genre": "Music Genre",
    "location": "Location",
    "shortDescription": "Brief description",
    "useShortDescriptionForCards": true,
    "cardDescription": "Optional card description",
    "bio": "Longer biography",
    "mainContent": [...], // Page sections with content blocks
    "links": {...}, // Social media links
    "sideContent": [...], // Sidebar content blocks
    "seoTitle": "SEO title",
    "seoDescription": "SEO description"
  }
]
```

## Troubleshooting

### Common Issues

1. **Permission Errors**: Make sure your `SANITY_API_WRITE_TOKEN` has write permissions
2. **Schema Mismatches**: Ensure your Sanity schema is up to date with the latest collaboration types
3. **Reference Errors**: Internal links may need to be updated to point to actual documents

### Checking Results

After running the script:

1. Go to your Sanity Studio
2. Navigate to "🤝 Collaborations"
3. You should see the imported collaborations
4. Click on each to review and complete the content

## Extending the Script

To add more collaborations:

1. Add new collaboration objects to `collabs.json`
2. Follow the existing structure and field naming
3. Re-run the script

The script will detect existing collaborations and add new ones without duplicating existing content.