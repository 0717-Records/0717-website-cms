import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { stegaClean } from 'next-sanity';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Heading from '../Typography/Heading/Heading';

// Type definitions
interface CollabPageSection {
  _key: string;
  _type: string;
  title?: string | null;
  content?: unknown;
}

interface CollabMainContentProps {
  bio?: string | null;
  mainContent?: CollabPageSection[] | null;
  collabId: string;
  collabType: string;
  siteSettings?: {
    companyEmail?: string;
  };
}

export default function CollabMainContent({
  bio,
  mainContent,
  collabId,
  collabType,
  siteSettings,
}: CollabMainContentProps) {
  return (
    <div className='space-y-8'>
      {/* Bio Section */}
      {bio && (
        <section className='bg-white border border-gray-200 rounded-lg p-6 md:p-8'>
          <Heading level='h2' className='text-h2 font-bold text-gray-900 mb-6' showUnderline={true}>Biography</Heading>
          <p className='text-body-lg text-gray-700 leading-relaxed whitespace-pre-line'>
            {stegaClean(bio)}
          </p>
        </section>
      )}

      {/* Main Content Sections */}
      {mainContent && mainContent.length > 0 && (
        <>
          {(mainContent as CollabPageSection[]).map((section: CollabPageSection, index: number) => (
            <section
              key={section._key || index}
              className='bg-white border border-gray-200 rounded-lg p-6 md:p-8'>
              {section.title && (
                <Heading level='h2' className='text-h2 font-bold text-gray-900 mb-6' showUnderline={true}>
                  {stegaClean(section.title)}
                </Heading>
              )}
              {!!(section.content && Array.isArray(section.content)) && (
                <PageBuilder
                  content={section.content as NonNullable<PAGE_QUERYResult>['content']}
                  documentId={collabId}
                  documentType={collabType}
                  siteSettings={siteSettings}
                  alignment='left'
                />
              )}
            </section>
          ))}
        </>
      )}
    </div>
  );
}
