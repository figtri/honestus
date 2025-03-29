import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const LandingSections: CollectionConfig = {
  slug: 'landing-sections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'order'],
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
        { label: 'Articles Grid', value: 'articles' },
        { label: 'Spotify Interviews', value: 'spotify' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: defaultLexical,
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
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Select posts to feature in this section',
        condition: (data) => data.type === 'featured',
      },
    },
    {
      name: 'articles',
      type: 'array',
      admin: {
        condition: (data) => data.type === 'articles',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            description: 'URL to the article image',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'URL slug for the article',
          },
        },
        {
          name: 'category',
          type: 'text',
        },
      ],
    },
    {
      name: 'spotifyUrls',
      type: 'array',
      admin: {
        condition: (data) => data.type === 'spotify',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Spotify URL (will be converted to embed format)',
          },
        },
      ],
    },
  ],
}
