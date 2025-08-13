'use client'

import React from 'react'
import { useAuthVisibility } from '@/providers/AuthVisibility'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const { isUserLoggedIn } = useAuthVisibility()

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className="text-white hover:text-white/80 transition-colors text-sm font-medium uppercase tracking-wider text-shadow"
        />
      ))}
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
