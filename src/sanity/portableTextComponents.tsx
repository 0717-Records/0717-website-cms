import Image from 'next/image';
import { PortableTextComponents } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

export const components: PortableTextComponents = {
  block: {
    // Text size styles
    normal: ({ children }) => <p className='text-base leading-relaxed'>{children}</p>,
    small: ({ children }) => <p className='text-sm leading-relaxed'>{children}</p>,
    large: ({ children }) => <p className='text-lg leading-relaxed'>{children}</p>,

    // Heading styles - using semantic HTML with global styles
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,

    // Blockquote style
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-brand-primary pl-4 italic text-lg leading-relaxed'>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className='list-disc pl-6 space-y-2'>{children}</ul>,
    number: ({ children }) => <ol className='list-decimal pl-6 space-y-2'>{children}</ol>,
  },

  listItem: ({ children }) => <li className='leading-relaxed'>{children}</li>,

  marks: {
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,

    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className='text-brand-secondary hover:text-brand-primary underline transition-colors'>
          {children}
        </a>
      );
    },

    color: (props) => {
      return <span style={{ color: props.value?.hex || '#000000' }}>{props.children}</span>;
    },
  },

  types: {
    image: (props) =>
      props.value ? (
        <Image
          className='rounded-lg not-prose w-full h-auto'
          src={urlFor(props.value).width(600).height(400).quality(80).auto('format').url()}
          alt={props?.value?.alt || ''}
          width='600'
          height='400'
        />
      ) : null,
  },
};
