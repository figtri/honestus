'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import { ArticleCard } from '@/components/ArticleCard'
import { SpotifyEmbed } from '@/components/SpotifyEmbed'

// Fig Tree SVG elements for the decorative design elements
const FigLeafDecoration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
    <path d="M50,3C27.4,3,9,21.4,9,44c0,22.6,18.4,41,41,41s41-18.4,41-41C91,21.4,72.6,3,50,3z M75.4,43.5c-1.4,4.2-4.2,7.6-8,9.9 c-3.8,2.3-8.1,3-12.4,2.2c-1.2-0.2-2.1-1.1-2.3-2.3c-0.2-1.2,0.5-2.4,1.6-2.8c5.5-2.2,9.4-7.3,10.1-13.1c0.1-1.2,1.1-2.1,2.3-2.2 c1.2-0.1,2.3,0.6,2.6,1.8C70.2,40.5,73,42.4,75.4,43.5z" />
  </svg>
)

const RootDecoration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
    <path d="M50,95c-1.1,0-2-0.9-2-2V15c0-1.1,0.9-2,2-2s2,0.9,2,2v78C52,94.1,51.1,95,50,95z" />
    <path d="M60,85c-0.3,0-0.5-0.1-0.8-0.2c-1-0.4-1.4-1.6-1-2.6C69.3,58.5,62.4,37.8,60,30c-0.3-1.1,0.3-2.2,1.4-2.5c1.1-0.3,2.2,0.3,2.5,1.4c0.1,0.3,7.7,22.1-4.1,54.4C61.5,84.5,60.8,85,60,85z" />
    <path d="M40,85c-0.8,0-1.5-0.5-1.8-1.2c-11.8-32.3-4.2-54.1-4.1-54.4c0.3-1.1,1.4-1.7,2.5-1.4c1.1,0.3,1.7,1.4,1.4,2.5c-2.4,7.8-9.3,28.5,1.8,52.1c0.4,1,0,2.2-1,2.6C40.5,84.9,40.3,85,40,85z" />
  </svg>
)

export interface Section {
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

export const LandingSection: React.FC<{ section: Section }> = ({ section }) => {
  const bgColor = section.backgroundColor || '#2D4F3F' // Default to a fig tree green

  // Common decorative elements for fig tree aesthetic
  const decorativeElements = (
    <>
      <FigLeafDecoration className="text-emerald-900/10 absolute -bottom-12 -right-12 w-64 h-64 rotate-45" />
      <FigLeafDecoration className="text-emerald-900/10 absolute -top-12 -left-12 w-64 h-64 -rotate-45" />
      <RootDecoration className="text-emerald-900/10 absolute -bottom-8 left-1/2 w-40 h-40 -translate-x-1/2" />
    </>
  )

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div
            className="min-h-[100vh] relative overflow-hidden flex items-center"
            style={{ backgroundColor: bgColor }}
          >
            {/* Full background image with clean animation */}
            {section.image && (
              <motion.div
                className="absolute inset-0 w-full h-full z-0"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <Image
                  src={section.image.url}
                  alt={section.image.alt}
                  fill
                  className="object-cover scale-60 object-center"
                  priority
                />

                {/* Simple vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.3)_100%)]"></div>
              </motion.div>
            )}

            {/* Content container with improved layout */}
            <div className="container mx-auto px-6 py-16 z-20 relative">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {section.title}
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-4 w-32" />
                </motion.h1>

                <motion.div
                  className="prose prose-lg prose-invert prose-a:text-emerald-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-emerald-200 mb-12 max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <RichText data={section.content} enableGutter={false} />
                </motion.div>

                {/* Simplified CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    href="/posts"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full text-lg font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-lg"
                  >
                    <span className="flex items-center">
                      Explore
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )

      case 'featured':
        return (
          <div className="py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
            {decorativeElements}

            <div className="container mx-auto px-4 relative z-10">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {section.title}
              </motion.h2>

              <motion.div
                className="prose prose-lg text-white max-w-none prose-headings:text-emerald-200 prose-a:text-emerald-300 prose-strong:text-emerald-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <RichText data={section.content} enableGutter={false} />
              </motion.div>

              {/* Decorative roots at the bottom */}
              <div className="h-12 relative overflow-hidden mt-16">
                <RootDecoration className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 text-emerald-700/20" />
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
            {decorativeElements}

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
              {section.image && (
                <motion.div
                  className="md:w-1/2 relative"
                  initial={{ opacity: 0, x: -60, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative overflow-hidden rounded-full border-4 border-emerald-600/30 shadow-xl">
                    <Image
                      src={section.image.url}
                      alt={section.image.alt}
                      width={section.image.width || 500}
                      height={section.image.height || 500}
                      className="rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent mix-blend-multiply"></div>
                  </div>

                  {/* Decorative fig leaves */}
                  <FigLeafDecoration className="absolute -top-8 -right-8 w-32 h-32 rotate-45 text-emerald-700/30" />
                  <FigLeafDecoration className="absolute -bottom-8 -left-8 w-32 h-32 -rotate-45 text-emerald-700/30" />
                </motion.div>
              )}

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white prose-headings:text-emerald-200 prose-a:text-emerald-300 prose-strong:text-emerald-100">
                  <RichText data={section.content} enableGutter={false} />
                </div>
              </motion.div>
            </div>
          </div>
        )

      case 'cta':
        return (
          <div className="py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
            {decorativeElements}

            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white mx-auto prose-headings:text-emerald-200 prose-a:text-emerald-300 prose-strong:text-emerald-100">
                  <RichText data={section.content} enableGutter={false} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg"
                  >
                    Get Started
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )

      case 'articles':
        return (
          <div className="py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
            {decorativeElements}

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white mx-auto max-w-2xl">
                  <RichText data={section.content} enableGutter={false} />
                </div>
              </motion.div>

              {section.articles && section.articles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.articles.map((article, index) => (
                    <React.Fragment key={index}>
                      {article && (
                        <ArticleCard
                          title={article.title}
                          description={article.description}
                          imageUrl={article.imageUrl}
                          category={article.category}
                          slug={article.slug}
                          priority={index < 3}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-colors duration-300 border border-white/20"
                >
                  View All Articles
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        )

      case 'spotify':
        return (
          <div className="py-20 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
            {decorativeElements}

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white mx-auto max-w-2xl">
                  <RichText data={section.content} enableGutter={false} />
                </div>
              </motion.div>

              {section.spotifyUrls && section.spotifyUrls.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.spotifyUrls.map((item, index) => {
                    // Handle both string URLs (from sample data) and object URLs (from CMS)
                    const url = typeof item === 'string' ? item : item.url
                    return (
                      <React.Fragment key={index}>
                        {url && (
                          <SpotifyEmbed
                            spotifyUrl={url}
                            className="bg-emerald-800/50 border border-emerald-700/30 p-4"
                          />
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              )}

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="https://open.spotify.com/user/YOUR_SPOTIFY_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#1DB954] text-white rounded-full text-lg font-medium hover:bg-[#1ED760] transition-colors duration-300"
                >
                  Follow on Spotify
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        )
    }
  }

  return renderSection()
}
