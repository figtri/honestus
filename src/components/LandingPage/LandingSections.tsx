'use client'

import React from 'react'
import { LandingSection } from '.'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface Section {
  id: string
  title: string
  type: 'hero' | 'featured' | 'about' | 'cta' | 'articles' | 'spotify' | 'testimonials'
  content: SerializedEditorState
  image?: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
  order: number
  spotifyUrls?: (string | { url: string })[]
  featuredPosts?: {
    id: string
    title: string
    slug: string
    heroImage?: {
      url: string
      alt: string
      width?: number | null
      height?: number | null
    }
    meta?: {
      description?: string
      image?: {
        url: string
        alt: string
      }
    }
    categories?: {
      id: string
      title: string
    }[]
  }[]
  articles?: {
    title: string
    description?: string
    imageUrl?: string
    slug: string
    category?: string
  }[]
}

interface LandingSectionsProps {
  sections: Section[]
}

export function LandingSections({ sections }: LandingSectionsProps) {
  // Sort sections in a specific order
  const sortedSections = [...sections].sort((a, b) => {
    // First handle hero section (always first)
    if (a.type === 'hero') return -1
    if (b.type === 'hero') return 1

    // Then featured section (second)
    if (a.type === 'featured') return -1
    if (b.type === 'featured') return 1

    // Then spotify section (third)
    if (a.type === 'spotify') return -1
    if (b.type === 'spotify') return 1

    // Then cta section (fourth)
    if (a.type === 'cta') return -1
    if (b.type === 'cta') return 1

    // Then testimonials section (fifth)
    if (a.type === 'testimonials') return -1
    if (b.type === 'testimonials') return 1

    // For any other sections, use the order value
    return a.order - b.order
  })

  return (
    <>
      {sortedSections.map((section) => (
        <LandingSection key={section.id} section={section} />
      ))}
    </>
  )
}
