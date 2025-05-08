'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

const imageUrls: string[] = [
  'https://i.etsystatic.com/53645490/r/il/1bc2a0/6179918779/il_1588xN.6179918779_8bg6.jpg',
  'https://i.etsystatic.com/53645490/r/il/09d702/6131809046/il_1588xN.6131809046_t9tb.jpg',
  'https://i.etsystatic.com/53645490/r/il/db5050/6179918729/il_1588xN.6179918729_1mt3.jpg',
  'https://i.etsystatic.com/53645490/r/il/69ab0a/6179918555/il_1588xN.6179918555_7yrf.jpg',
]
// --- End Placeholder URLs ---

const ShopPage = () => {
  const etsyUrl = 'https://www.etsy.com/listing/1749230868/roots-to-fruits-storytelling-kit'
  const [mainImage, setMainImage] = useState<string>(imageUrls[0] ?? '')

  if (imageUrls.length === 0 || !mainImage) {
    return <div>Loading images...</div>
  }

  return (
    <div className="bg-gradient-to-b from-[#152A20] to-[#1F3B2F] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background glow element - reusing from About page */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-emerald-300">
            Roots to Fruits Storytelling Kit
          </h1>
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-2 mb-10 w-24 mx-auto"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Image Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Thumbnails (Left column on larger screens) */}
          <motion.div
            className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {imageUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => setMainImage(url)}
                className={`relative aspect-square w-20 md:w-full h-20 md:h-auto rounded-md overflow-hidden border-2 transition-all duration-200 ${mainImage === url ? 'border-emerald-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex-shrink-0`}
              >
                <Image
                  src={url}
                  alt={`Storytelling Kit Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 150px"
                />
              </button>
            ))}
          </motion.div>

          {/* Main Image */}
          <motion.div
            className="md:col-span-4 relative w-full h-96 md:h-[700px] bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImage} // Key change triggers animation
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={mainImage}
                  alt="Roots to Fruits Storytelling Kit - Main View"
                  fill
                  className="object-fit"
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-sm shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Description</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            A guided self-interview kit inspired by my Uprooting Passion interview format. Designed
            to help you reflect on your past, explore your passions, and plant the seeds of your
            future.
          </p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link
            href={etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full text-lg font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-emerald-400 group"
          >
            <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Buy the Kit on Etsy
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ShopPage
