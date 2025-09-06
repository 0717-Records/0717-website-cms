import React from 'react';
import { getHomePage } from '@/actions';
import { urlFor, getImageDimensions } from '@/sanity/lib/image';
import Image from 'next/image';

const page = async () => {
  const [page] = await Promise.all([getHomePage()]);

  const validImages = page?.featuredImages?.filter(
    (image) => image && image.asset && image.asset._ref
  );

  if (!validImages) return null;

  console.log(validImages);

  return (
    <div>
      <div id='hero' className='flex flex-col items-center text-center py-8'>
        <h1 className='text-h1'>{page?.heroTitle}</h1>
        <div className='border border-green-400 w-full flex flex-wrap justify-center gap-4 px-8'>
          {validImages.map((image, index) => {
            const dimensions = getImageDimensions(image as { asset: { _ref: string } });
            const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;

            return (
              <div
                key={index}
                className='relative border border-blue-500 h-[50vh] max-w-full'
                style={{ aspectRatio: aspectRatio }}>
                <Image
                  src={urlFor(image).width(1200).url()}
                  alt={image.alt || 'Featured item'}
                  fill
                  className='object-contain'
                  sizes='(max-width: 768px) 90vw, 400px'
                  priority={index === 0}
                />
              </div>
            );
          })}
        </div>
        <div className='text-body-3xl mt-8'>
          <p>A New Zealand based record label supporting local and international artists.</p>
          <p>Thank you for creating.</p>
        </div>
      </div>
      <div className='h-[200vh] bg-green-500'></div>
    </div>
  );
};

export default page;
