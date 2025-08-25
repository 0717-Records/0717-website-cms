/**
 * Script to populate Sanity CMS with favourites from favourites.json
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/favourites/populate-favourites.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// Load environment variables from .env.local
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@sanity/client');
const fs = require('fs');

// Debug environment variables
console.log('🔍 Environment check:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓ Found' : '✗ Missing');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET ? '✓ Found' : '✗ Missing');
console.log('Write Token:', process.env.SANITY_API_WRITE_TOKEN ? '✓ Found' : '✗ Missing');

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We want fresh data when writing
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this environment variable
});

/**
 * Transform favourite data from JSON format to Sanity document format
 */
function transformFavouriteForSanity(favourite) {
  const sanitized = {
    _type: 'favourites',
    name: favourite.name,
    genre: favourite.genre,
    order: favourite.order,
    description: favourite.description,
    link: favourite.link,
  };

  return sanitized;
}

async function populateFavourites() {
  try {
    console.log('🚀 Starting favourites population...');

    // Read the favourites.json file
    const favouritesJsonPath = path.join(__dirname, 'favourites.json');
    const favouritesData = JSON.parse(fs.readFileSync(favouritesJsonPath, 'utf8'));

    console.log(`📖 Found ${favouritesData.length} favourites in JSON file`);

    // Check if any favourites already exist to avoid duplicates
    const existingFavourites = await client.fetch('*[_type == "favourites"]');
    console.log(`📋 Found ${existingFavourites.length} existing favourites in CMS`);

    if (existingFavourites.length > 0) {
      console.log(
        '⚠️  Warning: There are already favourites in the CMS. This script will add more.'
      );
      console.log('   If you want to start fresh, delete all favourites in the CMS first.');
    }

    // Transform and create favourites
    const results = [];
    for (let i = 0; i < favouritesData.length; i++) {
      const favourite = favouritesData[i];

      console.log(`📝 Creating favourite ${i + 1}/${favouritesData.length}: "${favourite.name}"`);

      // Transform the JSON favourite to Sanity document format
      const sanityFavourite = transformFavouriteForSanity(favourite);

      try {
        const result = await client.create(sanityFavourite);
        results.push(result);
        console.log(`✅ Created: "${favourite.name}" (ID: ${result._id})`);
      } catch (error) {
        console.error(`❌ Failed to create "${favourite.name}":`, error.message);
        console.error('Error details:', error);
      }
    }

    console.log('\n🎉 Favourites population completed!');
    console.log(`✅ Successfully created ${results.length} favourites`);
    console.log(`❌ Failed to create ${favouritesData.length - results.length} favourites`);

    if (results.length > 0) {
      console.log('\n📋 Created favourite IDs:');
      results.forEach((result) => {
        console.log(`   - ${result.name}: ${result._id}`);
      });
    }

    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Favourites section (under Collaborations)');
    console.log('3. Add profile images to the favourites if desired');
    console.log('4. Review and adjust display order if needed');
    console.log('5. Review and publish the favourites');

    console.log('\n💡 Note: This script creates basic favourite entries with:');
    console.log('   - Name, genre, description, link, and display order');
    console.log('   - Profile images are left empty and can be added manually in Sanity Studio');
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
populateFavourites();