'use client';

import React from 'react';
import RichText from '@/components/blocks/RichText';
import CTACalloutLink from '@/components/blocks/CTACalloutLink';
import CTAEmailButton from '@/components/blocks/CTAEmailButton';
import { stegaClean } from 'next-sanity';
import type { CTACalloutLinkBlock } from '@/types/blocks';
import type { RichText as SanityRichText } from '@/sanity/types';

// Type definitions
interface CollabCTABlock {
  _key: string;
  _type: string;
  [key: string]: unknown;
}

interface CollabSideContentBlock {
  _key: string;
  _type: string;
  style?: string | null;
  title?: string | null;
  richText?: unknown;
  ctaBlocks?: CollabCTABlock[] | null;
}

interface CollabSideContentProps {
  sideContent: CollabSideContentBlock[] | null;
  companyEmail?: string;
}

export default function CollabSideContent({ sideContent, companyEmail }: CollabSideContentProps) {
  if (!sideContent || sideContent.length === 0) {
    return null;
  }

  return (
    <>
      {(sideContent as CollabSideContentBlock[]).map((sideBlock: CollabSideContentBlock, index: number) => {
        const isHighlighted = stegaClean(sideBlock.style) === 'highlighted';
        const cleanTitle = stegaClean(sideBlock.title);
        
        return (
          <aside 
            key={sideBlock._key || index}
            className={`
              rounded-lg p-6
              ${isHighlighted 
                ? 'bg-card-gradient border border-gray-200' 
                : 'bg-white border border-gray-200'
              }
            `.trim()}
          >
            {cleanTitle && (
              <h3 className='text-h4 font-bold text-gray-900 mb-4'>
                {cleanTitle}
              </h3>
            )}
            
            {!!(sideBlock.richText && Array.isArray(sideBlock.richText)) && (
              <div className='mb-4'>
                <RichText 
                  _type='richText'
                  _key={`richtext-${index}`}
                  content={sideBlock.richText as SanityRichText['content']} 
                />
              </div>
            )}

            {/* CTA Blocks */}
            {sideBlock.ctaBlocks && sideBlock.ctaBlocks.length > 0 && (
              <div className='space-y-4'>
                {sideBlock.ctaBlocks.map((ctaBlock: CollabCTABlock, ctaIndex: number) => {
                  if (ctaBlock._type === 'ctaCalloutLink') {
                    return (
                      <CTACalloutLink
                        key={ctaBlock._key || ctaIndex}
                        heading={ctaBlock.heading as string}
                        text={ctaBlock.text as string}
                        image={ctaBlock.image as CTACalloutLinkBlock['image']}
                        linkType={ctaBlock.linkType as CTACalloutLinkBlock['linkType']}
                        internalLink={ctaBlock.internalLink as CTACalloutLinkBlock['internalLink']}
                        externalUrl={ctaBlock.externalUrl as string}
                        openInNewTab={ctaBlock.openInNewTab as boolean}
                      />
                    );
                  } else if (ctaBlock._type === 'ctaEmailButton') {
                    return (
                      <CTAEmailButton
                        key={ctaBlock._key || ctaIndex}
                        email={companyEmail}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </aside>
        );
      })}
    </>
  );
}