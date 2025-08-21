# Event Population Script

This script populates your Sanity CMS with events from the `events.json` file.

## Prerequisites

1. **Sanity API Token**: You need a Sanity API token with write permissions.
   - Go to https://sanity.io/manage
   - Select your project
   - Go to Settings → API → Tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. **Environment Variables**: Set up your environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
   SANITY_API_TOKEN=your_write_token_here
   ```

## Running the Script

1. Make sure you're in the project root directory
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Run the population script:
   ```bash
   node scripts/populate-events.js
   ```

## What the Script Does

- ✅ Reads all events from `src/components/Events/events.json`
- ✅ Transforms them to match the Sanity event schema
- ✅ Creates new event documents in your CMS
- ❌ **Omits image fields** (you'll need to upload/select images manually)
- ✅ Preserves all other data including dates, descriptions, links, etc.
- ✅ Provides detailed logging and error handling
- ✅ Checks for existing events to warn about duplicates

## After Running

1. Go to your Sanity Studio
2. Navigate to the Events section
3. Add images to events that need them
4. Review all the imported data
5. Publish the events

## Schema Alignment

The JSON schema perfectly matches the Sanity eventType schema:
- All field names are identical
- All data types are compatible
- All validation rules are respected

## Error Handling

The script will:
- Continue processing even if individual events fail
- Show detailed error messages for failed events
- Provide a summary of successes and failures
- Not crash if there are network issues or validation errors