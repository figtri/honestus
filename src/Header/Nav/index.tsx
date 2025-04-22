'use client'

import React, { useEffect } from 'react'
// import { useAuth } from '@payloadcms/ui'
import { useAuthVisibility } from '@/providers/AuthVisibility'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  // console.log('HeaderNav component rendering on client')
  const navItems = data?.navItems || []
  // const { user } = useAuth()
  const { isUserLoggedIn } = useAuthVisibility()

  useEffect(() => {
  }, [isUserLoggedIn])

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium uppercase tracking-wider text-shadow"
          />
        )
      })}
      <Link href="/about" className="text-white hover:text-white/80 transition-colors text-sm font-medium uppercase tracking-wider text-shadow">
        About
      </Link>
      <Link href="/services" className="text-white hover:text-white/80 transition-colors text-sm font-medium uppercase tracking-wider text-shadow">
        Services
      </Link>
      <Link href="/shop" className="text-white hover:text-white/80 transition-colors text-sm font-medium uppercase tracking-wider text-shadow">
        Shop
      </Link>
      <Link href="/search" className="text-white hover:text-white/80 transition-colors text-shadow">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-4 h-4" />
      </Link>
      {isUserLoggedIn && (
        <Link
          href="/admin"
          className="ml-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-all border border-white/20 backdrop-blur-sm text-shadow-sm"
        >
          Dashboard
        </Link>
      )}
    </nav>
  )
}
