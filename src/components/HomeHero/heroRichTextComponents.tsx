import Image from 'next/image';
import { PortableTextComponents } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

// ===== HERO SCALE FACTOR =====
// Adjust this value to change the font size scale for Hero Rich Text
// Available scale factors: 1.0, 1.25, 1.5, 1.75, 2.0
//
// Examples:
// 1.0  = same as regular Rich Text (no scaling)
// 1.25 = 25% larger (text-body-base → text-body-lg)
// 1.5  = 50% larger (text-body-base → text-body-xl)
// 1.75 = 75% larger (text-body-base → text-body-2xl)
// 2.0  = double size (text-body-base → text-body-3xl)
//
// To change: Simply update the value below and run npm run build
const HERO_SCALE_FACTOR = 1.75;

// Get text alignment from context (passed down from HeroSubtitle component)
const getAlignmentClasses = (alignment: string = 'left') => {
  switch (alignment) {
    case 'right':
      return {
        bulletClass:
          'list-disc space-y-2 [&>li::marker]:text-brand-secondary m-6 text-right [&>li]:list-inside',
        numberClass:
          'list-decimal space-y-2 [&>li::marker]:text-brand-secondary m-6 text-right [&>li]:list-inside',
        listItemClass: 'leading-relaxed',
        standoutClass:
          'border-r-4 border-brand-primary bg-gray-50 pr-4 py-3 my-4 rounded-l-lg italic text-right',
      };
    case 'center':
      return {
        bulletClass:
          'list-disc list-inside space-y-2 [&>li::marker]:text-brand-secondary m-6 text-center',
        numberClass:
          'list-decimal list-inside space-y-2 [&>li::marker]:text-brand-secondary m-6 text-center',
        listItemClass: 'leading-relaxed text-center',
        standoutClass:
          'border-l-4 border-brand-primary bg-gray-50 pl-4 py-3 my-4 rounded-r-lg italic text-center',
      };
    default: // 'left' or 'inherit'
      return {
        bulletClass: 'list-disc pl-6 space-y-2 [&>li::marker]:text-brand-secondary m-6',
        numberClass: 'list-decimal pl-6 space-y-2 [&>li::marker]:text-brand-secondary m-6',
        listItemClass: 'leading-relaxed',
        standoutClass:
          'border-l-4 border-brand-primary bg-gray-50 pl-4 py-3 my-4 rounded-r-lg italic',
      };
  }
};

// Function to apply scale factor to text size classes
const scaleTextClass = (baseClass: string): string => {
  // Map base classes to scaled versions based on HERO_SCALE_FACTOR
  const scaleMap: Record<number, Record<string, string>> = {
    1.0: {
      // No scaling - return original classes
      'text-body-xs': 'text-body-xs',
      'text-body-sm': 'text-body-sm',
      'text-body-base': 'text-body-base',
      'text-body-lg': 'text-body-lg',
      'text-body-xl': 'text-body-xl',
      'text-body-2xl': 'text-body-2xl',
      'text-body-3xl': 'text-body-3xl',
    },
    1.25: {
      'text-body-xs': 'text-body-sm',
      'text-body-sm': 'text-body-base',
      'text-body-base': 'text-body-lg',
      'text-body-lg': 'text-body-xl',
      'text-body-xl': 'text-body-2xl',
      'text-body-2xl': 'text-body-3xl',
      'text-body-3xl': 'text-body-4xl',
    },
    1.5: {
      'text-body-xs': 'text-body-base',
      'text-body-sm': 'text-body-lg',
      'text-body-base': 'text-body-xl',
      'text-body-lg': 'text-body-2xl',
      'text-body-xl': 'text-body-3xl',
      'text-body-2xl': 'text-body-4xl',
      'text-body-3xl': 'text-body-5xl',
    },
    1.75: {
      'text-body-xs': 'text-body-lg',
      'text-body-sm': 'text-body-xl',
      'text-body-base': 'text-body-2xl',
      'text-body-lg': 'text-body-3xl',
      'text-body-xl': 'text-body-4xl',
      'text-body-2xl': 'text-body-5xl',
      'text-body-3xl': 'text-body-6xl',
    },
    2.0: {
      'text-body-xs': 'text-body-xl',
      'text-body-sm': 'text-body-2xl',
      'text-body-base': 'text-body-3xl',
      'text-body-lg': 'text-body-4xl',
      'text-body-xl': 'text-body-5xl',
      'text-body-2xl': 'text-body-6xl',
      'text-body-3xl': 'text-body-7xl',
    },
  };

  const currentScale = scaleMap[HERO_SCALE_FACTOR];
  if (currentScale && currentScale[baseClass]) {
    return currentScale[baseClass];
  }

  // Fallback to original class if no mapping exists
  return baseClass;
};

// Create components factory for Hero Rich Text with scale factor
export const createHeroRichTextComponents = (
  alignment: string = 'left'
): PortableTextComponents => {
  const alignmentClasses = getAlignmentClasses(alignment);

  return {
    block: {
      // Default style (what users get when they just start typing)
      normal: ({ children }) => <p className={scaleTextClass('text-body-base')}>{children}</p>,

      // Body text styles - using appropriate semantic tags with scaled typography utilities
      'body-xs': ({ children }) => (
        <figcaption className={scaleTextClass('text-body-xs')}>{children}</figcaption>
      ),
      'body-sm': ({ children }) => <p className={scaleTextClass('text-body-sm')}>{children}</p>,
      'body-lg': ({ children }) => <p className={scaleTextClass('text-body-lg')}>{children}</p>,
      'body-xl': ({ children }) => <p className={scaleTextClass('text-body-xl')}>{children}</p>,
      'body-2xl': ({ children }) => <p className={scaleTextClass('text-body-2xl')}>{children}</p>,
      'body-3xl': ({ children }) => <p className={scaleTextClass('text-body-3xl')}>{children}</p>,

      // Special styles
      standout: ({ children }) => (
        <div className={`${alignmentClasses.standoutClass} ${scaleTextClass('text-body-xl')}`}>
          {children}
        </div>
      ),
    },

    list: {
      bullet: ({ children }) => <ul className={alignmentClasses.bulletClass}>{children}</ul>,
      number: ({ children }) => <ol className={alignmentClasses.numberClass}>{children}</ol>,
    },

    listItem: ({ children }) => <li className={alignmentClasses.listItemClass}>{children}</li>,

    marks: {
      strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
      em: ({ children }) => <em className='italic'>{children}</em>,

      link: ({ value, children }) => {
        // Handle simple external link structure
        const href = value?.href;

        if (!href) {
          return <span>{children}</span>;
        }

        const linkClassName =
          'text-brand-secondary hover:text-brand-primary underline transition-colors';

        // All rich text links are treated as external and open in new tab
        return (
          <a href={href} target='_blank' rel='noopener noreferrer' className={linkClassName}>
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
};
