/**
 * Script to populate Sanity CMS with events from events.json
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/populate-events.js
 */

// Load environment variables from .env.local
import 'dotenv/config';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We want fresh data when writing
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this environment variable
});

async function populateEvents() {
  try {
    console.log('🚀 Starting event population...');

    // Read the events.json file
    const eventsJsonPath = path.join(__dirname, '..', 'src', 'components', 'Events', 'events.json');
    const eventsData = JSON.parse(fs.readFileSync(eventsJsonPath, 'utf8'));

    console.log(`📖 Found ${eventsData.length} events in JSON file`);

    // Check if any events already exist to avoid duplicates
    const existingEvents = await client.fetch('*[_type == "event"]');
    console.log(`📋 Found ${existingEvents.length} existing events in CMS`);

    if (existingEvents.length > 0) {
      console.log(
        '⚠️  Warning: There are already events in the CMS. This script will add more events.'
      );
      console.log('   If you want to start fresh, delete all events in the CMS first.');
    }

    // Transform and create events
    const results = [];
    for (let i = 0; i < eventsData.length; i++) {
      const event = eventsData[i];

      console.log(`📝 Creating event ${i + 1}/${eventsData.length}: "${event.title}"`);

      // Transform the JSON event to Sanity document format
      const sanityEvent = {
        _type: 'event',
        title: event.title,
        shortDescription: event.shortDescription,
        venue: event.venue,
        location: event.location,
        // Omit image as requested - will need manual upload/selection
        tags: event.tags,
        link: event.link,
        startDate: event.startDate,
        endDate: event.endDate,
        timeDescription: event.timeDescription,
        pastEventText: event.pastEventText,
        pastEventLinkBehavior: event.pastEventLinkBehavior,
        pastEventLink: event.pastEventLink,
      };

      try {
        const result = await client.create(sanityEvent);
        results.push(result);
        console.log(`✅ Created: "${event.title}" (ID: ${result._id})`);
      } catch (error) {
        console.error(`❌ Failed to create "${event.title}":`, error.message);
      }
    }

    console.log('\n🎉 Event population completed!');
    console.log(`✅ Successfully created ${results.length} events`);
    console.log(`❌ Failed to create ${eventsData.length - results.length} events`);

    if (results.length > 0) {
      console.log('\n📋 Created event IDs:');
      results.forEach((result) => {
        console.log(`   - ${result.title}: ${result._id}`);
      });
    }

    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Events section');
    console.log('3. Add images to the events that need them');
    console.log('4. Review and publish the events');
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
populateEvents();
