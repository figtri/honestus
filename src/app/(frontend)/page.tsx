import React from 'react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
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
  backgroundColor?: string
  order: number
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const sections = await payload.find({
    collection: 'landing-sections',
    sort: 'order',
    draft,
    depth: 1,
  })

  const formattedSections = sections.docs.map((section) => {
    const mediaImage = section.image && typeof section.image === 'object' ? section.image : null
    const image =
      mediaImage && mediaImage.url
        ? {
            url: mediaImage.url,
            alt: mediaImage.alt || '',
            width: mediaImage.width,
            height: mediaImage.height,
          }
        : undefined

    return {
      id: String(section.id),
      title: section.title,
      type: section.type,
      content: section.content,
      backgroundColor: section.backgroundColor || undefined,
      order: section.order,
      image,
    }
  })

  return (
    <main className="min-h-screen">
      <LandingSections sections={formattedSections} />
    </main>
  )
}

export const dynamic = 'force-dynamic'
