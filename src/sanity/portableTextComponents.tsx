import Image from 'next/image';
import Link from 'next/link';
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
      // Handle the new CTA-style link structure
      let href = '';
      let target: string | undefined;
      let rel: string | undefined;

      if (value?.linkType === 'internal') {
        if (value.internalLink) {
          // Handle both reference objects and dereferenced objects
          if ('href' in value.internalLink && value.internalLink.href) {
            href = value.internalLink.href;
          } else if ('slug' in value.internalLink && value.internalLink.slug?.current) {
            href = `/${value.internalLink.slug.current}`;
          }
          
          // Add section anchor if specified
          if (value.pageSectionId) {
            href += `#${value.pageSectionId}`;
          }
        } else {
          // Default to home page if no internal link is selected
          href = '/';
        }
        
        // Internal links can optionally open in new tab
        if (value.openInNewTab) {
          target = '_blank';
          rel = 'noopener noreferrer';
        }
      } else if (value?.linkType === 'external' && value?.externalUrl) {
        href = value.externalUrl;
        target = '_blank';
        rel = 'noopener noreferrer';
      } else if (value?.href) {
        // Fallback for legacy simple link structure
        href = value.href;
        target = href.startsWith('http') ? '_blank' : undefined;
        rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      }

      if (!href) {
        return <span>{children}</span>;
      }

      // Use Next.js Link for internal links, regular anchor for external links or when target="_blank"
      const isExternal = 
        href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
      const shouldUseAnchor = isExternal || target === '_blank';

      const linkClassName = 'text-brand-secondary hover:text-brand-primary underline transition-colors';

      if (shouldUseAnchor) {
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className={linkClassName}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={linkClassName}>
          {children}
        </Link>
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
