import React from 'react';
import { getHomePage } from '@/actions';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const page = async () => {
  const [page] = await Promise.all([getHomePage()]);

  console.log(page);

  const validImages = page?.featuredImages?.filter(
    (image) => image && image.asset && image.asset._ref
  );

  if (!validImages) return null;

  return (
    <div>
      <div
        id='hero'
        className='h-[100svh] min-h-[100svh] flex flex-col items-center text-center py-8'>
        <h1 className='text-h1'>{page?.heroTitle}</h1>
        <div className='border border-green-400 flex-grow w-full flex justify-center gap-4'>
          {validImages.map((image, index) => {
            return (
              <div key={index} className='relative border border-blue-500 h-full aspect-square'>
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
