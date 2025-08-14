// Helper function to extract content from Google Doc URL
export async function extractFromGoogleDoc(url: string) {
  try {
    const docId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    if (!docId) {
      throw new Error('Invalid Google Doc URL')
    }

    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`

    const response = await fetch(exportUrl)
    if (!response.ok) {
      throw new Error('Could not access Google Doc')
    }

    const content = await response.text()
    return content.trim()
  } catch (error) {
    console.error('Error extracting from Google Doc:', error)
    throw new Error('Failed to extract content from Google Doc')
  }
}

// Helper function to clean and format content from Google Doc
export function cleanAndFormatContent(content: string) {
  const cleaned = content
    .replace(/#\w+/g, '') // Remove hashtags
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\b(www\.[^\s]+)/g, '') // Remove www links
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Split by periods and create paragraphs
  const sentences = cleaned
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10)

  const paragraphs = []
  let currentParagraph = []

  for (const sentence of sentences) {
    // Skip very short sentences that are likely headers
    if (sentence.length < 20 && sentence.match(/^[A-Z\s]+$/)) {
      continue
    }

    currentParagraph.push(sentence)

    // Create a new paragraph every 2-3 sentences
    if (currentParagraph.length >= 2) {
      const paragraphText = currentParagraph.join('. ') + '.'
      if (paragraphText.length > 30) {
        paragraphs.push(paragraphText)
      }
      currentParagraph = []
    }
  }

  // Add any remaining sentences as the last paragraph
  if (currentParagraph.length > 0) {
    const paragraphText = currentParagraph.join('. ') + '.'
    if (paragraphText.length > 30) {
      paragraphs.push(paragraphText)
    }
  }

  // If we still don't have paragraphs, split by common phrases
  if (paragraphs.length <= 1) {
    const parts = cleaned.split(
      /\s+(However|But|And|Or|So|Yet|Still|Also|Additionally|Moreover|Furthermore|Meanwhile|Therefore|Consequently|Thus|Hence|As a result|For example|For instance|In fact|Indeed|Clearly|Obviously|Evidently|Apparently|Seemingly|Presumably|Supposedly|Allegedly|Reportedly)\s+/i,
    )

    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.length > 50) {
        paragraphs.push(trimmed)
      }
    }
  }

  return paragraphs
}

// Helper function to convert plain text to Lexical format
export function createLexicalContent(content: string, title: string) {
  const paragraphs = cleanAndFormatContent(content)

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
