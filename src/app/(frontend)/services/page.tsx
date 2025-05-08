'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Users, PenSquare, ArrowRight, Star } from 'lucide-react'

// Hardcoded content for the Services page
const pageTitle = 'Services'
const introText = `Want to root your brand or story in something real? I offer storytelling experiences that guide individuals and organizations in uncovering and sharing their authentic narrative.`

const packages = [
  {
    id: '1',
    title: 'Digital Storytelling Workshops',
    icon: <Users className="w-12 h-12 text-emerald-300 mb-4" />,
    description: `
      <p><strong>For:</strong> Teams, small businesses, NGOs, creatives</p>
      <p><strong>Includes:</strong> 60–90 min virtual workshop + PDF workbook</p>
      <p><strong>Goal:</strong> Help participants uncover their brand/personal story using the &ldquo;Roots to Fruits&rdquo; model</p>
    `,
    features: [
      'Interactive virtual session',
      'Customized workbook',
      'Follow-up resources',
      'Group exercises',
    ],
    ctaText: 'Contact for Pricing',
    ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Digital Storytelling Workshop',
  },
  {
    id: '2',
    title: 'Brand Story Package',
    icon: <PenSquare className="w-12 h-12 text-emerald-300 mb-4" />,
    description: `
      <p><strong>For:</strong> Entrepreneurs, coaches, creators, founders</p>
      <p><strong>Includes:</strong> 30-min interview → brand bio/About Me page copy + graphic asset</p>
      <p><strong>Framed as:</strong> A mini deep-dive into your story&apos;s origin and purpose</p>
    `,
    features: [
      'Personal interview session',
      'Written brand narrative',
      'Visual story element',
      'Key message refinement',
    ],
    ctaText: 'Contact for Pricing',
    ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Brand Story Package',
  },
]

const WorkWithMePage = () => {
  return (
    <div className="bg-gradient-to-b from-[#2A4539] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Enhanced background elements */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror' }}
      />

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
            <motion.span
              className="absolute -top-6 -right-8 text-emerald-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-6 h-6 fill-emerald-300/30" />
            </motion.span>
            <h1 className="text-6xl md:text-7xl font-bold text-emerald-300 font-heading relative">
              {pageTitle}
            </h1>
            <motion.span
              className="absolute -bottom-4 -left-8 text-emerald-300"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-5 h-5 fill-emerald-300/30" />
            </motion.span>
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
              key={pkg.id}
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
                  {pkg.icon}
                </div>
                <h2 className="text-2xl font-semibold text-emerald-300">{pkg.title}</h2>
              </div>

              {/* Description section */}
              <div
                className="prose prose-invert text-gray-300 mb-6 flex-grow max-w-none prose-p:my-2 prose-strong:text-emerald-400"
                dangerouslySetInnerHTML={{ __html: pkg.description }}
              />

              {/* Features list */}
              <div className="mb-8 bg-white/[0.02] p-5 rounded-xl">
                <h3 className="text-sm uppercase text-emerald-400/90 mb-4 tracking-wider font-medium">
                  What&apos;s included
                </h3>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
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
                      <span>{feature}</span>
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
        <motion.div
          className="mt-20 text-center max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-300">
            Ready to tell your story?
          </h2>
          <p className="text-gray-300 mb-6">
            Let&apos;s collaborate to uncover and share the authentic narrative that sets you or
            your brand apart.
          </p>
          <a
            href="mailto:kayla@honestus.world?subject=Inquiry from Website"
            className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg text-base font-medium hover:bg-emerald-400 transition-colors duration-300 shadow-lg hover:shadow-emerald-700/40"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get in touch
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default WorkWithMePage
