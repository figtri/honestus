'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import { ArticleCard } from '@/components/ArticleCard'
import { SpotifyEmbed } from '@/components/SpotifyEmbed'
import { TestimonialsSection, Testimonial } from './TestimonialsSection'

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
  type: 'hero' | 'featured' | 'testimonials' | 'about' | 'cta' | 'articles' | 'spotify'
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
  testimonials?: Testimonial[]
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
            {/* Root decorative elements instead of figs */}
            <div className="absolute -bottom-16 -right-16 w-72 h-72 text-emerald-900/10">
              <RootDecoration className="w-full h-full rotate-45" />
            </div>
            <div className="absolute -top-16 -left-16 w-72 h-72 text-emerald-900/10">
              <RootDecoration className="w-full h-full -rotate-45" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-emerald-900/5 opacity-50">
              <RootDecoration className="w-full h-full" />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
            <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold text-white">{section.title}</h2>
                  <div className="h-1 w-20 bg-emerald-500/70 rounded-full mt-2"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href="/posts"
                    className="text-emerald-300 hover:text-white flex items-center text-lg font-medium transition-colors duration-300"
                  >
                    See More
                    <svg
                      className="ml-2 w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.featuredPosts &&
                  section.featuredPosts.length > 0 &&
                  section.featuredPosts.map((post, index) => {
                    // Determine the best image URL to use
                    const heroImageUrl = post.heroImage?.url
                    const metaImageUrl = post.meta?.image?.url
                    const placeholderUrl =
                      'https://placehold.co/600x400/2D4F3F/FFFFFF/png?text=No+Image'
                    const imageUrl = heroImageUrl || metaImageUrl || placeholderUrl

                    // Generate random reading time for demo purposes (would normally be calculated)
                    const readingTime = Math.floor(Math.random() * 20) + 5

                    return (
                      <Link
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="group rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative h-[250px] w-full overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={index < 3}
                          />
                          {/* Category badge */}
                          {post.categories && post.categories[0] && (
                            <div className="absolute top-4 left-4 z-10">
                              <span className="px-3 py-1 bg-orange-500/90 text-white text-xs uppercase tracking-wider rounded-full shadow-sm backdrop-blur-sm">
                                {post.categories[0].title}
                              </span>
                            </div>
                          )}

                          {/* Gradient overlay at the bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>

                        <div className="p-5 pl-5 flex flex-col flex-grow bg-white">
                          {/* Reading time and progress */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-gray-500 text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{readingTime} min read</span>
                            </div>
                            {/* Visual reading progress bar */}
                            <div className="w-16 h-1 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${Math.min(100, readingTime * 5)}%` }}
                              ></div>
                            </div>
                          </div>

                          <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                            {post.meta?.description ||
                              'Read this exciting interview to learn more about the fascinating insights shared by our guest.'}
                          </p>

                          <div className="flex items-center mt-2 text-orange-600 font-medium text-sm group-hover:text-orange-800 transition-colors duration-300">
                            <span>Read full interview</span>
                            <svg
                              className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>
        )

      case 'testimonials':
        return (
          <TestimonialsSection
            testimonials={
              section.testimonials || [
                {
                  id: '1',
                  quote:
                    'This is a placeholder testimonial. Please add real testimonials in the CMS.',
                  name: 'John Doe',
                  title: 'Customer',
                  initials: 'JD',
                },
              ]
            }
            bgColor={section.backgroundColor || '#e8e3ce'}
            title={section.title || 'Testimonials'}
          />
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
          <div
            className="py-16 relative overflow-hidden"
            style={{ backgroundColor: bgColor || '#f5f5f0' }}
          >
            {/* More natural-looking branch decorations */}
            <RootDecoration className="absolute -top-20 right-20 w-64 h-64 text-emerald-800/[0.04] rotate-30 transform scale-100" />
            <RootDecoration className="absolute -bottom-16 left-40 w-64 h-64 text-emerald-800/[0.03] -rotate-15 transform scale-100" />

            <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row md:items-center gap-16">
              <div className="flex md:w-1/2 md:max-w-xl items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                    Your Words, <br />
                    Our Witness
                  </h2>
                  <div className="mt-8 text-xl text-white">
                    <p>
                      Behind every face is a narrative worth preserving. <br />
                      Your experiences, challenges, and triumphs <br />
                      deserve to be heard and remembered.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center px-5 py-3 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-300"
                  >
                    SHARE YOUR STORY
                  </Link>
                </motion.div>
              </div>

              {section.image ? (
                <motion.div
                  className="md:w-1/2 h-[600px] max-w-[600px] relative"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Single branch beside image */}
                  <RootDecoration className="absolute -left-10 top-1/4 w-20 h-64 text-emerald-800/[0.05] -rotate-15" />

                  <div className="relative h-full">
                    <Image
                      unoptimized={true}
                      src={section.image.url}
                      alt={section.image.alt}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="md:w-1/2 relative bg-gray-200 h-[600px] max-w-[600px] rounded-sm"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Single branch beside placeholder */}
                  <RootDecoration className="absolute -left-10 top-1/4 w-20 h-64 text-emerald-800/[0.05] -rotate-15" />

                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Image placeholder
                  </div>
                </motion.div>
              )}
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
            {/* Root decorative elements instead of figs */}
            <div className="absolute -bottom-16 -right-16 w-72 h-72 text-emerald-900/10">
              <RootDecoration className="w-full h-full rotate-45" />
            </div>
            <div className="absolute -top-16 -left-16 w-72 h-72 text-emerald-900/10">
              <RootDecoration className="w-full h-full -rotate-45" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-emerald-900/5 opacity-50">
              <RootDecoration className="w-full h-full" />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
            <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold text-white">{section.title}</h2>
                  <div className="h-1 w-20 bg-emerald-500/70 rounded-full mt-2"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href="https://open.spotify.com/user/YOUR_SPOTIFY_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white flex items-center text-lg font-medium transition-colors duration-300"
                  >
                    Follow on Spotify
                    <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="prose prose-lg text-white max-w-2xl mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <RichText data={section.content} enableGutter={false} />
              </motion.div>

              {section.spotifyUrls && section.spotifyUrls.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                  }}
                >
                  {section.spotifyUrls.map((item, index) => {
                    // Handle both string URLs (from sample data) and object URLs (from CMS)
                    const url = typeof item === 'string' ? item : item.url
                    return (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-r from-emerald-800/50 to-emerald-800/30 border border-emerald-700/30 rounded-xl overflow-hidden shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 + (index % 3) * 0.1, // Stagger animation based on column position
                        }}
                      >
                        <div className="p-4">
                          <SpotifyEmbed spotifyUrl={url} />
                        </div>
                        <div className="px-4 pb-4 pt-1 flex justify-end">
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-300 hover:text-white flex items-center transition-colors duration-300"
                          >
                            Listen on Spotify
                            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </div>
          </div>
        )
    }
  }

  return renderSection()
}
