// AI Helper: Debug action to help troubleshoot anchor reference issues

import { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'
import { AnchorReferenceDebugger } from '../lib/debugAnchorReferences'

export const DebugAnchorReferencesAction: DocumentActionComponent = (props) => {
  const { id, type } = props
  const client = useClient()

  // Only show this action for documents that contain sections
  const validTypes = ['page', 'homePage', 'eventsIndexPage', 'collab']
  if (!validTypes.includes(type)) {
    return null
  }

  const debugTool = new AnchorReferenceDebugger(client)

  return {
    label: 'Debug References',
    icon: () => '🔍',
    tone: 'primary',
    onHandle: async () => {
      try {
        console.log('=== ANCHOR REFERENCE DEBUG REPORT ===')
        
        // Get all sections in this document
        const sections = await debugTool.getDocumentSections(id)
        
        if (sections.length === 0) {
          alert('No sections found in this document')
          return
        }
        
        // Find all references to this document
        const allReferences = await debugTool.findAllReferences(id)
        
        // Create detailed report
        let report = `ANCHOR REFERENCE DEBUG REPORT\n`
        report += `Document: ${id}\n`
        report += `Sections found: ${sections.length}\n\n`
        
        sections.forEach((section, i) => {
          report += `${i + 1}. ${section.title} (${section.anchorId})\n`
        })
        
        report += `\nDocuments referencing this page: ${allReferences.length}\n\n`
        
        allReferences.forEach((ref, i) => {
          report += `${i + 1}. ${ref.documentTitle} (${ref.documentType})\n`
          ref.references.forEach((r, j) => {
            report += `   ${j + 1}. ${r.path} (${r.type}) -> anchor: ${r.anchorId || 'none'}\n`
          })
          report += '\n'
        })
        
        console.log(report)
        
        // Show summary in alert
        const summary = `Found ${sections.length} sections and ${allReferences.reduce((sum, ref) => sum + ref.references.length, 0)} references across ${allReferences.length} documents.\n\nCheck the browser console for detailed report.`
        alert(summary)
        
      } catch (error) {
        console.error('Debug failed:', error)
        alert(`Debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }
}