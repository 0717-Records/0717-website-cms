import React from 'react';
import CollabCard from './CollabCard';
import type { COLLABS_ALL_QUERYResult } from '@/sanity/types';

interface CollabAllBlockProps {
  ctaText: string;
  noCollabsMessage: string;
  collabs: COLLABS_ALL_QUERYResult;
}

export default function CollabAllBlock({ 
  ctaText, 
  noCollabsMessage, 
  collabs 
}: CollabAllBlockProps) {
  if (!collabs || collabs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-h2 mb-4">🎵</div>
        <p className="text-gray-500 text-body-lg">{noCollabsMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {collabs.map((collab) => (
          <div
            key={collab._id}
            className="w-full md:w-[calc(50%-1rem)] flex"
          >
            <CollabCard
              {...collab}
              ctaText={ctaText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}