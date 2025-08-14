import { getPayload, createLocalReq } from 'payload'
import config from '@payload-config'

export const maxDuration = 30

export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Forbidden', { status: 403 })
  }

  const payload = await getPayload({ config })
  const req = await createLocalReq(
    { user: { id: 'dev', email: 'dev@local', roles: ['admin'] } as any },
    payload,
  )

  try {
    const deleted = await payload.delete({
      collection: 'posts',
      where: { id: { exists: true } },
      req,
    })
    return Response.json({ deleted: deleted.docs?.length ?? 0 })
  } catch (e: any) {
    return new Response(`Error: ${e?.message || e}`, { status: 500 })
  }
}
