import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

interface Section {
  id: string
  title: string
  type: 'hero' | 'featured' | 'about' | 'cta'
  content: SerializedEditorState
  image?: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
  backgroundColor?: string
  order: number
}

export const LandingSection: React.FC<{ section: Section }> = ({ section }) => {
  const bgColor = section.backgroundColor || '#ffffff'

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div
            className="min-h-[80vh] flex items-center relative overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
              <motion.div className="md:w-1/2 z-10" {...fadeInUp}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">{section.title}</h1>
                <div className="prose prose-lg text-white">
                  <RichText data={section.content} enableGutter={false} />
                </div>
              </motion.div>
              {section.image && (
                <motion.div
                  className="md:w-1/2 mt-10 md:mt-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={section.image.url}
                    alt={section.image.alt}
                    width={section.image.width || 600}
                    height={section.image.height || 400}
                    className="rounded-lg shadow-2xl"
                  />
                </motion.div>
              )}
            </div>
          </div>
        )

      case 'featured':
        return (
          <div className="py-20" style={{ backgroundColor: bgColor }}>
            <div className="container mx-auto px-4">
              <motion.h2 className="text-4xl font-bold mb-12 text-center text-white" {...fadeInUp}>
                {section.title}
              </motion.h2>
              <div className="prose prose-lg text-white max-w-none">
                <RichText data={section.content} enableGutter={false} />
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="py-20" style={{ backgroundColor: bgColor }}>
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
              {section.image && (
                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={section.image.url}
                    alt={section.image.alt}
                    width={section.image.width || 500}
                    height={section.image.height || 500}
                    className="rounded-full shadow-xl"
                  />
                </motion.div>
              )}
              <motion.div className="md:w-1/2" {...fadeInUp}>
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white">
                  <RichText data={section.content} enableGutter={false} />
                </div>
              </motion.div>
            </div>
          </div>
        )

      case 'cta':
        return (
          <div className="py-20" style={{ backgroundColor: bgColor }}>
            <div className="container mx-auto px-4 text-center">
              <motion.div className="max-w-3xl mx-auto" {...fadeInUp}>
                <h2 className="text-4xl font-bold mb-6 text-white">{section.title}</h2>
                <div className="prose prose-lg text-white mx-auto">
                  <RichText data={section.content} enableGutter={false} />
                </div>
                <button className="mt-8 px-8 py-4 bg-white text-[#E27145] rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        )
    }
  }

  return renderSection()
}
