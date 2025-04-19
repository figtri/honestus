'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
// Import icons
import { Sprout, HeartHandshake, Users } from 'lucide-react'

const pillars = [
  {
    title: 'Honesty',
    description:
      `We use an authentic storytelling approach to generate the most relatable content—because everyone has a story to tell, not just CEOs.`,
    icon: <HeartHandshake className="w-8 h-8 text-emerald-400 mb-3" />,
  },
  {
    title: 'Roots',
    description:
      `&ldquo;The deeper the roots, the greater the fruits.&rdquo; When we feel lost, we look to our roots to find where we&apos;ve been—and where we&apos;re going.`,
    icon: <Sprout className="w-8 h-8 text-emerald-400 mb-3" />,
  },
  {
    title: 'Family',
    description:
      `Whether it's your blood family, chosen family, your pets, or your plants—Honestus is dedicated to being a family to all.`,
    icon: <Users className="w-8 h-8 text-emerald-400 mb-3" />,
  },
]

const FounderBlurb = () => (
  <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-lg p-6 md:p-8 backdrop-blur-md shadow-xl -mt-16 mx-auto max-w-2xl">
    <h3 className="text-2xl font-semibold mb-3 text-emerald-300">Founder&apos;s Note</h3>
    <p className="text-lg text-gray-200">
      Kayla Bonfiglio is a digital storyteller, podcast host, and fig-obsessed gardener who believes
      that the most powerful brands and personal journeys start by looking inward.
    </p>
    <p className="text-md text-gray-400 mt-4 italic">
      &ldquo;The idea for Honestus was born in the garden—surrounded by figs, growth, and reflection.&rdquo;
    </p>
  </div>
)

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#1F3B2F] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Our Roots
          </h1>
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-2 mb-12 w-32 mx-auto"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
          <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Discover the core values that guide Honestus. We believe in the power of authentic stories,
            understanding our origins, and building a strong, supportive community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg hover:shadow-emerald-900/50 transition-shadow duration-300 backdrop-blur-sm cursor-pointer h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">{pillar.icon}</div>
              <h2 className="text-2xl font-semibold mb-3 text-emerald-300 flex-shrink-0">{pillar.title}</h2>
              <p className="text-gray-200 flex-grow">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            className="relative h-72 md:h-96 w-full rounded-lg overflow-hidden shadow-xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80"
              alt="Lush green leaves representing growth and roots"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <FounderBlurb />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 