import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-gradient-to-b from-[#152A20] to-[#0F1A15] text-white border-t border-white/10">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link className="flex items-center mb-4" href="/">
              <Logo className="text-white" />
            </Link>
            <p className="text-white text-sm text-center md:text-left max-w-xs">
              Crafting authentic narratives that connect brands and people through the power of
              storytelling.
            </p>
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <nav className="flex flex-col md:flex-row gap-6">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
          )}

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-emerald-400 font-semibold mb-2">Get in Touch</p>
            <a
              href="mailto:kayla@honestus.world"
              className="text-white hover:text-emerald-400 transition-colors duration-300"
            >
              kayla@honestus.world
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Honestus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
