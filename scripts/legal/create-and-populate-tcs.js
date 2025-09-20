/**
 * Script to create and populate Terms & Conditions document in Sanity CMS
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/legal/create-and-populate-tcs.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// Load environment variables from .env.local
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We want fresh data when writing
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this environment variable
});

// Terms & Conditions content structure
const termsAndConditionsData = {
  _type: 'termsAndConditions',
  _id: 'termsAndConditions',
  hide: false,
  title: 'Terms & Conditions',
  content: [
    {
      _type: 'pageSection',
      _key: 'intro-section',
      hideSection: false,
      title: 'Introduction',
      anchorId: 'introduction',
      content: [
        {
          _type: 'richText',
          _key: 'intro-text',
          content: [
            {
              _type: 'block',
              _key: 'intro-block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Welcome to 07:17 Records. These Terms & Conditions govern your use of our website and services. By accessing or using our website, collaborating with our artists, or engaging with our content, you agree to be bound by these terms.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'definitions-section',
      hideSection: false,
      title: 'Definitions',
      anchorId: 'definitions',
      content: [
        {
          _type: 'richText',
          _key: 'definitions-text',
          content: [
            {
              _type: 'block',
              _key: 'definitions-list',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'In these Terms & Conditions:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-company',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Company", "we", "us", or "our" refers to 07:17 Records',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-website',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Website" refers to 0717records.com and all associated pages',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-services',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"Services" refers to our record label activities, artist collaborations, event organization, and content distribution',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'def-user',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: '"User", "you", or "your" refers to any individual or entity accessing our website or services',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'website-use-section',
      hideSection: false,
      title: 'Website Use',
      anchorId: 'website-use',
      content: [
        {
          _type: 'subSection',
          _key: 'permitted-use',
          hideSection: false,
          title: 'Permitted Use',
          anchorId: 'permitted-use',
          content: [
            {
              _type: 'richText',
              _key: 'permitted-use-text',
              content: [
                {
                  _type: 'block',
                  _key: 'permitted-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'You may use our website for:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Browsing and discovering music and artists',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Reading blog posts and articles',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Finding information about events and collaborations',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'permitted-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Contacting us for legitimate business purposes',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'prohibited-use',
          hideSection: false,
          title: 'Prohibited Use',
          anchorId: 'prohibited-use',
          content: [
            {
              _type: 'richText',
              _key: 'prohibited-use-text',
              content: [
                {
                  _type: 'block',
                  _key: 'prohibited-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'You must not:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Use our website for any unlawful purpose',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Attempt to gain unauthorized access to our systems',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Distribute malware or harmful code',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Infringe on intellectual property rights',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'prohibited-5',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Spam or send unsolicited communications',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'intellectual-property-section',
      hideSection: false,
      title: 'Intellectual Property',
      anchorId: 'intellectual-property',
      content: [
        {
          _type: 'richText',
          _key: 'ip-text',
          content: [
            {
              _type: 'block',
              _key: 'ip-ownership',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'All content on this website, including but not limited to text, graphics, logos, music, and software, is owned by 07:17 Records or our content suppliers and is protected by intellectual property laws.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'ip-music',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Music and artistic content featured on our website belongs to the respective artists and is used with permission. Unauthorized reproduction or distribution is prohibited.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'services-section',
      hideSection: false,
      title: 'Our Services',
      anchorId: 'our-services',
      content: [
        {
          _type: 'subSection',
          _key: 'record-label-services',
          hideSection: false,
          title: 'Record Label Services',
          anchorId: 'record-label-services',
          content: [
            {
              _type: 'richText',
              _key: 'record-label-text',
              content: [
                {
                  _type: 'block',
                  _key: 'record-label-desc',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'We provide record label services including artist development, music distribution, and promotional support. All agreements with artists are subject to separate contracts.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _type: 'subSection',
          _key: 'events-services',
          hideSection: false,
          title: 'Events and Collaborations',
          anchorId: 'events-services',
          content: [
            {
              _type: 'richText',
              _key: 'events-text',
              content: [
                {
                  _type: 'block',
                  _key: 'events-desc',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'We organize and promote music events and artistic collaborations. Event terms and conditions may vary and will be communicated separately for each event.',
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'third-party-section',
      hideSection: false,
      title: 'Third-Party Services',
      anchorId: 'third-party-services',
      content: [
        {
          _type: 'richText',
          _key: 'third-party-text',
          content: [
            {
              _type: 'block',
              _key: 'third-party-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Our website integrates with various third-party services:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-spotify',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Spotify widgets for music streaming',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-bandcamp',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Bandcamp widgets for music purchases',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-youtube',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'YouTube videos for content sharing',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-social',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Social media platforms for connectivity',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'third-party-disclaimer',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'These third-party services have their own terms of service and privacy policies. We are not responsible for their practices or content.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'disclaimer-section',
      hideSection: false,
      title: 'Disclaimers and Limitation of Liability',
      anchorId: 'disclaimers',
      content: [
        {
          _type: 'richText',
          _key: 'disclaimer-text',
          content: [
            {
              _type: 'block',
              _key: 'disclaimer-warranty',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Our website and services are provided "as is" without any warranties, express or implied. We do not guarantee that our website will be uninterrupted, error-free, or free from harmful components.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'disclaimer-liability',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'To the fullest extent permitted by law, 07:17 Records shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.',
                  marks: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'contact-section',
      hideSection: false,
      title: 'Contact Information',
      anchorId: 'contact',
      content: [
        {
          _type: 'richText',
          _key: 'contact-text',
          content: [
            {
              _type: 'block',
              _key: 'contact-info',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'If you have any questions about these Terms & Conditions, please contact us at:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'contact-email',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Email: 0717records@gmail.com',
                  marks: ['strong']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      _type: 'pageSection',
      _key: 'changes-section',
      hideSection: false,
      title: 'Changes to Terms',
      anchorId: 'changes',
      content: [
        {
          _type: 'richText',
          _key: 'changes-text',
          content: [
            {
              _type: 'block',
              _key: 'changes-notice',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this website. Your continued use of our website constitutes acceptance of any changes.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'changes-effective',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Last updated: ',
                  marks: []
                },
                {
                  _type: 'span',
                  text: new Date().toLocaleDateString('en-NZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  marks: ['strong']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

async function createAndPopulateTermsAndConditions() {
  try {
    console.log('=€ Creating Terms & Conditions document...');

    // Check if document already exists
    const existingDoc = await client.fetch('*[_id == "termsAndConditions"][0]');

    if (existingDoc) {
      console.log('   Terms & Conditions document already exists.');
      console.log('   Updating existing document...');

      const result = await client.createOrReplace(termsAndConditionsData);
      console.log(' Updated Terms & Conditions document');
      console.log(`   Document ID: ${result._id}`);
    } else {
      const result = await client.create(termsAndConditionsData);
      console.log(' Created Terms & Conditions document');
      console.log(`   Document ID: ${result._id}`);
    }

    console.log('\n=Ý Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Site Management ’ Legal ’ Terms & Conditions');
    console.log('3. Review the content and make any necessary adjustments');
    console.log('4. Publish the document when ready');
    console.log('5. The page will be available at /terms-and-conditions');
  } catch (error) {
    console.error('=¥ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
createAndPopulateTermsAndConditions();