'use client';

import React from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { SpotifyWidget as SpotifyWidgetType } from '@/sanity/types';

interface SpotifyWidgetProps extends SpotifyWidgetType {
  className?: string;
  documentId?: string;
  documentType?: string;
  pathPrefix?: string;
}

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

const getSpotifyEmbedUrl = (url: string) => {
  // Spotify share URLs: https://open.spotify.com/track/ID or https://open.spotify.com/album/ID etc.
  // Embed URLs: https://open.spotify.com/embed/track/ID
  const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)(\?.*)?$/;
  const match = url.match(spotifyRegex);
  
  if (!match) return null;
  
  const [, contentType, contentId] = match;
  return `https://open.spotify.com/embed/${contentType}/${contentId}?utm_source=generator`;
};

const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({
  url,
  height = 'normal',
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const cleanUrl = stegaClean(url);
  const cleanHeight = stegaClean(height) || 'normal';
  
  if (!cleanUrl) {
    return null;
  }

  const embedUrl = getSpotifyEmbedUrl(cleanUrl);
  
  if (!embedUrl) {
    return (
      <div className={`${className} p-4 border border-red-200 rounded-lg bg-red-50`}>
        <p className="text-red-600">Invalid Spotify URL provided. Please use a valid Spotify share link (track, album, playlist, artist, show, or episode).</p>
      </div>
    );
  }

  // Height options: compact (152px) for tracks, normal (352px) for playlists/albums
  const getHeightClass = (heightOption: string) => {
    switch (heightOption) {
      case 'compact':
        return 'h-[152px]';
      case 'normal':
      default:
        return 'h-[352px]';
    }
  };

  const heightClass = getHeightClass(cleanHeight);

  // Create data attribute for the widget container if Sanity props are provided
  const getWidgetDataAttribute = () => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: pathPrefix,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  return (
    <div 
      className={`w-full max-w-[500px] mx-auto ${className}`}
      {...getWidgetDataAttribute()}
    >
      <iframe
        src={embedUrl}
        className={`w-full ${heightClass} rounded-xl border-0`}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      />
    </div>
  );
};

export default SpotifyWidget;