import React from 'react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { LandingSections } from '@/components/LandingPage/LandingSections'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingSection } from '@/components/LandingPage'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

interface Section {
  id: string
  title: string
  type: 'hero' | 'featured' | 'about' | 'cta' | 'articles' | 'spotify'
  content: SerializedEditorState
  image?: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
  backgroundColor?: string
  order: number
  spotifyUrls?: (string | { url: string })[]
  articles?: {
    title: string
    description?: string
    imageUrl?: string
    slug: string
    category?: string
  }[]
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Honestus featuring articles, interviews and more.',
  openGraph: mergeOpenGraph({
    title: 'Home',
    description: 'Welcome to Honestus featuring articles, interviews and more.',
  }),
}

// Sample data for demonstration purposes
const sampleSections = [
  {
    id: 'hero',
    title: 'Exploring Deep Roots & New Growth',
    type: 'hero',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Welcome to my world of ideas, where we explore the interconnections between personal growth, mindfulness, and our relationship with nature. Like the fig tree with its deep roots and sweet fruit, we find our strength in staying grounded while reaching for the light.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    image: {
      url: 'https://images.unsplash.com/photo-1628640816921-aecaea5015ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Fig tree with sunlight filtering through its leaves',
      width: 1200,
      height: 800,
    },
    backgroundColor: '#2D4F3F',
    order: 1,
  },
  {
    id: 'about',
    title: 'About Me',
    type: 'about',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "I'm passionate about exploring the connections between mindfulness, personal growth, and our relationship with the natural world. Through my writing and conversations, I hope to inspire reflection and a deeper appreciation for the world around us.",
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Like the fig tree, which produces sweet fruit while its roots reach deep into the earth, my work aims to nourish while remaining grounded in authentic experiences and meaningful connections.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    image: {
      url: 'https://images.unsplash.com/photo-1623957084601-29a1b2c48500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      alt: 'Portrait photograph',
      width: 800,
      height: 800,
    },
    backgroundColor: '#1F3B2F',
    order: 2,
  },
  {
    id: 'articles',
    title: 'Latest Articles',
    type: 'articles',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Explore my recent thoughts on mindfulness, growth, and our connection to nature. Each article offers insights and practical wisdom for your journey.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    backgroundColor: '#2A4539',
    order: 3,
    articles: [
      {
        title: 'The Wisdom of Fig Trees: Lessons from Nature',
        description:
          'What fig trees can teach us about patience, resilience, and the importance of strong roots in our fast-paced world.',
        imageUrl:
          'https://images.unsplash.com/photo-1592598013545-20ad31027143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        slug: 'wisdom-of-fig-trees',
        category: 'Nature',
      },
      {
        title: 'Mindfulness in the Digital Age',
        description:
          'How to stay present and grounded in a world of constant notifications and digital distractions.',
        imageUrl:
          'https://images.unsplash.com/photo-1515816052601-210d5501d471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        slug: 'mindfulness-digital-age',
        category: 'Mindfulness',
      },
      {
        title: 'Finding Your Roots: The Power of Connection',
        description:
          'Exploring how our connections to people, places, and purpose give us strength and stability in uncertain times.',
        imageUrl:
          'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        slug: 'finding-your-roots',
        category: 'Personal Growth',
      },
    ],
  },
  {
    id: 'spotify',
    title: 'Listen to Conversations',
    type: 'spotify',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Join me for thoughtful conversations with experts, artists, and thinkers exploring themes of growth, creativity, and our connection to the natural world.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    backgroundColor: '#152A20',
    order: 4,
    spotifyUrls: [
      'https://open.spotify.com/embed/episode/1oYUMrg3pp23Cl2X25mqjq',
      'https://open.spotify.com/embed/episode/5vqRJfzC5VNPwiTQEzD5RL',
    ],
  },
  {
    id: 'cta',
    title: 'Join the Community',
    type: 'cta',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Connect with like-minded individuals who are passionate about personal growth, mindfulness, and our relationship with nature. Sign up for my newsletter to receive updates, exclusive content, and invitations to special events.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    backgroundColor: '#2D4F3F',
    order: 5,
  },
] as unknown as Section[]

export default async function Home() {
  // Fetch landing sections from the CMS
  const { isEnabled } = await draftMode()
  const config = await configPromise
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'landing-sections',
      limit: 100,
      sort: 'order',
      draft: isEnabled,
    })

    if (!result.docs || result.docs.length === 0) {
      // Fallback to sample data if no landing sections are found
      const orderedSections = sampleSections.sort((a, b) => a.order - b.order)

      return (
        <main>
          {orderedSections.map((section) => (
            <LandingSection key={section.id} section={section} />
          ))}
        </main>
      )
    }

    // Transform CMS data to match the Section interface
    const sections = result.docs.map((doc) => ({
      id: String(doc.id), // Convert id to string
      title: doc.title,
      type: doc.type as Section['type'],
      content: doc.content,
      image: doc.image
        ? {
            url: typeof doc.image === 'object' ? doc.image.url : '',
            alt: typeof doc.image === 'object' ? doc.image.alt : 'Section image',
            width: typeof doc.image === 'object' ? doc.image.width : null,
            height: typeof doc.image === 'object' ? doc.image.height : null,
          }
        : undefined,
      backgroundColor: doc.backgroundColor || '#2D4F3F',
      order: doc.order,
      spotifyUrls: doc.spotifyUrls || [],
      articles: doc.articles || [],
    })) as Section[]

    return (
      <main>
        {sections.map((section) => (
          <LandingSection key={section.id} section={section} />
        ))}
      </main>
    )
  } catch (error) {
    console.error('Error fetching landing sections:', error)
    return notFound()
  }
}

export const dynamic = 'force-dynamic'
