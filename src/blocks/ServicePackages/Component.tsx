'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Users, PenSquare, ArrowRight, Star, HeartHandshake, Sprout } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'

interface ServicePackage {
  id?: string
  title: string
  icon: 'users' | 'penSquare' | 'mail' | 'heartHandshake' | 'sprout' | 'star'
  description: SerializedEditorState
  features: { feature: string; id?: string }[]
  ctaText: string
  ctaLink: string
}

interface ServicePackagesBlockProps {
  title: string
  introText: string
  packages: ServicePackage[]
  bottomSectionTitle?: string
  bottomSectionText?: string
  bottomSectionCtaText?: string
  bottomSectionCtaLink?: string
}

const iconMap = {
  users: <Users className="w-12 h-12 text-emerald-300 mb-4" />,
  penSquare: <PenSquare className="w-12 h-12 text-emerald-300 mb-4" />,
  mail: <Mail className="w-12 h-12 text-emerald-300 mb-4" />,
  heartHandshake: <HeartHandshake className="w-12 h-12 text-emerald-300 mb-4" />,
  sprout: <Sprout className="w-12 h-12 text-emerald-300 mb-4" />,
  star: <Star className="w-12 h-12 text-emerald-300 mb-4" />,
}

export const ServicePackagesBlock: React.FC<ServicePackagesBlockProps> = ({
  title,
  introText,
  packages,
  bottomSectionTitle,
  bottomSectionText,
  bottomSectionCtaText,
  bottomSectionCtaLink,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#2A4539] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Page Title and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          {/* Title with decorative elements */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative"
          >
            <span className="absolute -top-6 -right-8 text-emerald-300">
              <Star className="w-6 h-6 fill-emerald-300/30" />
            </span>
            <h1 className="text-6xl md:text-7xl font-bold text-emerald-300 font-heading relative">
              {title}
            </h1>
            <span className="absolute -bottom-4 -left-8 text-emerald-300">
              <Star className="w-5 h-5 fill-emerald-300/30" />
            </span>
          </motion.div>

          <div className="h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full mt-4 mb-8 w-40 mx-auto" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-xl prose-invert text-gray-200 max-w-none leading-relaxed"
          >
            <p className="text-xl md:text-2xl font-light">{introText}</p>
          </motion.div>
        </motion.div>

        {/* Service Packages Grid */}
        <div
          className={`grid grid-cols-1 ${packages.length > 1 ? 'lg:grid-cols-2' : 'md:grid-cols-1'} gap-10 max-w-5xl mx-auto`}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id || index}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-md backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-emerald-400/20 hover:shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: 0.2 + index * 0.2,
                    ease: 'easeOut',
                  },
                },
              }}
            >
              {/* Header section with icon */}
              <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-5">
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-600/10">
                  {iconMap[pkg.icon]}
                </div>
                <h2 className="text-2xl font-semibold text-emerald-300">{pkg.title}</h2>
              </div>

              {/* Description section */}
              <div className="prose prose-invert text-gray-300 mb-6 flex-grow max-w-none prose-p:my-2 prose-strong:text-emerald-400">
                <RichText data={pkg.description} />
              </div>

              {/* Features list */}
              <div className="mb-8 bg-white/[0.02] p-5 rounded-xl">
                <h3 className="text-sm uppercase text-emerald-400/90 mb-4 tracking-wider font-medium">
                  What&apos;s included
                </h3>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={feature.id || i} className="flex items-start gap-3 text-gray-300">
                      <div className="mt-0.5 text-emerald-400 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.ctaLink && (
                <div className="mt-auto">
                  <a
                    href={pkg.ctaLink}
                    target="_self"
                    rel={undefined}
                    className="flex items-center justify-center w-full px-5 py-3 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-300 group"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{pkg.ctaText || 'Learn More'}</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom contact section */}
        {(bottomSectionTitle || bottomSectionText || bottomSectionCtaLink) && (
          <motion.div
            className="mt-20 text-center max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {bottomSectionTitle && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-300">
                {bottomSectionTitle}
              </h2>
            )}
            {bottomSectionText && <p className="text-gray-300 mb-6">{bottomSectionText}</p>}
            {bottomSectionCtaLink && (
              <a
                href={bottomSectionCtaLink}
                className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg text-base font-medium hover:bg-emerald-400 transition-colors duration-300 shadow-lg hover:shadow-emerald-700/40"
              >
                <Mail className="w-5 h-5 mr-2" />
                {bottomSectionCtaText || 'Get in touch'}
              </a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
