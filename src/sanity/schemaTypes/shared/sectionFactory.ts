import { defineType, defineArrayMember, defineField, type FieldDefinition } from 'sanity';


// Common content blocks available to all sections
export const commonContentBlocks = [
  defineArrayMember({ type: 'divider' }),
  defineArrayMember({ type: 'itemList' }),
  defineArrayMember({ type: 'richText' }),
  defineArrayMember({ type: 'quote' }),
  defineArrayMember({ type: 'textImage' }),
  defineArrayMember({ type: 'ctaCard' }),
  defineArrayMember({ type: 'ctaButton' }),
  defineArrayMember({ type: 'ctaCalloutLink' }),
  defineArrayMember({ type: 'ctaEmailButton' }),
  defineArrayMember({ type: 'ctaEvent' }),
  defineArrayMember({ type: 'cardGrid' }),
  defineArrayMember({ type: 'icon' }),
  defineArrayMember({ type: 'imageBlock' }),
  defineArrayMember({ type: 'imageGallery' }),
  defineArrayMember({ type: 'youTubeVideo' }),
  defineArrayMember({ type: 'spotifyWidget' }),
  defineArrayMember({ type: 'bandcampWidget' }),
  defineArrayMember({ type: 'eventBlock' }),
];

interface SectionFactoryConfig {
  name: string;
  title: string;
  description: string;
  icon: string;
  hasSubtitle?: boolean;
  hasTextAlign?: boolean;
  allowedChildSections?: string[];
}

export function createSectionSchema(config: SectionFactoryConfig) {
  const fields: FieldDefinition[] = [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: `Title for this ${config.title.toLowerCase()} (will render as ${config.name === 'pageSection' ? 'h2' : config.name === 'subSection' ? 'h3' : config.name === 'subSubSection' ? 'h4' : 'heading'})`,
      validation: (Rule) => Rule.required().error(`${config.title} title is required`),
    }),
  ];

  // Add text alignment field if enabled (default: true for backward compatibility)
  if (config.hasTextAlign !== false) {
    fields.push(defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      description: 'Text alignment for this section and its content',
      options: {
        list: [
          { title: 'Inherit from Parent', value: 'inherit' },
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: config.name === 'pageSection' ? 'center' : 'inherit',
    }));
  }

  // Add subtitle field for PageSection only
  if (config.hasSubtitle) {
    fields.splice(1, 0, defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      description: 'Optional subtitle for this section',
    }));
  }

  // Build content array with allowed child sections and common blocks
  const contentOf = [
    ...(config.allowedChildSections?.map(childType => 
      defineArrayMember({ type: childType })
    ) || []),
    ...commonContentBlocks,
  ];

  fields.push(defineField({
    name: 'content',
    title: 'Content',
    type: 'array',
    of: contentOf,
  }));

  return defineType({
    name: config.name,
    title: config.title,
    type: 'object',
    description: config.description,
    icon: () => config.icon,
    fields,
    preview: {
      select: {
        title: 'title',
        ...(config.hasSubtitle && { subtitle: 'subtitle' }),
        content: 'content',
      },
      prepare(selection: { title?: string; subtitle?: string; content?: unknown[] }) {
        const { title, subtitle, content } = selection;
        const blockCount = Array.isArray(content) ? content.length : 0;
        const displaySubtitle = subtitle 
          ? `${subtitle.slice(0, 50)}${subtitle.length > 50 ? '...' : ''}`
          : `${blockCount} block${blockCount !== 1 ? 's' : ''}`;
        
        return {
          title: title || config.title,
          subtitle: displaySubtitle,
        };
      },
    },
  });
}