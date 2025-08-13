import type { Block } from 'payload'

export const Pillar: Block = {
  slug: 'pillar',
  interfaceName: 'PillarBlock',
  labels: {
    singular: 'Pillar',
    plural: 'Pillars',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the pillar (e.g., Honesty, Roots, Family)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description of what this pillar represents',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart Handshake (Honesty)', value: 'heartHandshake' },
        { label: 'Sprout (Growth/Roots)', value: 'sprout' },
        { label: 'Users (Family/Community)', value: 'users' },
        { label: 'Star', value: 'star' },
        { label: 'Mail', value: 'mail' },
        { label: 'Pen Square', value: 'penSquare' },
      ],
      admin: {
        description: 'Icon to display for this pillar',
      },
    },
  ],
}
