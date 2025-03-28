'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'

interface SpotifyEmbedProps {
  spotifyUrl: string
  title?: string
  className?: string
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ spotifyUrl, title, className }) => {
  // Extract Spotify URI from URL
  const getEmbedUrl = (url: string) => {
    // Handle different Spotify URL formats
    if (url.includes('spotify.com')) {
      // Convert spotify.com URLs to embed format
      return url.replace('spotify.com', 'spotify.com/embed')
    }
    return url
  }

  return (
    <motion.div
      className={cn('rounded-xl overflow-hidden shadow-lg', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>}
      <iframe
        src={getEmbedUrl(spotifyUrl)}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
      />
    </motion.div>
  )
}
