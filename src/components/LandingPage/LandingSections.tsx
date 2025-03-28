'use client'

import React from 'react'
import { LandingSection } from '.'
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
  backgroundColor?: string
  order: number
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
