import React from 'react'
import {
  Sprout,
  HeartHandshake,
  Users,
  Star,
  Mail,
  PenSquare,
  Lightbulb,
  Shield,
} from 'lucide-react'

// Helper function to get icon component
const getIconComponent = (iconValue: string) => {
  switch (iconValue) {
    case 'heartHandshake':
      return <HeartHandshake className="w-8 h-8 text-emerald-400 mb-3" />
    case 'sprout':
      return <Sprout className="w-8 h-8 text-emerald-400 mb-3" />
    case 'users':
      return <Users className="w-8 h-8 text-emerald-400 mb-3" />
    case 'star':
      return <Star className="w-8 h-8 text-emerald-400 mb-3" />
    case 'mail':
      return <Mail className="w-8 h-8 text-emerald-400 mb-3" />
    case 'penSquare':
      return <PenSquare className="w-8 h-8 text-emerald-400 mb-3" />
    case 'lightbulb':
      return <Lightbulb className="w-8 h-8 text-emerald-400 mb-3" />
    case 'shield':
      return <Shield className="w-8 h-8 text-emerald-400 mb-3" />
    default:
      return <HeartHandshake className="w-8 h-8 text-emerald-400 mb-3" />
  }
}

interface Value {
  title: string
  description: string
  icon: string
}

interface ValuesBlockProps {
  title?: string
  introText?: string
  values: Value[]
}

export const ValuesBlock: React.FC<ValuesBlockProps> = ({ title, introText, values }) => {
  if (!values || values.length === 0) return null

  return (
    <div className="mb-24">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div
            key={value.title}
            className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg hover:shadow-emerald-900/50 transition-all duration-300 backdrop-blur-sm cursor-pointer h-full flex flex-col hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${400 + index * 150}ms` }}
          >
            <div className="flex-shrink-0">{getIconComponent(value.icon)}</div>
            <h3 className="text-2xl font-semibold mb-3 text-emerald-300 flex-shrink-0">
              {value.title}
            </h3>
            <p className="text-gray-200 flex-grow">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
