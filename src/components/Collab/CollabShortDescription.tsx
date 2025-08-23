import React from 'react';

interface CollabShortDescriptionProps {
  shortDescription: string | null;
}

export default function CollabShortDescription({ shortDescription }: CollabShortDescriptionProps) {
  if (!shortDescription) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 md:px-8 py-8'>
      <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center'>
        {shortDescription}
      </p>
    </div>
  );
}