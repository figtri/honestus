import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div
      className={clsx(
        'font-caveat font-bold text-4xl tracking-wide relative group text-shadow',
        className,
      )}
    >
      <span className="relative inline-block transition-all duration-300 group-hover:scale-105 group-hover:text-shadow-lg">
        Honestus
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current opacity-50 group-hover:w-full transition-all duration-300"></span>
      </span>
    </div>
  )
}
