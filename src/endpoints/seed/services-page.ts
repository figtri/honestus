import type { Page } from '@/payload-types'

export const servicesPage: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Services',
  slug: 'services',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        children: [
          {
            children: [
              {
                type: 'text',
                text: 'Professional storytelling services to help you uncover and share your authentic narrative.',
                version: 1,
              },
            ],
            type: 'paragraph',
            version: 1,
          },
        ],
        type: 'root',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
    media: null,
  },
  layout: [
    {
      blockType: 'servicePackage',
      title: 'Digital Storytelling Workshops',
      icon: 'users',
      description: {
        root: {
          children: [
            {
              children: [
                { type: 'text', text: 'For: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: 'Teams, small businesses, NGOs, creatives',
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
            {
              children: [
                { type: 'text', text: 'Includes: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: '60–90 min virtual workshop + PDF workbook',
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
            {
              children: [
                { type: 'text', text: 'Goal: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: 'Help participants uncover their brand/personal story using the "Roots to Fruits" model',
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
          ],
          type: 'root',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      },
      features: [
        { feature: 'Interactive virtual session' },
        { feature: 'Customized workbook' },
        { feature: 'Follow-up resources' },
        { feature: 'Group exercises' },
      ],
      ctaText: 'Contact for Pricing',
      ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Digital Storytelling Workshop',
    },
    {
      blockType: 'servicePackage',
      title: 'Brand Story Package',
      icon: 'pen',
      description: {
        root: {
          children: [
            {
              children: [
                { type: 'text', text: 'For: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: 'Entrepreneurs, coaches, creators, founders',
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
            {
              children: [
                { type: 'text', text: 'Includes: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: '30-min interview → brand bio/About Me page copy + graphic asset',
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
            {
              children: [
                { type: 'text', text: 'Framed as: ', format: 'bold', version: 1 },
                {
                  type: 'text',
                  text: "A mini deep-dive into your story's origin and purpose",
                  version: 1,
                },
              ],
              type: 'paragraph',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
            },
          ],
          type: 'root',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      },
      features: [
        { feature: 'Personal interview session' },
        { feature: 'Written brand narrative' },
        { feature: 'Visual story element' },
        { feature: 'Key message refinement' },
      ],
      ctaText: 'Contact for Pricing',
      ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Brand Story Package',
    },
  ],
  meta: {
    title: 'Services - Honestus',
    description:
      'Professional storytelling services to help you uncover and share your authentic narrative.',
  },
}
