import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'

const AboutPage = async () => {
  const payload = await getPayload({ config })

  // Fetch the about page data
  const aboutPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const pageData = aboutPage.docs[0]

  return (
    <div className="bg-gradient-to-b from-[#1F3B2F] to-[#152A20] min-h-screen text-white py-24 pt-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-emerald-500/30 blur-3xl" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Our Roots</h1>
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mt-2 mb-12 w-32 mx-auto animate-scale-x" />
          <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Discover the core values that guide Honestus. We believe in the power of authentic
            stories, understanding our origins, and building a strong, supportive community.
          </p>
        </div>

        {/* Render the layout blocks from the dashboard */}
        {pageData?.layout && <RenderBlocks blocks={pageData.layout} />}
      </div>
    </div>
  )
}

export default AboutPage
