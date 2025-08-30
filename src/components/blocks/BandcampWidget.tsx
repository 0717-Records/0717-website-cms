'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import type { BandcampWidget as BandcampWidgetType } from '@/sanity/types';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';

interface BandcampWidgetProps
  extends BandcampWidgetType,
    Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  className?: string;
  pathPrefix?: string;
}

const BandcampWidget: React.FC<BandcampWidgetProps> = ({
  embedCode,
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const cleanEmbedCode = stegaClean(embedCode);

  if (!cleanEmbedCode) {
    return null;
  }

  // Extract iframe src and dimensions from embed code
  const iframeSrcMatch = cleanEmbedCode.match(/src="([^"]+)"/);
  const embedUrl = iframeSrcMatch ? iframeSrcMatch[1] : null;

  // Extract width and height from either attributes or inline styles
  const widthAttrMatch = cleanEmbedCode.match(/width="(\d+)"/);
  const heightAttrMatch = cleanEmbedCode.match(/height="(\d+)"/);
  const widthStyleMatch = cleanEmbedCode.match(/width:\s*(\d+)px/);
  const heightStyleMatch = cleanEmbedCode.match(/height:\s*(\d+)px/);

  const embedWidth = widthAttrMatch?.[1] || widthStyleMatch?.[1];
  const embedHeight = heightAttrMatch?.[1] || heightStyleMatch?.[1];

  console.log(`Embed URL: ${embedUrl}`);
  console.log(`Embed Width: ${embedWidth}`);
  console.log(`Embed Height: ${embedHeight}`);

  if (!embedUrl) {
    return (
      <div className={`${className} p-4 border border-red-200 rounded-lg bg-red-50`}>
        <p className='text-red-600'>
          Invalid Bandcamp embed code provided. Please paste the complete iframe embed code from
          Bandcamp.
        </p>
      </div>
    );
  }

  return <></>;

  return (
    <div className='flex flex-col items-center'>
      {/* SLIM - ARTWORK ON AND OFF */}
      <h1 className='text-4xl mb-4'>SLIM - artwork true or false</h1>
      <p>If width is 100%, add max width of 700px otherwise use supplied width as max width</p>
      <p>Height locked to 42px</p>
      <iframe
        className={`border border-red-500 w-full max-w-[700px] h-[42px]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=small/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      {/* ARTWORK ONLY */}
      <h1 className='text-4xl mb-4'>ARTWORK ONLY</h1>
      <p>Use supplied width for max width - add aspect square</p>
      <iframe
        className={`border border-red-500 w-full max-w-[700px] aspect-square`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      {/* STANDARD - SHOW ARTWORK - BIG (NO TRACKLIST) */}
      <h1 className='text-4xl mb-4'>STANDARD - SHOW ARTWORK - BIG (NO TRACKLIST)</h1>
      <p>Use supplied width for max width - use supplied width & height for aspect ratio</p>
      <iframe
        className={`border border-red-500 w-full max-w-[380px] aspect-[calc(380/500)]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      {/* STANDARD - SHOW ARTWORK - BIG (WITH TRACKLIST / MERCH) */}
      <h1 className='text-4xl mb-4'>STANDARD - SHOW ARTWORK - BIG (WITH TRACKLIST)</h1>
      <p>Use supplied width for max width - use supplied width & height for aspect ratio</p>
      <iframe
        className={`border border-red-500 w-full max-w-[380px] aspect-[calc(380/750)]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      <iframe
        className={`border border-red-500 w-full max-w-[700px] aspect-[calc(700/1194)]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=2488004756/size=large/bgcol=ffffff/linkcol=0687f5/package=7953950/transparent=true/'
        title='In Thrall to Heresy by Shepherds of Cassini'
        seamless></iframe>
      <h1>STANDARD - SHOW/NO ARTWORK - SMALL (NO TRACKLIST)</h1>
      <p>If width is 100%, add max width of 700px otherwise use supplied width as max width</p>
      <p>Height locked to 120px</p>
      <iframe
        className={`border border-red-500 w-full max-w-[420px] h-[120px]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      <iframe
        className={`border border-red-500 w-full max-w-[420px] h-[120px]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=none/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
      <h1>STANDARD - SHOW/NO ARTWORK - SMALL (WITH TRACKLIST)</h1>
      <p>If width is 100%, add max width of 700px otherwise use supplied width as max width</p>
      <p>Use supplied height as fixed height.</p>
      <iframe
        className={`border border-red-500 w-full max-w-[700px] h-[406px]`}
        src='https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/'
        title='Mark I by Star Control'
        seamless></iframe>
    </div>
  );

  // <iframe
  //   style='border: 0; width: 350px; height: 787px;'
  //   src='https://bandcamp.com/EmbeddedPlayer/album=2488004756/size=large/bgcol=ffffff/linkcol=0687f5/package=7953950/transparent=true/'
  //   seamless>
  //   <a href='https://shepherdsofcassini.bandcamp.com/album/in-thrall-to-heresy'>
  //     In Thrall to Heresy by Shepherds of Cassini
  //   </a>
  // </iframe>;

  // SLIM - SHOW ARTWORK (FALSE)
  // <iframe style="border: 0; width: 400px; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=small/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe>

  // SLIM - SHOW ARTWORK (TRUE)
  {
    /* <iframe style="border: 0; width: 400px; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // ARTWORK ONLY
  {
    /* <iframe style="border: 0; width: 350px; height: 350px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // STANDARD - SHOW ARTWORK - BIG (NO TRACKLIST)
  {
    /* <iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // STANDARD - SHOW ARTWORK - BIG (WITH TRACKLIST)
  {
    /* <iframe style="border: 0; width: 350px; height: 720px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // STANDARD - SHOW ARTWORK - SMALL (NO TRACKLIST)
  {
    /* <iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // STANDARD - SHOW ARTWORK - SMALL (WITH TRACKLIST)
  {
    /* <iframe style="border: 0; width: 400px; height: 406px;" src="https://bandcamp.com/EmbeddedPlayer/album=1036249858/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href="https://starcontrol1.bandcamp.com/album/mark-i">Mark I by Star Control</a></iframe> */
  }

  // Create data attribute for the widget container if Sanity props are provided
  const widgetDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, pathPrefix)
    : {};

  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        width: '100%',
        maxWidth: `${embedWidth}px`,
      }}
      {...widgetDataAttribute}>
      <iframe
        src={embedUrl}
        width={embedWidth}
        height={embedHeight}
        className='w-full rounded-lg border-0'
        style={{
          width: '100%',
          height: `${embedHeight}px`,
        }}
        allowFullScreen
        allow='autoplay; fullscreen'
        loading='lazy'
        title='Bandcamp Player'
      />
    </div>
  );
};

export default BandcampWidget;
