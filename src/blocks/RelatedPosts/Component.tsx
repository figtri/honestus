import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props
  const postCount = docs?.length || 0
  const titleText = postCount === 1 ? 'Related Post' : 'Related Posts'

  if (!docs || docs.length === 0) return null

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="max-w-[48rem] mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#e27145]">{titleText}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return <Card key={index} doc={doc} relationTo="posts" showCategories />
          })}
        </div>
      </div>
    </div>
  )
}
