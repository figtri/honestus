import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Honestus - Stories from the heart',
  images: [
    {
      url: `${getServerSideURL()}/honestus-OG.webp`,
    },
  ],
  siteName: 'Honestus',
  title: 'Honestus',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
