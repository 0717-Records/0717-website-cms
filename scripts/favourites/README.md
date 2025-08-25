# Favourites Population Script

This directory contains scripts and data for populating the Sanity CMS with favourite bands and artists.

## Files

- `favourites.json` - JSON data containing favourite bands/artists information
- `populate-favourites.js` - Script to populate Sanity CMS with the favourites data

## Usage

### Prerequisites

1. Make sure you have a `.env.local` file in the project root with:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   SANITY_API_WRITE_TOKEN=your_write_token
   ```

2. Ensure you have the necessary write permissions in Sanity

### Running the Script

From the project root directory, run:

```bash
node scripts/favourites/populate-favourites.js
```

### What the Script Does

1. Reads `favourites.json` containing favourite bands/artists data
2. Transforms the data to match the Sanity `favourites` schema
3. Creates new documents in Sanity CMS
4. Reports success/failure for each entry

### Data Structure

Each favourite in `favourites.json` contains:
- `name` - The name of the band/artist (required)
- `genre` - Musical genre (optional)
- `order` - Display order number (required)
- `description` - Brief description (optional)
- `link` - External link (optional)

### Post-Population Steps

After running the script:
1. Go to Sanity Studio
2. Navigate to Collaborations → Favourites
3. Add profile images if desired
4. Review and adjust content
5. Publish the documents

### Notes

- Profile images are not included in the JSON and must be added manually in Sanity Studio
- The script will warn if favourites already exist but will still create new ones
- Display order controls the sorting in both the CMS interface and frontend (when implemented)