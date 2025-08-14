import type { Block } from 'payload'

export const Values: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock',
  labels: {
    singular: 'Values',
    plural: 'Values',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Core Values',
      admin: {
        description: 'Main title for the values section',
      },
    },
    {
      name: 'introText',
      type: 'textarea',
      required: false,
      admin: {
        description:
          'Introduction text below the title (optional - leave empty to avoid duplication)',
      },
    },
    {
      name: 'values',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Value',
        plural: 'Values',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title of the value (e.g., Honesty, Roots, Family)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Description of what this value represents',
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
            { label: 'Lightbulb', value: 'lightbulb' },
            { label: 'Shield', value: 'shield' },
          ],
          admin: {
            description: 'Icon to display for this value',
          },
        },
      ],
    },
  ],
}
