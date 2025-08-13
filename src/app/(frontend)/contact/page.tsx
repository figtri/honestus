import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/blocks/Form/ContactForm'

export default async function ContactPage() {
  const payload = await getPayload({ config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'contact',
      },
    },
  })

  if (!pages?.[0]) {
    notFound()
  }

  const page = pages[0]

  return (
    <div className="bg-gradient-to-b from-[#2A4539] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-emerald-300">Get in Touch</h1>
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-2 mb-8 w-32 mx-auto animate-scale-x" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to tell your story? Let's collaborate to uncover and share the authentic narrative
            that sets you or your brand apart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-semibold mb-8 text-emerald-300">Let's Connect</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-600/10">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-1">Email</h3>
                  <p className="text-gray-300">kayla@honestus.world</p>
                  <p className="text-sm text-gray-400 mt-1">I typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-600/10">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-1">Location</h3>
                  <p className="text-gray-300">Available for remote collaboration worldwide</p>
                  <p className="text-sm text-gray-400 mt-1">Based in the United States</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-600/10">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-1">Consultation</h3>
                  <p className="text-gray-300">Schedule a free 15-minute discovery call</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Let's discuss your storytelling needs
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-300">What to Expect</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Personalized approach to your unique story</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Transparent pricing and clear deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Ongoing support throughout the process</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CMS Form Block */}
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-md backdrop-blur-sm">
              {page.layout?.map((block, index) => {
                if (block.blockType === 'formBlock') {
                  return <ContactForm key={index} {...(block as any)} />
                }
                return null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
