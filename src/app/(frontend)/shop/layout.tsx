import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Roots to Fruits Storytelling Kit | Guided Self-Interview Kit',
  description:
    'Discover the Roots to Fruits Storytelling Kit - a guided self-interview kit inspired by the Uprooting Passion format. Reflect on your past, explore your passions, and plant the seeds of your future.',
  openGraph: mergeOpenGraph({
    title: 'Roots to Fruits Storytelling Kit | Guided Self-Interview Kit',
    description:
      'Discover the Roots to Fruits Storytelling Kit - a guided self-interview kit inspired by the Uprooting Passion format. Reflect on your past, explore your passions, and plant the seeds of your future.',
    url: '/shop',
    type: 'website',
    images: [
      {
        url: 'https://i.etsystatic.com/53645490/r/il/1bc2a0/6179918779/il_1588xN.6179918779_8bg6.jpg',
        width: 1588,
        height: 1588,
        alt: 'Roots to Fruits Storytelling Kit - Main Product Image',
      },
    ],
  }),
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
