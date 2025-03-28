'use client'

import React from 'react'
import { LandingSection } from '.'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

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

interface LandingSectionsProps {
  sections: Section[]
}

export function LandingSections({ sections }: LandingSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <LandingSection key={section.id} section={section} />
      ))}
    </>
  )
}
