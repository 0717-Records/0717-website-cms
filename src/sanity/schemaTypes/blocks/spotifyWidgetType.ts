import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export const spotifyWidgetType = defineType({
  name: 'spotifyWidget',
  title: 'Spotify Widget',
  type: 'object',
  icon: PlayIcon,
  description: 'Embed Spotify tracks, albums, playlists, artists, shows, or episodes',
  fields: [
    defineField({
      name: 'url',
      title: 'Spotify Share URL',
      type: 'url',
      description: 'Paste the Spotify share link here. To get this: 1) Open Spotify, 2) Find your content, 3) Click the three dots (...), 4) Select "Share" → "Copy link to [content]"',
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ['https'],
          })
          .custom((url) => {
            if (!url) return 'Spotify URL is required';
            
            const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)(\?.*)?$/;
            
            if (!spotifyRegex.test(url)) {
              return 'Please enter a valid Spotify share URL (e.g., https://open.spotify.com/track/...)';
            }
            
            return true;
          }),
    }),
    defineField({
      name: 'height',
      title: 'Player Height',
      type: 'string',
      description: 'Choose the height of the Spotify player. Compact works well for single tracks, while Normal is better for albums and playlists.',
      options: {
        list: [
          { title: 'Compact (152px) - Good for tracks', value: 'compact' },
          { title: 'Normal (352px) - Good for albums/playlists', value: 'normal' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      height: 'height',
    },
    prepare({ url, height }) {
      // Extract content type and provide meaningful subtitle
      const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)(\?.*)?$/;
      const match = url?.match(spotifyRegex);
      const contentType = match ? match[1] : 'content';
      
      const contentTypeLabels: Record<string, string> = {
        track: 'Track',
        album: 'Album', 
        playlist: 'Playlist',
        artist: 'Artist',
        show: 'Podcast Show',
        episode: 'Podcast Episode',
      };
      
      const label = contentTypeLabels[contentType] || 'Content';
      const heightLabel = height === 'compact' ? 'Compact' : 'Normal';
      
      return {
        title: `Spotify ${label}`,
        subtitle: `${heightLabel} height • ${url ? url.slice(0, 50) + (url.length > 50 ? '...' : '') : 'No URL provided'}`,
        media: PlayIcon,
      };
    },
  },
});