import React from 'react';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Title from '../Typography/Title';

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'hero' }
>;

const Hero = ({ title, text, image }: HeroProps) => {
  return (
    <section className='isolate w-full aspect-[2/1] py-16 relative overflow-hidden'>
      <div className='relative flex flex-col justify-center items-center gap-8 h-full z-20'>
        {title ? (
          // <h1 className='text-2xl md:text-4xl lg:text-6xl font-semibold text-white text-pretty max-w-3xl'>
          //   {title}
          // </h1>
          <Title>{title}</Title>
        ) : null}
        <div className='prose-lg lg:prose-xl prose-invert flex items-center'>
          {text ? <PortableText value={text} components={components} /> : null}
        </div>
      </div>
      <div className='absolute inset-0 bg-pink-500 opacity-50 z-10' />
      {image ? (
        <Image
          className='absolute inset-0 object-cover blur-sm'
          src={urlFor(image).width(1600).height(800).url()}
          width={1600}
          height={800}
          alt=''
        />
      ) : null}
    </section>
  );
};

export default Hero;
