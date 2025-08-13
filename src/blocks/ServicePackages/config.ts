import type { Block } from 'payload'

export const ServicePackages: Block = {
  slug: 'servicePackages',
  interfaceName: 'ServicePackagesBlock',
  labels: {
    singular: 'Service Packages Section',
    plural: 'Service Packages Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Services',
      admin: {
        description: 'Title for the services section',
      },
    },
    {
      name: 'introText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Introduction text for the services section',
      },
    },
    {
      name: 'packages',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Service Package',
        plural: 'Service Packages',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Title of the service package',
          },
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Users (Group)', value: 'users' },
            { label: 'Pen Square (Writing)', value: 'penSquare' },
            { label: 'Mail', value: 'mail' },
            { label: 'Heart Handshake', value: 'heartHandshake' },
            { label: 'Sprout (Growth)', value: 'sprout' },
            { label: 'Star', value: 'star' },
          ],
          admin: {
            description: 'Icon to display for this service package',
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          admin: {
            description: 'HTML description of the service package (supports basic HTML tags)',
          },
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          minRows: 1,
          labels: {
            singular: 'Feature',
            plural: 'Features',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'List of features included in this package',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          required: true,
          defaultValue: 'Contact for Pricing',
          admin: {
            description: 'Text for the call-to-action button',
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: true,
          admin: {
            description: 'Link for the call-to-action button (e.g., mailto: link)',
          },
        },
      ],
    },
    {
      name: 'bottomSectionTitle',
      type: 'text',
      required: false,
      defaultValue: 'Ready to tell your story?',
      admin: {
        description: 'Title for the bottom contact section (optional)',
      },
    },
    {
      name: 'bottomSectionText',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Text for the bottom contact section (optional)',
      },
    },
    {
      name: 'bottomSectionCtaText',
      type: 'text',
      required: false,
      defaultValue: 'Get in touch',
      admin: {
        description: 'Text for the bottom section CTA button (optional)',
      },
    },
    {
      name: 'bottomSectionCtaLink',
      type: 'text',
      required: false,
      admin: {
        description: 'Link for the bottom section CTA button (optional)',
      },
    },
  ],
}
