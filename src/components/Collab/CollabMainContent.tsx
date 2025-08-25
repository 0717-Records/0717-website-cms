import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import type { PAGE_QUERYResult, COLLABS_ALL_QUERYResult } from '@/sanity/types';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

// Type definitions
interface CollabPageSection {
  _key: string;
  _type: string;
  title?: string | null;
  content?: unknown;
}

// Helper function to check if content contains a Bandcamp widget
function containsBandcampWidget(content: unknown): boolean {
  if (!Array.isArray(content)) return false;

  return content.some((item: { _type?: string; content?: unknown }) => {
    if (item._type === 'bandcampWidget') return true;

    // Check nested content for sections that might contain bandcamp widgets
    if (item.content && Array.isArray(item.content)) {
      return containsBandcampWidget(item.content);
    }

    return false;
  });
}

interface CollabMainContentProps {
  bio?: string | null;
  mainContent?: CollabPageSection[] | null;
  collabId: string;
  collabType: string;
  siteSettings?: {
    companyEmail?: string;
  };
  collabs?: COLLABS_ALL_QUERYResult;
}

export default function CollabMainContent({
  bio,
  mainContent,
  collabId,
  collabType,
  siteSettings,
  collabs,
}: CollabMainContentProps) {
  return (
    <div className='space-y-8'>
      {/* Bio Section */}
      {bio && (
        <section className='p-6 md:p-8'>
          <Heading level='h2' className='text-h2 font-bold text-gray-900 mb-6' showUnderline={true}>
            Biography
          </Heading>
          <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{bio}</p>
        </section>
      )}

      {/* Main Content Sections */}
      {mainContent && mainContent.length > 0 && (
        <>
          {(mainContent as CollabPageSection[]).map((section: CollabPageSection, index: number) => {
            const hasBandcampWidget = containsBandcampWidget(section.content);
            const sectionPadding = hasBandcampWidget ? '' : 'p-6 md:p-8';

            return (
              <section key={section._key || index} className={sectionPadding}>
                {section.title && (
                  <div className={hasBandcampWidget ? 'p-6 md:p-8 pb-0 md:pb-0' : ''}>
                    <Heading
                      level='h2'
                      className='text-h2 font-bold text-gray-900 mb-6'
                      showUnderline={true}
                      {...createSanityDataAttribute(
                        collabId,
                        collabType,
                        `mainContent[_key=="${section._key}"].title`
                      )}>
                      {section.title}
                    </Heading>
                  </div>
                )}
                {!!(section.content && Array.isArray(section.content)) && (
                  <PageBuilder
                    content={section.content as NonNullable<PAGE_QUERYResult>['content']}
                    documentId={collabId}
                    documentType={collabType}
                    siteSettings={siteSettings}
                    collabs={collabs}
                    alignment='left'
                  />
                )}
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
