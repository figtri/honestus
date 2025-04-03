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

  // Handle click to open Spotify in a new tab
  const handleClick = () => {
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className={cn('rounded-xl overflow-hidden shadow-lg', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>}
      <div className="relative cursor-pointer" onClick={handleClick}>
        {/* The iframe */}
        <div className="pointer-events-none">
          <iframe
            src={getEmbedUrl(spotifyUrl)}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>

        {/* Overlay with "Play on Spotify" button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>Play on Spotify</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
