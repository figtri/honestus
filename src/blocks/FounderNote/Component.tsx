'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface FounderNoteBlockProps {
  title: string
  content: string
  quote?: string
}

export const FounderNoteBlock: React.FC<FounderNoteBlockProps> = ({ title, content, quote }) => {
  return (
    <motion.div
      className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-lg p-6 md:p-8 backdrop-blur-md shadow-xl -mt-16 mx-auto max-w-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold mb-3 text-emerald-300">{title}</h3>
      <p className="text-lg text-gray-200">{content}</p>
      {quote && <p className="text-md text-gray-400 mt-4 italic">&ldquo;{quote}&rdquo;</p>}
    </motion.div>
  )
}
