import React from 'react'
import { ServicesGridClient } from './ServicesGridClient'

type ServicesGridProps = {
  servicePackages: any[]
}

export const ServicesGrid: React.FC<ServicesGridProps> = (props) => {
  return <ServicesGridClient {...props} />
}
