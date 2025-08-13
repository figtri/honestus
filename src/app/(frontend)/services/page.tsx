import React from 'react'
import { Mail, Users, PenSquare, ArrowRight, Star } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'services',
      },
    },
  })

  if (!pages?.[0]) {
    notFound()
  }

  const page = pages[0]

  // Extract service packages from the page layout
  const servicePackages = page.layout?.filter((block) => block.blockType === 'servicePackage') || []

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'mail':
        return <Mail className="w-12 h-12 text-emerald-300 mb-4" />
      case 'pen':
        return <PenSquare className="w-12 h-12 text-emerald-300 mb-4" />
      case 'users':
      default:
        return <Users className="w-12 h-12 text-emerald-300 mb-4" />
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#2A4539] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Hero Section */}
        {page.hero && <RenderHero {...page.hero} />}

        {/* Service Packages Grid */}
        <div
          className={`grid grid-cols-1 ${servicePackages.length > 1 ? 'lg:grid-cols-2' : 'md:grid-cols-1'} gap-10 max-w-5xl mx-auto mt-8`}
        >
          {servicePackages.map((pkg: any, index: number) => (
            <div
              key={pkg.id || index}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-md backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-emerald-400/20 hover:shadow-lg overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Header section with icon */}
              <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-5">
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-600/10">
                  {getIcon(pkg.icon)}
                </div>
                <h2 className="text-2xl font-semibold text-emerald-300">{pkg.title}</h2>
              </div>

              {/* Description section */}
              <div className="prose prose-invert text-gray-300 mb-6 max-w-none prose-p:my-2 prose-strong:text-emerald-400">
                <RichText data={pkg.description} enableGutter={false} />
              </div>

              {/* Features list */}
              {pkg.features && pkg.features.length > 0 && (
                <div className="mt-auto bg-white/[0.02] p-5 rounded-xl">
                  <h3 className="text-sm uppercase text-emerald-400/90 mb-4 tracking-wider font-medium">
                    What's included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.features.map((feature: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <div className="mt-0.5 text-emerald-400 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span>{feature.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              {pkg.ctaText && pkg.ctaLink && (
                <div className="mt-auto">
                  <a
                    href={pkg.ctaLink}
                    target="_self"
                    rel={undefined}
                    className="flex items-center justify-center w-full px-5 py-3 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-300 group"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom contact section */}
        <div
          className="mt-20 text-center max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm animate-fade-in-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-300">
            Ready to tell your story?
          </h2>
          <p className="text-gray-300 mb-6">
            Let's collaborate to uncover and share the authentic narrative that sets you or your
            brand apart.
          </p>
          <a
            href="mailto:kayla@honestus.world?subject=Inquiry from Website"
            className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg text-base font-medium hover:bg-emerald-400 transition-colors duration-300 shadow-lg hover:shadow-emerald-700/40"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}
