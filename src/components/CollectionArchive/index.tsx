import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media, Category } from '@/payload-types'

export type Props = {
  posts: {
    id: number
    title: string
    slug: string | null
    heroImage?: number | Media | null
    meta?: {
      title?: string | null
      description?: string | null
      image?: number | Media | null
    }
    categories?: (number | Category)[] | null
    readingTime?: number | null
  }[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts?.map((post, index) => {
          if (!post.slug) return null

          // Determine the best image URL to use
          const heroImageUrl = typeof post.heroImage === 'object' ? post.heroImage?.url : undefined
          const metaImageUrl =
            typeof post.meta?.image === 'object' ? post.meta.image?.url : undefined
          const placeholderUrl = 'https://placehold.co/600x400/2D4F3F/FFFFFF/png?text=No+Image'
          const imageUrl = heroImageUrl || metaImageUrl || placeholderUrl

          // Get category title
          const category = post.categories?.find((cat) => typeof cat === 'object') as
            | Category
            | undefined

          return (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative bg-white"
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
                {category && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-orange-500/90 text-white text-xs uppercase tracking-wider rounded-full shadow-sm backdrop-blur-sm">
                      {category.title}
                    </span>
                  </div>
                )}

                {/* Gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="relative p-5 pl-5 flex flex-col flex-grow bg-white">
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
                    <span>{post.readingTime || 5} min read</span>
                  </div>
                  {/* Visual reading progress bar */}
                  <div className="w-16 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${Math.min(100, (post.readingTime || 5) * 5)}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="relative z-20 font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="relative z-20 text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {post.meta?.description ||
                    'Read this exciting interview to learn more about the fascinating insights shared by our guest.'}
                </p>

                <div className="relative z-20 flex items-center mt-2 text-orange-600 font-medium text-sm group-hover:text-orange-800 transition-colors duration-300">
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
  )
}
