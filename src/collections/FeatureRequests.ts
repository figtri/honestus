import { CollectionConfig } from 'payload'

const FeatureRequests: CollectionConfig = {
  slug: 'feature-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'reason', 'status', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the person submitting the request',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'The email address of the person submitting the request',
      },
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      admin: {
        description: 'LinkedIn URL (optional)',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: {
        description: 'Website URL (optional)',
      },
    },
    {
      name: 'reason',
      type: 'text',
      required: true,
      admin: {
        description: 'The reason for the request',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed description of the request',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Declined',
          value: 'declined',
        },
      ],
      admin: {
        description: 'The current status of the request',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        description: 'When the request was submitted',
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this request',
        position: 'sidebar',
      },
    },
  ],
}

export default FeatureRequests 