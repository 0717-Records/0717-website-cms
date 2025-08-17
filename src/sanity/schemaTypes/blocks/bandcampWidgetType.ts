import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export const bandcampWidgetType = defineType({
  name: 'bandcampWidget',
  title: 'Bandcamp Widget',
  type: 'object',
  icon: PlayIcon,
  description: 'Embed Bandcamp albums or tracks using the embed code',
  fields: [
    defineField({
      name: 'embedCode',
      title: 'Bandcamp Embed Code',
      type: 'text',
      description: 'Paste the complete iframe embed code from Bandcamp. To get this: 1) Go to your Bandcamp album/track page, 2) Click "Share/Embed", 3) Copy the embed code (iframe), 4) Paste it here.',
      validation: (Rule) =>
        Rule.required()
          .custom((embedCode) => {
            if (!embedCode) return 'Embed code is required';
            
            // Check if it contains iframe and bandcamp.com
            if (!embedCode.includes('iframe') || !embedCode.includes('bandcamp.com')) {
              return 'Please paste a valid Bandcamp iframe embed code';
            }
            
            // Check for src attribute
            if (!embedCode.includes('src=')) {
              return 'Embed code must contain a valid src attribute';
            }
            
            return true;
          }),
    }),
  ],
  preview: {
    select: {
      embedCode: 'embedCode',
    },
    prepare({ embedCode }) {
      // Try to extract content type from embed code
      let contentInfo = 'Content';
      
      if (embedCode) {
        const albumMatch = embedCode.match(/album=(\d+)/);
        const trackMatch = embedCode.match(/track=(\d+)/);
        
        if (albumMatch) contentInfo = 'Album';
        else if (trackMatch) contentInfo = 'Track';
      }
      
      return {
        title: `Bandcamp ${contentInfo}`,
        subtitle: embedCode ? 'Ready to embed' : 'No embed code',
        media: PlayIcon,
      };
    },
  },
});