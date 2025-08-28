// AI Helper: This is a custom Sanity input component for anchor ID fields with a working Generate button.

import React, { useState, useCallback } from 'react';
import { StringInputProps, set, unset, useFormValue } from 'sanity';

interface SectionData {
  _type: string;
  _key?: string;
  title?: string;
  anchorId?: string;
  content?: SectionData[];
}

interface ExtendedProps extends StringInputProps {
  parent?: SectionData;
  document?: {
    content?: SectionData[];
  };
}

export const AnchorIdInput = (props: ExtendedProps) => {
  const { value, onChange, schemaType, elementProps, path } = props;
  const [isGenerating, setIsGenerating] = useState(false);

  // Use Sanity's useFormValue to get the parent section data
  const document = useFormValue([]) as { content?: SectionData[] }; // Get the entire document
  
  // Get the parent path by removing the last segment (which is 'anchorId')
  const parentPath = path.slice(0, -1);
  const parent = useFormValue(parentPath) as SectionData; // Get the parent section

  const generateFromTitle = useCallback(() => {
    setIsGenerating(true);
    
    const title = parent?.title;
    
    if (title) {
      const generated = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Remove duplicate hyphens
        .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
        .slice(0, 50);
      
      // Check for duplicates and auto-increment
      if (document?.content) {
        const getAllSections = (content: SectionData[]): SectionData[] => {
          const sections: SectionData[] = [];
          for (const item of content || []) {
            if (item._type === 'pageSection' || item._type === 'subSection' || item._type === 'subSubSection') {
              sections.push(item);
              if (item.content) {
                sections.push(...getAllSections(item.content));
              }
            }
          }
          return sections;
        };
        
        const allSections = getAllSections(document.content);
        const currentSection = parent;
        
        // Find existing anchor IDs to avoid duplicates
        const existingIds = allSections
          .filter(section => section._key !== currentSection?._key)
          .map(section => section.anchorId)
          .filter(Boolean);
        
        let finalId = generated;
        let counter = 1;
        
        // Keep incrementing until we find a unique ID
        while (existingIds.includes(finalId)) {
          counter++;
          finalId = `${generated}-${counter}`;
        }
        
        onChange(finalId ? set(finalId) : unset());
      } else {
        onChange(generated ? set(generated) : unset());
      }
    } else {
      // Fallback if no title is available
      const demoId = `section-${Date.now()}`;
      onChange(set(demoId));
    }
    
    setIsGenerating(false);
  }, [parent, document, onChange]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          {...elementProps}
          type="text"
          value={value || ''}
          placeholder={schemaType?.placeholder || 'e.g., about-our-services'}
          onChange={(e) => onChange(e.target.value ? set(e.target.value) : unset())}
          style={{
            flex: 1,
            padding: '10px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        />
        <button
          type="button"
          onClick={generateFromTitle}
          disabled={isGenerating}
          style={{
            padding: '10px 16px',
            backgroundColor: isGenerating ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {value && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px', 
          color: '#6b7280',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        }}>
          Will create link: <strong>#{value}</strong>
        </div>
      )}
    </div>
  );
};