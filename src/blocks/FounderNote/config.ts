import type { Block } from 'payload'

export const FounderNote: Block = {
  slug: 'founderNote',
  interfaceName: 'FounderNoteBlock',
  labels: {
    singular: 'Founder Note',
    plural: 'Founder Notes',
  },
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
        description: 'Main content about the founder',
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
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Background image for the founder note section (optional)',
      },
    },
  ],
}
