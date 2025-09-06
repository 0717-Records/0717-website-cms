import React from 'react';
import { getHomePage } from '@/actions';
import { urlFor, getImageDimensions } from '@/sanity/lib/image';
import Image from 'next/image';
import styles from './page.module.css';

const page = async () => {
  const [page] = await Promise.all([getHomePage()]);

  const validImages = page?.featuredImages?.filter(
    (image) => image && image.asset && image.asset._ref
  );

  if (!validImages) return null;

  console.log(validImages);

  return (
    <div>
      <div
        id='hero'
        className={`${styles.heroHeight} flex flex-col justify-around items-center text-center py-8`}>
        <h1 className='text-h4'>{page?.heroTitle}</h1>
        <div className='border border-green-400 w-full flex flex-wrap justify-center gap-4 px-4 md:px-8'>
          {validImages.map((image, index) => {
            const dimensions = getImageDimensions(image as { asset: { _ref: string } });
            const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;
            const isPortrait = aspectRatio <= 1;

            return (
              <div
                key={index}
                className={`relative border border-blue-500 w-full landscape:h-[50vh] landscape:w-auto ${isPortrait ? 'max-w-[300px] landscape:max-w-none' : 'max-w-[2000px] landscape:max-w-full'}`}
                style={{ aspectRatio: aspectRatio }}>
                <Image
                  src={urlFor(image).width(2000).url()}
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
        <div className='text-body-2xl mt-8'>
          <p>A New Zealand based record label supporting local and international artists.</p>
          <p>Thank you for creating.</p>
          <button>CLICK ME</button>
        </div>
      </div>
      <div className='h-[200vh] bg-green-500'></div>
    </div>
  );
};

export default page;
