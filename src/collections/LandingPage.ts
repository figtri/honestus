import type { CollectionConfig } from 'payload'

const LandingPage: CollectionConfig = {
  slug: 'landing-sections',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'Featured Interviews', value: 'featured' },
        { label: 'About Section', value: 'about' },
        { label: 'Call to Action', value: 'cta' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Deep Purple', value: '#452645' },
        { label: 'Muted Gray', value: '#766D7C' },
        { label: 'Warm Gold', value: '#91794F' },
        { label: 'Dark Forest', value: '#102015' },
        { label: 'Burnt Orange', value: '#E27145' },
        { label: 'Crimson', value: '#CC1D1B' },
        { label: 'Forest Green', value: '#385D2D' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order of appearance on the landing page',
      },
    },
  ],
}

export default LandingPage
