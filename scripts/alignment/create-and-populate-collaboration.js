// Load environment variables from .env.local
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

console.log('Environment variables:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Has Write Token:', !!process.env.SANITY_API_WRITE_TOKEN);

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We want fresh data when writing
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this environment variable
});

// Helper function to generate rich text content
function createRichText(text) {
  return [
    {
      _type: 'block',
      _key: uuidv4().slice(0, 8),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: uuidv4().slice(0, 8),
          text: text,
          marks: []
        }
      ]
    }
  ];
}

// Helper function to create anchor ID from title
function createAnchorId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Main script function
async function createAndPopulateAlignmentTestCollaboration() {
  try {
    // Search for existing Alignment Test collaboration
    let alignmentTestCollab = await client.fetch(
      '*[_type == "collab" && name == "Alignment Test Collaboration Updated"][0]'
    );

    if (alignmentTestCollab) {
      console.log('Found existing Alignment Test collaboration:', alignmentTestCollab._id);
      console.log('Force deleting existing collaboration (ignoring header references)...');
      
      try {
        // Force delete the existing collaboration
        await client.delete(alignmentTestCollab._id);
        console.log('Existing collaboration deleted successfully');
      } catch (error) {
        console.log('Delete failed (likely due to references), but continuing...');
        console.log('Error:', error.message);
      }
    }

    console.log('Creating new Alignment Test collaboration...');
    
    // Create the collaboration
    alignmentTestCollab = await client.create({
      _type: 'collab',
      name: 'Alignment Test Collaboration Updated',
      slug: {
        _type: 'slug',
        current: 'alignment-test-collaboration-updated'
      },
      genre: 'Test Genre',
      location: 'Test Location',
      order: 999,
      shortDescription: 'This collaboration is used to test component alignment and layout functionality across all available components in collaboration context.',
      useShortDescriptionForCards: true,
      bio: 'This is a comprehensive test collaboration created to verify that all component alignment and layout features work correctly within the collaboration page structure.',
      mainContent: [] // Start with empty main content
    });
    
    console.log('Created Alignment Test collaboration:', alignmentTestCollab._id);

    // Find some existing events and blog posts for CTAs
    const events = await client.fetch('*[_type == "event"][0...2]');
    const blogPosts = await client.fetch('*[_type == "blogPost"][0...2]');

    console.log('Found events:', events.length);
    console.log('Found blog posts:', blogPosts.length);

    // Create the comprehensive content structure - only sections allowed in mainContent
    const collabMainContent = [];

    // First Collab Page Section with Text & Image components
    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Text and Image Section',
      anchorId: createAnchorId('Text and Image Section'),
      content: [
        {
          _type: 'textImage',
          _key: uuidv4(),
          layout: 'text-left',
          content: createRichText('This is a text and image block with text on the left in a collaboration context. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'),
          image: {
            alt: 'Collaboration Text Left Layout Example'
          }
        },
        {
          _type: 'textImage',
          _key: uuidv4(),
          layout: 'text-right',
          content: createRichText('This is a text and image block with text on the right in a collaboration context. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'),
          image: {
            alt: 'Collaboration Text Right Layout Example'
          }
        }
      ]
    });

    // Second Collab Page Section with Cards in Sub Sections
    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Card Examples Section',
      anchorId: createAnchorId('Card Examples Section'),
      content: [
        {
          _type: 'subSection',
          _key: uuidv4(),
          title: 'Feature Cards Subsection',
          anchorId: createAnchorId('Feature Cards Subsection'),
          alignment: 'inherit',
          content: [
            {
              _type: 'card',
              _key: uuidv4(),
              cardStyle: 'feature',
              title: 'Collab Feature Card with Link Button',
              bodyText: 'This is a feature card with a link button in a collaboration context. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
              buttonType: 'link',
              text: 'Learn More',
              variant: 'filled',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true
            },
            {
              _type: 'card',
              _key: uuidv4(),
              cardStyle: 'feature',
              title: 'Collab Feature Card with Email Button',
              bodyText: 'This is a feature card with an email button in a collaboration context. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
              buttonType: 'email'
            }
          ]
        },
        {
          _type: 'subSection',
          _key: uuidv4(),
          title: 'Statement Cards Subsection',
          anchorId: createAnchorId('Statement Cards Subsection'),
          alignment: 'inherit',
          content: [
            {
              _type: 'card',
              _key: uuidv4(),
              cardStyle: 'statement',
              title: 'Collab Statement Card with Link Button',
              bodyText: 'This is a statement card with a link button in a collaboration context. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
              buttonType: 'link',
              text: 'Get Started',
              variant: 'outline',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true
            },
            {
              _type: 'card',
              _key: uuidv4(),
              cardStyle: 'statement',
              title: 'Collab Statement Card with Email Button',
              bodyText: 'This is a statement card with an email button in a collaboration context. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
              buttonType: 'email'
            }
          ]
        }
      ]
    });

    // Third Collab Page Section with CTA components
    const ctaContent = [];
    
    ctaContent.push({
      _type: 'ctaCalloutLink',
      _key: uuidv4(),
      heading: 'Collab CTA Callout Link',
      text: 'This is a CTA callout link component for highlighting important actions in a collaboration context.',
      linkType: 'external',
      externalUrl: 'https://example.com',
      openInNewTab: true
    });

    if (events.length > 0) {
      ctaContent.push({
        _type: 'ctaEvent',
        _key: uuidv4(),
        event: {
          _type: 'reference',
          _ref: events[0]._id
        }
      });
    }

    if (blogPosts.length > 0) {
      ctaContent.push({
        _type: 'ctaBlogPost',
        _key: uuidv4(),
        blogPost: {
          _type: 'reference',
          _ref: blogPosts[0]._id
        }
      });
    }

    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'CTA Components Section',
      anchorId: createAnchorId('CTA Components Section'),
      content: ctaContent
    });

    // Fourth Collab Page Section with Card Grids
    const cardData = [
      {
        _type: 'card',
        _key: uuidv4(),
        cardStyle: 'feature',
        title: 'Collab Grid Card 1',
        bodyText: 'This is the first card in the collaboration grid layout.',
        buttonType: 'link',
        text: 'View More',
        variant: 'filled',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true
      },
      {
        _type: 'card',
        _key: uuidv4(),
        cardStyle: 'feature',
        title: 'Collab Grid Card 2',
        bodyText: 'This is the second card in the collaboration grid layout.',
        buttonType: 'email'
      },
      {
        _type: 'card',
        _key: uuidv4(),
        cardStyle: 'statement',
        title: 'Collab Grid Card 3',
        bodyText: 'This is the third card in the collaboration grid layout.',
        buttonType: 'link',
        text: 'Learn More',
        variant: 'outline',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true
      },
      {
        _type: 'card',
        _key: uuidv4(),
        cardStyle: 'statement',
        title: 'Collab Grid Card 4',
        bodyText: 'This is the fourth card in the collaboration grid layout.',
        buttonType: 'email'
      }
    ];

    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Card Grid Section',
      anchorId: createAnchorId('Card Grid Section'),
      content: [
        {
          _type: 'cardGrid',
          _key: uuidv4(),
          columns: '2',
          cards: [...cardData]
        },
        {
          _type: 'cardGrid',
          _key: uuidv4(),
          columns: '3',
          cards: [...cardData]
        },
        {
          _type: 'cardGrid',
          _key: uuidv4(),
          columns: '4',
          cards: [...cardData]
        }
      ]
    });

    // Fifth Collab Page Section with Images and Media
    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Images and Media Section',
      anchorId: createAnchorId('Images and Media Section'),
      content: [
        {
          _type: 'icon',
          _key: uuidv4(),
          name: 'star'
        },
        {
          _type: 'subSection',
          _key: uuidv4(),
          title: 'Image Blocks Subsection',
          anchorId: createAnchorId('Image Blocks Subsection'),
          alignment: 'inherit',
          content: [
            {
              _type: 'imageBlock',
              _key: uuidv4(),
              size: 'full-width',
              caption: 'Full width image block in collaboration'
            },
            {
              _type: 'imageBlock',
              _key: uuidv4(),
              size: 'small',
              caption: 'Small image block in collaboration'
            }
          ]
        },
        {
          _type: 'subSection',
          _key: uuidv4(),
          title: 'Image Galleries Subsection',
          anchorId: createAnchorId('Image Galleries Subsection'),
          alignment: 'inherit',
          content: [
            {
              _type: 'imageGallery',
              _key: uuidv4(),
              columns: '2',
              images: [
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 1'
                  },
                  caption: 'Sample collaboration gallery image 1'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 2'
                  },
                  caption: 'Sample collaboration gallery image 2'
                }
              ]
            },
            {
              _type: 'imageGallery',
              _key: uuidv4(),
              columns: '3',
              images: [
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 1'
                  },
                  caption: 'Sample collaboration gallery image 1'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 2'
                  },
                  caption: 'Sample collaboration gallery image 2'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 3'
                  },
                  caption: 'Sample collaboration gallery image 3'
                }
              ]
            },
            {
              _type: 'imageGallery',
              _key: uuidv4(),
              columns: '4',
              images: [
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 1'
                  },
                  caption: 'Sample collaboration gallery image 1'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 2'
                  },
                  caption: 'Sample collaboration gallery image 2'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 3'
                  },
                  caption: 'Sample collaboration gallery image 3'
                },
                {
                  _key: uuidv4(),
                  image: {
                    alt: 'Collab Gallery Image 4'
                  },
                  caption: 'Sample collaboration gallery image 4'
                }
              ]
            }
          ]
        }
      ]
    });

    // Sixth Collab Page Section with Media Widgets
    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Media Widgets Section',
      anchorId: createAnchorId('Media Widgets Section'),
      content: [
        {
          _type: 'youTubeVideo',
          _key: uuidv4(),
          url: 'https://youtu.be/7LkrD0Qo0p0?si=5wcM9HdS0JAV03G0'
        },
        {
          _type: 'bandcampWidget',
          _key: uuidv4(),
          embedCode: '<iframe style="border: 0; width: 400px; height: 406px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe>'
        },
        {
          _type: 'spotifyWidget',
          _key: uuidv4(),
          playerHeight: 'compact',
          url: 'https://open.spotify.com/track/1cgdlbLqEGwucpd0Rq3jAU?si=9788b131eab94848'
        },
        {
          _type: 'spotifyWidget',
          _key: uuidv4(),
          playerHeight: 'normal',
          url: 'https://open.spotify.com/playlist/64L9pRZcsJV8nW6s3qL26J?si=d52cf957eb1b4e2a'
        }
      ]
    });

    // Seventh Collab Page Section with comprehensive Alignment Testing
    // Note: Since collabPageSection has no text alignment, we only test alignment in sub-components
    const alignmentTestContent = [
      // Rich text, quote, and CTA components with different alignments
      {
        _type: 'richText',
        _key: uuidv4(),
        isCallout: false,
        content: createRichText('Collab rich text with inherit alignment. Lorem ipsum dolor sit amet consectetur.'),
        textAlign: 'inherit'
      },
      {
        _type: 'quote',
        _key: uuidv4(),
        text: 'Collab quote with inherit alignment. Lorem ipsum dolor sit amet consectetur.',
        attribution: 'Collab Test Author',
        textAlign: 'inherit'
      },
      {
        _type: 'ctaButton',
        _key: uuidv4(),
        text: 'Collab CTA Button Inherit',
        variant: 'filled',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true,
        alignment: 'inherit'
      },
      {
        _type: 'divider',
        _key: uuidv4()
      },
      // Left alignment components
      {
        _type: 'richText',
        _key: uuidv4(),
        isCallout: false,
        content: createRichText('Collab rich text with left alignment. Lorem ipsum dolor sit amet consectetur.'),
        textAlign: 'left'
      },
      {
        _type: 'quote',
        _key: uuidv4(),
        text: 'Collab quote with left alignment. Lorem ipsum dolor sit amet consectetur.',
        attribution: 'Collab Test Author',
        textAlign: 'left'
      },
      {
        _type: 'ctaButton',
        _key: uuidv4(),
        text: 'Collab CTA Button Left',
        variant: 'filled',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true,
        alignment: 'left'
      },
      {
        _type: 'divider',
        _key: uuidv4()
      },
      // Center alignment components
      {
        _type: 'richText',
        _key: uuidv4(),
        isCallout: false,
        content: createRichText('Collab rich text with center alignment. Lorem ipsum dolor sit amet consectetur.'),
        textAlign: 'center'
      },
      {
        _type: 'quote',
        _key: uuidv4(),
        text: 'Collab quote with center alignment. Lorem ipsum dolor sit amet consectetur.',
        attribution: 'Collab Test Author',
        textAlign: 'center'
      },
      {
        _type: 'ctaButton',
        _key: uuidv4(),
        text: 'Collab CTA Button Center',
        variant: 'filled',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true,
        alignment: 'center'
      },
      {
        _type: 'divider',
        _key: uuidv4()
      },
      // Right alignment components
      {
        _type: 'richText',
        _key: uuidv4(),
        isCallout: false,
        content: createRichText('Collab rich text with right alignment. Lorem ipsum dolor sit amet consectetur.'),
        textAlign: 'right'
      },
      {
        _type: 'quote',
        _key: uuidv4(),
        text: 'Collab quote with right alignment. Lorem ipsum dolor sit amet consectetur.',
        attribution: 'Collab Test Author',
        textAlign: 'right'
      },
      {
        _type: 'ctaButton',
        _key: uuidv4(),
        text: 'Collab CTA Button Right',
        variant: 'filled',
        linkType: 'external',
        externalUrl: 'https://example.com',
        openInNewTab: true,
        alignment: 'right'
      },
      {
        _type: 'divider',
        _key: uuidv4()
      },
      {
        _type: 'ctaEmailButton',
        _key: uuidv4()
      }
    ];

    // Add Sub Section with nested alignment testing
    alignmentTestContent.push({
      _type: 'subSection',
      _key: uuidv4(),
      title: 'Collab Sub Section Alignment Tests',
      anchorId: createAnchorId('Collab Sub Section Alignment Tests'),
      textAlign: 'inherit',
      content: [
        // Inherit alignment in subsection
        {
          _type: 'richText',
          _key: uuidv4(),
          isCallout: false,
          content: createRichText('Collab sub section rich text with inherit alignment.'),
          textAlign: 'inherit'
        },
        {
          _type: 'quote',
          _key: uuidv4(),
          text: 'Collab sub section quote with inherit alignment.',
          attribution: 'Collab Sub Author',
          textAlign: 'inherit'
        },
        {
          _type: 'ctaButton',
          _key: uuidv4(),
          text: 'Collab Sub CTA Inherit',
          variant: 'outline',
          linkType: 'external',
          externalUrl: 'https://example.com',
          openInNewTab: true,
          alignment: 'inherit'
        },
        {
          _type: 'divider',
          _key: uuidv4()
        },
        // Left alignment in subsection
        {
          _type: 'richText',
          _key: uuidv4(),
          isCallout: false,
          content: createRichText('Collab sub section rich text with left alignment.'),
          textAlign: 'left'
        },
        {
          _type: 'quote',
          _key: uuidv4(),
          text: 'Collab sub section quote with left alignment.',
          attribution: 'Collab Sub Author',
          textAlign: 'left'
        },
        {
          _type: 'ctaButton',
          _key: uuidv4(),
          text: 'Collab Sub CTA Left',
          variant: 'outline',
          linkType: 'external',
          externalUrl: 'https://example.com',
          openInNewTab: true,
          alignment: 'left'
        },
        {
          _type: 'divider',
          _key: uuidv4()
        },
        // Center alignment in subsection
        {
          _type: 'richText',
          _key: uuidv4(),
          isCallout: false,
          content: createRichText('Collab sub section rich text with center alignment.'),
          textAlign: 'center'
        },
        {
          _type: 'quote',
          _key: uuidv4(),
          text: 'Collab sub section quote with center alignment.',
          attribution: 'Collab Sub Author',
          textAlign: 'center'
        },
        {
          _type: 'ctaButton',
          _key: uuidv4(),
          text: 'Collab Sub CTA Center',
          variant: 'outline',
          linkType: 'external',
          externalUrl: 'https://example.com',
          openInNewTab: true,
          alignment: 'center'
        },
        {
          _type: 'divider',
          _key: uuidv4()
        },
        // Right alignment in subsection
        {
          _type: 'richText',
          _key: uuidv4(),
          isCallout: false,
          content: createRichText('Collab sub section rich text with right alignment.'),
          textAlign: 'right'
        },
        {
          _type: 'quote',
          _key: uuidv4(),
          text: 'Collab sub section quote with right alignment.',
          attribution: 'Collab Sub Author',
          textAlign: 'right'
        },
        {
          _type: 'ctaButton',
          _key: uuidv4(),
          text: 'Collab Sub CTA Right',
          variant: 'outline',
          linkType: 'external',
          externalUrl: 'https://example.com',
          openInNewTab: true,
          alignment: 'right'
        },

        // Sub Sub Sections for deeper nesting
        {
          _type: 'subSubSection',
          _key: uuidv4(),
          title: 'Collab Sub Sub Section Inherit',
          anchorId: createAnchorId('Collab Sub Sub Section Inherit'),
          alignment: 'inherit',
          content: [
            {
              _type: 'richText',
              _key: uuidv4(),
              isCallout: false,
              content: createRichText('Collab sub sub section rich text with inherit alignment.'),
              textAlign: 'inherit'
            },
            {
              _type: 'quote',
              _key: uuidv4(),
              text: 'Collab sub sub section quote with inherit alignment.',
              attribution: 'Collab Sub Sub Author',
              textAlign: 'inherit'
            },
            {
              _type: 'ctaButton',
              _key: uuidv4(),
              text: 'Collab Sub Sub Inherit',
              variant: 'filled',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true,
              alignment: 'inherit'
            }
          ]
        },
        {
          _type: 'subSubSection',
          _key: uuidv4(),
          title: 'Collab Sub Sub Section Left',
          anchorId: createAnchorId('Collab Sub Sub Section Left'),
          alignment: 'inherit',
          content: [
            {
              _type: 'richText',
              _key: uuidv4(),
              isCallout: false,
              content: createRichText('Collab sub sub section rich text with left alignment.'),
              textAlign: 'left'
            },
            {
              _type: 'quote',
              _key: uuidv4(),
              text: 'Collab sub sub section quote with left alignment.',
              attribution: 'Collab Sub Sub Author',
              textAlign: 'left'
            },
            {
              _type: 'ctaButton',
              _key: uuidv4(),
              text: 'Collab Sub Sub Left',
              variant: 'filled',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true,
              alignment: 'left'
            }
          ]
        },
        {
          _type: 'subSubSection',
          _key: uuidv4(),
          title: 'Collab Sub Sub Section Center',
          anchorId: createAnchorId('Collab Sub Sub Section Center'),
          alignment: 'inherit',
          content: [
            {
              _type: 'richText',
              _key: uuidv4(),
              isCallout: false,
              content: createRichText('Collab sub sub section rich text with center alignment.'),
              textAlign: 'center'
            },
            {
              _type: 'quote',
              _key: uuidv4(),
              text: 'Collab sub sub section quote with center alignment.',
              attribution: 'Collab Sub Sub Author',
              textAlign: 'center'
            },
            {
              _type: 'ctaButton',
              _key: uuidv4(),
              text: 'Collab Sub Sub Center',
              variant: 'filled',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true,
              alignment: 'center'
            }
          ]
        },
        {
          _type: 'subSubSection',
          _key: uuidv4(),
          title: 'Collab Sub Sub Section Right',
          anchorId: createAnchorId('Collab Sub Sub Section Right'),
          alignment: 'inherit',
          content: [
            {
              _type: 'richText',
              _key: uuidv4(),
              isCallout: false,
              content: createRichText('Collab sub sub section rich text with right alignment.'),
              textAlign: 'right'
            },
            {
              _type: 'quote',
              _key: uuidv4(),
              text: 'Collab sub sub section quote with right alignment.',
              attribution: 'Collab Sub Sub Author',
              textAlign: 'right'
            },
            {
              _type: 'ctaButton',
              _key: uuidv4(),
              text: 'Collab Sub Sub Right',
              variant: 'filled',
              linkType: 'external',
              externalUrl: 'https://example.com',
              openInNewTab: true,
              alignment: 'right'
            }
          ]
        }
      ]
    });

    collabMainContent.push({
      _type: 'collabPageSection',
      _key: uuidv4(),
      title: 'Collab Alignment Testing Section',
      anchorId: createAnchorId('Collab Alignment Testing Section'),
      content: alignmentTestContent
    });

    // Update the collaboration with the new main content
    const result = await client.patch(alignmentTestCollab._id).set({
      mainContent: collabMainContent
    }).commit();

    console.log('Successfully updated Alignment Test collaboration!');
    console.log(`Added ${collabMainContent.length} main content sections`);
    console.log('Collaboration ID:', result._id);
    console.log('Updated at:', result._updatedAt);

    // Calculate total components
    let totalComponents = collabMainContent.length;
    
    function countNestedComponents(content) {
      let count = 0;
      if (Array.isArray(content)) {
        for (const item of content) {
          count++;
          if (item.content) {
            count += countNestedComponents(item.content);
          }
          if (item.cards && Array.isArray(item.cards)) {
            count += item.cards.length;
          }
        }
      }
      return count;
    }

    totalComponents += countNestedComponents(collabMainContent);
    console.log(`Total components added (including nested): ${totalComponents}`);

  } catch (error) {
    console.error('Error creating/populating alignment test collaboration:', error);
    process.exit(1);
  }
}

// Run the script
createAndPopulateAlignmentTestCollaboration();