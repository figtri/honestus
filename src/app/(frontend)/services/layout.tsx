import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Storytelling Services | Brand & Personal Narrative Development',
  description:
    'Transform your brand or personal story with expert storytelling services. From digital workshops to brand story packages, discover how to craft authentic narratives that resonate with your audience.',
  openGraph: mergeOpenGraph({
    title: 'Storytelling Services | Brand & Personal Narrative Development',
    description:
      'Transform your brand or personal story with expert storytelling services. From digital workshops to brand story packages, discover how to craft authentic narratives that resonate with your audience.',
    url: '/services',
    type: 'website',
    images: [
      {
        url: '/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Storytelling Services by Kayla',
      },
    ],
  }),
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
