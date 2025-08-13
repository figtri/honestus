import type { Block } from 'payload'

export const AboutSection: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Roots',
      admin: {
        description: 'Main title for the about section',
      },
    },
    {
      name: 'introText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Introduction text below the title',
      },
    },
    {
      name: 'pillars',
      type: 'array',
      required: true,
      minRows: 1,
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
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Background image for the about section (optional)',
      },
    },
    {
      name: 'founderNote',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: "Founder's Note",
          admin: {
            description: 'Title for the founder note section',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Main content of the founder note',
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Optional quote or italic text to display below the main content',
          },
        },
      ],
      admin: {
        description: 'Founder note section that appears overlaid on the background image',
      },
    },
  ],
}
