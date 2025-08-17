import Image from 'next/image';
import { PortableTextComponents } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

// Default components with gradient underlines
export const components: PortableTextComponents = {
  block: {
    // Default style (what users get when they just start typing)
    normal: ({ children }) => <p className='text-body-base'>{children}</p>,

    // Body text styles - using appropriate semantic tags with typography utilities
    'body-xs': ({ children }) => <figcaption className='text-body-xs'>{children}</figcaption>,
    'body-sm': ({ children }) => <p className='text-body-sm'>{children}</p>,
    'body-lg': ({ children }) => <p className='text-body-lg'>{children}</p>,
    'body-xl': ({ children }) => <p className='text-body-xl'>{children}</p>,
    'body-2xl': ({ children }) => <p className='text-body-2xl'>{children}</p>,
    'body-3xl': ({ children }) => <p className='text-body-3xl'>{children}</p>,

    // Special styles
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-brand-primary pl-4 italic text-body-xl'>
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

// Components specifically for hero content
export const heroComponents: PortableTextComponents = {
  ...components,
};
