import React from 'react';
import { stegaClean } from 'next-sanity';
import PageBuilder from '@/components/PageBuilder';
import type { PAGE_QUERYResult, COLLABS_ALL_QUERYResult } from '@/sanity/types';
import type { SiteSettingsProps } from '@/types/shared';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { sectionTitleBottomSpacing, collabSectionBottomPadding } from '@/utils/spacingConstants';

// Type definitions
interface CollabPageSection {
  _key: string;
  _type: string;
  title?: string | null;
  anchorId?: string | null;
  content?: unknown;
}

interface CollabMainContentProps {
  bio?: string | null;
  mainContent?: CollabPageSection[] | null;
  collabId: string;
  collabType: string;
  siteSettings?: SiteSettingsProps;
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
    <>
      {/* Bio Section */}
      {bio && (
        <section className={collabSectionBottomPadding}>
          <Heading level='h2' className={sectionTitleBottomSpacing} showUnderline={true}>
            Biography
          </Heading>
          <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{bio}</p>
        </section>
      )}

      {/* Main Content Sections */}
      {mainContent && mainContent.length > 0 && (
        <>
          {(mainContent as CollabPageSection[]).map((section: CollabPageSection, index: number) => {
            return (
              <section 
                key={section._key || index} 
                id={section.anchorId ? stegaClean(section.anchorId) : undefined}
                className={collabSectionBottomPadding}>
                {section.title && (
                  <>
                    <Heading
                      level='h2'
                      className={sectionTitleBottomSpacing}
                      showUnderline={true}
                      {...createSanityDataAttribute(
                        collabId,
                        collabType,
                        `mainContent[_key=="${section._key}"].title`
                      )}>
                      {section.title}
                    </Heading>
                  </>
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
    </>
  );
}
