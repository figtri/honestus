import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const { title, content, slug, publishedAt, description, category } = await req.json()

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      )
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
        { status: 404 }
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

    // Create simple content structure
    const contentStructure = {
      root: {
        type: 'root',
        children: [
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
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: content,
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
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
        content: contentStructure,
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
      { error: 'Failed to create blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to add a new blog post',
    example: {
      title: 'Your Blog Post Title',
      content: 'Your blog post content here...',
      slug: 'your-blog-post-slug',
      publishedAt: '2024-01-15T00:00:00.000Z', // optional
      description: 'SEO description for your post', // optional
      category: 'Personal Stories', // optional
    },
    instructions: [
      'Copy content from Google Docs',
      'Paste into the content field',
      'Add a title and slug',
      'Optionally add description and category',
      'Submit to create the blog post'
    ]
  })
}
