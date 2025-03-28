import type { RequiredDataFromCollectionSlug } from 'payload'

export const landingSections: RequiredDataFromCollectionSlug<'landing-sections'>[] = [
  {
    title: 'Welcome to Honestus',
    type: 'hero',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Discover authentic stories and inspiring interviews from people across all walks of life.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    backgroundColor: '#452645',
    order: 1,
  },
  {
    title: 'Featured Interviews',
    type: 'featured',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Explore our collection of in-depth conversations with artists, entrepreneurs, scientists, and more.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    backgroundColor: '#766D7C',
    order: 2,
  },
  {
    title: 'About Honestus',
    type: 'about',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We believe every person has a unique story worth sharing. Our mission is to bring these stories to light and inspire others through authentic conversations.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    backgroundColor: '#91794F',
    order: 3,
  },
  {
    title: 'Share Your Story',
    type: 'cta',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Have a story to share? We'd love to hear from you and potentially feature your journey on Honestus.",
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    backgroundColor: '#E27145',
    order: 4,
  },
]
