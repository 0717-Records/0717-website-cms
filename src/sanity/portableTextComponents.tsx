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
    standout: ({ children }) => (
      <div className='border-l-4 border-brand-primary bg-gray-50 pl-4 py-3 my-4 rounded-r-lg italic text-body-xl'>
        {children}
      </div>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className='list-disc pl-6 space-y-2 [&>li::marker]:text-brand-secondary'>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className='list-decimal pl-6 space-y-2 [&>li::marker]:text-brand-secondary'>{children}</ol>
    ),
  },

  listItem: ({ children }) => <li className='leading-relaxed'>{children}</li>,

  marks: {
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,

    link: ({ value, children }) => {
      // Handle simple external link structure
      const href = value?.href;

      if (!href) {
        return <span>{children}</span>;
      }

      const linkClassName = 'text-brand-secondary hover:text-brand-primary underline transition-colors';

      // All rich text links are treated as external and open in new tab
      return (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={linkClassName}>
          {children}
        </a>
      );
    },

    color: (props) => {
      return <span style={{ color: props.value?.hex || '#000000' }}>{props.children}</span>;
    },
  },

  types: {
    image: (props) => {
      // Validate image has proper asset reference before rendering
      if (!props.value || !props.value.asset || !props.value.asset._ref) {
        return null;
      }
      
      return (
        <Image
          className='rounded-lg not-prose w-full h-auto'
          src={urlFor(props.value).width(600).height(400).quality(80).auto('format').url()}
          alt={props?.value?.alt || ''}
          width='600'
          height='400'
        />
      );
    },
  },
};

// Components specifically for hero content
export const heroComponents: PortableTextComponents = {
  ...components,
};
