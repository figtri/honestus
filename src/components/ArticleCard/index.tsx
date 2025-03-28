'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { Post } from '@/payload-types'

type ArticleCardProps = {
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  category?: string
  slug: string
  className?: string
  priority?: boolean
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt = 'Article image',
  category,
  slug,
  className,
  priority = false,
}) => {
  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-900/80 to-emerald-700/40 backdrop-blur-sm border border-emerald-600/30',
        'transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/20',
        'flex flex-col h-full',
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Decorative fig leaf elements */}
      <div className="absolute -right-8 -top-8 w-24 h-24 opacity-10 rotate-45">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-emerald-200 w-full h-full">
          <path d="M50,3C27.4,3,9,21.4,9,44c0,22.6,18.4,41,41,41s41-18.4,41-41C91,21.4,72.6,3,50,3z M75.4,43.5c-1.4,4.2-4.2,7.6-8,9.9 c-3.8,2.3-8.1,3-12.4,2.2c-1.2-0.2-2.1-1.1-2.3-2.3c-0.2-1.2,0.5-2.4,1.6-2.8c5.5-2.2,9.4-7.3,10.1-13.1c0.1-1.2,1.1-2.1,2.3-2.2 c1.2-0.1,2.3,0.6,2.6,1.8C70.2,40.5,73,42.4,75.4,43.5z" />
        </svg>
      </div>

      {/* Image section */}
      <div className="relative w-full pt-[60%] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-800/50">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-emerald-200/60">
              <path
                d="M50,3C27.4,3,9,21.4,9,44c0,22.6,18.4,41,41,41s41-18.4,41-41C91,21.4,72.6,3,50,3z M75.4,43.5c-1.4,4.2-4.2,7.6-8,9.9 c-3.8,2.3-8.1,3-12.4,2.2c-1.2-0.2-2.1-1.1-2.3-2.3c-0.2-1.2,0.5-2.4,1.6-2.8c5.5-2.2,9.4-7.3,10.1-13.1c0.1-1.2,1.1-2.1,2.3-2.2 c1.2-0.1,2.3,0.6,2.6,1.8C70.2,40.5,73,42.4,75.4,43.5z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}

        {/* Category tag */}
        {category && (
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-700/90 text-emerald-50 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-6 flex flex-col flex-grow">
        <Link
          href={`/posts/${slug}`}
          className="group-hover:underline decoration-emerald-400 underline-offset-4"
        >
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        </Link>

        {description && (
          <p className="text-emerald-100/80 text-sm mb-4 line-clamp-3">{description}</p>
        )}

        <div className="mt-auto">
          <Link
            href={`/posts/${slug}`}
            className="inline-flex items-center text-emerald-200 text-sm font-medium transition-colors hover:text-white"
          >
            Read more
            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export const getArticleCardPropsFromPost = (post: Post): ArticleCardProps => {
  return {
    title: post.title || 'Untitled',
    description: post.meta?.description ?? undefined,
    imageUrl:
      typeof post.meta?.image === 'object' ? (post.meta.image?.url ?? undefined) : undefined,
    imageAlt:
      typeof post.meta?.image === 'object' ? (post.meta.image?.alt ?? undefined) : 'Article image',
    category:
      Array.isArray(post.categories) &&
      post.categories.length > 0 &&
      typeof post.categories[0] === 'object'
        ? (post.categories[0].title ?? undefined)
        : undefined,
    slug: post.slug || '',
  }
}
