import React from 'react'
import { ServicePackageClient } from './ServicePackageClient'

type ServicePackageProps = {
  title: string
  description: any
  features: { feature: string; id?: string }[]
  ctaText?: string
  ctaLink?: string
  icon?: 'users' | 'pen' | 'mail'
}

export const ServicePackage: React.FC<ServicePackageProps> = (props) => {
  return <ServicePackageClient {...props} />
}
