import React from 'react';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { components } from '@/sanity/portableTextComponents';
import type { PAGE_QUERYResult } from '@/sanity/types';
import { stegaClean } from 'next-sanity';

type SplitImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'splitImage' }
>;

const SplitImage = ({ content, image, orientation }: SplitImageProps) => {
  return (
    <section
      className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
      data-orientation={stegaClean(orientation) || 'imageLeft'}>
      {image ? (
        <Image
          className='rounded-xl w-2/3 h-auto'
          src={urlFor(image).width(800).height(600).url()}
          width={800}
          height={600}
          alt=''
        />
      ) : null}
      <div className='w-1/3 flex items-center'>
        {content ? (
          <div className='mx-auto'>
            <PortableText value={content} components={components} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SplitImage;
