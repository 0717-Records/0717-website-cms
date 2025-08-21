/**
 * Script to populate Sanity CMS with collaborations from collabs.json
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/collabs/populate-collabs.js
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
 * Transform collab data from JSON format to Sanity document format
 * Note: This strips out image references since those need to be uploaded separately
 */
function transformCollabForSanity(collab) {
  const sanitized = {
    _type: 'collab',
    name: collab.name,
    slug: collab.slug,
    genre: collab.genre,
    location: collab.location,
    shortDescription: collab.shortDescription,
    useShortDescriptionForCards: collab.useShortDescriptionForCards,
    cardDescription: collab.cardDescription,
    bio: collab.bio,
  };

  // Handle social links
  if (collab.links) {
    sanitized.links = {
      _type: 'socialLinks',
      facebook: collab.links.facebook,
      instagram: collab.links.instagram,
      youtube: collab.links.youtube,
      twitter: collab.links.twitter,
      soundcloud: collab.links.soundcloud,
      bandcamp: collab.links.bandcamp,
      spotify: collab.links.spotify,
      itunes: collab.links.itunes,
      officialWebsite: collab.links.officialWebsite,
      genericLinks: collab.links.genericLinks || [],
    };
  }

  // Handle main content (strip out images and complex blocks for now)
  if (collab.mainContent && Array.isArray(collab.mainContent)) {
    sanitized.mainContent = collab.mainContent.map((section) => {
      const sanitizedSection = {
        _key: section._key,
        _type: section._type,
        title: section.title,
        content: [],
      };

      // Process content blocks, keeping only simple ones
      if (section.content && Array.isArray(section.content)) {
        section.content.forEach((block) => {
          if (block._type === 'richText') {
            // Keep rich text blocks
            sanitizedSection.content.push(block);
          } else if (block._type === 'ctaButton') {
            // Keep CTA buttons but clean up references
            const cleanButton = { ...block };
            if (cleanButton.internalLink) {
              // Convert reference to just the ref string for now
              cleanButton.internalLink = cleanButton.internalLink._ref;
            }
            sanitizedSection.content.push(cleanButton);
          } else if (block._type === 'quote') {
            // Keep quotes
            sanitizedSection.content.push(block);
          }
          // Skip image blocks, galleries, and widgets for now
        });
      }

      return sanitizedSection;
    });
  }

  // Handle side content (strip out complex CTAs for now)
  if (collab.sideContent && Array.isArray(collab.sideContent)) {
    sanitized.sideContent = collab.sideContent.map((block) => {
      const sanitizedBlock = {
        _key: block._key,
        _type: block._type,
        style: block.style,
        title: block.title,
        richText: block.richText,
        ctaType: block.ctaType,
      };

      // Only include simple CTA types
      if (block.ctaType === 'email') {
        sanitizedBlock.ctaEmailInfo = {
          info: 'This will render the standard company email button component. No additional configuration needed.',
        };
      } else if (block.ctaType === 'button' && block.ctaButton) {
        // Simplify button CTA
        sanitizedBlock.ctaButton = {
          _type: 'ctaButton',
          text: block.ctaButton.text,
          variant: block.ctaButton.variant,
          alignment: block.ctaButton.alignment,
          linkType: block.ctaButton.linkType,
          externalUrl: block.ctaButton.externalUrl,
          openInNewTab: block.ctaButton.openInNewTab,
        };

        // Handle internal links
        if (block.ctaButton.internalLink) {
          sanitizedBlock.ctaButton.internalLink = block.ctaButton.internalLink._ref;
        }
      }

      return sanitizedBlock;
    });
  }

  return sanitized;
}

async function populateCollabs() {
  try {
    console.log('🚀 Starting collaboration population...');

    // Read the collabs.json file
    const collabsJsonPath = path.join(__dirname, 'collabs.json');
    const collabsData = JSON.parse(fs.readFileSync(collabsJsonPath, 'utf8'));

    console.log(`📖 Found ${collabsData.length} collaborations in JSON file`);

    // Check if any collabs already exist to avoid duplicates
    const existingCollabs = await client.fetch('*[_type == "collab"]');
    console.log(`📋 Found ${existingCollabs.length} existing collaborations in CMS`);

    if (existingCollabs.length > 0) {
      console.log(
        '⚠️  Warning: There are already collaborations in the CMS. This script will add more.'
      );
      console.log('   If you want to start fresh, delete all collaborations in the CMS first.');
    }

    // Transform and create collaborations
    const results = [];
    for (let i = 0; i < collabsData.length; i++) {
      const collab = collabsData[i];

      console.log(`📝 Creating collaboration ${i + 1}/${collabsData.length}: "${collab.name}"`);

      // Transform the JSON collab to Sanity document format
      const sanityCollab = transformCollabForSanity(collab);

      try {
        const result = await client.create(sanityCollab);
        results.push(result);
        console.log(`✅ Created: "${collab.name}" (ID: ${result._id})`);
      } catch (error) {
        console.error(`❌ Failed to create "${collab.name}":`, error.message);
        console.error('Error details:', error);
      }
    }

    console.log('\n🎉 Collaboration population completed!');
    console.log(`✅ Successfully created ${results.length} collaborations`);
    console.log(`❌ Failed to create ${collabsData.length - results.length} collaborations`);

    if (results.length > 0) {
      console.log('\n📋 Created collaboration IDs:');
      results.forEach((result) => {
        console.log(`   - ${result.name}: ${result._id}`);
      });
    }

    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Collaborations section');
    console.log('3. Add images to the collaborations (hero, preview, content images)');
    console.log('4. Add any missing content blocks (image galleries, Spotify/Bandcamp widgets)');
    console.log('5. Fix any internal link references that need to point to actual pages');
    console.log('6. Review and publish the collaborations');

    console.log('\n💡 Note: This script creates basic content structure but excludes:');
    console.log('   - Image assets (need manual upload)');
    console.log('   - Image galleries');
    console.log('   - Spotify/Bandcamp widgets');
    console.log('   - Some complex content blocks');
    console.log('   These can be added manually in the Sanity Studio.');
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
populateCollabs();
