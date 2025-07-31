import { PAGE_QUERYResult } from '@/sanity/types';
import { Hero } from './Hero';
import { Features } from './Features';
import { SplitImage } from './SplitImage';
import { FAQs } from './FAQs';

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>['content'];
};

export function PageBuilder({ content }: PageBuilderProps) {
  if (!Array.isArray(content)) {
    return null;
  }

  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={block._key} {...block} />;
          case 'features':
            return <Features key={block._key} {...block} />;
          case 'splitImage':
            return <SplitImage key={block._key} {...block} />;
          case 'faqs':
            return <FAQs key={block._key} {...block} />;
          default:
            // This is a fallback for when we don't have a block type
            return <div>Block not found</div>;
        }
      })}
    </main>
  );
}
