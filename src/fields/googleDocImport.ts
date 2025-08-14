import type { Field } from 'payload'
import { extractFromGoogleDoc } from '@/utilities/googleDocImport'

export const googleDocImportField: Field = {
  name: 'googleDocImport',
  type: 'group',
  admin: {
    description: 'Import content from a Google Doc URL',
    position: 'sidebar',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Google Doc URL',
      admin: {
        description: 'Paste the URL of your Google Doc here',
      },
    },
    {
      name: 'importButton',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: {
            path: '@/fields/googleDocImport/GoogleDocImportButton',
          },
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ value, siblingData }) => {
        if (value?.url && !value?.imported) {
          try {
            const content = await extractFromGoogleDoc(value.url)
            const title = siblingData?.title || 'Untitled'

            // Create Lexical content without duplicating the title
            const lexicalContent = createLexicalContentWithoutTitle(content, title)

            // Update the content field
            siblingData.content = lexicalContent

            // Mark as imported
            value.imported = true
            value.importedAt = new Date().toISOString()

            return value
          } catch (error) {
            console.error('Failed to import Google Doc:', error)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            throw new Error(`Failed to import Google Doc: ${errorMessage}`)
          }
        }
        return value
      },
    ],
  },
}

// Helper function to create Lexical content without duplicating the title
function createLexicalContentWithoutTitle(content: string, title: string) {
  const paragraphs = content
    .replace(/#\w+/g, '') // Remove hashtags
    .replace(/\b(www\.[^\s]+)/g, '') // Remove www links
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10)

  const children: any[] = []

  // Add each paragraph
  paragraphs.forEach((paragraph) => {
    const trimmedParagraph = paragraph.trim()
    if (trimmedParagraph) {
      // Check if it's a heading (starts with # or is all caps and short)
      const isHeading =
        trimmedParagraph.startsWith('#') ||
        (trimmedParagraph.length < 100 && trimmedParagraph === trimmedParagraph.toUpperCase())

      if (isHeading) {
        // Remove # if present and create heading
        const headingText = trimmedParagraph.replace(/^#+\s*/, '')
        children.push({
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: headingText,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          tag: 'h2',
          version: 1,
        })
      } else {
        // Regular paragraph
        children.push({
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: trimmedParagraph,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          tag: 'p',
          version: 1,
        })
      }
    }
  })

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
