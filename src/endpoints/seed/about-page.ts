import type { Page } from '@/payload-types'

export const aboutPage: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'About',
  slug: 'about',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        children: [
          {
            children: [
              { type: 'text', text: 'Discover the core values that guide Honestus.', version: 1 },
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
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              children: [
                {
                  children: [
                    {
                      type: 'text',
                      text: 'Discover the core values that guide Honestus. We believe in the power of authentic stories, understanding our origins, and building a strong, supportive community.',
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
                  children: [{ type: 'text', text: 'Our Core Values', format: 'bold', version: 1 }],
                  type: 'heading',
                  tag: 'h2',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
                {
                  children: [{ type: 'text', text: 'Honesty', format: 'bold', version: 1 }],
                  type: 'heading',
                  tag: 'h3',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
                {
                  children: [
                    {
                      type: 'text',
                      text: 'We use an authentic storytelling approach to generate the most relatable content—because everyone has a story to tell, not just CEOs.',
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
                  children: [{ type: 'text', text: 'Roots', format: 'bold', version: 1 }],
                  type: 'heading',
                  tag: 'h3',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
                {
                  children: [
                    {
                      type: 'text',
                      text: '"The deeper the roots, the greater the fruits." When we feel lost, we look to our roots to find where we\'ve been—and where we\'re going.',
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
                  children: [{ type: 'text', text: 'Family', format: 'bold', version: 1 }],
                  type: 'heading',
                  tag: 'h3',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
                {
                  children: [
                    {
                      type: 'text',
                      text: "Whether it's your blood family, chosen family, your pets, or your plants—Honestus is dedicated to being a family to all.",
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
                  children: [{ type: 'text', text: "Founder's Note", format: 'bold', version: 1 }],
                  type: 'heading',
                  tag: 'h2',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
                {
                  children: [
                    {
                      type: 'text',
                      text: 'Kayla Bonfiglio is a digital storyteller, podcast host, and fig-obsessed gardener who believes that the most powerful brands and personal journeys start by looking inward.',
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
                    {
                      type: 'text',
                      text: '"The idea for Honestus was born in the garden—surrounded by figs, growth, and reflection."',
                      format: 'italic',
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
        },
      ],
    },
  ],
  meta: {
    title: 'About - Honestus',
    description: 'Learn about the core values that guide Honestus: Honesty, Roots, and Family.',
  },
}
