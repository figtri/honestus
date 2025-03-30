'use client'

import React from 'react'
import { LandingSections } from '@/components/LandingPage/LandingSections'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface Section {
  id: string
  title: string
  type: 'hero' | 'featured' | 'about' | 'cta'
  content: SerializedEditorState
  image?: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
  order: number
}

interface HomePageProps {
  sections: Section[]
}

export function HomePage({ sections }: HomePageProps) {
  return (
    <main className="min-h-screen">
      <LandingSections sections={sections} />
    </main>
  )
}
