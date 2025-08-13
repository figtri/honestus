import { Block } from 'payload/types'

export const ServicePackage: Block = {
  slug: 'servicePackage',
  interfaceName: 'ServicePackageBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Users (Group)', value: 'users' },
        { label: 'Pen (Writing)', value: 'pen' },
        { label: 'Mail (Contact)', value: 'mail' },
      ],
      defaultValue: 'users',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Contact for Pricing',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: 'mailto:kayla@honestus.world',
    },
  ],
}
