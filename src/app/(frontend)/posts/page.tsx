import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import type { Props as CollectionArchiveProps } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      readingTime: true,
    },
  })

  return (
    <div className="py-20 relative overflow-hidden" style={{ backgroundColor: '#152A20' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3d2b] to-[#152A20]"></div>
      <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>

      <PageClient />
      <div className="container relative z-10 mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white">Posts</h1>
          <div className="h-1 w-20 bg-emerald-500/70 rounded-full mt-2"></div>
        </div>
      </div>

      <div className="container relative z-10 mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs as CollectionArchiveProps['posts']} />

      <div className="container relative z-10">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
