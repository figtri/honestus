'use client'

import React from 'react'
import { ServicePackage } from '../ServicePackage/Component'

type ServicesGridClientProps = {
  servicePackages: any[]
}

export const ServicesGridClient: React.FC<ServicesGridClientProps> = ({ servicePackages }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {servicePackages.map((pkg, index) => (
        <div
          key={pkg.id || index}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <ServicePackage {...pkg} />
        </div>
      ))}
    </div>
  )
}
