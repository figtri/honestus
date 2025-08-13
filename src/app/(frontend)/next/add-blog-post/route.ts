import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Helper function to clean and format content from Google Doc
function cleanAndFormatContent(content: string) {
  // Remove hashtags and links
  let cleaned = content
    .replace(/#\w+/g, '') // Remove hashtags
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\b(www\.[^\s]+)/g, '') // Remove www links
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Split by periods and create paragraphs
  const sentences = cleaned.split(/\.\s+/).map(s => s.trim()).filter(s => s.length > 10)
  
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
    const parts = cleaned.split(/\s+(However|But|And|Or|So|Yet|Still|Also|Additionally|Moreover|Furthermore|Meanwhile|Therefore|Consequently|Thus|Hence|As a result|For example|For instance|In fact|Indeed|Clearly|Obviously|Evidently|Apparently|Seemingly|Presumably|Supposedly|Allegedly|Reportedly)\s+/i)
    
    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.length > 50) {
        paragraphs.push(trimmed)
      }
    }
  }
  
  return paragraphs
}

// Helper function to extract content from Google Doc URL
async function extractFromGoogleDoc(url: string) {
  try {
    // Convert Google Doc URL to export format
    const docId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    if (!docId) {
      throw new Error('Invalid Google Doc URL')
    }

    // Try to get the content via Google Docs API or scraping
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`

    const response = await fetch(exportUrl)
    if (!response.ok) {
      throw new Error('Could not access Google Doc')
    }

    const content = await response.text()
    return content.trim()
  } catch (error) {
    console.error('Error extracting from Google Doc:', error)
    throw new Error(
      'Failed to extract content from Google Doc. Please copy and paste the content manually.',
    )
  }
}

// Helper function to convert plain text to Lexical format
function createLexicalContent(content: string, title: string) {
  // Clean and format the content
  const paragraphs = cleanAndFormatContent(content)

  const children = [
    // Title heading
    {
      type: 'heading',
      children: [
        {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: title,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      tag: 'h1',
      version: 1,
    },
  ]

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

export async function POST(req: NextRequest) {
  try {
    const { title, content, slug, publishedAt, description, category, googleDocUrl } =
      await req.json()

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    let finalContent = content

    // If Google Doc URL is provided, extract content from it
    if (googleDocUrl && !content) {
      try {
        finalContent = await extractFromGoogleDoc(googleDocUrl)
      } catch (error) {
        return NextResponse.json(
          {
            error:
              'Failed to extract content from Google Doc. Please copy and paste the content manually.',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 400 },
        )
      }
    }

    if (!finalContent) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Get the demo author
    const { docs: authors } = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'demo-author@example.com',
        },
      },
    })

    if (!authors?.[0]) {
      return NextResponse.json(
        { error: 'Demo author not found. Please run the seed script first.' },
        { status: 404 },
      )
    }

    // Get or create category if provided
    let categoryId = null
    if (category) {
      const { docs: categories } = await payload.find({
        collection: 'categories',
        where: {
          title: {
            equals: category,
          },
        },
      })

      if (categories?.[0]) {
        categoryId = categories[0].id
      } else {
        // Create new category
        const newCategory = await payload.create({
          collection: 'categories',
          data: {
            title: category,
            breadcrumbs: [
              {
                label: category,
                url: `/${category.toLowerCase().replace(/\s+/g, '-')}`,
              },
            ],
          },
        })
        categoryId = newCategory.id
      }
    }

    // Create the blog post
    const post = await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        _status: 'published',
        authors: [authors[0].id],
        categories: categoryId ? [categoryId] : [],
        publishedAt: publishedAt || new Date().toISOString(),
        meta: {
          title,
          description: description || `Read about ${title}`,
        },
        content: createLexicalContent(finalContent, title),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        url: `/posts/${post.slug}`,
      },
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      {
        error: 'Failed to create blog post',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to add a new blog post',
    example: {
      title: 'Your Blog Post Title',
      googleDocUrl: 'https://docs.google.com/document/d/YOUR_DOC_ID/edit',
      slug: 'your-blog-post-slug',
      publishedAt: '2024-01-15T00:00:00.000Z', // optional
      description: 'SEO description for your post', // optional
      category: 'Personal Stories', // optional
    },
    instructions: [
      'Paste your Google Doc URL',
      'Add a title and slug',
      'Optionally add description and category',
      'Submit to create the blog post',
    ],
  })
}
