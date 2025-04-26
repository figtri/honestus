import type { Metadata } from 'next/types'

import { CollectionArchive, type Props } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    sort: '-publishedAt',
    overrideAccess: false,
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

      <CollectionArchive posts={posts.docs as unknown as Props['posts']} />

      <div className="container relative z-10">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog | Honestus | Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
