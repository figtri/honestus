import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 60

export async function POST(req: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await (global as any).headers?.() })

  if (!user && process.env.NODE_ENV !== 'development') {
    return new Response('Action forbidden.', { status: 403 })
  }

  const payloadReq = await createLocalReq({ user: user as any }, payload)

  try {
    // Get the pages we need to reference
    const [aboutPage, servicesPage, contactPage] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'about' } },
        limit: 1,
        req: payloadReq,
      }),
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'services' } },
        limit: 1,
        req: payloadReq,
      }),
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'contact' } },
        limit: 1,
        req: payloadReq,
      }),
    ])

    const aboutPageDoc = aboutPage.docs[0]
    const servicesPageDoc = servicesPage.docs[0]
    const contactPageDoc = contactPage.docs[0]

    if (!aboutPageDoc || !servicesPageDoc || !contactPageDoc) {
      return new Response('Required pages not found. Please run the seed function first.', {
        status: 404,
      })
    }

    // Update the header with navigation items
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPageDoc.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Services',
              reference: {
                relationTo: 'pages',
                value: servicesPageDoc.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPageDoc.id,
              },
            },
          },
        ],
      },
      req: payloadReq,
    })

    return Response.json({
      success: true,
      message: 'Header navigation updated successfully',
    })
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'
    return new Response(`Failed: ${errorMessage}`, { status: 500 })
  }
}
