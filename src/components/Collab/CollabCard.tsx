import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaUser } from 'react-icons/fa';
import type { COLLABS_ALL_QUERYResult } from '@/sanity/types';

type CollabData = COLLABS_ALL_QUERYResult[0];

interface CollabCardProps extends CollabData {
  ctaText: string;
}

export default function CollabCard({
  name,
  slug,
  genre,
  location,
  previewImage,
  shortDescription,
  useShortDescriptionForCards,
  cardDescription,
  ctaText,
}: CollabCardProps) {
  // Don't render if no slug (can't link to collab page)
  if (!slug?.current) {
    return null;
  }

  const collabUrl = `/collabs/${slug.current}`;

  // Determine which description to use
  const displayDescription = useShortDescriptionForCards !== false 
    ? shortDescription 
    : cardDescription || shortDescription;

  // Process image data
  const imageUrl = previewImage?.asset
    ? urlFor(previewImage.asset).width(400).height(400).quality(90).url()
    : null;

  return (
    <Link 
      href={collabUrl}
      className="group block w-full bg-white rounded-lg transition-all duration-200 hover:shadow-lg hover:border hover:border-gray-300"
    >
      <div className="p-6 space-y-4">
        {/* Preview Image */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={previewImage?.alt || `${name || 'Collaboration'} profile image`}
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser className="text-white text-4xl" />
              </div>
            )}
          </div>
        </div>

        {/* Collab Title */}
        <div className="text-center">
          <h3 className="text-h4 font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
            {name || 'Untitled Collaboration'}
          </h3>
        </div>

        {/* Genre */}
        {genre && (
          <div className="text-center">
            <p className="text-body-sm text-gray-600 font-medium">
              {genre}
            </p>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="text-center">
            <p className="text-body-sm text-gray-500">
              {location}
            </p>
          </div>
        )}

        {/* Description */}
        {displayDescription && (
          <div className="text-center">
            <p className="text-body-sm text-gray-600 line-clamp-3">
              {displayDescription}
            </p>
          </div>
        )}

        {/* CTA Button - Non-clickable since entire card is clickable */}
        <div className="flex justify-center pt-2">
          <span className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 border-2 border-brand-secondary text-brand-secondary bg-transparent group-hover:bg-brand-secondary group-hover:text-white group-hover:border-transparent text-body-sm">
            {ctaText}
          </span>
        </div>
      </div>
    </Link>
  );
}