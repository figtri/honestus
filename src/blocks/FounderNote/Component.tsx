'use client'

import React from 'react'
import Image from 'next/image'

interface FounderNoteBlockProps {
  title?: string
  content?: string
  quote?: string
  backgroundImage?: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
}

export const FounderNoteBlock: React.FC<FounderNoteBlockProps> = ({
  title,
  content,
  quote,
  backgroundImage,
}) => {
  if (!content) return null

  return (
    <div className="relative mb-24">
      {backgroundImage ? (
        <div
          className="relative h-72 md:h-96 w-full rounded-lg overflow-hidden shadow-xl border border-white/10 animate-fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      ) : (
        <div
          className="relative h-72 md:h-96 w-full rounded-lg overflow-hidden shadow-xl border border-white/10 animate-fade-in-up bg-gradient-to-br from-emerald-900/20 to-emerald-800/10"
          style={{ animationDelay: '600ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-lg p-6 md:p-8 backdrop-blur-md shadow-xl -mt-16 mx-auto max-w-2xl">
          {title && <h3 className="text-2xl font-semibold mb-3 text-emerald-300">{title}</h3>}
          <p className="text-lg text-gray-200 mb-4">{content}</p>
          {quote && <p className="text-md text-gray-400 italic">"{quote}"</p>}
        </div>
      </div>
    </div>
  )
}
