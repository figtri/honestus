'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Users, PenSquare } from 'lucide-react' // Import Mail, Users, and PenSquare icons

// Hardcoded content for the Work With Me page
const pageTitle = 'Work With Me'
const introText = `Want to root your brand or story in something real? I offer storytelling experiences that guide individuals and organizations in uncovering and sharing their authentic narrative.`

const packages = [
  {
    id: '1',
    title: 'Digital Storytelling Workshops',
    icon: <Users className="w-10 h-10 text-emerald-400 mb-4" />, // Added icon
    description: `
      <p><strong>For:</strong> Teams, small businesses, NGOs, creatives</p>
      <p><strong>Includes:</strong> 60–90 min virtual workshop + PDF workbook</p>
      <p><strong>Goal:</strong> Help participants uncover their brand/personal story using the "Roots to Fruits" model</p>
    `,
    ctaText: 'Contact for Pricing',
    ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Digital Storytelling Workshop',
  },
  {
    id: '2',
    title: 'Brand Story Package',
    icon: <PenSquare className="w-10 h-10 text-emerald-400 mb-4" />, // Added icon
    description: `
      <p><strong>For:</strong> Entrepreneurs, coaches, creators, founders</p>
      <p><strong>Includes:</strong> 30-min interview → brand bio/About Me page copy + graphic asset</p>
      <p><strong>Framed as:</strong> A mini deep-dive into your story's origin and purpose</p>
    `,
    ctaText: 'Contact for Pricing',
    ctaLink: 'mailto:kayla@honestus.world?subject=Inquiry: Brand Story Package',
  },
]

const WorkWithMePage = () => {
  return (
    // Reusing styles similar to About/Shop pages
    <div className="bg-gradient-to-b from-[#2A4539] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Page Title and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto" // Increased bottom margin
        >
          {/* Apply Caveat font to title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-emerald-300 font-heading">
            {pageTitle}
          </h1>
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-2 mb-6 w-24 mx-auto" />
          <div
            className="prose prose-xl prose-invert text-gray-200 max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p>${introText}</p>` }} // Simple paragraph for intro
          />
        </motion.div>

        {/* Service Packages Grid */}
        <div className={`grid grid-cols-1 ${packages.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 max-w-5xl mx-auto`}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              // Added hover background/border transition
              className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg backdrop-blur-sm flex flex-col h-full transition-colors duration-300 hover:bg-white/10 hover:border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileHover={{ y: -5 }} // Simpler hover effect, relying on CSS for bg/border
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Render Icon */}
              {pkg.icon}
              <h2 className="text-2xl font-semibold mb-4 text-emerald-300">{pkg.title}</h2>
              <div
                className="prose prose-invert text-gray-300 mb-4 flex-grow max-w-none prose-p:my-1 prose-strong:text-emerald-400"
                dangerouslySetInnerHTML={{ __html: pkg.description }} // Render hardcoded HTML description
              />
              {pkg.ctaLink && (
                <div className="mt-auto pt-4">
                  <a
                    href={pkg.ctaLink}
                    target="_self" // Open mailto links in same tab
                    rel={undefined}
                    className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-500 transition-colors duration-300 shadow hover:shadow-md group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    {pkg.ctaText || 'Learn More'}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkWithMePage 