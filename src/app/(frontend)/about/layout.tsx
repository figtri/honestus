import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'About | Honestus - Stories from the Heart',
  description:
    'Discover the story behind Honestus, where authentic storytelling meets personal growth. Learn about our values of honesty, roots, and family.',
  keywords: [
    'Honestus',
    'digital storytelling',
    'authentic content',
    'personal growth',
    'brand storytelling',
  ],
  authors: [{ name: 'Kayla Bonfiglio' }],
  openGraph: mergeOpenGraph({
    title: 'About | Honestus - Stories from the Heart',
    description:
      'Discover the story behind Honestus, where authentic storytelling meets personal growth. Learn about our values of honesty, roots, and family.',
    url: `${getServerSideURL()}/about`,
    type: 'website',
  }),
  alternates: {
    canonical: `${getServerSideURL()}/about`,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
