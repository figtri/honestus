'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}

  const imageToUse = heroImage || metaImage
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow duration-300 ease-in-out w-full cursor-pointer hover:scale-[1.01]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!imageToUse && (
          <div className="w-full aspect-[16/9] bg-muted flex items-center justify-center rounded-t-lg"></div>
        )}
        {imageToUse && typeof imageToUse !== 'string' && (
          <div className="aspect-[16/9] overflow-hidden">
            <Media resource={imageToUse} size="20vw" />
          </div>
        )}
        {imageToUse && typeof imageToUse === 'string' && (
          <div className="w-full aspect-[16/9] bg-muted overflow-hidden rounded-t-lg">
            <img
              src={imageToUse}
              alt={titleToUse || 'Post image'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
      </div>
      <div className="p-2.5">
        {showCategories && hasCategories && (
          <div className="uppercase text-xs mb-2">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose prose-sm max-w-none">
            <h4 className="text-base mt-0 mb-1">
              <Link
                className="not-prose transition-colors duration-200 hover:text-[#e27145]"
                href={href}
                ref={link.ref}
              >
                {titleToUse}
              </Link>
            </h4>
          </div>
        )}
        {description && (
          <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            <p className="m-0">{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
