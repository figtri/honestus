'use client'

import React from 'react'
import { Mail, Users, PenSquare, ArrowRight } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'

type ServicePackageClientProps = {
  title: string
  description: SerializedEditorState
  features: { feature: string; id?: string }[]
  ctaText?: string
  ctaLink?: string
  icon?: 'users' | 'pen' | 'mail'
}

export const ServicePackageClient: React.FC<ServicePackageClientProps> = ({
  title,
  description,
  features,
  ctaText,
  ctaLink,
  icon = 'users',
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail className="w-8 h-8 text-emerald-400" />
      case 'pen':
        return <PenSquare className="w-8 h-8 text-emerald-400" />
      case 'users':
      default:
        return <Users className="w-8 h-8 text-emerald-400" />
    }
  }

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-md backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-emerald-400/20 hover:shadow-lg overflow-hidden animate-fade-in-up">
      {/* Header section with icon */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          {getIcon()}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* Description */}
      <div className="mb-6 flex-grow">
        <RichText data={description} enableGutter={false} />
      </div>

      {/* Features list */}
      {features && features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">What&apos;s Included:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={feature.id || index} className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                <span>{feature.feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Button */}
      {ctaText && ctaLink && (
        <div className="mt-auto">
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      )}
    </div>
  )
}
