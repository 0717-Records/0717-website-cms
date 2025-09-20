/**
 * Script to create and populate Privacy Policy document in Sanity CMS
 *
 * To run this script:
 * 1. Make sure you're in the project root directory
 * 2. Run: node scripts/legal/create-and-populate-pp.js
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

// Privacy Policy content structure
const privacyPolicyData = {
  _type: 'privacyPolicy',
  _id: 'privacyPolicy',
  hide: false,
  title: 'Privacy Policy',
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
                  text: 'At 07:17 Records, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or engage with our services.',
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
      _key: 'info-collection-section',
      hideSection: false,
      title: 'Information We Collect',
      anchorId: 'information-we-collect',
      content: [
        {
          _type: 'subSection',
          _key: 'personal-info',
          hideSection: false,
          title: 'Personal Information',
          anchorId: 'personal-information',
          content: [
            {
              _type: 'richText',
              _key: 'personal-info-text',
              content: [
                {
                  _type: 'block',
                  _key: 'personal-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'We may collect the following personal information:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'personal-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Name and contact information when you reach out to us',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'personal-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Email address for correspondence and event notifications',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'personal-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Professional information for artist collaborations',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'personal-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Social media handles when provided for promotional purposes',
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
          _key: 'usage-data',
          hideSection: false,
          title: 'Usage Data',
          anchorId: 'usage-data',
          content: [
            {
              _type: 'richText',
              _key: 'usage-data-text',
              content: [
                {
                  _type: 'block',
                  _key: 'usage-intro',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'We automatically collect certain information when you visit our website:',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'usage-1',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'IP address and browser information',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'usage-2',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Pages visited and time spent on our website',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'usage-3',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Referring website and search terms used',
                      marks: []
                    }
                  ]
                },
                {
                  _type: 'block',
                  _key: 'usage-4',
                  style: 'normal',
                  listItem: 'bullet',
                  children: [
                    {
                      _type: 'span',
                      text: 'Device and operating system information',
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
      _key: 'cookies-section',
      hideSection: false,
      title: 'Cookies and Tracking Technologies',
      anchorId: 'cookies-tracking',
      content: [
        {
          _type: 'richText',
          _key: 'cookies-text',
          content: [
            {
              _type: 'block',
              _key: 'cookies-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Our website and embedded third-party services may use cookies and similar tracking technologies:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-spotify',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Spotify widgets may set cookies for music streaming functionality',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-bandcamp',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Bandcamp widgets may use cookies for music purchasing and playback',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-youtube',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'YouTube embedded videos may set cookies for video playback and analytics',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-social',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Social media widgets may set cookies for sharing and tracking purposes',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-control',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'You can control cookies through your browser settings, though this may affect website functionality.',
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
      _key: 'info-use-section',
      hideSection: false,
      title: 'How We Use Your Information',
      anchorId: 'how-we-use-information',
      content: [
        {
          _type: 'richText',
          _key: 'info-use-text',
          content: [
            {
              _type: 'block',
              _key: 'use-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We use the information we collect for the following purposes:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'use-1',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'To respond to inquiries and provide customer support',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'use-2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'To facilitate artist collaborations and partnerships',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'use-3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'To send event notifications and promotional updates (with consent)',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'use-4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'To improve our website and services based on usage patterns',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'use-5',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'To comply with legal obligations and protect our rights',
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
      _key: 'info-sharing-section',
      hideSection: false,
      title: 'Information Sharing and Disclosure',
      anchorId: 'information-sharing',
      content: [
        {
          _type: 'richText',
          _key: 'sharing-text',
          content: [
            {
              _type: 'block',
              _key: 'sharing-policy',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'sharing-1',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'With your explicit consent for promotional purposes',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'sharing-2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'With service providers who assist in our operations (under confidentiality agreements)',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'sharing-3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'When required by law or to protect legal rights',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'sharing-4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'In connection with business transfers or reorganization',
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
                  text: 'Our website integrates with various third-party services that have their own privacy policies:',
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
                  text: 'Spotify: Music streaming and playlist embedding',
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
                  text: 'Bandcamp: Music distribution and purchase widgets',
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
                  text: 'YouTube: Video content embedding',
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
                  text: 'Social Media: Facebook, Instagram, Twitter integration',
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
                  text: 'We encourage you to review the privacy policies of these third-party services as we are not responsible for their data practices.',
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
      _key: 'data-security-section',
      hideSection: false,
      title: 'Data Security',
      anchorId: 'data-security',
      content: [
        {
          _type: 'richText',
          _key: 'security-text',
          content: [
            {
              _type: 'block',
              _key: 'security-measures',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We implement reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'security-notice',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'In the event of a data breach that affects your personal information, we will notify you as required by applicable law.',
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
      _key: 'data-retention-section',
      hideSection: false,
      title: 'Data Retention',
      anchorId: 'data-retention',
      content: [
        {
          _type: 'richText',
          _key: 'retention-text',
          content: [
            {
              _type: 'block',
              _key: 'retention-policy',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'retention-period',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Typically, we retain contact information for active business relationships and correspondence for up to 7 years after the last interaction, unless longer retention is required by law.',
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
      _key: 'your-rights-section',
      hideSection: false,
      title: 'Your Rights',
      anchorId: 'your-rights',
      content: [
        {
          _type: 'richText',
          _key: 'rights-text',
          content: [
            {
              _type: 'block',
              _key: 'rights-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'You have the following rights regarding your personal information:',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-1',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Access: Request copies of your personal information',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Rectification: Request correction of inaccurate information',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Erasure: Request deletion of your personal information',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Portability: Request transfer of your data to another service',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-5',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Objection: Object to processing of your personal information',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rights-exercise',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'To exercise any of these rights, please contact us using the information provided below.',
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
                  text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:',
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
            },
            {
              _type: 'block',
              _key: 'contact-response',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'We will respond to your inquiry within 30 days of receiving your request.',
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
      _key: 'changes-section',
      hideSection: false,
      title: 'Changes to This Privacy Policy',
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
                  text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date below.',
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

async function createAndPopulatePrivacyPolicy() {
  try {
    console.log('=€ Creating Privacy Policy document...');

    // Check if document already exists
    const existingDoc = await client.fetch('*[_id == "privacyPolicy"][0]');

    if (existingDoc) {
      console.log('   Privacy Policy document already exists.');
      console.log('   Updating existing document...');

      const result = await client.createOrReplace(privacyPolicyData);
      console.log(' Updated Privacy Policy document');
      console.log(`   Document ID: ${result._id}`);
    } else {
      const result = await client.create(privacyPolicyData);
      console.log(' Created Privacy Policy document');
      console.log(`   Document ID: ${result._id}`);
    }

    console.log('\n=Ý Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to Site Management ’ Legal ’ Privacy Policy');
    console.log('3. Review the content and make any necessary adjustments');
    console.log('4. Publish the document when ready');
    console.log('5. The page will be available at /privacy-policy');
  } catch (error) {
    console.error('=¥ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
createAndPopulatePrivacyPolicy();