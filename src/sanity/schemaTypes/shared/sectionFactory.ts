import { defineType, defineArrayMember, defineField, type FieldDefinition } from 'sanity';
import { AnchorIdInput } from '../../components/AnchorIdInput';


// Common content blocks available to all sections
export const commonContentBlocks = [
  defineArrayMember({ type: 'divider' }),
  defineArrayMember({ type: 'itemList' }),
  defineArrayMember({ type: 'richText' }),
  defineArrayMember({ type: 'quote' }),
  defineArrayMember({ type: 'textImage' }),
  defineArrayMember({ type: 'card' }),
  defineArrayMember({ type: 'ctaButton' }),
  defineArrayMember({ type: 'ctaCalloutLink' }),
  defineArrayMember({ type: 'ctaEmailButton' }),
  defineArrayMember({ type: 'ctaEvent' }),
  defineArrayMember({ type: 'ctaBlogPost' }),
  defineArrayMember({ type: 'cardGrid' }),
  defineArrayMember({ type: 'icon' }),
  defineArrayMember({ type: 'imageBlock' }),
  defineArrayMember({ type: 'imageGallery' }),
  defineArrayMember({ type: 'youTubeVideo' }),
  defineArrayMember({ type: 'spotifyWidget' }),
  defineArrayMember({ type: 'bandcampWidget' }),
  defineArrayMember({ type: 'eventBlock' }),
  defineArrayMember({ type: 'collabAllBlock' }),
  defineArrayMember({ type: 'favouriteBlock' }),
  defineArrayMember({ type: 'companyLinksBlock' }),
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
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
      description: 'Auto-generated from the section title. This field is read-only to prevent errors. Use the "Regenerate" button to recreate the ID if needed.',
      components: {
        input: AnchorIdInput,
      },
      validation: (Rule) => 
        Rule.required()
          .error('Anchor ID is required for section linking')
          .custom((value, context) => {
            if (!value) return true;
            
            // Check for valid format
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
              return 'Anchor ID must be lowercase letters, numbers, and hyphens only (e.g., about-our-services)';
            }
            
            // Get the current document and check for duplicate anchor IDs
            const document = context.document as { content?: unknown[] };
            if (!document?.content) return true;
            
            // Flatten all content to find sections
            const getAllSections = (content: unknown[]): { _type: string; anchorId?: string; _key?: string }[] => {
              const sections: { _type: string; anchorId?: string; _key?: string }[] = [];
              for (const item of content || []) {
                const typedItem = item as { _type: string; content?: unknown[]; anchorId?: string; _key?: string };
                if (typedItem._type === 'pageSection' || typedItem._type === 'subSection' || typedItem._type === 'subSubSection') {
                  sections.push(typedItem);
                  if (typedItem.content) {
                    sections.push(...getAllSections(typedItem.content));
                  }
                }
              }
              return sections;
            };
            
            const allSections = getAllSections(document.content);
            const currentSection = context.parent as { _key?: string };
            
            // Count occurrences of this anchor ID (excluding current section being edited)
            const duplicates = allSections.filter(section => 
              section.anchorId === value && section._key !== currentSection?._key
            );
            
            if (duplicates.length > 0) {
              return `Anchor ID "${value}" already exists on this page. Each section must have a unique anchor ID.`;
            }
            
            return true;
          }),
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
      initialValue: 'inherit',
    }));
  }

  // Add subtitle field for PageSection only - insert after anchor ID (position 2)
  if (config.hasSubtitle) {
    fields.splice(2, 0, defineField({
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