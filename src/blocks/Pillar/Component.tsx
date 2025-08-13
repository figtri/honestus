'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Users, PenSquare, Star, HeartHandshake, Sprout } from 'lucide-react'

interface PillarBlockProps {
  title: string
  description: string
  icon: 'heartHandshake' | 'sprout' | 'users' | 'star' | 'mail' | 'penSquare'
  index?: number
}

const iconMap = {
  heartHandshake: <HeartHandshake className="w-8 h-8 text-emerald-400 mb-3" />,
  sprout: <Sprout className="w-8 h-8 text-emerald-400 mb-3" />,
  users: <Users className="w-8 h-8 text-emerald-400 mb-3" />,
  star: <Star className="w-8 h-8 text-emerald-400 mb-3" />,
  mail: <Mail className="w-8 h-8 text-emerald-400 mb-3" />,
  penSquare: <PenSquare className="w-8 h-8 text-emerald-400 mb-3" />,
}

export const PillarBlock: React.FC<PillarBlockProps> = ({
  title,
  description,
  icon,
  index = 0,
}) => {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg hover:shadow-emerald-900/50 transition-shadow duration-300 backdrop-blur-sm cursor-pointer h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="flex-shrink-0">{iconMap[icon]}</div>
      <h2 className="text-2xl font-semibold mb-3 text-emerald-300 flex-shrink-0">{title}</h2>
      <p className="text-gray-200 flex-grow">{description}</p>
    </motion.div>
  )
}
