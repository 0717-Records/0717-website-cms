// AI Helper: Debug utility to help test and troubleshoot anchor reference updates

import type { SanityClient } from 'sanity';

export class AnchorReferenceDebugger {
  private client: SanityClient;

  constructor(client: SanityClient) {
    this.client = client;
  }

  /**
   * Find all references to a specific document and anchor ID
   */
  async findAllReferences(documentId: string, anchorId?: string) {
    console.log(`🔍 Searching for references to document ${documentId}${anchorId ? ` with anchor ${anchorId}` : ''}`);
    
    // Get all documents that reference the target document
    const query = `*[references($documentId)]{
      _id,
      _type,
      title,
      content
    }`;

    const referencingDocs = await this.client.fetch(query, { documentId });
    console.log(`📄 Found ${referencingDocs.length} documents that reference ${documentId}`);

    const results: Array<{
      documentId: string;
      documentType: string;
      documentTitle: string;
      references: Array<{
        path: string;
        type: string;
        anchorId: string | null;
      }>;
    }> = [];

    for (const doc of referencingDocs) {
      const docReferences = this.findReferencesInContent(doc.content, documentId, '', anchorId);
      
      if (docReferences.length > 0 || !anchorId) {
        results.push({
          documentId: doc._id,
          documentType: doc._type,
          documentTitle: doc.title || 'Untitled',
          references: docReferences
        });
      }
    }

    console.log('🎯 Reference analysis results:', results);
    return results;
  }

  /**
   * Recursively find all references in content
   */
  private findReferencesInContent(
    content: unknown,
    targetDocId: string,
    basePath: string,
    filterAnchorId?: string
  ): Array<{ path: string; type: string; anchorId: string | null }> {
    if (!content || !Array.isArray(content)) return [];
    
    const references: Array<{ path: string; type: string; anchorId: string | null }> = [];
    
    content.forEach((item, index) => {
      if (!item || typeof item !== 'object') return;
      
      const typedItem = item as {
        _type?: string;
        internalLink?: { _ref?: string };
        pageSectionId?: string;
        content?: unknown;
        cards?: unknown[];
      };
      
      const currentPath = basePath ? `${basePath}[${index}]` : `content[${index}]`;
      
      // Check if this item references our target document
      if (typedItem.internalLink?._ref === targetDocId) {
        const anchorId = typedItem.pageSectionId || null;
        
        // If filtering by anchor ID, only include matches
        if (!filterAnchorId || anchorId === filterAnchorId) {
          references.push({
            path: currentPath,
            type: typedItem._type || 'unknown',
            anchorId
          });
        }
      }
      
      // Recursively check nested content
      if (typedItem.content) {
        references.push(
          ...this.findReferencesInContent(typedItem.content, targetDocId, `${currentPath}.content`, filterAnchorId)
        );
      }
      
      // Check cards array (for cardGrid)
      if (typedItem.cards && Array.isArray(typedItem.cards)) {
        references.push(
          ...this.findReferencesInContent(typedItem.cards, targetDocId, `${currentPath}.cards`, filterAnchorId)
        );
      }
    });
    
    return references;
  }

  /**
   * Get all sections from a document for reference
   */
  async getDocumentSections(documentId: string) {
    const query = `*[_id == $documentId][0]{
      _id,
      _type,
      title,
      content
    }`;
    
    const doc = await this.client.fetch(query, { documentId });
    if (!doc) return [];
    
    const sections = this.extractSections(doc.content);
    console.log(`📑 Found ${sections.length} sections in document ${documentId}:`, sections);
    return sections;
  }

  /**
   * Extract all sections with anchor IDs from content
   */
  private extractSections(content: unknown): Array<{ title: string; anchorId: string; type: string }> {
    if (!content || !Array.isArray(content)) return [];
    
    const sections: Array<{ title: string; anchorId: string; type: string }> = [];
    
    const processSections = (items: unknown[]) => {
      for (const item of items) {
        if (!item || typeof item !== 'object') continue;
        
        const section = item as {
          _type?: string;
          title?: string;
          anchorId?: string;
          content?: unknown;
        };
        
        if (
          section._type && 
          ['pageSection', 'subSection', 'subSubSection'].includes(section._type) &&
          section.anchorId && 
          section.title
        ) {
          sections.push({
            title: section.title,
            anchorId: section.anchorId,
            type: section._type
          });
        }
        
        // Process nested content
        if (section.content && Array.isArray(section.content)) {
          processSections(section.content);
        }
      }
    };
    
    processSections(content);
    return sections;
  }
}