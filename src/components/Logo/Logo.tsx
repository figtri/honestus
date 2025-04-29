import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
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
      <Image
        src="/imgs/logo_white.png"
        alt="Honestus"
        width={100}
        height={100}
        priority={props.priority}
        loading={props.loading}
      />
    </div>
  )
}
